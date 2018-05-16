Lang.getNav = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				navBid: "Get likes",
				navTasks: "My tasks",
				navDonate: "Shop",
				navEarn: "Diamonds mining",
				navMain: "My profile",
				navNews: "News",

				navEarnStatusOn: "turned on",
				navEarnStatusOff: "turned off"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				navBid: "Получить лайки",
				navTasks: "Мои задания",
				navDonate: "Магазин",
				navEarn: "Добыча диамантов",
				navMain: "Мой профиль",
				navNews: "Новости",

				navEarnStatusOn: "включена",
				navEarnStatusOff: "отключена"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				navBid: "Likes vergroessen",
				navTasks: "Meine Aufgaben",
				navDonate: "Geschaeft",
				navEarn: "Diamantenerwerb",
				navMain: "Mein Profil",
				navNews: "Nachrichten",

				navEarnStatusOn: "eingeschaltet",
				navEarnStatusOff: "ausgeschaltet"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				navBid: "Hacer mas me gusta",
				navTasks: "Mis tareas",
				navDonate: "La tienda",
				navEarn: "La extraccion de los diamantes",
				navMain: "Mi perfil",
				navNews: "Las noticias",

				navEarnStatusOn: "encendido",
				navEarnStatusOff: "apagado"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				navBid: "Obtenir des comme",
				navTasks: "Mes taches",
				navDonate: "Magasin",
				navEarn: "Gain des diamants",
				navMain: "Mon profil",
				navNews: "Nouvelles",

				navEarnStatusOn: "allumé",
				navEarnStatusOff: "éteindre"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				navBid: "Truccare i likes",
				navTasks: "I miei compiti",
				navDonate: "Negozio",
				navEarn: "Produzione dei diamanti",
				navMain: "Il mio profilo",
				navNews: "Notizie",

				navEarnStatusOn: "acceso",
				navEarnStatusOff: "spento"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				navBid: "Like kazan",
				navTasks: "Benim işler",
				navDonate: "Mağaza",
				navEarn: "Elmas kazan",
				navMain: "Benim profilim",
				navNews: "Haberler",

				navEarnStatusOn: "açık",
				navEarnStatusOff: "kapalı"
			};
			break;
	}
	return lang;
}

// NAV LANGS
services_lang.service("$navLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.NAV_VIEW, function(lang){
			$scope.navBid = lang.navBid;
			$scope.navTasks = lang.navTasks;
			$scope.navDonate = lang.navDonate;
			$scope.navEarn = lang.navEarn;
			$scope.navMain = lang.navMain;
			$scope.navNews = lang.navNews;

			$scope.navEarnStatus = lang.navEarnStatusOff;
			$scope.navEarnStatusOn = lang.navEarnStatusOn;
			$scope.navEarnStatusOff = lang.navEarnStatusOff;

			$scope.$applyAsync();
		});	
	}
}]);