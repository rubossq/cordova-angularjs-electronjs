var Swiper = Base.extend({
	
	element: null,				//DOM element
	goal: null,					//goal in percent
	callback: null,				//callback function
	orientation: null,			//x or y
	startPos: null,				//start pos for each step
	currentPos: null,			//current pos for each step
	direction: null,			//constant values of Swiper
	opposite: null,				//opposite value of direction
	realWay: null,				//way in px
	isActive: false,			//if we follow the element
	delimer: null,				//size int or SELF
	end: null,					//end distance in px
	startPosVal: 0,
	finish: null,				
	isGoal: false,				//is going goal
	metric: 'margin-',			//metric + top, bot, left, right
	moveable: null,
	inverse: false,
	
	constructor: function(element, moveable, delimer, orientation, direction, goal, finish, callback){
		this.element = $(element);
		this.delimer = delimer;
		this.orientation = orientation;
		if(moveable == Swiper.SELF){
			this.moveable = this.element;
		}else{
			this.moveable =  $(moveable);
		}
		this.direction = direction;
		this.end = 0;
		this.finish = finish;
		this.opposite = this.getOpposite();
		this.goal = goal;
		this.callback = callback;
		this.realWay = this.getRealWay();
		this.addListeners();
	},
	
	handleTouchMove: function(event, self){
		
		if(self.isActive && self.currentPos != null){
			
			self.currentPos['x'] = Math.floor(event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX);
			self.currentPos['y'] = Math.floor(event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY);
			
			var way = null;
			var side = null;
			
			switch(self.orientation){
				case 'x':
					way = self.startPos['x'] - self.currentPos['x'];
					if(way > 0){		//finger go to left
						side = Swiper.RIGHT;
					}else{				//finger go to right
						side = Swiper.LEFT;
					}
					break;
				case 'y':
					way = self.startPos['y'] - self.currentPos['y'];
					if(way > 0){		//finger go to top
						side = Swiper.BOT;
					}else{				//finger go to bot
						side = Swiper.TOP;
					}
					break;
			}
			
			way = Math.abs(way);
			var offset = self.moveable[0].getAttribute("style");
			offset = offset.split(":");
			offset = parseInt(offset[1]);
			//var offset = parseInt(self.moveable.css(self.metric+side));
			if(side == self.direction){
				side = self.getOpposite(side);
				
				if(!self.inverse){
					if(self.startPosVal >= 0){
						if(offset >= way){
							way = -way;
						}else{
							way = -offset;
						}
					}else{
						if(offset >= way){
							way = -offset;
						}else{
							way = -way;
						}
					}
				}else{
					if(self.startPosVal >= 0){
						if(offset <= way){
							way = -way;
						}else{
							way = -offset;
						}
					}else{
						if(offset <= way){
							way = -offset;
						}else{
							way = -way;
						}
					}
				}
			}
			
			
			var nextPos = offset + way;
			
			var status = false;
			if(!self.inverse){
				status = nextPos >= (self.realWay+self.startPosVal);
			}else{
				status = nextPos <= (self.realWay+self.startPosVal);
			}
			
			if(status){
				self.callback(Swiper.GOAL);
				self.end = self.finish;
				self.isGoal = true;
			}else{
				self.end = self.startPosVal;
				self.isGoal = false;
			}
			
			if(nextPos != self.end && (side == self.direction || side == self.opposite)){
				self.moveable.removeClass('swipe-anim-fast');
				self.moveable.addClass('swipe-anim-fast');
				self.moveable[0].setAttribute("style",self.metric+side + ":" + nextPos + "px");
				self.startPos['x'] = self.currentPos['x'];
				self.startPos['y'] = self.currentPos['y'];
				event.preventDefault();
			}		
			
		}
	},
	
	addListeners: function(){
		var self = this;
		this.element.bind('touchstart', function(event){
				self.handleTouchStart(event, self);
		});
		this.element.bind('touchmove', function(event){
			self.handleTouchMove(event, self);
		});
		this.element.bind('touchend', function(event){
			self.handleTouchEnd(event, self);
		});
	},
	
	handleTouchStart: function(event, self){
		if(self.isActive){
			//event.preventDefault();
			self.initPos();
		
			self.isGoal = false;
			self.moveable.removeClass('swipe-anim');
			self.moveable.removeClass('swipe-anim-fast');
			self.startPos['x'] = Math.floor(event.originalEvent.touches[0].clientX);
			self.startPos['y'] = Math.floor(event.originalEvent.touches[0].clientY);
			self.callback(Swiper.START);
		}
	},
	
	handleTouchEnd: function(event, self){
		
		if(self.isActive){
			self.initPos();	
			//event.preventDefault();
			if(self.isGoal)
				self.callback(Swiper.ENABLE_END);
			else
				self.callback(Swiper.DISABLE_END);
			self.moveable.addClass('swipe-anim');
			self.moveable.removeClass('swipe-anim-fast');
			self.moveable.css(self.metric+self.opposite, self.end+"px");
		}
		
	},
	
	getOpposite: function(){
		var opposite = null;
		switch(this.direction){
			case Swiper.RIGHT: 
				opposite = Swiper.LEFT;
				break;
			case Swiper.LEFT: 
				opposite = Swiper.RIGHT;
				break;
			case Swiper.TOP: 
				opposite = Swiper.BOT;
				break;
			case Swiper.BOT: 
				opposite = Swiper.TOP;
				break;
		}
		return opposite;
	},
	
	initPos: function(){
		this.startPos = new Array();
		this.currentPos = new Array();
	},
	
	getRealWay: function(){
		if(this.delimer == Swiper.SELF){
			switch(this.orientation){
				case 'x':
					this.delimer = this.element.width();
					break;
				case 'y':
					this.delimer = this.element.height();
					break;
			}
		}
		
		return Math.floor(this.delimer * (this.goal / 100));
	},
	
	setIsActive: function(val){
		this.isActive = val;
	},
	
	goStartPos: function(){
		this.moveable.addClass('swipe-anim');
		this.moveable[0].setAttribute("style", this.metric+this.opposite + ":" + this.startPosVal + "px");
	},
	
	setEnd: function(end){
		this.end = end;
	},
	
	goEnd: function(){
		this.moveable.addClass('swipe-anim');
		this.moveable.removeClass('swipe-anim-fast');
		this.moveable[0].setAttribute("style", this.metric+this.opposite + ":" + this.end + "px");
	},

	setMetric: function(metric){
		this.metric = metric;
	},
	
	setStartPos: function(startPos){
		this.startPosVal = startPos;
	},
	
	setInverse: function(inverse){
		this.inverse = inverse;
	}
},
{
	RIGHT: "right",
	LEFT: "left",
	TOP: "top",
	BOT: "bottom",
	START: "start",
	GOAL: "goal",
	ENABLE_END: "enable_end",
	DISABLE_END: "disable_end",
	SELF: "self",
	screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
});