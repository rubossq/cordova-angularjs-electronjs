Lang.getBidSubs = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Followers",
				warningText: "If you unfollow after earning Diamonds - You will have PENALTY!",

				accBut: "This account",
				nickBut: "By nickname",

				linkSubsPh: "Link on user's profile",
				diamondsText: "Diamonds",
				startText: "Order",

				acceptHeadText: "Subscribes is not activated",
				acceptButText: "Activate",
				acceptMainText: "When you activate subscribes, you will exchange subscribes when you are mining"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				likesButText: "Лайки",
				subsButText: "Подписчики",
				warningText: "Если Вы будете отписываться после заработка Диамантов - Вас ожидает ШТРАФ!",

				accBut: "На этот аккаунт",
				nickBut: "По нику",

				linkSubsPh: "Ссылка на профиль",
				diamondsText: "Диаманты",
				startText: "Заказать",

				acceptHeadText: "Подписки не активированы",
				acceptButText: "Активировать",
				acceptMainText: "Активируя накрутку подписчиков, Вы также будете обмениваться подписками при заработке"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Abonnenten",
				warningText: "Sie nach dem Diamantenverdienst unabonnieren werden, werden Sie gestrafft sein!",

				accBut: "Auf diesen Account",
				nickBut: "Nach dem Nick",

				linkSubsPh: "Link des Profils",
				diamondsText: "Diamanten",
				startText: "Bestellen",

				acceptHeadText: "Abonieren sind nicht aktiviert",
				acceptButText: "Aktivieren",
				acceptMainText: "Wenn Sie das Ansteigen der Abonnenten aktivieren, werden Sie  Abonnieren wahrend des Verdienstes tauschen."
			};
			break;
		case Constant.ES_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Suscriptores",
				warningText: "Si se da de baja después de la ganancia de los Diamantes, se le impone una MULTA!",

				accBut: "En esta cuenta",
				nickBut: "Por el nombre",

				linkSubsPh: "Enlace al perfil",
				diamondsText: "Diamantes",
				startText: "Pedir",

				acceptHeadText: "Las suscripciónes no están activadas",
				acceptButText: "Activar",
				acceptMainText: "Ingresando, Ud. habrá que intercambiar las suscripciones, cuando activada la Ganancia de los suscriptores"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				likesButText: "Mentions j’aimes",
				subsButText: "Followers",
				warningText: "Si vous vous desabonnez apres avoir obtenu les Diamonds – Vous recevrez un PENALTY!",

				accBut: "Au ce compte",
				nickBut: "Par un nom de chat",

				linkSubsPh: "Le lien direct vers un profil",
				diamondsText: "Les Diamonds",
				startText: "Ordonner",

				acceptHeadText: "Les followings ne sont pas actives",
				acceptButText: "Activer",
				acceptMainText: "En activant la multiplication de followers vous pourrez egalement echanger des followings avec le revenu"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				likesButText: "Likes",
				subsButText: "Iscritti",
				warningText: "Se vi disiscrivete dopo aver guadagnato i diamanti, verrete MULTATI!",

				accBut: "Su questo account",
				nickBut: "Attraverso il nickname",

				linkSubsPh: "Link al profilo",
				diamondsText: "Diamanti",
				startText: "Ordinare",

				acceptHeadText: "Iscrizioni non attive",
				acceptButText: "Attivare",
				acceptMainText: "Attivando l'aumento di iscritti, voi vi scambierete iscrizioni allo stesso modo mentre guadagnate"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				likesButText: "Beğenmeler",
				subsButText: "Takipçiler",
				warningText: "Diamantlerin kazancından sonra takibi kaldırırsanız- CEZA uygulanır!",

				accBut: "Bu hesaba",
				nickBut: "Nick adı ile ",

				linkSubsPh: "Sayfa linki",
				diamondsText: "Diamantlar",
				startText: "Sipariş et",

				acceptHeadText: "Takip aktivite edilmedi",
				acceptButText: "Çalıştır",
				acceptMainText: "Takipçi kazanmasını aktivite ederek, kazanç sırasında takipleri değişeblirsiniz"
			};
			break;
	}
	return lang;
}

// BID SUBS LANGS
services_lang.service("$bidSubsLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.BID_SUBS_VIEW, function(lang){
			$scope.likesButText = lang.likesButText;
			$scope.subsButText = lang.subsButText;
			$scope.warningText = lang.warningText;

			$scope.accBut = lang.accBut;
			$scope.nickBut = lang.nickBut;

			$scope.linkSubsPh = lang.linkSubsPh;
			$scope.diamondsText = lang.diamondsText;
			$scope.startText = lang.startText;

			$scope.acceptHeadText = lang.acceptHeadText;
			$scope.acceptButText = lang.acceptButText;
			$scope.acceptMainText = lang.acceptMainText;

			$scope.$applyAsync();
		});
	}
}]);