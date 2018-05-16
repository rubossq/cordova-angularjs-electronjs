controllers.controller("bidLikeCtrl", ["$scope", "$rootScope", "$manager", "$action", "$correct", 
						"$bidLikeView", "$navView", "$dialogView", "$longtabView", "$bidLikeLang", "$way", 
						function($scope, $rootScope, $manager, $action, 
							$correct, $bidLikeView, $navView, $dialogView, $longtabView, $bidLikeLang, $way){
	$rootScope.locationTitle = $dialogView.strings.bidLikesTitle;
	$way.step($scope, "/bid_like");

	$navView.setNavBut(Constant.BID_SUBS_VIEW);

	$scope.price = "";

	$scope.response = function(response){
		$bidLikeView.manageView($scope, response);
	}

	$scope.setPosts = function(index, src){
		$bidLikeView.setPosts(index, src);
	}

	$scope.bidLikes = function(post){
		$dialogView.showDialogBidLikes(post.getId());
	}
	
	$scope.bid = function(){
		var status = $correct.checkCorrect(Constant.LIKE_TYPE, $scope.link, $scope.targetCount);
		$bidLikeView.setButAnim(true);

		if(status.status == Constant.OK_STATUS){
			$action.bid($scope, new Bid($scope.link, $scope.targetCount, Constant.LIKE_TYPE));
		}else{
			$bidLikeView.setButAnim(false);
			$dialogView.showToast(status.message);
		}
	}
	
	$scope.changePrice = function(){
		$bidLikeView.setPrice($scope, $scope.targetCount);
	}

	$scope.multipleBidLikes = function(index, $event){
		if($event){
			$event.stopPropagation();
		}
		$longtabView.showLongtab(index, $manager.instance.getUser());
	}

	$scope.switchLongField = function(type, index){
		$bidLikeView.switchLongField(type, index);
	}

	$scope.switchLongMark = function(type, index){
		$bidLikeView.switchLongMark(type, index);
	}

	$scope.setFocus = function(){
		$bidLikeView.setFocus();
	}

	$scope.removeFocus = function(){
		$bidLikeView.removeFocus();
	}

	$scope.showMore = function(){
		$bidLikeView.showMoreLoading();
		$action.moreFields($manager.instance.getUser(), $scope);
	}

	//переключатель на странице лайков
	$scope.switcherLikes = function(num){
		$bidLikeView.switcherLikes($scope, num);
	}

	$bidLikeView.initViewParams();

	$bidLikeLang.setLang($scope);
	//initial state
	$bidLikeView.setInfo($scope);
	analytics.screenView("bid_like");
}]);