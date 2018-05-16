var Browser = Base.extend({
	page: null,
	user: null,
	embedBrowser: null,
	
	constructor: function(user){
		this.user = user;
		
		this.embedBrowser = new EmbedEntity();
	},
	
	init: function(callback){
		this.embedBrowser.init(callback);
	},

	/* auth on Browser.page account */
	auth: function(callback){
		this.embedBrowser.auth(callback);
	},

	/* logout from Browser.page account */
	logout: function(callback){
		this.embedBrowser.logout(callback);
	},

	/* get main info from Browser.page */
	getUserInfo: function(user, callback){
		this.embedBrowser.getUserInfo(user, callback);
	},
	
	/* get and set Browser.page */
	setPage: function(page){
		this.page = page;
	},
	
	getPage: function(){
		return this.page;
	},

	/* go to this.page */
	goPage: function(){},
	
	update: function(callback){
		this.embedBrowser.update(this.user, callback);
	},
	
	moreFields: function(user, callback){
		this.embedBrowser.moreFields(user, callback);
	},
	
	getMetaHead: function(bid, callback){
		this.embedBrowser.getMetaHead(bid, callback);
	},
	
	getUserData: function(callback){
		this.embedBrowser.getUserData(callback);
	},

	show: function(callback){
		this.embedBrowser.show(callback);
	},
	
	getBrowser: function(){
		return this.embedBrowser;
	}
});