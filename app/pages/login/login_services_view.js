services_views.service("$loginView", ["$manager", "$location", "$window", "$dialogView", "$navView",
					  function($manager, $location, $window, $dialogView, $navView){
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
			case "auth":
				this.authOk($scope, response);
				break;
			case "load":
				this.loadOk($scope, response);
				break;
			case "show":
				this.showOk($scope, response);
				break;
			case "captcha":
				this.captchaOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "auth":
				this.authErr($scope, response);
				break;
			case "load":
				this.loadErr($scope, response);
				break;
			case "show":
				this.showErr($scope, response);
				break;
			case "captcha":
				this.captchaErr($scope, response);
				break;
		}
	}
	
	this.authOk = function($scope, response){
		$location.path("/main");					//go to main and show mainActivity
		// hide padding in left for navbar
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header and navbar
			$(".frame-wrap").css("padding-left", "300px");
		}
		$navView.setNewsCount(parseInt(response.data.news_count, 10));
		//response.data.news_count
	}
	
	this.authErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BROWSER_AUTH:
				$dialogView.showToast($dialogView.strings.loginFail);
				break;
			case Constant.ERR_CODE_CONNECTOR_AUTH:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_BROWSER_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_DATA_SAVE:
				Log.d("ERR_CODE_DATA_SAVE", "ERR_CODE_DATA_SAVE");
				//$dialogView.showToast($dialogView.strings.writeErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.loadOk = function($scope, response){
		//nothing to do here
	}
	
	this.loadErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_DATA_LOAD:
				//nothing to do here
				break;
		}
	}

	this.captchaOk = function($scope, response){
		$location.path("/captcha/" + response.data.hash + "/captchaSrc/" + encodeURIComponent(response.data.captcha));
	}
	
	this.captchaErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	// help with authorization
	this.helpAuth = function(){
		$location.path("/authtrouble");
	}

	// show privacy
	this.openPrivacy = function(){
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
				navigator.app.loadUrl(Constant.WEB_HOST_PRIVACY, {openExternal : true});
				break;
			case Constant.IOS_DEVICE:
				$window.location = Constant.WEB_HOST_PRIVACY;
				break;
			case Constant.WINDOWS_DEVICE:
				require('electron').shell.openExternal(Constant.WEB_HOST_PRIVACY);
				break;
			case Constant.MAC_DEVICE:
				require('electron').shell.openExternal(Constant.WEB_HOST_PRIVACY);
				break;
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// hide header and navbar
			$(".header").addClass("none");
			$(".nav-block").addClass("none");
		}else{
			// hide navigation bar
			$(".navigation").addClass("none");
		}
	}
}]);