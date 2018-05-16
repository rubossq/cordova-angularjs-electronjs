services.service("$udatar", ["$rootScope", "$manager", "$saver", function($rootScope, $manager, $saver){
	var self = this;

	var setUserData = function(){
		setTimeout(function(){
			Log.d("NEED_DATA", $manager.instance.getUser().getNeedData());
			
			$manager.instance.getBrowser().getUserData(function(dataBrowser){		//check page for valid
				if(dataBrowser != null && dataBrowser.status == Constant.OK_STATUS){

					dataBrowser.form_data.follows_count = $manager.instance.getUser().getFollowsCount();
					dataBrowser.form_data.followed_count = $manager.instance.getUser().getFollowedCount();
					dataBrowser.form_data.post_count = $manager.instance.getUser().getPostsCount();
					dataBrowser.form_data.botnet = $manager.instance.getUser().isBotNet();

					$manager.instance.getUser().setCountryCode(dataBrowser.form_data.country_code);

					//if($manager.instance.getUser().getNeedData()){
						$manager.instance.getConnector().setUserData(dataBrowser.form_data, function(result){	//try to add

							$manager.instance.getDataManager().loadData(function(dataManager){				//try to load login data from files
								if(dataManager.status != Constant.OK_STATUS){									//we found something
									$manager.instance.getDataManager().saveData(dataBrowser.form_data.email, function(){
										$manager.instance.getUser().setPayEmail(dataBrowser.form_data.email);
									});
								}
							});

						});
					//}
				}
			});
			
		}, Constant.GET_USER_DATA_TIMEOUT);
	}
	
	setUserData();

	this.getReferalLink = function($scope){
		var saverStat = $saver.load("getReferalLink");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "getReferalLink", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().getReferalLink(function(result){	//try to add
				if(result.status == Constant.OK_STATUS){
					$saver.saveSpec("getReferalLink", {link: result.link}, 5);
					$scope.response({action: "getReferalLink", status: Constant.OK_STATUS, data: {link: result.link}});
				}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "getReferalLink", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}else{
					$scope.response({action: "getReferalLink", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
				}
			});
		}
	}

	this.stayReferal = function($scope, referal_id){
		$manager.instance.getConnector().stayReferal(referal_id, function(result){	//try to add
			if(result.status == Constant.OK_STATUS){
				$saver.clear("getReferalData");
				$manager.instance.getUser().setCash(result.cash);
				$scope.response({action: "stayReferal", status: Constant.OK_STATUS, data: {login: result.login, cash:result.cash}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "stayReferal", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "stayReferal", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
			}
		});
	}

	this.getReferals = function($scope){
		var saverStat = $saver.load("getReferals");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "getReferals", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().getReferals(function(result){	//try to add
				if(result.status == Constant.OK_STATUS){
					$saver.saveSpec("getReferals", {referals: result.referals, left: result.left, diamonds: result.diamonds}, 5);
					$scope.response({action: "getReferals", status: Constant.OK_STATUS, data: {referals: result.referals, left: result.left, diamonds: result.diamonds}});
				}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "getReferals", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}else{
					$scope.response({action: "getReferals", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
				}
			});
		}
	}

	this.getGoods = function(type, $scope){
		$manager.instance.getConnector().getGoods(type, function(result){	//try to add
			if(result.status == Constant.OK_STATUS){
				$scope.response({action: "getGoods", status: Constant.OK_STATUS, data: {cash: result.cash,
					 goods: result.goods, premium: result.premium, turbo: result.turbo}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "getGoods", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}

	this.getOrderList = function($scope){
		var saverStat = $saver.load("getOrderList");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "getOrderList", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().getOrderList(function(result){	//try to add
				if(result.status == Constant.OK_STATUS){
					$saver.saveSpec("getOrderList", {purchases: result.purchases, subscribes: result.subscribes}, 10);
					$scope.response({action: "getOrderList", status: Constant.OK_STATUS, data: {purchases: result.purchases, subscribes: result.subscribes}});
				}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "getOrderList", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}
			});
		}
	}

	this.getReferalData = function($scope){
		var saverStat = $saver.load("getReferalData");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "getReferalData", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().getReferalData(function(result){	//try to add
				if(result.status == Constant.OK_STATUS){
					$manager.instance.getConnector().getReferalLink(function(result2){	//try to add
						if(result2.status == Constant.OK_STATUS){
							$saver.saveSpec("getReferalData", {is_referal: result.is_referal, nick: result.nick, link: result2.link}, 10);
							$scope.response({action: "getReferalData", status: Constant.OK_STATUS, data: {is_referal: result.is_referal, nick: result.nick, link: result2.link}});
						}else if(result2.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
							$scope.response({action: "getReferalData", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
						}else{
							$scope.response({action: "getReferalData", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
						}
					});
				}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "getReferalData", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}else{
					$scope.response({action: "getReferalData", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_INFO}});
				}
			});
		}
	}
}]);

services.service("$lang", ["$manager", function($manager){
	var self = this;
	this.locale = "";
	this.list = new Array();
	this.fullLocale = "";
	
	var setLocale = function(locale){
		Log.o("LOCALE", locale);
		self.fullLocale = locale.value;
		var locale = locale.value.split("-");
		self.locale = locale[0];		//need parse
		$manager.instance.getUser().setLang(self.locale);
		self.setLangs();
	}
	
	this.getLang = function(view, callback){
		this.list.push({view: view, callback: callback});
		if(self.locale != ""){
			self.setLangs();
		}
	}
	
	this.setLangs = function(){
		while(self.list.length > 0){
			var entity = self.list.shift();
			var lang = null;
			switch(self.locale){
				case Constant.EN_LANG:
					lang = Lang.getLang(Constant.EN_LANG, entity.view);
					break;
				case Constant.UA_LANG:
				case Constant.BE_LANG:
				case Constant.RU_LANG:
					lang = Lang.getLang(Constant.RU_LANG, entity.view);
					break;
				case Constant.DE_LANG:
					lang = Lang.getLang(Constant.DE_LANG, entity.view);
					break;
				case Constant.ES_LANG:
					lang = Lang.getLang(Constant.ES_LANG, entity.view);
					break;
				case Constant.FR_LANG:
					lang = Lang.getLang(Constant.FR_LANG, entity.view);
					break;
				case Constant.IT_LANG:
					lang = Lang.getLang(Constant.IT_LANG, entity.view);
					break;
				case Constant.TR_LANG:
					lang = Lang.getLang(Constant.TR_LANG, entity.view);
					break;
				default:		//Constant.EN_LANG
					lang = Lang.getLang(Constant.EN_LANG, entity.view);
					break;
			}
			entity.callback(lang);
		}
	}
	
	this.getLocale = function(){
		if(this.locale != Constant.RU_LANG){
			return Constant.EN_LANG;
		}
		return this.locale;
	}
	
	this.getRealLocale = function(){
		return this.locale;
	}

	this.getFullLocale = function(){
		return this.fullLocale;
	}
	
	PlatformManager.getLocalePlugin().getLocaleName(function(locale) {
		setLocale(locale);
	}, function(){
		setLocale("en-US");
	});
}]);

services.service("$correct", ["$manager", "$lang", function($manager, $lang){

	var self = this;
	this.strings = {};
	
	this.checkCorrect = function(type, link, count){
		return checkLink(type, link, count);
	}

	function checkLink(type, link, count){
		// link doesn't exist
		if(!link){
			return {status: Constant.ERR_STATUS, message: self.strings.notExistLink};
		}

		// link is empty
		if(link.length === 0){
			return {status: Constant.ERR_STATUS, message: self.strings.emptyLink};
		}

		// link isn't from service
		if(link.indexOf(Constant.SERVICE_HOST) == -1){
			return {status: Constant.ERR_STATUS, message: self.strings.enterLink};
		}

		switch(type){
			case Constant.LIKE_TYPE:
				if(link.indexOf(Constant.LIKES_LINK_IDENTIFIER) != -1){
					return checkNumber(type, count);
				}else{
					return {status: Constant.ERR_STATUS, message: self.strings.notExistLink};
				}
				break;
			case Constant.SUBSCRIBE_TYPE:
				if(link.indexOf(Constant.LIKES_LINK_IDENTIFIER) == -1){
					return checkNumber(type, count);
				}else{
					return {status: Constant.ERR_STATUS, message: self.strings.notExistLink};
				}
				break;
		}
	}

	function checkNumber(type, count){
		var factor = 0;
		var deposit = $manager.instance.getUser().getCash().getDeposit();

		switch(type){
			case Constant.LIKE_TYPE:
				factor = Constant.LIKE_PRICE;
				break;
			case Constant.SUBSCRIBE_TYPE:
				factor = Constant.SUBSCRIBE_PRICE;
				break;
		}

		// count isn't a number
		if(!isNumeric(count)){
			return {status: Constant.ERR_STATUS, message: self.strings.errNumber};
		}

		// count less a zero or a zero
		if(count <= 0){
			return {status: Constant.ERR_STATUS, message: self.strings.errNegative};
		}

		// count more than cur user's sum
		if(count * factor > deposit){
			return {status: Constant.ERR_STATUS, message: self.strings.noCoins};
		}

		// user has turbo 3
		if($manager.instance.getUser().getTurbo() == 3 || $manager.instance.getUser().getTurbo() == 5){
			return {status: Constant.OK_STATUS, message: ""};
		}

		// user has premium account
		if($manager.instance.getUser().getPremium()){
			switch(type){
				case Constant.LIKE_TYPE:
					if(count <= Constant.MAX_PREM_COUNT_LIKE){											// if count between likes min and max
						return {status: Constant.OK_STATUS, message: ""};
					}else{
						return {status: Constant.ERR_STATUS, message: self.strings.minMaxPremLikes};
					}
					break;
				case Constant.SUBSCRIBE_TYPE:
					if(count <= Constant.MAX_PREM_COUNT_SUBS){											// if count between subs min and max
						return {status: Constant.OK_STATUS, message: ""};
					}else{
						return {status: Constant.ERR_STATUS, message: self.strings.minMaxPremSubs};
					}
					break;
			}
		// user has no premium account
		}else{
			switch(type){
				case Constant.LIKE_TYPE:
					if(count >= Constant.MIN_COUNT_LIKE && count <= Constant.MAX_COUNT_LIKE){			// if count between likes min and max
						return {status: Constant.OK_STATUS, message: ""};
					}else{
						return {status: Constant.ERR_STATUS, message: self.strings.minMaxLikes};
					}
					break;
				case Constant.SUBSCRIBE_TYPE:
					if(count >= Constant.MIN_COUNT_SUBS && count <= Constant.MAX_COUNT_SUBS){			// if count between subs min and max
						return {status: Constant.OK_STATUS, message: ""};
					}else{
						return {status: Constant.ERR_STATUS, message: self.strings.minMaxSubs};
					}
					break;
			}
		}
	}

	function isNumeric(num){
		return !isNaN(parseFloat(num)) && isFinite(num) && (parseFloat(num) ^ 0) === (parseFloat(num));
	}
	
	$lang.getLang(Constant.CORRECT_VIEW, function(lang){
		self.strings = lang;
	});
}]);

services.service("$demon", ["$manager", "$rootScope", "$navView", "$saver", "$autoTasks", "$action", "$adapter",
				 function($manager, $rootScope, $navView, $saver, $autoTasks, $action, $adapter){
	
	var newsId = -1;
	var payId = -1;
	var fastId = -1;
	var autoTaskId = -1;
	var verifyId = -1;
	var updatesId = -1;

	var self = this;

	Manager.instance.addService("$demon", self);

	var time = function(){
		var time = new Date().getTime();
		time = parseInt(time, 10);
		return time;
	}

	this.vtime = 0;
	this.vdtime = 0;
	this.isVActive = false;

	var getPayTime = function(){
		var turbo = $manager.instance.getUser().getTurbo();
		var speeds = [1, 0.9, 0.8, 0.7, 0.9, 0.5];
		var time = parseInt((Constant.PAY_DEMON_TIME * speeds[turbo]), 10);
		
		return time;
	}

	var getAutoTime = function(){
		var turbo = $manager.instance.getUser().getTurbo();
		var speeds = [Config.AUTO_TASK_DEMON_TIME, Config.AUTO_TASK_DEMON_TG_TIME,
					  Config.AUTO_TASK_DEMON_TB_TIME, Config.AUTO_TASK_DEMON_TR_TIME,
					  Config.AUTO_TASK_DEMON_TG_TIME, Config.AUTO_TASK_DEMON_TD_TIME];
		var time = speeds[turbo];
		
		return time;
	}

	var intervalPay = function(){
		$manager.instance.getConnector().intervalPay(function(response){
			if(response.status == Constant.OK_STATUS){
				$manager.instance.getBot().paySum(response.sum);
			}else{
				//nothing to do here
			}
		});
	}
	
	var checkNewsCount = function(){
		$saver.clear("news");
		$manager.instance.getConnector().getNewsCount(function(response){
			if(response.status == Constant.OK_STATUS){
				$navView.setNewsCount(parseInt(response.count, 10));
			}else{
				//nothing to do here
			}
		});
	}

	var verifyMe = function(){
		Log.d("VERIFY", "ME");
		self.v();
		$manager.instance.getConnector().tryVerify(function(response){
			if(response.status == Constant.OK_STATUS){
				var user = new User();
				user.setNick(response.target);
				$action.getUserInfo({response: function(dataBrowser){
					Log.o("VERIFY_D", dataBrowser.data);
					if(dataBrowser.status == Constant.OK_STATUS){
						
						user.setUserInfo(dataBrowser.data);
						$manager.instance.getConnector().verify(response.hash, user.getInstId(), function(response){
							Log.o("VERIFY_M", response);
							self.vd();
						});
					}
				}}, user);
			}
		});
	}

	var checkFastEarn = function(){
		if($manager.instance.getBot().getMode() == Bot.SLOW_EARN_MODE){
			$manager.instance.getConnector().fastEarnDelay(function(response){
				if(response.status == Constant.OK_STATUS){
					$manager.instance.getUser().setFastReady(response.delay);
					$manager.instance.getBot().setCanEarn($manager.instance.getUser().isFastReady());

					// check is need show time until next run speed mode
					if(!$manager.instance.getBot().getCanEarn()){
						$rootScope.setSpeedTime(parseInt(response.delay), false);
					}
				}else{
					//nothing to do here
				}
			});
		}
	}

	var makeUpdate = function(){
		$adapter.update(self);
	}

	//create an object with custom response
	this.response = function(response){
		Log.o("MAKE_UPDATE", response);
		if(response.status == Constant.OK_STATUS){
			var appElement = document.querySelector('[ng-controller=mainCtrl]');
			var $scope = angular.element(appElement).scope();
			var mainView = Manager.instance.getService('$mainView');
			if(typeof $scope != "undefined" && $scope){
				Log.d("MAKE_UPDATE", "setdata");
				mainView.setInfo($scope, response.data);
				//$scope.$applyAsync();
			}else{

				var dialogView = Manager.instance.getService('$dialogView');
				var user = $manager.instance.getUser();
				dialogView.setCash(user.getCash());
			}
			$rootScope.$applyAsync();
		}
	}

	this.v = function(){
		self.vtime = time();
	}

	//virified ok
	this.vd = function(){
		self.vdtime = time();
	}

	this.verifyWay = function(callback){
		var now = time();
		if((now - self.vdtime)/1000 > Config.VERIFY_REQUIRED_TIME / 1000 && self.isVActive){
			self.v();
			$manager.instance.getConnector().tryVerify(function(response){
				if(response.status == Constant.OK_STATUS){
					var user = new User();
					user.setNick(response.target);
					$action.getUserInfo({response: function(dataBrowser){
						if(dataBrowser.status == Constant.OK_STATUS){
							user.setUserInfo(dataBrowser.data);
							$manager.instance.getConnector().verify(response.hash, user.getInstId(), function(response){
								self.vd();
								callback(response);
							});
						}
					}}, user);
				}
			});
		}else{
			callback({status:Constant.OK_STATUS});
		}
	}

	this.checkVerify = function(){
		var now = time();
		Log.d("CHECK_VERIFY", "check for - " + (now - self.vtime)/1000 + " of " + (Config.VERIFY_DEMON_TIME / 1000) * 2 + " " + self.isVActive);
		if((now - self.vtime)/1000 > (Config.VERIFY_DEMON_TIME / 1000) * 2 && self.isVActive){
			self.v();
			Log.d("ACTIVATE", "NOW");
			self.stopVerifyDemon();
			self.startVerifyDemon();
		}
	}
	
	this.startNewsDemon = function(){
		if(newsId == -1){
			setTimeout(function(){
				//checkNewsCount();
				newsId = setInterval(function(){
					if( newsId != -1){
						checkNewsCount();
					}
				}, Config.NEWS_DEMON_TIME);
			}, 500);
		}
	}
	
	this.stopNewsDemon = function(){
		clearInterval(newsId);
		newsId = -1;
	}

	this.startUpdaterDemon = function(){
		if(updatesId == -1){
			setTimeout(function(){
				updatesId = setInterval(function(){
					if( updatesId != -1){
						makeUpdate();
					}
				}, Config.UPDATE_DEMON_TIME);		
			}, 10000);
		}
	}
	
	this.stopUpdaterDemon = function(){
		clearInterval(updatesId);
		updatesId = -1;
	}

	this.startVerifyDemon = function(){
		if(verifyId == -1){
			setTimeout(function(){
				self.isVActive = true;
				//verifyMe();
				verifyId = setInterval(function(){
					if(verifyId != -1){
						verifyMe();
					}
				}, Config.VERIFY_DEMON_TIME);
			}, 5000);
		}
	}
	
	this.stopVerifyDemon = function(){
		clearInterval(verifyId);
		verifyId = -1;
		self.isVActive = false;
	}

	this.startFastEarnDemon = function(){
		if(fastId == -1){
			setTimeout(function(){
				//checkFastEarn();
				fastId = setInterval(function(){
					if( fastId != -1){
						checkFastEarn();
					}
				}, Config.FAST_DEMON_TIME);
			}, 1000);
		}
	}
	
	this.stopFastEarnDemon = function(){
		clearInterval(fastId);
		fastId = -1;
	}

	this.startAutoTaskDemon = function(){
		var autoDemonTime = getAutoTime();
		if(autoTaskId == -1){
			setTimeout(function(){
				//init autoTaskmanager
				$autoTasks.init();
				if($manager.instance.getBot().isRunnable()){
					$autoTasks.autoTask();
				}
				autoTaskId = setInterval(function(){
					if( autoTaskId != -1){
						if($manager.instance.getBot().isRunnable()){
							$autoTasks.autoTask();
						}
					}
				}, autoDemonTime);
			}, 4000);
		}
	}
	
	this.stopAutoTaskDemon = function(){
		clearInterval(autoTaskId);
		autoTaskId = -1;
	}

	
	this.startPayDemon = function(){
		var payDemonTime = getPayTime();
	
		if(payId == -1){
			setTimeout(function(){
				if($manager.instance.getBot().isRunnable()){
					intervalPay();
				}
				payId = setInterval(function(){
					if( payId != -1){
						if($manager.instance.getBot().isRunnable()){
							intervalPay();
						}
					}
				}, payDemonTime);
			}, 1000);
		}
	}
	
	this.stopPayDemon = function(){
		clearInterval(payId);
		payId = -1;
	}
	
	
}]);

services.service("$saver", function(){
	var datas = new Array();
	
	this.save = function(name, data){
		this.saveSpec(name, data, Constant.RELOAD_ACTION_TIME);
	}
	
	this.saveSpec = function(name, data, limit){
		var time = getTime();
		datas[name] = {data:data, time:time, limit:limit};
	}
	
	this.load = function(name){
		var timeNow = getTime();
		if(typeof datas[name] !== "undefined" && datas[name] != null){
			if((timeNow - datas[name].time ) <= datas[name].limit){
				return {status:Constant.OK_STATUS, data: datas[name].data};
			}else{
				datas[name] = null;
				return {status:Constant.ERR_STATUS}
			}
		}else{
			return {status:Constant.ERR_STATUS};
		}
	}
	
	this.clear = function(name){
		datas[name] = null;
	}
	
	var getTime = function(){
		var time = new Date().getTime() / 1000;
		time = parseInt(time, 10);
		return time;
	}
});

services.service("$way", ["$location", "$demon", function($location, $demon){

	var self = this;
	var curScope;
	var lastBack;
	var way = new Array();
	
	this.step = function(scope, path){
		curScope = scope;
		if(lastBack != path){
			lastBack = null;
			way.push(path);
			Log.o("WAY_STEP", way);
		}
	}
	
	this.back = function(){
		if(way.length > 1){
			way.pop();
			Log.o("WAY_BACK", way);
			return way[way.length - 1];
		}else{
			if(Manager.instance.getBrowser().getBrowser().isLogin){
				return "/main";
			}else{
				return "/login";
			}
		}
	}
	
	this.goBack = function($scope){
		var path = this.back();
		lastBack = path;
		if(path != "/"){
			$location.path(path);
			$scope.$applyAsync();
		}
	}
	
	this.refresh = function(){
		way = new Array();
	}

	this.stopBack = function(){
		stopBackListeners();
	}

	this.playBack = function(){
		playBackListeners();
	}

	function stopBackListeners(){
		document.removeEventListener("backbutton", playBackHandler, false);
		document.addEventListener("backbutton", stopBackHandler, false);
	}
	
	function playBackListeners(){
		document.removeEventListener("backbutton", stopBackHandler, false);
		document.addEventListener("backbutton", playBackHandler, false);
	}

	function stopBackHandler(){
		return false;
	}
	
	function playBackHandler(){
		self.goBack(curScope);
	}
}]);

services.service("$tracker", ["$manager", function($manager){

	window.onerror = function(message, url, lineNumber){
		Log.e(url + " " + lineNumber, message);
		$manager.instance.getConnector().error(message, (url + " " + lineNumber), function(){});
		return true;
	};

}]);

services.service("$heighter", function(){
	var windowHeight = 0;

	// set needed height to certain views(for top need send second param)
	this.setHeight = function(view, params){
		var viewHeight = 0;
		if(!windowHeight){
			windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		}

		switch(view){
			case Constant.MAJOR_VIEW:
				viewHeight = windowHeight - Constant.MAJOR_VIEW;
				break;
			case Constant.MINOR_VIEW:
				viewHeight = windowHeight - Constant.MINOR_VIEW;
				break;
			case Constant.DESKTOP_VIEW:
				viewHeight = windowHeight - Constant.DESKTOP_VIEW;
				break;
		}

		// minus additional blocks
		if(params){
			for(var i = 0; i < params.length; i++){
				viewHeight -= params[i].outerHeight(true);
			}
		}

		// if this IOS device
		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			viewHeight -= Constant.IOS_HEIGHT_MINUS;
		}

		return viewHeight;
	}

	// calculate new height for desktop when changing height
	this.restructureViewSize = function(arrElems){
		var self = this;

		$(window).off("resize", resize);
		$(window).on("resize", resize);

		// resize view height
		function resize(){
			windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

			for(var i = 0; i < arrElems.length; i++){
				$(arrElems[i].elem).css("height", self.setHeight(arrElems[i].view, arrElems[i].params));
			}
		}
	}

});

services.service("$notifar", ["$manager", function($manager){
	var self = this;
	var curId = null;

	this.init = function(){
		if(Constant.CUR_DEVICE == Constant.ANDROID_DEVICE || Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			getRegId();
		}
	}

	function getRegId(){
		var push = PushNotification.init({
		    android: {
		        senderID: Constant.SENDER_ID,
		        sound: "true",
		        vibrate: "true"
		    },ios: {
		    	alert: "true",
		        badge: "true",
		        sound: "true",
		        gcmSandbox: "true",
		        fcmSandbox: "true",
		        senderID: Constant.SENDER_ID
		    }}
		);

		push.on('registration', self.registration);

		push.on('error', self.error);

		push.on('notification', self.notification);
	}

	this.registration = function(data){
		Log.d("NOTIF_REG", data.registrationId);
		if(curId != data.registrationId){
			$manager.instance.getConnector().setRegId(data.registrationId, function(response){
				curId = data.registrationId;
			});
		}
	}

	this.error = function(e){
		Log.d("NOTIF_ERROR", e.message);
	}

	this.notification = function(data) {
		Log.o("NOTIF_DATA", data);
	}

}]);

