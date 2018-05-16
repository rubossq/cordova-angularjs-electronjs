function Log(){}

Log.filters = ["DB"];						//filter for logs
Log.filtersOn = false;
Log.logOn = true;

Log.d = function(prefix, message){
	if(Log.logOn){
		if(Log.filters.length > 0 && Log.filtersOn){
			if(Log.inFilters(prefix)){						//print only if in filters
				console.log("_" + prefix + " " + message);
			}
		}	
		else
			console.log("_" + prefix + " " + message);
	}
}

Log.e = function(prefix, message){
	if(Log.logOn){
		if(Log.filters.length > 0 && Log.filtersOn){
			if(Log.inFilters(prefix)){						//print only if in filters
				console.error(prefix + " " + message);
			}
		}	
		else
			console.error(prefix + " " + message);
	}
}

Log.o = function(prefix, object){
	if(Log.logOn){
		object = JSON.stringify(object);
		if(Log.filters.length > 0 && Log.filtersOn){
			if(Log.inFilters(prefix)){						//print only if in filters
				console.log("_" + prefix + ">");
				console.log(object);
				console.log("<" + prefix + "_");
			}
		}	
		else{
			console.log("_" + prefix + " >");
			console.log(object);
			console.log("< " + prefix + "_");
		}
	}
}

Log.inFilters = function(prefix){
	for(filter in Log.filters){
		filter = Log.filters[filter];
		if(filter == prefix)					
			return true;
	}
	return false;
}

