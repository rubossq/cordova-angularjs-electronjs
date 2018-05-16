var Tour = Base.extend({
	guideView: null,
	guideText: null,
	guideBut: null,
	guideSkip: null,
	curElem: null,
	elems: [],
	buttons: [],
	callback: null,

	//{elems: [".elem1", ".elem2"], texts: ["text1", "text2"], buttons: ["next", "ready", "skip"]}, callback;
	constructor: function(obj, callback){
		this.guideView = $(".guide-view:first");
		this.guideText = $(".guide-text:first");
		this.guideBut = $(".guide-but:first");
		this.guideSkip = $(".guide-skip:first");

		this.buttons = obj.buttons;
		this.guideBut.text(this.buttons[0]);
		this.guideSkip.text(this.buttons[2]);
		this.callback = callback;
		
		Tour.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		Tour.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		this.fillElems(obj);
		this.setNextListener();
		this.changeSize();

		this.setNextElem();
		$(".guide-block:first").css("display", "block");
	},

	// fill elems array
	fillElems: function(obj){
		if(obj && obj.elems.length != 0 && obj.texts.length != 0){
			for(var i = 0; i < obj.elems.length; i++){
				this.elems[i] = {};
				this.elems[i].elem = obj.elems[i];
				this.elems[i].text = obj.texts[i];
			}
		}else{
			console.log("Put object with elements and texts");
		}
	},

	setNextElem: function(){
		var self = this;
		var elem = this.elems.shift();

		if(elem){
			// check is elem exist
			if($(elem.elem)){
				this.setParams(elem);
			}else{
				this.setNextElem();
			}
		}else{
			// cancel click
			this.guideBut.off();
			this.guideSkip.off();

			// clear arrays
			this.elems.length = 0;
			this.buttons.length = 0;

			// hide Tour
			$(".guide-block:first").css("display", "none");
			this.callback();
		}
	},

	setParams: function(elem){
		this.curElem = $(elem.elem);
		this.guideText.text(elem.text);
		if(this.elems.length == 0){
			this.guideBut.text(this.buttons[1]);
		}

		this.setViewCoords();
	},

	setViewCoords: function(){
		var self = this;
		var curElem = this.curElem;
		var guideViewSize = 0;

		var width = curElem.outerWidth();
		var height = curElem.outerHeight();

		// animated changing of sizes
		if(width >= height){
			guideViewSize = (width + Tour.widerCircle);

			this.guideView.css("width", guideViewSize);
			this.guideView.css("height", guideViewSize);
		}else{
			guideViewSize = (height + Tour.widerCircle);

			this.guideView.css("width", guideViewSize);
			this.guideView.css("height", guideViewSize);
		}

		// get current view top
		var curTop = curElem.offset().top - ((guideViewSize / 2) - (height / 2));
		// get current view left
		var curLeft = curElem.offset().left - ((guideViewSize / 2) - (width / 2));

		// check is top < 0
		if(curTop < 0){
			this.guideView.css("top", 0);
			this.guideView.css("margin-top", 0 - (((guideViewSize / 2) - (height / 2)) - curElem.offset().top));
		}else{
			this.guideView.css("top", curTop);
			// clear view from margin
			this.guideView.css("margin-top", "");
		}

		// check is left < 0
		if(curLeft < 0){
			this.guideView.css("left", 0);
			this.guideView.css("margin-left", 0 - (((guideViewSize / 2) - (width / 2)) - curElem.offset().left));
		}else{
			this.guideView.css("left", curLeft);
			// clear view from margin
			this.guideView.css("margin-left", "");
		}

		setTimeout(function(){
			// set text coords
			self.setDialogCoords(guideViewSize);
		}, 10);
	},

	setDialogCoords: function(viewHeight){
		var curElem = this.curElem;
		var dialog = $(".guide-dialog");

		// get center of cur element
		var height = curElem.offset().top + (curElem.outerHeight() / 2);

		// check is height more or less than center of display
		if(height > Tour.windowHeight / 2){
			dialog.css("top", "");
			dialog.css("bottom", (Tour.windowHeight - this.guideView.offset().top) + Tour.widerCircle);
		}else{
			dialog.css("bottom", "");
			dialog.css("top", this.guideView.offset().top + viewHeight + Tour.widerCircle);
		}
	},

	setNextListener: function(){
		var self = this;
		this.guideBut.click(function(){
			self.setNextElem();
		});

		this.guideSkip.click(function(){
			self.elems.length = 0;
			self.setNextElem();
		});
	},

	changeSize: function(){
		$(window).resize(function(){
			Tour.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			Tour.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		});
	}
},{
	widerCircle: 30,
	windowWidth: 0,
	windowHeight: 0
});