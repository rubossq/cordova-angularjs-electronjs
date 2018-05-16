var AuthData = Base.extend({
	login: null,
	password: null,
	authType: null,
	needUpdate: 0,
	oldLogin: null,
	
	constructor: function(login, password, authType){
		this.login = login;
		this.password = password;
		this.authType = authType;
	},
	
	/* get and set AuthData.login */
	setLogin: function(login){
		this.login = login;
	},
	
	getLogin: function(){
		return this.login;
	},
	
	/* get and set AuthData.password */
	setPassword: function(password){
		this.password = password;
	},
	
	getPassword: function(){
		return this.password;
	},
	
	/* get and set AuthData.authType */
	setAuthType: function(authType){
		this.authType = authType;
	},
	
	getAuthType: function(){
		return this.authType;
	},
	
	setOldLogin: function(oldLogin){
		this.oldLogin = oldLogin;
	},
	
	setNeedUpdate: function(needUpdate){
		this.needUpdate = needUpdate;
	},
	
	getOldLogin: function(oldLogin){
		return this.oldLogin;
	},
	
	getNeedUpdate: function(needUpdate){
		return this.needUpdate;
	},

	/* get and set AuthData.token */
	setToken: function(token){
		this.token = token;
	},
	
	getToken: function(){
		return this.token;
	}
});