services_views.service("$settingsView", ["$manager", "$window", "$location", "$dialogView", "$navView", "$demon", "$heighter",
					function($manager, $window, $location, $dialogView, $navView, $demon, $heighter){
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
			case "logout":
				this.logoutOk($scope, response);
				break;
			case "version":
				this.versionOk($scope, response);
				break;
			case "apps":
				this.appsOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "logout":
				this.logoutErr($scope, response);
				break;
		}
	}

	this.logoutOk = function($scope, response){
		$demon.stopNewsDemon();
		$demon.stopFastEarnDemon();
		$demon.stopAutoTaskDemon();
		//$demon.stopVerifyDemon();
		$demon.stopUpdaterDemon();
		$(".goearn-but-block").css("display", "none");
		$location.path("/login");					//go to main and show mainActivity
		// hide padding in left for navbar
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// nav panel first state
			$navView.navStatus = false;
			$navView.switchPanel();
			$navView.navStatus = true;

			// show header and navbar
			$(".frame-wrap").css("padding-left", "0");
		}
	}

	this.logoutErr = function($scope, response){
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

	this.versionOk = function($scope, response){
		var curV = $manager.instance.getAppVersion().split(".").join("");
		var newV = response.data.version.split(".").join("");
		if(parseInt(curV) < parseInt(newV)){
			$scope.versionText = $scope.newVersionText + response.data.version;
			$(".settings-version:first").removeClass("none");
		}
	}

	// set our applications
	this.appsOk = function($scope, response){
		$scope.apps = response.data.apps;

		if(response.data.apps.length > 0){
			if($manager.instance.getUser().isSafeUser()){
				$(".settings-otherapp-block:first").removeClass("none");
				// set right borders
				if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
					$(".settings-rate-forborder").each(function(){
						$(this).addClass("settings-bottom-border");
					});
				}else{
					$(".settings-share-forborder").each(function(){
						$(this).addClass("settings-bottom-border");
					});
				}
			}
		}
	}

	this.shareApp = function($scope){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			try{
				$(".settings-share-field").removeClass("none");
				$(".settings-share-field").select();
				var successful = document.execCommand('copy');
				$(".settings-share-field").addClass("none");
				var msg = successful ? 'successful' : 'unsuccessful';
				$dialogView.showToast($scope.copiedText);
			}catch(err){}
			window.getSelection().removeAllRanges();
		}else{
			var options = {
				message: $scope.shareAppText,
				subject: $scope.shareAppHead,
				files: [Constant.SERVER_HOST + "images/share.png"],
				url: Constant.WEB_HOST,
				chooserTitle: $scope.shareAppChooseTitle
			}

			window.plugins.socialsharing.shareWithOptions(options, function(result){
				Log.d("Share completed?", result.completed);
				Log.d("Shared to app:", result.app);
			}, function(msg){
				Log.d("Sharing failed with message:", msg);
			});
		}
	}
	
	// open social links or send mail
	this.openService = function(service){
		switch(service){
			case "mail":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('mailto:' + Constant.MAIL, {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						cordova.plugins.email.open({to: [Constant.MAIL]});
						break;
					case Constant.WINDOWS_DEVICE:
						$window.open('mailto:' + Constant.MAIL);
						break;
					case Constant.MAC_DEVICE:
						$window.open('mailto:' + Constant.MAIL);
						break;
				}
				break;
			case "this":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl(Constant.WEB_HOST, {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						$window.open("https://itunes.apple.com/app/" + Constant.APP_STRING_IOS_NAME + "/" + Constant.APP_STRING_IOS_ID, '_service', 'location=yes');
						break;
					case Constant.WINDOWS_DEVICE:
						require('electron').shell.openExternal(Constant.WEB_HOST);
						break;
					case Constant.MAC_DEVICE:
						require('electron').shell.openExternal(Constant.WEB_HOST);
						break;
				}
				break;
			case "vk":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('https://vk.com/ruboss_top', {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						$window.location = 'https://vk.com/ruboss_top';
						break;
					case Constant.WINDOWS_DEVICE:
						require('electron').shell.openExternal('https://vk.com/ruboss_top');
						break;
					case Constant.MAC_DEVICE:
						require('electron').shell.openExternal('https://vk.com/ruboss_top');
						break;
				}
				break;
			case "fb":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('https://www.facebook.com/ruboss.top', {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						$window.location = 'https://www.facebook.com/ruboss.top';
						break;
					case Constant.WINDOWS_DEVICE:
						require('electron').shell.openExternal('https://www.facebook.com/ruboss.top');
						break;
					case Constant.MAC_DEVICE:
						require('electron').shell.openExternal('https://www.facebook.com/ruboss.top');
						break;
				}
				break;
			case "tw":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('https://twitter.com/ruboss_top', {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						$window.location = 'https://twitter.com/ruboss_top';
						break;
					case Constant.WINDOWS_DEVICE:
						require('electron').shell.openExternal('https://twitter.com/ruboss_top');
						break;
					case Constant.MAC_DEVICE:
						require('electron').shell.openExternal('https://twitter.com/ruboss_top');
						break;
				}
				break;
			case "tg":
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('https://telegram.me/ruboss', {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						$window.location = 'https://telegram.me/ruboss';
						break;
					case Constant.WINDOWS_DEVICE:
						require('electron').shell.openExternal('https://telegram.me/ruboss');
						break;
					case Constant.MAC_DEVICE:
						require('electron').shell.openExternal('https://telegram.me/ruboss');
						break;
				}
				break;
			case "privacy":
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
				break;
		}
	}

	// go to the referral
	this.openView = function(view){
		if(view == "referral"){
			$location.path("/" + view + "/false");
		}else{
			$location.path("/" + view);
		}
	}

	// set link on every our applications
	this.goLookOurApp = function(appId){
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
				navigator.app.loadUrl('', {openExternal : true});
				break;
			case Constant.IOS_DEVICE:
				$window.location = '';
				break;
			case Constant.WINDOWS_DEVICE:
				require('electron').shell.openExternal('');
				break;
			case Constant.MAC_DEVICE:
				require('electron').shell.openExternal('');
				break;
		}
	}

	function setPremiumSwitcher(){
		setFollowingSwitcher();
		if($manager.instance.getUser().getPremium()){
			$("#premBut").css("background-image", "url(images/switcher_active.png)");
			$("#premFollBlock").removeClass("settings-content-elem-disable");
			
			$("#premBut").parent().click(function(){
				return false;
			});
			
			$("#premFollBut").click(function(){
				var val = $manager.instance.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1 ? 0 : 1;
				$manager.instance.getDataManager().setSetting(Config.SUBSCRIBE_SETTING, val, function(){
					setFollowingSwitcher();
				});
			});
		}

		function setFollowingSwitcher(){
			if($manager.instance.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
				$("#premFollBut").css("background-image", "url(images/switcher_active.png)");
			}else{
				$("#premFollBut").css("background-image", "url(images/switcher_inactive.png)");
			}
		}
	}

	function setAutoEarnSwitcher(){
		setAutoEarnBut($manager.instance.getUser().getSetting(Config.AUTOEARN_SETTING));

		$("#autoEarnBut").click(function(){
			var val = $manager.instance.getUser().getSetting(Config.AUTOEARN_SETTING) == 1 ? 0 : 1;
			$manager.instance.getDataManager().setSetting(Config.AUTOEARN_SETTING, val, function(){
				setAutoEarnBut(val);
			});
		});

		function setAutoEarnBut(isOn){
			if(isOn){
				$("#autoEarnBut").css("background-image", "url(images/switcher_active.png)");
			}else{
				$("#autoEarnBut").css("background-image", "url(images/switcher_inactive.png)");
			}
		}
	}

	function setNotifActiveSwitcher(){
		setNotifActiveBut($manager.instance.getUser().getSetting(Config.NOTIFICATION_ACTIVE_SETTING));

		$("#notifActiveBut").click(function(){
			var val = $manager.instance.getUser().getSetting(Config.NOTIFICATION_ACTIVE_SETTING) == 1 ? 0 : 1;
			$manager.instance.getDataManager().setSetting(Config.NOTIFICATION_ACTIVE_SETTING, val, function(){
				setNotifActiveBut(val);
			});
		});

		function setNotifActiveBut(isOn){
			if(isOn){
				$("#notifActiveBut").css("background-image", "url(images/switcher_active.png)");
			}else{
				$("#notifActiveBut").css("background-image", "url(images/switcher_inactive.png)");
			}
		}
	}

	function setNotifSoundSwitcher(){
		setNotifSoundBut($manager.instance.getUser().getSetting(Config.NOTIFICATION_SETTING));

		$("#notifSoundBut").click(function(){
			var val = $manager.instance.getUser().getSetting(Config.NOTIFICATION_SETTING) == 1 ? 0 : 1;
			$manager.instance.getDataManager().setSetting(Config.NOTIFICATION_SETTING, val, function(){
				setNotifSoundBut(val);
			});
		});

		function setNotifSoundBut(isOn){
			if(isOn){
				$("#notifSoundBut").css("background-image", "url(images/switcher_active.png)");
			}else{
				$("#notifSoundBut").css("background-image", "url(images/switcher_inactive.png)");
			}
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".settings-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".settings-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".settings-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header and navbar
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();

			// for copy link for share
			$(".settings-share-field").val(Constant.WEB_HOST);
		}else{
			// show navigation bar
			$(".navigation").addClass("none");
		}

		// show rate app if ios
		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			$(".settings-content-iosrate").removeClass("none");
		}

		// set height of main content
		setContentSize();

		// set premium and subscribe settings
		setPremiumSwitcher();
		// set auto earn settings
		setAutoEarnSwitcher();
		// set notification active settings
		setNotifActiveSwitcher();
		// set notification sound settings
		setNotifSoundSwitcher();
	}
}]);