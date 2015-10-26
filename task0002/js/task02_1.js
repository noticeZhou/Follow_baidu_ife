window.onload = function(){  
	check();
	var btn = document.getElementById("habitButton");
	btn.addEventListener("click",dataHandle);
}

function habit(habits){
	var habitArray=habits.split(/,|，|、|;|；|\s/);
    if(habits == "" || habitArray.length>10)
    	return -1;
    var realHabits = new Array();
    for(var i=0,len=habitArray.length;i<len;i++){
    	var habit = habitArray[i].trim();
        if(habit != "" && realHabits.indexOf(habit) == -1){
        	realHabits.push(habit);
        }
    }
    return realHabits;
}

function dataHandle(){
	var text = document.getElementById("habitText");
	var btn = document.getElementById("habitButton");
	var inData = text.value;
	text.value="";
	var outData = habit(inData);
	if(outData != -1){
		var select = document.createElement("select");
		select.name = "habits";
		for(var i=0,len=outData.length;i<len;i++){
			var option = document.createElement("option");
			option.value = outData[i];
		    option.innerHTML = outData[i];
		    select.appendChild(option);
		}
		var oldList = btn.parentNode.getElementsByTagName("select")[0];
		if(oldList)                                   //如果已经存在一个下拉框，则替换他
			btn.parentNode.replaceChild(select,oldList);	
		else
			btn.parentNode.insertBefore(select,btn);
	}
}

function check(){
	var text = document.getElementById("habitText");
	var tip = document.createElement("p");
	text.addEventListener("change",function(event){ //change事件对用户输入的字段立即做出相应
		if(text.value == ""  || this.value.split(/,|，|、|;|；|\s/).length>10){
    		tip.innerHTML = "this input should be at least 1,up to 10 habits";
    		tip.style="color:red";
    		document.getElementById("habitButton").parentNode.appendChild(tip);
		}else{
			tip.innerHTML = "";
		}
	})
}