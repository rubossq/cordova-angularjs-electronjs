services_views.service("$bidLikeView", ["$manager", "$action", "$dialogView", "$longtabView", "$heighter", "$way",
					function($manager, $action, $dialogView, $longtabView, $heighter, $way){
	var self = this;
	var curScrollTop = 0;
	var isNewPosts = true;	// don't check new posts while cur posts loading
	this.curFocus = true;

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
			case "bid":
				this.bidOk($scope, response);
				break;
			case "moreFields":
				this.moreFieldsOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "bid":
				this.bidErr($scope, response);
				break;
			case "moreFields":
				this.moreFieldsErr($scope, response);
				break;
		}
	}
	
	this.moreFieldsOk = function($scope, response){
		$scope.posts = $manager.instance.getUser().getPosts();
		// send posts to longtab view
		$longtabView.putPosts($scope.posts);

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if(!$manager.instance.getUser().hasMorePosts()){
				$(".bid-like-more-but").addClass("none");
			}
			$('.bid-like-more-anim').addClass("none");
			$('.bid-like-more-text').removeClass("none");
		}else{
			newPostsLoad(false);
		}
	}
	
	this.moreFieldsErr = function($scope, response){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$('.bid-like-more-anim').addClass("none");
			$('.bid-like-more-text').removeClass("none");
		}else{
			newPostsLoad(false);
		}
		switch(response.data.errorCode){
			case Constant.ERR_CODE_BROWSER_UPDATE:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.bidOk = function($scope, response){
		self.setButAnim(false);
		$dialogView.showToast($dialogView.strings.bidOk);
		$dialogView.setCash(response.data.cash);

		// clear inputs
		$scope.targetCount = "";
	}
	
	this.bidErr = function($scope, response){
		self.setButAnim(false);
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_BID:
				$dialogView.showToast($dialogView.strings.bidFail);
				break;
			case Constant.ERR_CODE_BROWSER_BID:
				$dialogView.showToast($dialogView.strings.mhFail);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_BROWSER_PRIVATE:
				$dialogView.showPrivateAcc();
				break;
		}
	}

	// set every post and set anim to it
	this.setPosts = function(index, src){
		$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("background-image", "url(" + src + ")");

		// set params if not desktop
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			var height = (window.innerWidth * 32 / 100) + "px";
			$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("line-height", height);
			$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("height", height);

			if(index % 3 == 0){
				$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("float", "left");
			}else if(index % 3 == 2){
				$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("float", "right");
			}else{
				$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("float", "left");
				$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).css("margin-left", "2%");
			}
		}
		
		$(".bid-like-list-info .quest-block .quest-elem-block").eq(index).removeClass("none");
	}
	
	this.setInfo = function($scope){
		$scope.posts = $manager.instance.getUser().getPosts();
		// send posts to longtab view
		$longtabView.putPosts($scope.posts);
		// set notasks image if has no posts
		if($scope.posts.length == 0){
			$('.bid-like-list-block:first').addClass("none");
			$('.bid-like-notasks-block:first').removeClass("none");
		}else{
			// show tutorial if first time
			setTimeout(function(){
				if($manager.instance.getUser().getTutorial(Config.BID_TUTORIAL) == 0){
					// disallow user back but
					$way.stopBack();

					if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
						$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-block").eq(0).removeClass("none");
						$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(0).removeClass("none");
						$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(0).removeClass("quest-inactive-mark");

						new Tour({"elems": [".bid-like-list-info .quest-elem-block:first", 
											".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark:eq(0)"], 
								"texts": [$scope.guideQuestHintText, $scope.guideLongTabDeskText], 
								"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
								function(){
									$manager.instance.getDataManager().setTutorial(Config.BID_TUTORIAL, 1, function(){
										// allow user back but
										$way.playBack();

										$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-block").eq(0).addClass("none");
										$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(0).addClass("none");
										$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(0).addClass("quest-inactive-mark");
									});
								});
					}else{
						new Tour({"elems": [".bid-like-list-info .quest-elem-block:first", ".bid-like-list-info .quest-elem-block:first"], 
								"texts": [$scope.guideQuestHintText, $scope.guideLongTabMobText], 
								"buttons": [$scope.guideNextText, $scope.guideReadyText, $scope.guideSkipText]}, 
								function(){
									$manager.instance.getDataManager().setTutorial(Config.BID_TUTORIAL, 1, function(){
										// allow user back but
										$way.playBack();
									});
								});
					}
				}
			}, 100);
		}

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if($manager.instance.getUser().hasMorePosts()){
				$(".bid-like-more-but").removeClass("none");
			}
		}
	}
	
	this.setPrice = function($scope, count){
		if(count >= 0 && count != ''){
			$scope.price = count * Constant.LIKE_PRICE;
		}else{
			$scope.price = "";
		}
	}

	// point mouse on field(DESKTOP)
	this.switchLongField = function(type, index){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			switch(type){
				case "over":
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-block").eq(index).removeClass("none");
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(index).removeClass("none");
					break;
				case "leave":
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-block").eq(index).addClass("none");
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(index).addClass("none");
					break;
			}
		}
	}

	// point mouse on mark(DESKTOP)
	this.switchLongMark = function(type, index){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			switch(type){
				case "over":
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(index).removeClass("quest-inactive-mark");
					break;
				case "leave":
					$(".bid-like-list-info .quest-block .quest-elem-block .quest-active-mark").eq(index).addClass("quest-inactive-mark");
					break;
			}
		}
	}

	// focus on referral num input
	this.setFocus = function(){
		this.curFocus = false;
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			$("#likeBotButtons").css("display", "none");
		}
		$(".goearn-but-block").css("display", "none");
	}

	// blur from referral num input
	this.removeFocus = function(){
		this.curFocus = true;
		setTimeout(function(){
			if(self.curFocus){
				if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
					$("#likeBotButtons").css("display", "block");
				}
				$(".goearn-but-block").css("display", "inline");
			}
		}, 200);
	}

	// set loading in desktop show more but
	this.showMoreLoading = function(){
		$('.bid-like-more-text').addClass("none");
		$('.bid-like-more-anim').removeClass("none");
	}

	// switch buttons on bottom
	this.switcherLikes = function($scope, num){
		switch(num){
			case 1:
				// switch buttons
				$('#butLikeList').addClass("bid-but-active");
				$('#butLikeLink').removeClass("bid-but-active");

				// switch content
				$('.bid-like-link-block').addClass("none");
				if($scope.posts.length == 0){
					$('.bid-like-notasks-block').removeClass("none");
					$('.bid-like-list-block').addClass("none");
				}else{
					$('.bid-like-list-block').removeClass("none");
				}
			break;
			case 2:
				$('#butLikeList').removeClass("bid-but-active");
				$('#butLikeLink').addClass("bid-but-active");

				// switch content
				$('.bid-like-list-block').addClass("none");
				$('.bid-like-link-block').removeClass("none");
				$('.bid-like-notasks-block').addClass("none");
			break;
		}
	}

	// show or hide loading in button
	this.setButAnim = function(isAnim){
		if(isAnim){
			$("#likeSend").addClass("none");
			$("#likeSendAnim").removeClass("none");
		}else{
			$("#likeSend").removeClass("none");
			$("#likeSendAnim").addClass("none");
		}
	}

	function initScroll(){
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			document.querySelector(".bid-like-list-block").addEventListener("scroll", function(){
				// hide earn but while scrooling
				hideShowEarnBut();
				// check new posts
				checkNewPosts();
			});
		}else{
			document.querySelector(".bid-like-list-block").addEventListener("scroll", function(){
				// hide earn but while scrooling
				hideShowEarnBut();
			});
		}
	}

	function hideShowEarnBut(){
		if($(".bid-like-list-block").scrollTop() > curScrollTop){
			$(".goearn-but-block").css("display", "none");
			curScrollTop = $(".bid-like-list-block").scrollTop();
		}
		if($(".bid-like-list-block").scrollTop() < curScrollTop){
			$(".goearn-but-block").css("display", "inline");
			curScrollTop = $(".bid-like-list-block").scrollTop();
		}
	}

	function checkNewPosts(){
		var contentSize = $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]);

		if(($(".bid-like-list-block").scrollTop() + contentSize) >= ($(".bid-like-list-info").height() - 5)){
			if($manager.instance.getUser().hasMorePosts() && isNewPosts){
				newPostsLoad(true);

				var appElement = document.querySelector('[ng-controller=bidLikeCtrl]');
				var $scope = angular.element(appElement).scope();
				$action.moreFields($manager.instance.getUser(), $scope);
			}
		}
	}

	// show or hide loading new images in "show more" button
	function newPostsLoad(type){
		if(type){
			$(".bid-like-more-block").removeClass("none");
			// scroll to bottom
			$(".bid-like-list-block").scrollTop($(".bid-like-list-info").height());
			isNewPosts = false;
		}else{
			// minus loadlock height for scroll
			curScrollTop -= $(".bid-like-more-block").outerHeight(true);
			$(".bid-like-more-block").addClass("none");
			isNewPosts = true;
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".bid-like-list-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-like-notasks-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-like-link-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$heighter.restructureViewSize([{elem: ".bid-like-list-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]}, 
										{elem: ".bid-like-notasks-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]},
										{elem: ".bid-like-link-block", view: Constant.DESKTOP_VIEW, params: [$(".bid-select"), $(".bid-buttons")]}]);
		}else{
			$(".bid-like-list-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-like-notasks-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));

			$(".bid-like-link-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".bid-select"), $(".bid-buttons")]));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// show go to earn button
		$(".goearn-but-block").css("display", "inline");
		$(".goearn-but-block").addClass("goearn-but-bottom");

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header
			$(".header").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// set height of main content
		setContentSize();

		// init content scroll
		initScroll();
	}
}]);