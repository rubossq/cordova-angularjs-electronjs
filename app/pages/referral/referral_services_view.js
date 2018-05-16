services_views.service("$referralView", ["$manager", "$routeParams", "$location", "$heighter", "$dialogView", "$navView", "$way", 
					function($manager, $routeParams, $location, $heighter, $dialogView, $navView, $way){
	var self = this;
	this.timer = 0;

	this.manageView = function($scope, response){
		if(response.status == Constant.OK_STATUS){
			this.okView($scope, response);
		}else{
			this.errView($scope, response);
		}
		$scope.$applyAsync();
	}
	
	this.okView = function($scope, response){
		switch(response.action){
			case "getReferalData":
				this.getReferalDataOk($scope, response);
				break;
			case "getReferals":
				this.getReferalsOk($scope, response);
				break;
			case "stayReferal":
				this.stayReferalOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "getReferalData":
				this.getReferalDataErr($scope, response);
				break;
			case "getReferals":
				this.getReferalsErr($scope, response);
				break;
			case "stayReferal":
				this.stayReferalErr($scope, response);
				break;
		}
	}

	this.getReferalDataOk = function($scope, response){
		$dialogView.hideLoading();
		// set link on app
		$scope.appLink = response.data.link;
		// set users ref number
		$scope.curRefNum = $manager.instance.getUser().getId();

		// if user is referral - hide enter field for ref link
		if(response.data.is_referal){
			$(".referral-data-enter").addClass("none");

			// show nick of referer
			$(".referral-data-referer").removeClass("none");
			$scope.usersReferer = response.data.nick;
		}

		if($routeParams.showList != "true"){
			// show referrals tutorial
			setTutorial($scope);
		}
	}
	
	this.getReferalDataErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.getReferalsOk = function($scope, response){
		$scope.referrals = response.data.referals;

		// show noreferrals image if has no referrals
		if($scope.referrals.length == 0){
			$(".referral-list").addClass("none");
			$(".referral-notasks-block").removeClass("none");
		}

		// set referral's timer
		setTimer($scope, response.data.diamonds, response.data.left);

		$dialogView.hideLoading();

		// disallow use back but
		$way.stopBack();
	}
	
	this.getReferalsErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.stayReferalOk = function($scope, response){
		// set global cash
		$dialogView.setCash(response.data.cash);
		// success enter referral num
		$scope.statusMessage = $scope.statusMessageOk1 + " " + response.data.login + " " + $scope.statusMessageOk2;
		$(".referral-status").removeClass("referral-status-error");
		$(".referral-status").removeClass("none");

		$(".referral-data-enter").addClass("none");

		// show nick of referer
		$(".referral-data-referer").removeClass("none");
		$scope.usersReferer = response.data.login;
		setTimeout(function(){
			$(".referral-status").addClass("none");
		}, 5000);
	}
	
	this.stayReferalErr = function($scope, response){
		this.showErrorMessage($scope);
	}

	this.showErrorMessage = function($scope){
		// show error enter referral num
		$scope.statusMessage = $scope.statusMessageErr;
		$(".referral-status").addClass("referral-status-error");
		$(".referral-status").removeClass("none");
	}

	this.showRefList = function(){
		$(".referral-ratedialog").removeClass("none");
	}

	// hide list of user's referrals
	this.hideRefList = function($scope){
		$(".referral-ratedialog").addClass("none");
		// allow use back but
		$way.playBack();

		// show referrals tutorial
		setTutorial($scope);
	}

	// go to the referral info
	this.showRefInfo = function(){
		$location.path("/referral_info");
	}

	// focus on referral num input
	this.hideStatus = function(){
		$(".referral-status").addClass("none");
		$(".referral-status").removeClass("referral-status-error");
	}

	this.setColor = function(index, deposit){
		if(deposit < Config.LIMIT_REFERAL_MIN){
			$(".referral-list-elem").eq(index).css("background-color", "#FFDFDF");
		}else{
			$(".referral-list-elem").eq(index).css("background-color", "#E1FFDF");
		}
	}

	// copy text in field
	this.copy = function($scope, type){
		var elem = "";
		switch(type){
			case "link":
				elem = $(".referral-data-input").eq(2);
				break;
			case "id":
				elem = $(".referral-data-input").eq(3);
				break;
		}

		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			var el = elem.get(0);
			var range = document.createRange();
			range.selectNodeContents(el);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			el.setSelectionRange(0, 999999);
		}else{
			elem.select();
		}

		try{
			document.execCommand('copy');
			$dialogView.showToast($scope.copiedText);
		}catch(err){}
		window.getSelection().removeAllRanges();
	}

	function setTimer($scope, diamonds, seconds){
		clearInterval(self.timer);
		var numsec = seconds;
		var ONE_HOUR = 3600;
		var ONE_MINUTE = 60;

		setTime();

		self.timer = setInterval(function(){
			if(numsec < 0)
				numsec = 86399;
			setTime();
		}, 1000);

		function getTime(){
			var hours = parseInt(numsec / ONE_HOUR);
			var mins = parseInt((numsec - (hours * ONE_HOUR)) / ONE_MINUTE);
			var secs = parseInt((numsec - (hours * ONE_HOUR)) - (mins * ONE_MINUTE));

			return setNull(hours) + ":" + setNull(mins) + ":" + setNull(secs);
		}

		function setTime(){
			$(".referral-counttime").html("<img class='referral-counttime-image' src='images/diamonds_white.png'><div class='referral-counttime-num inline'>" + 
				diamonds + "</div> " + $scope.throwText + " " + getTime());

			numsec--;
		}

		function setNull(num){
			return (num > 9) ? num : "0"+num;
		}
	}

	function setTutorial($scope){
		// show tutorial if first time
		setTimeout(function(){
			if($manager.instance.getUser().getTutorial(Config.REFERRAL_TUTORIAL) == 0){
				// disallow user back but
				$way.stopBack();

				new Tour({"elems": [".referral-info-left:first", ".referral-data-but:eq(0)", ".referral-data-but:eq(1)", ".referral-data-but:eq(2)"], 
						"texts": [$scope.guideRefEarnText, $scope.guideInputText, $scope.guideLinkText, $scope.guideUserRefNumText], 
						"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
						function(){
							$manager.instance.getDataManager().setTutorial(Config.REFERRAL_TUTORIAL, 1, function(){
								// allow user back but
								$way.playBack();
							});
						});
			}
		}, 100);
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".referral-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".referral-list").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".referral-counttime")]));

			$(".referral-notasks-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".referral-counttime")]));

			$heighter.restructureViewSize([{elem: ".referral-block", view: Constant.DESKTOP_VIEW, params: ""},
										{elem: ".referral-list", view: Constant.DESKTOP_VIEW, params: [$(".referral-counttime")]},
										{elem: ".referral-notasks-block", view: Constant.DESKTOP_VIEW, params: [$(".referral-counttime")]}]);
		}else{
			$(".referral-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));

			$(".referral-list").css("height", $heighter.setHeight(Constant.MINOR_VIEW, [$(".referral-counttime")]));

			$(".referral-notasks-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW, [$(".referral-counttime")]));
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