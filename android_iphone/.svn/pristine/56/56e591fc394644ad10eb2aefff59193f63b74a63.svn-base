var isPhone = (window.navigator.platform != "Win32");
var isAndroid = (window.navigator.userAgent.indexOf('Android')>=0)?true : false;

/**
 * @param String inWndName 新窗口名称
 * @param String html		新窗口路径
 * @param String inAniID	打开动画
 * @param String f
 */
function openNewWin(inWndName,html,inAniID,f){
	if(inAniID == 0){
		uexWindow.open(inWndName,'0',html,0,'','',(f)?f:0);
		return;
	}
	if(inAniID)
		uexWindow.open(inWndName,'0',html,inAniID,'','',(f)?f:0);
	else
		uexWindow.open(inWndName,'0',html,10,'','',(f)?f:0);
}

/**
 * 关闭窗口
 * @param string n 关闭窗口动画，默认-1
 */
function winClose(n){
	if(n){
		uexWindow.close(n);
		return;
	}
	if(parseInt(n)==0){
		uexWindow.close(n);
		return;
	}
	uexWindow.close(-1);
}

/**
 * 去除字符串中的空格
 * @param String s
 */
function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}

/**
 * 计算字符串的长度
 * @param String strTemp
 */
function fucCheckLength(strTemp) {
	var i, sum;
	sum = 0;
	for (i = 0; i < strTemp.length; i++) {
		if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
			sum = sum + 1;
		else
			sum = sum + 2;
	}
	return sum;
}

/**
 * 输出loag
 * @param String s 需要输出的信息
 * @param String a 添加的标注信息
 */
function logs(s,a){
	if(typeof s == 'object'){
		s = JSON.stringify(s);
	}
	a = a ? a : "";
	if(!isPhone){
		console.log(a+s);
	}else{
		uexLog.sendLog(a+s);
	}
}

/**
 * localStorage保存数据
 * @param String key  保存数据的key值
 * @param String value  保存的数据
 */
function setLocVal(key,value){
	window.localStorage[key] = value;
}

/**
 * 根据key取localStorage的值
 * @param Stirng key 保存的key值
 */
function getLocVal(key){
	if(window.localStorage[key])
		return window.localStorage[key];
	else
		return "";
}

/**
 * 清除缓存
 * @param Striong key  保存数据的key，如果不传清空所有缓存数据
 */
function clearLocVal(key){
	if(key)
		window.localStorage.removeItem(key);
	else
		window.localStorage.clear();
}


//**************************************************************************************************
	/***
	 * 判断用户是否需要登录
	 * @param {Object} key
	 */
	function checkLogin(name,des){
		if(getLocVal('loginStatus') != 'yes'){
			if(confirm("您需要登录以查看该页面！")){
				setLocVal("desPage",des);
				openNewWin('login','login.html',10);
			}else{
				//alert("取消");
			}
				
		}else{
			openNewWin(name,des,10);
		};
			
	}
	/***
	 * 退出已经登录用户
	 * @param {Object} str
	 * @param {Object} callback
	 */
	function exitLogin(){
		if(getLocVal('loginStatus')){
			clearLocVal('loginStatus');
			openNewWin('index','index.html','10');
		}else{
			$toast('用户还未登录!',1000);
		}
	}
	/**
	 * 在通讯录中进入具体的通信录信息时，显示相应的联系人信息，包括拨打电话、发短信，发邮件服务
	 * 
	 */
	function displayUser(){
		var id = window.localStorage['lianxirenID'];
		window.localStorage['lianxirenID'] = '';
		var oDiv = document.getElementsByClassName('lihuistu');
		for(var i=0;i<oDiv.length;i++){
			oDiv[i].style.display = 'none';
		}
		//显示指定的联系人用户
		var iTarget = document.getElementById(id);
		iTarget.style.display = 'block';
		//单个用户发送短信
		var iTargetDivSms = iTarget.children[1].getElementsByTagName('li')[1];
		var telNum = iTarget.children[1].getElementsByTagName('li')[0].innerHTML.split('：')[1];
		iTargetDivSms.onclick = function (){
			window.localStorage['allTelNum'] = telNum;
			uexWindow.open("sms", '0', "sms.html", 10, '', '', '0');
		};
		//单个用户发送邮件
		var iTargetDivMail = iTarget.children[1].getElementsByTagName('li')[3];
		var mailNum = iTarget.children[1].getElementsByTagName('li')[2].innerHTML.split('：')[1];
		iTargetDivMail.onclick = function (){
			window.localStorage['allMailNum'] = mailNum;				
			uexWindow.open("email", '0', "email.html", 10, '', '', '0');
		};
	}

//**************************************************************************************************


