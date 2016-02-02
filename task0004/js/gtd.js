window.onload = function() {
  var classDiv = document.getElementById("classDiv");
  var taskDiv = document.getElementById("taskDiv");
  var detailDiv = document.getElementById("detailDiv");

  swipe(detailDiv);
  if(swipe(classDiv) === "right") {
    classDiv.style.display = "none";
    taskDiv.style.display = "-webkit-flex";
  } else if(swipe(taskDiv) === "left") {
    taskDiv.style.display = "none";
    classDiv.style.display = "-webkit-flex";
  } else if (swipe(taskDiv) === "right") {
    taskDiv.style.display = "none";
    detailDiv.style.display = "-webkit-flex";
  } else if(swipe(detailDiv) === "right") {
    detailDiv.style.display = "none";
    taskDiv.style.display = "-webkit-flex";
  }

}

function swipe(element) {
    //获取touch的点(兼容mouse事件)
    var getTouchPos = function(e){
        var touches = e.touches;
        if(touches && touches[0]) {
            return { x : touches[0].clientX ,
                 y : touches[0].clientY };
        }
        return { x : e.clientX , y: e.clientY };
    }
    //计算两点之间距离
    var getDist = function(p1 , p2){
        if(!p1 || !p2) return 0;
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }
    //计算两点之间所成角度
    var getAngle = function(p1 , p2){
        var r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var a = r * 180 / Math.PI;
        return a;
    };
    //获取swipe的方向
    var getSwipeDirection = function(p2,p1){
        var dx = p2.x - p1.x;
        var dy = -p2.y + p1.y;
        var angle = Math.atan2(dy , dx) * 180 / Math.PI;

        if(angle < 45 && angle > -45) return "right";
        if(angle >= 45 && angle < 135) return "top";
        if(angle >= 135 || angle < -135) return "left";
        if(angle >= -135 && angle <= -45) return "bottom";
    }

    var startEvtHandler = function(e){
      var pos = getTouchPos(e);
      var touches = e.touches;
      if( !touches || touches.length == 1 ){ //touches为空，代表鼠标点击
          point_start = getTouchPos(e);
          time_start = Date.now();
        }
    }

    var moveEvtHandler = function(e){
      var pos = getTouchPos(e);
      point_end = getTouchPos(e);
      e.preventDefault();
    }

  //touchend的touches和targetTouches没有对象，只有changeTouches才有
  var endEvtHandler = function(e){
    var time_end = Date.now();
    //距离和时间都符合
    if(getDist(point_start,point_end) > SWIPE_DISTANCE && time_start- time_end < SWIPE_TIME){
        console.log(getSwipeDirection(point_end,point_start));
        return getSwipeDirection(point_end,point_start);
        //touchPad.innerHTML = 'swipe'+dir;
        //getSwipeDirection(point_end,point_start);
    }
  }

    var SWIPE_DISTANCE = 30;  //移动30px之后才认为swipe事件
    var SWIPE_TIME = 500;     //swipe最大经历时间
    var point_start,
      point_end,
      time_start,
      time_end;

    //判断是PC或者移动设备
  var startEvt, moveEvt, endEvt;
  if("ontouchstart" in window){
        startEvt="touchstart";
        moveEvt="touchmove";
        endEvt="touchend";
    }else{
        startEvt="mousedown";
        moveEvt="mousemove";
        endEvt="mouseup";
    }
    element.addEventListener(startEvt, startEvtHandler);
    element.addEventListener(moveEvt, moveEvtHandler);
    element.addEventListener(endEvt, endEvtHandler);
}
