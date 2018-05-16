var Bot = Base.extend({

	connector: null,
	dataManager: null,
	isRun: false,
	browser: null,
	pullTime: 0,
	pullTimeLikes: null,
	pullTimeSubscribes: null,
	waiting: null,
	timeoutId: null,
	manager: null,
	earned: 0,
	quests: null,
	switchedTimeout: 0,
	lastLikeTime: 0,
	lastFollowTime:0,
	strings: {text: "", title: "", ticker: ""},
	monitor: false,
	curNum: 0,
	maxNum: 9,
	lastCheckOrderTime: 0,
	tryRunCycleInterval: 0,
	showRunQuestInterval: 0,
	showType: 0,
	mode: 0,
	fastLikeDone: 0,
	fastSubscribeDone: 0,
	hardRestart: false,
	fastLikesLimit: 0,
	fastSubscribesLimit: 0,
	fastLikesBlock:false,
	fastSubscribesBlock: false,
	fastPercent: 0,
	canEarn: true,
	
	constructor: function(manager, connector, dataManager, browser){
		Bot.self = this;
		var self = Bot.self;
		self.mode = Bot.SLOW_EARN_MODE;
		/*$lang = angular.element(document.body).injector().get('$lang');
		$lang.getLang(Constant.BOT_VIEW, function(lang){
			self.config.title = lang.title;
			self.config.text = lang.text;
			self.config.ticker = lang.title;
		});*/
		self.manager = manager;
		self.browser = browser;
		self.connector = connector;
		self.dataManager = dataManager;
		if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE)
			self.addEvents();
	},
	
	run: function(callback){
		var self = Bot.self;
		if(!self.isRun){
			self.waiting = callback;
			if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE)
				cordova.plugins.backgroundMode.activate();
			else 
				self.activateIOS();
		}
		else{
			callback(Constant.OK_STATUS);
		}
	},
	
	addEvents: function(){
		var self = Bot.self;
		cordova.plugins.backgroundMode.onactivate = function () {
			var self = Bot.self;
			self.init(function(response){
				if(response == Constant.OK_STATUS){
					//start bot
					self.earned = 0;
					self.manager.payForQuest(0, self.earned);
					self.isRun = true;
					self.quests = new Array();
					
					self.getLang();
					
					cordova.plugins.backgroundMode.configure({
						 title:  self.strings.title,
						 text:   self.strings.text,
						 ticker: self.strings.ticker
					});

					var runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL;
					if(self.mode == Bot.FAST_EARN_MODE){
						runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL_FAST;
					}

					self.tryRunCycleInterval = setInterval(function(){
						setTimeout(self.cycle, 0);
					}, runCycleInterval);
					
					self.showRunQuestInterval = setInterval(function(){
						self.showRunQuestTime();
					}, Constant.SHOW_RUN_QUEST_INTERVAL);
					
					setTimeout(self.cycle, 0);
					self.callWaiting(Constant.OK_STATUS, 0);
				}else{
					self.callWaiting(Constant.ERR_STATUS, 0);
				}
			});	
		};

		cordova.plugins.backgroundMode.ondeactivate = function () {
			self.earned = 0;
			self.manager.payForQuest(0, self.earned);
			self.isRun = false;
			clearInterval(self.tryRunCycleInterval);
			clearInterval(self.showRunQuestInterval);
			//clearTimeout(self.switchedTimeout);
			//clearTimeout(self.timeoutId);
			self.callWaiting(Constant.OK_STATUS, 500);
			//cordova.plugins.notification.badge.clear();
		};
		
		cordova.plugins.backgroundMode.onfailure = function(errorCode) {
			
		};
	},
	
	activateIOS: function(){
		var self = Bot.self;
		self.init(function(response){
			if(response == Constant.OK_STATUS){
				//start bot
				self.earned = 0;
				self.manager.payForQuest(0, self.earned);
				self.isRun = true;
				self.quests = new Array();
				
				var runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL;
				if(self.mode == Bot.FAST_EARN_MODE){
					runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL_FAST;
				}

				self.tryRunCycleInterval = setInterval(function(){
					setTimeout(self.cycle, 0);
				}, runCycleInterval);
				
				self.showRunQuestInterval = setInterval(function(){
					self.showRunQuestTime();
				}, Constant.SHOW_RUN_QUEST_INTERVAL);
					
				setTimeout(self.cycle, 0);
					
				self.callWaiting(Constant.OK_STATUS, 0);
			}else{
				self.callWaiting(Constant.ERR_STATUS, 0);
			}
		});	
	},
	
	deactivateIOS: function(){
		var self = Bot.self;
		self.earned = 0;
		self.manager.payForQuest(0, self.earned);
		self.isRun = false;
		clearInterval(self.tryRunCycleInterval);
		clearInterval(self.showRunQuestInterval);
		//clearTimeout(self.switchedTimeout);
		//clearTimeout(self.timeoutId);
		
		self.callWaiting(Constant.OK_STATUS, 500);
	},
	
	init: function(callback){
		var self = Bot.self;
		if(self.browser.isLogin){
			callback(Constant.OK_STATUS);
		}else{
			callback(Constant.ERR_STATUS);
		}
	},
	
	getLang: function(){
		var self = Bot.self;
		var lang = Lang.getLang(self.manager.getUser().getLang(), Constant.BOT_VIEW);
		self.strings.title = lang.title;
		self.strings.text = lang.text;
		self.strings.ticker = lang.title;
	},
	
	stop: function(callback){
		var self = Bot.self;
		//stop bot
		//self.isRun = false;
		//add status and check status for exit
		self.waiting = callback;
		
		self.earned = 0;
		self.manager.payForQuest(0, self.earned);
		if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE){
			cordova.plugins.backgroundMode.deactivate();
		}else{
			self.deactivateIOS();
		}
	},

	restart: function(){
		var self = Bot.self;
		clearInterval(self.tryRunCycleInterval);
		clearInterval(self.showRunQuestInterval);
		//clearTimeout(self.switchedTimeout);
		//clearTimeout(self.timeoutId);
		
		var runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL;
		if(self.mode == Bot.FAST_EARN_MODE){
			runCycleInterval = Constant.TRY_RUN_CYCLE_INTERVAL_FAST;
		}
		
		self.tryRunCycleInterval = setInterval(function(){
			setTimeout(self.cycle, 0);
		}, runCycleInterval);
		
		self.showRunQuestInterval = setInterval(function(){
			self.showRunQuestTime();
		}, Constant.SHOW_RUN_QUEST_INTERVAL);
		
		self.hardRestart = true;

		setTimeout(self.cycle, 0);
	},
	
	cycle: function(){
		var self = Bot.self;
		if((self.quests.length == 0 && !self.monitor) || self.needRestart()){
			self.monitor = true;
			Log.d("CYCLE_IN", "IN STEP 1");
			if(!self.checkOrder(1))
				return;
			if(self.canEarn){
				self.getTypesTimesLimits(function(result){
					if(result.status == Constant.OK_STATUS){
						Log.o("SPEED_LIMITS", result);
						Log.d("CYCLE_IN", "IN STEP 2");
						if(!self.checkOrder(2))
							return;
						//self.setSpeed(result.likesPower, result.subscribesPower);
						var typesLimits = self.getTypesLimits(result);
						Log.o("TYPES_LIMIT", typesLimits);
						Log.o("RESULT", result);
						self.pullTimeLikes = result.likesTime;
						self.pullTimeSubscribes = result.subscribesTime;
						if(typesLimits != null){
							self.showType = result.limitLikes ? Constant.LIKE_TYPE : Constant.SUBSCRIBE_TYPE;
							self.showProgress();
							self.connector.getQuests(typesLimits, function(quests){
								if(quests != null){
									if(self.isRun){
										Log.o("QUESTS", quests);
										Log.d("CYCLE_IN", "IN STEP 3");
										if(!self.checkOrder(3))
											return;
										var tm = 0;
										if(quests.length == 0){
											tm = Constant.EMPTY_QUESTS_INTERVAL;
											Log.d("EMPTY_QUESTS", "WAIT for " + tm);
										}
										
										self.timeoutId = setTimeout(function(){
											self.pullQuests(quests);
										}, tm);
										
									}else{
										self.setCallPull(self);
									}
								}
								else{
									self.setCallPull(self);
								}
							});
						}else{
							self.setCallPull(self);
						}
					}else{
						self.setCallPull(self);
					}
				});
			}else{
				clearTimeout(self.switchedTimeout);
				self.switchedTimeout = setTimeout(function(){
					self.setCallPull(self);
				}, Constant.LIMIT_WAIT_TIME);
			}
			
		}else{
			Log.d("CYCLE_IN", "TRY NEW BOT LAUNCH");
		}
	},
	
	getTypesTimesLimits: function(callback){
		var self = Bot.self;
		
		var likesTime = self.getLikesTime();
		var subscribesTime = self.getSubscribesTime();
		
		var leftLikes = likesTime - (self.time() - self.lastLikeTime);
		var leftFollowers = subscribesTime - (self.time() - self.lastFollowTime);
		
		var limitLikes = 0;
		var limitSubscribes = 0;
		
		if(leftLikes < 0){
			leftLikes = 0;
		}
		
		if(leftFollowers < 0){
			leftFollowers = 0;
		}
		
		if(leftFollowers < leftLikes && self.manager.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
			limitSubscribes = 1;
		}else if(leftFollowers == leftLikes && self.manager.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
			if(Math.random() >= 0.5){
				limitSubscribes = 1;
			}else{
				limitLikes = 1;
			}
		}else{
			limitLikes = 1;
		}

		Log.d("TEST_MODE", self.mode);
		Log.d("TEST_MODE_LIKES", limitLikes + " " + self.fastLikeDone);
		Log.d("TEST_MODE_SUBSCRIBES", limitSubscribes + " " + self.fastSubscribeDone);


		if(self.mode == Bot.FAST_EARN_MODE){
			var needSwitchMode = false;
			if(limitLikes > 0){
				//can not set likes in fast mode
				if(self.fastLikeDone >= self.fastLikesLimit || self.fastLikesBlock){
					if(self.manager.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
						limitSubscribes = 1;
						limitLikes = 0;
						//can not set subscribes in fast mode
						if(self.fastSubscribeDone >= self.fastSubscribesLimit || self.fastSubscribesBlock){
							needSwitchMode = true;
						}
					}else{
						needSwitchMode = true;
					}
				}
			}else if(limitSubscribes > 0){
				//can not set subscribes in fast mode
				if(self.fastSubscribeDone >= self.fastSubscribesLimit || self.fastSubscribesBlock){
					limitLikes = 1;
					limitSubscribes = 0;
					//can not set likes in fast mode
					if(self.fastLikeDone >= self.fastLikesLimit || self.fastLikesBlock){
						needSwitchMode = true;
					}
				}
			}else{
				needSwitchMode = true;
			}

			Log.d("TEST_LIKE_LIMIT", self.fastLikesLimit);
			Log.d("TEST_SUBSCRIBE_LIMIT", self.fastSubscribesLimit);
			Log.d("TEST_MODE_SWITCH", needSwitchMode);
			//switch mode and restart BOT
			if(needSwitchMode){
				self.setMode(Bot.SLOW_EARN_MODE, function(){

				});
				return;
			}
		}
		
		callback({status: Constant.OK_STATUS, limitLikes: limitLikes, limitSubscribes: limitSubscribes,
		likesTime: likesTime, subscribesTime: subscribesTime});
	},
	
	time: function(){
		var time = new Date().getTime();
		time = parseInt(time, 10);
		return time;
	},
	
	pullQuests: function(quests){
		var self = Bot.self;
		self.quests = quests;
		if(quests.length > 0){
			var quest = quests.pop();
			Log.d("CYCLE_IN", "IN STEP 4");
			if(!self.checkOrder(4))
				return;
			var canCatch = true;
			self.pull(quest, function(response){
				if(canCatch){
					canCatch = false;
					Log.d("CYCLE_IN", "IN STEP 5");
					if(!self.checkOrder(5))
						return;
					self.controll(quest, response, function(){
						if(self.isRun){
							Log.d("CYCLE_IN", "IN STEP 6");
							if(!self.checkOrder(6))
								return;
							self.pullTime = self.getPullTime();
							Log.d("PULL_TIME", self.pullTime);
							self.timeoutId = setTimeout(function(){
								Log.d("CYCLE_IN", "IN STEP 7");
								if(!self.checkOrder(7))
									return;
								self.setCallPull(self);
							}, self.pullTime);
						}else{
							self.setCallPull(self);
						}
					});
				}
			});
		}else{
			Log.d("pullQuests", "WARNING IT");
			self.setCallPull(self);
		}
	},
	
	callWaiting: function(response, timeout){
		var self = Bot.self;
		setTimeout(function(){
			self.waiting(response);
		}, timeout);
		
	},
	
	pull: function(quest, callback){
		var self = Bot.self;
		Log.d("PULL_IT", "PULL");
		var canCatch = true;
		self.isInStorage(quest, function(response){
			if(canCatch){
				canCatch = false;
				Log.o("IS_IN_STORAGE", response);
				if(response.status = Constant.OK_STATUS){
					if(!response.value){				
						if(quest.getType() == Constant.LIKE_TYPE){
							self.like(quest, callback);
						}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
							self.subscribe(quest, callback);
						}
					}else{								//is in storage
						quest.setNeedPay(false);					//set no pay it
						self.connector.setReady(quest, function(response){
							if(response != null){						//added to base
								callback(Constant.ERR_STATUS);
							}else{
								callback(Constant.ERR_STATUS);			//send error
							}
						});
					}
				}else{
					callback(Constant.ERR_STATUS);
				}
			}
		});
	},
	
	controll: function(quest, response, callback){
		var self = Bot.self;
		if(self.isNumeric(response))
			response = parseInt(response, 10);
		
		
		switch(response){
			case Constant.OK_STATUS:
				Log.d("CONTROLL", "OK_STATUS");
				//write to storage
				//write to base
				//sendReady()
				self.sendReady(quest, function(price){
					price = parseInt(price, 10);
					self.earned += price;
					if(quest.getType() == Constant.LIKE_TYPE){
						self.lastLikeTime = self.time();
						if(self.mode == Bot.FAST_EARN_MODE){
							self.fastLikeDone++;
						}
					}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
						self.lastFollowTime = self.time();
						if(self.mode == Bot.FAST_EARN_MODE){
							self.fastSubscribeDone++;
						}
					}
					if(self.isRun){
						self.manager.payForQuest(price, self.earned);
					}
					
					callback();
				});
				break;
			case Constant.ERR_STATUS:
				Log.d("CONTROLL", "ERR_STATUS");
				//nothing to do here yet
				callback();
				break;
			case Constant.ERR_CODE_BOT_LIMIT:
				Log.d("CONTROLL", "ERR_CODE_BOT_LIMIT");
				if(self.mode == Bot.SLOW_EARN_MODE){
					clearTimeout(self.switchedTimeout);
					self.switchedTimeout = setTimeout(function(){
						if(quest.getType() == Constant.LIKE_TYPE){
							self.lastLikeTime = self.time();
						}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
							self.lastFollowTime = self.time();
						}
						callback();
					}, Constant.LIMIT_WAIT_TIME);
				}else if(self.mode == Bot.FAST_EARN_MODE){
					if(quest.getType() == Constant.LIKE_TYPE){
						self.fastLikesBlock = true;
					}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
						self.fastSubscribesBlock = true;
					}
					callback();
				}
				
				break;
			case Constant.ERR_CODE_BOT_BEFORE:			//did action earlier
				//write to storage
				//write to base
				Log.d("CONTROLL", "ERR_CODE_BOT_BEFORE");
				self.sendAlreadyDone(quest, function(response){
					callback();
				});
				
				break;
			case Constant.ERR_CODE_BOT_NOPE:			//page doesn't exist
				//report to base
				Log.d("CONTROLL", "ERR_CODE_BOT_NOPE");
				//sendReportQuest()
				self.sendReportQuest(quest, function(response){
					callback();
				});
				break;
		}
	},
	
	isNumeric: function(n){
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	
	setCallPull: function(self){
		var tm = parseInt(self.getQuestsTime(), 10);		//random value
		Log.d("CYCLE_IN", "IN STEP 8");
		if(!self.checkOrder(8))
			return;
		self.timeoutId = setTimeout(function(){
			Log.d("CYCLE_IN", "IN STEP 9");
			if(!self.checkOrder(9))
				return;
			self.monitor = false;
			if(self.isRun){
				self.cycle();
			}
			else{
				//self.callWaiting(Constant.OK_STATUS);
			}
		}, tm);
	},
	
	isInStorage: function(quest, callback){
		var self = Bot.self;
		self.dataManager.isInStorage(quest, callback);
	},
	
	/* bot likes */
	like: function(quest, callback){
		Log.d("BOT_LIKE", "LIKE");
		var self = Bot.self;
		self.browser.like(quest, callback);
	},
	
	/* bot subscribes */
	subscribe: function(quest, callback){
		Log.d("BOT_SUBSCRIBE", "SUBSCRIBE");
		var self = Bot.self;
		self.browser.subscribe(quest, callback);
	},
	
	sendAlreadyDone: function(quest, callback){
		var self = Bot.self;
		self.dataManager.addQuest(quest, function(response){
			//response
			quest.setNeedPay(false);					//set no pay it
			self.connector.setReady(quest, callback);
		});
		//send to base already done task
	},
	
	sendReady: function(quest, callback){
		var self = Bot.self;
		
		self.dataManager.addQuest(quest, function(response){
			//response
			self.connector.setReady(quest, callback);
		});
	},
	
	sendReportQuest: function(quest, callback){
		var self = Bot.self;
		//self.dataManager.addQuest(quest, function(response){
			//response
			self.connector.reportQuest(quest, callback);
		//});
		
	},
	
	getQuestsTime: function(){
		var self = Bot.self;
		var time = 0;
		if(self.mode == Bot.SLOW_EARN_MODE){
			time = self.getRandomInt(Constant.GET_QUESTS_MIN_TIME, Constant.GET_QUESTS_MAX_TIME);
		}else if(self.mode == Bot.FAST_EARN_MODE){
			time = self.getRandomInt(Constant.GET_QUESTS_MIN_TIME_FAST, Constant.GET_QUESTS_MAX_TIME);
		}
		return time;
	},
	
	getPullTime: function(){
		var self = Bot.self;
		
		var likesTime = self.getLikesTime();
		var subscribesTime = self.getSubscribesTime();
		
		var leftLikes = likesTime - (self.time() - self.lastLikeTime);
		var leftFollowers = subscribesTime - (self.time() - self.lastFollowTime);
		
		if(leftLikes < 0){
			leftLikes = 0;
		}
		
		if(leftFollowers < 0){
			leftFollowers = 0;
		}
		
		if(self.manager.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 0){
			leftFollowers = leftLikes + 1;
		}
		
		var time = Math.min(leftLikes, leftFollowers);
		
		return time;
		
	},
	
	getRandomInt: function(min, max)
	{
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	getTypesLimits: function(result){
		//check in base normal
		var types = new Array();		//or null
		var limits = new Array();
		
		if(result.limitLikes > 0){
			types.push(Constant.LIKE_TYPE);
			limits.push(result.limitLikes);
		}
		
		if(result.limitSubscribes > 0){
			types.push(Constant.SUBSCRIBE_TYPE);
			limits.push(result.limitSubscribes);
		}
		
		if(types.length != 0 && limits.length != 0)
			return {types: types.join(","), limits: limits.join(",")};
		else
			return null;
	},
	
	getEarned: function(){
		return this.earned;
	},
	
	isRunnable: function(){
		return this.isRun;
	},
	
	paySum: function(price, type){
		var self = Bot.self;
		
		self.earned += price;
		if(self.isRun){
			self.manager.payForQuest(price, self.earned);
		}
	},
	
	setSpeed:function(likesPower, subscribesPower){
		var self = Bot.self;
		self.manager.setSpeed(likesPower < subscribesPower ? likesPower : subscribesPower);
	},
	
	needRestart: function(){
		var self = Bot.self;
		//if(self.mode == Bot.SLOW_EARN_MODE){
			var likesTime = self.getLikesTime();
			var subscribesTime = self.getSubscribesTime();
			var checkTime = (self.time() - self.lastCheckOrderTime);
			Log.d("NEED_RESTART", checkTime + " > " + (Math.max(likesTime, subscribesTime) * 2));
			if( (checkTime > (Math.max(likesTime, subscribesTime) * 2)) || self.hardRestart ){
				self.hardRestart = false;
				self.curNum = self.maxNum;
				return true;
			}
		//}
		return false;
	},
	
	checkOrder: function(num){
		var self = Bot.self;
		self.lastCheckOrderTime = self.time();
		if(num < self.curNum && !(self.curNum == self.maxNum && num == 1)){
			Log.d("WARNING_NUM_ORDER", num + " < " + self.curNum);
			return false;
		}else{
			self.curNum = num;
			return true;
		}
	},
	
	getLikesTime: function(){
		var self = Bot.self;
		var time = 0;
		if(self.mode == Bot.SLOW_EARN_MODE){
			time = (Constant.LIKE_LIMIT_TIME * 1000)/Constant.LIKE_LIMIT;
		}else if(self.mode == Bot.FAST_EARN_MODE){
			time = (Constant.LIKE_LIMIT_TIME_FAST * 1000)/Constant.LIKE_LIMIT;
		}
		return time;
	},
		
	getSubscribesTime: function(){
		var self = Bot.self;
		var time = 0;

		if(self.mode == Bot.SLOW_EARN_MODE){
			time = (Constant.SUBSCRIBE_LIMIT_TIME * 1000)/Constant.SUBSCRIBE_LIMIT;
		}else if(self.mode == Bot.FAST_EARN_MODE){
			time = (Constant.SUBSCRIBE_LIMIT_TIME_FAST * 1000)/Constant.SUBSCRIBE_LIMIT;
		}
		
		return time;
	},
	
	showRunQuestTime: function(){
		var self = Bot.self;
		self.manager.showRunQuestTime(self.getPullTime(), self.showType, self.canEarn);
	},

	setMode: function(mode, callback){
		Log.d("MOODE", mode);
		var self = Bot.self;
		self.mode = mode;
		if(mode == Bot.FAST_EARN_MODE){
			self.fastLikeDone = 0;
			self.fastSubscribeDone = 0;
			self.fastPercent = 0;
			self.fastLikesBlock = false;
			self.fastSubscribesBlock = false;
		}else{
			self.setCanEarn(false);
			self.sendDelayTime(self.fastLikeDone, self.fastSubscribeDone);
		}
		self.restart();
		self.manager.setSpeedMode(mode);
		callback(Constant.OK_STATUS);
	},

	setFastLimit: function(hours, callback){
		var self = Bot.self;
		Log.d("come hours", hours);
		self.fastLikesLimit = parseInt(hours, 10) * Constant.LIKE_LIMIT;
		self.fastSubscribesLimit = parseInt(hours, 10) * Constant.SUBSCRIBE_LIMIT;
		Log.d("fastLikesLimit", self.fastLikesLimit);
		Log.d("fastSubscribesLimit", self.fastSubscribesLimit);
		callback();
	},

	sendDelayTime: function(likes, subscribes){
		var self = Bot.self;
		var delayLikes = Math.ceil(likes / Constant.LIKE_LIMIT);
		var delaySubscribes = Math.ceil(subscribes / Constant.SUBSCRIBE_LIMIT);
		var hours = Math.max(delayLikes, delaySubscribes, 1);
		if(self.manager.getUser().getSetting(Config.SUBSCRIBE_SETTING) == 1){
			var av = Math.ceil((delayLikes + delaySubscribes) / 2);
			hours = Math.max(av, 1);
		}else{
			hours = Math.max(delayLikes, 1);
		}
		
		self.manager.sendDelayTime(hours);
	},

	getMode: function(){
		var self = Bot.self;
		return self.mode;
	},

	getCanEarn: function(){
		var self = Bot.self;
		return self.canEarn;
	},

	setCanEarn: function(canEarn){
		var self = Bot.self;
		self.canEarn = canEarn;
		self.manager.setCanEarn(canEarn);
	},

	getFastPercent: function(){
		var self = Bot.self;
		return self.fastPercent;
	},

	showProgress: function(){
		var self = Bot.self;
		if(self.canEarn){
			var totalLimit = self.fastLikesLimit + self.fastSubscribesLimit;
			var totalDone = self.fastLikeDone + self.fastSubscribeDone;

			self.fastPercent = ((totalDone / totalLimit) * 100).toFixed();
			self.manager.setPercent(self.fastPercent);
		}
	}
},{ 
	self: this,
	SLOW_EARN_MODE: 1,
	FAST_EARN_MODE: 2
});