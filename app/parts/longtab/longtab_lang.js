Lang.getLongtab = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				selectedText: "Selected",
				selectAllText: "Select all",
				clearAllText: "Clear all",
				dialogPh: "Enter likes count",
				diamondsText: "Diamonds",
				sendText:  "Order",
				showMoreBut: "SHOW MORE"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				selectedText: "Выбрано",
				selectAllText: "Выбрать все",
				clearAllText: "Очистить все",
				dialogPh: "Введите количество лайков",
				diamondsText: "Диаманты",
				sendText:  "Заказать",
				showMoreBut: "ПОКАЗАТЬ ЕЩЕ"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				selectedText: "Ausgewählt",
				selectAllText: "Alles auswählen",
				clearAllText: "Alles löschen",
				dialogPh: "Fuehren Sie die Likesanzahl zu",
				diamondsText: "Diamanten",
				sendText: "bestellen",
				showMoreBut: "ZEIG MEHR"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				selectedText: "Seleccionado",
				selectAllText: "Seleccionar todo",
				clearAllText: "Limpiar todo",
				dialogPh: "Inserte el numero de me gusta",
				diamondsText: "Diamantos",
				sendText:  "Encargar",
				showMoreBut: "MOSTRAR MÁS"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				selectedText: "Choisi",
				selectAllText: "Sélectionner tout",
				clearAllText: "Tout effacer",
				dialogPh: "Saisissez le nombre de comme",
				diamondsText: "Diamants",
				sendText:  "Commander",
				showMoreBut: "MONTRE PLUS"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				selectedText: "Selezionato",
				selectAllText: "Seleziona tutto",
				clearAllText: "Cancella tutto",
				dialogPh: "La quantità dei likes",
				diamondsText: "Diamanti",
				sendText:  "Ordinare",
				showMoreBut: "MOSTRA DI PIÙ"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				selectedText: "Seçilmiş",
				selectAllText: "Hepsini seç",
				clearAllText: "Hepsini temizle",
				dialogPh: "Sever sayısını girin",
				diamondsText: "Elmas",
				sendText:  "Sipariş",
				showMoreBut: "DAHA FAZLA GÖSTER"
			};
			break;
	}
	return lang;
}

// LONGTAB LANGS
services_lang.service("$longtabLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.LONGTAB_VIEW, function(lang){
			$scope.selectedText = lang.selectedText;
			$scope.selectAllText = lang.selectAllText;
			$scope.clearAllText = lang.clearAllText;
			$scope.dialogPh = lang.dialogPh;
			$scope.diamondsText = lang.diamondsText;
			$scope.sendText = lang.sendText;
			$scope.showMoreBut = lang.showMoreBut;

			$scope.$applyAsync();
		});
	}
}]);