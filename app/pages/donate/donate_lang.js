Lang.getDonate = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				diamondsButText: "Diamonds",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "empty",
				popularText: "POPULAR",
				bestValueText: "BEST VALUE",
				buyButText: "Buy",
				
				premiumFirstText: "no ads in application",
				premiumSecondText: "you can disable subscribe to other users in the mining of diamonds",
				premiumThirdText: "increase the number of orders limits",
				premiumFourthText: "cancel penalty for the cancellation of the task",
				
				turboLightHeadText: "Turbo light",
				turboMediumHeadText: "Turbo medium",
				turboHardHeadText: "Turbo powerful",

				turboGreenFirstText: "300% mining power",
				turboGreenSecondText: "increase speed limits",
				turboGreenThirdText: "for one month",

				turboBlueFirstText: "500% mining power",
				turboBlueSecondText: "your tasks complete 2 times faster than others",
				turboBlueThirdText: "increase speed limits",
				turboBlueFourthText: "for one month",

				turboRedFirstText: "1000% mining power",
				turboRedSecondText: "your tasks complete 3 times faster than others",
				turboRedThirdText: "increase speed limits",
				turboRedFourthText: "for one month",

				turboBoughtText: "Owned",

				noPayText: "We apologize, but the shop is not available at this moment"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				diamondsButText: "Диаманты",
				premiumButText: "Премиум",
				turboButText: "Турбо",
				
				emptyField: "пусто",
				popularText: "ПОПУЛЯРНЫЙ",
				bestValueText: "ЛУЧШАЯ ЦЕНА",
				buyButText: "Купить",
				
				premiumFirstText: "отключение рекламы в приложении",
				premiumSecondText: "можно не подписываться на других пользователей при добыче диамантов",
				premiumThirdText: "увеличение лимитов на заказы",
				premiumFourthText: "отмена штрафа за отмену задания",
				
				turboLightHeadText: "Турбо легкий",
				turboMediumHeadText: "Турбо средний",
				turboHardHeadText: "Турбо мощный",

				turboGreenFirstText: "мощность заработка 300%",
				turboGreenSecondText: "увеличение скоростных лимитов",
				turboGreenThirdText: "на 1 месяц",

				turboBlueFirstText: "мощность заработка 500%",
				turboBlueSecondText: "ваши задания выполняются в 2 раза быстрее других",
				turboBlueThirdText: "увеличение скоростных лимитов",
				turboBlueFourthText: "на 1 месяц",

				turboRedFirstText: "мощность заработка 1000%",
				turboRedSecondText: "ваши задания выполняются в 3 раза быстрее других",
				turboRedThirdText: "увеличение скоростных лимитов",
				turboRedFourthText: "на 1 месяц",

				turboBoughtText: "Приобретено",

				noPayText: "Приносим свои извинения, магазин в данный момент не доступен"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				diamondsButText: "Diamanten",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "leer",
				popularText: "POPULAER",
				bestValueText: "der BESTE PREIS",
				buyButText: "kaufen",
				
				premiumFirstText: "Abschaltung der Werbung in der App",
				premiumSecondText: "Man kann nicht andere Benutzer bei dem Diamanten erwerb abonieren",
				premiumThirdText: "Vergroesserung des Limits fur die Bestellungen",
				premiumFourthText: "Annulierung der Strafe fur Anullierung der Aufgabe",
				
				turboLightHeadText: "Turbo leicht",
				turboMediumHeadText: "Turbo maaessig",
				turboHardHeadText: "Turbo stark",

				turboGreenFirstText: "Macht schnelligkeit 300%",
				turboGreenSecondText: "Vergroesserung der Erwerbs schnelligkeit",
				turboGreenThirdText: "Fur einen Monat",

				turboBlueFirstText: "Macht schnelligkeit 500%",
				turboBlueSecondText: "Ihre Aufgaben werden doppelt schneller wie andere gemacht",
				turboBlueThirdText: "Vergroesserung der Erwerbs schnelligkeit",
				turboBlueFourthText: "Fur einen Monat",

				turboRedFirstText: "Macht schnelligkeit 1000%",
				turboRedSecondText: "Ihre Aufgaben werden dreimal schneller wie andere gemacht",
				turboRedThirdText: "Vergroesserung der Limits schnelligkeit",
				turboRedFourthText: "Fur einen Monat",

				turboBoughtText: "gewonnen",

				noPayText: "Wir entschuldigen uns, aber der Laden ist momentan nicht verfügbar"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				diamondsButText: "Diamantes",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "vacio",
				popularText: "POPULAR",
				bestValueText: "EL PRECIO MEJOR",
				buyButText: "Comprar",
				
				premiumFirstText: "desactivacion de la publicidad en la aplicacion",
				premiumSecondText: "No es necesario suscribirse a los otros usarios durante la extraccion de los diamantes",
				premiumThirdText: "El aumento de limites por los encargos",
				premiumFourthText: "La cancelacion de la multa por la cancelacion de las tareas",
				
				turboLightHeadText: "El turbo facil",
				turboMediumHeadText: "El turbo medio",
				turboHardHeadText: "El turbo fuerte",

				turboGreenFirstText: "Poder de los ingresos 300%",
				turboGreenSecondText: "El aumento de los limites velozos",
				turboGreenThirdText: "por un mes",

				turboBlueFirstText: "Poder de los ingresos 500%",
				turboBlueSecondText: "Sus tareas se ejecutan dos veces mas rapido que los otros",
				turboBlueThirdText: "El aumento de los limites velozos",
				turboBlueFourthText: "Por un mes",

				turboRedFirstText: "Poder de los ingresos 1000%",
				turboRedSecondText: "Sus tareas se ejecutan tres veces mas rapido que los otros",
				turboRedThirdText: "El aumento de los limites velozos",
				turboRedFourthText: "por un mes",

				turboBoughtText: "Comprado",

				noPayText: "Pedimos disculpas, pero la tienda no está disponible en este momento"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				diamondsButText: "Diamants",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "vide",
				popularText: "POPULAIRE",
				bestValueText: "MEILLEUR PRIX",
				buyButText: "Acheter",
				
				premiumFirstText: "Desactivation de la publicite dans l'application",
				premiumSecondText: "Vous ne pouvez pas vous abonner a d'autres utilisateurs durant le gain de diamants",
				premiumThirdText: "Augmentation des limites de commandes",
				premiumFourthText: "L'annulation de l'amende pour l'annulation d'une tache",
				
				turboLightHeadText: "Turbo simple",
				turboMediumHeadText: "Turbo moyen",
				turboHardHeadText: "Turbo fort",

				turboGreenFirstText: "Puissance de gain est 300%",
				turboGreenSecondText: "augmentation des limites de vitesse",
				turboGreenThirdText: "pour 1 mois",

				turboBlueFirstText: "Puissance de gain est 500%",
				turboBlueSecondText: "vos taches sont executees 2 fois plus vite que d'autres",
				turboBlueThirdText: "augmentation des limites de vitesse",
				turboBlueFourthText: "pour 1 mois",

				turboRedFirstText: "Puissance de gain est 1000%",
				turboRedSecondText: "vos taches sont executees 3 fois plus vite que d'autres",
				turboRedThirdText: "augmentation des limites de vitesse",
				turboRedFourthText: "pour 1 mois",

				turboBoughtText: "Achete",

				noPayText: "Nous nous excusons, mais la boutique n'est pas disponible pour le moment"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				diamondsButText: "Diamanti",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "vuoto",
				popularText: "POPOLARE",
				bestValueText: "IL MIGLIOR PREZZO",
				buyButText: "Acquistare",
				
				premiumFirstText: "rifiuto della pubblicità e altre proposte",
				premiumSecondText: "si può non sottoscriversi ai altri utenti con la produzione dei diamanti",
				premiumThirdText: "aumento dei limiti per ordini",
				premiumFourthText: "annullamento della sanzione per l'annulamento del compito",
				
				turboLightHeadText: "Turbo leggero",
				turboMediumHeadText: "Turbo medio",
				turboHardHeadText: "Turbo potente",

				turboGreenFirstText: "Potere del guadagno 300%",
				turboGreenSecondText: "l'aumento della velovità dei limiti",
				turboGreenThirdText: "per 1 mese",

				turboBlueFirstText: "Potere del guadagno 500%",
				turboBlueSecondText: "i vostri compiti vengono svolti due volte più veloce",
				turboBlueThirdText: "l'aumento della velovità dei limiti",
				turboBlueFourthText: "per 1 mese",

				turboRedFirstText: "Potere del guadagno 1000%",
				turboRedSecondText: "i vostri compiti vengono svolti tre volte più veloce",
				turboRedThirdText: "l'aumento della velovità dei limiti",
				turboRedFourthText: "per 1 mese",

				turboBoughtText: "è stato acquistato",

				noPayText: "Ci scusiamo, ma il negozio non è disponibile al momento"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				diamondsButText: "Elmaslar",
				premiumButText: "Premium",
				turboButText: "Turbo",
				
				emptyField: "boş",
				popularText: "POPÜLER",
				bestValueText: "EN İYİ FİYAT",
				buyButText: "Satın al",
				
				premiumFirstText: "Reklamı programdan ayırmak",
				premiumSecondText: "elmas çıkarma diğer kullanıcılara abone olamaz",
				premiumThirdText: "siparişler için limitlerinin artırılması",
				premiumFourthText: "İşin iptali cezası",
				
				turboLightHeadText: "Turbo kolay",
				turboMediumHeadText: "Turbo orta",
				turboHardHeadText: "Turbo hızlı",

				turboGreenFirstText: "% 300 kazanma gücü",
				turboGreenSecondText: "hız sınırlarını artırmak",
				turboGreenThirdText: "1 aylık",

				turboBlueFirstText: "% 500 kazanma gücü",
				turboBlueSecondText: "sizin görevleri diğerinden daha hızlı 2 kez yapılır",
				turboBlueThirdText: "hız sınırlarını artırmak",
				turboBlueFourthText: "1 aylık",

				turboRedFirstText: "% 1000 kazanma gücü",
				turboRedSecondText: "sizin görevleri diğerinden daha hızlı 3 kez yapılır",
				turboRedThirdText: "hız sınırlarını artırmak",
				turboRedFourthText: "1 aylık",

				turboBoughtText: "Edilinen",

				noPayText: "We apologize, but the shop is not available at this moment"
			};
			break;
	}
	return lang;
}

