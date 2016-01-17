var speed = 60; //the speed of img move
var direction = "right";   //the direction of img move
var click_flag = 0;
function move() {
    var wrap = document.getElementById("wrap");  //图片容器
    if(direction === "right" && ! wrap.style.marginLeft) {
    	//把显示的图片移到第二张
    	ItemSort(2);
    	wrap.style.marginLeft = "-900px";
    } else if(! wrap.style.marginLeft) {
    	wrap.style.marginLeft = "0px";
    }
    wrap_left = parseFloat(wrap.style.marginLeft);
    /*当配置为向左滚动时，减少里层div的margin-left，直到减少了一张图片的宽度，调整图片的顺序，
     *使得当前图片为第一张,并将div的margin-left置为0，这样就完成了一次正序的轮播切换
     */
    if(direction === "left") {
    	if(wrap_left > -900) {
	        wrap_left -= speed;
		    wrap.style.marginLeft = wrap_left + "px";
		    setTimeout(move,100);
	    } else {
	    	activePoint();
	    	if(click_flag === 1){
	    		ItemSort(3);
	    		click_flag = 0;
	    	}else {
	    		ItemSort(1);
	    	}
	    	wrap.style.marginLeft = "0px";
	    	setTimeout(move,3000);
	    }
    } else {
    	/*当配置为向右滚动时，增加margin-left至一张图片的宽度，调整图片顺序，把将要切换到的图片置为第一张，
    	 *而第二张才是正在显示的图片，因为此时的margin-left:-900px。这样就完成了一次逆序的轮播切换
    	 */
    	if(wrap_left < 0) {
	        wrap_left += speed;
		    wrap.style.marginLeft = wrap_left + "px";
		    setTimeout(move,100);
	    } else {
	    	if(click_flag === 1) {
	    		ItemSort(3);
	    		click_flag = 0;
	    	} else {
	    		ItemSort(2);
	    	}
	    	activePoint();
	    	wrap.style.marginLeft = "-900px";
	    	setTimeout(move,3000);
	    }
    }
}

function ItemSort(way) {
	var img_root = document.getElementById("wrap");
	if(way === 1) {
		var first_img = document.getElementsByTagName("img")[0];
		img_root.removeChild(document.getElementById(first_img.id));
		img_root.appendChild(first_img);
	} else if(way === 2) {
		var first_img = document.getElementsByTagName("img")[0];
		var last_img = document.getElementsByTagName("img")[5];
		img_root.removeChild(last_img);
		img_root.insertBefore(last_img,first_img);
	} else if(way === 3){
		var last_img = document.getElementsByTagName("img")[0];
		var last_num = parseInt(last_img.id.replace("img",""));
		img_root.removeChild(last_img);
		if(last_num === 6) {
			var shift_img = document.getElementById("img1");
		} else {
			var shift_img = document.getElementById("img"+(last_num+1));
		}
		img_root.insertBefore(last_img,shift_img);
	}
	
}

function activePoint() {
	var last_point = document.getElementsByClassName("active")[0].id;
	var current_img = document.getElementsByTagName("img")[1].id;
	var current_point = current_img.replace("img", "point");
	
	document.getElementById(last_point).className = "";
	document.getElementById(current_point).className = "active";
}

function clickChange() {
	var points = document.getElementsByTagName("li");
	for(var i=0,len=points.length; i<len; i++) {
		EventUtil.addHandler(points[i],"click",function(event) {
			var img_root = document.getElementById("wrap");
			var target = EventUtil.getTarget(event);
			var target_img = target.id.replace("point","img");
			var target_num = parseInt(target_img.replace("img",""));

			var current = document.getElementsByClassName("active")[0];
			var current_img = current.id.replace("point","img");
			var current_num = parseInt(current_img.replace("img","")); 
			if(current_num < target_num) {
				click_flag = 1;
				//如果原来是向右滚动，则需把预备的下一张图片放到队列末尾，以切换到向左滚动
				if(direction === "right") {
					var ready_img = document.getElementsByTagName("img")[0];
					img_root.removeChild(ready_img);
					img_root.appendChild(ready_img);
				}
				direction = "left";
				var move_num = target_num - current_num - 1;
				//将当前图片和点击焦点之间的部分放到队列末尾，以做到点击的图片就是切换到的下一张
				for(var i=0; i<move_num; i++) {
					var move_item = "img"+(current_num + i + 1);
					var move_item = document.getElementById(move_item);
					move_item.parentNode.removeChild(move_item);
					img_root.appendChild(move_item);
				}
			} else if(current_num > target_num) {
				click_flag = 1;
				var first_img = document.getElementsByTagName("img")[0];
				var target_img = document.getElementById(target_img);
				if(direction === "right") {
					img_root.removeChild(first_img);
					img_root.appendChild(first_img);
				}
				direction = "right";
				img_root.removeChild(target_img);
				img_root.insertBefore(target_img,img_root.firstChild);
				//.........some bug
			}
			//move();    为什么会消除延时？
		});
	}
	
}

function start() {
	setTimeout(move,3000);
}
start();
clickChange();