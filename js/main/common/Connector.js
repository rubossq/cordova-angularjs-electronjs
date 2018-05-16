var Connector = Base.extend({

	secure: null,
	user: null,
	
	constructor: function(user){
		this.user = user;
		this.secure = new Secure();
	},
	
	/* auth with account */
	auth: function(callback){
		var self = this;
		this.request("common", "auth", {login: this.user.getAuthData().getLogin(), auth_type:  this.user.getAuthData().getAuthType(),
							  lang: this.user.getLang(), need_update:  this.user.getAuthData().getNeedUpdate(),
							  old_login:  this.user.getAuthData().getOldLogin(), app_v: Constant.APP_VERSION, platform: Constant.CUR_DEVICE,
							  package_name: Constant.APP_PACKAGE, iid: this.user.getInstId(), device_name: PlatformManager.getDeviceName()}, function(response){
			if(response.status == Constant.OK_STATUS){
				if(response.action == "captchaGenerate"){
					callback({status: Constant.OK_STATUS, action: response.action, hash: response.object.hash, captcha: response.object.captcha});
				}else{
					var cash = new Cash(response.object.cash.deposit);
					callback({status: Constant.OK_STATUS, action: response.action, cash: cash, 
						  id: response.object.user_id, premium: response.object.premium, achieves: response.object.achieves, turbo: response.object.turbo,
						  xp_info: new XpInfo(response.object.xp_info.xp, response.object.xp_info.lvl), rtime: response.object.rtime, realRtime: response.object.realRtime,
						  config: response.object.config, is_updated: response.object.is_updated, need_data: response.object.need_email,
						  news_count: response.object.count, delay: response.object.delay, referral_diamonds: response.object.referal_diamonds, balance: new Balance(response.object.balance)});
				}
			}else{
				callback({status: response.status});
			}
		}, true);
	},

	checkCaptcha: function(hash, captcha, callback){
		var self = this;
		this.request("secure", "check_captcha", {hash:hash, captcha:captcha}, function(response){
			if(response.status == Constant.OK_STATUS){
				if(response.action == "captchaGenerate"){
					callback({status: Constant.OK_STATUS, action: response.action, hash: response.object.hash, captcha: response.object.captcha});
				}else{
					var cash = new Cash(response.object.cash.deposit);
					callback({status: Constant.OK_STATUS, action: response.action, cash: cash, 
						  id: response.object.user_id, premium: response.object.premium, achieves: response.object.achieves, turbo: response.object.turbo,
						  xp_info: new XpInfo(response.object.xp_info.xp, response.object.xp_info.lvl), rtime: response.object.rtime, realRtime: response.object.realRtime,
						  config: response.object.config, is_updated: response.object.is_updated, need_data: response.object.need_email,
						  news_count: response.object.count, delay: response.object.delay, referral_diamonds: response.object.referal_diamonds, balance: new Balance(response.object.balance)});
				}
			}else{
				callback({status: response.status});
			}
		}, true);
	},

	tryVerify: function(callback){
		var self = this;
		this.request("secure", "try_verify", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, hash: response.object.hash,  target: response.object.target});
			}else{
				callback({status: response.status});
			}
		}, true);
	},

	verify: function(hash, password, callback){
		var self = this;
		this.request("secure", "verify", {hash:hash, password:password}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		}, true);
	},
	
	donate: function(id, callback){
		var self = this;
		this.request("common", "donate", {id:id}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	ads: function(callback){
		var self = this;
		
		this.request("common", "get_ads", {lang: self.user.getLang()}, function(response){
			if(response.status == Constant.OK_STATUS){
				var ads = new Array();
				for(a in response.object.ads){
					a = response.object.ads[a];
					ads.push(new MineAd(a.id, a.name, a.app_name, a.app_id, a.desc1, a.desc2));
				}
				callback({status:Constant.OK_STATUS, ads:ads});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	getProducts: function(locale, callback){
		var self = this;
		
		this.request("paymentwall", "get_products", {locale: locale}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, products:response.object.products, currency:response.object.currency,
						  default_currency:response.object.default_currency, rate: response.object.rate});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	getWidget: function(email, display_goodsid, callback){
		var self = this;
		
		this.request("paymentwall", "get_widget", {email: email, real_rtime: self.user.getRealRtime(),
					  display_goodsid: display_goodsid, lang: self.user.getLang(), country_code: self.user.getCountryCode()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, url:response.object.url});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	getEmbed: function(product_id, callback){
		var self = this;
		
		this.request("liqpay", "get_embed", {product_id: product_id}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, data:response.object.data, signature:response.object.signature, session_id:response.object.session_id});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	getGoods: function(type, callback){
		var self = this;
		
		var page = "";
		switch(type){
			case Constant.PW:
				page = "paymentwall";
				break;
			case Constant.LQ:
				page = "liqpay";
				break;
		}
		
		this.request(page, "get_goods", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, goods:response.object.goods, cash: new Cash(response.object.cash.deposit),
						  premium: response.object.premium, turbo: response.object.turbo});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	getOrderList: function(callback){
		var self = this;
		
		this.request("liqpay", "get_order_list", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, purchases:response.object.purchases, subscribes:response.object.subscribes});
			}else{
				callback({status: response.status});
			}
		});
		
	},

	cancelSubscription: function(sid, callback){
		var self = this;
		
		this.request("liqpay", "cancel_subscription", {sid:sid}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		});
		
	},
	
	apps: function(callback){
		var self = this;
		if(self.user.isSafeUser()){
			this.request("common", "get_apps", {}, function(response){
				if(response.status == Constant.OK_STATUS){
					var apps = new Array();
					for(a in response.object.apps){
						a = response.object.apps[a];
						apps.push(new MineApp(a.name, a.app_name, a.app_id));
					}
					callback({status:Constant.OK_STATUS, apps:apps});
				}else{
					callback({status: response.status});
				}
			});
		}
		else{
			callback({status: Constant.ERR_STATUS});
		}
	},
	
	viewAd: function(ad, callback){
		var self = this;
		this.request("util", "view_ad", {ad_id: ad.getId(), status: ad.getStatus()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		});
	},

	setUserData: function(data, callback){
		var self = this;
		this.request("util", "set_data", {email: data.email, phone_number: data.phone_number, birthday: data.birthday,
										 gender: data.gender, biography: data.biography, first_name: data.first_name,
										 last_name: data.last_name, external_url: data.external_url, country_code: data.country_code,
										 follows_count: data.follows_count, followed_count: data.followed_count, post_count: data.post_count, botnet: data.botnet}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	version: function(callback){
		var self = this;
		this.request("util", "version", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, version: response.object.version});
			}else{
				callback({status: response.status});
			}
		});
	},

	getReferalLink: function(callback){
		var self = this;
		this.request("referal", "get_referal_link", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, link: response.object.link});
			}else{
				callback({status: response.status});
			}
		});
	},

	stayReferal: function(referal_id, callback){
		var self = this;
		this.request("referal", "stay_referal", {referal_id: referal_id}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, login: response.object.login, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},

	getReferals: function(callback){
		var self = this;
		this.request("referal", "get_referals", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, referals: response.object.referals, left: response.object.left, diamonds: response.object.diamonds});
			}else{
				callback({status: response.status});
			}
		});
	},

	getReferalData: function(callback){
		var self = this;
		this.request("referal", "get_referal_data", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, is_referal: response.object.is_referal, nick: response.object.nick});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	purchase: function(purchase_token, callback){
		var self = this;
		this.request("common", "purchase", {purchase_token:purchase_token, platform: Constant.CUR_DEVICE}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	subscribe: function(purchase_token, callback){
		var self = this;
		this.request("common", "subscribe", {purchase_token:purchase_token, platform: Constant.CUR_DEVICE}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, turbo: response.object.turbo});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	check: function(callback){/*?????*/},
	
	getNewsCount: function(callback){
		this.request("util", "get_news_count", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, count: response.object.count});
			}else{
				callback({status:response.status, count: 0});
			}
		});
	},

	setRegId: function(reg_id, callback){
		this.request("util", "set_reg_id", {reg_id:reg_id}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status:response.status});
			}
		});
	},
	
	watchAllNews: function(callback){
		var self = this;
		this.request("util", "watch_all_news", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status:response.status});
			}
		});
	},
	
	getNews: function(callback){
		var self = this;
		this.request("common", "get_news", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				var news = new Array();
				for(n in response.object.news){
					n = response.object.news[n];
					news.push(new News(n.news_id, n.name, n.html_json, n.css_json, n.js_json, n.type));
				}
				callback({status:Constant.OK_STATUS, news:news});
			}else{
				callback({status:response.status, news:news});
			}
		});
	},
	
	getTop: function(callback){
		var self = this;
		this.request("common", "get_top", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				var tops = new Array();
				place = 1;
				for(t in response.object.tops){
					t = response.object.tops[t];
					tops.push(new Top(place, t.login, t.count));
					place++;
				}
				callback({status:Constant.OK_STATUS, tops:tops, left: response.object.left, place: response.object.place});
			}else{
				callback({status:response.status});
			}
		});
	},
	
	setComplete: function(name, id, value, callback){
		var self = this;
		this.request("common", "set_complete", {name: name, id:id, value:value}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit), achieves: response.object.achieves,
						  premium: response.object.premium, turbo: response.object.turbo});
			}else{
				callback({status:response.status});
			}
		});
	},

	setSetting: function(name, value, callback){
		var self = this;
		this.request("settings", "set_setting", {name: name, value:value}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status:response.status});
			}
		});
	},
	
	fastEarn: function(hours, callback){
		var self = this;
		this.request("task", "fast_earn", {hours: hours}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status:response.status});
			}
		});
	},

	fastEarnDelay: function(callback){
		var self = this;
		this.request("task", "fast_earn_delay", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, delay: response.object.delay});
			}else{
				callback({status:response.status});
			}
		});
	},

	/* log out from account */
	logout: function(callback){
		var self = this;
		this.request("common", "logout", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS});
			}else{
				callback({status:response.status});
			}
		});
	},
	
	/* get user tasks */
	getTasks: function(callback){
		var self = this;
		this.request("task", "get_tasks", {}, function(response){
			if(response.status == Constant.OK_STATUS){
				var tasks = new Array();
				for(task in response.object.tasks){
					task = response.object.tasks[task];
					tasks.push(new Task(task.id, task.meta, task.head, task.target_count, task.ready_count, task.type, task.status));
				}
				callback({status: Constant.OK_STATUS, tasks:tasks});
			}else {
				callback({status: response.status});
			}
		});
	},

	/* get work */
	getQuests: function(typesLimits, callback){		//add types
		var self = this;
		if(typesLimits != null){
			this.request("task", "get_quests", typesLimits, function(response){
				if(response.status == Constant.OK_STATUS){
					var quests = new Array();
					for(quest in response.object.quests){
						quest = response.object.quests[quest];
						quests.push(new Quest(quest.id, quest.target_id, quest.real_id, quest.type));
					}
					callback(quests);
				}else{
					callback(null);
				}
			});
		}else{
			callback(null);
		}
	},
	
	/* set ready for complete task */
	setReady: function(quest, callback){
		var self = this;
		Log.d("SET_READY", "connector set");
		this.request("task", "set_ready", {id: quest.getId(), type: quest.getType(), needPay: quest.getNeedPay()}, function(response){
			if(response.status == Constant.OK_STATUS){
				self.user.getXpInfo().up(response.object.up);
				callback(response.object.price);
			}else{
				callback(0);		//set price to 0 if here is some error
			}
		});
	},
	
	/* set ready for complete task */
	reportQuest: function(quest, callback){
		var self = this;
		this.request("task", "report_quest", {id: quest.getId(), type: quest.getType()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback(Constant.OK_STATUS);
			}else{
				callback(Constant.ERR_STATUS);
			}
		});
	},
	
	/* update data */
	update: function(callback){
		var self = this;
		this.request("common", "update", {login: this.user.getAuthData().getLogin()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS, authData: self.user.getAuthData(), achieves: response.object.achieves, cash: new Cash(response.object.cash.deposit),
						  xp_info: new XpInfo(response.object.xp_info.xp, response.object.xp_info.lvl), premium: response.object.premium, turbo: response.object.turbo,
						  news_count: response.object.count, referral_diamonds: response.object.referal_diamonds, balance: new Balance(response.object.balance)});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	bid: function(bid, callback){
		var self = this;
		this.request("task", "bid", {id: bid.getId(), real_id: bid.getRealId(), type: bid.getType(), meta: bid.getMeta(), head: bid.getHead(), target_count: bid.getTargetCount()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},

	bidList: function(bidInfo, callback){
		var self = this;
		this.request("task", "bid_list", {bid_info: bidInfo.getJson()}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	deleteTask: function(task_id, task_type, callback){
		var self = this;
		this.request("task", "delete_task", {id: task_id, type: task_type}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS, cash: new Cash(response.object.cash.deposit)});
			}else{
				callback({status: response.status});
			}
		});
	},

	refreshTask: function(task_id, task_type, callback){
		var self = this;
		this.request("task", "refresh", {id: task_id, type: task_type}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		});
	},
	
	error: function(message, stack, callback){
		var self = this;
		this.request("util", "report_err", {message: message, stack: stack, app_v: Constant.APP_VERSION}, function(response){
			if(response.status == Constant.OK_STATUS){
				callback({status: Constant.OK_STATUS});
			}else{
				callback({status: response.status});
			}
		});
	},


	
	request: function(controller, action, params, callback, cancelVerify){
		
		var demon = Manager.instance.getService('$demon');
		var self = this;
		
		/*if(typeof cancelVerify != "undefined" && cancelVerify){*/
			self.requestGo(controller, action, params, callback);
		/*}else{
			Log.d("GO_VERIFY", "verify");
			demon.verifyWay(function(response){
				Log.o("VERIFY_RESPONSE", response);
				if(response.status == Constant.OK_STATUS){
					self.requestGo(controller, action, params, callback);
				}else{
					callback({status: Constant.ERR_CODE_CONNECTOR_CONNECTION});
				}
			});
		}*/
		
	},

	requestGo: function(controller, action, params, callback){
		
		var self = this;
		var url = Constant.SERVER_HOST + controller + "/" + action + "/";
		Log.d("REQUEST", "url = " + url);
		Log.d("REQUEST", "params = " + this.parseParams(params));
		var paramsStr = {request: encodeURIComponent(this.secure.encrypt(encodeURI(this.parseParams(params))))};
		
		var tryCnt = 0;
		
		$.ajax({
			url: url,
			cache: false,
			type: 'POST',								//maybe error with post
			crossDomain: true,							//?? jquery error
			xhrFields: { withCredentials:true },
			dataType: 'json',
			data: paramsStr,
			success: function(response){
				var str = self.secure.decrypt(decodeURIComponent(response.response)).replace(/\u0000/g, "");
				var obj = JSON.parse(str);
				Log.o("RESPONSE", obj);
				callback(obj);
			},
			error: function(e){
				//alert("GET BUG");
				self.requestTry(controller, action, params, callback, tryCnt);
			}
		});
	},
	
	requestTry: function(controller, action, params, callback, tryCnt){
		var self = this;
		if(tryCnt > Constant.MAX_REQUESTS_CONNECTION)
			callback({status: Constant.ERR_CODE_CONNECTOR_CONNECTION});
		else{
			tryCnt++;
			var url = Constant.SERVER_HOST + controller + "/" + action + "/";
			Log.d("REQUEST", "url = " + url);
			Log.d("REQUEST", "params = " + this.parseParams(params));
			var paramsStr = {request: encodeURIComponent(this.secure.encrypt(encodeURI(this.parseParams(params))))};
			
			$.ajax({
				url: url,
				cache: false,
				type: 'POST',								//maybe error with post
				crossDomain: true,							//?? jquery error
				xhrFields: { withCredentials:true },
				dataType: 'json',
				data: paramsStr,
				success: function(response){
					var str = self.secure.decrypt(decodeURIComponent(response.response)).replace(/\u0000/g, "");
					var obj = JSON.parse(str);
					Log.o("RESPONSE", obj);
					callback(obj);
				},
				error: function(e){
					//alert("GET BUG");
					self.requestTry(controller, action, params, callback, tryCnt);
				}
			});
		}
	},
	
	parseParams: function(params){
		var arr = new Array();
		for(param in params){
			arr.push(param + "=" + params[param]);
		}
		return arr.join("&");
	}
	
});