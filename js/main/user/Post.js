var Post = Base.extend({
	likesCount: null,
	thumbnail: null,
	id: null,
	metaHead: null,
	
	constructor: function(obj){
		this.likesCount = obj.likesCount;
		this.thumbnail = obj.thumbnail;
		this.id = obj.id;
		this.metaHead = obj.metaHead;
	},
	
	/* get and set Answer.likesCount */
	setLikesCount: function(likesCount){
		this.likesCount = likesCount;
	},
	
	getLikesCount: function(){
		return this.likesCount;
	},

	/* get and set Answer.thumbnail */
	setThumbnail: function(thumbnail){
		this.thumbnail = thumbnail;
	},
	
	getThumbnail: function(){
		return this.thumbnail;
	},
	
	/* get and set Answer.id */
	setId: function(id){
		this.id = id;
	},
	
	getId: function(){
		return this.id;
	},

	getMetaHead: function(){
		return this.metaHead;
	},

	setMetaHead: function(metaHead){
		this.metaHead = metaHead;
	}
});