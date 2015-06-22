//var globalUrl = "http://www.baishida.net.cn";
//var globalUrl = "http://192.168.1.101";
var globalUrl = "http://111.9.120.21";
var softvision = "3.1";

/**
 * 加载每个模块的首页
 * @param {String} m 每个模块的标准名称
 * @param {Object} inAniID 打开新窗口的动画
 */
function loadModelIndex(name,path,inAniID){
	var aniId = inAniID || 0;
	//1:修改改上导航内容
	//....
	
	//2:主区域加载对应模块的首页（首页命名均为模块名加"_index.html"结尾）
	//zy_con("content",modelPath, 0, $$("header").offsetHeight);
	uexWindow.open(name, 0, path, aniId, '100%', '100%', 0x0);
}

/**
 * 图片切换切换与滚动与切换效果
 * @param {Object} picId 切换块元素id
 * @param {Object} dir 切换方向
 * @param {Object} autoFlip 是否自动切换
 * @param {Object} intervalTime 自动切换时间
 */
var zkqwySlide = function(picId,dir,autoFlip,intervalTime) {
	var dir = dir || 'H';
	var autoFlip = autoFlip || false;
//	var intervalTime = intervalTime || 2000;
	var intervalTime = 6000;
	var newsPicSlide = new zySlide(picId,dir,function(){},false,function(e){
		if(autoFlip) {
			jq('#circle span').filter('.cur').removeClass('cur');
			jq('#circle span').eq(this.currentPoint).addClass('cur');
		}
	}); 
	
	if(autoFlip) {
		setInterval(function(){
			if(newsPicSlide.hasNext()) {
				newsPicSlide.toNext().animate({opacity:'1'},200);
			} else {
				newsPicSlide.moveToPoint(0).animate({opacity:'0'},200);
				
			}
		},intervalTime);
	}
	
	return newsPicSlide;
}

function alertTip1() {
	alert('馆友您好，您当前进行的操作正在开发中，新版本即将完善，请期待，谢谢！');
}

/**
 * 上拉刷新和下拉刷新
 * @param {Object} id
 */
var pullDownUp = function(id) {
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset;
	
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;

	var myScroll = new iScroll(id, {
		fixedScrollbar:false,
		vScrollbar:false,
		checkDOMChanges:true,
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更多...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在刷新...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	setTimeout(function () { document.getElementById(id).style.left = '0'; }, 800);
	return myScroll;
}
var pullUp = function(id) {
	var myScroll,
	pullUpEl, pullUpOffset;
	
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;

	var myScroll = new iScroll(id, {
		fixedScrollbar:false,
		vScrollbar:false,
		checkDOMChanges:true,
		useTransition: true,
		onRefresh: function () {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';				
				pullUpAction(pullUpEl);	// Execute custom function (ajax call?)
			}
		}
	});
	setTimeout(function () { document.getElementById(id).style.left = '0'; }, 800);
	return myScroll;
}
var pullDown = function(id) {
	var myScroll,
	pullDownEl, pullDownOffset;
	
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	var myScroll = new iScroll(id, {
		fixedScrollbar:false,
		vScrollbar:false,
		checkDOMChanges:true,
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';				
				pullDownAction();	// Execute custom function (ajax call?)
			}
		}
	});
	setTimeout(function () { document.getElementById(id).style.left = '0'; }, 800);
	return myScroll;
}

//转换时间格式
function getLocalTime(nS) {
	var day = new Date(parseInt(nS) * 1000);
	return  day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate()+" "+day.getHours()+":"+day.getMinutes();
}

var scmMask = function() {
	return {
		id:"",
		mask:function(id) {
			var that =this;
			that.id = id;
			jq('#'+id).append('<div id="scm-waiting-mohu" style="z-index:999;position:absolute;left:0;top:0;height:100%;width:100%;background-color:#c9cdcc;"></div>'+
							  '<div id="scm-waiting-img" style="z-index:999;position: absolute;left: 40%;top: 40%;"><img src="../app/img/loadinglit.gif" /><b>正在加载...</b></div>');
							  
		},
		unmask:function(){
			jq('#scm-waiting-mohu').remove();
			jq('#scm-waiting-img').remove();
		}
		
	}
}();


