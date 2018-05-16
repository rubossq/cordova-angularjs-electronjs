var DataManager = Base.extend({

	db: null,
	user: null,

	constructor: function(user){
		this.user = user;
		this.init(function(response){

		});
	},

	/* load auth data */
	loadAuthData: function(callback){
		this.dbQuery(function(tx){
			tx.executeSql("SELECT * FROM `"+Constant.USERS_TABLE+"` ORDER BY id DESC LIMIT 10", [], function(tx, res) {
				if(res.rows.length > 0){
					var row = null;
					try{
						row = res.rows.item(0);
					}catch(err){
						row = res.rows[0];
					}
					callback({status: Constant.OK_STATUS, authData: new AuthData(row.login, row.password, row.auth_type)});
				}else{
					callback({status: Constant.ERR_STATUS});
				}
			});
		}, callback);

	},

	/* save auth data */
	saveAuthData: function(authData, callback){
		var self = this;
		this.dbQuery(function(tx){
			tx.executeSql("INSERT INTO `"+Constant.USERS_TABLE+"` (login, password, auth_type) VALUES (?,?,?)", [authData.getLogin(), authData.getPassword(), authData.getAuthType()], function(tx, res) {
				
				self.prepareSettings(tx, self, function(res){
					self.prepareTutorials(tx, self, function(res){
						self.clearOldQuests(tx, self, callback);
					});
				});
				//callback({status: Constant.OK_STATUS});
			}, function(e) {
			  callback({status: Constant.ERR_STATUS});
			});

		}, callback);
	},

	prepareSettings: function(tx, self, callback){
		Log.o("CONFIG_NAMES", Config.SETTINGS);
		Log.o("CONFIG_VALS", Config.CUR_VALUES);
		var length = Config.SETTINGS.length;
		for(var i = 0; i<length; i++)
			self.prepareOneSetting(tx, self, i, callback);

		callback({status: Constant.OK_STATUS});
	},

	prepareOneSetting: function(tx, self, i, callback){

		tx.executeSql("SELECT value, COUNT(id) as cnt FROM `"+Constant.SETTINGS_TABLE+"` WHERE sname LIKE '%" + Config.SETTINGS[i] +"%'", [], function(tx, res) {
			if(res.rows.length > 0){
				var row = null;
				try{
					row = res.rows.item(0);
				}catch(err){
					row = res.rows[0];
				}
				if(row.cnt == 0){
					tx.executeSql("INSERT INTO `"+Constant.SETTINGS_TABLE+"` (value, sname, user_id) VALUES (?,?,?)",
								 [Config.CUR_VALUES[i], Config.SETTINGS[i], self.user.getId()], function(tx, res) {
						self.user.setSetting(Config.SETTINGS[i], Config.CUR_VALUES[i], true);
					}, function(e) {
					  
					});
				}else{
					self.user.setSetting(Config.SETTINGS[i], row.value);
				}
			}else{
				callback({status: Constant.ERR_STATUS});
			}
		});
	},

	prepareTutorials: function(tx, self, callback){
		
		var length = Config.TUTORIALS.length;
		for(var i = 0; i<length; i++)
			self.prepareOneTutorial(tx, self, i, callback);

		callback({status: Constant.OK_STATUS});
	},

	prepareOneTutorial: function(tx, self, i, callback){

		tx.executeSql("SELECT value, COUNT(id) as cnt FROM `"+Constant.TUTORIALS_TABLE+"` WHERE tid = " + Config.TUTORIALS[i], [], function(tx, res) {
			if(res.rows.length > 0){
				var row = null;
				try{
					row = res.rows.item(0);
				}catch(err){
					row = res.rows[0];
				}
				if(row.cnt == 0){
					tx.executeSql("INSERT INTO `"+Constant.TUTORIALS_TABLE+"` (value, tid) VALUES (?,?)",
								 [0, Config.TUTORIALS[i]], function(tx, res) {
						self.user.setTutorial(Config.TUTORIALS[i], 0);
					}, function(e) {
					  
					});
				}else{
					self.user.setTutorial(Config.TUTORIALS[i], row.value);
				}
			}else{
				callback({status: Constant.ERR_STATUS});
			}
		});
	},

	/* load auth data */
	loadData: function(callback){
		this.dbQuery(function(tx){
			tx.executeSql("SELECT * FROM `"+Constant.DATAS_TABLE+"` ORDER BY id DESC LIMIT 1", [], function(tx, res) {
				if(res.rows.length > 0){
					var row = null;
					try{
						row = res.rows.item(0);
					}catch(err){
						row = res.rows[0];
					}
					callback({status: Constant.OK_STATUS, email: row.email});
				}else{
					callback({status: Constant.ERR_STATUS});
				}
			});
		}, callback);
	},

	/* save auth data */
	saveData: function(email, callback){
		var self = this;
		this.dbQuery(function(tx){
			tx.executeSql("INSERT INTO `"+Constant.DATAS_TABLE+"` (email) VALUES (?)", [email], function(tx, res) {
				callback({status: Constant.OK_STATUS});
			}, function(e) {
			  callback({status: Constant.ERR_STATUS});
			});
		}, callback);
	},

	setSetting: function(type, value, callback){
		var self = this;
		this.dbQuery(function(tx){
			tx.executeSql("UPDATE `"+Constant.SETTINGS_TABLE+"` SET value = "+value+" WHERE sname LIKE '%" + type + "%'", [], function(tx, res) {
				self.user.setSetting(type, value);
				callback({status: Constant.OK_STATUS});
			});
		}, callback);
	},

	setTutorial: function(tid, value, callback){
		var self = this;
		this.dbQuery(function(tx){
			tx.executeSql("UPDATE `"+Constant.TUTORIALS_TABLE+"` SET value = "+value+" WHERE tid = " + tid, [], function(tx, res) {
				self.user.setTutorial(tid, value);
				callback({status: Constant.OK_STATUS});
			});
		}, callback);
	},

	/* clear auth data */
	clearAuthData: function(callback){
		this.dbQuery(function(tx){
			tx.executeSql("DELETE FROM `"+Constant.USERS_TABLE+"`", [], function(tx, res) {
				callback({status: Constant.OK_STATUS});
			});
		}, callback);
	},

	/* clear auth data */
	clearOldQuests: function(tx, self, callback){
		var dtimeNeed = self.time() - Constant.REMOVE_LIKE_DELAY;
		
		tx.executeSql("DELETE FROM `"+Constant.LIKES_TABLE+"` WHERE dtime < " + dtimeNeed + " AND user_id = " + self.user.getId(), [], function(tx, res) {
			dtimeNeed = self.time() - Constant.REMOVE_SUBSCRIBE_DELAY;
			tx.executeSql("DELETE FROM `"+Constant.SUBSCRIBES_TABLE+"` WHERE dtime < " + dtimeNeed + " AND user_id = " + self.user.getId(), [], function(tx, res) {
				callback({status: Constant.OK_STATUS});
			});
		});
	},

	init: function(callback){
		var self = this;
		this.dbQuery(function(tx){
			/*tx.executeSql("DROP TABLE IF EXISTS "+Constant.LIKES_TABLE);
			tx.executeSql("DROP TABLE IF EXISTS "+Constant.SUBSCRIBES_TABLE);
			*/
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.LIKES_TABLE+"` (id INTEGER PRIMARY KEY, quest_id INTEGER, dtime INTEGER, user_id INTEGER)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.SUBSCRIBES_TABLE+"` (id INTEGER PRIMARY KEY, quest_id INTEGER, dtime INTEGER, user_id INTEGER)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.USERS_TABLE+"` (id INTEGER PRIMARY KEY, login TEXT, password TEXT, auth_type INTEGER)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.SETTINGS_TABLE+"` (id INTEGER PRIMARY KEY, value INTEGER, sname TEXT, user_id INTEGER)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.TUTORIALS_TABLE+"` (id INTEGER PRIMARY KEY, value INTEGER, tid INTEGER)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS `"+Constant.DATA_TABLE+"` (id INTEGER PRIMARY KEY, email TEXT)");
			
		}, callback);

	},

	addQuest: function(quest, callback){
		if(quest.getType() == Constant.LIKE_TYPE){
			this.insertQuest(quest, Constant.LIKES_TABLE, callback);
		}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
			this.insertQuest(quest, Constant.SUBSCRIBES_TABLE, callback);
		}

	},

	isInStorage: function(quest, callback){
		Log.d("DATA_MANAGER", "IS_IN_STORAGE");
		if(quest.getType() == Constant.LIKE_TYPE){
			this.checkIn(quest, Constant.LIKES_TABLE, callback);
		}else if(quest.getType() == Constant.SUBSCRIBE_TYPE){
			this.checkIn(quest, Constant.SUBSCRIBES_TABLE, callback);
		}

	},

	getTypesLimitsTimes: function(callback){
		var self = this;
		this.dbQuery(function(tx){
			var dtimeNeed = self.time() - Constant.LIKE_LIMIT_TIME;
			tx.executeSql("SELECT COUNT(id) as cnt FROM `"+Constant.LIKES_TABLE+"` WHERE dtime > " + dtimeNeed + " AND user_id = " + self.user.getId(), [], function(tx, res) {
				if(res.rows.length > 0){
					var row = null;
					try{
						row = res.rows.item(0);
					}catch(err){
						row = res.rows[0];
					}
					var limitLikes = Constant.LIKE_MAX_PER_PULL;
					if((Constant.LIKE_LIMIT - row.cnt) < Constant.LIKE_MAX_PER_PULL){
						limitLikes = Constant.LIKE_LIMIT - row.cnt;
					}
					
					var powerPull = self.getPowerPull(row.cnt, Constant.LIKE_LIMIT, Constant.LIKE_LIMIT_TIME);
					var likesTime = powerPull.time;
					var likesPower = powerPull.power;

					dtimeNeed = self.time() - Constant.SUBSCRIBE_LIMIT_TIME;
					tx.executeSql("SELECT COUNT(id) as cnt FROM `"+Constant.SUBSCRIBES_TABLE+"` WHERE dtime > " + dtimeNeed + " AND user_id = " + self.user.getId(), [], function(tx, res) {
						if(res.rows.length > 0){
							var row = null;
							try{
								row = res.rows.item(0);
							}catch(err){
								row = res.rows[0];
							}
							var limitSubscribes = Constant.SUBSCRIBE_MAX_PER_PULL;
							if((Constant.SUBSCRIBE_LIMIT - row.cnt) < Constant.SUBSCRIBE_MAX_PER_PULL){
								limitSubscribes = Constant.SUBSCRIBE_LIMIT - row.cnt;
							}
							var powerPull = self.getPowerPull(row.cnt, Constant.SUBSCRIBE_LIMIT, Constant.SUBSCRIBE_LIMIT_TIME);
							var subscribesTime = powerPull.time;
							var subscribesPower = powerPull.power;
							
							if(self.user.getSetting(Config.SUBSCRIBE_SETTING) == 0)
								limitSubscribes = 0;
							callback({status: Constant.OK_STATUS, limitLikes: limitLikes, limitSubscribes: limitSubscribes, likesTime: likesTime, subscribesTime: subscribesTime, likesPower:likesPower, subscribesPower:subscribesPower});
						}else{
							callback({status: Constant.ERR_STATUS});
						}
					});
				}else{
					callback({status: Constant.ERR_STATUS});
				}
			});
		}, callback);
	},
	
	getTypesLimitsTimesSimple: function(callback){
		callback({status: Constant.OK_STATUS, limitLikes: 1, limitSubscribes: 1,
		likesTime: (Constant.LIKE_LIMIT_TIME * 1000)/Constant.LIKE_LIMIT,
		subscribesTime: (Constant.SUBSCRIBE_LIMIT_TIME * 1000)/Constant.SUBSCRIBE_LIMIT});
	},

	getPowerPull: function(now, limit, time){
		var left = limit - now;
		var power = 1;
		if(left / limit > 0.95){
			power = Constant.maxSpeed;						//60 times faster
		}else if(left / limit > 0.9){
			power = 7;
		}else if(left / limit > 0.85){
			power = 6;
		}else if(left / limit > 0.8){
			power = 5;
		}else if(left / limit > 0.75){
			power = 5;
		}else if(left / limit > 0.7){
			power = 4;
		}else if(left / limit > 0.65){
			power = 4;
		}else if(left / limit > 0.5){
			power = 3;
		}else if(left / limit > 0.4){
			power = 3;
		}else if(left / limit > 0.3){
			power = 2;
		}else if(left / limit > 0.2){
			power = 2;
		}

		var time = (time / left) / power;

		return {time: (time * 1000), power: power};					//convert to millisec
	},

	insertQuest: function(quest, table, callback){
		var self = this;
		this.dbQuery(function(tx){
			var dtime = self.time();
			tx.executeSql("INSERT INTO `"+table+"` (quest_id, user_id, dtime) VALUES (?,?,?)", [quest.getId(), self.user.getId(), dtime], function(tx, res) {
				callback({status: Constant.OK_STATUS});
			}, function(e) {
			  callback({status: Constant.ERR_STATUS});
			});
		}, callback);
	},

	checkIn: function(quest, table, callback){
		var self = this;
		this.dbQuery(function(tx){
			tx.executeSql("SELECT id FROM `"+table+"` WHERE quest_id = " + quest.getId() + " AND user_id = " + self.user.getId() , [], function(tx, res) {
				if(res.rows.length > 0){
					var row = null;
					try{
						row = res.rows.item(0);
					}catch(err){
						row = res.rows[0];
					}
					callback({status: Constant.OK_STATUS, value: true});
				}else{
					callback({status: Constant.OK_STATUS, value: false});
				}
			});
		}, callback);
	},

	time: function(){
		var time = new Date().getTime() / 1000;
		time = parseInt(time, 10);
		return time;
	},

	dbQuery: function (execute, callback){
		var self = this;
		var db = PlatformManager.getSqlitePlugin().openDatabase({name: Constant.SQL_DB, location: "default"});
		clearTimeout(self.tid);

		self.tid = setTimeout(function(){							//if some err
			  callback({status: Constant.ERR_STATUS});
			  db.close(function() {
			  }, function(data){
				  
			  });
		  }, Constant.CLOSE_DB_TIMEOUT_BIG);

		db.transaction(function(tx){
			execute(tx);
		},
		function(error) {
			db.close(function() {
		  }, function(data){
			  
		  });
		  clearTimeout(self.tid);
		  callback({status:Constant.ERR_STATUS});
		},
		function() {
			clearTimeout(self.tid);
			self.tid = setTimeout(function(){
				db.close(function() {

				}, function(data){
				
				});
		 	}, Constant.CLOSE_DB_TIMEOUT);
		});
	}
});