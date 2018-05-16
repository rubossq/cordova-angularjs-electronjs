var SERVICE_HOST = "instagram.com";

var ACCOUNT_PAGE = "https://www.instagram.com";
var ERR_CODE_BOT_BEFORE = 303;
var ERR_CODE_BOT_NOPE = 304;
var ERR_CODE_BOT_LIMIT = 305;
var OK_STATUS = "ok";
var ERR_STATUS = "err";
var CLICK_TIME = 1000; //msec
var userInfo = null;
var moreFieldsInfo = null;
var isActionReady = false;
var actionStatus;
var getMetaHead = {ready:false};
var userData = {ready:false};
var IN_ACC = 1;
var IN_LOGIN = 2;
var IN_PRELOGIN = 3;
var clickLogin = false;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


function curPath(needClear){
	return getLocation();
}

function getLocation(){
	var isLoaded = true;
	var location = {host: window.location.hostname, path: window.location.pathname, isLoaded:isLoaded};
	return JSON.stringify(location);
}

function isLogin(){
	var prelogin = getElementByXpath('//*[@id="react-root"]/section/main/article/div/div[2]/p/a') != null ? true : false;
	if(!prelogin){
		var viewer = window._sharedData.config.viewer;
		res = viewer == null ? IN_LOGIN : IN_ACC;
	}else{
		res = IN_PRELOGIN;
		if(clickGoLogin())
			res = IN_LOGIN;
	}
	console.log(JSON.stringify({status:res}));
	return JSON.stringify({status:res});
}

