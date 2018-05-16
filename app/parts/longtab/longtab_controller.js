controllers.controller("longtabCtrl", ["$scope", "$action", "$longtabView", "$longtabLang", "$dialogView", "$correct", 
						function($scope, $action, $longtabView, $longtabLang, $dialogView, $correct){

	$scope.response = function(response){
		$longtabView.manageView($scope, response);
	}

	$scope.close = function(){
		$longtabView.close();
	}

	$scope.setPosts = function(index, src){
		$longtabView.setPosts(index, src);
	}

	$scope.toogleSelectAll = function(){
		$longtabView.toogleSelectAll();
	}

	$scope.selectAllFlags = function(){
		$longtabView.selectAllFlags();
	}

	$scope.clearAllFlags = function(){
		$longtabView.clearAllFlags();
	}

	$scope.flagPost = function(index){
		$longtabView.flagPost(index);
	}

	$scope.showMore = function(){
		$longtabView.showMoreLoading();
		$action.moreFields($longtabView.curUser, $scope);
	}

	$scope.hideLongtabDialog = function(){
		$longtabView.hideLongtabDialog();
	}

	$scope.showLongtabDialog = function(){
		if($longtabView.checkBidBut()){
			$longtabView.showLongtabDialog();
		}
	}

	$scope.changePrice = function(){
		$longtabView.setPrice($scope, $scope.longtabCount);
	}

	$scope.bid = function(){
		if($longtabView.curUser.isPrivate()){
			$longtabView.hideLongtabDialog();
			$scope.price = "";
			$scope.longtabCount = "";

			$dialogView.showPrivateAcc();
			return;
		}

		if($longtabView.checkCount($scope.longtabCount)){
			var posts = $longtabView.collectFlagPosts($scope);
			$action.bidList($scope, new BidInfo(posts, $scope.longtabCount));

			$dialogView.setButAnim("longtab-dialog", true);
		}
	}

	$longtabView.initViewParams();

	$longtabLang.setLang($scope);
}]);