Lang.getBot = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				text: "Diamonds mining"
			};
			break;
		case Constant.UA_LANG:
		case Constant.BE_LANG:
		case Constant.RU_LANG:
			lang = {
				text: "Добыча диамантов"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				text: "Erwerb der Diamanten"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				text: "La extraccion de los diamantes"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				text: "Gain de diamants"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				text: "Produzione dei diamanti"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				text: "Elmas kazan"
			};
			break;
		default:
			lang = {
				text: "Diamonds mining"
			};
	}

	lang.title = Constant.APP_FULL_NAME;
	lang.ticker = Constant.APP_FULL_NAME;

	return lang;
}

Lang.getMessages = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				bidOk: "The order was successful",
				bidFail: "The order failed",
				mhFail: "Can not get a data from the page",
				loginFail: "Authorization failed, check your login and password",
				connectErr: "Connection error, try again",
				readErr: "Connection error, try again",
				writeErr: "Error writing, try again",
				enterNameErr: "Enter a correct name",
				runErr: "Error running, try again",
				stopErr: "Error stopping, try again",
				emailText: "Enter your e-mail address",
				emailErr: "Incorrectly entered email, try again",
				emailOk: "E-mail received",
				donateErr: "Error, try again",
				donateBuyOk: "The purchase was successful",
				donateBuyErr: "Error with a purchase. Please contact us",
				checkoutText: "Checkout",
				verifyErr: "Verification error",
				premiumText: "Premium account",
				activeEarnText: "Mining diamonds is activated",
				newsServerErr: "Error with connecting to server",
				newsServerOk: "OK",

				bidLikesTitle: "Get likes",
				bidSubsTitle: "Get followers",
				tasksTitle: "My tasks",
				donateTitle: "Shop",
				earnTitle: "Diamonds mining",
				newsTitle: "News",
				turboBoughtText: "Owned"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				bidOk: "Заказ оформлен успешно",
				bidFail: "Сделать заказ не удалось",
				mhFail: "Не удалось получить данные с записи",
				loginFail: "Не удалось войти в аккаунт, проверьте логин и пароль",
				connectErr: "Ошибка соединения, попробуйте еще раз",
				readErr: "Ошибка соединения, попробуйте еще раз",
				writeErr: "Ошибка записи, попробуйте еще раз",
				enterNameErr: "Введите корректное имя",
				runErr: "Ошибка запуска, попробуйте еще раз",
				stopErr: "Ошибка остановки, попробуйте еще раз",
				emailText: "Введите свой адресс электронной почты",
				emailErr: "Неправильно введенная почта, попробуйте еще раз",
				emailOk: "Электронная почта принята",
				donateErr: "Произошла ошибка, попробуйте снова",
				donateBuyOk: "Покупка оформлена успешно",
				donateBuyErr: "Произошла ошибка при покупке. Eсли проблема не решится, то напишите в поддержку",
				checkoutText: "Оформление покупки",
				verifyErr: "Ошибка верификации",
				premiumText: "Премиум аккаунт",
				activeEarnText: "Добыча диамантов активирована",
				newsServerErr: "Произошла ошибка при соединении с сервером",
				newsServerOk: "ОК",

				bidLikesTitle: "Получить лайки",
				bidSubsTitle: "Получить подписки",
				tasksTitle: "Мои задания",
				donateTitle: "Магазин",
				earnTitle: "Добыча диамантов",
				newsTitle: "Новости",
				turboBoughtText: "Приобретено"
			};
			break;
		case Constant.DE_LANG:
			lang = {
				bidOk: "Bestellung ist erfolgreich ausgefuehrt",
				bidFail: "es gelang nicht die Bestellung zu machen",
				mhFail: "es gelang nicht das Datenmaterial aus dem Ablegen zu bekommen",
				langFail: "Ist ein Fehler aufgetreten, pruefen Sie Ihr Personalien",
				loginFail: "Verbindungsfehler, pruefen Login und Passwort",
				connectErr: "Verbindungsfehler, pruefen Sie noch einmal",
				readErr: "Verbindungsfehler, pruefen Sie noch einmal",
				writeErr: "Aufnahmefehler, versuchen Sie noch einmal",
				enterNameErr: "Geben Sie einen korrekten Namen ein",
				runErr: "Anlassenfehler, versuchen Sie noch einmal",
				stopErr: "Aussetzerfehler, versuchen Sie noch einmal",
				emailText: "Geben sie ihre E-Mailadresse ein",
				emailErr: "Inkorrestli eingegeben E-Mail, try again",
				emailOk: "E-Mail erhalten",
				captchaErr: "Erfuellen Sie carptcha gehen Sie auf Account ein fur die Fortfuehrung...",
				donateErr: "Ist ein Fehler aufgetreten, versuchen Sie noch einmal",
				donateBuyOk: "Ankaufist erfolgreich ausgestaltet",
				donateBuyErr: "Ist das Problem bei dem Ankauf aufgetreten. Wenn Das Problem nicht geloest wird, schreiben Sie an die Hilfsleistung",
				checkoutText: "Ankauf abfassung",
				verifyErr: "Verifikationsfehler",
				premiumText: "Premiumaccount",
				activeEarnText: "Diamantenerwerb ist aktiviert",
				newsServerErr: "Ist das Problem bei der Serververbindung aufgetreten",
				newsServerOk: "OK",

				bidLikesTitle: "Likes vergroessen",
				bidSubsTitle: "Subskription vergroessen",
				tasksTitle: "Meine Aufgaben",
				donateTitle: "Geschaeft",
				earnTitle: "Diamantenerwerb",
				newsTitle: "Nachrichten",
				turboBoughtText: "gewonnen"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				bidOk: "El encargo esta formalizado con el exito",
				bidFail: "No se pudo hacer el encargo",
				mhFail: "No se pudo recebir la informacion de la grabacion",
				langFail: "Fue un error, compruebe su informacion",
				loginFail: "No se pudo entrar el perfil, compruebe el nombre de usuario y contrasena",
				connectErr: "El error de la conexion, trate otra vez",
				readErr: "El error de la conexion, trate otra vez",
				writeErr: "El error de la  grabacion, trate otra vez",
				enterNameErr: "Introduzca un nombre correcto",
				runErr: "El error del lanzamiento, trate otra vez",
				stopErr: "El error de la pausa, trate otra vez",
				emailText: "Ingrese su dirección de correo electrónico",
				emailErr: "Inkorrestli entró E-mail, try again",
				emailOk: "Correo electrónico recibido",
				captchaErr: "Llene captcha y entre el perfil para continuar...",
				donateErr: "Fue un error, trate otra vez",
				donateBuyOk: "La compra esta formalizado con exito",
				donateBuyErr: "Fue un error durante la compra. Si el problema no sera resuelto, escriba al soporte",
				checkoutText: "Formalizacion de la compra",
				verifyErr: "El error de la verificacion",
				premiumText: "Premium perfil",
				activeEarnText: "La extraccion de los diamantes esta activada",
				newsServerErr: "Fue un error durante la la conexion con el servicio",
				newsServerOk: "OK",

				bidLikesTitle: "Hacer mas me gusta",
				bidSubsTitle: "Hacer mas las suscripciones",
				tasksTitle: "Mis tareas",
				donateTitle: "La tienda",
				earnTitle: "La extraccion de los diamantes",
				newsTitle: "Las noticias",
				turboBoughtText: "Comprado"
			};
			break;
		case Constant.FR_LANG:
			lang = {
				bidOk: "On a reussi a passer une commande",
				bidFail: "On n'a pas reussi a passer une commande",
				mhFail: "Impossible d'obtenir des donnees de l'enregistrement",
				langFail: "Une erreur s'est produite, verifiez vos donnees",
				loginFail: "Impossible de vous connecter a votre compte, verifiez votre identifiant et mot de passe",
				connectErr: "Une erreur de connexion, veuillez reessayer ulterieurement",
				readErr: "Une erreur de connexion, veuillez reessayer ulterieurement",
				writeErr: "Une erreur d'enregistrement, veuillez reessayer ulterieurement",
				enterNameErr: "Entrez un nom correct",
				runErr: "Une erreur de demarrage, veuillez reessayer ulterieurement",
				stopErr: "Une erreur d'arret, veuillez reessayer ulterieurement",
				emailText: "Entrez votre adresse email",
				emailErr: "Inkorrestli entré E-mail, try again",
				emailOk: "Courriel reçu",
				captchaErr: "Remplissez le CAPTCHA et connectez-vous a votre compte pour continuer...",
				donateErr: "Une erreur s'est produite, veuillez reessayer ulterieurement",
				donateBuyOk: "Achat effectue",
				donateBuyErr: "Une erreur d'achat. Si le probleme persiste, ecrivez au service d'assistance",
				checkoutText: "On fait un achat",
				verifyErr: "Erreur de verification",
				premiumText: "Compte premium",
				activeEarnText: "Le gain des diamants est active",
				newsServerErr: "Une erreur s'est produite lors de la connexion au serveur",
				newsServerOk: "OK",

				bidLikesTitle: "Obtenir des comme",
				bidSubsTitle: "Obtenir des abonnements",
				tasksTitle: "Mes taches",
				donateTitle: "Magasin",
				earnTitle: "Gain des diamants",
				newsTitle: "Nouvelles",
				turboBoughtText: "Achete"
			};
			break;
		case Constant.IT_LANG:
			lang = {
				bidOk: "L'ordine è andato a buon fine",
				bidFail: "Non è stato possibile effettuare l'ordine",
				mhFail: "Impossibile ottenere i dati dalla registrazione",
				langFail: "Ci è stato un errore, siete pregati di controllare i vostri dati",
				loginFail: "Non è stato possibile accedere all'account, controllate il login e la password",
				connectErr: "Errore di collegamento, provi un altra volta",
				readErr: "Errore di collegamento, provi un altra volta",
				writeErr: "Errore di scrittura, provi un altra volta",
				enterNameErr: "Inserire un nome corretto",
				runErr: "Impossibile avviare, provi un altra volta",
				stopErr: "Errore di arresto, provi un altra volta",
				emailText: "Inserisci il tuo indirizzo email",
				emailErr: "Inkorrestli entrato e-mail, try again",
				emailOk: "E-mail ricevute",
				captchaErr: "Compilate e entrate nel vostro account per continuare...",
				donateErr: "Ci è stato un errore, riprovi un altra volta",
				donateBuyOk: "L'ordine è andato a buon fine",
				donateBuyErr: "Ci è stato un errore durante l'acquisto. Se il problema non si risolve, è pregato di contattarci",
				checkoutText: "L'acquisto",
				verifyErr: "L'errore della verifica",
				premiumText: "Premium account",
				activeEarnText: "Produzione dei diamanti è stata attivata",
				newsServerErr: "Si è verificato un errore durante la connessione al server",
				newsServerOk: "OK",

				bidLikesTitle: "Truccare i likes",
				bidSubsTitle: "Truccare gli abbonamenti",
				tasksTitle: "I miei compiti",
				donateTitle: "Negozio",
				earnTitle: "Produzione dei diamanti",
				newsTitle: "Notizie",
				turboBoughtText: "è stato acquistato"
			};
			break;
		case Constant.TR_LANG:
			lang = {
				bidOk: "Sipariş yapdınız",
				bidFail: "Sipariş yapamadınız",
				mhFail: "Kayıt veri alınamadı",
				langFail: "Bir hata oluştu, verilerinizi kontrol edin",
				loginFail: "Hesabınıza erişmek için kullanıcı adı ve şifre kontrol edilemiyor",
				connectErr: "Bağlantı Hatası, tekrar deneyin",
				readErr: "Bağlantı Hatası, tekrar deneyin",
				writeErr: "Hata yazın tekrar deneyin",
				enterNameErr: "Doğru adı girin",
				runErr: "Hatayı çalıştırmak, yeniden deneyin",
				stopErr: "Dur hatası, tekrar deneyin",
				emailText: "Email adresinizi giriniz",
				emailErr: "Inkorrestli E-mail girdi, try again",
				emailOk: "e-posta alındı",
				captchaErr: "Captcha doldurun ve devam etmek için oturum açın ...",
				donateErr: "Bir hata oluştu, lütfen tekrar deneyin",
				donateBuyOk: "Siparişınız hazır",
				donateBuyErr: "Satın alırken bir hata oluştu. Sorun çözülmezse, bize yazılın",
				checkoutText: "Kayıt satın alınan malı",
				verifyErr: "Hata",
				premiumText: "Premium hesap",
				activeEarnText: "Madencilik elmas aktive",
				newsServerErr: "Sunucuya bağlanırken bir hata oluştu",
				newsServerOk: "OK",

				bidLikesTitle: "Like kazan",
				bidSubsTitle: "Takipçi kazan",
				tasksTitle: "Benim işler",
				donateTitle: "Mağaza",
				earnTitle: "Elmas kazan",
				newsTitle: "Haberler",
				turboBoughtText: "Alındı"
			};
			break;
	}
	return lang;
}

