controllers.controller("mainCtrl", ["$scope", "$rootScope", "$manager", "$mainView", "$dialogView", "$navView", "$mainLang", 
									"$demon", "$way", "$adView", "$udatar", "$notifar",
						function($scope, $rootScope, $manager, $mainView, $dialogView, $navView, $mainLang, 
							$demon, $way, $adView, $udatar, $notifar){

	$rootScope.locationTitle = $manager.instance.getUser().getNick();
	$way.step($scope, "/main");

	$navView.setNavBut(Constant.MAIN_VIEW);

	$scope.response = function(response){
		$mainView.manageView($scope, response);
	}

	$scope.defineAchieve = function(index, name){
		$mainView.defineAchieve($scope, index, name);
	}

	$scope.showSpeedUp = function(){
		$dialogView.showSpeedUp();
	}

	$scope.menuTransition = function(service){
		$mainView.menuTransition(service);
	}

	$scope.showRefList = function(){
		$mainView.showRefList();
	}
	
	$demon.startNewsDemon();
	$demon.startFastEarnDemon();
	$demon.startAutoTaskDemon();
	//$demon.startVerifyDemon();
	$demon.startUpdaterDemon();

	$mainView.initViewParams();
	
	$mainLang.setLang($scope);
	//initial state
	$mainView.setInfo($scope, $manager.instance.getUser());
	$mainView.initSwipe();
	
	if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE || Constant.CUR_DEVICE == Constant.IOS_DEVICE){
		$adView.init();
	}
	
	$notifar.init();

	analytics.screenView("main");
}]);