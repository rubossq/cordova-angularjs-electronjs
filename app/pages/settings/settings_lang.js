Lang.getSettings = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Settings",
				referralText: "Referral system",
				newVersionText: "A new version: ",
				updateButText: "Update",
				shareAppHead: Constant.APP_FULL_NAME + "! Likes and Followers for Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " for Android! Likes and Followers for Instagram! Download here:",
				shareAppChooseTitle: "Choose an app to share:",
				premiumAccText: "Premium account",
				followEarnText: "Follow in earning",
				autoEarnText: "Auto mining after authorization",
				purchaseText: "Purchase management",
				notifActiveText: "Notifications",
				notifSoundText: "Notification sound",
				shareText: "Share with friends",
				copiedText: "Copied to Clipboard!",
				rateText: "Rate this app",
				otherAppText: "Others our applications:",
				privacyText: "User aggreement",
				exitAccText: "Log out"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Настройки",
				referralText: "Реферальная система",
				newVersionText: "Новая версия: ",
				updateButText: "Обновить",
				shareAppHead: Constant.APP_FULL_NAME + "! Лайки и Подписчики для Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " для Android! Лайки и Подписчики для Instagram! Скачать:",
				shareAppChooseTitle: "Выберите приложение чтобы поделиться:",
				premiumAccText: "Премиум аккаунт",
				followEarnText: "Подписка в заработке",
				autoEarnText: "Автоматическая добыча при авторизации",
				purchaseText: "Управление покупками",
				notifActiveText: "Уведомления",
				notifSoundText: "Звук уведомлений",
				shareText: "Поделиться с друзьями",
				copiedText: "Ссылка скопирована!",
				rateText: "Оцените приложение",
				otherAppText: "Другие наши приложения:",
				privacyText: "Пользовательское соглашение",
				exitAccText: "Выйти из аккаунта"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Einstellungen",
				referralText: "Empfehlungssystem",
				newVersionText: "neue Version: ",
				updateButText: "Auffrischen",
				shareAppHead: Constant.APP_FULL_NAME + "! Likes und Followers für Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " auf Android! Likes und Followers für Instagram! Herunterladen:",
				shareAppChooseTitle: "Wählen Sie die Anwendung umbuchen:",
				premiumAccText: "Premium account",
				followEarnText: "Erwerbsubskription",
				autoEarnText: "Automatischer Erwerb bei der Authorisierung",
				purchaseText: "Einkaufsmanagement",
				notifActiveText: "Benachrichtigungen",
				notifSoundText: "Benachrichtigungston",
				shareText: "Mit Freunden teilen",
				copiedText: "Der Link ist kopiert!",
				rateText: "Bewerten Sie diese Anwendung",
				otherAppText: "unsere andere App:",
				privacyText: "Nutzungsvereinbarung",
				exitAccText: "aus dem Account raus sein"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Las configuraciones",
				referralText: "Sistema de referencia",
				newVersionText: "La version nueva: ",
				updateButText: "Renovar",
				shareAppHead: Constant.APP_FULL_NAME + "! Los likes y siguen los seguidores de Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " para Android! Los likes y siguen los seguidores de Instagram! Descargar aquí:",
				shareAppChooseTitle: "Elige una aplicación para compartir:",
				premiumAccText: "El perfil premium",
				followEarnText: "La suscripcion en el salario",
				autoEarnText: "La extraccion automatica durante la autorizacion",
				purchaseText: "Gestión de compras",
				notifActiveText: "Notificaciones",
				notifSoundText: "Sonido de notificación",
				shareText: "Compartir con amigos",
				copiedText: "Enlace copiado!",
				rateText: "Califica esta aplicación",
				otherAppText: "Otras nuestras aplicaciones:",
				privacyText: "El acuerdo del usario",
				exitAccText: "Salir del perfil"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Configurations",
				referralText: "Système d'aiguillage",
				newVersionText: "Mise a jour:  ",
				updateButText: "Mettre a jour",
				shareAppHead: Constant.APP_FULL_NAME + "! Spitz et Disciples pour Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " pour Android! Likes et Followers pour Instagram! Télécharger:",
				shareAppChooseTitle: "Sélectionnez l'application à rediffuser:",
				premiumAccText: "Premium",
				followEarnText: "Abonnement en gain",
				autoEarnText: "Gain automatique en cas d'autorisation",
				purchaseText: "Gestion des achats",
				notifActiveText: "Notifications",
				notifSoundText: "Son de notification",
				shareText: "Partager avec des amis",
				copiedText: "Lien copié!",
				rateText: "Noter cette application",
				otherAppText: "Nos autres applications:",
				privacyText: "Accord de l'utilisateur",
				exitAccText: "Se deconnecter du compte"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "impostazioni",
				referralText: "Sistema di rinvio",
				newVersionText: "nuova versione: ",
				updateButText: "aggiornare",
				shareAppHead: Constant.APP_FULL_NAME + "! Spitz e seguaci per Instagram.",
				shareAppText: Constant.APP_FULL_NAME + " per Android! Spitz e seguaci per Instagram! Download:",
				shareAppChooseTitle: "Selezionare l'applicazione di ripubblicare:",
				premiumAccText: "Premium account",
				followEarnText: "iscrizione ai guadagni",
				autoEarnText: "la produzione automatica avendo l'autorizzazione",
				purchaseText: "Gestione degli acquisti",
				notifActiveText: "Notifiche",
				notifSoundText: "Suono di notifica",
				shareText: "Condividere con gli amici",
				copiedText: "Il link è copiato!",
				rateText: "Vota questa applicazione",
				otherAppText: "le altre nostre app:",
				privacyText: "condizioni d'uso",
				exitAccText: "uscire dall'account"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Ayarlar",
				referralText: "Sevk sistemi",
				newVersionText: "Yeni versiyonu: ",
				updateButText: "Yenile",
				shareAppHead: Constant.APP_FULL_NAME + "! Likes ve Instagram için İzleyiciler.",
				shareAppText: Constant.APP_FULL_NAME + " için uygulama! Instagram için Laiki ve İzleyiciler! Indir:",
				shareAppChooseTitle: "Repost için bir uygulama seçin:",
				premiumAccText: "Premium hesap",
				followEarnText: "Abone işlem yapıyor",
				autoEarnText: "Otomatik çıkarma yetkisi",
				purchaseText: "Satınalma yönetimi",
				notifActiveText: "Bildirimler",
				notifSoundText: "Bilgilendirme sesi",
				shareText: "Arkadaşlarınla paylaş",
				copiedText: "Link kopyalandı!",
				rateText: "Bu uygulamayı değerlendir",
				otherAppText: "Diğer programlarımız:",
				privacyText: "Kullanıcı Sözleşmesi",
				exitAccText: "Hesabınıza çıkın"
			};
			break;
	}
	return lang;
}

// SETTINGS LANGS
services_lang.service("$settingsLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.SETTINGS_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.referralText = lang.referralText;
			$scope.newVersionText = lang.newVersionText;
			$scope.updateButText = lang.updateButText;
			$scope.shareAppHead = lang.shareAppHead;
			$scope.shareAppText = lang.shareAppText;
			$scope.shareAppChooseTitle = lang.shareAppChooseTitle;
			$scope.premiumAccText = lang.premiumAccText;
			$scope.followEarnText = lang.followEarnText;
			$scope.autoEarnText = lang.autoEarnText;
			$scope.purchaseText = lang.purchaseText;
			$scope.notifActiveText = lang.notifActiveText;
			$scope.notifSoundText = lang.notifSoundText;
			$scope.shareText = lang.shareText;
			$scope.copiedText = lang.copiedText;
			$scope.rateText = lang.rateText;
			$scope.otherAppText = lang.otherAppText;
			$scope.privacyText = lang.privacyText;
			$scope.exitAccText = lang.exitAccText;

			$scope.$applyAsync();
		});
	}
}]);