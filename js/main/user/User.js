var User = Base.extend({
	nick: null,
	id: null,
	instId: null,
	followsCount: null,
	followedCount: null,
	postsCount: null,
	posts: null,
	authData: null,
	cash: null,
	xpInfo: null,
	profileAvatar: null,
	lang: null,
	premium: null,
	turbo: 0,
	settings: [],
	tutorials: [],
	achieves: null,
	rtime: null,		//reg time ago
	is_private: false,
	has_more_posts: false,
	after: '',
	needData: true,
	fastReady: false,
	fastReadyTime: 0,
	balance: null,
	botnet: false,
	payEmail: null,
	realRtime: 0,
	countryCode: null,
	referralDiamonds: 0,

	constructor: function(){},

	/* log in to User account */
	login: function(){},

	/* log out from User account */
	logout: function(){},
	
	/* get and set User.nick */
	setNick: function(nick){
		this.nick = nick;
	},
	
	getNick: function(){
		return this.nick;
	},
	
	/* get and set User.id */
	setId: function(id){
		this.id = id;
	},
	
	setPremium: function(premium){
		this.premium = (premium == 0 ? false : true);
	},
	
	getPremium: function(){
		return this.premium;
	},
	
	setRtime: function(rtime){
		this.rtime = rtime;
	},
	
	isSafeUser: function(){
		return this.rtime >= Constant.STAY_SAFE_USER_TIME ? true : false;
	},
	
	getRtime: function(){
		return this.rtime;
	},

	setRealRtime: function(realRtime){
		this.realRtime = realRtime;
	},
	
	getRealRtime: function(){
		return this.realRtime;
	},
	
	setTurbo: function(turbo){
		this.turbo = turbo;
	},
	
	getTurbo: function(){
		return this.turbo;
	},

	setCountryCode: function(countryCode){
		this.countryCode = countryCode;
	},
	
	getCountryCode: function(){
		return this.countryCode;
	},

	setPayEmail: function(payEmail){
		this.payEmail = payEmail;
	},
	
	getPayEmail: function(){
		return this.payEmail;
	},
	
	setPrivate: function(is_private){
		this.is_private = is_private;
	},
	
	isPrivate: function(){
		return this.is_private;
	},
	
	getId: function(){
		return this.id;
	},

	/* get and set User.instId */
	setInstId: function(instId){
		this.instId = instId;
	},
	
	getInstId: function(){
		return this.instId;
	},
	
	/* get and set User.followsCount */
	setFollowsCount: function(followsCount){
		this.followsCount = followsCount;
	},
	
	getFollowsCount: function(){
		return this.followsCount;
	},
	
	/* get and set User.followedCount */
	setFollowedCount: function(followedCount){
		this.followedCount = followedCount;
	},
	
	getFollowedCount: function(){
		return this.followedCount;
	},
	
	/* get and set User.postsCount */
	setPostsCount: function(postsCount){
		this.postsCount = postsCount;
	},
	
	getPostsCount: function(){
		return this.postsCount;
	},

	/* get and set User.postsCount */
	setNeedData: function(need){
		Log.d("SET_NEED_DATA", need);
		this.needData = (need == 1 ? true : false);
		Log.d("SET_NEED_DATA_AFTER", this.needData);
	},
	
	getNeedData: function(){
		return this.needData;
	},
	
	
	/* get and set User.posts */
	setPosts: function(posts){
		this.posts = posts;
	},
	
	getPosts: function(){
		return this.posts;
	},
	
	/* get and set User.authData */
	setAuthData: function(authData){
		this.authData = authData;
	},
	
	getAuthData: function(){
		return this.authData;
	},
	
	/* get and set User.cash */
	setCash: function(cash){
		this.cash = cash;
	},
	
	getCash: function(){
		return this.cash;
	},

	getBalance: function(){
		return this.balance;
	},

	setBalance: function(balance){
		if(!this.premium && this.turbo == 0){
			this.balance = balance;
			this.balance.setBalance();
		}	
	},
	
	setAchieves: function(achieves){
		if(achieves != null)
			this.achieves = achieves;
		else
			this.achieves = new Array();
	},
	
	getAchieves: function(){
		return this.achieves;
	},
	
	setXpInfo: function(xpInfo){
		this.xpInfo = xpInfo;
	},
	
	getXpInfo: function(){
		return this.xpInfo;
	},
	
	changeCash: function(freeLikes, freeFollowers){
		this.cash.changeSums(freeLikes, freeFollowers);
	},
	
	getProfileAvatar: function(){
		return this.profileAvatar;
	},
	
	setLang: function(lang){
		this.lang = lang;
	},
	
	getLang: function(){
		return this.lang;
	},

	isBotNet: function(){
		return this.botnet ? 1 : 0;
	},

	checkBotNet: function(){
		var likes = 0;
		for(var i=0; i < this.posts.length; i++){
			likes += this.posts[i].getLikesCount();
		}
		
		if(this.postsCount < Config.MIN_POSTS || this.followedCount < Config.MIN_FOLLOWED|| likes < Config.MIN_TOTAL_LIKES){
			this.botnet = true;
		}
	},
	
	setSetting: function(name, value, blockRemote){
		var self = this;
		Log.d("SETTING_SET", name + ' ' + value);
		if(typeof blockRemote === "undefined"){
			Manager.instance.getConnector().setSetting(name, value, function(){});
		}
		self.settings[name] = value;
	},

	setTutorial: function(tid, value){
		var self = this;
		var name = "t_"+tid;
		Log.d("SETTING_TUTORIAL", name + ' ' + value);
		
		self.tutorials[name] = value;
	},

	getTutorial: function(tid){
		var name = "t_"+tid;
		return this.tutorials[name];
	},
	
	isFirstTime: function(){
		return this.settings[Config.FIRSTTIME_SETTING] == 1 ? true : false;
	},
	
	getSetting: function(name){
		return this.settings[name];
	},

	setFastReady: function(delay){
		this.fastReadyTime = delay;

		if(delay < 0){
			this.fastReady = true;
		}else{
			this.fastReady = false;
		}
	},

	getFastReadyTime: function(){
		return this.fastReadyTime;
	},

	isFastReady: function(){
		return this.fastReady;
	},

	setReferralDiamonds: function(referralDiamonds){
		this.referralDiamonds = referralDiamonds;
	},

	getReferralDiamonds: function(){
		return this.referralDiamonds;
	},
	
	reset: function(){
		this.nick = null;
		this.id = null;
		this.instId = null;
		this.followsCount = null;
		this.followedCount = null;
		this.postsCount = null;
		this.posts = null;
		this.authData = null;
		this.cash = null;
		this.profileAvatar = null;
	},
	
	getAfter: function(){
		return this.after;
	},
	
	hasMorePosts: function(){
		return this.has_more_posts;
	},
	
	addMorePosts: function(moreInfo){
		this.after = moreInfo.end_cursor;
		this.has_more_posts = moreInfo.has_next_page;
		var isHave = false;

		for(index in moreInfo.posts){
			for(var i = 0; i < this.posts.length; i++){
				if(this.posts[i].getId() == moreInfo.posts[index].id){
					isHave = true;
				}
			}
			
			if(!isHave){
				this.posts.push(new Post(moreInfo.posts[index]));
			}
			isHave = false;
		}
	},
	
	setUserInfo: function(userInfo){
		this.nick = userInfo.getNick().trim();
		this.posts = userInfo.getPosts();
		this.is_private = userInfo.isPrivate();
		this.followedCount = userInfo.getFollowedCount();
		this.profileAvatar = userInfo.getProfileAvatar();
		this.postsCount = userInfo.getPostsCount();
		this.followsCount = userInfo.getFollowsCount();
		this.has_more_posts = userInfo.hasMorePosts();
		this.after = userInfo.getAfter();
		this.instId = userInfo.getInstId();
	},
	
	setConfig: function(config){
		//BIDS / QUESTS
		Constant.LIKE_PRICE = parseInt(config.like_price_bid, 10);
		Constant.SUBSCRIBE_PRICE = parseInt(config.subscribe_price_bid, 10);
		
		Constant.LIKE_LIMIT = parseInt(config.like_limit, 10);
		Constant.SUBSCRIBE_LIMIT = parseInt(config.subscribe_limit, 10);
		Config.DEFAULT_LIKE_LIMIT = parseInt(config.like_limit, 10);
		Config.DEFAULT_SUBSCRIBE_LIMIT = parseInt(config.subscribe_limit, 10);

		//lvls
		Config.HARD_RANGE = parseInt(config.hard_range, 10);
		Config.STEP_BONUS_PER_HARD = parseInt(config.step_bonus_per_hard, 10);
		Config.LEGEND_LVL_BONUS_SUM = parseInt(config.legend_lvl_bonus_sum, 10);
		Config.XP_PER_LVL = parseInt(config.xp_per_lvl, 10);

		Config.LIMIT_REFERAL_MIN = parseInt(config.limit_referal_min, 10);
		Config.REFERAL_PERCENT = parseInt(config.referal_percent, 10);
		Config.STAY_REFERAL_BONUS = parseInt(config.stay_referal_bonus, 10);

		Config.NEWS_DEMON_TIME = parseInt(config.news_demon_time, 10);
		Config.VERIFY_DEMON_TIME = parseInt(config.verify_demon_time, 10);
		Config.VERIFY_REQUIRED_TIME = parseInt(config.verify_required_time, 10);

		//BOTS
		Config.MIN_TOTAL_LIKES = parseInt(config.min_total_likes, 10);
		Config.MIN_POSTS = parseInt(config.min_posts, 10);
		Config.MIN_FOLLOWED = parseInt(config.min_followed, 10);

		//SETTINGS
		Config.SUBSCRIBE_VALUE = parseInt(config.settings.subscribe, 10);
		Config.AUTOEARN_VALUE = parseInt(config.settings.autoearn, 10);
		Config.FIRSTTIME_VALUE = parseInt(config.settings.firsttime, 10);
		Config.NOTIFICATION_VALUE = parseInt(config.settings.notifvolume, 10);
		Config.DEFAULT_NOTIFICATION_ACTIVE_VALUE = parseInt(config.settings.notifactivate, 10);
		Config.AUTO_TASK_VALUE = parseInt(config.settings.autotaskmode, 10);
		Config.AUTO_TASK_LIMIT_VALUE = parseInt(config.settings.autotasklimit, 10);

		Config.CUR_VALUES = [Config.SUBSCRIBE_VALUE, Config.AUTOEARN_VALUE, Config.FIRSTTIME_VALUE, Config.NOTIFICATION_VALUE,
							 Config.DEFAULT_NOTIFICATION_ACTIVE_VALUE, Config.AUTO_TASK_VALUE, Config.AUTO_TASK_LIMIT_VALUE];



	}
	
});