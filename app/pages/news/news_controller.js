controllers.controller("newsCtrl", ["$scope", "$rootScope", "$action", "$newsView", "$newsLang", "$dialogView", "$navView", "$way",
						function($scope, $rootScope, $action, $newsView, $newsLang, $dialogView, $navView, $way){
	$rootScope.locationTitle = $dialogView.strings.newsTitle;
	$way.step($scope, "/news");
	$newsView.clearTimer();

	$navView.setNavBut(Constant.NEWS_VIEW);

	$scope.response = function(response){
		$newsView.manageView($scope, response);
		setTimeout(function(){
			$newsView.show();
			$dialogView.hideLoading();
		}, 600);
	}
	
	$scope.completeFull = function(name, id, message, value){
		$action.complete(name, id, message, value, $scope);
	}
	
	$scope.news = function(){
		$dialogView.showLoading();
		$action.news($scope);
	}
	
	$scope.news();

	$newsView.initViewParams();
	$newsLang.setLang($scope);

	analytics.screenView("news");
}]);