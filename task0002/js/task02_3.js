window.onload = function(){
    setInterval("update()",5000);
}
var items = document.getElementsByClassName("item");
var oneLoop;
var i=0;
function pre()    //往左
{
    if(i==-1000){
        clearInterval(oneLoop);
        var preItem = items[0].parentNode.removeChild(items[0]);  //which is displaying
        items[0].parentNode.appendChild(preItem);     //push it at the last one        
        i=0;
    }
    else
        i -= 200;
    items[0].parentNode.style.marginLeft = i+"px";
}

function next()  //往右
{
    if(i == 0){
        i = -1000;
        clearInterval(oneLoop);
        var nextItem = items[5].parentNode.removeChild(items[5]);
        items[0].parentNode.insertBefore(nextItem,items[0]);
    }
    else
        i += 200;
    items[0].parentNode.style.marginLeft = i+"px";
}

function custom()
{

}
function update()
{
    
    oneLoop = setInterval("next()",200);
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