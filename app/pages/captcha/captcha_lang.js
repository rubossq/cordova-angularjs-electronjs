Lang.getCaptcha = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				topText: "Enter numbers from the picture",
				phText: "Enter numbers here",
				butText: "Confirm",
				errText: "Error! Try again later.",
				emptyText: "Error! Enter code.",
				lessSymbolsText: "You cannot enter at least 3 characters"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				topText: "Введите код с картинки",
				phText: "Введите код сюда",
				butText: "Подтвердить",
				errText: "Неправильный ввод. Попробуйте позже.",
				emptyText: "Вы не ввели код",
				lessSymbolsText: "Нельзя ввести меньше 3 символов"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				topText: "Geben Sie den Sicherheitscode ein",
				phText: "Geben Sie den Code hier ein",
				butText: "Bestätigen",
				errText: "Falsche Eingaben. Versuchen Sie es später.",
				emptyText: "Sie haben  den Code nicht eingegeben",
				lessSymbolsText: "Nicht weniger als 3 Zeichen eingeben"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				topText: "Introduzca el código de la imagen",
				phText: "Introduzca el código aquí",
				butText: "Confirmar",
				errText: "Es incorrecto entrar. Vuelve a intentarlo más tarde.",
				emptyText: "Usted no introduce el código",
				lessSymbolsText: "No se puede escribir menos de 3 caracteres"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				topText: "Entrez le code de l'image",
				phText: "Entrez le code ici",
				butText: "Confirmer",
				errText: "Entrée non valide. Réessayez plus tard.",
				emptyText: "Vous n'avez pas entré le code",
				lessSymbolsText: "Vous ne pouvez pas entrer au moins 3 caractères"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				topText: "Inserisca il codice sul disegno",
				phText: "Inserisca qui il codice",
				butText: "Conferma",
				errText: "Inserimento sbagliato. Tenta di nuovo",
				emptyText: "Non è inserito il codice",
				lessSymbolsText: "Non si può inserire meno di 3 simboli"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				topText: "Resimdeki kodu giriniz",
				phText: "Kodu buraya yazınız",
				butText: "Onay",
				errText: "Yanlış. Bırazdan tekrar deneyiniz",
				emptyText: "Kodu girmediniz",
				lessSymbolsText: "En az 3 kararkter girilsin"
			};
			break;
	}
	return lang;
}

// CAPTCHA LANG
services_lang.service("$captchaLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.CAPTCHA_VIEW, function(lang){
			$scope.topText = lang.topText;
			$scope.phText = lang.phText;
			$scope.butText = lang.butText;
			$scope.errText = lang.errText;
			$scope.emptyText = lang.emptyText;
			$scope.lessSymbolsText = lang.lessSymbolsText;

			$scope.$applyAsync();
		});	
	}
}]);