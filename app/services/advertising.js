services.service("$adLoader", ["$manager", "$window", "$way", function($manager, $window, $way){

	var curAd;
	var self = this;
	var ads = new Array();
	var adView;
	
	this.prepare = function(av, a){
		adView = av;
		ads = a;
		this.prepareNext();
	}
	
	this.prepareNext = function(){
		if(ads.length > 0){
			curAd = ads.shift();
			setImages(function(){
				adView.loaded();
			});
		}else{
			adView.setMode(Constant.AD_MOB_MODE);
			adView.prepareAdMob();
		}
	}
	
	this.show = function(){
		$(".minead-bottom-head:first").text(curAd.getAppName());
		$(".minead-bottom-rate-text:first").text("(" + Math.round(2 + Math.random() * (9 - 2)) + "," + Math.round(100 + Math.random() * (999 - 100)) + ")");
		$(".minead-bottom-text1:first").text(curAd.getDesc1());
		$(".minead-bottom-text2:first").text(curAd.getDesc2());
		
		$(".minead-block:first").removeClass("none");
		// disallow use back but
		$way.stopBack();
	}

	this.dismiss = function(windowObj, num){
		if(num == 0){
			$(".minead-block:first").addClass("none");
			// allow use back but
			$way.playBack();
		}else{
			switch(Constant.CUR_DEVICE){
				case Constant.ANDROID_DEVICE:
					navigator.app.loadUrl('', {openExternal : true});
					break;
				case Constant.IOS_DEVICE:
					$window.location = '';
					break;
				case Constant.WINDOWS_DEVICE:
					require('electron').shell.openExternal('');
					break;
				case Constant.MAC_DEVICE:
					require('electron').shell.openExternal('');
					break;
			}
		}
		curAd.setStatus(num);
		$manager.instance.getConnector().viewAd(curAd, function(){
			$(".minead-block:first").addClass("none");
			// allow use back but
			$way.playBack();
			adView.dismiss();
		});
	}

	function setImages(callback){
		$('.minead-top-background:first').attr('src', Constant.SERVER_HOST + "images/apps/" + curAd.getName() + "_header.png").load(function(){
			$('.minead-top-logo:first').attr('src', Constant.SERVER_HOST + "images/apps/" + curAd.getName() + "_icon.png").load(function(){
				callback();
			});
		});
	}
}]);

services.service("$adView", ["$manager", "$adLoader", function($manager, $adLoader){
	var isInit = false;
	var self = this;
	var isLoaded = false;
	var canShowAd = false;
	var isFirst = true;
	var mode = Constant.AD_MOB_MODE;
	
	this.showAd = function(){
		if(isLoaded && canShowAd && !$manager.instance.getUser().getPremium()){
			if(mode == Constant.AD_MOB_MODE){
				AdMob.showInterstitial();
			}else if(mode == Constant.AD_MINE_MODE){
				$adLoader.show();
			}
		}
	}
	
	document.addEventListener("onAdLoaded", function (e) {
		self.loaded();
	});
	
	document.addEventListener("onAdDismiss", function (e){
		self.dismiss();
	});
	
	this.loaded = function(){
		isLoaded = true;
		var timeout = isFirst ? Constant.AD_INTERVAL_START : Constant.AD_INTERVAL;
		isFirst = false;
		setTimeout(function(){
			canShowAd = true;
		}, timeout);
	}
	
	this.dismiss = function(){
		isLoaded = false;
		canShowAd = false;
		if(mode == Constant.AD_MOB_MODE){
			var adId = Constant.AD_ID_ANDROID;
			if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
				adId = Constant.AD_ID_IOS;
			}
			AdMob.prepareInterstitial({adId:adId, autoShow:false});
		}else if(mode == Constant.AD_MINE_MODE){
			$adLoader.prepareNext();
		}
	}
	
	this.init = function(){
		if(!isInit){
			isInit = true;
			$manager.instance.getConnector().ads(function(result){
				if(result.status == Constant.OK_STATUS && $manager.instance.getUser().isSafeUser()){
					if(result.ads.length > 0 && $manager.instance.getUser().isSafeUser()){
						mode = Constant.AD_MINE_MODE;
					}
				}
				if(mode == Constant.AD_MOB_MODE){
					self.prepareAdMob();
				}else if(mode == Constant.AD_MINE_MODE){
					self.prepareAdMine(result);
				}
			});
		}
	}
	
	this.prepareAdMob = function(){
		if(AdMob && !$manager.instance.getUser().getPremium()){
			setTimeout(function(){
				var adId = Constant.AD_ID_ANDROID;
				if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
					adId = Constant.AD_ID_IOS;
				}
				AdMob.prepareInterstitial( {adId:adId, autoShow:false} );
			}, Constant.AD_TIMEOUT_BEGIN);
		}
	}
	
	this.prepareAdMine = function(result){
		if(!$manager.instance.getUser().getPremium()){
			setTimeout(function(){
					$adLoader.prepare(self, result.ads);
			}, Constant.AD_TIMEOUT_BEGIN);
		}
	}
	
	this.setMode = function(m){
		mode = m;
	}
}]);