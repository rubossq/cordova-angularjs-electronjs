services.service("$manager", ["$rootScope", function($rootScope){
	this.instance = new Manager($rootScope);
}]);

services.service("$action",["$manager", "$saver", "$adapter", function($manager, $saver, $adapter){
	var self = this;

	this.bid = function($scope, bid){
		$manager.instance.getBrowser().getMetaHead(bid, function(dataBrowser){		//check page for valid
			if(dataBrowser != null && dataBrowser.status == Constant.OK_STATUS){
				if(!dataBrowser.is_private){
					bid.setMeta(dataBrowser.metaHead.meta);
					bid.setHead(dataBrowser.metaHead.head);
					bid.setId(dataBrowser.metaHead.id);
					$manager.instance.getConnector().bid(bid, function(result){	//try to add
						if(result.status == Constant.OK_STATUS){
							$saver.clear("tasks");
							$manager.instance.getUser().setCash(result.cash);
							$scope.response({action: "bid", status: Constant.OK_STATUS, data: {cash: result.cash}});
						}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
							$scope.response({action: "bid", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
						}else{
							$scope.response({action: "bid", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_BID}});
						}
					});
				}else{
					$scope.response({action: "bid", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_PRIVATE}});
				}
			}else{
				$scope.response({action: "bid", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_BID}});
			}
		});
	}

	this.bidList = function($scope, bidInfo){
		$manager.instance.getConnector().bidList(bidInfo, function(result){	//try to add
			if(result.status == Constant.OK_STATUS){
				$saver.clear("tasks");
				$manager.instance.getUser().setCash(result.cash);
				$scope.response({action: "bidList", status: Constant.OK_STATUS, data: {cash: result.cash}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "bidList", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "bidList", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_BID}});
			}
		});
	}
	
	this.tasks = function($scope){
		$adapter.tasks($scope);
	}
	
	this.version = function($scope){
		var saverStat = $saver.load("version");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "version", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().version(function(dataConnector){
				//only if ok status
				if(dataConnector.status == Constant.OK_STATUS){
					$saver.saveSpec("version", {version: dataConnector.version}, 3600);
					$scope.response({action: "version", status:Constant.OK_STATUS, data: {version: dataConnector.version}});
				}
			});
		}
	}

	
	this.cancelSubscription = function($scope, sid){
		$manager.instance.getConnector().cancelSubscription(sid, function(dataConnector){	//get UserInfo
			if(dataConnector.status == Constant.OK_STATUS){
				$scope.response({action: "cancelSubscription", status:Constant.OK_STATUS});
			}else{
				$scope.response({action: "cancelSubscription", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}
	
	this.apps = function($scope){
		var saverStat = $saver.load("apps");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "apps", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().apps(function(dataConnector){
				//only if ok status
				if(dataConnector.status == Constant.OK_STATUS){
					$saver.saveSpec("apps", {apps: dataConnector.apps}, 3600);
					$scope.response({action: "apps", status:Constant.OK_STATUS, data: {apps: dataConnector.apps}});
				}
			});
		}
	}
	
	this.top = function($scope){
		var saverStat = $saver.load("top");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "top", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().getTop(function(dataConnector){
				if(dataConnector.status == Constant.OK_STATUS){
					$saver.saveSpec("top", dataConnector, 60);
					$scope.response({action: "top", status:Constant.OK_STATUS, data: dataConnector});
				}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "top", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}else{
					$scope.response({action: "top", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_TOP}});
				}
			});
		}
	}

	this.getUserInfo = function($scope, user){
		$manager.instance.getBrowser().getUserInfo(user, function(dataBrowser){	//get UserInfo
			if(dataBrowser != null){
				$scope.response({action: "getUserInfo", status:Constant.OK_STATUS, data: dataBrowser.userInfo});
			}else{
				$scope.response({action: "getUserInfo", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}
	
	this.news = function($scope){
		var saverStat = $saver.load("news");
		if(saverStat.status == Constant.OK_STATUS){
			$scope.response({action: "news", status:Constant.OK_STATUS, data: saverStat.data});
		}else{
			$manager.instance.getConnector().watchAllNews(function(response){
				if(response.status == Constant.OK_STATUS){
					$manager.instance.getConnector().getNews(function(dataConnector){
						if(dataConnector.status == Constant.OK_STATUS){
							$saver.saveSpec("news", {news: dataConnector.news}, 60);
							$scope.response({action: "news", status:Constant.OK_STATUS, data: {news: dataConnector.news}});
						}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
							$scope.response({action: "news", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
						}else{
							$scope.response({action: "news", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_NEWS}});
						}
					});
				}else if(response.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
					$scope.response({action: "news", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
				}
				else{
					$scope.response({action: "news", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_NEWS}});
				}
			});
		}
	}
	
	this.complete = function(name, id, message, value, $scope){
		$manager.instance.getConnector().setComplete(name, id, value, function(dataConnector){
			if(dataConnector.status == Constant.OK_STATUS){
				$saver.clear("news");
				$scope.response({action: "complete", status:Constant.OK_STATUS, data: {cash: dataConnector.cash, name: name, message: message,
					achieves: dataConnector.achieves, premium: dataConnector.premium, turbo: dataConnector.turbo}});
			}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "complete", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "complete", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_COMPLETE}});
			}
		});
	}
	
	this.run = function($scope){
		$manager.instance.getBot().run(function(result){
			if(result == Constant.OK_STATUS){
				$scope.response({action: "run", status:Constant.OK_STATUS, data: {}});
			}else{
				$scope.response({action: "run", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BOT_RUN}});
			}
		});
	}

	this.setMode = function(hours, $scope){
		$manager.instance.getBot().setFastLimit(hours, function(){
			$manager.instance.getBot().setMode(Bot.FAST_EARN_MODE, function(result){
				if(result == Constant.OK_STATUS){
					$manager.instance.getConnector().fastEarn(Constant.MIN_FAST_HOURS, function(){});
					//$scope.response({action: "setMode", status:Constant.OK_STATUS, data: {}});
				}else{
					//$scope.response({action: "setMode", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BOT_RUN}});
				}
			});
		});
	}

	this.stop = function($scope){
		$manager.instance.getBot().stop(function(result){
			if(result == Constant.OK_STATUS){
				$scope.response({action: "stop", status:Constant.OK_STATUS, data: {}});
			}else{
				$scope.response({action: "stop", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BOT_STOP}});
			}
		});
	}
	
	this.deleteTask = function($scope, task){
		$manager.instance.getConnector().deleteTask(task.getId(), task.getType(), function(result){
			if(result.status == Constant.OK_STATUS){
				$saver.clear("tasks");
				$manager.instance.getUser().setCash(result.cash);
				$scope.response({action: "delete", status:Constant.OK_STATUS, data: {task:task, cash: result.cash}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "delete", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "delete", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_DELETE}});
			}
		});
	}

	this.refreshTask = function($scope, task){
		$manager.instance.getConnector().refreshTask(task.getId(), task.getType(), function(result){
			if(result.status == Constant.OK_STATUS){
				$saver.clear("tasks");
				$scope.response({action: "refresh", status:Constant.OK_STATUS, data: {task:task}});
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "refresh", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}else{
				$scope.response({action: "refresh", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_DELETE}});
			}
		});
	}
	
	this.moreFields = function(user, $scope){						//Main scope
		$manager.instance.getBrowser().moreFields(user, function(dataBrowser){	//update browser
			if(dataBrowser != null){
				user.addMorePosts(dataBrowser.moreInfo);
				$scope.response({action: "moreFields", status:Constant.OK_STATUS, data: {moreInfo: dataBrowser.moreInfo}});
			}else{
				$scope.response({action: "moreFields", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_UPDATE}});
			}
		});
	}
}]);

