controllers.controller("bidSubsCtrl", ["$scope", "$rootScope", "$manager", "$action", "$correct", "$bidSubsView", "$navView", 
						"$dialogView", "$bidSubsLang", "$manager", "$way",
						function($scope, $rootScope, $manager, $action, $correct, $bidSubsView, $navView, 
							$dialogView, $bidSubsLang, $manager, $way){
	$rootScope.locationTitle = $dialogView.strings.bidSubsTitle;
	$way.step($scope, "/bid_subs");

	$navView.setNavBut(Constant.BID_SUBS_VIEW);

	var numPanel = 1;				// what content is visible now(1 - bid on acc, 2 - bid by link)
	$scope.link = $manager.instance.getUser().getNick();
	$scope.priceAcc = "";
	$scope.priceLink = "";

	$scope.response = function(response){
		$bidSubsView.manageView($scope, response);
	}
	
	$scope.bid = function(){
		var status = null;

		var link = Constant.HOME_PAGE + "/" + $scope.link;
		if(numPanel == 1){
			status = $correct.checkCorrect(Constant.SUBSCRIBE_TYPE, link, $scope.targetCountAcc);
		}else{
			status = $correct.checkCorrect(Constant.SUBSCRIBE_TYPE, link, $scope.targetCountLink);
		}

		$bidSubsView.setButAnim(numPanel, true);

		if(status.status == Constant.OK_STATUS){
			if(numPanel == 1){
				$action.bid($scope, new Bid(link, $scope.targetCountAcc, Constant.SUBSCRIBE_TYPE));
			}else{
				$action.bid($scope, new Bid(link, $scope.targetCountLink, Constant.SUBSCRIBE_TYPE));
			}
		}else{
			$bidSubsView.setButAnim();
			$dialogView.showToast(status.message);
		}
	}
	
	$scope.changePrice = function(){
		if(numPanel == 1){
			$bidSubsView.setPrice($scope, $scope.targetCountAcc, numPanel);
		}else{
			$bidSubsView.setPrice($scope, $scope.targetCountLink, numPanel);
		}
	}

	$scope.acceptSubscribe = function(){
		$bidSubsView.acceptSubscribe();
	}

	//переключатель на странице подписчиков
	$scope.switcherSubs = function(num){
		numPanel = num;
		$bidSubsView.switcherSubs(num);
		if(num == 1){
			$scope.link = $manager.instance.getUser().getNick();
		}
	}

	$bidSubsView.initViewParams();
	
	$bidSubsLang.setLang($scope);
	analytics.screenView("bid_subs");
}]);