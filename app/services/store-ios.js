services.service("$store", ["$donateView", "$donateVipView", "$dialogView", "$manager", function($donateView, $donateVipView, $dialogView, $manager){
	
	var isInit = false;
	var actionDone = false;

	this.SIMPLE_SHOP = 1;
	this.VIP_SHOP = 2;

	var shop = 1;
	
	var products = new Array();
	
	this.init = function(_shop, callback){
		if (!window.store){
			callback({action: "store", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_LOAD_STORE}});
		}
		Log.d("STORE", "init " + isInit);
		shop = _shop;
		if(!isInit){
			$dialogView.showLoading();
			isInit = true;
			actionDone = true;
			
			if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE){
				store.validator = Constant.VERIFY_URL;
			}else if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
				store.validator = Constant.VERIFY_IOS_URL;
			}
		//	store.verbosity = store.QUIET;		//store.ERROR
			store.verbosity = store.DEBUG;
			
			this.register('ipack_1', 'x1000', store.CONSUMABLE);
			this.register('ipack_2', 'x2000', store.CONSUMABLE);
			this.register('pack_3', 'x5000', store.CONSUMABLE);
			this.register('pack_4', 'x10000', store.CONSUMABLE);
			this.register('pack_5', 'x20000', store.CONSUMABLE);
			
			this.register('premium', $dialogView.strings.premiumText, store.CONSUMABLE);

			this.register('pack_1_vip', 'x100 000', store.CONSUMABLE);
			this.register('pack_2_vip', 'x500 000', store.CONSUMABLE);
			this.register('pack_3_vip', 'x1 000 000', store.CONSUMABLE);
			
			
			//if($manager.instance.getUser().getTurbo() != 5){
				this.register('turbos_5', 'Turbo dark', store.PAID_SUBSCRIPTION);
				this.simpleUpdate("turbos_5");
				this.simpleApproved("turbos_5");
				this.simpleVerify("turbos_5");
				this.unVerify("turbos_5");
			//}
			
			//if not have turbo_1
			//if($manager.instance.getUser().getTurbo() != 1){
				this.register('turbos_1', 'Turbo green', store.PAID_SUBSCRIPTION);
				this.simpleUpdate("turbos_1");
				this.simpleApproved("turbos_1");
				this.simpleVerify("turbos_1");
				this.unVerify("turbos_1");
			//}
			
			//if($manager.instance.getUser().getTurbo() != 2){
				this.register('iturbos_2', 'Turbo blue', store.PAID_SUBSCRIPTION);
				this.simpleUpdate("iturbos_2");
				this.simpleApproved("iturbos_2");
				this.simpleVerify("iturbos_2");
				this.unVerify("iturbos_2");
			//}
			
			//if($manager.instance.getUser().getTurbo() != 3){
				this.register('turbos_3', 'Turbo red', store.PAID_SUBSCRIPTION);
				this.simpleUpdate("turbos_3");
				this.simpleApproved("turbos_3");
				this.simpleVerify("turbos_3");
				this.unVerify("turbos_3");
			//}
			
			this.simpleUpdate("ipack_1");
			this.simpleUpdate("ipack_2");
			this.simpleUpdate("pack_3");
			this.simpleUpdate("pack_4");
			this.simpleUpdate("pack_5");
			
			
			this.simpleUpdate("premium");
			
			this.simpleApproved("ipack_1");
			this.simpleApproved("ipack_2");
			this.simpleApproved("pack_3");
			this.simpleApproved("pack_4");
			this.simpleApproved("pack_5");
						
			this.simpleApproved("premium");
			
			this.simpleVerify("ipack_1");
			this.simpleVerify("ipack_2");
			this.simpleVerify("pack_3");
			this.simpleVerify("pack_4");
			this.simpleVerify("pack_5");
			
			this.simpleVerify("premium");
			
			
			this.unVerify("ipack_1");
			this.unVerify("ipack_2");
			this.unVerify("pack_3");
			this.unVerify("pack_4");
			this.unVerify("pack_5");
			
			this.unVerify("premium");

			this.simpleUpdate("pack_1_vip");
			this.simpleUpdate("pack_2_vip");
			this.simpleUpdate("pack_3_vip");
		
			this.simpleApproved("pack_1_vip");
			this.simpleApproved("pack_2_vip");
			this.simpleApproved("pack_3_vip");
			
			this.simpleVerify("pack_1_vip");
			this.simpleVerify("pack_2_vip");
			this.simpleVerify("pack_3_vip");
			
		
			this.unVerify("pack_1_vip");
			this.unVerify("pack_2_vip");
			this.unVerify("pack_3_vip");
						
			var toid = setTimeout(function(){
				callback({action: "store", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_LOAD_STORE}});
			}, Constant.WAIT_STORE_TIME);

			store.ready(function() {
				clearTimeout(toid);
				callback({action: "store", status:Constant.OK_STATUS, data: {}});
			});
			
			store.error(function(error) {
				
			});
			
			this.refresh();
		}else if(!actionDone){
			actionDone = true;
			$dialogView.showLoading();
			this.renderAll(callback);
		}
	
	}
	
	this.register = function(id, alias, type){
		store.register({
			id:    id, 			// id without package name!
			alias: alias,
			type:  type
		});
	}
	
	this.refresh = function(){
		store.refresh();
	}
	
	this.simpleUpdate = function(id){
		var self = this;
		store.when(id).updated(function (p) {
			self.render(p);
		});
	}
	
	this.simpleApproved = function(id){
		store.when(id).approved(function (order) {
			Log.d("APPROVED_DONATE", 'approved');
			$dialogView.showToast($dialogView.strings.checkoutText);
			order.verify();
		});
	}
	
	this.unVerify = function(id){
		store.when(id).unverified(function (order) {
			$dialogView.showToast($dialogView.strings.verifyErr);
		});
	}
	
	this.simpleVerify = function(id){
		store.when(id).verified(function(order) {
			var dataSubscribe = null;
			var dataPurchase = null;
			Log.o("SIMPLE_VERIFY", order);
			
			if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE){
				dataSubscribe = order.transaction.purchaseToken;
				dataPurchase = order.transaction.purchaseToken;
			}else if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
				dataSubscribe = order.transaction.id;
				dataPurchase = order.transaction.id;
			}
			if(order.type == store.PAID_SUBSCRIPTION){
				$manager.instance.getConnector().subscribe(dataSubscribe, function(response){
					if(response.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
						$dialogView.showToast($dialogView.strings.connectErr);
					}
					else if(response.status != Constant.OK_STATUS){
						$dialogView.showToast($dialogView.strings.donateBuyErr);
					}else{
						//setTurbo
						$manager.instance.getUser().setTurbo(response.turbo);
						$dialogView.showToast($dialogView.strings.donateBuyOk);
						order.finish();
					}
				});
			}else{
				Log.o("VERIFY_PURCHASE", dataPurchase);
			
				$manager.instance.getConnector().purchase(dataPurchase, function(response){
					Log.o("VERIFY_RESPONSE", response);
					if(response.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
						$dialogView.showToast($dialogView.strings.connectErr);
					}
					else if(response.status != Constant.OK_STATUS){
						$dialogView.showToast($dialogView.strings.donateBuyErr);
					}else{
						$manager.instance.getUser().setCash(response.cash);	//set new data
						if(id == "premium")
							$manager.instance.getUser().setPremium(1);
						$manager.instance.setCash();
						$dialogView.showToast($dialogView.strings.donateBuyOk);
						order.finish();
					}
				});
			}
		});
	}	
	
	this.order = function(id){
		store.order(id);
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
}]);