(function(w) {
	var ScmUser = function() {
		return {
				userId : "",
				userPwd : "",
				sessionId : "",
				getUserId : function(){
					return this.userId;
				},
				setUserId : function(id) {
					this.userId = id;
				},
				getUserPwd : function() {
					return this.userPwd;
				},
				setUserPwd : function(pwd) {
					this.userPwd = pwd; 
				},
				getSessionId : function() {
					return this.sessionId;
				},
				setSessionId : function(id) {
					this.sessionId = id;
				},
				setScmUserLocal : function() {
					var userstr = '{"userid":"'+$scm.getUserId()+'","pwd":"'+$scm.getUserPwd()+'","sessionId":"'+$scm.getSessionId()+'"}';
					window.localStorage["scm_user"] = userstr;
				},
				getScmUserLocal : function() {
					var user;
					if(localStorage["scm_user"]) {
						user = eval('('+localStorage["scm_user"]+')');
						return user;
					}
				},
				clearScmUser : function() {
					localStorage.removeItem("scm_user"); 		
				},
				checkLogin : function(callback,opt) {
					var user = $scm.getScmUserLocal() || "";
					if(user != "") {
						if(user.userid != "" && user.pwd != "" && user.sessionId != "") {
						} else {
							opt.isLogin = false;
							callback(opt);
							return;
						}
					} else {
						opt.isLogin = false;
						callback(opt);
						return;
					}
					
					var params = [
									{"key":"scm_dopost","type":"0","value":"scm_login"},	
									{"key":"scm_method","type":"0","value":"CheckLogin"}, 
									{"key":"scm_sessionid","type":"0","value":user.sessionId},
									{"key":"scm_userid","type":"0","value":user.userid},
									{"key":"scm_userpwd","type":"0","value":user.pwd}
								];
					$.getJSON
					(
						globalUrl + "/scmuseum/scmweb/member/scm_login.php", 
						function(resp) {
							if(resp.success == "true") {
								opt.isLogin = true;
							} else {
								opt.isLogin = false;
							}
							callback(opt);
						},
						"json",
						function(){uexWindow.alert("提示","操作失败，请重试！","确定")},
						"post",
						params,
						false
					);
				},
				isLogin : function() {
					var user = $scm.getScmUserLocal() || "";
					if(user != "") {
						if(user.userid != "" && user.pwd != "" && user.sessionId != "") {
						} else {
							loadModelIndex('loginout','loginout.html',4);
							return;
						}
					} else {
						loadModelIndex('login','login.html',4);
						return;
					}
					
					var params = [
									{"key":"scm_dopost","type":"0","value":"scm_login"},	
									{"key":"scm_method","type":"0","value":"CheckLogin"}, 
									{"key":"scm_sessionid","type":"0","value":user.sessionId},
									{"key":"scm_userid","type":"0","value":user.userid},
									{"key":"scm_userpwd","type":"0","value":user.pwd}
								];
					$.getJSON
					(
						globalUrl + "/scmuseum/scmweb/member/scm_login.php", 
						function(resp) {
							if(resp.success == "true") {
								loadModelIndex('loginout','loginout.html',4);
								return;
							} else {
								loadModelIndex('login','login.html',4);
							}
						},
						"json",
						function(){uexWindow.alert("提示","操作失败，请重试！","确定")},
						"post",
						params,
						false
					);
				},
				login : function(userid,pwd) {
					var user = $scm.getScmUserLocal() || "";
//					if(user != "") {
//						if(user.userid != "" && user.pwd != "" && user.sessionId != "") {
//							alert("您已登录!");
//							return;
//						}
//					}
					
					var params = [
									{"key":"scm_dopost","type":"0","value":"scm_login"},	
									{"key":"scm_method","type":"0","value":"Login"}, 
									{"key":"scm_userid","type":"0","value":userid},
									{"key":"scm_userpwd","type":"0","value":pwd}
								 ];
					$.getJSON
					(
						globalUrl + "/scmuseum/scmweb/member/scm_login.php", 
						function(resp) {
							if(resp.scm_result == 'true') {
								$scm.setUserId(resp.scm_userid);
								$scm.setUserPwd(resp.scm_userpwd);
								$scm.setSessionId(resp.scm_sessionid);
								$scm.setScmUserLocal();
								uexWindow.alert("提示","恭喜您\""+resp.scm_userid+"\"登录成功,现在您可以进行其它操作了！","确定");
//								loadModelIndex('index','index.html',1);
								uexWindow.close(-1);
							} else {
								uexWindow.alert("提示",resp.scm_infor,"确定");
							}
						},
						"json",
						function(){uexWindow.alert("提示","操作失败，请重试！","确定")},
						"post",
						params,
						false
					);
				},
				loginOut : function() {
					var user = $scm.getScmUserLocal() || "";
					if(user == "") {
						uexWindow.alert("提示","馆友您好，您已退出登录！","确定");
						loadModelIndex('index','index.html',1);
						return;
					}
					
					var params = [
									{"key":"scm_dopost","type":"0","value":"scm_login"},	
									{"key":"scm_method","type":"0","value":"LoginOut"},
									{"key":"scm_sessionid","type":"0","value":user.sessionId},
								 ];
					$.getJSON
					(
						globalUrl + "/scmuseum/scmweb/member/scm_login.php", 
						function(resp) {
							if(resp.scm_result == 'true') {
								$scm.clearScmUser();
								uexWindow.alert("提示","馆友您好，您已成功退出！","确定");
								loadModelIndex('index','index.html',1);
							} else {
								uexWindow.alert("提示","退出失败请重试！","确定");
								result = resp.scm_infor;
							}
						},
						"json",
						function(){uexWindow.alert("提示","操作失败，请重试！","确定")},
						"post",
						params,
						false
					);
				},
				reply : function(aid,content,validate,commentId) {
					var opt = {isLogin:false,aid:aid,content:content,validate:validate,commentId:commentId};
					$scm.checkLogin(function(opt){
						var user = $scm.getScmUserLocal() || "";
						if(opt.isLogin) {
							var params = [
											{"key":"scm_dopost","type":"0","value":"scm_feedback"},	
											{"key":"scm_method","type":"0","value":"SendFeedback"},
											{"key":"scm_sessionid","type":"0","value":$scm.getScmUserLocal().sessionId},
											{"key":"scm_aid","type":"0","value":opt.aid},
											{"key":"scm_mid","type":"0","value":$scm.getScmUserLocal().userid},
											{"key":"scm_content","type":"0","value":opt.content},
											{"key":"scm_validate","type":"0","value":opt.validate},
											{"key":"scm_comment_id","type":"0","value":opt.commentId}
										 ];
							$.getJSON
							(
								globalUrl + "/scmuseum/scmweb/feedback/scm_feedback.php", 
								function(resp) {
									var back_winname = "";
									if(resp.success == 'true') {
										uexWindow.alert("提示","评论成功！","确定");
										localStorage["commentId"] = "null";
										back_winname = window.localStorage["reply_back_winname"];
										if(back_winname && back_winname != "") {
											uexWindow.evaluateScript(back_winname,0,"location.href = location.href;");
										}
										uexWindow.close(-1);
									} else {
										uexWindow.alert("提示",""+resp.data,"确定");
										changeVali();
									}
								},
								"json",
								function(){uexWindow.alert("提示","操作失败，请重试！","确定")},
								"post",
								params,
								false
							);
						} else {
							uexWindow.alert("提示","您未登录，请先登录！","确定");
							loadModelIndex('login', 'login.html', 1);
						}
					},opt);
				}
			}
	}();
	w.$scm = ScmUser;
})(window);