services.service("$auth",["$manager", "$rootScope", "$dialogView", "$demon", "$way", "$saver", "$action", "$adapter",
				 function($manager, $rootScope, $dialogView, $demon, $way, $saver, $action, $adapter){
	var self = this;
	this.load = function($scope){

		$manager.instance.getDataManager().loadAuthData(function(dataManager){				//try to load login data from files
			if(dataManager.status == Constant.OK_STATUS){									//we found something
				
			}else{
				$scope.response({action: "load", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_DATA_LOAD}});
			}
		});
	}
	
	this.auth = function($scope){							//login scope
		tryAuth($scope, $manager);
	}
	
	var tryAuth = function($scope, $manager){
		$manager.instance.getBrowser().auth(function(result){			//try auth with login data
			if(result == Constant.OK_STATUS){								//auth good
				self.getInfo($scope);
			}else if(result == Constant.ERR_CODE_BROWSER_REINIT){
				$dialogView.showRegularLoading();
				$manager.instance.getBrowser().init(function(response){
					tryAuth($scope, $manager);
				});
			}else if(result == Constant.ERR_CODE_BROWSER_CLOSED){
				$manager.instance.getBrowser().init(function(response){
					if(response == Constant.OK_STATUS_IN){
						self.getInfo($scope);
					}else{
						$dialogView.hideLoading();
					}
				});
			}else if(response == Constant.ERR_STATUS){
				$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}

	this.authOk = function($scope, dataConnector){
		Log.o("DATA_CONNECTOR_AUTH", dataConnector);
		if(dataConnector.status == Constant.OK_STATUS){
			var user = $manager.instance.getUser();
			user.setCash(dataConnector.cash);	//set new data
			user.setConfig(dataConnector.config);
			user.setXpInfo(dataConnector.xp_info);
			$way.refresh();
			user.setPremium(dataConnector.premium);
			user.setTurbo(dataConnector.turbo);
			user.setRtime(dataConnector.rtime);
			user.setRealRtime(dataConnector.realRtime);
			user.setAchieves(dataConnector.achieves);
			user.setId(dataConnector.id);
			user.setBalance(dataConnector.balance);
			user.setFastReady(dataConnector.delay);
			user.setReferralDiamonds(dataConnector.referral_diamonds);

			$manager.instance.getBot().setCanEarn(user.isFastReady());

			user.setNeedData(dataConnector.need_data);
			user.checkBotNet();

			analytics.clientID = dataConnector.id;
			
			//Log.d("AUTH_COMPLITE", "herew 0");
			var isWaiting = true;
			$manager.instance.getDataManager().saveAuthData($manager.instance.getUser().getAuthData(), function(saveManager){			//save to storage
				//if(saveManager.status == Constant.OK_STATUS){
					if(isWaiting){
						isWaiting = false;
						//Log.o("AUTH_COMPLITE_m", saveManager);
						var val = $manager.instance.getUser().getSetting(Config.AUTOEARN_SETTING) == 1 ? true : false;
						//run bot if setting is ON and user come not first time
						//Log.d("AUTH_COMPLITE", "herew2 1");
						if(val){
							$manager.instance.getBot().run(function(result){
								// show run earnings in nav bar
								if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
									var appElement = document.querySelector('[ng-controller=navCtrl]');
									var navScope = angular.element(appElement).scope();
									navScope.navEarnStatus = navScope.navEarnStatusOn;
									$(".nav-earn-block").addClass("nav-earn-running");
								}
								Log.d("AUTH_COMPLITE", "herew 2");
							});
						}

						$manager.instance.getDataManager().loadData(function(dataManager){				//try to load login data from files
							if(dataManager.status == Constant.OK_STATUS){								//we found something
								$manager.instance.getUser().setPayEmail(dataManager.email);
							}
						});

						//$demon.startPayDemon();
						//Log.d("AUTH_COMPLITE", "herew 3");
						$scope.response({action: "auth", status: Constant.OK_STATUS, data: {news_count: dataConnector.news_count}});
					}
					
				//}else{
				//	$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_DATA_SAVE}});
				//}
			});
		}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
			$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
		}else{
			$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_AUTH}});
		}
	}

	this.authCaptcha = function($scope, dataConnector){
		if(dataConnector.status == Constant.OK_STATUS){
			$scope.response({action: "captcha", status:Constant.OK_STATUS, data: {hash: dataConnector.hash, captcha: dataConnector.captcha}});
		}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
			$scope.response({action: "captcha", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
		}else{
			$scope.response({action: "captcha", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_AUTH}});
		}
	}

	this.checkCaptcha = function($scope, hash, captcha){
		$manager.instance.getConnector().checkCaptcha(hash, captcha, function(result){
			if(result.status == Constant.OK_STATUS){
				if(result.action == "captchaGenerate"){
					$scope.response({action: "checkCaptcha", status: Constant.OK_STATUS, data: {hash: result.hash, captcha: result.captcha}});
				}else{
					self.verifyMe($scope, result, self.authOk);
				}
			}else if(result.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
				$scope.response({action: "checkCaptcha", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}
	
	this.preload = function($scope){
		var sel = this;
		$manager.instance.getBrowser().init(function(response){
			$dialogView.hideInitLoading();
			$dialogView.showLoading();
			if(response == Constant.OK_STATUS_IN){
				self.getInfo($scope);
			}else if(response == Constant.OK_STATUS){
				$dialogView.hideLoading();
			}else if(response == Constant.ERR_STATUS){
				$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
			}
		});
	}

	this.verifyMe = function($scope, dataConnector, callback){
		$demon.v();
		Log.d("VERIFY", "ME_ME2");
		$manager.instance.getConnector().tryVerify(function(response){
			if(response.status == Constant.OK_STATUS){
				var user = new User();
				user.setNick(response.target);
				$action.getUserInfo({response: function(dataBrowser){
					Log.o("VERIFY_DATA", dataBrowser);
					if(dataBrowser.status == Constant.OK_STATUS){
						user.setUserInfo(dataBrowser.data);
						$manager.instance.getConnector().verify(response.hash, user.getInstId(), function(response){
							$demon.vd();
							callback($scope, dataConnector);
						});
					}else{
						$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_INFO}});
					}
				}}, user);
			}
		});
	}
	
	this.getInfo = function($scope){
		$manager.instance.getBrowser().getUserInfo($manager.instance.getUser(), function(dataBrowser){	//get UserInfo
			Log.o("GET_INFO_BE", dataBrowser);
			if(dataBrowser != null && dataBrowser != Constant.ERR_STATUS && dataBrowser != 10){	
				$manager.instance.getUser().setUserInfo(dataBrowser.userInfo);	//set user info
				var wait = true;
				$manager.instance.getDataManager().loadAuthData(function(dataManager){				//try to load login data from files
					if(!wait){
						return;
					}
					wait = false;
					var authData = new AuthData(dataBrowser.userInfo.nick, "", 0);
					
					if(dataManager.status == Constant.OK_STATUS){									//we found something
						//if logins not equal
						if(authData.getLogin() != dataManager.authData.getLogin()){
							authData.setOldLogin(dataManager.authData.getLogin());
							authData.setNeedUpdate(1);
						}
					}
					
					$manager.instance.getUser().setAuthData(authData);
					
					$manager.instance.getConnector().auth(function(dataConnector){	//connect to server and get valid token
						if(dataConnector.action == "captchaGenerate"){
							self.authCaptcha($scope, dataConnector);
						}else{
							self.authOk($scope, dataConnector);
							//disable verify
							//self.verifyMe($scope, dataConnector, self.authOk);
						}
					});
				});
			}else{
				$scope.response({action: "auth", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_INFO}});
			}
		});
	}
	
	this.update = function($scope){						//Main scope
		$adapter.update($scope);
	}
	
	this.logout = function($scope){
		if($manager.instance.getBot().isRunnable()){
			$manager.instance.getBot().stop(function(response){
				// show run earnings in nav bar
				if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
					var appElement = document.querySelector('[ng-controller=navCtrl]');
					var navScope = angular.element(appElement).scope();
					navScope.navEarnStatus = navScope.navEarnStatusOff;
					$(".nav-earn-block").removeClass("nav-earn-running");
				}

				$manager.instance.getBot().setMode(Bot.SLOW_EARN_MODE, function(){

				});
			});
		}
		$manager.instance.getBrowser().logout(function(resultBrowser){				//logout from browser
			if(resultBrowser == Constant.OK_STATUS){
				$manager.instance.getConnector().logout(function(resultConnector){	//logout from connector
					if(resultConnector.status == Constant.OK_STATUS){
						var isWait = true;
						$manager.instance.getDataManager().clearAuthData(function(resultManager){		//clear data
							if(isWait){
								isWait = false;
								if(resultManager.status == Constant.OK_STATUS){
									$manager.instance.getUser().reset();		//reset user
									$way.refresh();
									
									$scope.response({action: "logout", status:Constant.OK_STATUS, data: {}});
								}else{
									$scope.response({action: "logout", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_DATA_CLEAR}});
								}
							}
						});
					}else if(resultConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
						$scope.response({action: "logout", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
					}else{
						$scope.response({action: "logout", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_LOGOUT}});
					}
				});
			}else{
				$scope.response({action: "logout", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_LOGOUT}});
			}
		});
	}
}]);

