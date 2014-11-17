/***
 * function: 及时显示所选择图片
 * author: quote
 */ 

function showChosenPic(disPic, imgFile) {
    var pic = document.getElementById("img"),
        file = document.getElementById("chooseimg");
 
    var ext = imgFile.value.substring(imgFile.value.lastIndexOf(".")+1).toLowerCase();
 
     // gif在IE浏览器暂时无法显示
     if(ext != 'png' && ext != 'jpg' && ext != 'jpeg'){
         alert("图片的格式必须为png或者jpg或者jpeg格式!"); 
         return;
     }
     var isIE  = navigator.userAgent.match(/MSIE/) != null,
         isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null;
 
     if(isIE){
    	imgFile.select();
        var reallocalpath = document.selection.createRange().text;
 
        // IE6浏览器设置img的src为本地路径可以直接显示图片
         if (isIE6){
        	 disPic.src = reallocalpath;
         }else{
            // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
        	 disPic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
        	 disPic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
         }
     }else{
        html5Reader(disPic, imgFile);
     }
 }
 
 function html5Reader(disPic, file){
     var file = file.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(e){
         disPic.src = this.result;
     }
 }