(function(w) {
	var ScmUtil = function() {
		return {
				curFileBasePath : '',
				phoneMenu : function(curFileBasePath) {
					$ScmUtil.curFileBasePath = curFileBasePath;
					//拦截系统menu菜单键
					uexWindow.setReportKey('1', '1');
					uexWindow.onKeyPressed = function(keyCode){
						$ScmUtil.popPhoneMenu();
					}
				},
				phoneBack : function(curFileBasePath) {
					$ScmUtil.curFileBasePath = curFileBasePath;
					//拦截系统back返回键
					uexWindow.setReportKey('0', '1');
					uexWindow.onKeyPressed = function(keyCode){
						$ScmUtil.popPhoneBack();
					}
				},
				popPhoneBack : function() {
					confirmType = "stop";
					uexWindow.confirm("提示","是否终止下载新版本？","确定,取消"); 
				},
				popPhoneMenu : function() {
					uexWindow.cbActionSheet = $ScmUtil.callbackPhoneMenu;
					uexWindow.actionSheet('菜单','退出程序',['系统设置']);
				},
				callbackPhoneMenu : function(opId,dataType,data){
					if(data == 0){
						uexWindow.open('introduce', 0, $ScmUtil.curFileBasePath+'introduce/setting.html', 1, '100%', '100%', 0x0)
					}else{
						uexWidgetOne.exit();
					}
				}
			}
	}();
	w.$ScmUtil = ScmUtil;
	$ScmUtil.phoneMenu();
})(window);

