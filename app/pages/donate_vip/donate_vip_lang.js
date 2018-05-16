Lang.getDonateVip = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "VIP Shop",
				donateTop: "Your own discount for PREMIUM Packs",
				priceText: "Special price:",
				buyButText: "BUY",
				turboTop: "VIP Turbo",
				turboHead: "Turbo gainer for VIP",
				turboFirst: "Gaining speed",
				turboSecond: "30-day",
				turboThird: "Your tasks will have VIP priority",

				noPayText: "We apologize, but the shop is not available at this moment"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "VIP магазин",
				donateTop: "Для Вас скидки на Премиум-наборы",
				priceText: "Специальная цена:",
				buyButText: "Купить",
				turboTop: "VIP турбо-режим",
				turboHead: "Турбо заработок для VIP",
				turboFirst: "Скорость заработка",
				turboSecond: "30 дней работы",
				turboThird: "Ваши задания получают приоритет VIP",

				noPayText: "Приносим свои извинения, магазин в данный момент не доступен"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "VIP-Geschaft",
				donateTop: "Rabatt fur Premium-Kits fur Ihnen",
				priceText: "Sonderpreis:",
				buyButText: "Kaufen",
				turboTop: "VIP-Turbo",
				turboHead: "VIP Turbo-Verdienst",
				turboFirst: "Schnelligkeit des Verdiensts",
				turboSecond: "30 Arbeitstage",
				turboThird: "Ihre Aufgaben bekommen einen VIP-Prioritat",

				noPayText: "Wir entschuldigen uns, aber der Laden ist momentan nicht verfügbar"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Tienda VIP",
				donateTop: "El descuento por el paquete Premium especialmente para Ud",
				priceText: "Un precio especial:",
				buyButText: "Comprar",
				turboTop: "Modo turbo VIP",
				turboHead: "Ganancias Turbo para los clientes VIP",
				turboFirst: "Ritmo de ganancia",
				turboSecond: "30 días de trabajo",
				turboThird: "Sus pedidas obtienen la prioridad VIP",

				noPayText: "Pedimos disculpas, pero la tienda no está disponible en este momento"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "VIP boutique",
				donateTop: "Les reducs sur les sets Premium pour Vous",
				priceText: "Le prix special:",
				buyButText: "Acheter",
				turboTop: "Le mode turbo VIP",
				turboHead: "Le revenu turbo pour VIP",
				turboFirst: "La vitesse du revenu",
				turboSecond: "30 jours du travail",
				turboThird: "Votre mission recevra la priorite VIP",

				noPayText: "Nous nous excusons, mais la boutique n'est pas disponible pour le moment"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "Negozio Vip",
				donateTop: "Per voi sconti sui completi-premium",
				priceText: "Prezzo speciale:",
				buyButText: "Comprare",
				turboTop: "Modalita-turbo VIP",
				turboHead: "Guadagni turbo per i VIP",
				turboFirst: "Velocita del guadagno",
				turboSecond: "30 giorni di lavoro",
				turboThird: "I vostri compiti ricevono priorita VIP",

				noPayText: "Ci scusiamo, ma il negozio non è disponibile al momento"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "VİP market",
				donateTop: "Premium setler için indirimleriniz",
				priceText: "Özel fiyat:",
				buyButText: "Satın al",
				turboTop: "VİP turbo rejim",
				turboHead: "VİP için turbo kazanç",
				turboFirst: "Kazanç hızı",
				turboSecond: "30 günlük iş",
				turboThird: "Ödevleriniz VİP avantajını kazanıyor",

				noPayText: "We apologize, but the shop is not available at this moment"
			};
			break;
	}

	lang.turboFirstNum = "5000%";

	return lang;
}

// DONATE VIP LANGS
services_lang.service("$donateVipLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.DONATEVIP_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.donateTop = lang.donateTop;
			$scope.priceText = lang.priceText;
			$scope.buyButText = lang.buyButText;
			$scope.turboTop = lang.turboTop;
			$scope.turboHead = lang.turboHead;
			$scope.turboFirst = lang.turboFirst;
			$scope.turboFirstNum = lang.turboFirstNum;
			$scope.turboSecond = lang.turboSecond;
			$scope.turboThird = lang.turboThird;

			$scope.noPayText = lang.noPayText;

			$scope.$applyAsync();
		});
	}
}]);