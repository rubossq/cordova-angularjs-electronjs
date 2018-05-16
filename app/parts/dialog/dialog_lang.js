Lang.getDialog = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				diamondsText: "Diamonds",
				sendText:  "Order",
				bidMoreHead: "Add order",
				privateAccHead: "Error!<br>Private account",
				privateAccText: "You are trying to make order on a private account, please open an account if you want to get likes!",
				privateAccBut: "Ok",
				enterNickHead: "Enter a nickname:",
				enterNickPh: "Nickname",
				enterNickBut: "Confirm",
				payEmailText: "Payment email",
				payEmailOk: "Ok",
				payBuy: "Buy",
				goodsMain: "Recent purchases",
				goodsGift: "You got a bonus",
				goodsBut: "Ok",
				speedHead: "Select acceleration time",
				speed1Hour: "1 hour",
				speed2Hour: "2 hours",
				speed3Hour: "3 hours",
				speedBut: "Start"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				diamondsText: "Диаманты",
				sendText:  "Заказать",
				bidMoreHead: "Добавить заказ",
				privateAccHead: "Ошибка!<br>Приватный аккаунт",
				privateAccText: "Вы пытаетесь сделать заказ на приватный аккаунт, пожалуйста, откройте его, если вы хотите накрутить лайки!",
				privateAccBut: "Ок",
				enterNickHead: "Введите имя:",
				enterNickPh: "Имя",
				enterNickBut: "Подтвердить",
				payEmailText: "Платежный адрес",
				payEmailOk: "Ок",
				payBuy: "Buy",
				goodsMain: "Последние покупки",
				goodsGift: "Вы получили бонус",
				goodsBut: "Ok",
				speedHead: "Выберите время ускорения",
				speed1Hour: "1 час",
				speed2Hour: "2 часа",
				speed3Hour: "3 часа",
				speedBut: "Старт"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				diamondsText: "Diamanten",
				sendText: "bestellen",
				bidMoreHead: "Bestellung hinzufügen",
				privateAccHead: "Fehler!<br>Privater konto",
				privateAccText: "Sie versuchen, um auf ein Privatkonto zu machen, benutzen Sie bitte ein Konto eröffnen, wenn Sie gerne zu bekommen!",
				privateAccBut: "Ok",
				enterNickHead: "Geben Sie Spitznamen:",
				enterNickPh: "Spitznamen",
				enterNickBut: "Bestätigen",
				payEmailText: "Zahlungs-E-Mail",
				payEmailOk: "Ok",
				payBuy: "Kaufen",
				goodsMain: "Letzte Ankäufe",
				goodsGift: "Sie haben einen Bonus",
				goodsBut: "Ok",
				speedHead: "Wählen Sie die Beschleunigungszeit",
				speed1Hour: "1 Stunde",
				speed2Hour: "2 Stunden",
				speed3Hour: "3 Stunden",
				speedBut: "Anfang"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				diamondsText: "Diamantos",
				sendText:  "Encargar",
				bidMoreHead: "Añadir pedido",
				privateAccHead: "Error!<br>Cuenta privada",
				privateAccText: "Usted está tratando de poner orden en una cuenta privada, por favor abra una cuenta si desea obtener gustos!",
				privateAccBut: "Ok",
				enterNickHead: "Introduzca apodo:",
				enterNickPh: "Apodo",
				enterNickBut: "Confirmar",
				payEmailText: "Correo electrónico de pago",
				payEmailOk: "Ok",
				payBuy: "Comprar",
				goodsMain: "Compras recientes",
				goodsGift: "Tienes un bono",
				goodsBut: "Ok",
				speedHead: "Seleccione el tiempo de aceleración",
				speed1Hour: "1 hora",
				speed2Hour: "2 horas",
				speed3Hour: "3 horas",
				speedBut: "comienzo"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				diamondsText: "Diamants",
				sendText:  "Commander",
				bidMoreHead: "Ajouter un ordre",
				privateAccHead: "Erreur!<br>Compte privé",
				privateAccText: "Vous essayez de faire l'ordre sur un compte privé, s'il vous plaît ouvrir un compte si vous voulez obtenir goûts!",
				privateAccBut: "Ok",
				enterNickHead: "Entrer un surnom:",
				enterNickPh: "Surnom",
				enterNickBut: "Confirmer",
				payEmailText: "E-mail de paiement",
				payEmailOk: "Ok",
				payBuy: "Acheter",
				goodsMain: "Achats récents",
				goodsGift: "Vous avez un bonus",
				goodsBut: "Ok",
				speedHead: "Sélectionner le temps d'accélération",
				speed1Hour: "1 heure",
				speed2Hour: "2 heures",
				speed3Hour: "3 heures",
				speedBut: "Démarrer"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				diamondsText: "Diamanti",
				sendText:  "Ordinare",
				bidMoreHead: "Aggiungere ordine",
				privateAccHead: "Errore!<br>Account privato",
				privateAccText: "Si sta cercando di fare ordine su un conto privato, si prega di aprire un conto, se si desidera ottenere calibro!",
				privateAccBut: "Ok",
				enterNickHead: "Inserisci soprannome:",
				enterNickPh: "Soprannome",
				enterNickBut: "Confermare",
				payEmailText: "e-mail di pagamento",
				payEmailOk: "Ok",
				payBuy: "Acquistare",
				goodsMain: "gli acquisti recenti",
				goodsGift: "Hai un bonus",
				goodsBut: "Ok",
				speedHead: "Seleziona il tempo di accelerazione",
				speed1Hour: "1 ore",
				speed2Hour: "2 ore",
				speed3Hour: "3 ore",
				speedBut: "inizio"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				diamondsText: "Elmas",
				sendText:  "Sipariş",
				bidMoreHead: "Sipariş ekle",
				privateAccHead: "Hata!<br>özel hesap",
				privateAccText: "Özel bir hesapta sipariş yapmak için çalışıyoruz, sen seviyor almak istiyorsanız bir hesap açın lütfen!",
				privateAccBut: "Ok",
				enterNickHead: "takma ad girin:",
				enterNickPh: "rumuz",
				enterNickBut: "onaylamak",
				payEmailText: "Ödeme e-postası",
				payEmailOk: "Tamam",
				payBuy: "Satın al",
				goodsMain: "Son satın alımlar",
				goodsGift: "Bir bonusunuz var",
				goodsBut: "Ok",
				speedHead: "Hızlanma süresini seçin",
				speed1Hour: "1 saat",
				speed2Hour: "2 saat",
				speed3Hour: "3 saat",
				speedBut: "Başlama"
			};
			break;
	}
	return lang;
}

// DIALOG LANGS
services_lang.service("$dialogLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.DIALOG_VIEW, function(lang){
			$scope.diamondsText = lang.diamondsText;
			$scope.sendText = lang.sendText;
			$scope.bidMoreHead = lang.bidMoreHead;
			$scope.privateAccHead = lang.privateAccHead;
			$scope.privateAccText = lang.privateAccText;
			$scope.privateAccBut = lang.privateAccBut;
			$scope.enterNickHead = lang.enterNickHead;
			$scope.enterNickPh = lang.enterNickPh;
			$scope.enterNickBut = lang.enterNickBut;
			$scope.payEmailText = lang.payEmailText;
			$scope.payEmailOk = lang.payEmailOk;
			$scope.payBuy = lang.payBuy;
			$scope.goodsMain = lang.goodsMain;
			$scope.goodsGift = lang.goodsGift;
			$scope.goodsBut = lang.goodsBut;
			$scope.speedHead = lang.speedHead;
			$scope.speed1Hour = lang.speed1Hour;
			$scope.speed2Hour = lang.speed2Hour;
			$scope.speed3Hour = lang.speed3Hour;
			$scope.speedBut = lang.speedBut;

			$scope.$applyAsync();
		});
	}
}]);