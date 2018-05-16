var Balance = Base.extend({
	likeBalance: 100,
	subscribeBalance: 100,
	
	constructor: function(obj){
		this.likeBalance = obj.balance_like;
		this.subscribeBalance = obj.balance_subscribe;
	},
	
	setLikeBalance: function(likeBalance){
		this.likeBalance = likeBalance;
	},

	getLikeBalance: function(){
		return this.likeBalance;
	},
	
	setSubscribeBalance: function(subscribeBalance){
		this.subscribeBalance = subscribeBalance;
	},

	getSubscribeBalance: function(){
		return this.subscribeBalance;
	},

	setBalance: function(){
		Constant.LIKE_LIMIT = Math.ceil(Config.DEFAULT_LIKE_LIMIT * (this.likeBalance / 100));
		Constant.SUBSCRIBE_LIMIT = Math.ceil(Config.DEFAULT_SUBSCRIBE_LIMIT * (this.subscribeBalance / 100));

		Log.d("BALANCE_LIMITS", Constant.LIKE_LIMIT + " " + Constant.SUBSCRIBE_LIMIT);
	}
});