function isLoginAbout(){
	var viewer = window._sharedData.config.viewer;
	res = viewer == null ? IN_LOGIN : IN_ACC;
	return JSON.stringify({status:res});
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function clickGoLogin(){
	if(!clickLogin){
		console.log("click go login");
		var link = getElementByXpath('//*[@id="react-root"]/section/main/article/div/div[2]/p/a');
		console.log("link = " + link);
		if(link != null){
			link.click();
			clickLogin = true;
			return true;
		}else{
			return false;
		}
	}else{
		return true;
	}
}

function action(url, addon, realId, type){
	isActionReady = false;
	url += addon;
	console.log("try action " + url + " / " + realId + " / "+ type);
	
	najax(url, [{name:"x-csrftoken", value:window._sharedData.config.csrf_token}, {name:"x-instagram-ajax", value:1}], "POST", "", function( result ) {
		if(result.status == 200){
			console.log("status = 200");
			actionStatus = OK_STATUS;
			isActionReady = true;
		}else if(result.status == 403 ){		//|| result.status == 400
			console.log("status = 403");
			
			actionStatus = ERR_CODE_BOT_LIMIT;
			isActionReady = true;
			
		}else if(result.status == 404 || result.status == 500 || result.status == 400){
			console.log("status = 404 || 500 || 400");
			actionStatus = ERR_CODE_BOT_NOPE;
			isActionReady = true;
		}else{
			console.log("status else");
			actionStatus = ERR_STATUS;
			isActionReady = true;
		}
	});
}

function getActionEntity(){
	var action = {ready:isActionReady, status: actionStatus};
	return JSON.stringify(action);
}

function goPage(page){
	window.location.href = page;
}

function logout(){
	$(".accountSettings a:last").click();
}

function goProfile(){
	var profilePage = ACCOUNT_PAGE + document.getElementsByClassName("_6ssv5")[0].getAttribute("href");
	console.log("go profile " + profilePage);
	goPage(profilePage);
}


function getUserInfo(username){
	userInfo = null;

	var viewer = window._sharedData.config.viewer;
	if(viewer != null){
		
		if(!username || username == 'null' || username.trim() === "null" || typeof username == "undefined"){
			username = viewer.username;
		}
		
		var profilePage = ACCOUNT_PAGE + "/" + username + "/";
		
		najax(profilePage, new Array(), "GET", "", function( result ) {
			if(result.status == 200){
				
				var sharedData = getSharedData(result.data);
				
				if(sharedData != null){
					
					var user = sharedData.entry_data.ProfilePage[0].user;
					nick = user.username;
					followedCount =  user.followed_by.count;
					followsCount = user.follows.count;
					profileAvatar = user.profile_pic_url;
					postsCount = user.media.count;
					is_private = sharedData.entry_data.ProfilePage[0].user.is_private;
					var posts = new Array();
					
					for(var index in  user.media.nodes){
						var post =  user.media.nodes[index];
						var metaHead = {head: post.display_src, meta: post.code, id: post.id};
						posts.push({thumbnail:  post.thumbnail_src, likesCount: post.likes.count, id: post.code, metaHead: metaHead});
					}
					
					userInfo = {nick: nick, profileAvatar: profileAvatar, followsCount: followsCount, followedCount: followedCount,
					postsCount: postsCount, posts: posts, profilePage: profilePage, is_private: is_private,
					has_next_page: user.media.page_info.has_next_page, end_cursor: user.media.page_info.end_cursor, inst_id: user.id};
				}
			}
		});
	}
}

function getMoreFields(after, user_id, limit){
	moreFieldsInfo = null;
	var link = "https://www.instagram.com/graphql/query/"+"?query_id=17880160963012870&id="+user_id+"&first="+limit+"&after="+after;
	var viewer = window._sharedData.config.viewer;
	if(viewer != null){

		var params = "";
		najax(link, [{name:"x-csrftoken", value:window._sharedData.config.csrf_token}, {name:"x-instagram-ajax", value:1},
					 {name:"x-requested-with", value:"XMLHttpRequest"}, {name:"content-type", value:"application/x-www-form-urlencoded"}], "POST", params, function( result ) {
				if(result.status == 200){
					var data = JSON.parse(result.data);
					if(data.status == "ok"){
						var posts = new Array();
						console.log(data);
						var nodes = data.data.user.edge_owner_to_timeline_media.edges;
						for(var index in nodes){
							var post = nodes[index].node;

							var metaHead = {head: post.display_url, meta: post.shortcode, id: post.id};
							posts.push({thumbnail:  post.thumbnail_src, likesCount: post.edge_liked_by.count, id: post.shortcode, metaHead: metaHead});
						}
						moreFieldsInfo = {posts: posts, has_next_page: data.data.user.edge_owner_to_timeline_media.page_info.has_next_page, end_cursor: data.data.user.edge_owner_to_timeline_media.page_info.end_cursor};
						console.log(moreFieldsInfo);
					}
				}
		});
	}
}

function getSharedData(data){
	
	var scripts = data.match(/<script type="text\/javascript">(.*?)<\/script>/ig);
	var sharedData = null;
	for(var index in scripts){
		var script = scripts[index];
		if(script.indexOf("_sharedData") > -1){
			sharedData = script.replace("window._sharedData =", "");
			sharedData = sharedData.replaceAll(';', "");
			sharedData = sharedData.replace(/<script type="text\/javascript">/g, '');
			sharedData = sharedData.replace(/<\/script>/g, '');
			try{
				sharedData = JSON.parse(sharedData);
			}catch(e){
				sharedData = sharedData.replaceAll(';', "");
				sharedData = JSON.parse(sharedData);
			}
			
			break;
		}
	}
	return sharedData; 
}

function getInfoEntity(){
	return JSON.stringify(userInfo);
}

function getMoreFieldsInfoEntity(){
	return JSON.stringify(moreFieldsInfo);
}



function getLikeInfo(link){
	getMetaHead = {ready: false};
	console.log("1 ----------------------");
	console.log("get meta head");
	najax(link, new Array(), "GET", "", function( result ) {
			if(result.status == 200){
				var sharedData = getSharedData(result.data);
				var meta = sharedData != null ? sharedData.entry_data.PostPage[0].media.code : null;
				console.log(meta);
				if(meta != null){
					var head = sharedData.entry_data.PostPage[0].media.display_src;

					var is_private = sharedData.entry_data.PostPage[0].media.owner.is_private;
				
					var metaHead = {head: head, meta: meta, id: sharedData.entry_data.PostPage[0].media.id};
					getMetaHead = {ready: true, status: OK_STATUS, metaHead: metaHead, is_private: is_private};
				}else{
					getMetaHead = {ready: true, status: ERR_STATUS};
				}
			}else{
				getMetaHead = {ready: true, status: ERR_STATUS};
			}
			console.log("2 ----------------------");
			console.log(getMetaHead);
			console.log("---------------------- 2");
	});
	console.log("---------------------- 1");
}

function getMetaHeadEntity(){
	console.log("3 ----------------------");
	console.log(getMetaHead);
	console.log("---------------------- 3");
	return JSON.stringify(getMetaHead);
}

function getUserData(link){
	userData = {ready: false};
	link += "?__a=1";
	najax(link, new Array(), "GET", "", function( result ) {
			if(result.status == 200){
				var data = JSON.parse(result.data); 
				if(data){
					var form_data = data.form_data;
					form_data.country_code = window._sharedData.country_code;
					userData = {ready: true, status: OK_STATUS, form_data: form_data};
				}else{
					userData = {ready: true, status: ERR_STATUS};
				}
			}else{
				userData = {ready: true, status: ERR_STATUS};
			}

			console.log(userData);
	});
}

function getUserDataEntity(){
	return JSON.stringify(userData);
}

function getSubscribeInfo(link){
	getMetaHead = {ready: false};
	najax(link, new Array(), "GET", "", function( result ) {
		if(result.status == 200){
			var sharedData = getSharedData(result.data);
			var meta = sharedData != null ? sharedData.entry_data.ProfilePage[0].user.username : null;
			if(meta != null){
				var head = sharedData.entry_data.ProfilePage[0].user.profile_pic_url;
				var metaHead = {head: head, meta: meta, id: sharedData.entry_data.ProfilePage[0].user.id};
				getMetaHead = {ready: true, status: OK_STATUS, metaHead: metaHead};
			}else{
				getMetaHead = {ready: true, status: ERR_STATUS};
			}
		}else{
			getMetaHead = {ready: true, status: ERR_STATUS};
		}
	});
}

function najax(url, headers, method, params, callback){
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
		   callback({status: xmlhttp.status, data: xmlhttp.responseText});
        }
    }

    xmlhttp.open(method, url, true);
	for(var index in headers)
		xmlhttp.setRequestHeader(headers[index].name, headers[index].value);
    xmlhttp.send(params);
}

function clear(){
	clearImages();
}

function clearImages(){
	var images = document.getElementsByTagName("img");
	for(var i=0; i<images.length; i++){
		var src = images[i].getAttribute("src");
		if(src != "")
		images[i].setAttribute("src_embed", src);
		images[i].setAttribute("src", "");
	}
}