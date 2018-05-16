controllers.controller("authtroubleCtrl", ["$scope", "$authTroubleView", "$authTroubleLang", "$way",
						function($scope, $authTroubleView, $authTroubleLang, $way){
	$way.step($scope, "/authtrouble");
	
	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.feedBackUs = function(){
		$authTroubleView.feedBackUs();
	}

	$authTroubleLang.setLang($scope);

	$authTroubleView.initViewParams();
	analytics.screenView("authtrouble");
}]);