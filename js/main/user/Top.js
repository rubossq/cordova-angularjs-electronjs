var Top = Base.extend({

	place: null,
	login: null,
	count: null,
	
	constructor: function(place, login, count){
		this.place = place;
		this.login = login;
		this.count = count;
	},
	
	/* get and set Top.place */
	setPlace: function(place){
		this.place = place;
	},
	
	getPlace: function(){
		return this.place;
	},

	/* get and set Top.login */
	setLogin: function(login){
		this.login = login;
	},
	
	getLogin: function(){
		return this.login;
	},
	
	/* get and set Top.count */
	setCount: function(count){
		this.count = count;
	},
	
	getCount: function(){
		return this.count;
	}
});