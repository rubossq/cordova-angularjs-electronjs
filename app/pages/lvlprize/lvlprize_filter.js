// set image miners in lvlprize
filters.filter("prizeMiner", function(){
	return function(index){
		switch(parseInt(++index)){
			case 1:
				return "images/earn_man1.png";
			case 10:
				return "images/earn_man2.png";
			case 20:
				return "images/earn_man3.png";
			case 30:
				return "images/earn_man4.png";
			case 40:
				return "images/earn_man5.png";
			default:
				return;
		}
	}
});

// set height for miners in lvlprize
filters.filter("prizeMinerSize", function(){
	return function(index){
		switch(parseInt(++index)){
			case 1:
			case 10:
			case 20:
			case 30:
			case 40:
				return "height: 70px";
			default:
				return;
		}
	}
});