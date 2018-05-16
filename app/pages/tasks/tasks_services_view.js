services_views.service("$tasksView", ["$manager", "$rootScope", "$action", "$dialogView", "$heighter", "$way",
					function($manager, $rootScope, $action, $dialogView, $heighter, $way){
	
	var self = this;
	var swipe = null;
	var curScrollTop = 0;

	this.isUpdating = false;

	this.deleteTask = {};

	this.initSwipe = function(){
		var appElement = document.querySelector('[ng-controller=tasksCtrl]');
		var $scope = angular.element(appElement).scope();

		var tasksWrap = document.querySelector("#tasksWrap");
		swipe = new Swiper(tasksWrap, Swiper.SELF, Swiper.screenHeight, "y", Swiper.BOT, 15, 0, function(type){
			switch(type){
				case Swiper.START:
					break;
				case Swiper.GOAL:
					$(".tasks-update-block").removeClass("none");
					break;
				case Swiper.ENABLE_END:
					if(!self.isUpdating){
						self.isUpdating = true;

						$(".tasks-update-block").css("position", "relative");
						$(".tasks-update-image").addClass("rotating");
						$action.tasks($scope);
					}
					break;
				case Swiper.DISABLE_END:
					$(".tasks-update-block").css("position", "absolute");
					$(".tasks-update-image").removeClass("rotating");
					$(".tasks-update-block").addClass("none");
					break;
			}
		});
		swipe.setIsActive(true);
	}

	this.updateEnd = function(){
		self.isUpdating = false;
		setTimeout(function(){
			$(".tasks-update-block").css("position", "absolute");
			$(".tasks-update-image").removeClass("rotating");
			$(".tasks-update-block").addClass("none");
			swipe.goStartPos();
		}, 250);
	}

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
			case "tasks":
				this.tasksOk($scope, response);
				break;
			case "delete":
				this.deleteOk($scope, response);
				break;
			case "refresh":
				this.refreshOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "tasks":
				this.tasksErr($scope, response);
				break;
			case "delete":
				this.deleteErr($scope, response);
				break;
			case "refresh":
				this.refreshErr($scope, response);
				break;
		}
	}
	
	this.tasksOk = function($scope, response){
		$scope.tasks = response.data.tasks;
		// if has no tasks set notasks image
		if($scope.tasks.length == 0){
			$(".tasks-notasks-block:first").removeClass("none");
			$(".tasks-content:first").addClass("none");
		}
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".header-right-update").removeClass("header-right-update-running");
		}else{
			this.updateEnd();
		}
	}

	this.tasksErr = function($scope, response){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".header-right-update").removeClass("header-right-update-running");
		}else{
			this.updateEnd();
		}
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_TASKS:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.deleteOk = function($scope, response){
		var task = response.data.task;
		// remove task from list
		deleteTask(task.getId());

		$manager.instance.getUser().setCash(response.data.cash);
		$dialogView.setCash(response.data.cash);

		// if no tasks set notasks block
		if($("#tasksWrap").children().length == 0){
			$(".tasks-content:first").addClass("none");
			$(".tasks-notasks-block:first").removeClass("none");
		}

		// hide delete loading
		$dialogView.hideLoading();
	}

	function deleteTask(id){
		$("#task_" + id).remove();
	}

	this.refreshOk = function($scope, response){
		var task = response.data.task;
		// remove refresh but and change color of task
		refreshTask($scope, task.getId());
	}
	
	this.deleteErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_DELETE:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.refreshErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_DELETE:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	// place tasks(FOR DESKTOP)
	this.setTasksDesktop = function(index){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			if(index % 2 == 0){
				$(".tasks-elem").eq(index).css("float", "left");
			}else{
				$(".tasks-elem").eq(index).css("float", "right");
			}
		}
	}

	this.showTextStatus = function($scope, type){
		switch(parseInt(type)){
			case Constant.FROZEN_TASK_STATUS:
				$dialogView.showToast($scope.frozenText);
				break;
			case Constant.HANG_TASK_STATUS:
				$dialogView.showToast($scope.hangText);
				break;
		}
	}

	// show delete task
	this.showDeleteTask = function(task){
		this.deleteTask = task;

		$('.tasks-delete-block').removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	// hide delete task
	this.hideDeleteTask = function(){
		$('.tasks-delete-block').addClass("none");
		// allow use back but
		$way.playBack();
	}

	function refreshTask($scope, id){
		// set refresh image
		$("#task_" + id).find(".tasks-elem-status").attr("src", "app/pages/tasks/images/tasks_status_frozen.png");
		// set text color status of task
		$("#task_" + id).find(".tasks-elem-progressbar").css("background-color", "#FEA719");
		// hide refresh but
		$("#task_" + id).find(".tasks-elem-hang").addClass("none");
	}

	function initScroll(){
		document.querySelector(".tasks-content").addEventListener("scroll", function(){
			// hide earn but while scrooling
			hideShowEarnBut();
			if($(".tasks-content").scrollTop() == 0){
				swipe.setIsActive(true);
			}else{
				swipe.setIsActive(false);
			}
		});
	}

	function hideShowEarnBut(){
		if($(".tasks-content").scrollTop() > curScrollTop){
			$(".goearn-but-block").css("display", "none");
			curScrollTop = $(".tasks-content").scrollTop();
		}
		if($(".tasks-content").scrollTop() < curScrollTop){
			$(".goearn-but-block").css("display", "inline");
			curScrollTop = $(".tasks-content").scrollTop();
		}
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".tasks-content").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$(".tasks-notasks-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".tasks-content", view: Constant.DESKTOP_VIEW, params: ""},
										{elem: ".tasks-notasks-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".tasks-content").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));

			$(".tasks-notasks-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));
		}
	}

	function cancelEvents(){
		$(".deletetask-content").click(function(e){
			e.stopPropagation();
		});

		$(".deletetask-block:first").bind('scroll touchmove', function(e){
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
			$(".header").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// set height of main content
		setContentSize();

		// init content scroll
		initScroll();

		// cancel events on page
		cancelEvents();
	}
}]);