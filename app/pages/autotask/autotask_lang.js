Lang.getAutotask = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Auto tasks",
				offHeader: "Turn on the autotask",
				offText: "After turning on this function your tasks will be created automatically, while you are mining diamonds",
				likesHeader: "Automatic likes",
				likesText: "Turning on this function you wil get Likes automatically, while you are mining diamonds",
				likesFollowHeader: "Automatic likes and followers",
				likesFollowText: "Turning on this function you will get Likes and Followers automatically, while you are mining diamonds",
				limitText: "Set the Like's limit for each task",
				autoSwitchText: "Unlimited tasks",
				limitOk: "OK",
				checkLimitNum: "Enter an integer value",
				checkLimitMin: "Minimal limit: ",
				checkLimitMax: "Maximum limit: ",
				checkLimitOk: "Limit is set",

				likesDialogHead: "If you turn on the Auto tasks function without having Premium account you will follow the other users while using",
				likesDialogLink: "BUY PREMIUM",
				earnDialogHead: "You need to turn on the Autoearn",

				dialogConfirm: "Turn on",
				dialogCancel: "Cancel"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Автозаказы",
				offHeader: "Включите автозаказы",
				offText: "После активации функции заказы будут выполняться автоматически во время добычи диамантов!",
				likesHeader: "Автоматические лайки",
				likesText: "Включив этот режим, Вы будете автоматически получать лайки во время добычи диамантов!",
				likesFollowHeader: "Автоматические лайки и подписчики",
				likesFollowText: "Включив этот режим, Вы будете автоматически получать лайки и подписчиков во время добычи диамантов!",
				limitText: "Установите лимит лайков для каждой записи",
				autoSwitchText: "Заказы без лимита",
				limitOk: "Ок",
				checkLimitNum: "Введите целое значение",
				checkLimitMin: "Минимальный лимит: ",
				checkLimitMax: "Максимальный лимит: ",
				checkLimitOk: "Лимит установлен",

				likesDialogHead: "Включив заказы на подписки без Премиум-аккаунта, Вы будете подписываться на других пользователей при выполнении заданий",
				likesDialogLink: "КУПИТЬ ПРЕМИУМ",
				earnDialogHead: "Для того, чтобы включить автоматические заказы, Вам также необходимо активировать Автозаработок",

				dialogConfirm: "Включить",
				dialogCancel: "Отмена"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Automatische Bestellungen",
				offHeader: "Automatische Bestellungen einschalten",
				offText: "Nach der Aktivierung werden die Bestellungen automatisch wahren des Diamantenverdienstes durchgefuhrt werden!",
				likesHeader: "Automatische Likes",
				likesText: "Aktivieren Sie die Funktion, werden Sie automatisch Likes wahrend des Diamantenverdienstes bekommen!",
				likesFollowHeader: "Automatische Likes und Abonnenten",
				likesFollowText: "Aktivieren Sie die Funktion, werden Sie automatisch Likes und Abonnenten wahrend des Diamantenverdienstes bekommen!",
				limitText: "Stellen Sie ein Limit fur jede",
				autoSwitchText: "Bestellungen ohne Limit",
				limitOk: "OK",
				checkLimitNum: "Fullen Sie bitte eine Ganzzahl ein!",
				checkLimitMin: "Mindestlimit: ",
				checkLimitMax: "Höchstlimit:: ",
				checkLimitOk: "Limit ist aufgestellt",

				likesDialogHead: "Fall Sie die Funktion der Abonnentenbestellung ohne Premium-Account einschalten, werden Sie auf anderen Nutzer wahrend der Erledigungsaufgaben abonnieren",
				likesDialogLink: "PREMIUM KAUFEN",
				earnDialogHead: "Um die automatischen Bestellungen einzuschalten, ist der Auto-Verdienst zu aktivieren",

				dialogConfirm: "Einschalten",
				dialogCancel: "Abrechnen"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Autopedidas",
				offHeader: "Active las autopedidas",
				offText: "Después de la activación de la función las pedidas se realizarán automáticamente y simultáneamente con la ganancia de los Diamantes",
				likesHeader: "Likes automáticamente",
				likesText: "Al activar este modo, Ud. automáticamente obtiene los likes mientras ganando los Diamantes",
				likesFollowHeader: "Likes y suscriptores automáticos",
				likesFollowText: "Al activar este modo, Ud. automáticamente gana los likes y los suscriptores mientras ganando los Diamantes",
				limitText: "Ponga un límite de likes para cada nueva publicación",
				autoSwitchText: "Pedidas sin límites",
				limitOk: "OK",
				checkLimitNum: "Introduzca un valor entero",
				checkLimitMin: "Mínimo:",
				checkLimitMax: "Máximo:",
				checkLimitOk: "El límite ha sido establecido",

				likesDialogHead: "Al activar la pedida por las incripciónes sin paquete Premium Ud., cuando ejecuta las tareas, se suscribe a otros usuarios",
				likesDialogLink: "Comprar un paquete PREMIUM",
				earnDialogHead: "Para activar las Pedidas Automáticas es preciso que active la Autoganancia",

				dialogConfirm: "Activar",
				dialogCancel: "Cancelar"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Les ordres automatiques",
				offHeader: "Activez les ordres automatiques",
				offText: "Apres l’activation les fonctions des ordres seront executees automatiquement au moment de la capture des Diamonds!",
				likesHeader: "Les mentions “j’aimes” automatiques",
				likesText: "En activant ce mode vous recevrez des mentions “j’aimes”automatiquement en cours de capture des Diamonds!",
				likesFollowHeader: "Les mentions “j’aimes” et les followers automatiques",
				likesFollowText: "En activant ce mode vous recevrez des mentions “j’aimes”et des folowers automatiquement en cours de capture des Diamonds!",
				limitText: "Installez une limitation des “j’aimes” pour chaque entree",
				autoSwitchText: "Les orders sans limitation",
				limitOk: "OK",
				checkLimitNum: "Saisissez un nombre entier",
				checkLimitMin: "Limitation minimale:",
				checkLimitMax: "Limitation maximale:",
				checkLimitOk: "La limite est fixee",

				likesDialogHead: "En activant les ordres de following sans compte Premium,vous allez vous abonner a d'autres utilisateurs lors de l'execution des missions",
				likesDialogLink: "Acheter le Premium",
				earnDialogHead: "Pour activer les ordres automatiques vous devez egalement activer le revenu automatique",

				dialogConfirm: "Activer",
				dialogCancel: "Annuler"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "Ordini automatici",
				offHeader: "Attivare gli ordini automatici",
				offText: "Dopo l'attivazione della funzione degli ordini, questi saranno effettuati automaticamente mentre si guadagnano diamanti!",
				likesHeader: "Likes automatici",
				likesText: "Attivando questo regime, riceverete in maniera automatica likes mentre guadagnate diamanti!",
				likesFollowHeader: "Likes e iscritti automatici",
				likesFollowText: "Attivando questo regime, riceverete likes e nuovi iscritti mentre guadanate diamanti!",
				limitText: "Impostare il limite di likes per ogni pubblicazione",
				autoSwitchText: "Ordini senza limite",
				limitOk: "OK",
				checkLimitNum: "Inserire il significato completo",
				checkLimitMin: "Limite minimo:",
				checkLimitMax: "Limite massimo:",
				checkLimitOk: "Limite fissato",

				likesDialogHead: "Attivando gli ordini per le iscrizioni senza Account-Premium, vi iscriverete agli altri utenti mentre completate i compiti",
				likesDialogLink: "COMPRARE LA FORMA PREMIUM",
				earnDialogHead: "Per attivare gli ordini automatici, allo stesso modo bisogna attivare il sistema di guadagno automatico",

				dialogConfirm: "Avviare",
				dialogCancel: "Cancellazione"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Otomatik siparişler",
				offHeader: "Otomatik siparişleri açınız",
				offText: "Aktivasyon yapıldıktan sonra siparişler diamantlerin kazanma sırasında otomatik yapılacaktır!",
				likesHeader: "Otomatik beğenme",
				likesText: "Bu rejimi çalıştırdıktan sonra diamantlerin kazanma sırasında otomatik beğenme kazan!",
				likesFollowHeader: "Otomatik beğenme ve takipçiler",
				likesFollowText: "Bu rejimi çalıştırdıktan sonra diamantlerin kazanma sırasında otomatik beğenme kazan!",
				limitText: "Her post için beğenme limitini ayarla",
				autoSwitchText: "Limitsiz sipariş",
				limitOk: "OK",
				checkLimitNum: "Tüm değer giriniz",
				checkLimitMin: "Minimum limit:",
				checkLimitMax: "Maksimum limit:",
				checkLimitOk: "Limit ayarlandı",

				likesDialogHead: "Premium hesabı olmadan takip siparişlerini çalıştırarak,ödev yaptığınızda diğer kullanıcıların takipçi olursunuz",
				likesDialogLink: "PREMİUM SATIN AL",
				earnDialogHead: "Otomatik siparişlerin aktivasyonu yapma için otomatik kazanç çalıştırmak gerekir",

				dialogConfirm: "Çalıştır",
				dialogCancel: "İptal"
			};
			break;
	}
	return lang;
}

// DONATE LANGS
services_lang.service("$autotaskLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.AUTOTASK_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.offHeader = lang.offHeader;
			$scope.offText = lang.offText;
			$scope.likesHeader = lang.likesHeader;
			$scope.likesText = lang.likesText;
			$scope.likesFollowHeader = lang.likesFollowHeader;
			$scope.likesFollowText = lang.likesFollowText;
			$scope.limitText = lang.limitText;
			$scope.autoSwitchText = lang.autoSwitchText;
			$scope.limitOk = lang.limitOk;
			$scope.checkLimitNum = lang.checkLimitNum;
			$scope.checkLimitMin = lang.checkLimitMin;
			$scope.checkLimitMax = lang.checkLimitMax;
			$scope.checkLimitOk = lang.checkLimitOk;
			
			$scope.likesDialogHead = lang.likesDialogHead;
			$scope.likesDialogLink = lang.likesDialogLink;
			$scope.earnDialogHead = lang.earnDialogHead;
			
			$scope.dialogConfirm = lang.dialogConfirm;
			$scope.dialogCancel = lang.dialogCancel;

			$scope.$applyAsync();
		});
	}
}]);