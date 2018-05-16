function Constant(){}

Constant.ANDROID_DEVICE = 1;
Constant.IOS_DEVICE = 2;
Constant.WINDOWS_DEVICE = 3;
Constant.MAC_DEVICE = 4;


Constant.LIKE_TYPE = 1;
Constant.SUBSCRIBE_TYPE = 2;

Constant.CONSUMABLE_TYPE = 1;
Constant.SUBSCRIPTION_TYPE = 2;

Constant.PW = 1;
Constant.LQ = 2;
Constant.CUR_PAY_SYSTEM = Constant.PW;

Constant.LIKES_LINK_IDENTIFIER = "/p/";								// identifier in link for likes on posts or videos

Constant.LIKE_PRICE = 3;
Constant.SUBSCRIBE_PRICE = 4;
Constant.SUBSCRIBE_MIN_BID = 0;
Constant.LIKE_MIN_BID = 0;

Constant.MIN_COUNT_LIKE = 5;										// min count of input likes
Constant.MIN_COUNT_SUBS = 10;										// min count of input subs
Constant.MAX_COUNT_LIKE = 500;										// max count of input likes
Constant.MAX_COUNT_SUBS = 500;										// max count of input subs
Constant.MAX_PREM_COUNT_LIKE = 50000;								// max count of input likes for premium
Constant.MAX_PREM_COUNT_SUBS = 10000;								// max count of input subs for premium

Constant.BOSS_SPEED_UP_X = 10;
Constant.BOSS_SPEED_UP_TASKS_NUM = 10;

Constant.IN_LOGIN = 2;
Constant.IN_ACC = 1;
Constant.IN_PRELOGIN = 3;
Constant.WAIT_JS_FORM_TIME = 1000;

Constant.HOME_PART = "";
Constant.LOGIN_PART = "login";
Constant.ACCOUNT_PART = "accounts";
Constant.ABOUT_PART = "about";
Constant.WALL_PART = "wall";
Constant.SETTINGS_PART = "settings";
Constant.PROMOTIONS_PART = "promotions";

//task statuses
Constant.ACTIVE_TASK_STATUS = 0;
Constant.READY_TASK_STATUS = 1;
Constant.FROZEN_TASK_STATUS = 2;
Constant.HANG_TASK_STATUS = 3;

Constant.NULL_ACTION = 0;
Constant.AUTH_ACTION = 1;
Constant.LOGOUT_ACTION = 2;
Constant.INIT_ACTION = 3;
Constant.PROMOTIONS_ACTION = 4;
Constant.GET_INFO_ACTION = 5;
Constant.GET_MH_ACTION = 6;
Constant.LIKE_ACTION = 7;
Constant.SUBSCRIBE_ACTION = 8;
Constant.SHOW_ACTION = 9;
Constant.MORE_FIELDS_ACTION = 10;
Constant.GET_USER_DATA_ACTION = 11;

Constant.SQL_DB = "famous.db";
Constant.USERS_TABLE = "users";
Constant.LIKES_TABLE = "likes";
Constant.SUBSCRIBES_TABLE = "subscribes";
Constant.SETTINGS_TABLE = "settings";
Constant.DATAS_TABLE = "datas";
Constant.TUTORIALS_TABLE = "tutorials";

Constant.LIKE_LIMIT = 40;					//overwrite in user set config
Constant.LIKE_MAX_PER_PULL = 5;				//maximum tasks per pull
Constant.LIKE_LIMIT_TIME = 3600;			//seconds
Constant.LIKE_LIMIT_TIME_FAST = 60;
Constant.REMOVE_LIKE_DELAY = 604800;		//7 days in seconds

Constant.SUBSCRIBE_LIMIT = 30;				//overwrite in user set config
Constant.SUBSCRIBE_MAX_PER_PULL = 5;		//maximum tasks per pull
Constant.SUBSCRIBE_LIMIT_TIME = 3600;		//seconds
Constant.SUBSCRIBE_LIMIT_TIME_FAST = 60;
Constant.REMOVE_SUBSCRIBE_DELAY = 2419200;		//28 days in seconds

Constant.MIN_FAST_HOURS = 1;

Constant.AUTOTASK_MIN_LIMIT = 10;
Constant.AUTOTASK_MAX_LIMIT = 1000;
Constant.AUTOTASK_MAX_LIMIT_PREM = 5000;

Constant.MORE_FIELDS_LIMIT = 13;

Constant.TT_AUTH = 1;
Constant.VK_AUTH = 2;
Constant.BASE_AUTH = 3;
Constant.FB_AUTH = 4;