Lang.getCorrects = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				enterLink: "Enter a link on Instagram page",
				emptyLink: "Enter a link on Instagram page",
				notExistLink: "Incorrect link, try again",
				noCoins: "You don't have enough diamonds",
				errNegative: "The number can not be negative or zero",
				errNumber: "Enter a number",
				minMaxLikes: "A number must be from " + Constant.MIN_COUNT_LIKE + " to " + Constant.MAX_COUNT_LIKE + "",
				minMaxSubs: "A number must be from " + Constant.MIN_COUNT_SUBS + " to " + Constant.MAX_COUNT_SUBS + "",
				minMaxPremLikes: "A number must be from 1 to " + Constant.MAX_PREM_COUNT_LIKE + "",
				minMaxPremSubs: "A number must be from 1 to " + Constant.MAX_PREM_COUNT_SUBS + ""
			};
			break;
		case Constant.RU_LANG:
			lang = {
				enterLink: "Введите ссылку на страницу Instagram",
				emptyLink: "Введите ссылку на страницу Instagram",
				notExistLink: "Неверная ссылка, попробуйте заново",
				noCoins: "У вас не достаточно диамантов",
				errNegative: "Число не может быть отрицательным или равным нулю",
				errNumber: "Введите число",
				minMaxLikes: "Вводимое число должно быть от " + Constant.MIN_COUNT_LIKE + " до " + Constant.MAX_COUNT_LIKE + "",
				minMaxSubs: "Вводимое число должно быть от " + Constant.MIN_COUNT_SUBS + " до " + Constant.MAX_COUNT_SUBS + "",
				minMaxPremLikes: "Вводимое число должно быть от 1 до " + Constant.MAX_PREM_COUNT_LIKE + "",
				minMaxPremSubs: "Вводимое число должно быть от 1 до " + Constant.MAX_PREM_COUNT_SUBS + ""
			};
			break;
		case Constant.DE_LANG:
			lang = {
				enterLink: "Fueheren Sie den Link auf die Seite Instagram zu",
				emptyLink: "Fueheren Sie den Link auf die Seite Instagram zu",
				notExistLink: "Falscher link, versuchen Sie andere",
				noCoins: "Sie haben nicht genug Diamanten",
				errNegative: "Zahl kann nicht minder als null sein oder gleich Null ist",
				errNumber: "Fuehren Sie die Zahl zu",
				minMaxLikes: "Zufueherende Zahl muss von " + Constant.MIN_COUNT_LIKE + " bis " + Constant.MAX_COUNT_LIKE + " sein",
				minMaxSubs: "Zufueherende Zahl muss von " + Constant.MIN_COUNT_SUBS + " bis " + Constant.MAX_COUNT_SUBS + " sein",
				minMaxPremLikes: "Zufueherende Zahl muss von 1 bis " + Constant.MAX_PREM_COUNT_LIKE + " sein",
				minMaxPremSubs: "Zufueherende Zahl muss von 1 bis " + Constant.MAX_PREM_COUNT_SUBS + " sein"
			};
			break;
		case Constant.ES_LANG:
			lang = {
				enterLink: "Inserte enlace a la pagina Instagram",
				emptyLink: "Inserte enlace a la pagina Instagram",
				notExistLink: "Enlace incorrecta, trate una otra",
				noCoins: "No tienes los diamantes suficiente",
				errNegative: "El numero no puede ser menor que cero o igual a cero",
				errNumber: "Inserte el numero",
				minMaxLikes: "El numero introducido debe ser y " + Constant.MIN_COUNT_LIKE + " a " + Constant.MAX_COUNT_LIKE + "",
				minMaxSubs: "El numero introducido debe ser y " + Constant.MIN_COUNT_SUBS + " a " + Constant.MAX_COUNT_SUBS + "",
				minMaxPremLikes: "El numero introducido debe ser y 1 a " + Constant.MAX_PREM_COUNT_LIKE + "",
				minMaxPremSubs: "El numero introducido debe ser y 1 a " + Constant.MAX_PREM_COUNT_SUBS + ""
			};
			break;
		case Constant.FR_LANG:
			lang = {
				enterLink: "Saisissez le lien de la page Instagram",
				emptyLink: "Saisissez le lien de la page Instagram",
				notExistLink: "Lien incorrect, essayez un autre lien",
				noCoins: "Vous n'avez pas assez de diamants",
				errNegative: "Le nombre ne peut etre inferieur a zero ou égal à zéro",
				errNumber: "Saisissez un nombre",
				minMaxLikes: "Le nombre saisi doit etre de " + Constant.MIN_COUNT_LIKE + " a " + Constant.MAX_COUNT_LIKE + "",
				minMaxSubs: "Le nombre saisi doit etre de " + Constant.MIN_COUNT_SUBS + " a " + Constant.MAX_COUNT_SUBS + "",
				minMaxPremLikes: "Le nombre saisi doit etre de 1 a " + Constant.MAX_PREM_COUNT_LIKE + "",
				minMaxPremSubs: "Le nombre saisi doit etre de 1 a " + Constant.MAX_PREM_COUNT_SUBS + ""
			};
			break;
		case Constant.IT_LANG:
			lang = {
				enterLink: "Digita il collegamento sulla pagina Instagram",
				emptyLink: "Digita il collegamento sulla pagina Instagram",
				notExistLink: "Collegamento errato, prova un altro collegamento",
				noCoins: "La quantità dei vostri diamanti non è sufficiente",
				errNegative: "La cifra non può essere meno di zero o uguale a zero",
				errNumber: "Digita il numero",
				minMaxLikes: "Il numero deve essere da " + Constant.MIN_COUNT_LIKE + " a " + Constant.MAX_COUNT_LIKE + "",
				minMaxSubs: "Il numero deve essere da " + Constant.MIN_COUNT_SUBS + " a " + Constant.MAX_COUNT_SUBS + "",
				minMaxPremLikes: "Il numero deve essere da 1 a " + Constant.MAX_PREM_COUNT_LIKE + "",
				minMaxPremSubs: "Il numero deve essere da 1 a " + Constant.MAX_PREM_COUNT_SUBS + ""
			};
			break;
		case Constant.TR_LANG:
			lang = {
				enterLink: "Instagram linkini giriniz",
				emptyLink: "Instagram linkini giriniz",
				notExistLink: "yanlış bağlantı, başka bir link deneyin",
				noCoins: "Elmas eksik",
				errNegative: "Sayı sıfırdan küçük olamaz eşit veya sıfıra",
				errNumber: "Sayıları yazın",
				minMaxLikes: "Girilen numara " + Constant.MIN_COUNT_LIKE + " için " + Constant.MAX_COUNT_LIKE + "den olmalıdır",
				minMaxSubs: "Girilen numara " + Constant.MIN_COUNT_SUBS + " için " + Constant.MAX_COUNT_SUBS + "den olmalıdır",
				minMaxPremLikes: "1 " + Constant.MAX_PREM_COUNT_LIKE + " olmalıdır sayı",
				minMaxPremSubs: "1 " + Constant.MAX_PREM_COUNT_SUBS + " olmalıdır sayı"
			};
			break;
	}
	return lang;
}