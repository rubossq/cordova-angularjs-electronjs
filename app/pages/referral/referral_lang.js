Lang.getReferral = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Refferal system",
				earnRef: "Get refefrals",
				howRefWork: "How it works?",
				refererText: "Your referer",
				enteredRefText: "Enter refferal number:",
				statusMessageOk1: "You are refferal",
				statusMessageOk2: "and each of you will take 200 Diamonds now!",
				statusMessageErr: "You can not be refferal!",
				linkAppText: "Link to the app:",
				curRefText: "Your referral number:",
				throwText: " be given in: ",
				copiedText: "Copied to Clipboard!",
				noReferralsText: "You have no referrals yet. Send link to the app and tell them your refferal number!",

				guideRefEarnText: "Earning of your referrals",
				guideInputText: "Input field for referral number",
				guideLinkText: "Link on app",
				guideUserRefNumText: "Your referral number",
				guideNextText: "NEXT",
				guideReadyText: "READY",
				guideSkipText: "SKIP"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Реферальная система",
				earnRef: "Ваша прибыль за сегодня",
				howRefWork: "Как это работает?",
				refererText: "Ваш реферал",
				enteredRefText: "Введите реферальный номер:",
				statusMessageOk1: "Вы стали рефералом",
				statusMessageOk2: "и каждый из вас получает по 200 диамантов!",
				statusMessageErr: "Вы не можете стать рефералом!",
				linkAppText: "Ссылка на приложение:",
				curRefText: "Ваш реферальный код:",
				throwText: "к выдаче через: ",
				copiedText: "Ссылка скопирована!",
				noReferralsText: "У Вас пока нет рефералов. Отправьте друзьям ссылку на приложение и назовите Ваш реферальный код!",

				guideRefEarnText: "Заработок Ваших рефералов",
				guideInputText: "Поле ввода реферального номера",
				guideLinkText: "Ссылка на приложение",
				guideUserRefNumText: "Ваш реферальный номер",
				guideNextText: "ДАЛЕЕ",
				guideReadyText: "ГОТОВО",
				guideSkipText: "ПРОПУСТИТЬ"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Das Referral-System",
				earnRef: "Ihr Gewinn heute",
				howRefWork: "Wie funktioniert das?",
				refererText: "Ihr Referral",
				enteredRefText: "Führen Sie die Referral-Nummer ein:",
				statusMessageOk1: "Sie sind  Referral geworden",
				statusMessageOk2: "und jeder von Ihnen bekommt 200 Diamanten!",
				statusMessageErr: "Sie können nicht ein Referral werden!",
				linkAppText: "Link zur App:",
				curRefText: "Ihr Referral-Code:",
				throwText: " zur Ausgabe über: ",
				copiedText: "Der Link ist kopiert!",
				noReferralsText: "Sie haben noch keine Referrale. Senden Sie den Freunden einen Link zur App und nennen Sie Ihren Referral-Code!",

				guideRefEarnText: "Der Erwerb Ihrer Referrale",
				guideInputText: "Eingabefeld der Referral-Nummer",
				guideLinkText: "Link zur App:",
				guideUserRefNumText: "Ihre Referral-Nummer",
				guideNextText: "WEITER",
				guideReadyText: "FERTIG",
				guideSkipText: "ÜBERSPRINGEN"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "El sistema de referidos",
				earnRef: "Su beneficio por hoy",
				howRefWork: "Cómo funciona esto?",
				refererText: "Su referido",
				enteredRefText: "Introduzca la identificación de afiliación:",
				statusMessageOk1: "Usted ha sido referido",
				statusMessageOk2: " y cada uno de vosotros recibe de 200 diamantes!",
				statusMessageErr: "Usted no puede ser referido!",
				linkAppText: "Enlace a la aplicación:",
				curRefText: "Su código para referir:",
				throwText: " a la extradición a través de: ",
				copiedText: "Enlace copiado!",
				noReferralsText: "Todavía no tiene referencias. Envíe a sus amigos el enlace de la aplicación y dar un nombre a Su código para referir!",

				guideRefEarnText: "Las ganancias de Tus referidos",
				guideInputText: "El campo de entrada de referencia de la habitación",
				guideLinkText: "Un enlace a una aplicación",
				guideUserRefNumText: "Su número de afiliación",
				guideNextText: "SIGUIENTE",
				guideReadyText: "LISTO",
				guideSkipText: "OMITIR"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Système de référence",
				earnRef: "Votre bénéfice aujourd'hui",
				howRefWork: "Comment ça marche?",
				refererText: "Votre référence",
				enteredRefText: "Entrez le code de référence:",
				statusMessageOk1: "Vous êtes devenu une référence",
				statusMessageOk2: "et tout les deux vous obtenez 200 diamants!",
				statusMessageErr: "Vous ne pouvez pas devenir une référence!",
				linkAppText: "Un lien vers l'application:",
				curRefText: "Votre code de référence:",
				throwText: " Par l'émission en: ",
				copiedText: "Lien copié!",
				noReferralsText: "Vous avez pas des références. Envoyez à vos amis un lien vers l'application et donnez votre code de référence!",

				guideRefEarnText: "Gagné par vos références",
				guideInputText: "Champ pour entrer le code de référence",
				guideLinkText: "Lien vers l’application",
				guideUserRefNumText: "Votre code de référence",
				guideNextText: "SUIVANT",
				guideReadyText: "PRÊT",
				guideSkipText: "SKIP"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "Sistema referral",
				earnRef: "Il suo profitto di oggi",
				howRefWork: "Come lavora questo?",
				refererText: "Il suo referral",
				enteredRefText: "Inserisca il numero di referral",
				statusMessageOk1: "Lei è diventata referral",
				statusMessageOk2: "e ciascuno di voi riceve 200 diamanti!",
				statusMessageErr: "Lei non può diventare referral!",
				linkAppText: "Link verso l’applicazione:",
				curRefText: "Suo codice di referral:",
				throwText: " consegnato in: ",
				copiedText: "Il link è copiato!",
				noReferralsText: "Lei non ha già i referral. Mandi agli amici il link verso l’applicazione e diede loro il suo codice di referral!",

				guideRefEarnText: "Guadagnati dai suoi referral",
				guideInputText: "Campo di inserimento del numero di referral",
				guideLinkText: "Link verso l’applicazione",
				guideUserRefNumText: "Suo numero di referral",
				guideNextText: "PROCEDI",
				guideReadyText: "FINITO",
				guideSkipText: "OMETTI"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Davet sistemi",
				earnRef: "Bugünkü karınız",
				howRefWork: "Bu nasıl çalışır?",
				refererText: "Davetiniz",
				enteredRefText: "Davet nmaranızı giriniz",
				statusMessageOk1: "Davetçi oldunuz",
				statusMessageOk2: "ve her biriniz 200 diamant kazandı!",
				statusMessageErr: "Davetçi olamadınız!",
				linkAppText: "Uygulama linki:",
				curRefText: "Davet konudunuz:",
				throwText: " dan teslim: ",
				copiedText: "Link kopyalandı!",
				noReferralsText: "Davetçileriniz şimdilik yok. Arkadaşlarınıza uygulama linkini gönderiniz ve davet kodunuzu veriniz!",

				guideRefEarnText: "Davetçilerin kazançları",
				guideInputText: "Davet numarası girildikten sonra",
				guideLinkText: "Uygulama linki",
				guideUserRefNumText: "Davet numaranız",
				guideNextText: "İLERİ",
				guideReadyText: "HAZIR",
				guideSkipText: "ATLA"
			};
			break;
	}
	return lang;
}

// REFERRAL LANG
services_lang.service("$referralLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.REFERRAL_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.earnRef = lang.earnRef;
			$scope.howRefWork = lang.howRefWork;
			$scope.refererText = lang.refererText;
			$scope.enteredRefText = lang.enteredRefText;
			$scope.statusMessageOk1 = lang.statusMessageOk1;
			$scope.statusMessageOk2 = lang.statusMessageOk2;
			$scope.statusMessageErr = lang.statusMessageErr;
			$scope.linkAppText = lang.linkAppText;
			$scope.curRefText = lang.curRefText;
			$scope.throwText = lang.throwText;
			$scope.copiedText = lang.copiedText;
			$scope.noReferralsText = lang.noReferralsText;

			$scope.guideRefEarnText = lang.guideRefEarnText;
			$scope.guideInputText = lang.guideInputText;
			$scope.guideLinkText = lang.guideLinkText;
			$scope.guideUserRefNumText = lang.guideUserRefNumText;
			$scope.guideNextText = lang.guideNextText;
			$scope.guideReadyText = lang.guideReadyText;
			$scope.guideSkipText = lang.guideSkipText;

			$scope.$applyAsync();
		});	
	}
}]);