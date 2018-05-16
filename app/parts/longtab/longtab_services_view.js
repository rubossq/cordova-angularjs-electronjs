services_views.service("$longtabView", ["$manager", "$rootScope", "$action", "$dialogView", "$heighter", "$way", "$lang", 
					function($manager, $rootScope, $action, $dialogView, $heighter, $way, $lang){
	var self = this;
	this.curUser = new User();
	var strings = {};
	var flagsCount = 0;
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
			case "bidList":
				this.bidListOk($scope, response);
				break;
			case "moreFields":
				this.moreFieldsOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "bidList":
				this.bidListErr($scope, response);
				break;
			case "moreFields":
				this.moreFieldsErr($scope, response);
				break;
		}
	}

	this.bidListOk = function($scope, response){
		$dialogView.setButAnim("longtab-dialog", false);
		$scope.price = "";
		$scope.longtabCount = "";
		
		$dialogView.showToast($dialogView.strings.bidOk);

		this.hideLongtabDialog();

		$dialogView.setCash(response.data.cash);

		this.close();
	}

	this.bidListErr = function($scope, response){
		$dialogView.setButAnim("longtab-dialog", false);

		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_BID:
				$dialogView.showToast($dialogView.strings.bidFail);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.moreFieldsOk = function($scope, response){
		$scope.longPosts = this.curUser.getPosts();

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if(!self.curUser.hasMorePosts()){
				$(".longtab-more-but").addClass("none");
			}
			$('.longtab-more-anim').addClass("none");
			$('.longtab-more-text').removeClass("none");
		}else{
			newPostsLoad(false);
		}
	}
	
	this.moreFieldsErr = function($scope, response){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$('.longtab-more-anim').addClass("none");
			$('.longtab-more-text').removeClass("none");
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
	
	this.close = function(){
		$(".longtab-block").addClass("none");

		// clear al flags on posts
		this.clearAllFlags();

		// allow use back but
		$way.playBack();
	}

	// set loading in desktop show more but
	this.showMoreLoading = function(){
		$('.longtab-more-text').addClass("none");
		$('.longtab-more-anim').removeClass("none");
	}

	// set every post and set anim to it
	this.setPosts = function(index, src){
		$(".longtab-content .quest-block .quest-elem-block").eq(index).css("background-image", "url(" + src + ")");

		// set params if not desktop
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			var height = (window.innerWidth * 32 / 100) + "px";
			$(".longtab-content .quest-block .quest-elem-block").eq(index).css("line-height", height);
			$(".longtab-content .quest-block .quest-elem-block").eq(index).css("height", height);

			if(index % 3 == 0){
				$(".longtab-content .quest-block .quest-elem-block").eq(index).css("float", "left");
			}else if(index % 3 == 2){
				$(".longtab-content .quest-block .quest-elem-block").eq(index).css("float", "right");
			}else{
				$(".longtab-content .quest-block .quest-elem-block").eq(index).css("float", "left");
				$(".longtab-content .quest-block .quest-elem-block").eq(index).css("margin-left", "2%");
			}
		}
	}

	this.toogleSelectAll = function(){
		// turn select all image
		$(".longtab-select-image").toggleClass("longtab-select-rotate");
		// show or hide select all but
		$(".longtab-select-all").toggleClass("none");
	}
	
	this.selectAllFlags = function(){
		$(".longtab-content").find(".quest-elem-block").each(function(){
			$(this).attr("data-status", 1);
			$(this).find(".quest-active-block").removeClass("none");
			$(this).find(".quest-active-mark").removeClass("none");
		});

		// turn select all image
		$(".longtab-select-image").removeClass("longtab-select-rotate");
		// hide select all but
		$(".longtab-select-all").addClass("none");

		// count flag posts
		countFlags();
		// set bid image
		toogleBidBut();
	}

	this.clearAllFlags = function(){
		$(".longtab-content").find(".quest-elem-block").each(function(){
			$(this).attr("data-status", 0);
			$(this).find(".quest-active-block").addClass("none");
			$(this).find(".quest-active-mark").addClass("none");
		});

		// turn select all image
		$(".longtab-select-image").removeClass("longtab-select-rotate");
		// hide select all but
		$(".longtab-select-all").addClass("none");

		// count flag posts
		countFlags();
		// set bid image
		toogleBidBut();
	}

	this.flagPost = function(index){
		var post = $(".longtab-content").find(".quest-elem-block").eq(index);

		if(post.attr("data-status") == 0){
			post.attr("data-status", 1);
			post.find(".quest-active-block").removeClass("none");
			post.find(".quest-active-mark").removeClass("none");

			// turn on vibrate
			$dialogView.vibrate(30);
		}else{
			post.attr("data-status", 0);
			post.find(".quest-active-block").addClass("none");
			post.find(".quest-active-mark").addClass("none");
		}

		// count flag posts
		countFlags();
		// set bid image
		toogleBidBut();
	}

	this.putPosts = function(posts){
		// get scope longtab ctrl
		var $scope = angular.element(document.querySelector('[ng-controller=longtabCtrl]')).scope();

		// set posts to view
		$scope.longPosts = posts;
		$scope.$applyAsync();
	}

	this.collectFlagPosts = function($scope){
		var posts = new Array();
		$(".longtab-content").find(".quest-elem-block").each(function(){
			if($(this).attr("data-status") == 1){
				posts.push($scope.longPosts[$(this).index()]);
			}
		});

		return posts;
	}

	this.showLongtab = function(index, user){
		var content = $(".longtab-content");

		content.find(".quest-elem-block").eq(index).attr("data-status", 1);
		content.find(".quest-elem-block").eq(index).find(".quest-active-block").removeClass("none");
		content.find(".quest-elem-block").eq(index).find(".quest-active-mark").removeClass("none");

		// set current user
		if(user){
			this.curUser = user;
		}

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show more but
			if(this.curUser.hasMorePosts()){
				$(".longtab-more-but").removeClass("none");
			}
		}
		
		// count flag posts
		countFlags();

		// set bid but
		toogleBidBut();

		$(".longtab-block").removeClass("none");

		// set height of main content
		setContentSize();
		// disallow use back but
		$way.stopBack();

		scrollToPost(content.find(".quest-elem-block").eq(index));
	}

	// hide longtab dialog
	this.hideLongtabDialog = function(){
		$('.longtab-dialog-block').addClass("none");
	}

	// show longtab dialog
	this.showLongtabDialog = function(){
		$('.longtab-dialog-block').removeClass("none");
	}

	this.checkBidBut = function(){
		if(flagsCount == 0){
			return false;
		}else{
			return true;
		}
	}

	this.setPrice = function($scope, count){
		if(count >= 0 && count != ''){
			$scope.price = (count * flagsCount) * Constant.LIKE_PRICE;
		}else{
			$scope.price = "";
		}
	}

	// check enter sum in order
	this.checkCount = function(count){
		if(!isNumeric(count) || count <= 0){
			$dialogView.showToast(this.strings.errNumber);
			return false;
		}else{
			if(((count * flagsCount) * Constant.LIKE_PRICE) > parseInt($manager.instance.getUser().getCash().getDeposit())){
				$dialogView.showToast(this.strings.noCoins);
				return false;
			}else{
				return true;
			}
		}
	}

	function isNumeric(num){
		return !isNaN(parseFloat(num)) && isFinite(num) && (parseFloat(num) ^ 0) === (parseFloat(num));
	}

	// count all flag posts
	function countFlags(){
		flagsCount = 0;
		$(".longtab-content").find(".quest-elem-block").each(function(){
			if($(this).attr("data-status") == 1){
				flagsCount++;
			}
		});

		if(flagsCount == 0){
			$(".longtab-select-num").text(0);
		}else{
			$(".longtab-select-num").text(flagsCount);
		}
	}

	function scrollToPost(elem){
		$(".longtab-content").scrollTop(0);
		var scrollPlace = (elem.offset().top - ($(".longtab-topbar").height() + $(".longtab-content-margin").height()))
						 - (($(".longtab-content").height() - elem.height()) / 2);

		if(scrollPlace > 0){
			$(".longtab-content").scrollTop(scrollPlace);
		}
	}

	function toogleBidBut(){
		if(flagsCount == 0){
			$(".longtab-bid-wrap").css("opacity", 0);
		}else{
			$(".longtab-bid-wrap").css("opacity", 1);
		}
	}

	function initScroll(){
		if(Constant.CUR_DEVICE != Constant.WINDOWS_DEVICE && Constant.CUR_DEVICE != Constant.MAC_DEVICE){
			document.querySelector(".longtab-content").addEventListener("scroll", function(){
				// check new posts
				checkNewPosts();
			});
		}
	}

	function checkNewPosts(){
		var contentSize = $heighter.setHeight(Constant.MINOR_VIEW, [$(".longtab-diamonds-block")]);

		if(($(".longtab-content").scrollTop() + contentSize) >= ($(".longtab-info").height() - 5)){
			if(self.curUser.hasMorePosts() && isNewPosts){
				newPostsLoad(true);

				var appElement = document.querySelector('[ng-controller=longtabCtrl]');
				var $scope = angular.element(appElement).scope();
				$action.moreFields(self.curUser, $scope);
			}
		}
	}

	// show or hide loading new images in "show more" button
	function newPostsLoad(type){
		if(type){
			$(".longtab-more-block:first").removeClass("none");
			// scroll to bottom
			$(".longtab-content").scrollTop($(".longtab-info").height());
			isNewPosts = false;
		}else{
			// minus loadlock height for scroll
			curScrollTop -= $(".longtab-more-block:first").outerHeight(true);
			$(".longtab-more-block:first").addClass("none");
			isNewPosts = true;
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".longtab-content").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".longtab-diamonds-block")]));

			$heighter.restructureViewSize([{elem: ".longtab-content", view: Constant.DESKTOP_VIEW, params: [$(".longtab-diamonds-block")]}]);
		}else{
			$(".longtab-content").css("height", $heighter.setHeight(Constant.MINOR_VIEW, [$(".longtab-diamonds-block")]));
		}
	}

	function cancelEvents(){
		$(".longtab-select-all").click(function(){
			return false;
		});

		$(".longtab-dialog-content").click(function(e){
			e.stopPropagation();
		});

		$(".longtab-dialog-block:first").bind('scroll touchmove', function(e){
			e.preventDefault();
		});
	}

	this.initViewParams = function(){
		// cancel events on page
		cancelEvents();

		// init content scroll
		initScroll();

		$lang.getLang(Constant.CORRECT_VIEW, function(lang){
			self.strings = lang;
		});
	}
}]);