services_views.service("$autotaskView", ["$manager", "$autoTasks", "$dialogView", "$navView", "$heighter", function($manager, $autoTasks, $dialogView, $navView, $heighter){
	var self = this;

	this.hideLikesDialog = function(){
		$(".autotask-likesdialog-block").addClass("none");
	}

	this.setLimit = function($scope){
		var val = $scope.limitCount;
		if(checkLimitCount($scope, val)){
			$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_LIMIT_SETTING, val, function(){
				$dialogView.showToast($scope.checkLimitOk);
			});
		}
	}

	function checkAutoEarn($scope, callback){
		// cancel events
		$(".autotask-earndialog-confirm").off();
		$(".autotask-earndialog-cancel").off();

		if($manager.instance.getUser().getSetting(Config.AUTOEARN_SETTING) == 0){
			$(".autotask-earndialog-block").removeClass("none");
			$(".autotask-earndialog-confirm").click(function(){
				var val = 1;
				$manager.instance.getDataManager().setSetting(Config.AUTOEARN_SETTING, val, function(){
					// run bot
					$manager.instance.getBot().run(function(){
						// show run earnings in nav bar
						if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
							var appElement = document.querySelector('[ng-controller=navCtrl]');
							var navScope = angular.element(appElement).scope();
							navScope.navEarnStatus = navScope.navEarnStatusOn;
							$(".nav-earn-block").addClass("nav-earn-running");
						}
					});
					$(".autotask-earndialog-block").addClass("none");
					callback();
					$scope.$applyAsync();
				});
			});
			$(".autotask-earndialog-cancel").click(function(){
				var val = 0;
				$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_SETTING, val, function(){
					setAutoTaskBut($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING));
					// set header's texts
					$scope.autotaskHeader = $scope.offHeader;
					$scope.autotaskText = $scope.offText;

					$(".autotask-likes-but").removeClass("autotask-likes-active");
					$(".autotask-likesfollow-but").removeClass("autotask-likesfollow-active");

					$(".autotask-likes-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
					$(".autotask-likesfollow-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
					$(".autotask-likesfollow-followers").attr("src", "app/pages/autotask/images/autotask_followers_fiolet.png");

					$(".autotask-earndialog-block").addClass("none");
					$scope.$applyAsync();
				});
			});
		}else{
			callback();
			$scope.$applyAsync();
		}
	}

	// set auto task switcher
	function setAutoTaskBut(mode){
		if(mode == 0){
			$(".autotask-header-switch-but").css("background-image", "url(images/switcher_inactive.png)");
		}else{
			$(".autotask-header-switch-but").css("background-image", "url(images/switcher_active.png)");
		}
	}

	// set and switch auto task main but
	function setAutoTaskSettings($scope){
		setAutoTaskParams($scope, $manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING));

		$(".autotask-header-switch").click(function(){
			if($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING) != 0){
				var val =  0;
				$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_SETTING, val, function(){
					setAutoTaskBut(val);
				});

				$(".autotask-likes-but").removeClass("autotask-likes-active");
				$(".autotask-likesfollow-but").removeClass("autotask-likesfollow-active");

				$(".autotask-likes-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
				$(".autotask-likesfollow-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
				$(".autotask-likesfollow-followers").attr("src", "app/pages/autotask/images/autotask_followers_fiolet.png");

				// set header's texts
				$scope.autotaskHeader = $scope.offHeader;
				$scope.autotaskText = $scope.offText;

				$scope.$applyAsync();
			}else{
				// check is auto earn on
				checkAutoEarn($scope, function(){
					var val =  1;
					$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_SETTING, val, function(){
						setAutoTaskBut(val);
					});

					$(".autotask-likes-but").addClass("autotask-likes-active");
					$(".autotask-likesfollow-but").removeClass("autotask-likesfollow-active");

					$(".autotask-likes-likes").attr("src", "images/likes_white.png");
					$(".autotask-likesfollow-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
					$(".autotask-likesfollow-followers").attr("src", "app/pages/autotask/images/autotask_followers_fiolet.png");

					// set header's texts
					$scope.autotaskHeader = $scope.likesHeader;
					$scope.autotaskText = $scope.likesText;
				});
			}
		});

		// set firstly params(auto task switcher, texts and bottoms buttons)
		function setAutoTaskParams($scope, mode){
			if(mode == 0){
				setAutoTaskBut($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING));
				// set header's texts
				$scope.autotaskHeader = $scope.offHeader;
				$scope.autotaskText = $scope.offText;

				$scope.$applyAsync();
			}else{
				setAutoTaskBut($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING));
				// check is auto earn on
				checkAutoEarn($scope, function(){
					setAutoTaskBut($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING));
					switch(mode){
						case 1:
							$(".autotask-likes-but").addClass("autotask-likes-active");
							$(".autotask-likes-likes").attr("src", "images/likes_white.png");

							// set header's texts
							$scope.autotaskHeader = $scope.likesHeader;
							$scope.autotaskText = $scope.likesText;
							break;
						case 2:
							$(".autotask-likesfollow-but").addClass("autotask-likesfollow-active");
							$(".autotask-likesfollow-likes").attr("src", "images/likes_white.png");
							$(".autotask-likesfollow-followers").attr("src", "images/followers_white.png");

							// set header's texts
							$scope.autotaskHeader = $scope.likesFollowHeader;
							$scope.autotaskText = $scope.likesFollowText;
							break;
					}
				});
			}
		}
	}

	function setButtonsSettings($scope){
		$(".autotask-likes-but").click(function(){
			if($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING) != 1){
				// check is auto earn on
				checkAutoEarn($scope, function(){
					var val = 1;
					$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_SETTING, val, function(){
						$autoTasks.init();
						setAutoTaskBut(val);
					});

					$(".autotask-likes-but").addClass("autotask-likes-active");
					$(".autotask-likesfollow-but").removeClass("autotask-likesfollow-active");

					$(".autotask-likes-likes").attr("src", "images/likes_white.png");
					$(".autotask-likesfollow-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
					$(".autotask-likesfollow-followers").attr("src", "app/pages/autotask/images/autotask_followers_fiolet.png");

					// set header's texts
					$scope.autotaskHeader = $scope.likesHeader;
					$scope.autotaskText = $scope.likesText;
				});
			}
		});

		$(".autotask-likesfollow-but").click(function(){
			if($manager.instance.getUser().getSetting(Config.AUTO_TASK_SETTING) != 2){
				
				// check is auto earn on
				checkAutoEarn($scope, function(){
					if(!$manager.instance.getUser().getPremium()){
						if($manager.instance.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
							setLikesFollowParams();
						}else{
							showLikesDialog();
						}
					}else{
						setLikesFollowParams();
					}
				});
			}
		});

		// set click event on likes dialog
		$(".autotask-likesdialog-confirm").click(function(){
			var val = 1;
			$manager.instance.getDataManager().setSetting(Config.SUBSCRIBE_SETTING, val, function(){
				setLikesFollowParams();
				self.hideLikesDialog();
				$scope.$applyAsync();
			});
		});

		function setLikesFollowParams(){
			var val = 2;
			$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_SETTING, val, function(){
				$autoTasks.init();
				setAutoTaskBut(val);
			});

			$(".autotask-likes-but").removeClass("autotask-likes-active");
			$(".autotask-likesfollow-but").addClass("autotask-likesfollow-active");

			$(".autotask-likes-likes").attr("src", "app/pages/autotask/images/autotask_likes_fiolet.png");
			$(".autotask-likesfollow-likes").attr("src", "images/likes_white.png");
			$(".autotask-likesfollow-followers").attr("src", "images/followers_white.png");

			// set header's texts
			$scope.autotaskHeader = $scope.likesFollowHeader;
			$scope.autotaskText = $scope.likesFollowText;
		}

		function showLikesDialog(){
			$(".autotask-likesdialog-block").removeClass("none");
		}
	}

	// set and switch limit but
	function setLimitSettings($scope){
		var curStatus = $manager.instance.getUser().getSetting(Config.AUTO_TASK_LIMIT_SETTING);
		// firstly settings of buttons
		setLimitParams(curStatus);

		// change limit(no limits or user limit)
		$(".autotask-switch-but").click(function(){
			if(curStatus != 0){
				var val = 0;
				$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_LIMIT_SETTING, val, function(){
					setLimitParams(val);
				});
				curStatus = 0;
			}else{
				curStatus = -1;
				setLimitParams(curStatus);
			}
		});

		// send limit on server
		$(".autotask-limit-but").click(function(){
			var val = $scope.limitCount;
			if(checkLimitCount($scope, val)){
				$manager.instance.getDataManager().setSetting(Config.AUTO_TASK_LIMIT_SETTING, val, function(){
					$dialogView.showToast($scope.checkLimitOk);
				});
			}
		});

		function setLimitParams(mode){
			if(mode == 0){
				$(".autotask-switch-but").css("background-image", "url(images/switcher_active.png)");
				$(".autotask-limit-block").addClass("none");
			}else{
				$(".autotask-switch-but").css("background-image", "url(images/switcher_inactive.png)");
				$(".autotask-limit-block").removeClass("none");
				if($manager.instance.getUser().getSetting(Config.AUTO_TASK_LIMIT_SETTING) == 0){
					$scope.limitCount = Constant.AUTOTASK_MIN_LIMIT;
				}else{
					$scope.limitCount = $manager.instance.getUser().getSetting(Config.AUTO_TASK_LIMIT_SETTING);
				}
			}
			$scope.$applyAsync();
		}
	}

	// change users enter
	function checkLimitCount($scope, val){
		var maxLimit = $manager.instance.getUser().getPremium() ? Constant.AUTOTASK_MAX_LIMIT_PREM : Constant.AUTOTASK_MAX_LIMIT;
		
		if(val == "" || !isNumeric(val)){
			$dialogView.showToast($scope.checkLimitNum);
			return false;
		}else{
			if(val < Constant.AUTOTASK_MIN_LIMIT){
				$dialogView.showToast($scope.checkLimitMin + "" + Constant.AUTOTASK_MIN_LIMIT);
				return false;
			}else{
				if(val > maxLimit){
					$dialogView.showToast($scope.checkLimitMax + "" + maxLimit);
					return false;
				}else{
					return true;
				}
			}
		}
	}

	// check is num numeric
	function isNumeric(num){
		return !isNaN(parseFloat(num)) && isFinite(num) && (parseFloat(num) ^ 0) === (parseFloat(num));
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".autotask-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".autotask-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".autotask-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	function cancelEvents(){
		$(".autotask-likesdialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".autotask-earndialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".autotask-likesdialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});
	}

	// init all functions in view
	this.initViewParams = function($scope){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		$(".goearn-but-block").removeClass("goearn-but-bottom");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// hide header
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();
		}else{
			// hide navigation bar
			$(".navigation").addClass("none");
		}

		// set height of main content
		setContentSize();

		
		// set auto task running
		setAutoTaskSettings($scope);
		// set auto task mode buttons
		setButtonsSettings($scope);
		// set auto task limits
		setLimitSettings($scope);

		// cancel events on page
		cancelEvents();
	}
}]);