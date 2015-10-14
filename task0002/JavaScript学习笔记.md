#JavaScript学习笔记

----------

##初识javascript
####1、<script\>标签应该放在哪？
######HTML4规范指出，<script\>标签可以放在<head\>或者<body\>之中。我们习惯性的放在<head\>标签之中，但是浏览器在解析到<script\>标签时，会停止解析其后的内容，而优先下载脚本文件，这样页面就无法渲染。虽然现代浏览器允许并行下载脚本文件，但是还是会阻塞CSS文件和图片的下载，而且要等所有JavaScript代码执行完毕页面才能继续渲染。所以把<script\>标签放在<body\>标签结束之前是个不错的选择，这样哪怕脚本代码下载执行依旧需要时间，但是页面的渲染基本已经完成，因此不会显得页面加载的太慢。
####2、尽可能的合并脚本。页面上的<script\>标签越少，加载也就越快，响应也就越迅速。对于外链脚本而言，减少了<script\>标签也就减少了http请求，当然加快了加载速度。
####3、无阻塞下载JavaScript脚本的方法：
######一、defer属性。defer属性指明本元素所含的脚本不会修改DOM，因此 代码能安全的延迟执行。带有defer属性的<script\>标签可以放在文档的任何位置。浏览器在检测<script\>标签时开始下载脚本文件，但不会执行，直到DOM加载完成，即onload事件触发前才会被执行。带有defer属性的JavaScript文件下载时，它不会阻塞其他文件的下载，因此不会造成页面阻塞。但是只有IE4和Firefox3.5或更高版本的浏览器支持这一属性
######二、通过标准DOM函数创建<script\>元素
    var script = document.createElement ("script");
    script.type = "text/javascript";
    script.src = "script1.js";
    document.getElementsByTagName("head")[0].appendChild(script);
######新的<script\>元素加载script1.js源文件。脚本文件在<script\>添加到页面之后立即开始下载。但是无论在何处开始下载，文件的下载和运行都不会阻塞其他页面处理过程。脚本文件下载完之后立即执行。但是如果脚本只包含供页面其他脚本调用的接口，就会带来问题。
######三、通过onload事件加载脚本文件
######四、通过XHR(XMLHttpRequest)对象加载JavaScript脚本
    var xhr = new XMLHttpRequest();
    xhr.open("get", "script1.js", true);
    xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            var script = document.createElement ("script");
            script.type = "text/javascript";
            script.text = xhr.responseText;
            document.body.appendChild(script);
        }
    }
    };
    xhr.send(null);
######通过向服务器发起GET请求，如果是有效请求就下载脚本文件，但是下载完之后不会立即执行，这样就可以等到一切都准备好之后再执行脚本文件。不过要求脚本文件必须和页面在同一个域里面。

----------
##javascript数据结构
####一、基本类型
######基本类型包括(Number,Boolean,Null,Undefined,String)。undefined类型和null类型都只有一个值，就是undefined和null。基本类型变量存在栈内存中的值就是变量值，所以赋值变量的时候实际上复制的是变量的值。
    var a=1;
	var b=a;
	b=2;
	console.log(a);     //1
	console.log(b);     //2
######因为基本类型在栈内存中存的是值，copy的时候copy的是变量值，因此后面改变b的值并不会影响a的值
![](http://i.imgur.com/smwN5Hm.png)


###二、引用类型
####1、引用类型与基本类型存储的差异
![](http://i.imgur.com/JCMkylH.png)

####2、函数。函数实质上是一个对象，而函数名是一个指向堆内存中函数体的指针，因此函数复制，复制的是函数名，是指向函数的指针。
	function sum(num1,num2){
		return num1+num2;
	}
	console.log(sum(10,10));   //20

	var anotherSum = sum;
	console.log(anotherSum(10,10));//20
	sum=null;

	console.log(anotherSum(10,10)); //20
	console.log(sum(10,10));//报错，此时sum已经不是一个函数
    //栈内存里面的内容已经变成了null，sum已经被回收但是anoither()依旧指向堆内存中的函数体
######可以看到anotherSum()跟sum()指向了同一个函数，anotherSum()也可以被调用并返回结果。因此，要克隆一个函数只需要用"="号将源函数名copy到目标函数名就好了，即把目标函数指向源函数。


#####3、js函数没有重载，若存在两个同名函数，后面的函数会覆盖前面的。就像这样
    function sum(num1,num2){
		return num1+num2;
	}
	console.log(sum(10,10));   //0

	var anotherSum = sum;
	console.log(anotherSum(10,10));//0
	function sum(){
		return 0;
	}

	console.log(anotherSum(10,10)); //0
	console.log(sum(10,10));//0
######后面的sum函数将前面的覆盖，因此调用sum()函数返回的值都是0.这里也可以验证上面所说，复制的是指向函数体的指针。指向的是sum()函数的内容。那这不是深拷贝啊！！！别急，看下面
    var sum=function(num1,num2){
		return num1+num2;
	}
	console.log(sum(10,10));   //20

	var anotherSum = sum;
    //此时anotherSum指向的是sum的函数体，因为程序还没有执行到anotherSum函数的声明
	console.log(anotherSum(10,10));//20
	anotherSum=function(num1,num2){
		return 0;
	}

	console.log(anotherSum(10,10)); //0
	console.log(sum(10,10));//20
######为什么这里就可以实现深拷贝呢？先看看javascript的函数声明和函数表达式：
####4、解析器在向执行环境加载数据时，会率先读取函数声明，并让它在执行任何代码之前可以访问。至于函数表达式，必须等到执行函数体时才会真正的被执行。
    console.log(sum(10,10));
    function sum(num1,num2){
        return num1+num2;
    }
######比如说这个函数，在代码执行之前，解析器就把函数声明加载到执行环境中，这样哪怕是在函数之前的代码调用该函数一样可以正常进行。但是像下面的代码在某些时候可能出错
    console.log(sum(10,10));
    var sum=function(num1,num2){
        return num1+num2;
    }
######这种方式会出现错误是因为函数处在一个初始化语句中，而不是一个函数声明。这样的话，在程序执行到这段代码之前，sum不会出现在栈内存中。因此会导致(意外标识符)错误。
######现在我们返过头来看函数深拷贝的问题。因为我们用变量初始化方式声明函数，这样虽然不能在代码执行之前将函数名加入执行环境，也就是栈内存中。但是这一段代码一定会被执行(如果前面代码不会出现问题的话)。因此在将sum函数复制给anotherSum函数之后，anotherSum指向sum函数体。但是在执行anotherSum函数表达式之后，anotherSum指向了anotherSum的函数体，这样就实现了深拷贝，改变了anotherSum函数的内容。而上一种方式，虽然在解析器将两个函数的声明都加载到了栈内存中，但是都没有加载函数表达式，函数表达式只有在被调用的时候才被加载到执行环境。而在函数复制之后，anotherSum跟sum是一样的，都是指向sum的函数体，因此加载的是sum的函数体，anotherSum的函数体永远都不会被加载进执行环境。


#####5、在函数内部有两个特殊的对象，this和arguments。arguments其实就是一个类数组对象，包含着传入函数中的所有参数，他还有一个callee属性，这个属性是一个指针，指向拥有这个arguments对象的函数
    function factorial(num){
		if(num <=1)
			return 1;
		else
			return num*arguments.callee(num-1);
		}
	var trueFactorial = factorial;
	factorial = function(){
		return 0;
		}
	console.log(trueFactorial(5));//120
	console.log(factorial(5));//0
