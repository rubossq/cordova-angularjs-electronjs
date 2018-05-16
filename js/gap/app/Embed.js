var Embed = Base.extend({

	curPath: Constant.HOME_PAGE + "/",
	authData: null,
	isLogin: false,
	action: null,
	waiting: null,
	data: null,
	curPart: null,
	
	constructor: function(){},

	/* go to the page by curPath */
	goPage: function(page){},
	
	/* set and get Embed.curPath */
	setCurPath: function(curPath){
		this.curPath = curPath;
	},

	getCurPath: function(){
		return this.curPath;
	},

	/* set and get Embed.authData */
	setAuthData: function(authData){
		this.authData = authData;
	},

	getAuthData: function(){
		return this.authData;
	},

	/* set and get Embed.isLogin */
	setLogin: function(isLogin){
		this.isLogin = isLogin;
	},

	isLogin: function(){
		return this.isLogin;
	},
	
	//convert to string
	s: function(str){
		return str + "";	// quotes are metter!
	}
});