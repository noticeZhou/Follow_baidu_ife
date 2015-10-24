var EventUtil={
	addHandler:function(element,type,handler){
		if (element.addEventListener) {            //DOM2级方法
	        element.addEventListener(type, handler);
	    } else if (element.attachEvent) {          //针对IE8及以下浏览器
	        element.attachEvent("on" + type, handler);
	    }else{
	        element["on"+type] = handler;            //DOM0级方法
	    }
	},
	removeHandler:function(element,type,handler){
		if (element.removeEventListenr) {              //DOM2级方法
	        element.removeEventListenr(event, listener);
	    } else if (element.detachEvent) {              //针对IE8及以下浏览器
	        element.detachEvent("on" + event, listener);
	    }else{
	        element["on"+event] = null;            //DOM0级方法
	    }
	},

	getEvent: function(event){
		return event ? event :window:window.event;
	},

	getTarget: function(event){
		return event.target || event.srcElement;
	},

	preventDefault: function(event){
        if(event.preventDefault){
        	event.preventDefault();
        }else{
        	event.returnValue = false;
        }
	},
	stopProagation: function(event){
		if(event.stopProagation){
			event.stopProagation();
		}else{
			event.cancelBubble = true;
		}

	}
}