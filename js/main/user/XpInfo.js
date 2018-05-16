var XpInfo = Base.extend({
	lvl: null,
	xp: null,
	
	constructor: function(xp, lvl){
		this.xp = xp;
		this.lvl = lvl;
	},
	
	/* get and set Cash.freeSum */
	setXp: function(xp){
		this.xp = xp;
	},
	
	getLvl: function(){
		return parseInt(this.lvl, 10);
	},
	
	/* get and set Cash.busySum */
	setLvl: function(lvl){
		this.lvl = lvl;
	},
	
	getXp: function(){
		return parseInt(this.xp, 10);
	},
	
	setAll: function(xp, lvl){
		this.xp = xp;
		this.lvl = lvl;
	},

	up: function(xp){
		xp = parseInt(xp);
		this.xp += xp;
		if(Config.XP_PER_LVL <= this.xp){
			this.lvl++;
			this.xp %= Config.XP_PER_LVL;
		}
	}
});