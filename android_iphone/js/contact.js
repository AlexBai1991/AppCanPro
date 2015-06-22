
	    window.uexOnload = function(type){
        if(!type){
        }
    }
    function $$(id){
        return document.getElementById(id);
    }
    /**
     * 打开系统通讯录
     * 当选择某一联系人时返回此联系人信息json格式{}
     */
    function openContact(){
         uexContact.cbOpen=function(opCode,dataType,data){
             console.log('选择的联系人信息：'+data);
            if (dataType == 1) {
                var obj = eval('('+data+')');
                $$('numid').innerHTML = obj.num;
				
            }
        }
         uexContact.open();
    }

    /**
     * 可多选打开通讯录
     * 该方式打开通讯录，可多选联系人
     */
    function multiOpen(){
        uexContact.cbMultiOpen=function(opCode,dataType,data){
            if (dataType == 1) {
                var obj = eval('('+data+')');//[{},{}]，返回json数组字符串
                console.log('选择的联系人信息：'+data);
            }
        }
        uexContact.multiOpen();
    }
    /**
     * VCard方式添加联系人
     * 二维码名片上的信息为标准的VCard格式信息，可通过扫描二维码获取此信息后添加到联系人
     * 注意：如使用本平台的二维码插件返回的信息info需要转换后再添加到联系人
     * 如：info = info.replace(/\\\n/g,'|');
     *var a = JSON.parse(info);
     *var t = a.code.replace(/\|/g,'\n');
     *uexContact.addItemWithVCard(t);
     */
function addItemWithVCard(){
    var vcardInfo = 'BEGIN:VCARD\nVERSION:3.0\nN:正益;无线\nTEL:010-57580888\nEMAIL:zywx@3g2win.com\nADR:;;中关村大街19号;;北京;100086\nORG:正益无线（北京）科技有限公司\nTITLE:客户经理\nURL:appcan.cn\nNOTE:名ç二维码\nEND:VCARD';
    uexContact.cbAddItem = function(opCode, dataType, data){
        if(dataType==2 && data==0){
            console.log('添加成功');
        }else{
            console.log('添加失败');
        }
    }
    uexContact.addItemWithVCard(vcardInfo);
}
	
function call(){
  var tel = $$("numid").innerHTML.value;
  if(tel=="")
    console.log("请输入号码");
  else
    uexCall.call(tel);
}

function dial(){
  var tel = $$("numid").value;
  if(tel=="")
    console.log("请输入号码");
  else
    uexCall.dial(tel);
}

function facetime(){
	var tel = $$("numid").value;
	if (tel == "") 
		return;
	uexDevice.cbGetInfo = function(opId, dataType, data){
		var device = eval('(' + data + ')');
		if (device.deviceType == 0) {//如果是iphone的话，调用facetime
			uexCall.facetime(tel);
		}
	}
}