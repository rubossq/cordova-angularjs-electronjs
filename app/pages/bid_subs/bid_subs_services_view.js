services_views.service("$bidSubsView", ["$manager", "$dialogView", "$heighter", function($manager, $dialogView, $heighter){
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
			case "bid":
				this.bidOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "bid":
				this.bidErr($scope, response);
				break;
		}
	}
	
	this.bidOk = function($scope, response){
		this.setButAnim(); 											//without params - remove all animations
		$dialogView.showToast($dialogView.strings.bidOk);
		$dialogView.setCash(response.data.cash);

		// clear inputs
		$scope.targetCountAcc = "";
		$scope.targetCountLink = "";
	}
	
	this.bidErr = function($scope, response){
		this.setButAnim();											//without params - remove all animations
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_BID:
				$dialogView.showToast($dialogView.strings.bidFail);
				break;
			case Constant.ERR_CODE_BROWSER_BID:
				$dialogView.showToast($dialogView.strings.mhFail);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.acceptSubscribe = function(){
		$(".bid-subs-accept-block").addClass("none");
		$('.bid-subs-acc-block').removeClass("none");
		$("#subsBotButtons").removeClass("none");

		var val = $manager.instance.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1 ? 0 : 1;
		$manager.instance.getDataManager().setSetting(Config.SUBSCRIBE_SETTING, val, function(){});
	}

	// switch buttons on bottom
	this.switcherSubs = function(num){
		switch(num){
			case 1:
				//переключить кнопки
				$('#butSubsAcc').addClass("bid-but-active");
				$('#butSubsLink').removeClass("bid-but-active");

				// switch content
				$('.bid-subs-acc-block').removeClass("none");
				$('.bid-subs-link-block').addClass("none");
			break;
			case 2:
				$('#butSubsAcc').removeClass("bid-but-active");
				$('#butSubsLink').addClass("bid-but-active");

				// switch content
				$('.bid-subs-acc-block').addClass("none");
				$('.bid-subs-link-block').removeClass("none");
			break;
		}
	}
	
	this.setPrice = function($scope, count, numPanel){
		switch(numPanel){
			case 1:
				if(count >= 0 && count != ''){
					$scope.priceAcc = count * Constant.SUBSCRIBE_PRICE;
				}else{
					$scope.priceAcc = "";
				}
				break;
			case 2:
				if(count >= 0 && count != ''){
					$scope.priceLink = count * Constant.SUBSCRIBE_PRICE;
				}else{
					$scope.priceLink = "";
				}
				break;
		}
	}

	// show or hide loading in button
	this.setButAnim = function(num, isAnim){
		if(num == 1){
			if(isAnim){
				$("#subsAccSend").addClass("none");
				$("#subsAccSendAnim").removeClass("none");
			}else{
				$("#subsAccSend").removeClass("none");
				$("#subsAccSendAnim").addClass("none");
			}
		}else if(num == 2){
			if(isAnim){
				$("#subsLinkSend").addClass("none");
				$("#subsLinkSendAnim").removeClass("none");
			}else{
				$("#subsLinkSend").removeClass("none");
				$("#subsLinkSendAnim").addClass("none");
			}
		}else{
			$("#subsAccSendAnim").addClass("none");
			$("#subsLinkSendAnim").addClass("none");
			
			$("#subsAccSend").removeClass("none");
			$("#subsLinkSend").removeClass("none");
		}
	}

	function checkSubscribeSetting(){
		if(!$manager.instance.getUser().getPremium()){
			if($manager.instance.getUser().getSetting(Config.SUBSCRIBE_SETTING) != 1){
				$(".bid-subs-acc-block").addClass("none");
				$("#subsBotButtons").addClass("none");
				$(".bid-subs-accept-block").removeClass("none");
			}
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".bid-subs-acc-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-subs-link-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-subs-accept-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$heighter.restructureViewSize([{elem: ".bid-subs-acc-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]},
										{elem: ".bid-subs-link-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]},
										{elem: ".bid-subs-accept-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]}]);
		}else{
			$(".bid-subs-acc-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-subs-link-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-subs-accept-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// show go to earn button
		$(".goearn-but-block").css("display", "none");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header
			$(".header").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// set height of main content
		setContentSize();

		// check is user know, he will subscribe on people too
		checkSubscribeSetting();
	}
}]);