/**
 * alert 和 confirm 弹出框
 * @param String str 提示语
 * @param Function callback confirm的回调函数
 */
function $alert(str,callback){
	if(callback){
		uexWindow.cbConfirm = function(opId,dataType,data){
			if(data == 0)
				callback(); 
		}
		uexWindow.confirm('提示',str,['确定','取消'])
	}else
		uexWindow.alert('提示',str,'确定');
}

/**
 * 根据时间戳获取年、月、日
 * @param String str 时间戳
 * @param Boolean f 是否在原来的基础上*1000，true要*，false或不填就不*
 */
function getMakeTimes(str,f){
	var t = (f) ? int(str) : int(str)*1000;
	var d = new Date(t);
	var y = d.getFullYear();
	var m = setNum(d.getMonth()+1);
	var d = setNum(d.d.getDate());
	return y+"-"+m+"-"+d;
}

function setNum(s){
	return (int(s)>9) ? s : '0'+s;
}

/**
 * 在其他窗口中执行指定主窗口中的代码
 * @param String wn  需要执行代码窗口的名称
 * @param String scr 需要执行的代码
 */
function uescript(wn, scr){
	uexWindow.evaluateScript(wn,'0',scr);
}

/**
 * 在其他窗口中执行指定浮动窗口中的代码
 * @param String wn  需要执行代码浮动窗口所在的主窗口的名称
 * @param String pn  需要执行代码的浮动窗口的名称
 * @param String scr 需要执行的代码
 */
function ueppscript(wn, pn, scr){
	uexWindow.evaluatePopoverScript(wn,pn,scr);
}

/**
 * 判断是否是空
 * @param value
 */
function isDefine(value){
    if(value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined'){
        return false;
    }
    else{
		value = value+"";
        value = value.replace(/\s/g,"");
        if(value == ""){
            return false;
        }
        return true;
    }
}

/**
 * 图片预加载
 * @param String imgId div的ID，图片加载成功后给该div换背景
 * @param String imgUrl 图片路径
 */
function preloadImg(imgId,imgUrl){
	var newImg = new Image();
	newImg.src = imgUrl;
	newImg.onload=function(){
		$$(imgId).style.backgroundImage = "url("+newImg.src+")";
		newImg = null;
	}

}

/**
 * 给DOM对象赋值innerHTML
 * @param String id 对象id或者对象
 * @param String html html字符串
 * @param String showstr 当html不存在时的提示语
 */
function setHtml(id, html,showstr) {
	var showval = isDefine(showstr)? showstr : "";
	if ("string" == typeof(id)) {
		var ele = $$(id);
		if (ele != null) {
			ele.innerHTML = isDefine(html) ? html : showval;
		}else{
			alert("没有id为"+id+"的对象");
		}
	} else if (id != null) {
		id.innerHTML = isDefine(html) ? html : showval;
	}
}

/**
 * 设置平台弹动效果
 * @param int sta   0=无弹动效果   1=默认弹动效果  2=设置图片弹动
 * @param Function downcb 下拉
 * @param Function upcb   上拖
 */
function setPageBounce(sta,downcb, upcb){
	if(sta == 0) return;
	var color = "#FFF";
	if(sta == 1){
		var s = ['0', '0'];
		var str = '';
		uexWindow.onBounceStateChange = function (type,status){
			if(downcb && type==0 && status==2) downcb();
			if(upcb && type==1 && status==2) upcb();
		}
		
		uexWindow.setBounce("1");
		
		if(downcb){
			s[0] = '1';
			uexWindow.notifyBounceEvent("0","1");
		}
		if(color){
			uexWindow.showBounceView("0",color,s[0]);
		}else{
			uexWindow.showBounceView("0","rgba(255,255,255,0)",s[0]);
		}
		
		
		if(upcb){
			s[1] = '1';
			uexWindow.notifyBounceEvent("1","1");
		}
		if(color){
			uexWindow.showBounceView("1",color,s[1]);
		}else{
			uexWindow.showBounceView("1","rgba(255,255,255,0)",s[1]);
		}
	//	uexWindow.showBounceView("1","rgba(255,255,255,0)",s[1]);
	}
	if(sta == 2){
		uexWindow.onBounceStateChange = function (type,status){
			uexLog.sendLog("type="+type+"||status="+status);
			if(downcb && type==0 && status==2) downcb();
			if(upcb && type==1 && status==2) upcb();
		}
		uexWindow.setBounce("1");
		
		var inJson ='{"imagePath":"res://reload.png","textColor":"#530606","pullToReloadText":"拖动刷新","releaseToReloadText":"释放刷新","loadingText":"加载中，请稍等"}'
		if(downcb){
			uexWindow.setBounceParams('0',inJson);
			uexWindow.showBounceView('0',color,1);
			uexWindow.notifyBounceEvent('0',1);	
		}
		if(upcb){
			uexWindow.setBounceParams('1',inJson)
			uexWindow.showBounceView('1',color,1);
			uexWindow.notifyBounceEvent('1',1);
		}
	}
}

