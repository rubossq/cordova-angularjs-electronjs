function Lang(){}

Lang.getLang = function(lang_code, view){
	var lang = null;
	switch(view){
		case Constant.LOGIN_VIEW:
			lang = Lang.getLogin(lang_code);
			break;
		case Constant.NEWS_VIEW:
			lang = Lang.getNews(lang_code);
			break;
		case Constant.MAIN_VIEW:
			lang = Lang.getMain(lang_code);
			break;
		case Constant.TASKS_VIEW:
			lang = Lang.getTasks(lang_code);
			break;
		case Constant.EARN_VIEW:
			lang = Lang.getEarn(lang_code);
			break;
		case Constant.BID_LIKE_VIEW:
			lang = Lang.getBidLike(lang_code);
			break;
		case Constant.BID_SUBS_VIEW:
			lang = Lang.getBidSubs(lang_code);
			break;
		case Constant.NAV_VIEW:
			lang = Lang.getNav(lang_code);
			break;
		case Constant.DONATE_VIEW:
			lang = Lang.getDonate(lang_code);
			break;
		case Constant.DONATEVIP_VIEW:
			lang = Lang.getDonateVip(lang_code);
			break;
		case Constant.SETTINGS_VIEW:
			lang = Lang.getSettings(lang_code);
			break;
		case Constant.DIALOG_VIEW:
			lang = Lang.getDialog(lang_code);
			break;
		case Constant.BOT_VIEW:
			lang = Lang.getBot(lang_code);
			break;
		case Constant.MESSAGES_VIEW:
			lang = Lang.getMessages(lang_code);
			break;
		case Constant.CORRECT_VIEW:
			lang = Lang.getCorrects(lang_code);
			break;
		case Constant.AUTHTROUBLE_VIEW:
			lang = Lang.getAuthTrouble(lang_code);
			break;
		case Constant.TOP_VIEW:
			lang = Lang.getTop(lang_code);
			break;
		case Constant.LVLPRIZE_VIEW:
			lang = Lang.getLvlPrize(lang_code);
			break;
		case Constant.PURCHASE_VIEW:
			lang = Lang.getPurchase(lang_code);
			break;
		case Constant.MINEAD_VIEW:
			lang = Lang.getMineAd(lang_code);
			break;
		case Constant.OTHERACC_VIEW:
			lang = Lang.getOtheracc(lang_code);
			break;
		case Constant.LONGTAB_VIEW:
			lang = Lang.getLongtab(lang_code);
			break;
		case Constant.AUTOTASK_VIEW:
			lang = Lang.getAutotask(lang_code);
			break;
		case Constant.REFERRAL_VIEW:
			lang = Lang.getReferral(lang_code);
			break;
		case Constant.REFERRAL_INFO_VIEW:
			lang = Lang.getReferralInfo(lang_code);
			break;
		case Constant.CAPTCHA_VIEW:
			lang = Lang.getCaptcha(lang_code);
			break;
	}
	return lang;
}