controllers.controller("liqpayCtrl", ["$scope", "$routeParams", "$liqpayView", "$store", "$dialogView", "$way",
						function($scope, $routeParams, $liqpayView, $store, $dialogView, $way){
	$way.step($scope, "/liqpay");

	$scope.response = function(response){
		$liqpayView.manageView($scope, response);
	}
	
	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setContent = function(){
		$liqpayView.setName($scope, $routeParams.name);

		$store.getEmbed($scope, $routeParams.id);
	}

	$liqpayView.initViewParams();
	$scope.setContent();

	analytics.screenView("liqpay");
}]);