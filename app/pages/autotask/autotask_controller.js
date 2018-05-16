controllers.controller("autotaskCtrl", ["$scope", "$autotaskView", "$autotaskLang", "$way", 
					function($scope, $autotaskView, $autotaskLang, $way){
	$way.step($scope, "/autotask");

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setLimit = function(){
		$autotaskView.setLimit($scope);
	}

	$scope.hideLikesDialog = function(){
		$autotaskView.hideLikesDialog();
	}

	$autotaskLang.setLang($scope);

	$autotaskView.initViewParams($scope);
	analytics.screenView("autotask");
}]);