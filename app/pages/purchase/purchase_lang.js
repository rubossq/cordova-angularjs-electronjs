Lang.getPurchase = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Purchase management",
				activePurchases: "Active subs:",
				committedPurchases: "Purchases",
				lateTime: "Time remaining: ",
				soonTime: "Will end soon",
				dayWordTime: " d. left",
				emptyText: "You have no purchases",
				emptyShop: "GO TO THE SHOP",
				unsubscribeHead: "CONFIRM DELETE",
				unsubscribeCancel: "Cancel",
				unsubscribeConfirm: "Delete"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Управление покупками",
				activePurchases: "Активные подписки:",
				committedPurchases: "Покупки:",
				lateTime: "Время до окончания: ",
				soonTime: "Скоро закончится",
				dayWordTime: " дн. до конца",
				emptyText: "You have no purchases yet",
				emptyShop: "ПЕРЕЙТИ В МАГАЗИН",
				unsubscribeHead: "ПОДТВЕРДИТЬ УДАЛЕНИЕ",
				unsubscribeCancel: "Отмена",
				unsubscribeConfirm: "Удалить"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Einkaufsmanagement",
				activePurchases: "Aktive Abonnements:",
				committedPurchases: "Einkäufe:",
				lateTime: "Zeit bis zum Abschluss: ",
				soonTime: "Bald endet",
				dayWordTime: " t.",
				emptyText: "Sie haben noch keine Einkäufe",
				emptyShop: "GEHE ZUM LADEN",
				unsubscribeHead: "LÖSCHEN BESTÄTIGEN",
				unsubscribeCancel: "Stornieren",
				unsubscribeConfirm: "Löschen"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Gestión de compras",
				activePurchases: "Las suscripciones activas:",
				committedPurchases: "Compras",
				lateTime: "Tiempo de cierre: ",
				soonTime: "Pronto termina",
				dayWordTime: " d.",
				emptyText: "Todavía no tienes compras",
				emptyShop: "VE A LA TIENDA",
				unsubscribeHead: "CONFIRMAR ELIMINACIÓN",
				unsubscribeCancel: "Cancelar",
				unsubscribeConfirm: "Borrar"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Gestion des achats",
				activePurchases: "Les abonnements actifs:",
				committedPurchases: "Achats:",
				lateTime: "Temps de fermeture: ",
				soonTime: "Se termine bientôt",
				dayWordTime: " j.",
				emptyText: "Vous n'avez pas encore acheté",
				emptyShop: "ALLER AU MAGASIN",
				unsubscribeHead: "CONFIRMATION DE LA SUPPRESSION",
				unsubscribeCancel: "Annuler",
				unsubscribeConfirm: "Effacer"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "Gestione degli acquisti",
				activePurchases: "Abbonamenti attivi:",
				committedPurchases: "Acquisti",
				lateTime: "Tempo di chiusura: ",
				soonTime: "Finisce presto",
				dayWordTime: " g.",
				emptyText: "Hai ancora gli acquisti",
				emptyShop: "ANDARE AL NEGOZIO",
				unsubscribeHead: "CONFERMA CANCELLAZIONE",
				unsubscribeCancel: "Annulla",
				unsubscribeConfirm: "Cancellare"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Satınalma yönetimi",
				activePurchases: "Aktif abonelikler:",
				committedPurchases: "Alımları:",
				lateTime: "Kapatma zamanı: ",
				soonTime: "Yakında biter",
				dayWordTime: " g.",
				emptyText: "Henüz hiç alımınız yok",
				emptyShop: "MAĞAZA GİTMEK",
				unsubscribeHead: "SİLMEYİ ONAYLA",
				unsubscribeCancel: "İptal etmek",
				unsubscribeConfirm: "Silmek"
			};
			break;
	}
	return lang;
}

// PURCHASE LANGS
services_lang.service("$purchaseLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.PURCHASE_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.activePurchases = lang.activePurchases;
			$scope.committedPurchases = lang.committedPurchases;
			$scope.lateTime = lang.lateTime;
			$scope.soonTime = lang.soonTime;
			$scope.dayWordTime = lang.dayWordTime;
			$scope.emptyText = lang.emptyText;
			$scope.emptyShop = lang.emptyShop;
			$scope.unsubscribeHead = lang.unsubscribeHead;
			$scope.unsubscribeCancel = lang.unsubscribeCancel;
			$scope.unsubscribeConfirm = lang.unsubscribeConfirm;

			$scope.$applyAsync();
		});	
	}
}]);