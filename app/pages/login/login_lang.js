Lang.getLogin = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				authText: "Authorization",
				signupTextFirst: "When you click on",
				signupTextSecond: "authorization",
				signupTextThird: "you are accepting",
				privacyLinkText: "the user agreement",
				troubleText: "Troubles with authorization?"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				authText: "Авторизация",
				signupTextFirst: "Нажимая на кнопку",
				signupTextSecond: "авторизация,",
				signupTextThird: "Вы соглашаетесь с",
				privacyLinkText: "пользовательским соглашением",
				troubleText: "Произошла проблема с авторизацией?"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				authText: "Authorisierung",
				signupTextFirst: "Drueckend die Taste",
				signupTextSecond: "authorisierung",
				signupTextThird: "Sie bestimmen die Nutzungsvereinbarung",
				privacyLinkText: "nutzungsvereinbarung",
				troubleText: "Hat das Problemm mit der Authorisierung passiert?"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				authText: "La autorizacion",
				signupTextFirst: "Haciendo clic en el boton",
				signupTextSecond: "la autorizacion",
				signupTextThird: "Se acuerda con",
				privacyLinkText: "el consenso del usario",
				troubleText: "Tiene el problema con la autorizacion?"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				authText: "Autorisation",
				signupTextFirst: "En cliquant sur le bouton",
				signupTextSecond: "autorisation",
				signupTextThird: "vous acceptez",
				privacyLinkText: "l'Accord de l'utilisateur.",
				troubleText: "Un probleme d'autorisation?"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				authText: "Autorizzazione",
				signupTextFirst: "Cliccando sul pulsante",
				signupTextSecond: "autorizzazione",
				signupTextThird: "siete d'accordo con",
				privacyLinkText: "le condizioni d'uso",
				troubleText: "è successo un problema con l'autorizzazione?"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				authText: "Yetki",
				signupTextFirst: "Düğmesine tıklayın",
				signupTextSecond: "yetki",
				signupTextThird: "Siz katılıyorum",
				privacyLinkText: "kullanıcı sözleşmesi",
				troubleText: "Yetki ile ilgili bir sorun vardı?"
			};
			break;
	}
	return lang;
}

// LOGIN LANGS
services_lang.service("$loginLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.LOGIN_VIEW, function(lang){
			$scope.authText = lang.authText;
			$scope.signupTextFirst = lang.signupTextFirst;
			$scope.signupTextSecond = lang.signupTextSecond;
			$scope.signupTextThird = lang.signupTextThird;
			$scope.privacyLinkText = lang.privacyLinkText;
			$scope.troubleText = lang.troubleText;

			$scope.$applyAsync();
		});
	}
}]);