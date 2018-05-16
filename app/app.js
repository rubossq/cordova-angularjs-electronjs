var app = angular.module("famous", ["ngRoute", "longPress", "enterPress", "famousControllers", "famousServices", "famousServicesViews", "famousServicesLang", "famousFilters"]);

app.config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider){

	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|mailto|javascript|chrome-extension):/);
	
	$routeProvider.when("/main", {
		templateUrl: 'app/pages/main/main.html',
	}).when("/login", {
		templateUrl: 'app/pages/login/login.html',
		controller: 'loginCtrl'
	}).when("/tasks", {
		templateUrl: 'app/pages/tasks/tasks.html',
	}).when("/earn", {
		templateUrl: 'app/pages/earn/earn.html',
		controller: 'earnCtrl'
	}).when("/bid_like", {
		templateUrl: 'app/pages/bid_like/bid_like.html'
	}).when("/bid_subs", {
		templateUrl: 'app/pages/bid_subs/bid_subs.html',
		controller: 'bidSubsCtrl'
	}).when("/donate/:id", {
		templateUrl: 'app/pages/donate/donate.html',
		controller: 'donateCtrl'
	}).when("/donate_vip", {
		templateUrl: 'app/pages/donate_vip/donate_vip.html',
		controller: 'donateVipCtrl'
	}).when("/settings", {
		templateUrl: 'app/pages/settings/settings.html',
		controller: 'settingsCtrl'
	}).when("/news", {
		templateUrl: 'app/pages/news/news.html',
		controller: 'newsCtrl'
	}).when("/authtrouble", {
		templateUrl: 'app/pages/authtrouble/authtrouble.html',
		controller: 'authtroubleCtrl'
	}).when("/top", {
		templateUrl: 'app/pages/top/top.html',
		controller: 'topCtrl'
	}).when("/lvlprize", {
		templateUrl: 'app/pages/lvlprize/lvlprize.html',
		controller: 'lvlPrizeCtrl'
	}).when("/paymentwall/:name/paySrc/:url", {
		templateUrl: 'app/pages/paysystem/paymentwall/paymentwall.html',
		controller: 'paymentwallCtrl'
	}).when("/liqpay/:name/id/:id", {
		templateUrl: 'app/pages/paysystem/liqpay/liqpay.html',
		controller: 'liqpayCtrl'
	}).when("/purchase", {
		templateUrl: 'app/pages/purchase/purchase.html',
		controller: 'purchaseCtrl'
	}).when("/otheracc/:nickname", {
		templateUrl: 'app/pages/otheracc/otheracc.html'
	}).when("/autotask", {
		templateUrl: 'app/pages/autotask/autotask.html',
		controller: 'autotaskCtrl'
	}).when("/referral/:showList", {
		templateUrl: 'app/pages/referral/referral.html',
		controller: 'referralCtrl'
	}).when("/referral_info", {
		templateUrl: 'app/pages/referral_info/referral_info.html',
		controller: 'referralInfoCtrl'
	}).when("/captcha/:hash/captchaSrc/:source", {
		templateUrl: 'app/pages/captcha/captcha.html',
		controller: 'captchaCtrl'
	})
	.otherwise({
		redirectTo: '/login'
	});
}]);

app.config(['$provide', function ($provide){
	$provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
		return function (exception, cause){
			$delegate(exception, cause);
			Manager.instance.getConnector().error(exception.message, exception.stack, function(){});
		};
	}]);
}]);

// detect drag and drop
window.addEventListener("dragover",function(e){
	e = e || event;
	e.preventDefault();
},false);
window.addEventListener("drop",function(e){
	e = e || event;
	e.preventDefault();
},false);

window.onload = function(){}