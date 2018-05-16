Lang.getTop = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Rating",
				placeText: "place",
				prizeTimeText: "The competition will end after:",
				userText: "User",
				tasksCompleteText: "Completed tasks",
				dialogPlaceText: "Place",
				dialogButText: "Ok"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Рейтинг",
				placeText: "место",
				prizeTimeText: "До выдачи призов осталось:",
				userText: "Пользователь",
				tasksCompleteText: "Заданий выполнено",
				dialogPlaceText: "Место",
				dialogButText: "Ок"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Stellenwert",
				placeText: "platz",
				prizeTimeText: "Bis zur Preisverteilung blieb es:",
				userText: "Benutzer",
				tasksCompleteText: "erledigte Aufgaben",
				dialogPlaceText: "Platz",
				dialogButText: "Ok"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Valoracion",
				placeText: "lugar",
				prizeTimeText: "Hasta la expedicion de las sorpresas deja:",
				userText: "Usuario",
				tasksCompleteText: "Las tareas realizadas",
				dialogPlaceText: "Puesto",
				dialogButText: "Ok"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Classement",
				placeText: "endroit",
				prizeTimeText: "On distribuera des prix dans:",
				userText: "Utilisateur",
				tasksCompleteText: "Taches accomplies",
				dialogPlaceText: "Place",
				dialogButText: "Ok"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "valutazione",
				placeText: "posto",
				prizeTimeText: "al rilascio dei premi mancano:",
				userText: "Utente",
				tasksCompleteText: "la domanda posta",
				dialogPlaceText: "posto",
				dialogButText: "Ok"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Reyting",
				placeText: "yer",
				prizeTimeText: "Ödüllerin verilmesine kaldı:",
				userText: "Kullanıcı",
				tasksCompleteText: "Görev tamamlandı",
				dialogPlaceText: "Yer",
				dialogButText: "Ok"
			};
			break;
	}

	// common place's text in top
	lang.dialogPlace1Text = Constant.TOP_PLACE_FIRST;
	lang.dialogPlace2Text = Constant.TOP_PLACE_SECOND;
	lang.dialogPlace3Text = Constant.TOP_PLACE_THIRD;
	lang.dialogPlace4Text = Constant.TOP_PLACE_FOURTH;
	lang.dialogPlace5Text = Constant.TOP_PLACE_FIFTH;

	// common prize's text in top
	lang.dialogFirstNum = Constant.TOP_PLACE_FIRST_NUM;
	lang.dialogSecondNum = Constant.TOP_PLACE_SECOND_NUM;
	lang.dialogThirdNum = Constant.TOP_PLACE_THIRD_NUM;
	lang.dialogFourthNum = Constant.TOP_PLACE_FOURTH_NUM;
	lang.dialogFifthNum = Constant.TOP_PLACE_FIFTH_NUM;

	return lang;
}

// TOP LANGS
services_lang.service("$topLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.TOP_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.placeText = lang.placeText;
			$scope.prizeTimeText = lang.prizeTimeText;
			$scope.userText = lang.userText;
			$scope.tasksCompleteText = lang.tasksCompleteText;
			$scope.dialogPlaceText = lang.dialogPlaceText;

			$scope.dialogPlace1Text = lang.dialogPlace1Text;
			$scope.dialogPlace2Text = lang.dialogPlace2Text;
			$scope.dialogPlace3Text = lang.dialogPlace3Text;
			$scope.dialogPlace4Text = lang.dialogPlace4Text;
			$scope.dialogPlace5Text = lang.dialogPlace5Text;

			$scope.dialogFirstNum = lang.dialogFirstNum;
			$scope.dialogSecondNum = lang.dialogSecondNum;
			$scope.dialogThirdNum = lang.dialogThirdNum;
			$scope.dialogFourthNum = lang.dialogFourthNum;
			$scope.dialogFifthNum = lang.dialogFifthNum;
			
			$scope.dialogButText = lang.dialogButText;

			$scope.$applyAsync();
		});
	}
}]);