services_views.service("$newsView", ["$manager", "$location", "$dialogView", "$lang", "$heighter", function($manager, $location, $dialogView, $lang, $heighter){
	var self = this;
	var curScrollTop = 0;
	window.vipUserTimer;

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
			case "news":
				this.newsOk($scope, response);
				break;
			case "complete":
				this.completeOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "news":
				this.newsErr($scope, response);
				break;
			case "complete":
				this.completeErr($scope, response);
				break;
		}
	}
	
	this.newsOk = function($scope, response){
		$scope.news = response.data.news;
		if($scope.news.length == 0){
			$(".news-notasks-block:first").removeClass("none");
		}else{
			setTimeout(function(){
				for(n in $scope.news){
					eval($scope.news[n].getJs());
				}
			}, 500);
		}
	}
	
	this.newsErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_NEWS:
				//nothing to do here
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.completeOk = function($scope, response){
		var user = $manager.instance.getUser();
		user.setCash(response.data.cash);
		$manager.instance.setCash();
		//set user data
		user.setPremium(response.data.premium);
		user.setTurbo(response.data.turbo);
		user.setAchieves(response.data.achieves);

		if(response.data.message != ""){
			$dialogView.showToast(response.data.message);
		}

		// if no news set nonews block
		if(checNoNews()){
			$(".news-notasks-block").removeClass("none");
		}
	}
	
	this.completeErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_COMPLETE:
				$dialogView.showToast($dialogView.strings.newsServerErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	// show news in feed
	this.show = function(){
		$(".news-block:first").removeClass("none");
	}

	this.clearTimer = function(){
		clearInterval(window.vipUserTimer);
	}

	function checNoNews(){
		for(var i = 0; i < $(".news-content div .news-elem").length; i++){
			if(!$(".news-content div .news-elem").eq(i).hasClass("none")){
				return false;
			}
		}
		return true;
	}

	function hideShowEarnBut(){
		$(".news-block").scroll(function(){
			if($(this).scrollTop() > curScrollTop){
				$(".goearn-but-block").css("display", "none");
				curScrollTop = $(".news-block").scrollTop();
			}
			if($(this).scrollTop() < curScrollTop){
				$(".goearn-but-block").css("display", "inline");
				curScrollTop = $(".news-block").scrollTop();
			}
		});
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".news-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".news-notasks-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".news-block", view: Constant.DESKTOP_VIEW, params: ""},
										{elem: ".news-notasks-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".news-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));

			$(".news-notasks-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// show go to earn button
		$(".goearn-but-block").css("display", "inline");
		$(".goearn-but-block").removeClass("goearn-but-bottom");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header and navbar
			$(".header").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// set height of main content
		setContentSize();

		// hide earn but while scrooling
		hideShowEarnBut();
	}
}]);