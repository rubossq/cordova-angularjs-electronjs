services_views.service("$navView", ["$location", "$adapter", function($location, $adapter){
	var self = this;
	var updateView = Constant.MAIN_VIEW;
	this.navStatus = true;

	// navigate on major pages
	this.navigate = function(path){
		$location.path("/" + path);
	}

	// update view
	this.update = function(){
		switch(updateView){
			case Constant.MAIN_VIEW:
				var appElement = document.querySelector('[ng-controller=mainCtrl]');
				var $scope = angular.element(appElement).scope();

				$(".header-right-update").addClass("header-right-update-running");
				$adapter.update($scope);
				break;
			case Constant.TASKS_VIEW:
				var appElement = document.querySelector('[ng-controller=tasksCtrl]');
				var $scope = angular.element(appElement).scope();

				$(".header-right-update").addClass("header-right-update-running");
				setTimeout(function(){
					$adapter.tasks($scope);
				}, 500);
				break;
		}
	}
	
	// set background to buttons in navigation
	this.setNavBut = function(view){
		self.inactiveState();

		switch(view){
			case Constant.MAIN_VIEW:
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$(".nav-elem").eq(3).addClass('nav-active');
					$('.nav-elem-main').attr("src", "app/parts/nav/images/nav_main_active.png");
				}else{
					$(".nav-elem").eq(0).addClass('nav-active');

					// desktop update
					updateView = view;
					$(".header-right-update").removeClass("none");
				}
				break;
			case Constant.NEWS_VIEW:
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$(".nav-elem").eq(4).addClass('nav-active');
					$('.nav-elem-news').attr("src", "app/parts/nav/images/nav_news_active.png");
				}else{
					$(".nav-elem").eq(1).addClass('nav-active');

					$(".header-right-update").addClass("none");
				}
				// clear number of news
				$("#newsCounter").addClass("none");
				break;
			case Constant.EARN_VIEW:
				if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
					$(".nav-elem").eq(2).addClass('nav-active');

					$(".header-right-update").addClass("none");
				}
				break;
			case Constant.BID_LIKE_VIEW:
			case Constant.BID_SUBS_VIEW:
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$(".nav-elem").eq(0).addClass('nav-active');
					$('.nav-elem-bid').attr("src", "app/parts/nav/images/nav_bid_active.png");
				}else{
					$(".nav-elem").eq(3).addClass('nav-active');

					$(".header-right-update").addClass("none");
				}
				break;
			case Constant.TASKS_VIEW:
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$(".nav-elem").eq(1).addClass('nav-active');
					$('.nav-elem-tasks').attr("src", "app/parts/nav/images/nav_tasks_active.png");
				}else{
					$(".nav-elem").eq(4).addClass('nav-active');

					// desktop update
					updateView = view;
					$(".header-right-update").removeClass("none");
				}
				break;
			case Constant.DONATE_VIEW:
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$(".nav-elem").eq(2).addClass('nav-active');
					$('.nav-elem-donate').attr("src", "app/parts/nav/images/nav_donate_active.png");
				}else{
					$(".nav-elem").eq(5).addClass('nav-active');

					$(".header-right-update").addClass("none");
				}
				break;
		}
	}

	// delete background button before setting
	this.inactiveState = function(){
		$(".nav-elem").each(function(){
			$(this).removeClass('nav-active');
		});

		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			$('.nav-elem-bid').attr("src", "app/parts/nav/images/nav_bid_inactive.png");
			$('.nav-elem-tasks').attr("src", "app/parts/nav/images/nav_tasks_inactive.png");
			$('.nav-elem-donate').attr("src", "app/parts/nav/images/nav_donate_inactive.png");
			$('.nav-elem-main').attr("src", "app/parts/nav/images/nav_main_inactive.png");
			$('.nav-elem-news').attr("src", "app/parts/nav/images/nav_news_inactive.png");
		}
	}

	this.switchPanel = function(){
		// hide panel
		if(this.navStatus == true){
			// change logo
			$(".nav-logo").addClass("nav-mini-logo");

			// change switcher
			$(".nav-elem-switcher").addClass("nav-mini-elem-switcher");
			$(".nav-elem-switcher-image").addClass("nav-mini-elem-switcher-image");

			// size nav panel
			$(".nav-block").css("width", "85px");
			// style inside elems
			$(".nav-elem").each(function(){
				$(this).css("text-align", "center");
			});
			// hide texts
			$(".nav-elem-text").each(function(){
				$(this).addClass("none");
			});
			// style images
			$(".nav-elem-image").each(function(){
				$(this).css("margin", "14px 0 0 0");
			});
			$(".nav-elem-earn").css("margin-left", "0");

			// change news counter
			$(".nav-news-block").addClass("nav-mini-news-block");
			$(".nav-news-counter").addClass("nav-mini-news-counter");
			$(".nav-news-counter-num").addClass("nav-mini-news-counter-num");

			//hide 2 points and less text in earn run
			$(".nav-earn-elem1").addClass("none");
			$(".nav-earn-elem2").addClass("none");
			$(".nav-earn-text").css("font-size", "13px");

			// change main frame and header
			$(".header-left").css("padding-left", "104px");
			$(".frame-wrap").css("padding-left", "85px");
			
			this.navStatus = false;
		// show panel
		}else{
			// change logo
			$(".nav-logo").removeClass("nav-mini-logo");

			// change switcher
			$(".nav-elem-switcher").removeClass("nav-mini-elem-switcher");
			$(".nav-elem-switcher-image").removeClass("nav-mini-elem-switcher-image");

			// size nav panel
			$(".nav-block").css("width", "300px");
			// style inside elems
			$(".nav-elem").each(function(){
				$(this).css("text-align", "left");
			});
			// show texts
			$(".nav-elem-text").each(function(){
				$(this).removeClass("none");
			});
			// style images
			$(".nav-elem-image").each(function(){
				$(this).css("margin", "14px 0 -2px 19px");
			});
			$(".nav-elem-earn").css("margin-left", "17px");

			// change news counter
			$(".nav-news-block").removeClass("nav-mini-news-block");
			$(".nav-news-counter").removeClass("nav-mini-news-counter");
			$(".nav-news-counter-num").removeClass("nav-mini-news-counter-num");

			//back 2 points and text in earn run
			$(".nav-earn-elem1").removeClass("none");
			$(".nav-earn-elem2").removeClass("none");
			$(".nav-earn-text").css("font-size", "17px");

			// change main frame and header
			$(".header-left").css("padding-left", "319px");
			$(".frame-wrap").css("padding-left", "300px");

			this.navStatus = true;
		}
	}

	// set a num of news in nav icon
	this.setNewsCount = function(num){
		if(num == 0){
			$("#newsCounter").addClass("none");
		}else{
			$("#newsCounter").removeClass("none");
			$("#newsCounter .nav-news-counter-num").text(num);
		}
	}
}]);