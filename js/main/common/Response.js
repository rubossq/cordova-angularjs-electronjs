var Response = Base.extend({
	action: null,
	status: null,
	message: null,
	object: null,
	
	constructor: function(action, status, message, object){
		this.action = action;
		this.status = status;
		this.message = message;
		this.object = object;
	},
	
	/* get and set Response.action */
	setAction: function(action){
		this.action = action;
	},
	
	getAction: function(){
		return this.action;
	},
	
	/* get and set Response.status */
	setStatus: function(status){
		this.status = status;
	},
	
	getStatus: function(){
		return this.status;
	},

	/* get and set Response.message */
	setMessage: function(message){
		this.message = message;
	},
	
	getMessage: function(){
		return this.message;
	},

	/* get and set Response.object */
	setObject: function(object){
		this.object = object;
	},
	
	getObject: function(){
		return this.object;
	}
});