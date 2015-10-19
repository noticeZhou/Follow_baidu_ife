window.onload=function(){
	console.log(outputAttributes(document.getElementsByTagName("div")[0]));
	textnode();
}

//将NodeList对象转成数组
function concertToArray(nodes){
	var array = null;
	try{
		array = Array.prototype.slice.call(nodes,0);  //针对非IE浏览器
	}
	catch(ex){
		array = new Array();
		for(var i=0,len=nodes.length;i<len;i++){      //针对IE8及更早浏览器
			array.push(nodes[i]);
		}
	}
	return array;
}

//判断是否是元素节点
function isElement(element){
	return element.nodeType == 1;
}
//nextSibling表示后一个同胞节点，previousSibling表示前一个同胞节点
function pre_next(node)
{
	if(node.nextSibling === null)
		console.log("last node in the parent's childNodes list.");
	else if(node.previousSibling === null)
		console.log("first node in the parent's childNodes list.");
}

//添加替换节点
function changeSomeNode(node,newNode)
{
    var returnAppendNode = node.appendChild(newNode);  //添加到最后
    var returnInsertNode = node.insertBefore(newNode,node.firstChild)//后者是参考节点
    var returnNode = node.replaceChild(newNode.node.lastChild); //替换后者
    var formerNode = node.removeChild(node.firstChild);  //删除第一个子节点
    var copyNode = node.cloneNode(true); //true表示执行深拷贝
}

//文档信息
function getInformation()
{
	var title = document.title;   //title属性可读写
	document.title = "new title";
	var url = document.URL;
	//取得域名
	var domain = document.domain;
	//取得来源页面的url
	var referrer = document.referrer;
}

//输出特性名值对
function outputAttributes(element)
{
	var pairs = new Array(),
	    attName,
	    attrValue,
	    i,
	    len;
	for(i=0,len=element.attributes.length;i<len;i++){
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if(element.attributes[i].specified)
		    pairs.push(attrName + "=\"" + attrValue + "\"");
	}
	return pairs.join(" ");
}

function textnode()
{
	var element = document.createElement("div");
	element.className = "message";

	var textNode = document.createTextNode("hello!");
	element.appendChild(textNode);

	var anotherNode = document.createTextNode("world");
	element.appendChild(anotherNode);

	document.body.appendChild(element);
	element.normalize();
	console.log(element.childNodes);
	var newNode = element.firstChild.splitText(5);
	console.log(newNode.nodeValue);
}

function loadScript(url)
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src= url;
	document.body.appendChild(script);     //浏览器在执行这一条语句之后立刻开始下载并执行脚本,并且不会阻塞其他文件的加载
}

function vaildLoop()
{
	var divs= document.getElementsByTagName("div");
	var  i,div;
	for(i=0;i<divs.length;i++){
		div = document.createElement("div"); //nodelist对象是动态的，每次访问都会执行一次查询，因此这里是死循环
		document.body.appendChild(div);
	}


	for(i=0,len=divs.length;i<len;i++){    //这里不用每次都访问nodeList，因此不会死循环。这样还能有效提高性能
		div = document.createElement("div");
		document.body.appendChild(div);
	}
}