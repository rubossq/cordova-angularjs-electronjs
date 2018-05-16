var Manager = Base.extend({
	status: null,
	dataManager: null,
	user: null,
	bot: null,
	browser: null,
	connector: null,
	$rootScope: null,
	services: [],
	
	constructor: function($rootScope){
		Manager.instance = this;
		this.user = new User();
		this.dataManager = new DataManager(this.user);
		this.$rootScope = $rootScope;
		this.browser = new Browser(this.user);
		this.connector = new Connector(this.user);
		this.bot = new Bot(this, this.connector, this.dataManager, this.browser.getBrowser());
	},
	
	/* get and set Manager.status */
	setStatus: function(status){
		this.status = status;
	},
	
	getStatus: function(){
		return this.status;
	},

	getService: function(name){
		return this.services[name];
	},

	addService: function(name, service){
		Log.d("SERVICE_MANAGER", "ADD_SERVICE");
		this.services[name] = service;
	},
	
	/* get and set Manager.dataManager */
	setDataManager: function(dataManager){
		this.dataManager = dataManager;
	},
	
	getDataManager: function(){
		return this.dataManager;
	},
	
	getAppVersion: function(){
		return Constant.APP_VERSION;
	},

	/* get and set Manager.user */
	setUser: function(user){
		this.user = user;
	},
	
	getUser: function(){
		return this.user;
	},

	/* get and set Manager.bot */
	setBot: function(bot){
		this.bot = bot;
	},
	
	getBot: function(){
		return this.bot;
	},

	/* get and set Manager.browser */
	setBrowser: function(browser){
		this.browser = browser;
	},
	
	getBrowser: function(){
		return this.browser;
	},
	
	/* get and set Manager.connector */
	setConnector: function(connector){
		this.connector = connector;
	},
	
	getConnector: function(){
		return this.connector;
	},
	
	payForQuest: function(price, earned){
		Log.d("PAY_FOR_QUEST", price + " " + earned);

		var cash = this.user.getCash();
		cash.setDeposit((+cash.getDeposit()) + price);
		this.user.setCash(cash);

		this.$rootScope.earnedDeposit = earned;
		this.$rootScope.$applyAsync();
	},
	
	setCash: function(){
		this.$rootScope.deposit = this.user.getCash().getDeposit();
		this.$rootScope.$applyAsync();
	},
	
	setSpeed: function(speed){
		var speeds = [0, 3.1, 5.1, 8.1, 3.1, 11.1];
		var bonus = 100 * speeds[this.user.getTurbo()];
		speed = (speed / Constant.maxSpeed) * 100;
		if(speed < 30){
			speed = 30;
		}
		speed = parseInt(speed,10) + bonus;
		this.$rootScope.speedVal = speed + "%";
		this.$rootScope.$applyAsync();
	},
	
	showRunQuestTime: function(time, type, canEarn){
		if(this.$rootScope.setTaskTime){
			this.$rootScope.setTaskTime(time);
		}
	},

	setSpeedMode: function(mode){
		if(this.$rootScope.setManAndDrill){
			this.$rootScope.setManAndDrill(mode);
		}
	},

	sendDelayTime: function(hours){
		var self = this;
		this.connector.fastEarn(hours, function(){
			self.connector.fastEarnDelay(function(response){
				if(response.status == Constant.OK_STATUS){
					self.user.setFastReady(response.delay);
					// show time until next run speed mode
					self.$rootScope.setSpeedTime(parseInt(response.delay), false);
				}else{
					// nothing to do here
				}
			});
		});
	},

	// show time until next use speed mode
	setCanEarn: function(canEarn){
		var self = this;
		if(!canEarn){
			$(".main-earn-progress").addClass("none");
			$(".main-earn-wait").removeClass("none");

			self.$rootScope.speedRunStatus = true;
		}
	},

	// set percent current run speed mode
	setPercent: function(percent){
		$(".main-earn-progress-bar").css("width", percent + "%");
	}

},{ 
	instance: this
});