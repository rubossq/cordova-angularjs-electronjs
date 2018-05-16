var Bid = Quest.extend({
	link: null,
	meta: null,
	head: null,
	targetCount: null,
	
	constructor: function(link, targetCount, type){
		this.link = link;
		this.targetCount = targetCount;
		this.type = type;
		this.id = this.parseId(link);
		this.realId = this.parseRealId(link);
	},

	/* parse Quest id */
	parseId: function(link){
		var arr = link.split('/');
		if(arr){
			if(this.type == Constant.LIKE_TYPE){
				var res =  arr[3] + "/" + arr[4];
				return res;
			}
			else if(this.type == Constant.SUBSCRIBE_TYPE){
				var res = arr[3];
				return res;
			}
		}
	},
	
	parseRealId: function(link){
		var arr = link.split('/');
		if(arr){
			if(this.type == Constant.LIKE_TYPE){
				var res =  arr[4];
				return res;
			}
			else if(this.type == Constant.SUBSCRIBE_TYPE){
				var res = arr[3];
				return res;
			}
		}
	},
		
	/* get and set Bid.link */
	setLink: function(link){
		this.link = link;
	},
	
	getLink: function(){
		return Constant.HOME_PAGE + "/" + this.id;
	},

	/* get and set Bid.meta */
	setMeta: function(meta){
		this.meta = meta;
	},
	
	getMeta: function(){
		return this.meta;
	},
	
	/* get and set Bid.head */
	setHead: function(head){
		this.head = head;
	},
	
	getHead: function(){
		return this.head;
	},
	
	/* get and set Bid.targetCount */
	setTargetCount: function(targetCount){
		this.targetCount = targetCount;
	},

	getTargetCount: function(){
		return this.targetCount;
	}
});