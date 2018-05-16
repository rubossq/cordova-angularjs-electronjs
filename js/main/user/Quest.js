var Quest = Base.extend({
	type: null,
	id: null,
	realId: null,
	targetId: null,
	needPay: true,
	realId:null,
	
	constructor: function(id, targetId, realId, type){
		this.type = type;
		this.id = id;
		this.realId = realId;
		this.targetId = this.prepareLink(targetId);
	},
	
	prepareLink: function(id){
		if(this.type == Constant.LIKE_TYPE){
			id = "web/likes/"+id;
		}
		else if(this.type == Constant.SUBSCRIBE_TYPE){
			id = "web/friendships/"+id;
		}
		return id;
	},

	/* get and set Quest.type */
	setRealId: function(realId){
		this.realId = realId;
	},
	
	getRealId: function(){
		return this.realId;
	},

	/* get and set Quest.type */
	setType: function(type){
		this.type = type;
	},
	
	getType: function(){
		return this.type;
	},
	
	/* get and set Quest.id */
	setId: function(id){
		this.id = id;
	},
	
	getId: function(){
		return this.id;
	},
	
	/* get and set Quest.realId */
	setRealId: function(realId){
		this.realId = realId;
	},
	
	getRealId: function(){
		return this.realId;
	},
	
	/* get and set Quest.targetId */
	setTargetId: function(targetId){
		this.targetId = targetId;
	},
	
	getTargetId: function(){
		return this.targetId;
	},
	
	/* get and set Quest.targetId */
	setNeedPay: function(needPay){
		this.needPay = needPay;
	},
	
	getNeedPay: function(){
		return this.needPay ? 1 : 0;
	},
	
	getLink: function(){
		return Constant.HOME_PAGE + "/" + this.targetId;
	}
});