var MineApp = Base.extend({

	name: null,
	source: null,
	app_name: false,
	app_id: null,
	status: null,
	
	constructor: function(name, app_name, app_id){
		this.name = name;
		this.source = Constant.SERVER_HOST + "images/apps/" + name + "_icon.png";
		this.app_name = app_name;
		this.app_id = app_id;
	},

	/* set and get MineApp.name */
	setName: function(name){
		this.name = name;
	},

	getName: function(){
		return this.name;
	},

	/* set and get MineApp.source */
	setSource: function(source){
		this.source = source;
	},

	getSource: function(){
		return this.source;
	},

	/* set and get MineApp.app_name */
	setAppName: function(app_name){
		this.app_name = app_name;
	},

	getAppName: function(){
		return this.app_name;
	},

	/* set and get MineApp.app_id */
	setAppId: function(app_id){
		this.app_id = app_id;
	},

	getAppId: function(){
		return this.app_id;
	},

	/* set and get MineApp.status */
	setStatus: function(status){
		this.status = status;
	},

	getStatus: function(){
		return this.status;
	}
});