Constant.BOT = 1;
Constant.BROWSER = 2;

Constant.READY_STATUS = 1;
Constant.WORKING_STATUS = 2;

/* Action's execute time in milliseconds */
Constant.LOGIN_BASE_TIME = 20000;
Constant.LOGIN_BASE_STUPID_DEVICE = 5000;
Constant.LOGIN_VK_TIME = 35000;
Constant.LOGIN_TT_TIME = 45000;
Constant.LOGIN_FB_TIME = 30000;
Constant.LOGOUT_TIME = 15000;
Constant.PROMOTIONS_TIME = 5000;
Constant.GET_INFO_TIME = 20000;
Constant.GET_MH_TIME = 10000;
Constant.GET_USER_DATA_TIME = 10000;
Constant.INITIALIZE_TIME = 15000;
Constant.LIKE_TIME = 10000;
Constant.SUBSCRIBE_TIME = 10000;
Constant.SHOW_TIME = 2000;
Constant.CLEAR_TIMEOUT = 4000;
Constant.PAY_DEMON_TIME = 60000;
Constant.PAY_DEMON_TURBO_1_TIME = 45000;
Constant.PAY_DEMON_TURBO_2_TIME = 30000;
Constant.PAY_DEMON_TURBO_3_TIME = 20000;
Constant.TRY_RUN_CYCLE_INTERVAL = 60000;
Constant.TRY_RUN_CYCLE_INTERVAL_FAST = 5000;
Constant.SHOW_RUN_QUEST_INTERVAL = 1000;
Constant.GET_USER_DATA_TIMEOUT = 1111;
Constant.EMPTY_QUESTS_INTERVAL = 30000;

Constant.LIMIT_WAIT_TIME = 35000;

Constant.STAY_SAFE_USER_TIME = 3600;	//sec

Constant.CHECK_CAPTCHA_TIME = 7000;
Constant.CHECK_CAPTCHA_VK_TIME = 2000;
Constant.WAIT_STORE_TIME = 5000;
Constant.GET_INFO_CHECK_INTERVAL = 800;
Constant.ACTION_CHECK_INTERVAL = 800;
Constant.RELOAD_ACTION_TIME = 30000;

Constant.GET_QUESTS_MIN_TIME = 500;	//10000
Constant.GET_QUESTS_MAX_TIME = 2000;	//30000

Constant.GET_QUESTS_MIN_TIME_FAST = 200;	//10000
Constant.GET_QUESTS_MAX_TIME_FAST = 600;	//30000

Constant.AD_TIMEOUT_BEGIN = 10000;		//10000
Constant.AD_INTERVAL_START = 20000;  //20000
Constant.AD_INTERVAL = 60000; 	//60000

Constant.CLOSE_DB_TIMEOUT = 2000;
Constant.CLOSE_DB_TIMEOUT_BIG = 3000;
Constant.INJECT_SCRIPT_TIMEOUT = 500;

Constant.REQUEST_CONNECTION_TIME = 2000; //30000
Constant.MAX_REQUESTS_CONNECTION = 10; //30000

Constant.CRITICAL_LOADING_TIME = 30000;
Constant.TOAST_TIME = 4000;	// toast delay

Constant.maxSpeed = 10;


Constant.OK_STATUS = "ok";
Constant.OK_STATUS_IN = "ok_in";
Constant.ERR_STATUS = "err";

Constant.SECURE_CIPHER = "rijndael-128";
Constant.SECURE_KEY = "78938611560012835340767891904716";
Constant.SECURE_MODE = "cbc";
Constant.SECURE_IV = "1234567891123456";

Constant.EN_LANG = "en";
Constant.RU_LANG = "ru";
Constant.UA_LANG = "uk";
Constant.BE_LANG = "be";
Constant.DE_LANG = "de";
Constant.ES_LANG = "es";
Constant.FR_LANG = "fr";
Constant.IT_LANG = "it";
Constant.TR_LANG = "tr";

Constant.AD_MOB_MODE = "mob";
Constant.AD_MINE_MODE = "mine";

