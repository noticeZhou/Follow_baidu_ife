window.onload=function(){
	// 使用示例
	console.log($("#adom"));
    console.log($("a"));
    console.log($(".classa"));
    //console.log($("[data-time=2015]"));
    console.log($("[data-log]"));
    console.log($("#adom .classa"));
}

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return (arr instanceof Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return(typeof(fn)=="function");
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var tarObj = new Object();
    for(x in src){
    	if(typeof(src[x]) == "object")
    		tarObj[x]=cloneObject(src[x]); 
    	else if(src[x] instanceof Array){
    		tarObj[x]=src[x].slice(0); 
    	}    
    	else
    	    tarObj[x]=src[x];                     
    }
    return tarObj;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {      //如果该数组项不在表中
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement

}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/\s*\t*\r*\n*/g,'');
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    return arr.map(fn);
}

// 其中fn函数可以接受两个参数：item和index
function output(item) {
    console.log(item)
}

// 使用示例

function output(item, index) {
    console.log(index + ': ' + item)
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var result=0;
	for(x in obj){
		if(x)
			result++;
	}
	return result;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var  re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var re = /^1{1}\d{10}$/;
    return re.test(phone);
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

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    
    while(current !== null){
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;         //元素绝对位置
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat"){
        var elementScrollTop = document.body.scrollTop;     //滚动条
        var elementScrollLeft = document.body.scrollLeft;
　　} 
    else {
        var elementScrollTop = document.documentElement.scrollTop; 
        var elementScrollLeft = document.documentElement.scrollLeft; 　
    }
    return{
        x: actualLeft - elementScrollLeft,         //相对浏览器窗口的位置
        y: actualTop - elementScrollTop
    };
}

// 实现一个简单的Query
function $(selector) {
    var re_id = /^#(\w+)$/;
    var re_class = /^\.(\w+)$/;
    var re_diy = /^\[(data-\w+)\]$/;
    var re_diYoo = /^\[data-time=2015\]$/;
    var re_com = /^#(\w+)\s+\.(\w+)/;
    if(re_id.test(selector)){      
        var idName = RegExp.$1;                  // 可以通过id获取DOM对象，通过#标示，例如$("#adom");
        return document.getElementById(idName);  // 返回id为adom的DOM对象
    }
    else if(re_class.test(selector)){            // 可以通过样式名称获取DOM对象，例如$(".classa"); 
        var className = RegExp.$1;               // 返回第一个样式定义包含classa的对象
        return document.getElementsByClassName(className)[0];
    }
    else if(re_diy.test(selector)){              // 可以通过attribute匹配获取DOM对象，例如$("[data-log]");
        var s = RegExp.$1;                        // 返回第一个包含属性data-log的对象
        var pairs = document.getElementsByTagName("*");
        for(var i=0,len=pairs.length;i<len;i++){
            for(var j=0,leng=pairs[i].attributes.length;j<leng;j++){
                if(pairs[i].attributes[j].nodeName === s)
                    return pairs[i];
            } 
        }
    }
    else if(re_diYoo.test(selector)){            // 返回第一个包含属性data-time且值为2015的对象$("[data-time=2015]");
        var pairs = document.getElementsByTagName("*");
        for(var i=0,len=pairs.length;i<len;i++){
            for(var j=0,leng=pairs[i].attributes.length;j<leng;j++){
                if(pairs[i].attributes[j].nodeName === "data-time"  && pairs[i].attributes[j].value == "2015")
                    return pairs[i];
            } 
        }
    }
    else if(re_com.test(selector)){            // 可以通过简单的组合提高查询便利性，例如$("#adom .classa");
        var re_comId = RegExp.$1;              // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
        var re_comClass = RegExp.$2;
        var ansList = document.getElementById(re_comId);
        return ansList.getElementsByClassName(re_comClass)[0];
    }
    else{                                                        // 可以通过tagName获取DOM对象，例如$("a");
        return document.getElementsByTagName(selector)[0];        // 返回第一个<a>对象
    } 
}
