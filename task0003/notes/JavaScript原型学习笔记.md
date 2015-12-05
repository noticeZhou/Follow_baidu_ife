##JavaScript原型和原型链
#####我们在Java中学过类，可是在JavaScript中没有类这个概念，更为灵活的原型替代了类

####JavaScript中没有类的概念，那怎样才能实现类的功能呢？起初有这么几个方法
    function createPerson(name,age,job){
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function(){
			console.log(this.name);
		};
		return o;
	}
	var person1 = createPerson("rose",20,"student");
######这种方法叫做工厂模式，可以实例化一个个的对象。但是没有解决对象识别的问题(即创建的是什么类型的对象)。
    function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function() {
			console.log(this.name);
		};
	}
	var person1 = new Person("rose",20,"student"); 
######这种方法叫构造函数模式。这种模式没有显示的创建对象也没有return语句，直接将属性和方法赋给了this对象。最后使用new操作符创建了一个Person实例。可以用instanceof检验，这个实例既是Person实例，又是一个对象。因为函数本身就是对象。
######JavaScript中，**“一切都是对象”(值类型不是)，对象是一个属性的集合**。函数也是一个对象，也有着length等等的变量。对象是通过函数创建的。比如
    var obj = new Object();
	var arr = new Array();
	console.log(typeof (Object));  // function
	console.log(typeof (Array));  // function
	//这里Array(),Object()就是两个构造函数

----------
####原型模式
#####上面说到的两种创建对象实例的方式，相当于是把一本书直接复印了一遍，可以对复印出来的书进行各种修改，但是每一个实例就复印一遍，多浪费纸啊(浪费内存)。所以就有了函数原型prototype.
    function Person(){}
	Person.prototype.name = "rose";
	Person.prototype.age = 20;
	Person.prototype.job = "student";
	Person.prototype.friends = ["shalby","van"];
	Person.prototype.sayName = function() {
		console.log(this.name);
	};

	var person1 = new Person();
######通过函数原型来创建实例，就像是copy了一份目录(原型就像是一个指针)，需要找哪一章节(访问变量和方法)就直接按目录找，这样就大大减少了纸张的浪费(内存的花费)。但是原型模式也有一个问题，如果修改实例的引用类型变量，将会直接体现在原型上.比如说，如果修改上面的实例person1的firends变量
    person1.firends.push("andy");
	var person2 = new Person();
	console.log(person2.firends);//shably,van,andy
######可以看到原型中的firends变量发生了改变，就像之前在数据类型中说的那样，引用类型变量存储在栈内存中的只是一个指针，变量的值存储在堆内存中，所以修改实例的引用类型变量，就是修改了堆内存里面的值。因为这样的问题，所以出现了组合使用构造函数模型和原型模式的方法
    function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["shalby","van"];
	}    
	Person.prototype = {
		constructor : Person,
		sayName: function() {
			console.log(this.name);
		}
	}

	var person1 = new Person("rose",20,"student");
	person1.firends.push("andy");
	var person2 = new Person("Brooks",30,"engineer");
	console.log(person2.friends);//shalby,van
	console.log(person1.friends);//shalby,van,andy
######通过组合使用两种模式，构造函数中的变量和方法将会全部的复制到新建的对象上，这时就不会出现上面的问题了。
/*2015-12-5.这里做一个小小的修改,当时写的时候没有经过更深思考就写完了，今天重新翻开红宝书看到这一章时引发了新的思考\*/
#####又看了一遍红宝书，当看到这里时，因为前面提到，如果只修改实例的一个基本类型变量，那么后面在引用时，只搜索到实例这一层就找到了变量值，因此只修改基本变量值不会影响到原型，也就是说，该构造函数的其他实例是不受影响的。那么既然如此，如果我只是给实例添加一个引用类型的值，并进行修改，原型也肯定不会变咯！有点绕口，先上代码
	function Person() {
    }
    Person.prototype = {
        constructor: Person,
        name: "rose",
        age: 20,
        friends: ["andy","kawayi"],
        sayHi: function() { console.log("HI"); }
    };

    var boy = new Person();
    var girl = new Person();
    boy.friends = ["James"];
    boy.friends.push("Jordan");
	console.log(boy.friends);  //James,Jordan
	console.log(girl.friends);  //andy,kawayi

    boy.sayHi = function() { console.log("HI,I hava changed"); };
    boy.sayHi();   //HI,I hava changed
    girl.sayHi();   //HI
######从上面的代码可以看到，我们实现了我们想要的效果，boy实例的friends数组和sayHi函数发生了变化，而其他实例仍然从原型继承变量的值。
######那这到底是为什么呢？为什么这样就可以实现了。我们再看看之前是怎么写的
	person1.firends.push("andy");
	var person2 = new Person();
	console.log(person2.firends);//shably,van,andy
######可以看到，之前是直接push，在push之前是直接访问的friends数组，因为此时只有原型中有friends数组，所以这里的数组肯定是引用的原型中的数组。改变这个数组的值，其他实例访问数组访问到的值肯定是改变过的
######为什么我们后面的写法是对的呢？因为我们不是访问的原型中的friends数组，而是创建了一个数组，然后对他进行改变，因为这个数组只是boy实例的一个私有变量，所以其他实例访问不到，得进行下一级搜索，找到了原型中的friends数组。
######好了，有人说这样只能新建一个变量，不能直接修改，那先访问以下不就好了，就像这样
	boy.friends = girl.friends;
	boy.friends.push("James");
######这样就妥妥的了。那这有什么用了，我可以用组合使用函数模式和原型模式来替代啊，组合模式每创建一个对象就要分配一块内存来存构造函数生成的东西，内存不要钱啊？！当然，这种模式适合共享的东西比较普遍，每个实例基本一样。如果很多实例的这些属性都不一样，那么就应该使用组合模式
----------
####原型链
#####前面说过可以修改原型模式实例的基本类型变量，并且只体现在实例上。那么为什么呢？是如果直接覆盖了栈内存中的值，那么原型中变量值不也变了吗?究竟是怎么回事呢？让我们来看看原型链到底是个什么鬼。还是这个例子
	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["shalby","van"];
	}    
	Person.prototype = {
		constructor : Person,
		sayName: function() {
			console.log(this.name);
		}
	}

	var person1 = new Person("rose",20,"student");
	person1.email = "xxx@xxx.com";//给实例对象添加一个属性
![](http://i.imgur.com/weuzO9a.png)
######上图是例子中的实例以及构造函数和原型之间的关系。原型中的constructor属性指向构造函数，实例中的默认属性[[prototype]]指向原型，此时给实例添加一个属性email，就只是加在实例对象上，实例访问属性或方法最多会经过这么三个步骤：1)搜索实例。2)搜索原型。3）搜索Object.prototype(图中没有画出来，是默认的原型，有hasOwnProperty等重要方法)。
######原型和原型链差不多就说到这了。有几个需要小心注意的点。1）如果在实例化一个对象后重写原型，实例不会指向新原型
	function Person(){};
	var person1 = new Person();
	Person.prototype = {
		name: "rose",
		sayName: function(){
			console.log(this.name);
		}
	}
	console.log(person1.name);//会输出空格，默认值是空格
	person1.sayName();//会报错
