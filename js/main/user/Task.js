var Task = Quest.extend({
	readyCount: null,
	meta: null,
	head: null,
	targetCount: null,
	type: null,
	status: 0,
	
	constructor: function(id, meta, head, targetCount, readyCount, type, status){
		this.id = id;
		this.type = type;
		this.meta = meta;
		this.head = head;
		this.targetCount = targetCount;
		this.readyCount = readyCount;
		this.status = status;
	},

	/* get complete Quest percent */
	getReadyPercent: function(){},
	
	/* get and set Task.readyCount */
	setReadyCount: function(readyCount){
		this.readyCount = readyCount;
	},
	
	getReadyCount: function(){
		return this.readyCount;
	},

	/* get and set Task.meta */
	setMeta: function(meta){
		this.meta = meta;
	},
	
	getMeta: function(){
		return this.meta;
	},
	
	/* get and set Task.meta */
	setType: function(type){
		this.type = type;
	},
	
	getType: function(){
		return this.type;
	},
	
	/* get and set Task.head */
	setHead: function(head){
		this.head = head;
	},
	
	getHead: function(){
		return this.head;
	},
	
	/* get and set Task.targetCount */
	setTargetCount: function(targetCount){
		this.targetCount = targetCount;
	},

	getTargetCount: function(){
		return this.targetCount;
	},

	/* get and set Task.head */
	setStatus: function(status){
		this.status = status;
	},
	
	getStatus: function(){
		return this.status;
	}
});