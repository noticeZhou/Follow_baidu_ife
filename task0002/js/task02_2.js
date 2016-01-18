var t;
window.onload=function(){
	var btn = document.getElementById("btn");
	btn.addEventListener("click",function(e){
		compute_time();
	})
    
}

function compute_time()
{
	var date = document.getElementById("date");
    var re = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})/;
    re.exec(date.value);
    var year = parseInt(RegExp.$1,10);
    var month = parseInt(RegExp.$2,10);
    var day = parseInt(RegExp.$3,10);

    var stop = new Date(Date.UTC(year,month-1,day));
    var now = new Date();
    var count_down = document.getElementsByClassName("countDown")[0];  //display the countdown
    var ms = stop - now;

    var total = (ms-ms%1000)/1000;
    if(total <= 0 && count_down){
    	count_down.innerHTML = "已经过了"+year+"年"+month+"月"+day+"日";
    	clearTimeout(t);
    	return;
    }else if(total <= 0){
    	var time = document.createElement("p");
        time.className = "countDown";
        time.innerHTML = "已经过了"+year+"年"+month+"月"+day+"日";
        document.getElementsByTagName("form")[0].appendChild(time);
        return;
    }    
    var s = total % 60;
    var s_t = (total - s)/60;  //left min
    var m = s_t % 60;
    var m_t = (s_t - m)/60;    //left hour
    var h = m_t % 24;
    var d = (m_t - h)/24;    //left day
    
    if(count_down)
    	count_down.innerHTML = "距离"+year+"年"+month+"月"+day+"日还有"+d+"天"+h+"小时"+m+"分"+s+"秒";
    else{
    	var time = document.createElement("p");
        time.className = "countDown";
        time.innerHTML = "距离"+year+"年"+month+"月"+day+"日还有"+d+"天"+h+"小时"+m+"分"+s+"秒";
        document.getElementsByTagName("form")[0].appendChild(time);
    }
    t=setTimeout("compute_time()",1000);
}