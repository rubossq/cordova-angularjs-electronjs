var enterPress = angular.module('enterPress', []);

enterPress.directive('ngEnter', function(){
	return function(scope, element, attrs){
		element.bind("keydown keypress", function(event){
			if(event.which === 13){
				scope.$apply(function(){
				scope.$eval(attrs.ngEnter, {'event': event});
			});

			event.preventDefault();
			}
		});
	};
});