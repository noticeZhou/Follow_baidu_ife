window.onload = function(){
    var moveDiv=document.body.getElementsByTagName("div")[0];
    moveDiv.addEventListener("mousedown",move);
}

function move(e){
    var x = e.clientX;
    var y = e.clientY;
    var disX = e.target.offsetLeft;
    var disY = e.target.offsetTop;
    document.onmousemove = function(ev){
        ev.target.style.left = disX + e.clientX - x + "px";
        ev.target.style.top =  disY + e.clientY - y + "px";
    }   
    document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
    }
}