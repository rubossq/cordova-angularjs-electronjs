Lang.getReferralInfo = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "How it works?",
				text1: "Share link to download with your friend and tell him your referal number",
				text2: "Your friend need to set your referal number into the special field",
				text3p1: "Both of you will have",
				text3p2: "Diamonds",
				text4p1: "All the time after you will receive",
				text4p2: "of your friends Diamonds",
				text5: "We will count as buying Diamonds from <a class='referral-info-link' href='#/donate/diamonds'>shop</a> as <a class='referral-info-link' href='#/earn'>earning by him</a>",
				textBot1: "REMEMBER! Your referal must have gain more then",
				textBot2: "Diamonds per 24 hours!"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Как это работает?",
				text1: "Дайте Вашему другу ссылку на приложение и Ваш реферальный код",
				text2: "Ваш друг вводит Ваш реферальный код в приложении",
				text3p1: "Вы оба получаете по",
				text3p2: "диамантов",
				text4p1: "В дальнейшем Ваш реферал будет приносить Вам",
				text4p2: "от количества его диамантов",
				text5: "Мы учитываем как купленные в <a class='referral-info-link' href='#/donate/diamonds'>магазине</a>  диаманты, так и диаманты с <a class='referral-info-link' href='#/earn'>заработка</a>",
				textBot1: "ВАЖНО! Ваш реферал должен зарабатывать не меньше",
				textBot2: "диамантов в сутки!"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Wie funktioniert das?",
				text1: "Geben Sie Ihrem Freund den Link zu der App und Ihren Empfehlungs-Code",
				text2: "Ihr Freund führt Ihren Referral-Code in die App ein",
				text3p1: "Sie beide erhalten",
				text3p2: "Diamanten",
				text4p1: "Ferner wird Ihr Referral Ihnen bringen",
				text4p2: "von der Anzahl der Diamanten",
				text5: "Wir berücksichtigen sowohl  Diamanten, die <a class='referral-info-link' href='#/donate/diamonds'> im Laden gekauft wurden, als auch </a>Diamanten vom<a class='referral-info-link' href='#/earn'>gewinn</a>",
				textBot1: "WICHTIG! Ihr Referral soll nicht weniger",
				textBot2: "Diamanten pro Tag verdienen, damit Sie Ihre 10% erhalten"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Cómo funciona esto?",
				text1: "Dale a Tu amigo un enlace a la aplicación y Su código para referir",
				text2: "Su amigo introduce Tu código para referir en el anexo",
				text3p1: "Ambos obtiene por",
				text3p2: "los diamantes",
				text4p1: "En el futuro, Su referido será",
				text4p2: "del número de diamantes",
				text5: "Consideramos como los que se compran en <a class='referral-info-link' href='#/donate/diamonds'>tienda</a> los diamantes y los diamantes con <a class='referral-info-link' href='#/earn'>salario</a>",
				textBot1: "IMPORTANTE! Su referido debe ganar no menos de",
				textBot2: "Los diamantes en la noche, para que Usted reciba su 10%"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Comment ça marche?",
				text1: "Donnez à votre ami un lien vers l'application et votre code de référence",
				text2: "Votre ami entre votre code de référence dans l'application",
				text3p1: "Tous les deux vous obtenez",
				text3p2: "diamants",
				text4p1: "À l'avenir, votre référence vous apportera",
				text4p2: "du nombre de ses diamants",
				text5: "Nous considérons tant diamants achetés dans <a class='referral-info-link' href='#/donate/diamonds'>le magasin</a> que le diamants <a class='referral-info-link' href='#/earn'>gagnés</a>",
				textBot1: "IMPORTANT! Votre référence doit gagner pas moins",
				textBot2: "diamants chaque journée que vous obtenez votre 10%"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "Come lavora questo?",
				text1: "Manda a un suo amico il link verso l’applicazione e il suo codice di referral",
				text2: "Il suo amico inserisce il codice di referral ricevuto da Lei nell’applicazione",
				text3p1: "Ciascuno di voi riceve",
				text3p2: "diamanti",
				text4p1: "Poi il suo referral gli porterà",
				text4p2: "di quantità dei suoi diamanti",
				text5: "Vengono considerati tanto i diamanti acquistati <a class='referral-info-link' href='#/donate/diamonds'>nel negozio</a> quanto i diamanti <a class='referral-info-link' href='#/earn'>guadagnati</a>",
				textBot1: "IMPORTANTE! Il suo referral deve guadagnare non meno che",
				textBot2: "Diamanti ogni giorno perchè lei riceva i suoi 10%"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Bu nasıl çalışır?",
				text1: "Arkadaşınıza uygulamaya link gönderiniz ve davet kodunuzu veriniz",
				text2: "Arkadaşınız davet konudu uygulamada girer",
				text3p1: "İkinizde diamant",
				text3p2: "Miktarını kazanıyorsunuz",
				text4p1: "İleride davetiyeniz Size kazandırır",
				text4p2: "onun diamantının miktarından",
				text5: "Markette satın  <a class='referral-info-link' href='#/donate/diamonds'>alınmış </a> diamantları ve İnstagram için beğenme ve takçiler <a class='referral-info-link' href='#/earn'>sayıyoruz</a>",
				textBot1: "ÖNEMLİ!",
				textBot2: "%10'u kazanmak için günde en az diamant kazanmak gerekir"
			};
			break;
	}
	return lang;
}

// REFERRAL INFO LANG
services_lang.service("$referralInfoLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.REFERRAL_INFO_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.text1 = lang.text1;
			$scope.text2 = lang.text2;
			$scope.text3p1 = lang.text3p1;
			$scope.text3p2 = lang.text3p2;
			$scope.text4p1 = lang.text4p1;
			$scope.text4p2 = lang.text4p2;
			$scope.text5 = lang.text5;
			$scope.textBot1 = lang.textBot1;
			$scope.textBot2 = lang.textBot2;

			$scope.$applyAsync();
		});	
	}
}]);