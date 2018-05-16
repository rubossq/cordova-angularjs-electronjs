controllers.controller("mineAdCtrl", ["$scope", "$window", "$mineAdView", "$mineAdLang",
						function($scope, $window, $mineAdView, $mineAdLang){

	$scope.handleAd = function(num){
		$mineAdView.handleAd($window, num);
	}
	
	$mineAdLang.setLang($scope);
	$mineAdView.initViewParams($scope);
}]);