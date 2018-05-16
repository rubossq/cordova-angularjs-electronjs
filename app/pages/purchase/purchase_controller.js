controllers.controller("purchaseCtrl", ["$scope", "$udatar", "$action", "$purchaseView", "$purchaseLang", "$dialogView", "$way",
						function($scope, $udatar, $action, $purchaseView, $purchaseLang, $dialogView, $way){
	
	$way.step($scope, "/purchase");

	$scope.response = function(response){
		$purchaseView.manageView($scope, response);
	}

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setBlockColor = function(pack_id){
		return $purchaseView.setBlockColor(pack_id);
	}

	$scope.showUnsubscribe = function(id){
		$purchaseView.showUnsubscribe(id);
	}

	$scope.hideUnsubscribe = function(){
		$purchaseView.hideUnsubscribe();
	}

	$scope.confirmUnsubscribe = function(){
		$purchaseView.hideUnsubscribe();
		$dialogView.showLoading();

		$action.cancelSubscription($scope, $purchaseView.unsubsTurboId);
	}

	$scope.openShop = function(){
		$purchaseView.openShop();
	}

	$purchaseLang.setLang($scope);

	$dialogView.showLoading();
	$udatar.getOrderList($scope);

	$purchaseView.initViewParams();
	analytics.screenView("purchase");
}]);