/***
 * 使弹动重置为初始位置
 * @param String type 弹动的类型 0-顶部弹动  1-底部弹动 
 */
function resetBV(type){
	uexWindow.resetBounceView(type);
}

/**
 * 显示加载框
 * @param String mes 显示的提示语
 * @param String t  毫秒数 窗口存在时间 有的话显示框不显示那个“圈”，并且在t时间后消失
 */
function $toast(mes,t){
	uexWindow.toast(t?'0':'1','5',mes,t?t:0);
}

/**
 * 手动关闭加载框
 */
function $closeToast(){
	uexWindow.closeToast();
}

/**
 * 浮动窗口移动动画函数
 * @param String 横向移动位移
 * @param String 纵向移动位移
 * @param Function 动画结束后的回调函数
 */
function disShowAnim(dx, dy, cb){
	uexWindow.beginAnimition();
	uexWindow.setAnimitionDuration('250');
	uexWindow.setAnimitionRepeatCount('0');
	uexWindow.setAnimitionAutoReverse('0');
	uexWindow.makeTranslation(dx,dy,'0');
	uexWindow.commitAnimition();
	if(cb) uexWindow.onAnimationFinish = cb;
}

/**
 * getJSON请求数据的错误回调函数
 * @param {Object} err 返回的错误对象
 */
function getJSONError(err){
    $closeToast();
	resetBV(0);
	resetBV(1);
	going = 0;
    if (err.message == 'network error!') {
        alert('网络未连接');
    }else if (err.message == 'json parse failed!') {
        alert('网络未连接');
    }else if (err.message == 'file does not exist!') {
		alert('文件不存在');
    }else if (err.message == 'read file failed!') {
		alert('文件读取错误');
    }else {
		alert('发现未知错误');
    }
}

var dbname = "localdb",dbId = 0,userId = 500;
/**
 * 创建或打开数据库
 * @param {Object} cb	初始化DB
 */
function openDB(cb){
	uexDataBaseMgr.cbOpenDataBase = function(opId,type,data){
		if(type==2 && data==0){
			if(cb)	cb();
		}
	}				
	uexDataBaseMgr.openDataBase(dbname,++dbId); 
}


/**
 * 查询操作
 * @param {Object} id
 * @param {Object} sql
 * @param {Object} cb
 */
function selSql(id,sql,cb){
	uexDataBaseMgr.cbSelectSql = function(opId,type,data){
		logs('selSql:	'+opId+','+type+','+data);
		if(type==1){
			if(cb && opId == id)	cb(data);
		//	else if(cb)	cb(false);
		}
	}
	uexDataBaseMgr.selectSql(dbname,id,sql);
}

/**
 * 增删改操作
 * @param {Object} id
 * @param {Object} sql
 * @param {Object} cb
 */
function exeSql(id,sql,cb){
	uexDataBaseMgr.cbExecuteSql = function(opId,type,data){
		logs('exeSql:	'+opId+','+type+','+data);
		if(type==2 && data==0){
			if(cb && opId == id)	cb(data);
			//else if(cb) 	cb(false);
		}
	}
	uexDataBaseMgr.executeSql(dbname,id,sql);
}

/**设置安卓back和menu按键事件监听
 * @b: back键，1为监听。
 * @m: menu键，1为监听。
 * @cb1: back键监听处理回调方法。
 * @cb2: menu键监听处理回调方法。
 */
function addKeyListener(b, m, cb1, cb2){
		uexWindow.onKeyPressed = function(keyCode){
			if(keyCode==0){
				if(cb1)  cb1();
				//uexWidget.finishWidget(''); //退出应用
			}
			else{
				if(cb2) cb2();
			}
		}
		if(b) uexWindow.setReportKey('0', '1');
		if(m) uexWindow.setReportKey('1', '1');
}

/**
 * json对象转为string
 * @param {Object} j
 */
function json2str(j){
	return JSON.stringify(j);
}
/**
 * string转为json对象
 * @param String s
 */
function str2json(s){
	return JSON.parse(s);
}

/**
 * 取input数据
 * @id: input标签id
 * 返回值：数据内容
 */
function getValue(id){
	var e = $$(id);
	if(e) return e.value;
}

/**
 * 设置input数据
 * @id: input标签id
 * @val: 要设置的数据
 */
function setValue(id, val){
	var e = $$(id);
	if(e) e.value = val;
}

/**
 * 创建DOM节点
 * @param String t
 */
