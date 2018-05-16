controllers.controller("captchaCtrl", ["$scope", "$routeParams", "$captchaView", "$captchaLang", "$way",
						function($scope, $routeParams, $captchaView, $captchaLang, $way){
	$way.refresh();

	$scope.response = function(response){
		$captchaView.manageView($scope, response);
	}

	$scope.back = function(){
		$captchaView.back($scope);
	}

	$scope.setParams = function(){
		$captchaView.setParams($scope, $routeParams.hash, decodeURIComponent($routeParams.source));
	}
	$scope.setParams();

	$scope.checkCaptcha = function(){
		$captchaView.checkCaptcha($scope, $scope.hash, $scope.captchaCode);
	}

	$scope.hideError = function(){
		$captchaView.hideError();
	}

	$captchaView.initViewParams();

	$captchaLang.setLang($scope);
	analytics.screenView("captcha");
}]);