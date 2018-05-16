services_views.service("$lvlPrizeView", ["$heighter", "$navView", function($heighter, $navView){
	var self = this;

	this.showPreview = function(index){
		switch(parseInt(++index)){
			case 1:
				$('.lvlprize-preview-image:first').attr("src", "images/earn_man1.png");
				break;
			case 10:
				$('.lvlprize-preview-image:first').attr("src", "images/earn_man2.png");
				break;
			case 20:
				$('.lvlprize-preview-image:first').attr("src", "images/earn_man3.png");
				break;
			case 30:
				$('.lvlprize-preview-image:first').attr("src", "images/earn_man4.png");
				break;
			case 40:
				$('.lvlprize-preview-image:first').addClass("lvlprize-preview-image-big");
				$('.lvlprize-preview-image:first').attr("src", "images/earn_man5.png");
				break;
			default:
				return;
		}
		$('.lvlprize-preview:first').removeClass("none");
	}

	this.hidePreview = function(){
		$('.lvlprize-preview:first').addClass("none");
		$('.lvlprize-preview-image').attr("src", "");
		$('.lvlprize-preview-image:first').removeClass("lvlprize-preview-image-big");
	}
	
	// set prizes for levels
	this.setItems = function($scope){
		var arr = [];
		for(var i = 1; i <= 50; i++){
			var points = {};
			if(i < 10){
				points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>";
			}else if(i < 20){
				points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>" + ", x1" + "<img class='lvlprize-box-image' src='app/pages/lvlprize/images/lvlprize_box.png'>";
			}else if(i == 20){
				points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>" + ", x1" + "<img class='lvlprize-other-image' src='images/turbo_1.png'>" + $scope.turboPrizeText;
			}else if(i < 40){
				points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>" + ", x1" + "<img class='lvlprize-box-image' src='app/pages/lvlprize/images/lvlprize_box.png'>";
			}else if(i == 40){
				points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>" + ", x1" + "<img class='lvlprize-other-image' src='images/premium.png'>";
			}else{
				if(i == 50)
					points.num = i + "+";
				else
					points.num = i + $scope.lvlLevelText;
				points.text = "x" + getBonusForLvl(i) + "<img class='lvlprize-coins-image' src='images/diamonds_red.png'>" + ", x1" + "<img class='lvlprize-box-image' src='app/pages/lvlprize/images/lvlprize_box.png'>";
			}
			arr[i-1] = points;
		}
		$scope.points = arr;
	}

	// num of diamonds for level
	function getBonusForLvl(lvl){
		var bonus = 0;
		if(lvl <= 40){
			var hard = Math.ceil(lvl / Config.HARD_RANGE);
			bonus = hard * Config.STEP_BONUS_PER_HARD;
		}else{
			bonus = Config.LEGEND_LVL_BONUS_SUM;
		}
		return bonus;
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".lvlprize-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".lvlprize-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".lvlprize-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	function cancelEvents(){
		$(".lvlprize-preview:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});
	}

	//init all functions in view
	this.initViewParams = function(){
		//cancel events on page
		cancelEvents();
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// hide header
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();
		}else{
			// hide navigation bar
			$(".navigation").addClass("none");
		}

		// set height of main content
		setContentSize();
	}
}]);