services_views.service("$captchaView", ["$auth", "$location", "$dialogView", "$navView", "$heighter", "$way",
					function($auth, $location, $dialogView, $navView, $heighter, $way){

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
			case "checkCaptcha":
				this.checkCaptchaOk($scope, response);
				break;
			case "auth":
				this.authOk($scope, response);
				break;
			case "logout":
				this.logoutOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "checkCaptcha":
				this.checkCaptchaErr($scope, response);
				break;
			case "auth":
				this.authErr($scope, response);
				break;
			case "logout":
				this.logoutErr($scope, response);
				break;
		}
	}
	
	this.checkCaptchaOk = function($scope, response){
		$scope.captchaCode = "";
		$(".captcha-error").removeClass("none");

		$scope.hash = response.data.hash;
		$scope.captchaImage = response.data.captcha;

		$dialogView.hideLoading();
		// disallow user back but
		$way.stopBack();
	}
	
	this.checkCaptchaErr = function($scope, response){
		$dialogView.hideLoading();
		// disallow user back but
		$way.stopBack();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
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

		setTimeout(function(){
			$dialogView.hideLoading();
		}, 700);
	}

	this.authErr = function($scope, response){
		$dialogView.hideLoading();
		// disallow user back but
		$way.stopBack();
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

	this.logoutOk = function($scope, response){
		$dialogView.hideLoading();
		$location.path("/login");
	}

	this.logoutErr = function($scope, response){
		$dialogView.hideLoading();
		// disallow user back but
		$way.stopBack();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BROWSER_LOGOUT:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_LOGOUT:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_DATA_CLEAR:
				$dialogView.showToast($dialogView.strings.writeErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.back  = function($scope){
		$dialogView.showLoading();
		$auth.logout($scope);
	}

	this.checkCaptcha = function($scope, hash, captchaCode){
		if(captchaCode !== "" && captchaCode !== null && captchaCode !== undefined && (captchaCode + "").length > 0){
			if((captchaCode + "").length < 3){
				$dialogView.showToast($scope.lessSymbolsText);
			}else{
				$dialogView.showLoading();
				$auth.checkCaptcha($scope, hash, parseInt(captchaCode));
			}
		}else{
			$dialogView.showToast($scope.emptyText);
		}
	}

	// set hash and src to code block
	this.setParams = function($scope, hash, captcha){
		$scope.hash = hash;
		$scope.captchaImage = captcha;

		setTimeout(function(){
			// disallow user back but
			$way.stopBack();
		}, 750);
	}

	// hide block with err text
	this.hideError = function(){
		$(".captcha-error").addClass("none");
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		$(".goearn-but-block").removeClass("goearn-but-bottom");
		
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// hide header
			$(".header").addClass("none");
		}else{
			// hide navigation bar
			$(".navigation").addClass("none");
		}
	}
}]);