Lang.getTasks = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				likesText: "Likes",
				followersText: "Followers",
				ofText: "of",
				tasksNoQuestText: "You have no tasks yet",
				tasksNoQuestLink: "ADD A TASK",
				frozenText: "Task is been checked",
				hangText: "Task check required",
				deleteTaskHead: "CONFIRM DELETE",
				deleteTaskCancel: "Cancel",
				deleteTaskConfirm: "Delete"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				likesText: "Лайки",
				followersText: "Подписки",
				ofText: "из",
				tasksNoQuestText: "У Вас пока нет ни одного задания",
				tasksNoQuestLink: "ДОБАВИТЬ ЗАДАНИЕ",
				frozenText: "Задание проверяется",
				hangText: "Требуется проверка задания",
				deleteTaskHead: "ПОДТВЕРДИТЬ УДАЛЕНИЕ",
				deleteTaskCancel: "Отмена",
				deleteTaskConfirm: "Удалить"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				likesText: "Likes",
				followersText: "Followers",
				ofText: "von",
				tasksNoQuestText: "Sie haben noch keine Aufgaben",
				tasksNoQuestLink: "FÜGEN SIE EINE NEUE AUFGABE",
				frozenText: "Quest-geprüft",
				hangText: "erforderlichen Verifikationsaufgaben",
				deleteTaskHead: "LÖSCHEN BESTÄTIGEN",
				deleteTaskCancel: "Stornieren",
				deleteTaskConfirm: "Löschen"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				likesText: "Me gusta",
				followersText: "los Suscriptores",
				ofText: "de",
				tasksNoQuestText: "No tiene ninguna tarea todavia",
				tasksNoQuestLink: "AÑADIR UNA TAREA",
				frozenText: "búsqueda comprobado",
				hangText: "Requiere tareas de verificación",
				deleteTaskHead: "CONFIRMAR ELIMINACIÓN",
				deleteTaskCancel: "Cancelar",
				deleteTaskConfirm: "Borrar"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				likesText: "Comme",
				followersText: "Abonnes",
				ofText: "de",
				tasksNoQuestText: "Vous n'avez pas encore de taches",
				tasksNoQuestLink: "AJOUTER UNE TÂCHE",
				frozenText: "Quête vérifié",
				hangText: "Nécessite des tâches de vérification",
				deleteTaskHead: "CONFIRMATION DE LA SUPPRESSION",
				deleteTaskCancel: "Annuler",
				deleteTaskConfirm: "Effacer"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				likesText: "dei Likes",
				followersText: "dei Abbonati",
				ofText: "con",
				tasksNoQuestText: "Lei per ora non ha nessun compito",
				tasksNoQuestLink: "AGGIUNGERE UN'ATTIVITÁ",
				frozenText: "Quest controllato",
				hangText: "Richiede compiti di verifica",
				deleteTaskHead: "CONFERMA CANCELLAZIONE",
				deleteTaskCancel: "Annulla",
				deleteTaskConfirm: "Cancellare"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				likesText: "Like lar",
				followersText: "Takipçileri",
				ofText: "itibaren",
				tasksNoQuestText: "herhangi bir işiniz yok",
				tasksNoQuestLink: "BIR GÖREV EKLEMEK",
				frozenText: "Görev kontrol",
				hangText: "Doğrulama görevleri gerektirir",
				deleteTaskHead: "SİLMEYİ ONAYLA",
				deleteTaskCancel: "İptal etmek",
				deleteTaskConfirm: "Silmek"
			};
			break;
	}
	return lang;
}

// TASKS LANGS
services_lang.service("$tasksLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.TASKS_VIEW, function(lang){
			$scope.likesText = lang.likesText;
			$scope.followersText = lang.followersText;
			$scope.ofText = lang.ofText;
			$scope.tasksNoQuestText = lang.tasksNoQuestText;
			$scope.tasksNoQuestLink = lang.tasksNoQuestLink;
			$scope.frozenText = lang.frozenText;
			$scope.hangText = lang.hangText;
			$scope.deleteTaskHead = lang.deleteTaskHead;
			$scope.deleteTaskCancel = lang.deleteTaskCancel;
			$scope.deleteTaskConfirm = lang.deleteTaskConfirm;

			$scope.$applyAsync();
		});
	}
}]);