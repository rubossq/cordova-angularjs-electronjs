services_views.service("$paymentwallView", ["$dialogView", "$navView", "$heighter", function($dialogView, $navView, $heighter){
	var self = this;

	this.setContent = function($scope, name, url){
		$scope.backText = name;
		
		$(".paymentwall-frame").attr("src", url);
		$('.paymentwall-frame').on('load', function(){
			$dialogView.hideLoading();
		});
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".paymentwall-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".paymentwall-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".paymentwall-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header and navbar
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();
		}else{
			// show navigation bar
			$(".navigation").addClass("none");
		}
		// set height of main content
		setContentSize();
	}
}]);