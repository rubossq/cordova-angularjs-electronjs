var Action = Base.extend({

	callback: null,
	waiting: null,
	action: null,				//action in const
	embed: null,
	type: null, 				//bot or browser
	params: null,
	toid: null,
	
	
	constructor: function(type, action, params, callback, embed){
		this.type = type;
		this.action = action;
		this.params = params;
		this.waiting = callback;
		this.embed = embed;
	},

	startAction: function(callback){
		var self = this;
		this.callback = function(response){
				console.log("callback");
				clearTimeout(this.toid);
				self.waiting(response);
				callback();
		}
		this.embed.action = this.action;
		switch(this.action){
			case Constant.INIT_ACTION:
				this.init();
				break;
			case Constant.AUTH_ACTION:
				this.auth();
				break;
			case Constant.GET_INFO_ACTION:
				this.getUserInfo();
				break;
			case Constant.LOGOUT_ACTION:
				this.logout();
				break;
			case Constant.GET_MH_ACTION:
				this.getMetaHead();
				break;
			case Constant.LIKE_ACTION:
				Log.d("LIKE_ACTION", "LIKE");
				this.like();
				break;
			case Constant.SUBSCRIBE_ACTION:
				Log.d("SUBSCRIBE_ACTION", "SUBSCRIBE");
				this.subscribe();
				break;
			case Constant.MORE_FIELDS_ACTION:
				this.moreFields();
				break;
			case Constant.GET_USER_DATA_ACTION:
				this.getUserData();
				break;
		}
	},
	
	
	init: function(){
		Log.d("ACTION", "init");
		var embed = this.embed;
		
		this.startThrowwer(Constant.INITIALIZE_TIME, Constant.ERR_STATUS);
		
		embed.bot = PlatformManager.getInAppBrowser().open(encodeURI(Constant.ABOUT_PAGE), '_blank', 'hidden=yes');
		
		embed.bot.addEventListener('loadstop', embed.loadStop);
		embed.bot.addEventListener('loadstart', embed.loadStart);
		embed.bot.addEventListener('exit', embed.exit);
	},
	
	auth: function(){
		var embed = this.embed;
		Log.d("ACTION", "auth " + embed.isLogin);
		
		if(embed.isLogin){
			this.callback(Constant.OK_STATUS);
		}else{
			embed.checkStupidDevice(EmbedEntity.self);
			embed.visible = true;
			Log.d("ACTION_SHOW", "show");
			embed.bot.show();
		}
	},
		
	getUserInfo: function(){
		Log.d("ACTION_GF", "getUserInfo");
		var embed = this.embed;
		var user = this.params.user;
		var self = this;
		if(embed.isLogin){
			this.startThrowwer(Constant.GET_INFO_TIME, null);
			
			/*if(user.getNick() == null){
				Log.d("ACTION_DT", "go profile");
				embed.bot.executeScript({code: " goProfile(); "}, function(data){
					console.log(data+"");
				});
			}else{
				Log.d("ACTION_DT", "by nick " + user.getNick());
				var profilePage = Constant.HOME_PAGE + "/" + user.getNick();
				embed.goPage(profilePage);
			}*/
			
			embed.bot.executeScript({code: "getUserInfo('"+user.getNick()+"');"}, function(){
				var cnt = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("USER_INFO", "try = " + cnt);
						embed.bot.executeScript({code: "getInfoEntity();"}, function(userInfo){
							userInfo = JSON.parse(embed.s(userInfo));
							Log.d("USER_INFO", userInfo);
							isIn = false;
							if(userInfo != null){
								Log.d("USER_INFO", "NOT NULL");
								clearInterval(checkerId);
								Log.o("USER_INFO_COME", userInfo);
								var profilePage = userInfo.profilePage;
								
								Log.d("COMPARE", embed.loadStopUrl + " = " + profilePage);
								if(embed.loadStopUrl != profilePage && user.getNick() == null){
										Log.d("GO_PAGE", "go");
										//embed.bot.executeScript({code: "goPage('"+profilePage+"');"});
								}
								
								userInfo = new UserInfo(userInfo);
								self.callback({userInfo: userInfo});
							}else{
								Log.d("USER_INFO", "NULL");
							}
						});
						if(cnt > 10){
							Log.d("USER_INFO", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(null);
						}
					}else{
						Log.d("USER_INFO", "TO FAST");
					}
				}, Constant.GET_INFO_CHECK_INTERVAL);
			});
		}else{
			this.callback(Constant.ERR_STATUS);	
		}
	},
	
	moreFields:function(){
		var embed = this.embed;
		var user = this.params.user;
		var self = this;
		if(embed.isLogin){
			this.startThrowwer(Constant.GET_MH_TIME, null);
			
			Log.d("MORE_INFO", "here");
			
			embed.bot.executeScript({code: "getMoreFields('"+user.getAfter()+"', "+user.getInstId()+","+Constant.MORE_FIELDS_LIMIT+");"}, function(){
				var cnt = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("MORE_INFO", "try = " + cnt);
						embed.bot.executeScript({code: "getMoreFieldsInfoEntity();"}, function(moreInfo){
							moreInfo = JSON.parse(embed.s(moreInfo));
							Log.d("MORE_INFO", moreInfo);
							isIn = false;
							if(moreInfo != null){
								Log.d("MORE_INFO", "NOT NULL");
								clearInterval(checkerId);
								self.callback({moreInfo: moreInfo});
							}else{
								Log.d("MORE_INFO", "NULL");
							}
						});
						if(cnt > 10){
							Log.d("MORE_INFO", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(null);
						}
					}else{
						Log.d("MORE_INFO", "TO FAST");
					}
				}, Constant.GET_INFO_CHECK_INTERVAL);
			});
		}else{
			this.callback(Constant.ERR_STATUS);	
		}
	},
	
	logout: function(){
		var embed = this.embed;
		
		if(embed.isLogin){
			this.startThrowwer(Constant.LOGOUT_TIME, Constant.ERR_STATUS);
			embed.goPage(Constant.HOME_PAGE + "/accounts/logout/");
		}else{
			this.callback(Constant.OK_STATUS);
		}
	},
	
	getMetaHead: function(){
		var embed = this.embed;
		var self = this;
		if(embed.isLogin){
			this.startThrowwer(Constant.GET_MH_TIME, null);
			
			embed.data = this.params;
			var method = "";
			switch(embed.data.bid.getType()){
				case Constant.LIKE_TYPE:
					var method = "getLikeInfo";
					break;
				case Constant.SUBSCRIBE_TYPE:
					var method = "getSubscribeInfo";
					break;
			}
			Log.d("GET_META", embed.data.bid.getLink());
			embed.bot.executeScript({code: method + "('"+embed.data.bid.getLink()+"');"}, function(){
				var cnt = 0;
				var tofast = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("GET_META_HEAD", "try = " + cnt);
						embed.bot.executeScript({code: "getMetaHeadEntity();"}, function(metaHead){
							metaHead = JSON.parse(embed.s(metaHead));
							Log.o("GET_META_HEAD", metaHead);
							isIn = false;
							if(metaHead.ready){
								Log.d("GET_META_HEAD", "READY");
								clearInterval(checkerId);
								self.callback(metaHead);
							}else{
								Log.d("GET_META_HEAD", "NOT READY");
							}
						});
						if(cnt > 10){
							Log.d("GET_META_HEAD", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(null);
						}
					}else{
						tofast++;
						if(tofast > 50){
							clearInterval(checkerId);
						}
						Log.d("GET_META_HEAD", "TO FAST");
					}
				}, Constant.GET_INFO_CHECK_INTERVAL);
			});
			
			
		}else{
			this.callback(null);
		}
	},

	getUserData: function(){
		var embed = this.embed;
		var self = this;
		if(embed.isLogin){
			this.startThrowwer(Constant.GET_USER_DATA_TIME, null);
			
		
			embed.bot.executeScript({code: "getUserData('"+Constant.EDIT_PAGE+"');"}, function(){
				var cnt = 0;
				var tofast = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("GET_META_HEAD", "try = " + cnt);
						embed.bot.executeScript({code: "getUserDataEntity();"}, function(formData){
							formData = JSON.parse(embed.s(formData));
							isIn = false;
							if(formData.ready){
								Log.d("GET_META_HEAD", "READY");
								clearInterval(checkerId);
								self.callback(formData);
							}else{
								Log.d("GET_META_HEAD", "NOT READY");
							}
						});
						if(cnt > 10){
							Log.d("GET_META_HEAD", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(null);
						}
					}else{
						tofast++;
						if(tofast > 50){
							clearInterval(checkerId);
						}
						Log.d("GET_META_HEAD", "TO FAST");
					}
				}, Constant.GET_INFO_CHECK_INTERVAL);
			});
			
			
		}else{
			this.callback(null);
		}
	},
	
	like: function(){
		var embed = this.embed;
		var self = this;
		Log.d("COME_LIKE", "LIKE");
		if(embed.isLogin){
			this.startThrowwer(Constant.LIKE_TIME, Constant.ERR_STATUS);
			embed.bot.executeScript({code: "action('"+self.params.quest.getLink()+"', '/like/', '"+self.params.quest.getRealId()+"', '"+self.params.quest.getType()+"'); "}, function(){
				var cnt = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("LIKE_ACTION", "try = " + cnt);
						embed.bot.executeScript({code: "getActionEntity();"}, function(action){
							action = JSON.parse(embed.s(action));
							Log.d("LIKE_INFO", action);
							isIn = false;
							if(action.ready){
								Log.d("LIKE_ACTION", "READY");
								clearInterval(checkerId);
								self.callback(action.status);
							}else{
								Log.d("LIKE_ACTION", "NOT READY");
							}
						});
						if(cnt > 10){
							Log.d("LIKE_ACTION", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(Constant.ERR_CODE_BOT_BEFORE);
						}
					}else{
						Log.d("LIKE_ACTION", "TO FAST");
					}
				}, Constant.ACTION_CHECK_INTERVAL);
			});
			//embed.goPage(this.params.quest.getLink());
		}else{
			this.callback(Constant.ERR_STATUS);
		}
	},
	
	subscribe: function(){
		var embed = this.embed;
		var self = this;
		Log.d("COME_SUBSCRIBE", "SUBSCRIBE");
		if(embed.isLogin){
			this.startThrowwer(Constant.SUBSCRIBE_TIME, Constant.ERR_STATUS);
			embed.bot.executeScript({code: "action('"+self.params.quest.getLink()+"', '/follow/', '"+self.params.quest.getRealId()+"', '"+self.params.quest.getType()+"'); "}, function(data){
				var cnt = 0;
				var isIn = false;
				var checkerId = setInterval(function(){
					if(!isIn){
						isIn = true;
						cnt++;
						Log.d("SUBSCRIBE_ACTION", "try = " + cnt);
						embed.bot.executeScript({code: "getActionEntity();"}, function(action){
							action = JSON.parse(embed.s(action));
							Log.d("SUBSCRIBE_ACTION", action);
							isIn = false;
							if(action.ready){
								Log.d("SUBSCRIBE_ACTION", "READY");
								clearInterval(checkerId);
								self.callback(action.status);
							}else{
								Log.d("SUBSCRIBE_ACTION", "NOT READY");
							}
						});
						if(cnt > 10){
							Log.d("SUBSCRIBE_ACTION", "LIMIT OUT");
							clearInterval(checkerId);
							self.callback(Constant.ERR_CODE_BOT_BEFORE);
						}
					}else{
						Log.d("SUBSCRIBE_ACTION", "TO FAST");
					}
				}, Constant.ACTION_CHECK_INTERVAL);
			});
			//embed.goPage(this.params.quest.getLink());
		}else{
			this.callback(Constant.ERR_STATUS);
		}
	},

	startThrowwer: function(time, val){
		Log.d("ACTION", "start Throwwer");
		this.toid = this.throwwer({action: this.action, time: time, callback: this.callback, val: val});
	},
	
	
	throwwer: function(tobj){
		var self = this;
		return setTimeout(function(){
			Log.d("ACTION", "throwwer timeout");
			tobj.callback(tobj.val);
		},tobj.time);
	},

	callWaiting: function(){},
	
	/* get and set Action.id */
	setId: function(id){
		this.id = id;
	},
	
	getId: function(){
		return this.id;
	},

	/* get and set Action.time */
	setTime: function(time){
		this.time = time;
	},
	
	getTime: function(){
		return this.time;
	},
	
	/* get and set Action.callback */
	setCallback: function(callback){
		this.callback = callback;
	},
	
	getCallback: function(){
		return this.callback;
	},
	
	/* get and set Action.action */
	setAction: function(action){
		this.action = action;
	},
	
	getAction: function(){
		return this.action;
	},

	/* get and set Action.embed */
	setEmbed: function(embed){
		this.embed = embed;
	},
	
	getEmbed: function(){
		return this.embed;
	},

	/* get and set Action.type */
	setType: function(type){
		this.type = type;
	},
	
	getType: function(){
		return this.type;
	},

	/* get and set Action.params */
	setParams: function(params){
		this.params = params;
	},
	
	getParams: function(){
		return this.params;
	},
	
	browserShow: function(){
		
	}
	
	
});