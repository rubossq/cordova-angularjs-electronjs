services_views.service("$purchaseView", ["$heighter", "$location", "$udatar", "$dialogView", "$navView", "$way",
									function($heighter, $location, $udatar, $dialogView, $navView, $way){
	var self = this;

	this.unsubsTurboId = "";

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
			case "getOrderList":
				this.getOrderListOk($scope, response);
				break;
			case "cancelSubscription":
				this.cancelSubscriptionOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "getOrderList":
				this.getOrderListErr($scope, response);
				break;
			case "cancelSubscription":
				this.cancelSubscriptionErr($scope, response);
				break;
		}
	}

	this.getOrderListOk = function($scope, response){

		// set purchased turbos
		setTurbos($scope, response.data.subscribes);

		// set purchased pucks of diamonds and turbos
		setPurchases($scope, response.data.purchases);

		if(response.data.subscribes.length == 0 && response.data.purchases.length == 0){
			$(".purchase-block").addClass("none");
			$(".purchase-empty").removeClass("none");
		}

		setTimeout(function(){
			$dialogView.hideLoading();
		}, 500);
	}

	this.getOrderListErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.cancelSubscriptionOk = function($scope, response){
		$udatar.getOrderList($scope);
	}

	this.cancelSubscriptionErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	// show unsubscribe dialog
	this.showUnsubscribe = function(id){
		this.unsubsTurboId = id;

		$('.purchase-unsubs-block').removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide unsubscribe dialog
	this.hideUnsubscribe = function(){
		$('.purchase-unsubs-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	this.setBlockColor = function(pack_id){
		var color = "";
		switch(pack_id){
			case "turbos_1":
				color = "#00B645";
				break;
			case "iturbos_2":
				color = "#5B6DC9";
				break;
			case "turbos_3":
				color = "#D82B48";
				break;
			case "turbos_5":
				color = "#190F31";
				break;
			default:
				color = "#E7197A";
				break;
		}
		return {"background-color" : color}
	}

	// open donate diamonds
	this.openShop = function(){
		$location.path("/donate/diamonds");
	}

	function setTurbos($scope, subscribes){

		// if user have no turbos
		if(subscribes.length == 0){
			return;
		}else{
			$(".purchase-top-turbos").removeClass("none");
		}

		var subsArr = new Array();
		for(var i = 0; i < subscribes.length; i++){
			var subscribe = {};

			subscribe.name = subscribes[i].name;
			subscribe.id = subscribes[i].id;
			subscribe.pack_id = subscribes[i].pack_id;

			// set time to late
			var time = Math.round((subscribes[i].expiry_time / 60 / 60 / 24));
			if(time <= 0){
				subscribe.time = $scope.lateTime + $scope.soonTime;
			}else{
				subscribe.time = $scope.lateTime + time + $scope.dayWordTime;
			}
			subsArr.push(subscribe);
		}

		$scope.turbos = subsArr;
	}

	function setPurchases($scope, purchases){

		// if user have no purchases
		if(purchases.length == 0){
			return;
		}else{
			$(".purchase-top-purchases").removeClass("none");
		}
		
		var purchaseArr = new Array();
		for(var i = 0; i < purchases.length; i++){
			var purchase = {};

			purchase.name = purchases[i].name;
			purchase.pack_id = purchases[i].pack_id;

			// set needed image and her class
			if(purchases[i].type == Constant.SUBSCRIPTION_TYPE){
				purchase.class = "purchase-left-turbo";
				purchase.src = "app/pages/purchase/images/purchase_turbo.png";
			}else{
				purchase.class = "purchase-left-diamonds";
				purchase.src = "images/diamonds_white.png";
			}
			
			purchaseArr.push(purchase);
		}

		$scope.purchases = purchaseArr;
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".purchase-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".purchase-empty").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".purchase-block", view: Constant.DESKTOP_VIEW, params: ""},
											{elem: ".purchase-empty", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".purchase-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));

			$(".purchase-empty").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");

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