var inOpCode = 1;
var downloadUrl = "";

/**
 * 检查版本更新
 */
function checkSoft(isIndex){
	if (isIndex != 1) {
		uexWindow.toast(1, 5, "检查版本中...", 0);
	}
	var checkSoftVisionUrl = globalUrl + "/scmuseum/scmweb/update/scm_update.php?scm_dopost=scm_update&scm_method=GetCurVersion";
	$.getJSON(checkSoftVisionUrl, function(msg) {
			if(Number(msg.ver_num) > Number(softvision)){
				confirmType = "soft";
				uexWindow.confirm("提示","检测到新版本：" + msg.ver_num + "是否下载？","进入下载,下次提醒"); 
			}else{
				if(isIndex != 1){
					uexWindow.alert("检测版本","您已是最新版本！","确定");
				}
			}
			uexWindow.closeToast();
	},'json');
}

/**
 * 进入下载页面
 */
function getSoftVision(){
	var dataInfo = globalUrl+"/scmuseum/download/mobile.php";
	var plat = uexWidgetOne.getPlatform();
	if(plat == 1) {
		var appInfo = "android.intent.action.VIEW";
		var filter = "text/html";
		uexWidget.loadApp(appInfo, filter, dataInfo);
	} else {
		dataInfo = "https://itunes.apple.com/cn/app/si-chuan-bo-wu-yuan-zhang/id581486853?mt=8";
		uexWidget.loadApp(dataInfo,0,0);
	}
}
/**
 * 获取版本地址并更新
 */
function getSoftVision_bak(){
	uexWindow.toast(1,5,"获取新版本中...",0);
	var getSoftVisionUrl = globalUrl + "/scmuseum/scmweb/update/scm_update.php?scm_dopost=scm_update&scm_method=DownloadURL";
	$.getJSON(getSoftVisionUrl, function(msg) {
		if(msg.url != ""){
			uexWindow.closeToast();
			downloadUrl = msg.url;
			inOpCode = 1;
			uexDownloaderMgr.createDownloader(inOpCode); 
		}
	},'json');
}
uexWidgetOne.cbError = function(opCode,errorCode,errorInfo){
	uexWindow.alert("错误提示",errorInfo,"确定");
}



//--------------------------------------------评论----------------------------------------------
var replyPage = 1;
var allPage = 1;
var replyNumName = "";
//获取评论
function getReplyData(isFirst,page){
	var getReplyUrl = globalUrl + "/scmuseum/scmweb/feedback/scm_feedback.php?scm_dopost=scm_feedback&scm_method=GetFeedbackList&page=" + page + "&scm_aid=";
	var articleId = window.localStorage["articleId"];
	if(isFirst) {
		replyNumName = document.getElementById("replynum").innerHTML;
		replyPage = 1;
	}
	if(articleId > 0){
		getReplyUrl += articleId;
		var str = "<div class='ub ubb b-org ub-ver'><div class='ub t-wh'><div class='ub-f1 r-user'>";
		var replyStr = "";
		if(replyPage > allPage){//如果到最后一页直接返回
			uexWindow.toast('0','5','没有更多了！','2000');
			return;
		}
		$.getJSON(getReplyUrl, function(msg) {
			if(msg.success || null != msg.data){
				var replyData = msg.data;
				replyPage++;
				allPage = replyData.allpage;
				setCommentCount(replyData.totalcount);//设置总评论条数
				loadReplyData(replyData.feedbacklist);
				uexWindow.toast('0','5','加载成功！','2000');
					$$("pullUp").style.display = "block";
			}else{
				uexWindow.toast('0','5','没有更多了！','2000');
			}
			divScroll.refresh();
			uexWindow.closeToast();
		},'json');
	}
}

function reply(commentId){
	//判断是否是对回复内容进行回复 
	window.localStorage["commentId"]=commentId || 'null';
	loadModelIndex('reply_comment','../reply_comment.html',1);
}

