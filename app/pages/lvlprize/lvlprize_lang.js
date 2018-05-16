Lang.getLvlPrize = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Prizes",

				lvlLevelText: " level",
				turboPrizeText: " for one week"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Награды",

				lvlLevelText: " уровень",
				turboPrizeText: " в течении недели"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Auszeichnung",

				lvlLevelText: " level",
				turboPrizeText: " im Laufe des Monats"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Premios",

				lvlLevelText: " Nivel",
				turboPrizeText: " durante el mes"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Prix",

				lvlLevelText: " niveau",
				turboPrizeText: " dans le courant du mois"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "I premi",

				lvlLevelText: " il livello",
				turboPrizeText: " durante il mese"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Şeref payesi",

				lvlLevelText: " seviye",
				turboPrizeText: " Bir ay içinde"
			};
			break;
	}
	return lang;
}

// LVL PRIZE LANGS
services_lang.service("$lvlPrizeLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.LVLPRIZE_VIEW, function(lang){
			$scope.backText = lang.backText;

			$scope.lvlLevelText = lang.lvlLevelText;
			$scope.turboPrizeText = lang.turboPrizeText;

			$scope.$applyAsync();
		});	
	}
}]);