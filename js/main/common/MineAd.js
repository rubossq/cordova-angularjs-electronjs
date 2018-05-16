var MineAd = Base.extend({

	id: null,
	name: null,
	app_name: false,
	app_id: null,
	desc1: null,
	desc2: null,
	status: null,
	
	constructor: function(id, name, app_name, app_id, desc1, desc2){
		this.id = id;
		this.name = name;
		this.app_name = app_name;
		this.app_id = app_id;
		this.desc1 = desc1;
		this.desc2 = desc2;
	},
	
	/* set and get MineAd.id */
	setId: function(id){
		this.id = id;
	},

	getId: function(){
		return this.id;
	},

	/* set and get MineAd.name */
	setName: function(name){
		this.name = name;
	},

	getName: function(){
		return this.name;
	},

	/* set and get MineAd.app_name */
	setAppName: function(app_name){
		this.app_name = app_name;
	},

	getAppName: function(){
		return this.app_name;
	},

	/* set and get MineAd.app_id */
	setAppId: function(app_id){
		this.app_id = app_id;
	},

	getAppId: function(){
		return this.app_id;
	},

	/* set and get MineAd.desc1 */
	setDesc1: function(desc1){
		this.desc1 = desc1;
	},

	getDesc1: function(){
		return this.desc1;
	},

	/* set and get MineAd.desc2 */
	setDesc2: function(desc2){
		this.desc2 = desc2;
	},

	getDesc2: function(){
		return this.desc2;
	},
	
	/* set and get MineAd.status */
	setStatus: function(status){
		this.status = status;
	},

	getStatus: function(){
		return this.status;
	}
});