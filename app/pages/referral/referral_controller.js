controllers.controller("referralCtrl", ["$scope", "$routeParams", "$manager", "$udatar", "$referralView", "$referralLang", "$dialogView", "$way",
						function($scope, $routeParams, $manager, $udatar, $referralView, $referralLang, $dialogView, $way){
	$way.step($scope, "/referral/false");

	$scope.response = function(response){
		$referralView.manageView($scope, response);
	}

	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.showRefList = function(){
		$dialogView.showLoading();
		$udatar.getReferals($scope);
		$referralView.showRefList();
	}

	$scope.checkIsShowRefList = function(){
		if($routeParams.showList == "true"){
			$scope.showRefList();
		}
	}
	$scope.checkIsShowRefList();

	$scope.hideRefList = function(){
		$referralView.hideRefList($scope);
	}

	$scope.showRefInfo = function(){
		$referralView.showRefInfo();
	}

	$scope.enterRefNum = function(){
		if($manager.instance.getUser().isBotNet()){
			$referralView.showErrorMessage($scope);
		}else{
			$udatar.stayReferal($scope, $scope.enteredRefNum);
		}
	}

	$scope.hideStatus = function(){
		$referralView.hideStatus();
	}

	$scope.setColor = function(index, deposit){
		$referralView.setColor(index, deposit);
	}

	$scope.copy = function(type){
		$referralView.copy($scope, type);
	}

	$scope.setData = function(){
		$dialogView.showLoading();
		$udatar.getReferalData($scope);
	}

	$referralLang.setLang($scope);

	$referralView.initViewParams();
	$scope.setData();

	analytics.screenView("referral");
}]);