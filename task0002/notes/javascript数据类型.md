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
####2.1.1、引用类型与基本类型存储的差异
######基本类型的值保存在栈内存中，即栈内存里面存的是一个个的变量值。而引用类型值指的是那些保存在堆内存中的对象，即存在栈内存中的是指针，指向堆内存中的对象。
![](http://i.imgur.com/JCMkylH.png)
####2.1.2、对象
######1、对象有两种定义方式。一种是使用构造函数，还有一种是字面量表示法
######2、有两种方式可以访问对象属性。一种是使用点表示法，一种是使用方括号表示法。在使用方括号表示法时，方括号内必须是字符串。因此可以通过变量来访问对象的属性，而点表示法不行。
####2.2.1、函数。函数实质上是一个对象，而函数名是一个指向堆内存中函数体的指针，因此函数复制，复制的是函数名，是指向函数的指针。
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


#####2.2.2、js函数没有重载，若存在两个同名函数，后面的函数会覆盖前面的。就像这样
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


#####2.2.3、在函数内部有两个特殊的对象，this和arguments。arguments其实就是一个类数组对象，包含着传入函数中的所有参数，他还有一个callee属性，这个属性是一个指针，指向拥有这个arguments对象的函数
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

----------
####2.3、数组
#####2.3.1、跟其他语言不同的是，javascript数组的每一项可以存不同类型的数据，比如第一项存number类型，第二项存string类型等等。而且数组大小可以动态调整。数组的定义
    var num=new Array();
    //或者指明数组中的数据项数
    var num=new Array(20);
    //此时数组有20个存储数据的位置，每一项数据暂时为undefined
    //还可以直接初始化数组
    var num=new Array(1,2,3);
    //这种方法是用数组的构造函数进行初始化，可以省略new
    //还可以这样
    var num = [1,2,3];
    //这种方法叫字面量表示法
#####2.3.2、数组的判定
######对于一个全局作用域来说，使用instanceof操作符就能判断是不是一个数组，但是如果网页中包含多个框架，那么实际上就是有多个全局作用域，因此instanceof操作符就失效了。ECMAScript5新增了Array.isArray()方法
    if(Array.isArray(value){
        //some code
    }
    //支持这个方法的浏览器有IE9+,Firefox4+,Safari 5+,Opera 10.5+,chrome
#####2.3.2、数组的方法
    toString(),valueOf().返回数组中每个值的字符串形式拼接而成的一个用逗号分隔开的字符串
    var num=[1,2,3];
    console.log(num.toString()); //1,2,3
    console.log(num.valueOf()); //1,2,3
    num[10]=4;
    //下标从4到8的值都为undefined
    console.log(num.toString());//1,2,3,,,,,,4
    
    pop(),跟数据结构里面栈的方法一样，移除掉数组里面的最后一个数据
    push()，往数组的末尾添加若干个数据并返回当前数组长度
    var num=[1,2,3];
    num.push(4,6);
    console.log(num.length);//5
    var item=num.pop();
    console.log(item) //6
    console.log(num.length);//4
    
    shift().队列方法，取出数组中的第一项
    unshift(),在数组的最前面加入若干项，并返回当前数组长度
    
    sort()，对数组项先调用toString()进行转型，然后再比较大小
    reverse(),对数组项的顺序进行反转,返回值都是数组
    var num=[0,1,5,10,15];
    num.sort();
    console.log(num);//0,1,10,15,5
    发现这样不对，因为它是按字符串大小进行比较，所以“10”<“5”
    为了解决这个问题，sort()允许将一个函数作为参数

    function compare(value1,value2){
		return value1-value2;
	}
    num.sort(compare);
    console.log(num);//0,1,5,10,15

    concat()方法会先将当前数组copy一份到新数组中，然后将接收到的参数也一并添加到新数组中
    var num1=[1,2,3];
    var num2=[6,7,8];
    var num3=num1.concat(10,15,num2);
    console.log(num3);//1,2,3,10,15,6,7,8

    slice(start,end),接收两个参数，将start位置到end位置之间的所有数据放到新数组中(不包括end项)。如果只有一个参数，则是取这个参数到数组的最末尾(包含最后一项)
    var num1=[1,2,3];
    var num2=num1.slice(1);
    console.log(num1);//1,2,3   原数组不变
    console.log(num2);//2,3
    //如果参数中有负数，则用数组长度加上该数来确定位置。如果结束位置小于开始位置，则返回空数组

    splice(start,number,added),start表示起始位置，number表示要删除的项数，added表示要往数组中添加的数组项，可以有很多项。返回值是原数组中删除的那些数组项。

    var num1=[1,2,3];
    var num2=num1.splice(1,1,4,5,6);//从位置1开始，删除1项，往数组num1中添加4,5,6
    console.log(num1);  //1,4,5,6,3
    console.log(num2);  //2

    indexOf(search,fromIdex)，fromIdex默认为0，查找从fromIdex开始到数组结束，search在数组中的位置
    lastIndexOf()从数组末尾开始向前找
    map(callBack)，返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
#####2.4、Date类型
#####2.5、RegExp类型
######2.5.1、正则表达式的匹配模式支持3个标志：
    g----全局模式。模式将应用在所有字符串中，而非在发现第一个匹配后就停止
    i----不区分大小写模式。忽略模式与字符串之间的大小写差异
    m----多行模式。即在匹配完第一行后不停止匹配

    元字符：  ( [ { \ ^ $ | ? * + . } ] )
    如果要匹配字符串中包含这些字符就必须对他们进行转义


#####2.6函数的按值传参
######JavaScript在向参数传值时是按值传递的，可以把函数的参数看成是函数的局部变量，如果是基本类型值就是直接复制，如果是引用类型值则是像引用类型的复制那样复制。
	function setName(obj) {
		obj.name = "rose";
		obj = new Object();
		obj.name = "andy";
	}

	var person = new Object();
	setName(person);
	console.log(person.name);  //rose
######从上面的这个例子中可以看得出来，如果是按引用传递，那么最后肯定会指向"andy"。而在这里最后person.name的值为rose，说明是把person这个对象copy给了函数的局部变量obj。在将name属性赋值为rose之后，person.name也就是rose。而后面两条语句只不过是在函数内部新建一个局部对象，在函数执行完毕之后就立即被销毁