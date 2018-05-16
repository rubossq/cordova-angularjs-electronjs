// set background source
filters.filter("setBgImage", function(){
	return function(src){
		return "background-image: url(" + src + ")";
	}
});

filters.filter("prepareHtml", ['$sce', function($sce){
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
}]);