//上拉加载
function pullUpAction (pullUpEl) {
	getReplyData(false,replyPage);
	if(replyPage > allPage){
		pullUpEl.className = '';
		uexWindow.toast('0','5','没有更多了！','2000');
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有了...';
	} else {
		uexWindow.toast('0','5','加载成功','2000');
	}
}

//加载回复内容
function loadReplyData(dataList){
	var html = "";
	for(var i in dataList) {
		if (!dataList[i].parent) {
			html += getReplyTmplData_1(dataList[i]);
		}
		if (dataList[i].parent) {
			html += getReplyTmplData_2(dataList[i]);
		}
	}
	document.getElementById("comlist").innerHTML += html;
}

//获取回复模板（无引用）
function getReplyTmplData_1(data) {
	var imgsrc = getUserImg(data.sex);
	var time = getLocalTime(data.time);
	var username = data.adminname || data.username;
	
	var tmplData = '<div class="b-gra uc-n " id="comm_'+data.id+'">'
		            +'<div class="uc-n ubb1 ub b-gra t-bla ub-at lis">'
		                +'<div class="lis-th2 ub-img5 uc-a1 tx-c us">'
		                    +'<img src="'+imgsrc+'" class="inforpic" id="pic'+data.id+'">'
							+'<span class="t-gra ulev-1 tx-c">'+data.floor+'楼</span>'
		                +'</div>'
		                +'<div class="ub-f1 ub ub-ver">'
		                    +'<div class="ulev0">'
		                        +'<span>'+username+'</span>'
		                        +'<span class="ulev-1 t-gra ufr"><span title="'+time+'">'+time+'</span></span>'
		                    +'</div>'
		                    +'<div class="ulev-1 umh4 umar-t ulh1 uof minh">'
		                        +data.content
		                    +'</div>'
		                    +'<div class="ub">'
		                        +'<div class="ub-f1">'
		                        +'</div>'
		                        +'<div ontouchstart="zy_touch(\'btn-reply-act\');" onclick="reply(\''+data.id+'\');" class="t-gra7 ulev-1 btn-reply">'
		                            +'回复'
		                        +'</div>'
		                    +'</div>'
		                +'</div>'
		            +'</div>'
		        +'</div>';
		return tmplData;
}
//获取回复模板（有引用）
function getReplyTmplData_2(data) {
	var imgsrc = getUserImg(data.sex);
	var time = getLocalTime(data.time);
	var username = data.adminname || data.username;
	
	var parent_time = getLocalTime(data.parent.time);
	var parent_username = data.parent.adminname || data.parent.username;
	var tmplData = '<div class="b-gra uc-n " id="comm_'+data.id+'">'
		            +'<div class="uc-n ubb1 ub b-gra t-bla ub-at lis">'
		                +'<div class="lis-th2 ub-img5 uc-a1 tx-c us">'
		                    +'<img src="'+imgsrc+'" class="inforpic" id="pic'+data.id+'">'
							+'<span class="t-gra ulev-1 tx-c">'+data.floor+'楼</span>'
		                +'</div>'
		                +'<div class="ub-f1 ub ub-ver">'
		                    +'<div class="ulev0">'
		                        +'<span>'+username+'</span>'
		                        +'<span class="ulev-1 t-gra ufr"><span title="'+time+'">'+time+'</span></span>'
		                    +'</div>'
		                    +'<div class="ulev-1 umh4 umar-t ulh1 uof minh">'
		                        +'<p class="quote">'
		                            +'<span class="q1"></span>'
										+parent_username+' 发表于 ' + parent_time
										+' '+data.parent.content
		                            +'<span class="q2"></span>'
		                        +'</p>'
		                        +data.content
		                    +'</div>'
		                    +'<div class="ub">'
		                        +'<div class="ub-f1">'
		                        +'</div>'
		                        +'<div ontouchstart="zy_touch(\'btn-reply-act\');" onclick="reply(\''+data.id+'\');" class="t-gra7 ulev-1 btn-reply">'
		                            +'回复'
		                        +'</div>'
		                    +'</div>'
		                +'</div>'
		            +'</div>'
		        +'</div>';
	return tmplData;
}
function setCommentCount(count) {
	document.getElementById("replynum").innerHTML = count + replyNumName;
}
function getUserImg(sex){
	if(sex == '男'){ 
		return globalUrl+"/scmuseum/member/templets/images/dfboy.png";
	}else{
		return globalUrl+"/scmuseum/member/templets/images/dfgirl.png";
	}
}