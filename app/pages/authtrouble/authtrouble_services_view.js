services_views.service("$authTroubleView", ["$window", "$heighter", function($window, $heighter){
	var self = this;

	this.feedBackUs = function(){
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
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".authtrouble-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".authtrouble-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".authtrouble-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	// init all functions in view
	this.initViewParams = function(){
		// set height of main content
		setContentSize();
	}
}]);