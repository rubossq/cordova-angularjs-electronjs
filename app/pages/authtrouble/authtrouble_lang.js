Lang.getAuthTrouble = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				backText: "Authorization troubles",
				stepOneText: "Step 1",
				stepOneContent: "Click on the 'Authorization' button",
				stepTwoText: "Step 2",
				stepTwoContent: "Log in by your account Instagram opened through the browser",
				stepThreeText: "Step 3",
				stepThreeContent: "After you have logged into your account Instagram - browser must close in a few seconds and you'll redirect to the home page of application. If the browser will not close - close it - just click on the X in the upper right corner.",
				goodInetText: "*You must have a good Internet connection",
				problemText: "If you still can't log in:",
				problemListText: "If you cound't log in the first time",
				problemOneText: "try one more time",
				problemTwoText: "try restart the application",
				problemThreeText: "try to reinstall the application",
				nothingText: "If above suggestions will not help you",
				feedBackButText: "Feedback us"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				backText: "Проблемы с авторизацией",
				stepOneText: "Шаг 1",
				stepOneContent: "Нажмите на кнопку “Авторизация”",
				stepTwoText: "Шаг 2",
				stepTwoContent: "Авторизируйтесь в вашем аккаунте Instagram через открывшийся браузер любым способом",
				stepThreeText: "Шаг 3",
				stepThreeContent: "После того как вы зашли на свой аккаунт Instagram - браузер должен закрытся через несколько секунд и вы перейдете на главную страницу приложения. Если браузер не закрылся - закройте его самостоятельно, нажав на крестик в правом верхнем углу.",
				goodInetText: "*У Вас должно быть хорошее интернет соединение",
				problemText: "В случае проблемы:",
				problemListText: "Если вам не удалось зайти с первого раза",
				problemOneText: "повторите попытку",
				problemTwoText: "попробуйте перезапустить приложение на телефоне и заново войти",
				problemThreeText: "переустановите приложение",
				nothingText: "Если ни один из советов вам не помог",
				feedBackButText: "Связаться с нами"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				backText: "Authorisierungs problemme",
				stepOneText: "Schritt 1",
				stepOneContent: 'Drucken Sie die Taste "Authorisierung"',
				stepTwoText: "Schritt 2",
				stepTwoContent: "Authorisieren Sie sich in ihrem Account Instagram durch den offenden Brauser auf jede Weise",
				stepThreeText: "Schritt 3",
				stepThreeContent: "Nach dem Sie auf Iheren Account Instagram zugegriffen haben — Brauser soll geschlossen werden nach einigen Sekunden und Sie uebergehen an die Hauptseite der App. Wenn der Brauser nicht geschlossen ist, schliessen ihn selbststandig.",
				goodInetText: "*Sie sollen iene gute Internetverbindung haben",
				problemText: "Problem falls:",
				problemListText: "Wenn der eEintritt auf den ersten Anhieb fehgeschlug",
				problemOneText: "wiederholen Sie noch einmal",
				problemTwoText: "neustarten Sie die App Auf dem Handy und wieder einloggen",
				problemThreeText: "nachinstallieren Sie die App",
				nothingText: "Wen menge Ratschlage halfen Ihnen",
				feedBackButText: "erreichen Sie uns"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				backText: "Los problemas con autorizacion",
				stepOneText: "Paso 1",
				stepOneContent: 'Haga clic en el boton "autorizacion"',
				stepTwoText: "Paso 2",
				stepTwoContent: "Autoricese en su perfil Instagram a traves del navegator abierto por algun metodo",
				stepThreeText: "Paso 3",
				stepThreeContent: "Despues de que ustes entra su perfil en Instagram-el navegator debe que cerrar a traves de algunes menudos y usted pasara a la pagina principial de la la aplicacion.Si el navegator no cierre, cierrelo haciendo clic en la cruz en la esquina superior derecha.",
				goodInetText: "*Usted tiene la internet conexion buena",
				problemText: "En el caso del problema:",
				problemListText: "Si no puede entrar por la primera vez",
				problemOneText: "Repita el intento",
				problemTwoText: "Trate reiniciar la aplicacion en el telefono y entrar otra vez",
				problemThreeText: "Vuelva a instalar la aplicacion",
				nothingText: "si ningun consejo no se ayuda",
				feedBackButText: "ponerse en contacto con nosotros"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				backText: "Probleme d'autorisation",
				stepOneText: "Etape 1",
				stepOneContent: "Presser sur le bouton 'Autorisation'",
				stepTwoText: "Etape 2",
				stepTwoContent: "Connectez-vous a votre profil Instagram par le navigateur",
				stepThreeText: "Etape 3",
				stepThreeContent: "Une fois que vous vous etes connecte a votre profil Instagram, le navigateur doit se fermer au bout de quelques secondes et vous serez redirige vers la page d'accueil de l'application. Si le navigateur n'est pas ferme, fermez-le vous-meme en cliquant sur la croix en haut a droite.",
				goodInetText: "*Vous devez avoir une bonne connexion internet",
				problemText: "En cas de probleme:",
				problemListText: "Si vous n'avez pas reussi a vous connecter du premier coup",
				problemOneText: "essayez a nouveau",
				problemTwoText: "Essayez de redemarrer l'application et de vous reconnecter",
				problemThreeText: "Reinstallez l'application",
				nothingText: "Si aucun de ces conseils ne vous a aide",
				feedBackButText: "contactez-nous"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				backText: "problemi con l'autorizzazione",
				stepOneText: "Passo 1",
				stepOneContent: "schiaccia il pulsante 'autorizzazione'",
				stepTwoText: "Passo 2",
				stepTwoContent: "autorizzatevi con il vostro account Instagram tramite il browser aperto in qualche modo",
				stepThreeText: "Passo 3",
				stepThreeContent: "Una volta effettuato l'accesso al proprio account Instagram - il browser si dovrebbe chiudere dopo quache secondo e lei sarà portato sulla home dell'applicazione. Se il browser non si è chiuso – chiudetelo da soli cliccando sulla X in alto a destra.",
				goodInetText: "*Deve avere una buona connessione a internet",
				problemText: "In caso di problemi:",
				problemListText: "Se non siete riusciti ad entrare alla prima volta",
				problemOneText: "fai un altro tentativo",
				problemTwoText: "provi ad riavviare l'app sul telefono e entrare di nuovo",
				problemThreeText: "reinstalla l'app",
				nothingText: "se nessuno dei consigli non l'ha aiutata",
				feedBackButText: "contatta noi"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				backText: "Yetki ile ilgili sorunlar",
				stepOneText: "1 Aşama",
				stepOneContent: "Üye ol tıklayın",
				stepTwoText: "2 Aşama",
				stepTwoContent: "Hesabınız Instagram herhangi bir şekilde tarayıcısı üzerinden girin",
				stepThreeText: "3 Aşama",
				stepThreeContent: "Hesabınıza Instagram için giriş yaptıktan sonra - tarayıcı birkaç saniye sonra kapatmalısınız ve ana sayfa uygulamasına yönlendirilirsiniz. Tarayıcınız kapalı değilse - sağ üst köşedeki X tıklayarak kendiniz kapatın.",
				goodInetText: "*İyi bir İnternet bağlantınız olmalıdır",
				problemText: "Problem olduğunda:",
				problemListText: "Birinci kez giremezseniz",
				problemOneText: "tekrar deneyin",
				problemTwoText: "telefonunuz ve uygulamayı yeniden denemek yeniden girmek",
				problemThreeText: "uygulamayı yenile",
				nothingText: "Eğer yardımcı olmadıysa",
				feedBackButText: "Bizimle itibare geçin"
			};
			break;
	}
	return lang;
}

// AUTH TROUBLE LANGS
services_lang.service("$authTroubleLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.AUTHTROUBLE_VIEW, function(lang){
			$scope.backText = lang.backText;
			$scope.stepOneText = lang.stepOneText;
			$scope.stepOneContent = lang.stepOneContent;
			$scope.stepTwoText = lang.stepTwoText;
			$scope.stepTwoContent = lang.stepTwoContent;
			$scope.stepThreeText = lang.stepThreeText;
			$scope.stepThreeContent = lang.stepThreeContent;
			$scope.goodInetText = lang.goodInetText;
			$scope.problemText = lang.problemText;
			$scope.problemListText = lang.problemListText;
			$scope.problemOneText = lang.problemOneText;
			$scope.problemTwoText = lang.problemTwoText;
			$scope.problemThreeText = lang.problemThreeText;
			$scope.nothingText = lang.nothingText;
			$scope.feedBackButText = lang.feedBackButText;

			$scope.$applyAsync();
		});
	}
}]);