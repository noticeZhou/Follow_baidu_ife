##JavaScript原型和原型链
#####我们在Java中学过类，可是在JavaScript中没有类这个概念，更为灵活的原型替代了类
######JavaScript中，**“一切都是对象”(值类型不是)，对象是一个属性的集合**。函数也是一个对象，也有着length等等的变量。对象是通过函数创建的。比如
    var obj = new Object();
	var arr = new Array();
	console.log(typeof (Object));  // function
	console.log(typeof (Array));  // function
	//这里Array(),Object()就是两个构造函数
######
####一、什么是原型？
######我对原型的理解是，原型是一个属性，一个指针，指向一个对象。而这个对象包含着特定类型(可以是函数，Object或其他引用类型)的所有实例共享的所有属性和方法。