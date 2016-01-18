window.onload = function(){
    var moveDiv = document.getElementsByClassName("move");
    for(var i=0,len=moveDiv.length; i<len; i++) {
        EventUtil.addHandler(moveDiv[i],"dragstart",function(event) {
            event.dataTransfer.setData("Text",event.target.id);
        })

        EventUtil.addHandler(moveDiv[i],"drag",function(event) {
            EventUtil.preventDefault(event);
        });
        EventUtil.addHandler(moveDiv[i],"dragenter",function(event) {
            EventUtil.preventDefault(event);
        });
        EventUtil.addHandler(moveDiv[i],"dragleave",function(event) {
            EventUtil.preventDefault(event);
        })
    }

    var targetDiv = document.getElementsByClassName("target");
    for(var j=0,len=targetDiv.length; j<len; j++) {
        EventUtil.addHandler(targetDiv[j],"dragenter",function(event) {
            EventUtil.preventDefault(event);
        });
        EventUtil.addHandler(targetDiv[j],"dragover",function(event) {
            EventUtil.preventDefault(event);
        });
        EventUtil.addHandler(targetDiv[j],"drop",function(event) {
            EventUtil.preventDefault(event);
            var data = event.dataTransfer.getData("Text");
            var targets = event.target;
            var datas = document.getElementById(data);
            if(targets.className === "move") {    //如果当前的目标位置不是容器
                if(datas.offsetTop > targets.offsetTop) {
                    targets.parentNode.insertBefore(datas,targets.nextSibling);
                } else {
                    targets.parentNode.insertBefore(datas,targets);
                }
            } else {
                targets.appendChild(datas);
            }
            
        });
    }
}

