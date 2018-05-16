controllers.controller("paymentwallCtrl", ["$scope", "$routeParams", "$paymentwallView", "$dialogView", "$way",
						function($scope, $routeParams, $paymentwallView, $dialogView, $way){
	$way.step($scope, "/paymentwall");
	
	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setContent = function(){
		$dialogView.showLoading();
		$paymentwallView.setContent($scope, $routeParams.name, decodeURIComponent($routeParams.url));
	}

	$paymentwallView.initViewParams();
	$scope.setContent();

	analytics.screenView("paymentwall");
}]);