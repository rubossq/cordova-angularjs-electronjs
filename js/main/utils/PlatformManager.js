var PlatformManager = Base.extend({

},{
	getSqlitePlugin: function(){
		var plugin = null;
		PlatformManager.moduleBeforePrepare();
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				plugin = window.sqlitePlugin;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				plugin = require('sqliteDb');
				break;
		}
		PlatformManager.moduleAfterPrepare();

		return plugin;
	},

	getFSPlugin: function(){
		var plugin = null;
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				plugin = window;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				plugin = require('dataManager');
				break;
		}

		return plugin;
	},

	getLocalePlugin: function(){
		var plugin = null;
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				plugin = navigator.globalization;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				var remote = require("electron").remote;
				plugin = remote.require("./main.js");
				break;
		}

		return plugin;
	},

	moduleBeforePrepare: function(){
		switch(Constant.CUR_DEVICE){
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				if (typeof module === 'object') {window.module = module; module = undefined;}
				break;
		}
	},

	moduleAfterPrepare: function(){
		switch(Constant.CUR_DEVICE){
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				if (window.module) module = window.module;
				break;
		}
	},

	checkDeviceReady: function(dr){
		switch(Constant.CUR_DEVICE){
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				setTimeout(function(){
					dr();
				}, 500);
				break;
		}
	},

	getLocalSystem: function(){
		var system = null;
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				system = LocalFileSystem.PERSISTENT;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				system = "persistent";
				break;
		}

		return system;
	},

	getInAppBrowser: function(){
		var browser = null;
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				browser = window;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				browser = require('inAppBrowser');
				break;
		}

		return browser;
	},

	getDeviceName: function(){
		var name = null;
		switch(Constant.CUR_DEVICE){
			case Constant.ANDROID_DEVICE:
			case Constant.IOS_DEVICE:
				name = cordova.plugins.deviceName.name;
				break;
			case Constant.MAC_DEVICE:
			case Constant.WINDOWS_DEVICE:
				var os = require('os');
				var info = os.userInfo();
				name = info.username;
				break;
		}

		return name;
	}
});