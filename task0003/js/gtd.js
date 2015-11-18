window.onload = function() {
	sub_class();
	display_tasks();
}

function sub_class() {             //点击父类，展示子类
	var sub_list = document.getElementsByClassName("main-classify");
	for(var i=0,len=sub_list.length;i<len;i++) {
		EventUtil.addHandler(sub_list[i],"click",function(event) {
			element = EventUtil.getTarget(event);
			var subNode = element.parentNode.getElementsByClassName("sub-class")[0];
			if(subNode)
				subNode.style.display = "block";
		});
	}
}

function display_tasks(event) {
	var sub_list = document.getElementsByClassName("classify");
	for(var i=0,len=sub_list.length;i<len;i++) {
		var task_list = sub_list[i].getElementsByTagName("li");
		for(var i=0,len=task_list.length;i<len;i++){
			EventUtil.addHandler(task_list[i],"click",function(event) {
			element = EventUtil.getTarget(event);
			var subNode = element.parentNode.getElementsByTagName("li")[0];
			if(subNode){
				console.log(subNode.id);
				var re = /^classify_id_(\w+)$/;
				if(re.test(subNode.id)){
					var tasks_node = "task_list_"+RegExp.$1;
					var tasks = document.getElementById(tasks_node);
					tasks.style.display = "block";
				}
			}
		});
		}
	}
}