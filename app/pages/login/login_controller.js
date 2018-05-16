controllers.controller("loginCtrl", ["$scope", "$auth", "$loginView", "$loginLang", "$dialogView", "$way",
						function($scope, $auth, $loginView, $loginLang, $dialogView, $way){
	$way.step($scope, "/login");

	$scope.response = function(response){
		$loginView.manageView($scope, response);
		setTimeout(function(){
			$dialogView.hideLoading();
		}, 700);
	}

	$scope.auth = function(){
		$dialogView.showRegularLoading();
		$auth.auth($scope, new AuthData($scope.login, $scope.password, $scope.authType, ""));
	}

	$scope.helpAuth = function(){
		$loginView.helpAuth();
	}

	$scope.openPrivacy = function(){
		$loginView.openPrivacy();
	}

	$loginView.initViewParams();

	$loginLang.setLang($scope);
	$auth.preload($scope);

	analytics.screenView("login");
}]);