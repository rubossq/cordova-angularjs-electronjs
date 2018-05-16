Lang.getBidLike = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Followers",
				bidLikeNoQuestText: "You have no posts yet",

				listBut: "From list",
				linkBut: "Link",

				linkLikePh: "Link on post",
				diamondsText: "Diamonds",
				startText: "Order",
				showMoreBut: "SHOW MORE",

				guideQuestHintText: "Tap on the any image for get likes",
				guideLongTabMobText: "Hold on a while to select several pictures at once",
				guideLongTabDeskText: "Point and click on mark to select several pictures at once",
				guideNextText: "NEXT",
				guideReadyText: "READY",
				guideSkipText: "SKIP"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				likesButText: "Лайки",
				subsButText: "Подписчики",
				bidLikeNoQuestText: "У Вас пока нет ни одного поста",

				listBut: "Из списка",
				linkBut: "По ссылке",

				linkLikePh: "Ссылка на пост",
				diamondsText: "Диаманты",
				startText: "Заказать",
				showMoreBut: "ПОКАЗАТЬ ЕЩЕ",

				guideQuestHintText: "Нажмите на изображение на которое необходимо накрутить лайки",
				guideLongTabMobText: "Удерживайте на изображении, чтобы выбрать несколько изображений сразу",
				guideLongTabDeskText: "Наведите и нажмите на картинку, чтобы выбрать несколько изображений сразу",
				guideNextText: "ДАЛЕЕ",
				guideReadyText: "ГОТОВО",
				guideSkipText: "ПРОПУСТИТЬ"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Subskription",
				bidLikeNoQuestText: "Sie haben noch keine Fragen",

				listBut: "aus der Liste",
				linkBut: "durch den Link",

				linkLikePh: "Link auf die Beitrag",
				diamondsText: "Diamanten",
				startText: "bestellen",
				showMoreBut: "ZEIG MEHR",

				guideQuestHintText: "Druecken Sie die Frage, deren Likes  man vergroessen soll",
				guideLongTabMobText: "Halten Sie auf das Bild, um mehrere Bilder auszuwählen",
				guideLongTabDeskText: "Punkt und klicken Sie auf Markierung, um mehrere Bilder auf einmal auszuwählen",
				guideNextText: "WУШЕУК",
				guideReadyText: "FERTIG",
				guideSkipText: "ÜBERSPRINGEN"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				likesButText: "Me gusta",
				subsButText: "Suscripciones",
				bidLikeNoQuestText: "No tiene ninguna pregunta todavia",

				listBut: "De la lista",
				linkBut: "Enlace",

				linkLikePh: "Enlace al post",
				diamondsText: "Diamantos",
				startText: "Encargar",
				showMoreBut: "MOSTRAR MÁS",

				guideQuestHintText: "Pulse a la pregunta a donde es necesario recoger me gusta",
				guideLongTabMobText: "Mantenga en la imagen para seleccionar varias imágenes a la vez",
				guideLongTabDeskText: "Señale y haga clic en la marca para seleccionar varias imágenes a la vez",
				guideNextText: "ENTONCES",
				guideReadyText: "LISTO",
				guideSkipText: "OMITIR"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				likesButText: "Comme",
				subsButText: "Abonnements",
				bidLikeNoQuestText: "Vous n'avez pas encore de questions",

				listBut: "de la liste",
				linkBut: "suivre le lien",

				linkLikePh: "Lien vers Poster",
				diamondsText: "Diamants",
				startText: "Commander",
				showMoreBut: "MONTRE PLUS",

				guideQuestHintText: "Cliquez sur la question sur laquelle vous voulez obtenir des comme",
				guideLongTabMobText: "Attendez un certain temps pour sélectionner plusieurs images à la fois",
				guideLongTabDeskText: "Pointez et cliquez sur la marque pour sélectionner plusieurs images à la fois",
				guideNextText: "SUIVANT",
				guideReadyText: "FINI",
				guideSkipText: "SAUTER"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Abbonamento",
				bidLikeNoQuestText: "Lei per ora non ha nessuna domanda",

				listBut: "Dalla lista",
				linkBut: "Sul collegamento",

				linkLikePh: "Collegamento al post",
				diamondsText: "Diamanti",
				startText: "Ordinare",
				showMoreBut: "MOSTRA DI PIÙ",

				guideQuestHintText: "Schiaccia sulla domanda sella quale vuole truccare i likes",
				guideLongTabMobText: "Tenere sull'immagine per selezionare più immagini contemporaneamente",
				guideLongTabDeskText: "Punto e fare clic su Seleziona per selezionare più immagini in una sola volta",
				guideNextText: "ULTERIORMENTE",
				guideReadyText: "PRONTO",
				guideSkipText: "SALTA"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				likesButText: "Like",
				subsButText: "Takipçiler",
				bidLikeNoQuestText: "Sorunuz yok",

				listBut: "Listeden",
				linkBut: "Linkden",

				linkLikePh: "Post bağlantı",
				diamondsText: "Elmaslar",
				startText: "Sipariş",
				showMoreBut: "DAHA FAZLA GÖSTER",

				guideQuestHintText: "istediğiniz soru üzerine tıklayın ve layk kazanın",
				guideLongTabMobText: "Aynı anda birden fazla görüntü seçmek için resmin üzerine tutunuz",
				guideLongTabDeskText: "Bir seferde birden fazla resim seçmek için İşaretle üzerine gelin ve tıklayın",
				guideNextText: "DEVAM",
				guideReadyText: "HAZIR",
				guideSkipText: "ATLAMAK"
			};
			break;
	}
	return lang;
}

// BID LIKE LANGS
services_lang.service("$bidLikeLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.BID_LIKE_VIEW, function(lang){
			$scope.likesButText = lang.likesButText;
			$scope.subsButText = lang.subsButText;
			$scope.bidLikeNoQuestText = lang.bidLikeNoQuestText;

			$scope.listBut = lang.listBut;
			$scope.linkBut = lang.linkBut;

			$scope.linkLikePh = lang.linkLikePh;
			$scope.diamondsText = lang.diamondsText;
			$scope.startText = lang.startText;
			$scope.showMoreBut = lang.showMoreBut;

			$scope.guideQuestHintText = lang.guideQuestHintText;
			$scope.guideLongTabMobText = lang.guideLongTabMobText;
			$scope.guideLongTabDeskText = lang.guideLongTabDeskText;
			$scope.guideNextText = lang.guideNextText;
			$scope.guideReadyText = lang.guideReadyText;
			$scope.guideSkipText = lang.guideSkipText;

			$scope.$applyAsync();
		});
	}
}]);