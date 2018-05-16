var BidInfo = Base.extend({
	list: null,
	target_count: 0,
	json: null,
	
	constructor: function(list, target_count){
		this.list = list;
		this.target_count = target_count;
		this.parseList(list, target_count);
	},

	parseList: function(list, target_count){
		var bidData = new Array();
		for(var i=0; i<list.length; i++){
			var p = list[i];
			var metaHead = p.getMetaHead();

			// cut link from "..."
			var headArr = metaHead.head.split("?");
			var head = headArr[0];

			bidData.push({id: metaHead.id, real_id: p.getId(), type: Constant.LIKE_TYPE, meta: metaHead.meta, head: head, target_count: target_count});
		}

		this.json = JSON.stringify(bidData);
	},

	getJson: function(){
		return this.json;
	}
});