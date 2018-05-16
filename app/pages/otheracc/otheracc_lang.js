Lang.getOtheracc = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				followersText: "Followers",
				followingText:  "Following",
				postsText: "Posts",
				orderAcc: "Order followers",
				emptyWall: "This user have no posts yet",
				privateWall: "This account is private",
				dialogPh: "Enter count",
				diamondsText: "Diamonds",
				sendText:  "Order",
				showMoreBut: "SHOW MORE"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				followersText: "Подписчики",
				followingText:  "Подписки",
				postsText: "Посты",
				orderAcc: "Заказать подписчиков",
				emptyWall: "У этого пользователя нет постов",
				privateWall: "Этот аккаунт - приватный",
				dialogPh: "Введите число",
				diamondsText: "Диаманты",
				sendText:  "Заказать",
				showMoreBut: "ПОКАЗАТЬ ЕЩЕ"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				followersText: "Followers",
				followingText:  "Folgende",
				postsText: "Beiträge",
				orderAcc: "bestellen Anhänger",
				emptyWall: "Dieser Benutzer haben noch keine Beiträge",
				privateWall: "Dieses Konto ist privat",
				dialogPh: "Geben Sie Zählung",
				diamondsText: "Diamanten",
				sendText: "bestellen",
				showMoreBut: "ZEIG MEHR"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				followersText: "Los suscriptores",
				followingText:  "Siguiendo",
				postsText: "Mensajes",
				orderAcc: "seguidores de orden",
				emptyWall: "Este usuario no tiene todavía puestos",
				privateWall: "Esta cuenta es privada",
				dialogPh: "Introduzca recuento",
				diamondsText: "Diamantos",
				sendText:  "Encargar",
				showMoreBut: "MOSTRAR MÁS"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				followersText: "Abonnes",
				followingText:  "Suivant",
				postsText: "des postes",
				orderAcc: "suiveurs de commande",
				emptyWall: "Cet utilisateur a pas encore de messages",
				privateWall: "Ce compte est privé",
				dialogPh: "Entrez compte",
				diamondsText: "Diamants",
				sendText:  "Commander",
				showMoreBut: "MONTRE PLUS"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				followersText: "Abbonati",
				followingText:  "A seguire",
				postsText: "Messaggi",
				orderAcc: "seguaci di ordine",
				emptyWall: "Questo utente ha ancora messaggi",
				privateWall: "Questo account è privato",
				dialogPh: "Inserisci conteggio",
				diamondsText: "Diamanti",
				sendText:  "Ordinare",
				showMoreBut: "MOSTRA DI PIÙ"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				followersText: "Takipçiler",
				followingText:  "Aşağıdaki",
				postsText: "Mesajları",
				orderAcc: "sipariş takipçileri",
				emptyWall: "Bu kullanıcı henüz mesaj var",
				privateWall: "Bu hesap özeldir",
				dialogPh: "Sayısı girin",
				diamondsText: "Elmas",
				sendText:  "Sipariş",
				showMoreBut: "DAHA FAZLA GÖSTER"
			};
			break;
	}
	return lang;
}

// OTHERACC LANGS
services_lang.service("$otheraccLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.OTHERACC_VIEW, function(lang){
			$scope.followersText = lang.followersText;
			$scope.followingText = lang.followingText;
			$scope.postsText = lang.postsText;
			$scope.orderAcc = lang.orderAcc;
			$scope.emptyWall = lang.emptyWall;
			$scope.privateWall = lang.privateWall;
			$scope.dialogPh = lang.dialogPh;
			$scope.diamondsText = lang.diamondsText;
			$scope.sendText = lang.sendText;
			$scope.showMoreBut = lang.showMoreBut;

			$scope.$applyAsync();
		});
	}
}]);