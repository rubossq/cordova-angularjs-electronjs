services_views.service("$topView", ["$manager", "$dialogView", "$navView", "$heighter", function($manager, $dialogView, $navView, $heighter){
	var timer;
	var self = this;
	
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
			case "top":
				this.topOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "top":
				this.topErr($scope, response);
				break;
		}
	}
	
	this.topOk = function($scope, response){
		$scope.tops = response.data.tops;

		// set time before the end of competition
		setTimer(response.data.left);

		// set user info in competition
		setTopUserInfo($scope, response.data.place);
	}
	
	this.topErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_TOP:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	// show dialog with prizes in top
	this.showHelpDialog = function(){
		$(".top-dialog-block:first").removeClass("none");
	}
	
	// hide dialog with prizes in top
	this.hideHelpDialog = function(){
		$(".top-dialog-block:first").addClass("none");
	}

	this.placeColors = function(index){
		var color = "";
		switch(index){
			case 0:
				color = "#26B922";
				break;
			case 1:
				color = "#FBBB10";
				break;
			case 2:
				color = "#24C9E1";
				break;
			case 3:
				color = "#3D62EA";
				break;
			case 4:
				color = "#CC1FA5";
				break;
			default:
				color = "#C0C0C0";
				break;
		}

		$(".top-pos-place").eq(index).css("background-color", color);
	}

	this.clearTimer = function(){
		clearInterval(timer);
	}

	function setTimer(seconds){
		var numsec = seconds;
		var ONE_HOUR = 3600;
		var ONE_MINUTE = 60;

		setTime();

		timer = setInterval(function(){
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
			$(".top-time-block").text(getTime());
			numsec--;
		}

		function setNull(num){
			return (num > 9) ? num : "0"+num;
		}
	}

	function setTopUserInfo($scope, place){
		// set nickname in userpos
		$scope.userposNick = $manager.instance.getUser().getNick();
		// set place in userpos
		$scope.userposPlace = place;

		// if 1-5 place so don't show usertop
		if(place > 5){
			$(".top-userpos").removeClass("none");
		}
		$scope.$applyAsync();

		setTimeout(function(){
			setContentSize();
		}, 200);
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".top-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".top-info")]));

			$heighter.restructureViewSize([{elem: ".top-block", view: Constant.DESKTOP_VIEW, params: [$(".top-info")]}]);
		}else{
			$(".top-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW, [$(".top-info")]));
		}
	}

	function cancelEvents(){
		$(".top-dialog-block").bind("scroll touchmove", function(e){
			e.preventDefault();
		});

		$(".top-dialog-content:first").click(function(){
			return false;
		});
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
		
		// cancel events on page
		cancelEvents();
	}
}]);