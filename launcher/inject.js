var Injector = Base.extend({

    constructor: function(){
        Injector.instance = this;
        this.on(Injector.SCRIPT_INJECTED);
    },

    on: function(action){
        switch(action){
            case Injector.SCRIPT_INJECTED:
                console.log("script injected");
                //var c = document.createElement('script');
                //c.src = "http://instagram.starfamous.ru/apps/com.ruboss.meteor/launcher/additional/inject.js";
                //document.body.appendChild(c);
            break;
            case Injector.INITIALIZE:
                console.log("initialize");
            break;
            case Injector.DEVICE_READY:
                console.log("device ready");
            break;
            case Injector.WINDOW_LOAD:
                console.log("window load");
            break;
        }
    },

    launch: function(method){
        
    }
    
},{
    instance: this,
    SCRIPT_INJECTED: 1,
    INITIALIZE: 2,
    DEVICE_READY: 3,
    WINDOW_LOAD: 4,
});

new Injector();