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