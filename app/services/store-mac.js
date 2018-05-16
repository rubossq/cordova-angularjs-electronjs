services.service("$store", ["$donateView", "$donateVipView", "$dialogView", "$manager", "$lang", function($donateView, $donateVipView, $dialogView, $manager, $lang){
	
	var isInit = false;
	var actionDone = false;

	this.SIMPLE_SHOP = 1;
	this.VIP_SHOP = 2;
	var shop = 1;
	var products = new Array();
	var toid = 0;

	var currency = "";
	var default_currency = "";
	var rate = 1;
	var self = this;
	
	this.init = function(_shop, callback){
		
		shop = _shop;
		Log.d("STORE", "init " + isInit);
		
		if(!isInit){
			$dialogView.showLoading();
			isInit = true;
			actionDone = true;
			
			toid = setTimeout(function(){
				callback({action: "store", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_LOAD_STORE}});
			}, Constant.WAIT_STORE_TIME);

			$manager.instance.getConnector().getProducts($lang.getFullLocale(), function(dataConnector){
				if(dataConnector.status == Constant.OK_STATUS){
					clearTimeout(toid);
					currency = dataConnector.currency;
					default_currency = dataConnector.default_currency;
					rate = dataConnector.rate;
					for(var index in dataConnector.products){
						var p = dataConnector.products[index];
						p.price = (p.price * rate).toFixed(2) + " " + currency;
						self.render(p);
					}
					callback({action: "store", status:Constant.OK_STATUS, data: {}});
				}else{
					callback({action: "store", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_LOAD_STORE}});
				}
			});			
		}else if(!actionDone){
			actionDone = true;
			$dialogView.showLoading();
			this.renderAll(callback);
		}
	
	}
	
	this.order = function(id){
		var p = null;
		for(var i in products){
			if(products[i].id == id){
				p = products[i];
				break;
			}
		}
		if(p){
			// p is product
			//p.name
			//p.price
		}
		
	}
	
	this.render = function(p) {
		products.push(p);
		if(shop == 1){
			$donateView.render(p);
		}else if(shop == 2){
			$donateVipView.render(p);
		}
	};
	
	this.off = function(){
		actionDone = false;
	}
	
	this.renderAll = function(callback){
		for(var i in products){
			if(shop == 1){
				$donateView.render(products[i]);
			}else if(shop == 2){
				$donateVipView.render(products[i]);
			}
		}
		callback({action: "store", status:Constant.OK_STATUS, data: {}});
	}

	this.getWidget = function($scope, email, id){
		$manager.instance.getConnector().getWidget(email, id, function(result){	//try to add
			if(result.status == Constant.OK_STATUS){
				$scope.response({action: "getWidget", status: Constant.OK_STATUS, data: {url: result.url}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "getWidget", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "getWidget", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
			}
		});
	}

	this.getEmbed = function($scope, id){
		$manager.instance.getConnector().getEmbed(id, function(result){	//try to add
			if(result.status == Constant.OK_STATUS){
				$scope.response({action: "getEmbed", status: Constant.OK_STATUS, data: {data: result.data, signature: result.signature, session_id: result.session_id}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "getEmbed", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "getEmbed", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
			}
		});
	}
}]);
