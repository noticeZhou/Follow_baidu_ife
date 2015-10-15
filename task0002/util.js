window.onload=function(){
	// 使用示例
	var obj = {
	    a: 1,
	    b: 2,
	    c: {
	        c1: 3,
	        c2: 4
	    }
	};
	console.log(getObjectLength(obj)); // 3
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
    for(var i=0;i<arr.length;i++)
    	output.call(this,arr[i],i);
}

// 其中fn函数可以接受两个参数：item和index
function output(item) {
    console.log(item)
}

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
//each(arr, output);  // 0:java, 1:c, 2:php, 3:html

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
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}