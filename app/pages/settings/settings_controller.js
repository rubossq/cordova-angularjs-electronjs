controllers.controller("settingsCtrl", ["$scope", "$auth", "$settingsView", "$settingsLang", "$dialogView", "$navView", "$way", "$action",
						function($scope, $auth, $settingsView, $settingsLang, $dialogView, $navView, $way, $action){
	$way.step($scope, "/settings");

	$scope.response = function(response){
		$settingsView.manageView($scope, response);
		setTimeout(function(){
			$dialogView.hideLoading();
		}, 500);
	}
	
	$scope.logout = function(){
		$navView.inactiveState();
		$dialogView.showLoading();
		$auth.logout($scope);
	}

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.shareApp = function(){
		$settingsView.shareApp($scope);
	}

	$scope.openService = function(service){
		$settingsView.openService(service);
	}

	$scope.openView = function(view){
		$settingsView.openView(view);
	}

	$scope.goLookOurApp = function(appId){
		$settingsView.goLookOurApp(appId);
	}

	$action.version($scope);
	$action.apps($scope);

	$settingsLang.setLang($scope);

	$settingsView.initViewParams();
	analytics.screenView("settings");
}]);