var News = Base.extend({
	html: null,
	css: null,
	js: null,
	ntype: null,
	news_id: null,
	name: null,
	
	constructor: function(news_id, name, html, css, js, type){
		this.html = html;
		this.css = css;
		this.js = js;
		this.news_id = news_id;
		this.ntype = type;
		this.name = name;
	},
	
	/* get and set News.html */
	setHtml: function(html){
		this.html = html;
	},
	
	getHtml: function(){
		return this.html;
	},
	
	/* get and set News.css */
	setCss: function(css){
		this.css = css;
	},
	
	getCss: function(){
		return this.css;
	},
	
	getName: function(){
		return this.name;
	},
	
	setName: function(name){
		return this.name = name;
	},
	
	/* get and set News.css */
	setNewsId: function(news_id){
		this.news_id = news_id;
	},
	
	getNewsId: function(){
		return this.news_id;
	},
	
	getView: function(){
		var view = "<style>"+this.css+"</style><div>"+this.html+"</div>";
		return view;
	},
	
	/* get and set News.js */
	setJs: function(js){
		this.js = js;
	},
	
	getJs: function(){
		return " if(true){news_id = "+this.news_id+"; "+this.js+"} ";
	},

	/* get and set News.ntype */
	setNtype: function(ntype){
		this.ntype = ntype;
	},
	
	getNtype: function(){
		return this.ntype;
	}
});