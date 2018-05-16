Lang.getEarn = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				earnedText: "earned diamonds",
				powerText: "power",

				guideTimeText: "Time before the next task",
				guideTopText: "Rating of users",
				guideRunText: "Start or pause earning",
				guideTurboText: "Turbo shop",
				guideNextText: "NEXT",
				guideReadyText: "READY",
				guideSkipText: "SKIP"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				earnedText: "заработано диамантов",
				powerText: "мощность",

				guideTimeText: "Время до выполнения следующего задания",
				guideTopText: "Рейтинг пользователей",
				guideRunText: "Начало и прекращение заработка",
				guideTurboText: "Турбо-магазин",
				guideNextText: "ДАЛЕЕ",
				guideReadyText: "ГОТОВО",
				guideSkipText: "ПРОПУСТИТЬ"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				earnedText: "verdient Diamanten",
				powerText: "macht",

				guideTimeText: "Zeit vor der nächsten Aufgabe",
				guideTopText: "Bewertung der Nutzer",
				guideRunText: "Start oder Pause verdienen",
				guideTurboText: "Turbo Geschäft",
				guideNextText: "WУШЕУК",
				guideReadyText: "FERTIG",
				guideSkipText: "ÜBERSPRINGEN"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				earnedText: "diamantes obtenidos",
				powerText: "poder",

				guideTimeText: "Tiempo antes de la siguiente tarea",
				guideTopText: "Valoración de los usuarios",
				guideRunText: "Iniciar o pausar ganancia",
				guideTurboText: "Tienda turbo",
				guideNextText: "ENTONCES",
				guideReadyText: "LISTO",
				guideSkipText: "OMITIR"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				earnedText: "diamants Gagnés",
				powerText: "puissance",

				guideTimeText: "Temps avant la prochaine tâche",
				guideTopText: "Note des utilisateurs",
				guideRunText: "Démarrer ou interrompre le gain",
				guideTurboText: "Boutique Turbo",
				guideNextText: "SUIVANT",
				guideReadyText: "FINI",
				guideSkipText: "SAUTER"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				earnedText: "diamanti guadagnati",
				powerText: "potere",

				guideTimeText: "Tempo prima che il prossimo compito",
				guideTopText: "Valutazione degli utenti",
				guideRunText: "Avviare o mettere in pausa a guadagnare",
				guideTurboText: "negozio Turbo",
				guideNextText: "ULTERIORMENTE",
				guideReadyText: "PRONTO",
				guideSkipText: "SALTA"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				earnedText: "kazanılan elmaslar",
				powerText: "güç",

				guideTimeText: "Bir sonraki görev öncesi zaman",
				guideTopText: "Kullanıcıların derecelendirmesi",
				guideRunText: "Kazancınızı başlatın veya duraklatın",
				guideTurboText: "Turbo dükkanı",
				guideNextText: "DEVAM",
				guideReadyText: "HAZIR",
				guideSkipText: "ATLAMAK"
			};
			break;
	}
	return lang;
}

// EARN LANGS
services_lang.service("$earnLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.EARN_VIEW, function(lang){
			$scope.earnedText = lang.earnedText;
			$scope.powerText = lang.powerText;

			$scope.guideTimeText = lang.guideTimeText;
			$scope.guideTopText = lang.guideTopText;
			$scope.guideRunText = lang.guideRunText;
			$scope.guideTurboText = lang.guideTurboText;

			$scope.guideNextText = lang.guideNextText;
			$scope.guideReadyText = lang.guideReadyText;
			$scope.guideSkipText = lang.guideSkipText;

			$scope.$applyAsync();
		});
	}
}]);