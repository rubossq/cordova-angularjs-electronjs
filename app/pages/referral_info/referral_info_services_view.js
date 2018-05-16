services_views.service("$referralInfoView", ["$heighter", "$navView", function($heighter, $navView){
	var self = this;

	// set texts with bonuses and limits
	this.setInfo = function($scope){
		$scope.text3 = $scope.text3p1 + " " + Config.STAY_REFERAL_BONUS + " " + $scope.text3p2;

		$scope.text4 = $scope.text4p1 + " " + Config.REFERAL_PERCENT + "% " + $scope.text4p2;

		$scope.textBot = $scope.textBot1 + " " + Config.LIMIT_REFERAL_MIN + " " + $scope.textBot2;
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".referral-info-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".referral-info-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".referral-info-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		$(".goearn-but-block").removeClass("goearn-but-bottom");
		
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