##task01的思考总结
###CSS布局方式
####一、默认布局模型：流动布局
######1、块状元素都在其包含块内自上而下垂直延伸分布，块元素自动换行
######2、内联元素自左向右水平分布排列，超出包含块的宽度时换行
####二、浮动布局
######任何元素，包括内联元素都可以实现浮动，只需要一行代码就可实现浮动。
######1、块元素不在乎浮动元素的存在，而内联元素会关心这些。举个栗子
    <div class="container">
	    <div style="width:600px;height:300px;background-color:red;float:left;margin:100px"></div>
	    <div style="width:1400px;height:200px;background-color:green"><span>测试测试</span><div>
	</div>
页面：
![](http://i.imgur.com/uaBzpOF.png)
######绿色的div似乎不知道float的红色的div的存在一样，还是从页面的左上角开始显示。但是span里的文字会关心红色div的margin，因此距离红色div右边100px.把span标签换成img标签，图片依旧显示在当前文字的地方。因此如果想要把绿色的div放在红色div的后面，只能在绿色的div上面设置margin并且值要大于红色div元素的宽度（即算上边框，内，外边距）。
######2、元素设置float属性之后，就不再霸道的占据一整行了，文字就可以环绕在这个元素的左右。如果想要继续霸道的占据这一整行，可以使用clear属性，让文字显示在浮动元素的下方。就像这样
    <div style="width:600px;height:300px;background-color:red;float:right;"></div>
	    <p style="clear:right"></p>
######还有一种可以不适用clear属性就实现这种效果的方法，就是给浮动元素设置display:inline-block属性
######3、清除浮动。先看一个栗子
    <style>
		.container{
			width:600px;
			border:10px solid green;
		}
		.container img{
			width:300px;
			height:300px;
			float:right;
		}
	</style>
    <div class="container">
	    <img src="test.jpg">
	    <p>这个图片的高度比包含块的高度要高，然后就溢出到包含块的外面了</p>
	</div>
页面：
![](http://i.imgur.com/7BREfdG.png)
######很明显，整个div的高度只计算了文字部分的高度。因为**浮动元素不参与包含块高度的计算**。那怎么办呢？我们在包含块的样式中加上这么一个属性
    overflow:auto;
然后再看看页面
![](http://i.imgur.com/wO4dDi3.png)
######现在好了吧，这就叫清除浮动，其实是因为设置overflow属性之后触发了BFC，包含块相当于是一个独立的容器，浮动元素参与了包含块高度的计算。
    zoom:1;
######在包含块的样式中加上这一条语句就可以支持IE6了

####三、层模型布局(使用position属性进行布局)
######position有4个值，默认是static，还有relative,absolute,fixed。默认情况下就是按照正常文档流进行Flow布局
######1、相对定位(position:relative)。相对定位是相对于元素原本应该所在的位置进行偏移。用top,right,bottom,left属性进行偏移控制。使用relative的时候需要注意一点的是，元素偏移了，但是偏移之前的位置一直保留了，特别是在向上偏移的时候一定要注意这一点。
######2、绝对定位(position:absolute)。这里说绝对是相对于元素的包含块进行偏移（准确的说，应该是相对于最近的position属性的属性值不是static的父元素的左上角，如果没有，就是相对于body）
######3、固定定位(position:fixed)，跟absolute差不多，只不过它是针对window来说的。它不受文档流的影响，不会根据滚动条的移动而移动

####其他布局
######1、媒体查询
######2、Flex布局。参考[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool "阮一峰  Flex 布局教程")


----------
####练习中遇到的一些小问题和小技巧
######1、img标签周围会有一个小边距。是因为在计算他的高度时加了一个line-height的默认值(4px)。可以设一个font-size:0;
######2、怎么使文字在一个div中垂直居中？机智的我用了一个line-height属性，只要把他的属性值设成跟div的高度一样就可以实现想要的效果
  