Constant.LOGIN_VIEW = 1;
Constant.MAIN_VIEW = 2;
Constant.TASKS_VIEW = 3;
Constant.EARN_VIEW = 4;
Constant.BID_LIKE_VIEW = 5;
Constant.BID_SUBS_VIEW = 6;
Constant.NAV_VIEW = 7;
Constant.DONATE_VIEW = 8;
Constant.DONATEVIP_VIEW = 9;
Constant.SETTINGS_VIEW = 10;
Constant.DIALOG_VIEW = 11;
Constant.BOT_VIEW = 12;
Constant.MESSAGES_VIEW = 13;
Constant.CORRECT_VIEW = 14;
Constant.AUTHTROUBLE_VIEW = 15;
Constant.TOP_VIEW = 16;
Constant.LVLPRIZE_VIEW = 17;
Constant.MINEAD_VIEW = 18;
Constant.PAYMENTWALL_VIEW = 19;
Constant.LIQPAY_VIEW = 20;
Constant.PURCHASE_VIEW = 21;
Constant.NEWS_VIEW = 22;
Constant.OTHERACC_VIEW = 23;
Constant.LONGTAB_VIEW = 24;
Constant.AUTOTASK_VIEW = 25;
Constant.REFERRAL_VIEW = 26;
Constant.REFERRAL_INFO_VIEW = 27;
Constant.CAPTCHA_VIEW = 28;

//viewses height
Constant.MAJOR_VIEW = 96;
Constant.MINOR_VIEW = 56;
Constant.IOS_HEIGHT_MINUS = 20;
Constant.DESKTOP_VIEW = 80;

// top users places prizes
Constant.TOP_PLACE_FIRST = 1;
Constant.TOP_PLACE_SECOND = 2;
Constant.TOP_PLACE_THIRD = 3;
Constant.TOP_PLACE_FOURTH = 4;
Constant.TOP_PLACE_FIFTH = 5;

// top users places num prizes
Constant.TOP_PLACE_FIRST_NUM = 500;
Constant.TOP_PLACE_SECOND_NUM = 400;
Constant.TOP_PLACE_THIRD_NUM = 300;
Constant.TOP_PLACE_FOURTH_NUM = 200;
Constant.TOP_PLACE_FIFTH_NUM = 100;

//browser's errors 1 - 100
Constant.ERR_CODE_BROWSER_AUTH = 1;				// auth error
Constant.ERR_CODE_BROWSER_INFO = 2;				// get user info error
Constant.ERR_CODE_BROWSER_UPDATE = 3;			// user info update
Constant.ERR_CODE_BROWSER_LOGOUT = 4;			// user logout
Constant.ERR_CODE_BROWSER_BID = 5;				// page bid
Constant.ERR_CODE_BROWSER_CAPTCHA_ASK = 6;		// ask captcha
Constant.ERR_CODE_BROWSER_REINIT = 7;			// reinit browser
Constant.ERR_CODE_BROWSER_LOGIN_BEFORE = 8;		// already in acc
Constant.ERR_CODE_BROWSER_UNKNOWN = 9;			// unknown error
Constant.ERR_CODE_BROWSER_CLOSED = 10;			// closed before action done
Constant.ERR_CODE_BROWSER_PRIVATE = 11;			// private acc link like

//connector's errors 101 - 200
Constant.ERR_CODE_CONNECTOR_AUTH = 101;			// auth server error
Constant.ERR_CODE_CONNECTOR_UPDATE = 102;		// update server err
Constant.ERR_CODE_CONNECTOR_LOGOUT = 103;		// logout server
Constant.ERR_CODE_CONNECTOR_TASKS = 104;		// tasks server
Constant.ERR_CODE_CONNECTOR_BID = 105;			// bid server
Constant.ERR_CODE_CONNECTOR_DELETE = 106;		// delete server
Constant.ERR_CODE_CONNECTOR_NEWS = 107;			// get news err
Constant.ERR_CODE_CONNECTOR_COMPLETE = 108;		// complete error
Constant.ERR_CODE_CONNECTOR_TOP = 109;			// get top error
Constant.ERR_CODE_CONNECTOR_CONNECTION = 110;	// auth server error
Constant.ERR_CODE_CONNECTOR_INFO = 111;	// auth server error

//another errors 201 - 300
Constant.ERR_CODE_DATA_LOAD = 201;				// datamanager load data error
Constant.ERR_CODE_DATA_CLEAR = 202;				// datamanager clear data error
Constant.ERR_CODE_DATA_SAVE = 203;				// datamanager save data error
Constant.ERR_CODE_LOAD_STORE = 204;				// load store data

//bot's errors 301-400
Constant.ERR_CODE_BOT_RUN = 301;				// run bot error
Constant.ERR_CODE_BOT_STOP = 302;				// stop bot error
Constant.ERR_CODE_BOT_BEFORE = 303;				// task was done early
Constant.ERR_CODE_BOT_NOPE = 304;				// element for quest does not exist on page
Constant.ERR_CODE_BOT_LIMIT = 305;				// limit error