function createEle(t){
	return document.createElement(t);
}
/**
 * 删除DOM节点
 * @param String id
 */
function removeNode(id){
	var e = $$(id);
	if(e) e.parentElement.removeChild(e);
}

/**
 * 调用本地浏览器打开网址
 * @param String url
 */
function loadLink(url){
	var appInfo = ''; 
	var filter = '';
	var dataInfo = url.toLowerCase();
	var pf = uexWidgetOne.platformName;
	if(pf=='android'){
		appInfo = 'android.intent.action.VIEW';
		filter = 'text/html';
	}
	if(dataInfo.indexOf('http://')<0 && dataInfo.indexOf('https://')<0){
		dataInfo = 'http://'+dataInfo;
	}
	uexWidget.loadApp(appInfo, filter, dataInfo);
}

/**
 * 下载文件
 *@String url_update 下载路径 
 *@String name   保存的文件名及格式 例：file.jpg
 *@funciton cb   下载成功后的回调函数
 **/
var did = 1000;
function down_file(url_update,name,cb){
	did++;
	if(isAndroid)
		var saveUpdate = "/sdcard/download/"+name;
	else
		var saveUpdate = "wgt://data/"+name;
	$toast("正在加载中...");
	uexDownloaderMgr.onStatus = function(opCode,fileSize,percent,status){
		switch(status) {
			case 0:
				logs(opCode+"=="+percent);
				var str = '下载进度：'+percent+'%';
				if(fileSize==-1) str = '下载中，请稍候...';
				uexWindow.toast('1','5', str,'');
			break;
			case 1:
				uexDownloaderMgr.closeDownloader(opCode);
				uexWindow.closeToast();
				cb(saveUpdate);
			break;
			case 2:
				uexDownloaderMgr.closeDownloader(opCode);
			break;;
		}
	}
	uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
		if(data == 0){
			uexDownloaderMgr.download(opCode,url_update,saveUpdate,'0');
		}else{
			alert("创建失败");
		}
	}
	
	uexFileMgr.cbIsFileExistByPath=function(opId,dataType,data){
		if(isDefine(data)){
			cb(saveUpdate);
		}else{
			did++;
			uexDownloaderMgr.createDownloader(did);	
		}
	}
	uexFileMgr.isFileExistByPath(did,saveUpdate);
}

/**
*检查网络
*返回值：-1=网络不可用  0=WIFI网络  1=3G网络  2=2G网络
*/

function checkNet(cb){
	uexDevice.cbGetInfo=function (opCode,dataType,data){
        var device = eval('('+data+')');
		var connectStatus=device.connectStatus;
		if(isDefine(connectStatus)){
			cb(connectStatus);
			//if(connectStatus==-1){
			//	console.log('网络状态：网络不可用');
			//}else if(connectStatus==0){
			//	console.log('网络状态：WIFI网络'); 
			//}else if(connectStatus==1){
			//	console.log('网络状态：3G网络'); 
			//}else if(connectStatus==2){
			//	console.log('网络状态：2G网络');
			//}
		}
	}
	uexDevice.getInfo('13');
}


function getTimeCallBack(a){
	uexWindow.toast('0','5',a,"1500");
}

/*
function initdata(){
	uexTimeDifference.getTimeCallBack = getTimeCallBack;
	uexTimeDifference.open();
}
*/

// 判断IOS版本号是否大于7，大于7在顶部加20

function add20ToHeader(cb){
	if(!isPhone){
		if(cb) cb();
		return;
	} 
    if (isAndroid){
		if(cb) cb();
		return;
	} 
    if (getLocVal('IOS7Plus')) {
        try {
            if (getLocVal('IOS7Plus') == 2) {
                if ($$('header').style.paddingTop) {
                    $$('header').style.paddingTop = (parseInt($$('header').style.paddingTop) + 20) + 'px';
                }
                else {
                    $$('header').style.paddingTop = '20px';
                }
            }
        } 
        catch (e) {
        }
		if(cb) cb();
    }
    else {
        uexDevice.cbGetInfo = function(opId, dataType, data){
            if (data) {
                var device = JSON.parse(data);
                var os = parseInt(device.os);
                if (os >= 7) {
                    setLocVal('IOS7Plus',2);
                    try {
                        if ($$('header').style.paddingTop) {
                            $$('header').style.paddingTop = (parseInt($$('header').style.paddingTop) + 20) + 'px';
                        }
                        else {
                            $$('header').style.paddingTop = '20px';
                        }
                    } 
                    catch (e) {
                    }
                }else{
					setLocVal('IOS7Plus', 1);
				}
            }
			if(cb) cb();
        };
        uexDevice.getInfo('1');
    }
}
