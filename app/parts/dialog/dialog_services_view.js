services_views.service("$dialogView", ["$rootScope", "$action", "$manager", "$location", "$window", "$lang", "$way", 
					function($rootScope, $action, $manager, $location, $window, $lang, $way){
	var self = this;
	var loadTimer = 0;
	this.strings = {};
	this.bidMoreTask = {};
	this.payData = {};

	Manager.instance.addService("$dialogView", self);
	
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
			case "getWidget":
				this.getWidgetOk($scope, response);
				break;
			case "run":
				this.runOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "bid":
				this.bidErr($scope, response);
				break;
			case "getWidget":
				this.getWidgetErr($scope, response);
				break;
			case "run":
				this.runErr($scope, response);
				break;
		}
	}
	
	this.bidOk = function($scope, response){
		self.setButAnim("bid-dialog", false);
		self.setButAnim("bidmore-dialog", false);

		self.showToast(self.strings.bidOk);
		self.hideDialogBidLikes();
		self.hideBidMore();
		self.setCash(response.data.cash);

		// clear inputs
		$scope.targetCountDialog = "";
		$scope.bidMoreCount = "";
	}

	this.bidErr = function($scope, response){
		self.setButAnim("bid-dialog", false);
		self.setButAnim("bidmore-dialog", false);

		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_BID:
				this.showToast(this.strings.bidFail);
				break;
			case Constant.ERR_CODE_BROWSER_BID:
				this.showToast(this.strings.mhFail);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				this.showToast(this.strings.connectErr);
				break;
			case Constant.ERR_CODE_BROWSER_PRIVATE:
				this.hideDialogBidLikes();
				this.showPrivateAcc();
				break;
		}
	}

	this.getWidgetOk = function($scope, response){
		$(".paydialog-buy-anim").addClass("none");
		$(".paydialog-buy").removeClass("none");
		
		this.hidePayDialog();

		// set name and url on paymentwall
		$location.path("/paymentwall/" + $("#" + this.payData.id + "_name").attr("product-name") + "/paySrc/" + encodeURIComponent(response.data.url));
	}

	this.getWidgetErr = function($scope, response){
		$(".paydialog-buy-anim").addClass("none");
		$(".paydialog-buy").removeClass("none");

		this.hidePayDialog();
		
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				this.showToast(this.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				this.showToast(this.strings.connectErr);
				break;
		}
	}

	this.runOk = function($scope, response){
		$action.setMode($scope.numHours, $scope);

		$('.main-earn-but').addClass("none");
		$('.main-earn-progress').removeClass("none");

		$rootScope.speedRunStatus = false;

		this.hideSpeedUp();

		this.hideLoading();

		// show run earnings in nav bar
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			var appElement = document.querySelector('[ng-controller=navCtrl]');
			var navScope = angular.element(appElement).scope();
			navScope.navEarnStatus = navScope.navEarnStatusOn;
			$(".nav-earn-block").addClass("nav-earn-running");
		}
	}

	this.runErr = function($scope, response){
		this.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BOT_RUN:
				$dialogView.showToast($dialogView.strings.runErr);
				break;
		}
	}
	
	// set current num of diamonds in header
	this.setCash = function(cash){
		$rootScope.deposit = cash.getDeposit();
	}

	// show preloading
	this.showInitLoading = function(){
		$('.init-logo').removeClass("none");
	}
	
	// hide preloading
	this.hideInitLoading = function(){
		$('.init-block').addClass("none");
	}

	// run loading
	this.showLoading = function(){
		$('.loading-block').removeClass('none');
		// disallow use back but
		$way.stopBack();

		loadTimer = setTimeout(function(){
			$(".loading-close").removeClass("none");
		}, Constant.CRITICAL_LOADING_TIME);
	}

	// run loading without possible closing
	this.showRegularLoading = function(){
		$('.loading-block').removeClass('none');
		// disallow use back but
		$way.stopBack();
	}

	// stop loading
	this.hideLoading = function(){
		clearTimeout(loadTimer);
		$('.loading-block').addClass('none');
		$(".loading-close").addClass("none");
		// allow use back but
		$way.playBack();
	}
	
	// show toast
	this.showToast = function(message){
		$('.toast-block').removeClass("none");
		$('#toastMes').text(message);

		setTimeout(function(){
			$('.toast-block').addClass("none");
		}, Constant.TOAST_TIME);
	}

	// show private acc
	this.showPrivateAcc = function(){
		$('.privateacc-block').removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide private acc
	this.hidePrivateAcc = function(){
		$('.privateacc-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	// show enter nick
	this.showEnterNick = function(){
		$('.enternick-block').removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide enter nick
	this.hideEnterNick = function(){
		$('.enternick-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	// open otheracc page with input nickname
	this.sendEnterNick = function($scope){
		if($scope.inputNickname){
			var nickname = $scope.inputNickname.trim() || "";
			if(nickname.length > 3){
				this.hideEnterNick();
				$location.path("/otheracc/" + nickname);
				// clear input enter nick
				$scope.inputNickname = "";
			}else{
				this.showToast(this.strings.enterNameErr);
			}
		}
	}

	// show dialog for get likes
	this.showDialogBidLikes = function(id){
		$('#hideDialogField').val(id);
		var appElement = document.querySelector('[ng-controller=dialogCtrl]');
		var $scope = angular.element(appElement).scope();
		$scope.bidLikeId = id;
		$scope.price = "";

		$rootScope.$applyAsync();

		$('.bid-dialog-block').removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide dialog for get likes
	this.hideDialogBidLikes = function(){
		$('.bid-dialog-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	this.setPrice = function($scope, count){
		if(count >= 0 && count != ''){
			$scope.price = count * Constant.LIKE_PRICE;
		}else{
			$scope.price = "";
		}
	}

	this.showBidMore = function(task){
		var appElement = document.querySelector('[ng-controller=dialogCtrl]');
		var $scope = angular.element(appElement).scope();
		$scope.morePrice = "";

		self.bidMoreTask = task;

		$(".bidmore-dialog-block").removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	this.hideBidMore = function(task){
		$(".bidmore-dialog-block").addClass("none");
		// allow use back but
		$way.playBack();
	}

	this.changeMorePrice = function($scope, count, type){
		if(count >= 0 && count != ''){
			if(type == Constant.LIKE_TYPE){
				$scope.morePrice = count * Constant.LIKE_PRICE;
			}else{
				$scope.morePrice = count * Constant.SUBSCRIBE_PRICE;
			}
		}else{
			$scope.morePrice = "";
		}
	}

	// hide dialog for payment wall
	this.hidePayDialog = function(){
		$(".paydialog-block").addClass("none");
		// allow use back but
		$way.playBack();
	}

	// show dialog for payment and set settings
	this.showPayDialog = function(id){
		var appElement = document.querySelector('[ng-controller=dialogCtrl]');
		var $scope = angular.element(appElement).scope();
		this.payData = {id: id};

		// use liqpay
		if(Constant.CUR_PAY_SYSTEM == Constant.LQ){
			this.showLoading();
			$location.path("/liqpay/" + $("#" + this.payData.id + "_name").attr("product-name") + "/id/" + id);
			
		// use paymentwall
		}else{
			$scope.userEmail = "";

			$scope.payText = $("#" + this.payData.id + "_name").attr("product-name") + " (" + Constant.APP_FULL_NAME + ")";
			$scope.payPrice = $("#" + this.payData.id + "_price").text();

			// check is user has email address
			if($manager.instance.getUser().getPayEmail()){
				$scope.userEmail = $manager.instance.getUser().getPayEmail();
				$scope.emailText = $manager.instance.getUser().getPayEmail();
			}else{
				$scope.emailText = $scope.payEmailText;
				$(".paydialog-switcher").removeClass("none");
			}

			$(".paydialog-block").removeClass("none");
			// disallow use back but
			$way.stopBack();
		}
	}

	// show or hide input for mail
	this.switchPayEmail = function($scope){
		$(".paydialog-switcher").toggleClass("none");
		if($(".paydialog-switcher").hasClass("none")){
			$(".paydialog-email-switcher-image").removeClass("paydialog-email-switcher-reverse");
			if($manager.instance.getUser().getPayEmail()){
				$scope.emailText = $manager.instance.getUser().getPayEmail();
			}else{
				$scope.emailText = $scope.payEmailText;
			}
		}else{
			$(".paydialog-email-switcher-image").addClass("paydialog-email-switcher-reverse");
			if($manager.instance.getUser().getPayEmail()){
				$scope.userEmail = $manager.instance.getUser().getPayEmail();
				$scope.emailText = $scope.payEmailText;
			}else{
				$scope.emailText = $scope.payEmailText;
			}
		}
	}

	// set user's email address
	this.setEmail = function($scope){
		if(validateEmail($scope.userEmail)){
			$manager.instance.getDataManager().saveData($scope.userEmail, function(){
				$manager.instance.getUser().setPayEmail($scope.userEmail);
				self.showToast(self.strings.emailOk);
			});
		}else{
			this.showToast(this.strings.emailErr);
		}
	}

	// checker for buying
	this.buy = function($scope){
		if($scope.userEmail){
			$(".paydialog-buy").addClass("none");
			$(".paydialog-buy-anim").removeClass("none");

			return true;
		}else{
			this.showToast(this.strings.emailText);

			return false;
		}
	}

	// show users goods
	this.showGoods = function(goods){
		if(goods.length == 0){
			return;
		}
		
		var appElement = document.querySelector('[ng-controller=dialogCtrl]');
		var $scope = angular.element(appElement).scope();

		// goods objects array
		var curGooods = [];
		var bonus = 0;

		// set users goods
		for(var i = 0; i < goods.length; i++){
			var good = {};

			var leftClass = "goods-image";
			var leftSrc = "";
			switch(goods[i].id){
				case "premium":
					leftSrc = "images/premium.png";
					break;
				case "turbos_1":
				case "turbos_4":
					leftSrc = "images/turbo_1.png";
					break;
				case "turbos_2":
					leftSrc = "images/turbo_2.png";
					break;
				case "turbos_3":
					leftSrc = "images/turbo_3.png";
					break;
				case "turbos_5":
					leftSrc = "images/turbo_4.png";
					break;
				default:
					leftClass = "goods-image-diamonds";
					leftSrc = "images/diamonds_red.png";
					break;
			}

			// needed color of block of good
			if(i % 2 == 0){
				good.color = "#F8F8F8";
			}else{
				good.color = "#FFFFFF";
			}

			// needed class of good
			good.class = leftClass;
			// needed image of good
			good.src = leftSrc;
			// needed name of good
			good.name = goods[i].name;
			curGooods.push(good);

			bonus += goods[i].bonus;
		}

		$scope.goods = curGooods;

		// set users gift
		$(".goods-gift .goods-text").text(bonus + " " + $scope.diamondsText);
		$('.goods-block').removeClass("none");
		setTimeout(function(){
			// disallow use back but
			$way.stopBack();
		}, 200);
	}

	// hide users goods
	this.hideGoods = function(){
		$('.goods-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	// show speedup dialog
	this.hideSpeedUp = function(){
		$('.speedup-block').addClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide speedup dialog
	this.showSpeedUp = function(){
		$('.speedup-block').removeClass("none");
		// allow use back but
		$way.playBack();
	}

	// select a num of hours for acceleration
	this.selectSpeedButtons = function($scope, num){
		$(".speedup-hour").each(function(){
			$(this).removeClass("speedup-hour-active");
		});

		var i = num - 1;
		$(".speedup-hour").eq(i).addClass("speedup-hour-active");

		$scope.numHours = num;
	}

	// start speed mode
	this.startSpeedUp = function($scope){
		if(!$manager.instance.getBot().isRunnable()){
			this.showLoading();
			$action.run($scope);
		}else{
			$action.setMode($scope.numHours, $scope);
			
			$('.main-earn-but').addClass("none");
			$('.main-earn-progress').removeClass("none");

			$rootScope.speedRunStatus = false;

			this.hideSpeedUp();
		}
	}


	// hide or show loading in button
	this.setButAnim = function(elem, isAnim){
		if(isAnim){
			$("." + elem + "-but").eq(0).addClass("none");
			$("." + elem + "-but").eq(1).removeClass("none");
		}else{
			$("." + elem + "-but").eq(0).removeClass("none");
			$("." + elem + "-but").eq(1).addClass("none");
		}
	}

	this.vibrate = function(val){
		if("vibrate" in navigator)  return navigator.vibrate(val);
		if("oVibrate" in navigator)  return navigator.oVibrate(val);
		if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
		if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
	}

	function validateEmail(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function cancelEvents(){
		$(".bid-dialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".bidmore-dialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".privateacc-content").click(function(e){
			e.stopPropagation();
		});

		$(".enternick-content").click(function(e){
			e.stopPropagation();
		});

		$(".bandialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".paydialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".goods-content").click(function(e){
			e.stopPropagation();
		});

		$(".speedup-content").click(function(e){
			e.stopPropagation();
		});

		$(".loading-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".bid-dialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".bidmore-dialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".privateacc-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".enternick-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".bandialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".paydialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});

		$(".goods-block:first").bind('scroll touchmove', function(e){
			e.stopPropagation();
		});

		$(".speedup-block:first").bind('scroll touchmove', function(e){
			e.stopPropagation();
		});
	}

	//init all functions in view
	this.initViewParams = function(){
		// cancel events on page
		cancelEvents();
	}

	$lang.getLang(Constant.MESSAGES_VIEW, function(lang){
		self.strings = lang;
	});
}]);