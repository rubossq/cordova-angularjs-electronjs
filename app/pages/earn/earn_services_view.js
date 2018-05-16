services_views.service("$earnView", ["$manager", "$rootScope", "$action", "$dialogView", "$navView", "$way", 
					function($manager, $rootScope, $action, $dialogView, $navView, $way){
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
			case "run":
				this.runOk($scope, response);
				break;
			case "stop":
				this.stopOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "run":
				this.runErr($scope, response);
				break;
			case "stop":
				this.stopErr($scope, response);
				break;
		}
	}
	
	this.runOk = function($scope, response){
		this.setRunState(true);

		// show run earnings in nav bar
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			var appElement = document.querySelector('[ng-controller=navCtrl]');
			var navScope = angular.element(appElement).scope();
			navScope.navEarnStatus = navScope.navEarnStatusOn;
			$(".nav-earn-block").addClass("nav-earn-running");
		}
	}

	this.runErr = function($scope, response){
		this.setRunState(false);

		switch(response.data.errorCode){
			case Constant.ERR_CODE_BOT_RUN:
				$dialogView.showToast($dialogView.strings.runErr);
				break;
		}
	}
	
	this.stopOk = function($scope, response){
		this.setRunState(false);
		$rootScope.stateDeposit = $manager.instance.getUser().getCash().getDeposit();

		// show run earnings in nav bar
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			var appElement = document.querySelector('[ng-controller=navCtrl]');
			var navScope = angular.element(appElement).scope();
			navScope.navEarnStatus = navScope.navEarnStatusOff;
			$(".nav-earn-block").removeClass("nav-earn-running");
		}
	}

	this.stopErr = function($scope, response){
		this.setRunState(true);
		
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BOT_STOP:
				$dialogView.showToast($dialogView.strings.stopErr);
				break;
		}
	}

	$rootScope.setTaskTime = function(time){
		if(time == 0){
			if($(".earn-table-image:first").hasClass("none")){
				$(".earn-table-image:first").removeClass("none");
			}

			if(!$(".earn-table-num:first").hasClass("none")){
				$(".earn-table-num:first").addClass("none");
			}
		}else{
			if(!$(".earn-table-image:first").hasClass("none")){
				$(".earn-table-image:first").addClass("none");
			}

			if($(".earn-table-num:first").hasClass("none")){
				$(".earn-table-num:first").removeClass("none");
			}

			$(".earn-table-num:first").text(Math.floor(time / 1000));
		}
		
		self.showTaskTime(true);
	}

	this.showTaskTime = function(isShow){
		if(isShow){
			$(".earn-table-block:first").removeClass("none");
		}else{
			$(".earn-table-block:first").addClass("none");
		}
	}

	this.setRunState = function(isRunnable){
		if(isRunnable){
			$(".earn-action-play-image:first").addClass("none");
			$(".earn-action-pause-image:first").removeClass("none");

			self.setManAndDrillAnim(isRunnable);
		}else{
			$(".earn-action-play-image:first").removeClass("none");
			$(".earn-action-pause-image:first").addClass("none");

			self.showTaskTime(isRunnable);

			self.setManAndDrillAnim(isRunnable);
		}
	}

	// set text speed of turbo
	this.setPower = function($scope){
		switch(parseInt($manager.instance.user.getTurbo())){
			case 0:
				$scope.powerVal = "100%";
				break;
			case 4:
			case 1:
				$scope.powerVal = "300%";
				break;
			case 2:
				$scope.powerVal = "500%";
				break;
			case 3:
				$scope.powerVal = "1000%";
				break;
			case 5:
				$scope.powerVal = "5000%";
				break;
		}
	}

	$rootScope.setManAndDrill = function(modeRunnable){
		if(modeRunnable == Bot.FAST_EARN_MODE){
			// set Den
			$(".earn-man-image:first").attr("src", "app/pages/earn/images/earn_man_fast.png");
			$(".earn-man-image:first").addClass("earn-man-image-fast");

			// set gold drill
			$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_fast.png");
			$(".earn-drill-image:first").addClass("earn-drill-image-fast");

			return;
		}else{
			// remove classes for Den
			$(".earn-man-image:first").removeClass("earn-man-image-fast");
			$(".earn-drill-image:first").removeClass("earn-drill-image-fast");
		}
		// set miner by lvl and drill image size
		var lvl = $manager.instance.getUser().getXpInfo().getLvl();
		if(lvl < 10){
			$(".earn-man-image:first").attr("src", "images/earn_man1.png");
			$(".earn-man-image:first").addClass("earn-man-image1");

			$(".earn-drill-image:first").addClass("earn-drill-image1");
		}else if(lvl < 20){
			$(".earn-man-image:first").attr("src", "images/earn_man2.png");
			$(".earn-man-image:first").addClass("earn-man-image2");

			$(".earn-drill-image:first").addClass("earn-drill-image2");
		}else if(lvl < 30){
			$(".earn-man-image:first").attr("src", "images/earn_man3.png");
			$(".earn-man-image:first").addClass("earn-man-image3");

			$(".earn-drill-image:first").addClass("earn-drill-image3");
		}else if(lvl < 40){
			$(".earn-man-image:first").attr("src", "images/earn_man4.png");
			$(".earn-man-image:first").addClass("earn-man-image4");

			$(".earn-drill-image:first").addClass("earn-drill-image4");
		}else{
			$(".earn-man-image:first").attr("src", "images/earn_man5.png");
			$(".earn-man-image:first").addClass("earn-man-image5");

			$(".earn-drill-image:first").addClass("earn-drill-image5");
		}

		// set drill image by turbo
		switch(parseInt($manager.instance.user.getTurbo())){
			case 0:
				$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_default.png");
				break;
			case 1:
				$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_turbo1.png");
				break;
			case 2:
				$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_turbo2.png");
				break;
			case 3:
				$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_turbo3.png");
				break;
			case 4:
				$(".earn-drill-image:first").attr("src", "app/pages/earn/images/earn_drill_turbo1.png");
				break;
		}
	}

	this.setManAndDrillAnim = function(isRun){
		if(isRun){
			$(".earn-man-image").addClass("miner-action");
			$(".earn-drill-image").addClass("miner-action");
		}else{
			$(".earn-man-image").removeClass("miner-action");
			$(".earn-drill-image").removeClass("miner-action");
		}
	}

	function setTutorial($scope){
		// show tutorial if first time
		setTimeout(function(){
			if($manager.instance.getUser().getTutorial(Config.EARN_TUTORIAL) == 0){
				// disallow user back but
				$way.stopBack();

				new Tour({"elems": [".earn-table", ".earn-action-but-top", ".earn-action-but-play", ".earn-action-but-turbo"], 
						"texts": [$scope.guideTimeText, $scope.guideTopText, $scope.guideRunText, $scope.guideTurboText], 
						"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
						function(){
							$manager.instance.getDataManager().setTutorial(Config.EARN_TUTORIAL, 1, function(){
								// allow user back but
								$way.playBack();
							});
						});
			}
		}, 100);
	}

	//init all functions in view
	this.initViewParams = function($scope){
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

		// show tutorial
		setTutorial($scope);
	}
}]);