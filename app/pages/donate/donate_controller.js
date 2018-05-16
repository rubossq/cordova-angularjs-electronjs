controllers.controller("donateCtrl", ["$scope", "$rootScope", "$udatar", "$routeParams", "$donateView", "$store", "$donateLang", 
						"$dialogView", "$navView", "$way",
						function($scope, $rootScope, $udatar, $routeParams, $donateView, $store, $donateLang, 
							$dialogView, $navView, $way){
	$rootScope.locationTitle = $dialogView.strings.donateTitle;
	$way.step($scope, "/donate/diamonds");

	$navView.setNavBut(Constant.DONATE_VIEW);

	$scope.response = function(response){
		$donateView.setDonateContent($scope, $routeParams.id);
		$donateView.manageView($scope, response);
		$dialogView.hideLoading();
	}

	$scope.order = function(id){
		if($donateView.checkOrder(id)){
			if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
				$store.order(id);
			}else{
				$dialogView.showPayDialog(id);
			}
		}
	}
	
	$scope.init = function(){
		$store.init($store.SIMPLE_SHOP, $scope.response);
	}
	
	$scope.$on("$destroy", function(){
		$store.off();
	});

	$donateView.initViewParams();

	$scope.init();
	if(Constant.CUR_DEVICE != Constant.IOS_DEVICE){
		$udatar.getGoods(Constant.CUR_PAY_SYSTEM, $scope);
	}
	

	$donateLang.setLang($scope);
	analytics.screenView("donate");
}]);