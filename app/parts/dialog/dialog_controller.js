controllers.controller("dialogCtrl", ["$scope", "$action", "$location", "$store", "$correct", "$dialogView", "$dialogLang",
						function($scope, $action, $location, $store, $correct, $dialogView, $dialogLang){

	$scope.numHours = 1;
	
	$scope.response = function(response){
		$dialogView.manageView($scope, response);
	}

	$scope.criticHideLoading = function(){
		$dialogView.hideLoading();
	}

	$scope.hidePrivateAcc = function(){
		$dialogView.hidePrivateAcc();
	}


	/* ENTER NICK B */
	$scope.hideEnterNick = function(){
		$dialogView.hideEnterNick();
	}

	$scope.sendEnterNick = function(){
		$dialogView.sendEnterNick($scope);
	}
	/* ENTER NICK E */


	/* BID LIKES B */
	$scope.hideDialogBidLikes = function(){
		$dialogView.hideDialogBidLikes();
	}
	
	$scope.bid = function(){
		$scope.link = Constant.HOME_PAGE + Constant.LIKES_LINK_IDENTIFIER + $scope.bidLikeId;

		$dialogView.setButAnim("bid-dialog", true);
		var status = $correct.checkCorrect(Constant.LIKE_TYPE, $scope.link, $scope.targetCountDialog);

		if(status.status == Constant.OK_STATUS){
			$action.bid($scope, new Bid($scope.link, $scope.targetCountDialog, Constant.LIKE_TYPE));
		}else{
			$dialogView.setButAnim("bid-dialog", false);
			$dialogView.showToast(status.message);
		}
	}

	$scope.changePrice = function(){
		$dialogView.setPrice($scope, $scope.targetCountDialog);
	}
	/* BID LIKES E */


	/* BID MORE LIKES B */
	$scope.hideBidMore = function(){
		$dialogView.hideBidMore();
	}

	$scope.bidMore = function(){
		if($dialogView.bidMoreTask.getType() == Constant.LIKE_TYPE){
			$scope.link = Constant.HOME_PAGE + Constant.LIKES_LINK_IDENTIFIER + $dialogView.bidMoreTask.getMeta();
		}else{
			$scope.link = Constant.HOME_PAGE + "/" + $dialogView.bidMoreTask.getMeta();
		}

		$dialogView.setButAnim("bidmore-dialog", true);
		var status = $correct.checkCorrect($dialogView.bidMoreTask.getType(), $scope.link, $scope.bidMoreCount);

		if(status.status == Constant.OK_STATUS){
			$action.bid($scope, new Bid($scope.link, $scope.bidMoreCount, $dialogView.bidMoreTask.getType()));
		}else{
			$dialogView.setButAnim("bidmore-dialog", false);
			$dialogView.showToast(status.message);
		}
	}

	$scope.changeMorePrice = function(){
		$dialogView.changeMorePrice($scope, $scope.bidMoreCount, $dialogView.bidMoreTask.getType());
	}
	/* BID MORE LIKES E */


	/* PAY DIALOG B */
	$scope.hidePayDialog = function(){
		$dialogView.hidePayDialog();
	}

	$scope.switchPayEmail = function(){
		$dialogView.switchPayEmail($scope);
	}

	$scope.setEmail = function(){
		$dialogView.setEmail($scope);
	}

	$scope.buy = function(){
		if($dialogView.buy($scope)){
			$store.getWidget($scope, $scope.userEmail, $dialogView.payData.id);
		}
	}
	/* PAY DIALOG E */


	/* PURCHASED GOODS B */
	$scope.hideGoods = function(){
		$dialogView.hideGoods();
	}
	/* PURCHASED GOODS E */


	/* TURN ON SPEEDUP B */
	$scope.hideSpeedUp = function(){
		$dialogView.hideSpeedUp();
	}

	$scope.selectSpeedButtons = function(num){
		$dialogView.selectSpeedButtons($scope, num);
	}

	$scope.startSpeedUp = function(){
		$dialogView.startSpeedUp($scope);
	}
	/* TURN ON SPEEDUP E */


	$dialogView.initViewParams();
	
	$dialogLang.setLang($scope);
}]);