controllers.controller("earnCtrl", ["$scope", "$rootScope", "$action", "$location", "$earnView", "$earnLang", "$manager", "$dialogView", "$navView", "$way",
						function($scope, $rootScope, $action, $location, $earnView, $earnLang, $manager, $dialogView, $navView, $way){
	$rootScope.locationTitle = $dialogView.strings.earnTitle;
	$way.step($scope, "/earn");

	if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
		$navView.setNavBut(Constant.EARN_VIEW);
	}

	var isRunnable = $manager.instance.getBot().isRunnable();

	// set values in depending on the bot
	if(!isRunnable){
		$rootScope.earnedDeposit = $manager.instance.getBot().getEarned();
		$rootScope.stateDeposit = $manager.instance.getUser().getCash().getDeposit();
	}else{
		$rootScope.stateDeposit = $manager.instance.getUser().getCash().getDeposit() - $manager.instance.getBot().getEarned();
	}
	
	$scope.response = function(response){
		$earnView.manageView($scope, response);
	}

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.playPause = function(){
		if(isRunnable){
			isRunnable = false;
			$action.stop($scope);
		}else{
			isRunnable = true;
			$action.run($scope);
		}
	}

	//set mainer on the rock
	$rootScope.setManAndDrill($manager.instance.getBot().getMode());
	// set state of earning
	$earnView.setRunState(isRunnable);

	// set power of turbo
	$earnView.setPower($scope);
	$earnLang.setLang($scope);
	$earnView.initViewParams($scope);
	analytics.screenView("earn");
}]);