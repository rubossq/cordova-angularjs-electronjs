var UserInfo = Base.extend({
	nick: null,
	followsCount: null,
	postsCount: null,
	followedCount: null,
	posts: null,
	profileAvatar: null,
	is_private: false,
	has_more_posts: false,
	after: null,
	inst_id: null,
	
	constructor: function(obj){
		this.nick = obj.nick;
		this.followsCount = obj.followsCount;
		this.postsCount = obj.postsCount;
		this.followedCount = obj.followedCount;
		this.is_private = obj.is_private;
		this.posts = this.parsePosts(obj.posts);
		this.profileAvatar = obj.profileAvatar;
		this.has_more_posts = obj.has_next_page;
		this.after = obj.end_cursor;
		this.inst_id = obj.inst_id;
	},
	
	parsePosts: function(posts){
		var arr = new Array();
		for(index in posts){
			arr.push(new Post(posts[index]));
		}
		return arr;
	},

	/* get and set UserAsk.nick */
	setNick: function(nick){
		this.nick = nick;
	},
	
	setPrivate: function(is_private){
		this.is_private = is_private;
	},
	
	isPrivate: function(){
		return this.is_private;
	},
	
	getNick: function(){
		return this.nick;
	},

	/* get and set UserAsk.followsCount */
	setFollowsCount: function(followsCount){
		this.followsCount = followsCount;
	},
	
	getFollowsCount: function(){
		return this.followsCount;
	},

	/* get and set UserAsk.postsCount */
	setPostsCount: function(postsCount){
		this.postsCount = postsCount;
	},
	
	getPostsCount: function(){
		return this.postsCount;
	},

	/* get and set UserAsk.followedCount */
	setFollowedCount: function(followedCount){
		this.followedCount = followedCount;
	},
	
	getFollowedCount: function(){
		return this.followedCount;
	},
	
	/* get and set UserAsk.posts */
	setPosts: function(posts){
		this.posts = posts;
	},
	
	getPosts: function(){
		return this.posts;
	},
	
	getProfileAvatar: function(){
		return this.profileAvatar;
	},
	
	getAfter: function(){
		return this.after;
	},
	
	hasMorePosts: function(){
		return this.has_more_posts;
	},

	setInstId: function(inst_id){
		this.inst_id = inst_id;
	},
	
	getInstId: function(){
		return this.inst_id;
	}
});