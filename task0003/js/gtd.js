window.onload = function() {
	sub_class();
	display_tasks();
	edit_task();
	add_finish();
	add_classify();
	add_task();
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

function sub_class() {             //点击父类，展示子类
	var sub_list = document.getElementsByClassName("main-classify");
	for(var i=0,len=sub_list.length;i<len;i++) {
		EventUtil.addHandler(sub_list[i],"click",function(event) {
			element = EventUtil.getTarget(event);
			var subNode = element.parentNode.getElementsByClassName("sub-class")[0];
			if(subNode){
				if(subNode.style.display == "block")  //如果当前分类处于展开状态则收起
					subNode.style.display = "none";
				else                                   //否则，展开
					subNode.style.display = "block";
			}
		});
	}
}

/*展示当前类的tasks,以及task对应的详细页面*/
function display_tasks(event) {
	var node_list = document.getElementsByTagName("*");
	var old_tasks = null;
	var old_task = null;
	for(var i=0,len=node_list.length; i<len; i++) {
		var re_class = /^classify_id_(\d+)$/;
		var re_task = /^(\s*\w*\s+)*task_(\d+)(\s+\S*\s*)*$/;
		if(re_class.test(node_list[i].id)) {      //取得有任务的分类
			EventUtil.addHandler(node_list[i],"click",function(event) {  //给每一个有任务的类别添加点击事件
				var element = EventUtil.getTarget(event);
				re_class.exec(element.id);
				var tasks_node = "task_list_"+RegExp.$1;
				var tasks = document.getElementById(tasks_node);
				if(old_tasks){
					old_tasks.style.display = "none";  //将上一次展示的tasks隐藏掉
				}
				tasks.style.display = "block";   //展示当前的tasks
				old_tasks = tasks;
				check_tasks(tasks);           //查看任务筛选分类
			});
		} 
		else if(re_task.test(node_list[i].className)) {    //取得任务列表中的task
			EventUtil.addHandler(node_list[i],"click",function(event) {  //给每一个任务添加点击事件
				var element = EventUtil.getTarget(event);
				re_task.exec(element.className);
				var task_node = "detail_"+RegExp.$2;           //任务ID对应的展示区
				var task = document.getElementById(task_node);
				if(old_task && old_task != task){
					old_task.style.display = "none";  //将上一次展示的task隐藏掉
				}
				task.style.display = "block";   //展示当前的task
				task.getElementsByClassName("edit-content")[0].style.display="block";
				old_task = task;

				var save_btn = document.getElementById("save_edit");  //编辑页面的保存按钮
				if(save_btn) {          //如果之前的编辑页面没有删掉
					save_btn.parentNode.parentNode.removeChild(save_btn.parentNode);
				}

				var date = document.getElementById("date-input");    //日期输入框
				if(date){
					var date_display = document.createElement("p");
					date_display.className = "edit-date";
					date_display.innerHTML = "任务日期："+date.value;
					//用日期展示替换日期输入框
					date.parentNode.parentNode.replaceChild(date_display,date.parentNode);
				}
			});
		}
	}
	
}
/*编辑任务内容*/
function edit_task() {
	var edit_icons = document.getElementsByClassName("edit");
	for(var i=0,len=edit_icons.length; i<len; i++) {
		EventUtil.addHandler(edit_icons[i],"click",function(event){   //给编辑图标添加点击事件
			var element = EventUtil.getTarget(event);
			//找到编辑区的DOM
			var edit_content = element.parentNode.parentNode.parentNode.getElementsByClassName("edit-content")[0];
			var editor = document.createElement("textarea");
			editor.className = "editor";
			editor.innerHTML = edit_content.innerHTML;
			var edit_btn = document.createElement("input");
			edit_btn.type = "submit";
			edit_btn.value = "保存";
			edit_btn.id = "save_edit"
			var edit_form = document.createElement("form");
			edit_form.appendChild(editor);
			edit_form.appendChild(edit_btn);
			edit_content.parentNode.appendChild(edit_form);
			edit_content.style.display = "none";              //隐藏掉任务内容的段落显示

			var edit_date = element.parentNode.parentNode.parentNode.getElementsByClassName("edit-date")[0];
			var date_input = document.createElement("input");
			date_input.type="text";
			date_input.id="date-input";
			var re_date = /^\s*(\S+)\s*(\d{4}\-\d{2}\-\d{2})$/;
			re_date.exec(edit_date.innerHTML);
			var date = RegExp.$2;
			edit_date.innerHTML = "任务时期:<input type='text' id='date-input' value="+date+">";
			save_edit();
		});
	}
}
/*保存任务编辑*/
function save_edit() {
	var save_btn = document.getElementById("save_edit");
	if(save_btn) {
		EventUtil.addHandler(save_btn,"click",function(event){
			event.preventDefault();
			var element = EventUtil.getTarget(event);
			var content = element.parentNode.parentNode.getElementsByClassName("edit-content")[0];
			var text = element.parentNode.getElementsByTagName("textarea")[0];
			content.innerHTML = text.value;     //将编辑区域的内容保存
			var date = document.getElementById("date-input");    //日期输入框
			var date_display = document.createElement("p");
			date_display.className = "edit-date";
			date_display.innerHTML = "任务日期："+date.value;
			date.parentNode.parentNode.replaceChild(date_display,date.parentNode);//用日期展示替换日期输入框
			text.parentNode.parentNode.removeChild(text.parentNode); //删除编辑表单
			content.style.display = "block";    //显示任务内容
		});
	}
}

function add_finish() {
	var confirm_icons = document.getElementsByClassName("confirm");
	var confirm_div = document.getElementById("confirm-div");
	for(var i=0,len=confirm_icons.length; i<len; i++){
		EventUtil.addHandler(confirm_icons[i],"click",function(event){
			confirm_div.style.display = "block";
			var element = EventUtil.getTarget(event);   //确认的按钮
			element.parentNode.parentNode.parentNode.appendChild(confirm_div);    //确认浮层
		});
	}

	var confirm_btn = document.getElementById("sure-btn");
	var cancel_btn = document.getElementById("cancel-btn");
	var re_detail = /^detail_(\d+)$/;
	if(confirm_btn) {
		EventUtil.addHandler(confirm_btn,"click",function(event){
			event.preventDefault();
			confirm_div.style.display = "none";
			var task_content = confirm_div.parentNode;      //task.detail展示区
			if(re_detail.test(task_content.id)) {
				var this_id = "task_"+RegExp.$1;
				var this_task = document.getElementsByClassName(this_id);  //该任务可能同时在多个类中
				for(var j=0;j<this_task.length;j++){
					addClass(this_task[j],"finished-task");
				}
 			}
		});
	}
	if(cancel_btn) {                   //给取消按钮绑定点击事件
		EventUtil.addHandler(cancel_btn,"click",function(event){
			event.preventDefault()
			confirm_div.style.display = "none";
		});
	}
}
/*筛选菜单点击事件*/
function check_tasks(task_list) {       
	var task_list = task_list;
	var check_all = document.getElementById("all-tasks");
	var check_unfinish = document.getElementById("unfinish-tasks");
	var check_finished = document.getElementById("finished-tasks");
	var old_status = check_all;
	var re_task = /^(\w*\s+)*task_(\d+)(\s+\S*)*$/;
	var re_finished = /^(\w*\s+)*finished\-task(\s+\w*)*$/;
	EventUtil.addHandler(check_all,"click",function(){
		console.log("yes");
		old_status.style.backgroundColor = "#ccc";      //上一状态还原背景色
		check_all.style.backgroundColor = "#fff";       //将当前状态背景色置为白色
		old_status = check_all;
		var tasks = task_list.getElementsByTagName("li");
		for(var i=0,len=tasks.length; i<len; i++){
			tasks[i].style.display = "block";           //展示所有任务
		}
	});
	EventUtil.addHandler(check_unfinish,"click",function(event){
		old_status.style.backgroundColor = "#ccc";
		check_unfinish.style.backgroundColor = "#fff";
		old_status = check_unfinish;
		var tasks = task_list.getElementsByTagName("li");
		for(var i=0,len=tasks.length; i<len; i++){
			tasks[i].style.display = "block";
			if(re_task.test(tasks[i].className) && re_finished.test(tasks[i].className)) {
				tasks[i].style.display = "none";        //隐藏已完成的任务
			}
		}
	});
	EventUtil.addHandler(check_finished,"click",function(event){
		old_status.style.backgroundColor = "#ccc";
		check_finished.style.backgroundColor = "#fff";
		old_status = check_finished;
		var tasks = task_list.getElementsByTagName("li");
		for(var i=0,len=tasks.length; i<len; i++){
			tasks[i].style.display = "block";
			if(re_task.test(tasks[i].className) && !re_finished.test(tasks[i].className)) {
				tasks[i].style.display = "none";         //隐藏未完成的任务
			}
		}
	}); 
}
/*添加分类*/
function add_classify() {
	var addClassify_btn = document.getElementById("add-class");
	var overlay_div = document.getElementById("overlay");
	EventUtil.addHandler(addClassify_btn,"click",function(){
		var class_div = document.getElementById("class-div");
		class_div.style.display = "block";
		overlay_div.style.display = "block";
		document.body.appendChild(class_div);
	})

	var exit_btn = document.getElementById("class-exit");
	var save_btn = document.getElementById("class-save");
	EventUtil.addHandler(exit_btn,"click",function(){
		exit_btn.parentNode.style.display = "none";
		overlay_div.style.display = "none";
	})

	EventUtil.addHandler(save_btn,"click",function(){
		var class_name = document.getElementById("class-name");
		var class_parent = document.getElementById("class-parent");
		exit_btn.parentNode.style.display = "none";
		overlay_div.style.display = "none";
		if(class_parent.value === "无") {
			var classify_div = document.createElement("div");
			classify_div.className = "classify";
			var main_div = document.createElement("div");
			main_div.className = "main-classify";
			main_div.innerHTML = "<img src='img/1187217.png'>"+class_name.value+"(0)";
			classify_div.appendChild(main_div);
			document.getElementsByClassName("type")[0].appendChild(classify_div);
		}else {
			var main_class = document.getElementsByClassName("main-classify");
			var re_value = /^<img\s\S+>(\S+)\(\d+\)$/
			for(var i=0,len=main_class.length;i<len;i++){
				if(re_value.test(main_class[i].innerHTML)) {
					var cls_value = RegExp.$1;
					if(cls_value === class_parent.value){
						var sub_class = document.createElement("ul");
						sub_class.className = "sub-class";
						var sub_clsfy = document.createElement("li");
						sub_clsfy.innerHTML = "<img src='img/1083918.png'>"+class_name.value+"(0)";
						sub_class.appendChild(sub_clsfy);
						main_class[i].parentNode.appendChild(sub_class);
					}
				}
			}
		}
	});
}

function add_task() {
	var task_btn = document.getElementById("add-task");
	var all_tasks = document.getElementById("all");
	var tasks_num = all_tasks.getElementsByTagName("span")[0];   //任务的总数量
	var task_edit = document.getElementById("task-div");
	EventUtil.addHandler(task_btn,"click",function(){
		task_edit.style.display = "block";
	});
	var save_btn = document.getElementById("task-btn");
	EventUtil.addHandler(save_btn,"click",function(event){
		event.preventDefault();
		var task_text = task_edit.getElementsByClassName("task-text");  
		var task_name = task_text[0];  
		var task_type = task_text[1];
		var task_date = task_text[2];
		var task_content = task_edit.getElementsByTagName("textarea")[0];
		var main_class = document.getElementsByClassName("main-classify");
		var re_value = /^<img\s\S+>(\S+)\(<span\s+\S+>\d+<\/span>\)$/;
		for(var i=0,len=main_class.length;i<len;i++){
			if(re_value.test(main_class[i].innerHTML)) {
				var cls_value = RegExp.$1;
				if(cls_value === task_type.value){
					current_class = main_class[i];
					class_id = current_class.id;
					current_num = current_class.getElementsByTagName("span")[0]; 
					current_rank = parseInt(tasks_num.innerHTML)+1;   
					current_num.innerHTML = ""+current_rank;   
					var re_class = /^classify_id_(\d+)$/;
					if(re_class.test(class_id)){
						var tasks_id = "task_list_"+RegExp.$1;
						var task_list = document.getElementById(tasks_id);
						var task_html = document.createElement("li");
						task_rank = parseInt(tasks_num.innerHTML)+1;   
						tasks_num.innerHTML = ""+task_rank;               //所有任务的总量加1
						task_html.className = "task_"+task_rank;
						task_html.style.paddingLeft = "30px";
						task_html.innerHTML = task_name.value;
						var taskDate_list = task_list.getElementsByClassName("task-date");
						var flag = 0;
						for(var j=0;j<taskDate_list.length;j++){         //如果存在这个日期，则添加到这个标签下
							if(task_date.value == taskDate_list[j].innerHTML){
								taskDate_list[j].parentNode.appendChild(task_html);	
								flag = 1;
							}
						}
						if(flag === 0) {    //如果不存在这个日期，则添加一个日期
							var date_ul = document.createElement("ul");
							date_ul.className = "task-by-date";
							date_ul.innerHTML = "<li class='task-date'>"+task_date.value+"</li>\
								<li style='padding-left:30px;'>"+task_name.value+"</li>"
							task_list.appendChild(date_ul);
						}
						var detail_html = document.createElement("div");
						detail_html.id = "detail_"+task_rank;
						detail_html.className = "detail";
						detail_html.style.display = "block";
						detail_html.innerHTML = ''
    		+                '<div class="task-nav">'
    		+	                 '<span class="edit-name">'+task_name.value+'</span>'
    		+	                 '<span class="edit-icon"><img class="confirm" src="img/1075671.png"><img class="edit" src="img/1168974.png"></span>'
    		+                 '</div>'
    		+                 '<p class="edit-date">'+task_date.value+'</p>'
    		+                  '<p class="edit-content">'+task_content.value+'</p>'
    	    			document.body.appendChild(detail_html);
    	    			task_edit.style.display = "none";
					}

				}
			}
		}
		
	});
}