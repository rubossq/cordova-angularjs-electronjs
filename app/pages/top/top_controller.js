controllers.controller("topCtrl", ["$scope", "$topView", "$topLang", "$action", "$dialogView", "$way",
						function($scope, $topView, $topLang, $action, $dialogView, $way){
	$topView.clearTimer();
	$way.step($scope, "/top");

	$scope.response = function(response){
		$topView.manageView($scope, response);
		setTimeout(function(){
			$dialogView.hideLoading();
		}, 500);
	}
	
	$scope.back = function(){
		$way.goBack($scope);
	}
	
	$scope.showHelpDialog = function(){
		$topView.showHelpDialog();
	}
	
	$scope.hideHelpDialog = function(){
		$topView.hideHelpDialog();
	}

	$scope.placeColors = function(index){
		$topView.placeColors(index);
	}

	$dialogView.showLoading();
	$action.top($scope);
	
	$topLang.setLang($scope);

	$topView.initViewParams();
	analytics.screenView("top");
}]);