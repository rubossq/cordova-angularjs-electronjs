services_views.service("$mainView", ["$manager", "$auth", "$action", "$location", "$mainLang", "$rootScope", 
					"$dialogView", "$longtabView", "$heighter", "$way", 
					function($manager, $auth, $action, $location, $mainLang, $rootScope, 
						$dialogView, $longtabView, $heighter, $way){

	var self = this;
	var swipe = null;
	this.isUpdating = false;

	var curScrollTop = 0;

	var speedInterval = 0;
	this.speedTimeId = 0;
	$rootScope.speedRunStatus = true;

	Manager.instance.addService("$mainView", self);
	
	this.initSwipe = function(){
		var appElement = document.querySelector('[ng-controller=mainCtrl]');
		var $scope = angular.element(appElement).scope();

		var mainWrap = document.getElementById("mainWrap");
		swipe = new Swiper(mainWrap, Swiper.SELF, Swiper.screenHeight, "y", Swiper.BOT, 15, 0, function(type){
			switch(type){
				case Swiper.START:
					break;
				case Swiper.GOAL:
					$(".main-update-block").removeClass("none");
					break;
				case Swiper.ENABLE_END:
					if(!self.isUpdating){
						self.isUpdating = true;

						$(".main-update-block").css("position", "relative");
						$(".main-update-image").addClass("rotating");						
						$auth.update($scope);
					}
					break;
				case Swiper.DISABLE_END:
					$(".main-update-block").css("position", "absolute");
					$(".main-update-image").removeClass("rotating");
					$(".main-update-block").addClass("none");
					break;
			}
		});
		swipe.setIsActive(true);
	}
	
	this.updateEnd = function(){
		self.isUpdating = false;
		setTimeout(function(){
			$(".main-update-block").css("position", "absolute");
			$(".main-update-image").removeClass("rotating");
			$(".main-update-block").addClass("none");
			swipe.goStartPos();
		}, 250);
	}

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
			case "update":
				this.updateOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "update":
				this.updateErr($scope, response);
				break;
		}
	}
	
	this.updateOk = function($scope, response){
		this.setInfo($scope, response.data);
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".header-right-update").removeClass("header-right-update-running");
		}else{
			this.updateEnd();
		}
	}
	
	this.updateErr = function($scope, response){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".header-right-update").removeClass("header-right-update-running");
		}else{
			this.updateEnd();
		}
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BROWSER_UPDATE:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_UPDATE:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	// transition to needed view
	this.menuTransition = function(service){
		switch(service){
			case "otheracc":
				$dialogView.showEnterNick();
				break;
			case "autotask":
				$location.path("/" + service);
				break;
			case "referral":
				$location.path("/"  + service + "/false");
				break;
			case "lvlprize":
				$location.path("/" + service);
				break;
		}
	}

	// show user's referrals list
	this.showRefList = function(){
		$location.path("/referral/true");
	}

	this.setInfo = function($scope, data){
		var user = $manager.instance.getUser();
		// set num of subscribers
		$scope.followersCount = user.getFollowedCount();
		// set num of you subscribe
		$scope.followingCount = user.getFollowsCount();
		// set num of posts
		$scope.postsCount = user.getPostsCount();
		// set user's level
		$scope.userLvl = user.getXpInfo().getLvl();
		// set user's expirience
		$scope.lvlProgress = ((user.getXpInfo().getXp() * 100) / 1000) + "%";
		// set user's avatar
		$scope.profileAvatar = user.getProfileAvatar();
		// set user's nickname
		$rootScope.nick = user.getNick();
		// set earning of referrals
		$scope.referralDiamonds = user.getReferralDiamonds();

		// set user's deposit
		$dialogView.setCash(user.getCash());
		// set user's achievements
		setUserFeatures($scope, user, data);
		// check current speed mode status
		setSpeedStatus($scope, user);

		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE || $manager.instance.getUser().getPremium()){
			$(".main-earn-block").removeClass("none");
			$(".main-bottom-border:eq(2)").removeClass("none");
		}

		// show tutorial if first time
		setTimeout(function(){
			if($manager.instance.getUser().getTutorial(Config.MAIN_TUTORIAL) == 0){
				// disallow user back but
				$way.stopBack();

				if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
					new Tour({"elems": [".header-right-diamonds", ".nav-elem-main", ".nav-elem-news", ".nav-elem-earn", ".nav-elem-bid", ".nav-elem-tasks", 
										".nav-elem-donate", ".main-achieve-image:first", ".main-transition-ref-block"], 
							"texts": [$scope.guideDiamondsText, $scope.guideMainText, $scope.guideNewsText, $scope.guideEarnText, $scope.guideBidText, 
									$scope.guideTasksText, $scope.guideDonateText, $scope.guideBonusesText, $scope.guideReferralsText], 
							"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
							function(){
								$manager.instance.getDataManager().setTutorial(Config.MAIN_TUTORIAL, 1, function(){
									// allow user back but
									$way.playBack();
								});
							}
					);
				}else{
					new Tour({"elems": [".header-right-diamonds", ".nav-elem-block:eq(0)", ".nav-elem-block:eq(1)", ".nav-elem-block:eq(2)", ".nav-elem-block:eq(3)", 
										".nav-elem-block:eq(4)", ".main-achieve-image:first", ".main-transition-ref-block", ".goearn-but-block"], 
							"texts": [$scope.guideDiamondsText, $scope.guideBidText, $scope.guideTasksText, $scope.guideDonateText, $scope.guideMainText, 
										$scope.guideNewsText, $scope.guideBonusesText, $scope.guideReferralsText, $scope.guideEarnText], 
							"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
							function(){
								$manager.instance.getDataManager().setTutorial(Config.MAIN_TUTORIAL, 1, function(){
									// allow user back but
									$way.playBack();
								});
							}
					);
				}
			}
		}, 100);
	}
	
	// set premium and turbo icons and achivements on main page
	function setUserFeatures($scope, user, data){
		var premium = {};
		var turbo = {};
		var mass = [];
		
		// set premium icon
		if(+data.premium){
			premium.src = "images/premium.png";
		}else{
			premium.src = "images/premium_none.png";
		}
		premium.href = '#/donate/premium';
		mass.push(premium);

		// set turbo icon
		switch(+data.turbo){
			case 0:
				turbo.src = "images/turbo_none.png";
				break;
			case 1:
			case 4:
				turbo.src = "images/turbo_1.png";
				break;
			case 2:
				turbo.src = "images/turbo_2.png";
				break;
			case 3:
				turbo.src = "images/turbo_3.png";
				break;
			case 5:
				turbo.src = "images/turbo_4.png";
				break;
			default:
				turbo.src = "images/turbo_none.png";
		}

		turbo.href = '#/donate/turbo';
		mass.push(turbo);

		var achieves = user.getAchieves();
		for(var i=0; i<achieves.length; i++){
			var achieve = {};
			achieve.src = "images/achieves/" + achieves[i] +".png";
			achieve.href = 'javascript:void(0)';
			achieve.name = achieves[i];

			mass.push(achieve);
		}
		if(typeof $scope !== "undefined"){
			$scope.achieves = mass;
		}
	}

	// set description of achieve
	this.defineAchieve = function($scope, index, name){
		if(name){
			var description = "";

			switch(name){
				case "artefact":
					description = $scope.artefactAchText;
					break;
				case "automining":
					description = $scope.autominingAchText;
					break;
				case "bee":
					description = $scope.beeAchText;
					break;
				case "bigcatch":
					description = $scope.bigcatchAchText;
					break;
				case "blackhole":
					description = $scope.blackholeAchText;
					break;
				case "diamonds":
					description = $scope.diamondsAchText;
					break;
				case "digger":
					description = $scope.diggerAchText;
					break;
				case "dinoskeleton":
					description = $scope.dinoskeletonAchText;
					break;
				case "dragoneye":
					description = $scope.dragoneyeAchText;
					break;
				case "earthcore":
					description = $scope.earthcoreAchText;
					break;
				case "goldenpick":
					description = $scope.goldenpickAchText;
					break;
				case "greed":
					description = $scope.greedAchText;
					break;
				case "happyglove":
					description = $scope.happygloveAchText;
					break;
				case "rabbit":
					description = $scope.rabbitAchText;
					break;
				case "secretroom":
					description = $scope.secretroomAchText;
					break;
			}
			$(".main-achieve-image").eq(index).click(function(){
				$dialogView.showToast(description);
			});
		}
	}

	// set user's speed mode status
	function setSpeedStatus($scope, user){
		var bot = $manager.instance.getBot();
		if(bot.getCanEarn()){
			if(bot.isRunnable()){
				switch(bot.getMode()){
					case Bot.SLOW_EARN_MODE:
						$(".main-earn-but").removeClass("none");
						break;
					case Bot.FAST_EARN_MODE:
						$(".main-earn-progress-bar").css("width", $manager.instance.getBot().getFastPercent() + "%");
						$(".main-earn-progress").removeClass("none");
						break;
				}
			}else if($rootScope.speedRunStatus){
				$(".main-earn-but").removeClass("none");
			}else{
				$(".main-earn-progress-bar").css("width", $manager.instance.getBot().getFastPercent() + "%");
				$(".main-earn-progress").removeClass("none");
			}
		}else{
			$(".main-earn-wait").removeClass("none");
			// check is need show time until next run speed mode
			$rootScope.setSpeedTime($manager.instance.getUser().getFastReadyTime(), true);
		}
	}

	$rootScope.setSpeedTime = function(seconds, isCalcTime){
		if(isCalcTime){
			if(speedInterval == 0){
				speedInterval = $manager.instance.getBot().time();

				var numsec = seconds;
			}else{
				var curTime = $manager.instance.getBot().time();
				
				var numsec = seconds - ((curTime - speedInterval) / 1000).toFixed();
			}
		}else{
			speedInterval = $manager.instance.getBot().time();

			var numsec = seconds;
		}

		clearInterval(self.speedTimeId);
		var ONE_HOUR = 3600;
		var ONE_MINUTE = 60;

		setTime();

		self.speedTimeId = setInterval(function(){
			if(numsec < 0){
				$(".main-earn-wait").addClass("none");
				$(".main-earn-but").removeClass("none");

				clearInterval(self.speedTimeId);
			}else{
				setTime();
			}
		}, 1000);

		function getTime(){
			var hours = parseInt(numsec / ONE_HOUR);
			var mins = parseInt((numsec - (hours * ONE_HOUR)) / ONE_MINUTE);
			var secs = parseInt((numsec - (hours * ONE_HOUR)) - (mins * ONE_MINUTE));

			return setNull(hours) + ":" + setNull(mins) + ":" + setNull(secs);
		}

		function setTime(){
			$(".main-earn-wait-time").text(getTime());
			numsec--;
		}

		function setNull(num){
			return (num > 9) ? num : "0"+num;
		}
	}

	function initScroll(){
		document.querySelector(".main-content").addEventListener("scroll", function(){
			if($(".main-content").scrollTop() == 0){
				swipe.setIsActive(true);
			}else{
				swipe.setIsActive(false);
			}
			// hide earn but while scrooling
			hideShowEarnBut();
		});
	}

	function hideShowEarnBut(){
		if($(".main-content").scrollTop() > curScrollTop){
			$(".goearn-but-block").css("display", "none");
			curScrollTop = $(".main-content").scrollTop();
		}
		if($(".main-content").scrollTop() < curScrollTop){
			$(".goearn-but-block").css("display", "inline");
			curScrollTop = $(".main-content").scrollTop();
		}
	}

	function cancelEvents(){
		$(".main-transition-ref").click(function(e){
			e.stopPropagation();
		});
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".main-content").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".main-content", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".main-content").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));
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
			$(".nav-block").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// cancel events on page
		cancelEvents();
		
		// set height of main content
		setContentSize();

		// init content scroll
		initScroll();
	}
}]);