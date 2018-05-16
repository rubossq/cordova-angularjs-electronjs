controllers.controller("navCtrl", ["$scope", "$adView", "$navLang", "$navView",
						function($scope, $adView, $navLang, $navView){

	$scope.update = function(){
		$navView.update();
	}
	
	$scope.navigate = function(path){
		$adView.showAd();

		$navView.navigate(path);
	}

	$scope.switchPanel = function(){
		$navView.switchPanel();
	}

	$navLang.setLang($scope);
}]);