controllers.controller("otheraccCtrl", ["$scope", "$rootScope", "$routeParams", "$manager", "$action", "$otheraccView", "$otheraccLang", 
						"$dialogView", "$longtabView", "$correct", "$way",
						function($scope, $rootScope, $routeParams, $manager, $action, $otheraccView, $otheraccLang, 
							$dialogView, $longtabView, $correct, $way){
	$way.step($scope, "/otheracc/" + $routeParams.nickname);

	$scope.response = function(response){
		$otheraccView.manageView($scope, response);
	}
	
	$scope.back = function(){
		$way.goBack($scope);
	}

	$scope.setPosts = function(index, src){
		$otheraccView.setPosts(index, src);
	}

	$scope.showOrderSubs = function(){
		$otheraccView.showOrderSubs();
	}

	$scope.hideOrderSubs = function(){
		$otheraccView.hideOrderSubs();
	}

	$scope.bidLikes = function(post){
		$dialogView.showDialogBidLikes(post.getId());
	}

	$scope.multipleBidLikes = function(index, $event){
		if($event){
			$event.stopPropagation();
		}
		$longtabView.showLongtab(index, $otheraccView.otherUser);
	}

	$scope.switchLongField = function(type, index){
		$otheraccView.switchLongField(type, index);
	}

	$scope.switchLongMark = function(type, index){
		$otheraccView.switchLongMark(type, index);
	}

	$scope.bidSubs = function(){
		$scope.link = Constant.HOME_PAGE + "/" + $routeParams.nickname;

		$dialogView.setButAnim("otheracc-dialog", true);
		var status = $correct.checkCorrect(Constant.SUBSCRIBE_TYPE, $scope.link, $scope.subsCountDialog);

		if(status.status == Constant.OK_STATUS){
			$action.bid($scope, new Bid($scope.link, $scope.subsCountDialog, Constant.SUBSCRIBE_TYPE));
		}else{
			$dialogView.setButAnim("otheracc-dialog", false);
			$dialogView.showToast(status.message);
		}
	}

	$scope.changePrice = function(){
		$otheraccView.setPrice($scope, $scope.subsCountDialog);
	}

	$scope.showMore = function(){
		$otheraccView.showMoreLoading();
		$action.moreFields($otheraccView.otherUser, $scope);
	}

	$scope.getUserInfo = function(){
		$dialogView.showLoading();

		var user = new User();
		user.setNick($routeParams.nickname);

		$action.getUserInfo($scope, user);
	}

	$otheraccLang.setLang($scope);

	$scope.getUserInfo();

	$otheraccView.initViewParams();

	analytics.screenView("otheracc");
}]);