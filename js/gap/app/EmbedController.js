var EmbedController = Base.extend({

	curAction: null,
	actionList: null,
	status: Constant.READY_STATUS,
	embed: null,

	constructor: function(embed){
		EmbedController.self = this;
		EmbedController.self.embed = embed;
		EmbedController.self.actionList = new Array();
	},

	addAction: function(action){
		Log.d("ADD_ACTION", action.getAction());
		EmbedController.self.actionList.push(action);
	},

	nextAction: function(){
		if(EmbedController.self.actionList.length > 0 && EmbedController.self.status == Constant.READY_STATUS){
			EmbedController.self.status = Constant.WORKING_STATUS;
			EmbedController.self.curAction = EmbedController.self.actionList.shift();
			Log.d("START_ACTION", EmbedController.self.curAction.getAction());
			EmbedController.self.curAction.startAction(EmbedController.self.endAction);
		}
	},
	
	endAction: function(){
		Log.d("END_ACTION", EmbedController.self.actionList.length);
		EmbedController.self.status = Constant.READY_STATUS;
		//EmbedController.self.curAction = null;
		setTimeout(function(){
			EmbedController.self.nextAction();
		}, 100);
	},
	
	/* set and get EmbedController.curAction */
	setCurAction: function(curAction){
		EmbedController.self.curAction = curAction;
	},

	getCurAction: function(){
		return EmbedController.self.curAction;
	},

	/* set and get EmbedController.actionList */
	setActionList: function(actionList){
		EmbedController.self.actionList = actionList;
	},

	getActionList: function(){
		return EmbedController.self.actionList;
	},

	/* set and get EmbedController.status */
	getStatus: function(status){
		EmbedController.self.status = status;
	},

	setStatus: function(){
		return EmbedController.self.status;
	},
	
	/* set and get EmbedController.embed */
	getEmbed: function(embed){
		EmbedController.self.embed = embed;
	},

	setEmbed: function(){
		return EmbedController.self.embed;
	}
},{
	self: null
});