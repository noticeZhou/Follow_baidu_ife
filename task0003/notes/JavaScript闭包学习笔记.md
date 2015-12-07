##JavaScript闭包学习笔记
###什么是闭包？
######看了一堆的专业文献的解释，越看越糊涂，然后看几个栗子，返过头来看，闭包就是定义在一个函数内部，需要访问外层函数的变量的函数。
###怎么定义？
######在一个函数内部在定义一个函数，并在内部函数中访问外部函数的变量
	function outSide() {
		var name = "andy";
		function inSide() {
			console.log(name)
		}
	}
######这就是一个简单的闭包，inSide函数访问outSide函数的name变量
###要它干吗？
######其实上面定义的那个闭包根本不会被执行，所以需要把它作为返回值，然后执行它。但是这又有什么用呢？这里有一点，我觉得应该是闭包里面最重要的，就是，，，，我们先把代码改过来
	function outSide() {
		var name = "andy";
		function inSide() {
			console.log(name)
		}
		return inSide();
	}
	
	var fn = outSide();
######我们在代码最后执行了outSide函数，并把返回值inSide函数赋给了全局变量fn。按道理说，函数在执行之后就应该消除执行环境。但是在这里因为函数inSide中引用这外部函数的变量name，因此在全局变量fn被消除之前，函数outSide的执行环境不会被消除。so,它到底有什么用？
######首先，它的第一个作用我们已经看见了，就是可以访问函数内部的变量。第二个就是可以保持变量一直在内存中，不会被消除，再来看一个栗子
	function f1(){ 　　
    　　var n=999;
    　　nAdd=function(){n+=1}
    　　function f2(){
	　　　　console.log(n);
	　　}
	　　return f2;
	}

	var result=f1();
	result(); // 999　　
	nAdd();　　 
	result(); // 1000　　
######借用阮哥的栗子。在执行过函数f1之后，f1内部变量n就一直在内存中，所以在执行函数nAdd之后，访问n时，n为1000.
	function f1() {
		var m = 10;
		return function f2() [
			console.log(m)
		}
	}

	var fn = f1();
	m = 100;

	fn();   //10
######在这个例子中，将函数f2返回赋值给fn后，定义全局变量100,。但是此时函数f1的执行环境中，n的值还是10.而在执行闭包函数时，从内部函数作用域沿着作用域链一次向后找，在f1的作用域中找到变量n，所以执行结果为10.
####需要注意的是，使用闭包会很占内存，所以执行之后一定记得消除引用。还有就是当在一个循环中赋值函数时，这些函数将绑定同样的闭包。

#####添加一个权威指南中的栗子
	function counter() {
		var n = 0;
		return {
			count: function { return n++; },
			reset: function { n=0; }
		};
	}

	var c = counter90,d = counter(); //创建两个计数器
	c.count();			//0
	d.count();			//0 他们互不干扰
	c.reset();
	c.count();
	d.count()
######每次调用counter()都会创建一个新的作用域链和一个新的私有变量。因此创建的两个对象之间互不干扰。
######但是下面这个例子的结果就不是这样啦
	function constfuncs(){
		var funcs = [];
		for(var i=0;i<10;i++)
			funcs[i] = function(){ return i;};
		return funcs;
	}

	var funcs = constfuncs();
	funcs[5]();       //10
######结果不是想象中的5.因为循环结束，i的值为10.函数返回的闭包只不过是指向了该函数的作用域链，而不是像上一个例子那样将每一个成员变量复制一遍
####关于this对象
#####一、单纯函数调用的情况
    var name = "this window";

    var object = {
        name: "my object",
        getName: function() {
            return function() {
                return this.name;
            };
        }
    }

    console.log(object.getName()());  //this window
######上面这个例子的结果之所以是全局对象中的name是因为是在全局环境中调用的内部函数。每个函数在被调用时，其活动对象会自动取得this,arguments的值。呢你不函数在搜索这两个变量时，只会搜索到其活动对象为止，永远不可能访问到外部函数的这两个变量。
######上面这个例子如果想要引用外部函数的name变量的值，可以这样稍稍改一下
    var name = "this window";

    var object = {
        name: "my object",
        getName: function() {
			var that = this;
            return function() {
                return that.name;
            };
        }
    }

    console.log(object.getName()());  //my object
######对程序进行了一点小修改，添加了一个that变量，指向this，然后在内部函数中使用that变量。这样，在外面调用内部函数时，就会在外部函数的执行环境中搜索that变量的值，而这里的this引用的当前的object。所以结果是我们想要的 my object
#####二、this还可以作为对象方法被调用
	var x = 0;

	function test() {
		console.log(this.x);
	}

	var obj = new Object();
	obj.test = test;
	obj.x = 1;

	obj.test();  //1
######这里this动态绑定了当前的对象obj，因此引用的是当前对象的变量值
#####三、作为构造函数被调用，此时this指向的就是新建的对象
	var x = 2;

	function test(){
	　　this.x = 1;
	}

	var o = new test();
	console.log(o.x); // 1
#####四，使用apply(),call()。this指向的就是括号里的第一个参数，表示函数当前作用的对象，若为空则表示为全局对象
	var x = 0;
	
	function test(){
		console.log(this.x);	
	}

	var o={};
	o.x = 1;
	o.m = test;
	o.m.apply();     //0
	o.m.apply(0);   //1
	