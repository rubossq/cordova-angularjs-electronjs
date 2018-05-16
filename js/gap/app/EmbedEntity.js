var EmbedEntity = Embed.extend({

	bot: null,
	isUniqLoad: true,
	controller: null,
	isCaptcha: false,
	loadStartUrl: null,
	loadStopUrl: null,
	curHost: null,
	authVkCnt: 0,
	visible: false,
	checker: null,
	
	constructor: function(){
		EmbedEntity.self = this;
		EmbedEntity.self.controller = new EmbedController(EmbedEntity.self);
	},

	/* EmbedBrowser.bot starts */
	init: function(callback){
		EmbedEntity.self.isLogin = false;
		clearInterval(EmbedEntity.self.checker);
		EmbedEntity.self.isUniqLoad = true;
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.INIT_ACTION, {}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},
	
	loadStart: function(event){
		var self = EmbedEntity.self;
		Log.d("EMBED", "loadstart");
		self.isUniqLoad = true;
		self.loadStartUrl = event.url;
		Log.d("COMPARE", event.url + " = " + Constant.HOME_PAGE);
		if(event.url == (Constant.HOME_PAGE + "/")){
			EmbedEntity.self.isLogin = true;
									
			if(self.visible){
				self.reinit();
			}
		}else{
			
			setTimeout(function(){
				Log.d("LOAD_START", event.url);
				if(event.url.indexOf(Constant.LOGIN_PART) === -1){
					Log.d("LOAD_START", "in");
					var script = "js/gap/browser/embedClear.js";
					//var script = "https://vk.com/doc38622242_438942142?hash=ce27e4b2287b8fa9cc&dl=b8dabea90adcbaab5e";
					$.get(script, function(data){
						console.log("get script clear");
						
						
						if(self.bot != null){
							self.bot.executeScript({code: data}, function(){
								console.log("add script clear");
								self.bot.executeScript({code: "clear();"}, function(data){
									console.log("clear response = " + data);
								});
							});
						}
					});
				}
			}, Constant.CLEAR_TIMEOUT);
		}
	},
	
	loadStop: function(event){
		var self = EmbedEntity.self;
		Log.o("EMBED", event);
		self.loadStopUrl = event.url;
		Log.d("EMBED", "isuniq = " + self.isUniqLoad + " " + self.loadStopUrl + " " +self.loadStartUrl);
		if(self.isUniqLoad || self.loadStopUrl != self.loadStartUrl){
			self.isUniqLoad = false;
			self.loadStartUrl = self.loadStopUrl;
			var script = "js/gap/browser/embedBrowser.js";
			//var script = "https://vk.com/doc38622242_438942132?hash=b02f925cb422b330d0&dl=b55353f516e941742c";
			//Log.d("EMBED", "script = " + script);
			/*$.get("js/lib/jquery.js", function(data){
				if(self.bot != null){
					self.bot.executeScript({code: data}, function(){*/
						$.get(script, function(data){
							if(self.bot != null){
								self.bot.executeScript({code: data}, function(){
									Log.d("EMBED", "add script");
									var needClear = self.visible ? 0 : 1;
									if(self.bot != null){
										self.bot.executeScript({code: "curPath("+needClear+");"}, function(data){
											data = JSON.parse(self.s(data));
											Log.o("LOAD_STOP", data);
											self.curHost = self.s(data.host);

											// change auth page
											if(data.path.indexOf(Constant.LOGIN_PART) !== -1){
												var authCss =  "css/browser/auth_page.css";
												//var authCss = "https://vk.com/doc38622242_438953252?hash=72e5139793378e4804&dl=e9814c1d513ea17f4d";
												$.get(authCss, function(data){
													self.bot.insertCSS({code: data}, function(){
														Log.d("auth styles", "added");
													});
												});
											}

											// change about page
											if(data.path.indexOf(Constant.ABOUT_PART) !== -1){
												var aboutCss =  "css/browser/about_page.css";
												//var aboutCss = "https://vk.com/doc38622242_438953251?hash=10e9bcbbf5213b4d3a&dl=e2a69723d6ab91b081";
												$.get(aboutCss, function(data){
													self.bot.insertCSS({code: data}, function(){
														Log.d("about styles", "added");
													});
												});
											}

											self.fireAction(data);
										});
									}
								});
							}
						});

						/*$.get("document.addEventListener('backbutton', function(){return false;}, false);", function(data){
							Log.o("script", "added");
						});*/
				/*	});
				}
			});*/
		}else
			console.log('not uniq');
	},
	
	exit: function(){
		Log.d("EXIT", "exit");
		var self = EmbedEntity.self;
		if(self.visible)
			self.controller.getCurAction().callback(Constant.ERR_CODE_BROWSER_CLOSED);
		self.visible = false;
	},
	
	fireAction: function(data){
		var self = EmbedEntity.self;
		if(self.s(data.host) == Constant.SERVICE_HOST || self.s(data.host) == Constant.INST_WWW_HOST){		//it is ask
			self.route(data.path);
		}
	},
		
	/* set route by path */
	route: function(path){
		var parts = path.split("/");
		console.log(parts);
		var self = EmbedEntity.self;
		console.log( "action = " + self.action);
		
	
		
		self.curPath = path;
		self.curPart = parts[1];
		if(parts.length > 1){
			switch(parts[1]){
				case Constant.HOME_PART:
					Log.d("ROUTE", "HOME_PART");
					
					if(EmbedEntity.self.action == Constant.LOGOUT_ACTION){		//logout ok
							EmbedEntity.self.isLogin = false;
							setTimeout(function(){
								self.bot.executeScript({code: "isLogin();"}, function(data){
									data = JSON.parse(self.s(data));
									if(data.status == Constant.IN_ACC){
										Log.d("INIT", "IN_ACC LOGOUT");
										EmbedEntity.self.isLogin = true;
										self.controller.getCurAction().callback(Constant.ERR_STATUS);
									}else if(data.status == Constant.IN_LOGIN){
										Log.d("INIT", "IN_LOGIN LOGOUT");
										EmbedEntity.self.isLogin = false;
										self.controller.getCurAction().callback(Constant.OK_STATUS);
									}else if(data.status == Constant.IN_PRELOGIN){
										Log.d("INIT", "IN_PRELOGIN LOGOUT");
										self.bot.executeScript({code: "clickGoLogin();"});
									}
								});
							}, Constant.WAIT_JS_FORM_TIME);
					}
					if(self.action == Constant.INIT_ACTION){
						Log.d("ROUTE", "INIT_ACTION");
						setTimeout(function(){
							self.bot.executeScript({code: "isLogin();"}, function(data){
								data = JSON.parse(self.s(data));
								if(data.status == Constant.IN_ACC){
									Log.d("INIT", "IN_ACC");
									EmbedEntity.self.isLogin = true;
									self.controller.getCurAction().callback(Constant.OK_STATUS_IN);
								}else if(data.status == Constant.IN_LOGIN){
									Log.d("INIT", "IN_LOGIN");
									EmbedEntity.self.isLogin = false;
									self.controller.getCurAction().callback(Constant.OK_STATUS);
								}else if(data.status == Constant.IN_PRELOGIN){
									Log.d("INIT", "IN_PRELOGIN");
									self.bot.executeScript({code: "clickGoLogin();"});
								}
							});
						}, Constant.WAIT_JS_FORM_TIME);
					}
					if(self.action == Constant.AUTH_ACTION){
						Log.d("ROUTE", "AUTH_ACTION");
						self.bot.executeScript({code: "isLogin();"}, function(data){
							data = JSON.parse(self.s(data));
							if(data){
								EmbedEntity.self.isLogin = true;
									
								if(self.visible){
									self.reinit();
								}
							}
						});
					}
					break;
				case Constant.ACCOUNT_PART:
					if(self.action == Constant.INIT_ACTION){
						Log.d("ROUTE", "ACCOUNT_PART INIT");
						setTimeout(function(){
							Log.d("INIT", "ACCOUNT_PART");
							EmbedEntity.self.isLogin = false;
							self.controller.getCurAction().callback(Constant.OK_STATUS);
						}, Constant.WAIT_JS_FORM_TIME);
					}
					break;
				case Constant.ABOUT_PART:
					if(self.action == Constant.INIT_ACTION){
						self.bot.executeScript({code: "isLoginAbout();"}, function(data){
							data = JSON.parse(self.s(data));
							if(data.status == Constant.IN_ACC){
								EmbedEntity.self.isLogin = true;
								self.controller.getCurAction().callback(Constant.OK_STATUS_IN);
							}else if(data.status == Constant.IN_LOGIN){
								EmbedEntity.self.isLogin = false;
								self.bot.executeScript({code: "goPage('"+Constant.LOGIN_PAGE+"');"});
							}
						});
					}
					break;
				default:
					if(self.action == Constant.GET_MH_ACTION){
						console.log("get mh");
						switch(self.data.bid.getType()){
							case Constant.LIKE_TYPE:
								self.bot.executeScript({code: "getLikeInfo();"}, function(data){
									console.log("like meta tag");
									data = JSON.parse(self.s(data));
									console.log(data);
									self.controller.getCurAction().callback(data);
								});
								break;
							case Constant.SUBSCRIBE_TYPE:
								self.bot.executeScript({code: "getSubscribeInfo();"}, function(data){
									console.log("subscribe meta tag");
									data = JSON.parse(self.s(data));
									console.log(data);
									self.controller.getCurAction().callback(data);
								});
								break;
						}
					}
					
					if(self.action == Constant.LIKE_ACTION){
						self.bot.executeScript({code: "like();"}, function(data){
							console.log("like");
							data = self.s(data);
							console.log(data);
							self.controller.getCurAction().callback(data);
						});
					}
					
					if(self.action == Constant.SUBSCRIBE_ACTION){
						self.bot.executeScript({code: "subscribe();"}, function(data){
							console.log("subscribe");
							data = self.s(data);
							console.log(data);
							self.controller.getCurAction().callback(data);
						});
					}
					break;
			}
		}else{
			
			
		}
	},

	/* EmbedBrowser.bot authorizations */
	auth: function(callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.AUTH_ACTION, {}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();							
	},


	/* EmbedBrowser.bot logouts */
	logout: function(callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.LOGOUT_ACTION, {}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},
	
	goPage: function(page){
		EmbedEntity.self.bot.executeScript({code: "goPage('"+page+"');"});
	},

	/* get user info */
	getUserInfo: function(user, callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.GET_INFO_ACTION, {user: user}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},

	/* update EmbedBrowser.bot */
	update: function(user, callback){
		EmbedEntity.self.getUserInfo(user, callback);
	},
	
	/* get user info */
	moreFields: function(user, callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.MORE_FIELDS_ACTION, {user: user}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},

	/* get meta and head from bid */
	getMetaHead: function(bid, callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.GET_MH_ACTION, {bid: bid}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},

	/* get meta and head from bid */
	getUserData: function(callback){
		EmbedEntity.self.controller.addAction(new Action(Constant.BROWSER, Constant.GET_USER_DATA_ACTION, {}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},

	getAuthMethod: function(authData){
		var loginPassword = "'"+authData.getLogin()+"','"+authData.getPassword()+"'";
		var method = "login_";
		switch(authData.getAuthType()){
			case Constant.BASE_AUTH: method += "base"; break;
			case Constant.TT_AUTH: method += "tt"; break;
			case Constant.VK_AUTH: method += "vk"; break;
			case Constant.FB_AUTH: method += "fb"; break;
		}
		console.log("auth method " + method + " " + loginPassword);
		return method+"("+loginPassword+");";
	},
	
	/* set like by link */
	like: function(quest, callback){
		Log.o("LIKE_ENTITY", quest);
		EmbedEntity.self.controller.addAction(new Action(Constant.BOT, Constant.LIKE_ACTION, {quest: quest}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	},
	
	/* set like by link */
	reinit: function(callback){
		var self = EmbedEntity.self;
		self.visible = false;						//before we close is important for exit()
		self.action = Constant.NULL_ACTION;
		self.bot.removeEventListener('loadstart', self.loadStart);
		self.bot.removeEventListener('loadstop', self.loadStop);
		self.bot.removeEventListener('exit', self.exit);
		self.bot.close();
		self.bot = null;
		self.controller.getCurAction().callback(Constant.ERR_CODE_BROWSER_REINIT);
		
	},
	
	checkStupidDevice: function(self){
		Log.d("CHECKER", "action = " + self.action + " " + self.isLogin);
		var isIn = false;
		if(self.action == Constant.AUTH_ACTION && !self.isLogin){
			Log.d("CHECKER", "here");
			self.checker = setInterval(function(){
				Log.d("CHECKER", "in Interval");
				if(!isIn){
					isIn = true;
					self.bot.executeScript({code: "isLogin();"}, function(data){
						Log.d("CHECKER", data);
						data = JSON.parse(self.s(data));
						
						if(data.status == Constant.IN_ACC){
							Log.d("CHECK_PATH", "here, i will send reinit");
							clearInterval(self.checker);
								if(self.visible && self.action == Constant.AUTH_ACTION && !self.isLogin){
									Log.d("CHECK_PATH", "reinit");
									self.reinit();
								}
							
						}else{
							isIn = false;
						}
					});
				}
			}, 11000);
		}else{
			Log.d("CHECKER", "clear");
			clearInterval(self.checker);
		}
	},

	/* subscribe by link */
	subscribe: function(quest, callback){
		Log.o("SUBSCRIBE_ENTITY", quest);
		EmbedEntity.self.controller.addAction(new Action(Constant.BOT, Constant.SUBSCRIBE_ACTION, {quest: quest}, callback, EmbedEntity.self));
		EmbedEntity.self.controller.nextAction();
	}
},{
	self: null
});