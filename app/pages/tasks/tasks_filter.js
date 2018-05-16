// set task type
filters.filter("setTaskTextType", function(){
	return function(type, $scope){
		switch(parseInt(type)){
			case Constant.LIKE_TYPE:
				return $scope.likesText;
			case Constant.SUBSCRIBE_TYPE:
				return $scope.followersText;
			default:
				return "";
		}
	}
});

// set color status to task
filters.filter("setTaskColorStatus", function(){
	return function(taskType, readyCount, targetCount){
		var progress = (readyCount / targetCount) * 100;
		switch(parseInt(taskType)){
			case Constant.ACTIVE_TASK_STATUS:
				return "background-color: #29C422; width: " + progress + "%";
			case Constant.FROZEN_TASK_STATUS:
				return "background-color: #FEA719; width: " + progress + "%";
			case Constant.HANG_TASK_STATUS:
				return "background-color: #F21D21; width: " + progress + "%";
			default:
				return "";
		}
	}
});

// set image status to task
filters.filter("setTaskImageStatus", function(){
	return function(taskType, index){
		switch(parseInt(taskType)){
			case Constant.ACTIVE_TASK_STATUS:
				$('.tasks-elem-status').eq(index).addClass('none');
				return "";
			case Constant.FROZEN_TASK_STATUS:
				return "app/pages/tasks/images/tasks_status_frozen.png";
			case Constant.HANG_TASK_STATUS:
				return "app/pages/tasks/images/tasks_status_hang.png";
			default:
				return "";
		}
	}
});

// set refresh but for task
filters.filter("setRefreshBut", function(){
	return function(type, index){
		switch(parseInt(type)){
			case Constant.ACTIVE_TASK_STATUS:
				$(".tasks-elem-hang").eq(index).addClass('none');
				return "";
			case Constant.FROZEN_TASK_STATUS:
				$(".tasks-elem-hang").eq(index).addClass('none');
				return "";
			case Constant.HANG_TASK_STATUS:
				return "";
			default:
				return "";
		}
	}
});