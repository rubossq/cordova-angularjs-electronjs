var SERVICE_HOST = "instagram.com";

function clearImages(){
	var images = document.getElementsByTagName("img");
	for(var i=0; i<images.length; i++){
		var src = images[i].getAttribute("src");
		if(src != "")
		images[i].setAttribute("src_embed", src);
		images[i].setAttribute("src", "");
	}
}

function clearCss(){
	var links = document.getElementsByTagName("link");
	for(var i=0; i<links.length; i++){
		var href = links[i].getAttribute("href");
		if(href != "")
		links[i].setAttribute("href_embed", href);
		links[i].setAttribute("href", "");
	}
}

function clear(){
	clearImages();
	return 0;
}