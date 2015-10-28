var i = 0;
var count = 0;
var bannerList = document.getElementsByClassName("banner")[0];
var banner = bannerList.getElementsByTagName("img")[0];
window.onload = function(){
	rotate();
}

function rotate(){
    banner.style.marginLeft = i+"px";
    i += 20;
    var t=setTimeout(rotate,20);
    if(i==1000){
        clearTimeout(t);
        change();
     }
}

function change(){
    removeClass(bannerList,"active");
    addClass(bannerList,"item");
    if(count<5)
        count++;
    else
    	count=0;
    bannerList = document.getElementsByClassName("banner")[count];
    removeClass(bannerList,"item");
    addClass(bannerList,"active");
    i=0;
    banner = bannerList.getElementsByTagName("img")[0];
    rotate();
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    try{
        element.classList.add(newClassName);
    }catch(ex){
        oldClassName = element.className;
        element.className= !oldClassName? newClassName : oldClassName+" "+newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    try{
        element.classList.remove(oldClassName);  //html5中新增的，classList属性，只有chrome和firefox3.6支持
    }catch(ex){
        var re = RegExp("\\b"+oldClassName+"\\b");
        element.className=element.className.replace(re,"");
    }
}