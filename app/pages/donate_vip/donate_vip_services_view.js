services_views.service("$donateVipView", ["$rootScope", "$manager", "$dialogView", "$navView", "$heighter",
										function($rootScope, $manager, $dialogView, $navView, $heighter){
	var self = this;

	this.manageView = function($scope, response){
		if(response.status == Constant.OK_STATUS){
			this.okView($scope, response);
		}else{
			this.errView($scope, response);
		}
		$scope.$applyAsync();
	}
	
	this.okView = function($scope, response){
		switch(response.action){
			case "store":
				this.storeOk($scope, response);
				break;
			case "getGoods":
				this.getGoodsOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "store":
				this.storeErr($scope, response);
				break;
			case "getGoods":
				this.getGoodsErr($scope, response);
				break;
		}
	}
	
	this.storeOk = function($scope, response){
		
	}
	
	this.storeErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_LOAD_STORE:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.getGoodsOk = function($scope, response){
		setInfo(response.data);

		// set goods
		$dialogView.showGoods(response.data.goods);
	}
	
	this.getGoodsErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.render = function(product){
		Log.d("RENDER", product.alias + " " + product.price);
		$("#"+product.id+"_name").attr("product-name", product.name);
		$("#"+product.id+"_title").text(product.alias);
		$("#"+product.id+"_price").text(product.price);

		checkUserFeatures(product);
	}

	// acces order
	this.checkOrder = function(id){
		if($("#"+id+"_price").attr("disable") != "true"){
			return true;
		}
	}

	// disable order user features if it purchased
	function checkUserFeatures(product){
		var user = $manager.instance.getUser();
		switch(product.id){
			case "turbos_5":
				if(user.getTurbo() == 5){
					$("#"+product.id+"_price").text("OK");
					$("#"+product.id+"_price").css("opacity", "0.5");
					$("#"+product.id+"_price").attr("disable", "true");
				}
				break;
			default:
				break;
		}
	}

	// set user's features
	function setInfo(data){
		var user = $manager.instance.getUser();

		user.setCash(data.cash);
		// set user's deposit
		$dialogView.setCash(user.getCash());

		user.setPremium(data.premium);
		user.setTurbo(data.turbo);
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".donate-vip-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".donate-vip-block", view: Constant.DESKTOP_VIEW, params: ""}]);

			// temp blocking
			$(".donate-vip-nopay-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));
		}else{
			$(".donate-vip-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));

			// temp blocking
			$(".donate-vip-nopay-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	// init all functions in view
	this.initViewParams = function(){
		// temp blocking
		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			$(".donate-vip-nopay-block").removeClass("none");
		}


		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		$(".goearn-but-block").removeClass("goearn-but-bottom");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// hide header
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();
		}else{
			// hide navigation bar
			$(".navigation").addClass("none");
		}

		// set height of main content
		setContentSize();
	}
}]);