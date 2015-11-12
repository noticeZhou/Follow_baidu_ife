##JavaScript作用域
####JS作用域的实现使用的是列表
- 任何执行上下文时的作用域，都是作用域链来实现
- 在一个函数定义的时候，会将它定义时的作用域链链接到这个函数对象的[[scope]]属性
- 在一个函数对象被调用的时候，会创建一个活动对象，然后对于没一个函数的形参，都命名为该活动对象的命名属性，然后将这个活动对象作为此时的作用域链最前端，并将这个函数对象的[[scope]]加入到作用域链中
####用一个函数实现的过程来解释JS作用域链
######1、定义函数
    var func = function(fp, sp) {
          var name = 'andy';
          ........
     }
######在执行函数定义语句的时候，会创建这个函数对象的[[scope]]对象，把它加到此时的作用域链上，这里的作用域实际上只是全局活动对象
######2、JS引擎预编译，创建一个活动对象obj，创建arguements属性，添加两个命名属性，obj.fp,obj.sp.对于每一个在这个函数中申明的局部变量和函数定义，都作为这个活动对象的属性
######3、调用函数。将调用参数传给形参，缺省为undefined。然后将这个活动对象作为作用域链的最前端，并将定义函数时所指向的活动对象添加到作用域链
######发生标识符解析时，从当前活动对象开始依次往后查找标识符，如果一直找不到，则表示该标识符没有定义
####举个栗子
     var name = 'andy';
     function echo() {
          alert(name);
     }
 
     function env() {
          var name = 'rose';
          echo();
     }
 
     env();  //andy
######定义echo函数时的顶级活动对象是全局活动对象
    [[scope chain]] = [
    {
     	name : 'andy',
    }, {
     	window call object
    }
    ]
######调用函数echo时，将echo活动对象添加到作用域链的最前端
    [[scope chain]] = [
    {
		echo call object
	},{
     	name : 'andy',
    }, {
     	window call object
    }
    ]
######发生name标识符解析时，找到全局变量值，因而输出答案是andy。从上面的作用域链可以看出来env函数中的局部变量name根本不在作用域链中，所以如果这里没有全局变量，那么name将是一个未定义的变量(其实我说谎了，window.name有默认值空格，如果在全局活动对象中可以找到name).
####再来一个复杂点的栗子
    function factory() {
     var name = 'laruence';
     var intro = function(){
          alert('I am ' + name);
     }
     return intro;
    }
 
	function app(para){
	     var name = para;
	     var func = factory();
	     func();
	}
	 
	app('eve');  //I am laruence