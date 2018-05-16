controllers.controller("lvlPrizeCtrl", ["$scope", "$lvlPrizeView", "$lvlPrizeLang", "$way",
						function($scope, $lvlPrizeView, $lvlPrizeLang, $way){
	
	$way.step($scope, "/lvlprize");

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.showPreview = function(index){
		$lvlPrizeView.showPreview(index);
	}

	$scope.hidePreview = function(){
		$lvlPrizeView.hidePreview();
	}

	$lvlPrizeLang.setLang($scope);
	$lvlPrizeView.setItems($scope);

	$lvlPrizeView.initViewParams();
	analytics.screenView("lvlprize");
}]);