// DONATE LANGS
services_lang.service("$donateLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.DONATE_VIEW, function(lang){
			$scope.diamondsButText = lang.diamondsButText;
			$scope.premiumButText = lang.premiumButText;
			$scope.turboButText = lang.turboButText;
			
			$scope.emptyField = lang.emptyField;
			$scope.popularText = lang.popularText;
			$scope.bestValueText = lang.bestValueText;
			$scope.buyButText = lang.buyButText;
			
			$scope.premiumFirstText = lang.premiumFirstText;
			$scope.premiumSecondText = lang.premiumSecondText;
			$scope.premiumThirdText = lang.premiumThirdText;
			$scope.premiumFourthText = lang.premiumFourthText;
			
			$scope.turboLightHeadText = lang.turboLightHeadText;
			$scope.turboMediumHeadText = lang.turboMediumHeadText;
			$scope.turboHardHeadText = lang.turboHardHeadText;
			
			$scope.turboGreenFirstText = lang.turboGreenFirstText;
			$scope.turboGreenSecondText = lang.turboGreenSecondText;
			$scope.turboGreenThirdText = lang.turboGreenThirdText;
			$scope.turboBlueFirstText = lang.turboBlueFirstText;
			$scope.turboBlueSecondText = lang.turboBlueSecondText;
			$scope.turboBlueThirdText = lang.turboBlueThirdText;
			$scope.turboBlueFourthText = lang.turboBlueFourthText;
			$scope.turboRedFirstText = lang.turboRedFirstText;
			$scope.turboRedSecondText = lang.turboRedSecondText;
			$scope.turboRedThirdText = lang.turboRedThirdText;
			$scope.turboRedFourthText = lang.turboRedFourthText;
			
			$scope.turboBoughtText = lang.turboBoughtText;

			$scope.noPayText = lang.noPayText;

			$scope.$applyAsync();
		});
	}
}]);