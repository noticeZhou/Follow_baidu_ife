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
    var year = parseInt(RegExp.$1,10);       //输入的年月日
    var month = parseInt(RegExp.$2,10);
    var day = parseInt(RegExp.$3,10);
    date.value = "";       //清空输入框
    var stop = new Date(Date.UTC(year,month-1,day));
    var now = new Date();

    var count_down = document.getElementsByClassName("countDown")[0];  //display the countdown
    var ms = stop - now;

    var total = (ms-ms%1000)/1000 + now.getTimezoneOffset()*60;  //getTimezoneOffset()获取本地时间与UTC时间相差的分钟数
    if(total <= 0 && count_down){
    	count_down.innerHTML = "已经过了<strong>"+year+"</strong>年<strong>"+month+"</strong>月<strong>"
                                +day+"</strong>日";
    	clearTimeout(t);  //如果超过时间，停止计时
    	return;
    }else if(total <= 0){
    	var time = document.createElement("p");
        time.className = "countDown";
        time.innerHTML = "已经过了<strong>"+year+"</strong>年<strong>"+month+"</strong>月<strong>"
                                +day+"</strong>日";
        document.getElementsByTagName("form")[0].appendChild(time);
        return;
    }    
    var s = total % 60;  // the total mean the second
    var s_t = (total - s)/60;  //left min
    var m = s_t % 60;
    var m_t = (s_t - m)/60;    //left hour
    var h = m_t % 24;
    var d = (m_t - h)/24;    //left day
    
    if(count_down)
    	count_down.innerHTML = "距离<strong>"+year+"</strong>年<strong>"+month+"</strong>月<strong>"+day
    +"</strong>日还有<strong>"+d+"</strong>天<strong>"+h+"</strong>小时<strong>"+m+"</strong>分<strong>"+s+"</strong>秒";
    else{
    	var time = document.createElement("p");
        time.className = "countDown";
        time.innerHTML = "距离<strong>"+year+"</strong>年<strong>"+month+"</strong>月<strong>"+day
    +"</strong>日还有<strong>"+d+"</strong>天<strong>"+h+"</strong>小时<strong>"+m+"</strong>分<strong>"+s+"</strong>秒";
        document.getElementsByTagName("form")[0].appendChild(time);
    }
    t=setTimeout(compute_time,1000);
}