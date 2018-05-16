Lang.getMineAd = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				installButText: "Install"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				installButText: "Установить"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				installButText: "Installieren"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				installButText: "Instalar"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				installButText: "Installer"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				installButText: "Mettere"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				installButText: "Kurmak"
			};
			break;
	}
	return lang;
}

// MINE ADV LANGS
services_lang.service("$mineAdLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.MINEAD_VIEW, function(lang){
			$scope.installButText = lang.installButText;

			$scope.$applyAsync();
		});	
	}
}]);