controllers.controller("tasksCtrl", ["$scope", "$rootScope", "$action", "$tasksView", "$navView", "$tasksLang", "$dialogView", "$way",
						function($scope, $rootScope, $action, $tasksView, $navView, $tasksLang, $dialogView, $way){
	$rootScope.locationTitle = $dialogView.strings.tasksTitle;
	$way.step($scope, "/tasks");

	$navView.setNavBut(Constant.TASKS_VIEW);

	$scope.response = function(response){
		$dialogView.hideLoading();
		$tasksView.manageView($scope, response);
	}

	$scope.bidMore = function(task){
		$dialogView.showBidMore(task);
	}

	$scope.setTasksDesktop = function(index){
		$tasksView.setTasksDesktop(index);
	}

	$scope.showTextStatus = function($event, type){
		$event.stopPropagation();

		$tasksView.showTextStatus($scope, type);
	}

	//check task
	$scope.refreshTask = function($event, task){
		$event.stopPropagation();

		$action.refreshTask($scope, task);
	}

	/* DELETE TASK B */
	$scope.deleteTask = function($event, task){
		$event.stopPropagation();

		$tasksView.showDeleteTask(task);
	}

	$scope.hideDeleteTask = function(){
		$tasksView.hideDeleteTask();
	}

	$scope.confirmDeleteTask = function(){
		$tasksView.hideDeleteTask();
		$dialogView.showLoading();

		$action.deleteTask($scope, $tasksView.deleteTask);
	}
	/* DELETE TASK E */
	
	$scope.tasks = function(){
		$dialogView.showLoading();
		$action.tasks($scope);
	}

	$tasksView.initViewParams();

	//initial state
	$tasksView.initSwipe(); // order is
	$scope.tasks();			// important

    $tasksLang.setLang($scope);

    analytics.screenView("tasks");
}]);