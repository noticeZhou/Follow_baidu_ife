var suggestion = ['a', 'abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];
var searchBox = document.getElementsByTagName("input")[0];
var activeItem = document.getElementsByClassName("active")[0];
window.onload = function(){
	addInputListener(searchBox);
    addEvent(searchBox, "keydown", function(event) {
        keyEvent(event.keyCode);
    });
}

function addInputListener(element) {
    if (element.addEventListener) { // all browsers except IE before version 9
        element.addEventListener("input", function(event){
        	if(event.target.value == ""){
        		var exitBox = document.getElementsByClassName("tipBox")[0];
			    if(exitBox)
			        exitBox.parentNode.removeChild(exitBox);
        	}else{
        		handleData(event.target.value);
        	}
        });
    }else if(element.attachEvent) { // Internet Explorer and Opera
        element.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
    }

}

function handleData(input) {
	var re = RegExp("^("+input+")");
	var exitBox = document.getElementsByClassName("tipBox")[0];
	if(exitBox)
	    exitBox.parentNode.removeChild(exitBox);
	var tipBox = document.createElement("div");
	tipBox.className = "tipBox";
	for(var i=0,len=suggestion.length;i<len;i++){
	    if(re.test(suggestion[i])){
            itemText="<span>"+RegExp.$1+"</span>"+suggestion[i].slice(input.length);
	        var tipItem = document.createElement("li"); 
            tipItem.innerHTML = itemText;
	        tipBox.appendChild(tipItem);
	    }
	}
	searchBox.parentNode.appendChild(tipBox);
    mouseEvent();     //need data or will  apear bug
}
function keyEvent(key){
	var tip = $(".tipBox");
	activeItem = $(".active");
    if(key == 40){
    	if(!activeItem)
    		tip.getElementsByTagName("li")[0].className="active";
        else if(activeItem.nextSibling){
        	removeClass(activeItem, "active")
        	addClass(activeItem.nextSibling,"active");
        }
    }else if(key == 38){
    	if(activeItem.previousSibling){
        	removeClass(activeItem, "active")
        	addClass(activeItem.previousSibling,"active");
        }
    }else if(key == 13){
    	if(activeItem){
    		searchBox.value = getString(activeItem.innerHTML);
    		tip.parentNode.removeChild(tip);
    	}
    }
}

function mouseEvent(){
    if($(".tipBox")){
        delegateEvent($(".tipBox"),"li","mouseover",function(){
            if($(".active"))
                removeClass($(".active"),"active");
            addClass(this,"active");
        });
        delegateEvent($(".tipBox"),"li","click",function(){
            searchBox.value = getString(this.innerHTML);
            $(".tipBox").parentNode.removeChild($(".tipBox"));
        })
    } 
}

function getString(content){
    var re = /^<span>(\w+)<\/span>(\w+)$/;
    re.exec(content);
    return RegExp.$1+RegExp.$2;
}