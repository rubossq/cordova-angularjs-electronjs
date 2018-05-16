controllers.controller("referralInfoCtrl", ["$scope", "$referralInfoView", "$referralInfoLang", "$way",
						function($scope, $referralInfoView, $referralInfoLang, $way){
	$way.step($scope, "/referral_info");
	
	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setInfo = function(){
		$referralInfoView.setInfo($scope);
	}

	$referralInfoLang.setLang($scope);

	$referralInfoView.initViewParams();
	$scope.setInfo();

	analytics.screenView("referral_info");
}]);