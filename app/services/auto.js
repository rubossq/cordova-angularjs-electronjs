services.service("$autoTasks", ["$manager", "$rootScope", "$action", "$saver", function($manager, $rootScope, $action, $saver){
	var self = this;

	self.MODE_OFF = 0,
	self.MODE_LIKES = 1;
	self.MODE_LIKES_SUBSCRIBES = 2;
	self.LIKE_TASKS_LIMIT = 5;
	self.SUBSCRIBE_TASKS_LIMIT = 3;

	var userInfo = null;
	var user = null;

	var likesCount = 0;
	var subscribesCount = 0;

	self.init = function(){
		user = $manager.instance.getUser();
		userInfo = null;
		likesCount = 0;
		subscribesCount = 0;
	}

	self.autoTask = function(){
		Log.d("AUTO_TASK", "autotask go");
		var mode = user.getSetting(Config.AUTO_TASK_SETTING);
		if(mode != 0){
			Log.d("AUTO_TASK_MODE", mode);
			Manager.instance.getBrowser().getUserInfo(user, function(dataBrowser){	//get UserInfo
				if(dataBrowser != null){
					userInfo = dataBrowser.userInfo;
					if(mode == self.MODE_LIKES){
						autoLikes();
					}else if(mode == self.MODE_LIKES_SUBSCRIBES){

						var fate = Math.round(Math.random());

						if(fate){
							Log.d("FATE", "LIKES");
							autoLikes();
						}else{
							Log.d("FATE", "SUBSCRIBES");
							autoSubscribes();
						}

					}
				}
	   		});
		}
	}

	var autoLikes = function(){
		if(!userInfo.isPrivate()){
			var posts = userInfo.getPosts();
			var limit = user.getSetting(Config.AUTO_TASK_LIMIT_SETTING);

			Log.o("AUTO_POSTS", posts);
			var needPosts = new Array();

			if(limit <= 0){
				needPosts = posts;
			}else{
				for(var i = 0; i < posts.length; i++){
					var post = posts[i];
					if(post.getLikesCount() < limit){
						needPosts.push(post);
					}
				}
			}
			
			var deposit = user.getCash().getDeposit();

			var maxPosts = needPosts.length;
			var count = Math.floor(deposit / (Constant.LIKE_PRICE * self.LIKE_TASKS_LIMIT));
			
			Log.d("MAX_COUNT" , maxPosts + " " + count);

			if(count < maxPosts){
				maxPosts = count;
			}

			var list = new Array();

			for(var i=0, k=0; i<maxPosts && k<1000; k++){
				var num = Math.floor(Math.random() * (needPosts.length));
				if(needPosts[num] != null){
					list.push(needPosts[num]);
					needPosts[num] = null;
					i++;
				}
			}
			Log.o("BID_LIST", list);
			if(list.length > 0){
				$action.bidList(self, new BidInfo(list, self.LIKE_TASKS_LIMIT));
			}
		}
	}

	var autoSubscribes = function(){

		var deposit = user.getCash().getDeposit();

		var count = Math.floor(deposit / Constant.SUBSCRIBE_PRICE);

		if(count >= self.SUBSCRIBE_TASKS_LIMIT){
			var link = Constant.HOME_PAGE + "/" + userInfo.getNick();
			$action.bid(self, new Bid(link, self.SUBSCRIBE_TASKS_LIMIT, Constant.SUBSCRIBE_TYPE));
		}
	}

	this.response = function(response){
		Log.o("CASH_AUTO", response);
		if(response.status == Constant.OK_STATUS){
			$rootScope.deposit = response.data.cash.getDeposit();
			$rootScope.$applyAsync();
			Log.d("CASH_AUTO", response.data.cash.getDeposit());
		}
	}

}]);