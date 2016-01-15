function move(length,time) {
    var wrap = document.getElementById("wrap");  //图片容器
    var speed = length/time;

  
        wrap_left = parseFloat(wrap.style.marginLeft);
        console.log(wrap_left,speed);
        wrap_left -= speed;
        console.log(wrap_left);
        wrap.style.marginLeft = wrap_left + "px";
        setTimeout(move(900,2000),100);

}

document.getElementById("wrap").style.marginLeft = "0px";
setTimeout(move(900,2000),2000);
