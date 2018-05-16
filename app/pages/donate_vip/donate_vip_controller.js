controllers.controller("donateVipCtrl", ["$scope", "$udatar", "$donateVipView", "$store", "$donateVipLang", "$dialogView", "$way",
						function($scope, $udatar, $donateVipView, $store, $donateVipLang, $dialogView, $way){
	$way.step($scope, "/donate_vip");

	$scope.response = function(response){
		$donateVipView.manageView($scope, response);
		$dialogView.hideLoading();
	}

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.order = function(id){
		if($donateVipView.checkOrder(id)){
			if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
				$store.order(id);
			}else{
				$dialogView.showPayDialog(id);
			}
		}
	}
	
	$scope.init = function(){
		$store.init($store.VIP_SHOP, $scope.response);
	}
	
	$scope.$on("$destroy", function(){
		$store.off();
	});

	$donateVipLang.setLang($scope);

	$scope.init();
	if(Constant.CUR_DEVICE != Constant.IOS_DEVICE){
		$udatar.getGoods(Constant.CUR_PAY_SYSTEM, $scope);
	}

	$donateVipView.initViewParams();
	analytics.screenView("donate_vip");
}]);