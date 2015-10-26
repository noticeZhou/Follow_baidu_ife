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


    