services.service("$adapter", ["$manager", "$saver", function($manager, $saver){

	 		this.update = function($scope){						//Main scope
				var saverStat = $saver.load("update");
				if(saverStat.status == Constant.OK_STATUS){
					$scope.response({action: "update", status:Constant.OK_STATUS, data: saverStat.data});
				}else{
					$manager.instance.getBrowser().update(function(dataBrowser){	//update browser
						if(dataBrowser != null){
							$manager.instance.getUser().setUserInfo(dataBrowser.userInfo);
							$manager.instance.getConnector().update(function(dataConnector){	//update connector
								if(dataConnector.status == Constant.OK_STATUS){
									$manager.instance.getUser().setAuthData(dataConnector.authData);
									$manager.instance.getUser().setCash(dataConnector.cash);
									$manager.instance.getUser().setAchieves(dataConnector.achieves);
									$manager.instance.getUser().setXpInfo(dataConnector.xp_info);
									$manager.instance.getUser().setPremium(dataConnector.premium);
									$manager.instance.getUser().setTurbo(dataConnector.turbo);
									$manager.instance.getUser().setBalance(dataConnector.balance);
									$manager.instance.getUser().setReferralDiamonds(dataConnector.referral_diamonds);
									$saver.saveSpec("update", {premium: dataConnector.premium, turbo: dataConnector.turbo}, 5);
									$scope.response({action: "update", status:Constant.OK_STATUS, data: dataConnector});
								}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
									$scope.response({action: "update", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
								}else{
									$scope.response({action: "update", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_UPDATE}});
								}
							});
						}else{
							$scope.response({action: "update", status:Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_BROWSER_UPDATE}});
						}
					});
				}
			}

			this.tasks = function($scope){
				var saverStat = $saver.load("tasks");
				if(saverStat.status == Constant.OK_STATUS){
					$scope.response({action: "tasks", status:Constant.OK_STATUS, data: saverStat.data});
				}else{
					$manager.instance.getConnector().getTasks(function(dataConnector){
						if(dataConnector.status == Constant.OK_STATUS){
							$saver.saveSpec("tasks", {tasks: dataConnector.tasks}, 5);
							$scope.response({action: "tasks", status: Constant.OK_STATUS, data: {tasks: dataConnector.tasks}});
						}else if(dataConnector.status == Constant.ERR_CODE_CONNECTOR_CONNECTION){
							$scope.response({action: "tasks", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
						}else{
							$scope.response({action: "tasks", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_TASKS}});
						}
					});
				}
			}
	 }]
);