Lang.getNews = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				noNewsText: "At the moment there is no news",
				shareAppHead: Constant.APP_FULL_NAME + "! Likes and Followers for Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " for Android! Likes and Followers for Instagram! Download here:",
				shareAppChooseTitle: "Choose an app to share:",
				copiedText: "Copied to Clipboard!"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				noNewsText: "На данный момент нет никаких новостей",
				shareAppHead: Constant.APP_FULL_NAME + "! Лайки и Подписчики для Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " для Android! Лайки и Подписчики для Instagram! Скачать:",
				shareAppChooseTitle: "Выберите приложение чтобы поделиться:",
				copiedText: "Ссылка скопирована!"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				noNewsText: "Im Moment gibt es keine Nachrichten",
				shareAppHead: Constant.APP_FULL_NAME + "! Likes und Follower für Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " für Android! Likes und Follower für Instagram! Downloaden:",
				shareAppChooseTitle: "Wählen Sie die App, um sie zu teilen:",
				copiedText: "Der Link ist kopiert!"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				noNewsText: "En este momento no hay noticias",
				shareAppHead: Constant.APP_FULL_NAME + "! Laika y los Suscriptores de Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " para Android! Laika y Suscriptores para Instagram! Descargar:",
				shareAppChooseTitle: "Seleccione la aplicación para compartir:",
				copiedText: "Enlace copiado!"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				noNewsText: "Maintenant il n'y a pas de nouvelles",
				shareAppHead: Constant.APP_FULL_NAME + "! J’aime et Follower pour Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " Pour Android! J’aime et Follower pour Instagram! Télécharger:",
				shareAppChooseTitle: "Sélectionnez une application à partager:",
				copiedText: "Lien copié!"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				noNewsText: "Non ci sono novità per ora",
				shareAppHead: Constant.APP_FULL_NAME + "! Mi Piace e Follower per Instagram",
				shareAppText: Constant.APP_FULL_NAME + " Per Android! Mi Piace e Follower per Instagram! Scaricare:",
				shareAppChooseTitle: "Scelga l’applicazione per condividere:",
				copiedText: "Il link è copiato!"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				noNewsText: "Şu anda herhangi bir haber yok",
				shareAppHead: Constant.APP_FULL_NAME + "! İnstagram için beğenme ve takçiler.",
				shareAppText: Constant.APP_FULL_NAME + " Android için! İnstagram için beğenme ve takçiler! İndir:",
				shareAppChooseTitle: "Paylaşım için uygulama seçiniz:",
				copiedText: "Link kopyalandı!"
			};
			break;
	}
	return lang;
}

// NEWS LANGS
services_lang.service("$newsLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.NEWS_VIEW, function(lang){
			$scope.noNewsText = lang.noNewsText;
			$scope.shareAppHead = lang.shareAppHead;
			$scope.shareAppText = lang.shareAppText;
			$scope.shareAppChooseTitle = lang.shareAppChooseTitle;
			$scope.copiedText = lang.copiedText;

			$scope.$applyAsync();
		});
	}
}]);