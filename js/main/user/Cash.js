var Cash = Base.extend({
	deposit: null,
	
	constructor: function(deposit){
		this.deposit = deposit;
	},
	
	setDeposit: function(deposit){
		this.deposit = deposit;
	},

	getDeposit: function(){
		return this.deposit;
	},
	
	changeSums: function(deposit){
		this.deposit += deposit;
	}
});