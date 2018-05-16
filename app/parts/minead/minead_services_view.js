services_views.service("$mineAdView", ["$adLoader", function($adLoader){

	this.handleAd = function(windowObj, num){
		$adLoader.dismiss(windowObj, num);
	}

	function cancelEvents(){
		$(".minead-content").click(function(e){
			e.stopPropagation();
		});
	}

	//init all functions in view
	this.initViewParams = function($scope){
		// cancel events on page
		cancelEvents();
	}
}]);