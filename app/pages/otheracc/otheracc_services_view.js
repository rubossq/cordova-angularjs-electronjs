services_views.service("$otheraccView", ["$manager", "$action", "$dialogView", "$navView", "$longtabView", "$heighter", 
					function($manager, $action, $dialogView, $navView, $longtabView, $heighter){
	var self = this;
	this.otherUser = new User();
	var curScrollTop = 0;
	var isNewPosts = true;	// don't check new posts while cur posts loading

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
			case "getUserInfo":
				this.userInfoOk($scope, response);
				break;
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
			case "getUserInfo":
				this.userInfoErr($scope, response);
				break;
			case "bid":
				this.bidErr($scope, response);
				break;
			case "moreFields":
				this.moreFieldsErr($scope, response);
				break;
		}
	}

	this.userInfoOk = function($scope, response){
		// set user info
		setInfo($scope, response.data);

		$(".otheracc-block").removeClass("none");

		// set height of main content
		setContentSize();

		$dialogView.hideLoading();
	}
	
	this.userInfoErr = function($scope, response){
		$scope.errText = $dialogView.strings.mhFail;

		$(".otheracc-err-block").removeClass("none");

		// set height of main content
		setContentSize();

		$dialogView.hideLoading();
	}

	this.bidOk = function($scope, response){
		// stop anim in but
		$dialogView.setButAnim("otheracc-dialog", false);
		$dialogView.showToast($dialogView.strings.bidOk);
		// hide dialog with subs order
		this.hideOrderSubs();
		// set current cash
		$dialogView.setCash(response.data.cash);
	}

	this.bidErr = function($scope, response){
		$dialogView.setButAnim("otheracc-dialog", false);
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
		}
	}

	this.moreFieldsOk = function($scope, response){
		$scope.posts = this.otherUser.getPosts();
		// send posts to longtab view
		$longtabView.putPosts($scope.posts);

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if(!self.otherUser.hasMorePosts()){
				$(".otheracc-more-but").addClass("none");
			}
			$('.otheracc-more-anim').addClass("none");
			$('.otheracc-more-text').removeClass("none");
		}else{
			newPostsLoad(false);
		}
	}
	
	this.moreFieldsErr = function($scope, response){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$('.otheracc-more-anim').addClass("none");
			$('.otheracc-more-text').removeClass("none");
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

	// set every post and set anim to it
	this.setPosts = function(index, src){
		$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("background-image", "url(" + src + ")");

		// set params if not desktop
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			var height = (window.innerWidth * 32 / 100) + "px";
			$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("line-height", height);
			$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("height", height);

			if(index % 3 == 0){
				$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("float", "left");
			}else if(index % 3 == 2){
				$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("float", "right");
			}else{
				$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("float", "left");
				$(".otheracc-info .quest-block .quest-elem-block").eq(index).css("margin-left", "2%");
			}
		}
		
		$(".otheracc-info .quest-block .quest-elem-block").eq(index).removeClass("none");
	}

	// show otheracc subs dialog
	this.showOrderSubs = function(){
		$('.otheracc-dialog-block').removeClass("none");
	}

	// hide otheracc subs dialog
	this.hideOrderSubs = function(){
		$('.otheracc-dialog-block').addClass("none");
	}

	this.setPrice = function($scope, count){
		if(count >= 0 && count != ''){
			$scope.priceSubs = count * Constant.SUBSCRIBE_PRICE;
		}else{
			$scope.priceSubs = "";
		}
	}

	// point mouse on field(DESKTOP)
	this.switchLongField = function(type, index){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			switch(type){
				case "over":
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-block").eq(index).removeClass("none");
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-mark").eq(index).removeClass("none");
					break;
				case "leave":
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-block").eq(index).addClass("none");
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-mark").eq(index).addClass("none");
					break;
			}
		}
	}

	// point mouse on mark(DESKTOP)
	this.switchLongMark = function(type, index){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			switch(type){
				case "over":
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-mark").eq(index).removeClass("quest-inactive-mark");
					break;
				case "leave":
					$(".otheracc-info .quest-block .quest-elem-block .quest-active-mark").eq(index).addClass("quest-inactive-mark");
					break;
			}
		}
	}

	// set loading in desktop show more but
	this.showMoreLoading = function(){
		$('.otheracc-more-text').addClass("none");
		$('.otheracc-more-anim').removeClass("none");
	}

	function setInfo($scope, userInfo){
		// set user info to cur user
		self.otherUser.setUserInfo(userInfo);
		// set users nick
		$scope.userNick = self.otherUser.getNick();
		// set users avatar
		$scope.userAvatar = self.otherUser.getProfileAvatar();
		// set users followers
		$scope.followersCount = self.otherUser.getFollowedCount();
		// set user is following
		$scope.followingCount = self.otherUser.getFollowsCount();
		// set users num of posts
		$scope.postsCount = self.otherUser.getPostsCount();

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if(self.otherUser.hasMorePosts()){
				$(".otheracc-more-but").removeClass("none");
			}
		}
		
		// if user's account is private
		if(self.otherUser.isPrivate()){
			$(".otheracc-empty-block").removeClass("none");
			$scope.emptyText = $scope.privateWall;
		}else{
			// if user have no posts
			if(self.otherUser.getPosts().length == 0){
				$(".otheracc-empty-block").removeClass("none");
				$scope.emptyText = $scope.emptyWall;
			}else{
				// set users posts
				$scope.posts = self.otherUser.getPosts();

				// send posts to longtab view
				$longtabView.putPosts($scope.posts);
			}
		}
	}

	function initScroll(){
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			document.querySelector(".otheracc-block").addEventListener("scroll", function(){
				// hide earn but while scrooling
				hideShowEarnBut();
				// check new posts
				checkNewPosts();
			});
		}else{
			document.querySelector(".otheracc-block").addEventListener("scroll", function(){
				// hide earn but while scrooling
				hideShowEarnBut();
			});
		}
	}

	function hideShowEarnBut(){
		if($(".otheracc-block").scrollTop() > curScrollTop){
			$(".goearn-but-block").css("display", "none");
			curScrollTop = $(".otheracc-block").scrollTop();
		}
		if($(".otheracc-block").scrollTop() < curScrollTop){
			$(".goearn-but-block").css("display", "inline");
			curScrollTop = $(".otheracc-block").scrollTop();
		}
	}

	function checkNewPosts(){
		var contentSize = $heighter.setHeight(Constant.MINOR_VIEW);

		if(($(".otheracc-block").scrollTop() + contentSize) >= ($(".otheracc-info").height() - 5)){
			if(self.otherUser.hasMorePosts() && isNewPosts){
				newPostsLoad(true);

				var appElement = document.querySelector('[ng-controller=otheraccCtrl]');
				var $scope = angular.element(appElement).scope();
				$action.moreFields(self.otherUser, $scope);
			}
		}
	}

	// show or hide loading new images in "show more" button
	function newPostsLoad(type){
		if(type){
			$(".otheracc-more-block:first").removeClass("none");
			// scroll to bottom
			$(".otheracc-block").scrollTop($(".otheracc-info").height());
			isNewPosts = false;
		}else{
			// minus loadlock height for scroll
			curScrollTop -= $(".otheracc-more-block:first").outerHeight(true);
			$(".otheracc-more-block:first").addClass("none");
			isNewPosts = true;
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".otheracc-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".otheracc-err-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".otheracc-empty-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".otheracc-info")]));

			$heighter.restructureViewSize([{elem: ".otheracc-block", view: Constant.DESKTOP_VIEW, params: ""},
										{elem: ".otheracc-err-block", view: Constant.DESKTOP_VIEW, params: ""},
										{elem: ".otheracc-empty-block", view: Constant.DESKTOP_VIEW, params: [$(".otheracc-info")]}]);
		}else{
			$(".otheracc-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));

			$(".otheracc-err-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));

			$(".otheracc-empty-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW, [$(".otheracc-info")]));
		}
	}

	function cancelEvents(){
		$(".otheracc-dialog-content").click(function(e){
			e.stopPropagation();
		});
		
		$(".otheracc-dialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});
	}

	//init all functions in view
	this.initViewParams = function(){
		// show go to earn button
		$(".goearn-but-block").css("display", "inline");
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

		// init content scroll
		initScroll();

		// cancel events on page
		cancelEvents();
	}
}]);