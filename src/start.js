var StartLayer = cc.Layer.extend({
    sendText:null,
    sendBtn:null,
    startscene:null,
    codeEndTime:300,
    editBox1:null,
    editBox2:null,
    phoneNum:"",
    codeNum:"",

    ctor:function () {
        this._super();
        
        cc.audioEngine.playMusic(res.bgMusic_1,true);

        var size = cc.winSize;

        this.startscene = ccs.load(res.start_json);
        this.addChild(this.startscene.node);

        this.initView();

        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyReleased:function(keyCode,event) {
                if (keyCode === cc.KEY.back) {
                    cc.director.end();
                }
                else if (keyCOde === cc.KEY.menu) {

                }
            }
        },this);
        return true;
    },
    initView:function(){
        console.log("initView!!!!!!!!!");
        this.sendBtn = ccui.helper.seekWidgetByName(this.startscene.node, "send");
        this.sendBtn.addClickEventListener(this.onSend.bind(this));
        var confirmBtn = ccui.helper.seekWidgetByName(this.startscene.node, "confirm");
        confirmBtn.addClickEventListener(this.onConfirm.bind(this));
        this.sendText = ccui.helper.seekWidgetByTag(this.startscene.node, 28850);
        this.initInput();
    },
    initInput:function(){
        var input_1 = ccui.helper.seekWidgetByName(this.startscene.node,"input_1");
        var inputSize1 = input_1.getContentSize();
        this.editBox1 = new cc.EditBox(cc.size(inputSize1.width-60,inputSize1.height),new cc.Scale9Sprite(res.empty));
        this.editBox1.setDelegate(this); 
        this.editBox1.setTag(1);  
        this.editBox1.setPosition(cc.p(120,1120));
        this.editBox1.setAnchorPoint(cc.p(0,0.5));
        this.editBox1.setFontSize(40);
        this.editBox1.setPlaceholderFontSize(40);
        this.editBox1.setReturnType(1);
        this.editBox1.setMaxLength(20);
        this.editBox1.setPlaceHolder("请输入您的手机号码");
        this.editBox1.setString("");
        this.startscene.node.addChild(this.editBox1,1);
        var input_2 = ccui.helper.seekWidgetByName(this.startscene.node,"input_2");
        var inputSize2 = input_2.getContentSize();
        this.editBox2 = new cc.EditBox(cc.size(inputSize2.width-60,inputSize2.height),new cc.Scale9Sprite(res.empty));
        this.editBox2.setDelegate(this); 
        this.editBox2.setTag(2);  
        this.editBox2.setPosition(cc.p(120,980));
        this.editBox2.setAnchorPoint(cc.p(0,0.5));
        this.editBox2.setFontSize(40);
        this.editBox2.setPlaceholderFontSize(40);
        this.editBox2.setReturnType(1);
        this.editBox2.setMaxLength(20);
        this.editBox2.setPlaceHolder("请输入验证码");
        this.editBox2.setString("");
        this.startscene.node.addChild(this.editBox2,1);
        console.log("initInput!!!!!!!!!");
    },
    editBoxEditingDidBegin: function (sender) {
        console.log("editBoxEditingDidBegin!!!!%d",sender.getTag());
    },
    editBoxEditingDidEnd: function (sender) {
        console.log("editBoxEditingDidEnd!!!!");
    },
    editBoxTextChanged: function (sender, text) {
        console.log("editBoxTextChanged!!!!");
    },
    editBoxReturn: function (sender) {
        console.log("editBoxReturn!!!!");
        if (sender.getTag() === 1) {
            this.phoneNum = sender.getString();
        }
        else if (sender.getTag() === 2) {
            this.codeNum = sender.getString();
        }
    },
    sendTimer:function(){
        if (this.codeEndTime > 0) {
            this.sendBtn.setBright(false);
            this.sendBtn.setTouchEnabled(false);
            this.codeEndTime = this.codeEndTime - 1;
            setTextString(this.sendText,"剩余"+this.codeEndTime+"秒");
        }
        else{
            this.sendBtn.setBright(true);
            this.sendBtn.setTouchEnabled(true);
            this.codeEndTime = 300;
            this.unschedule(this.sendTimer);
            setTextString(this.sendText,"发送");
        }
    },
    onSend:function(){        
        cc.audioEngine.playEffect(res.effect_3,false);
        var string = this.editBox1.getString();
        if (string === ""){
            currentScene.addChild(new AlertLayer(this,"请输入您的手机号码",true),100);
        }
        else if (string.length !== 11 || typeof Number(string) !== "number"){
            currentScene.addChild(new AlertLayer(this,"请输入正确的手机号码",true),100);
        }
        else{
            var xhr = cc.loader.getXMLHttpRequest();
            var _this = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var obj = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    if (obj.errCode === "0") {
                        _this.sendTimer();
                        _this.schedule(_this.sendTimer,1);
                        currentScene.addChild(new AlertLayer(_this,"获取验证码成功，您可以一直使用此验证码登录游戏,请妥善保管！",true),100);
                    }
                    else {
                        if (obj.msg) {
                            currentScene.addChild(new AlertLayer(_this,obj.msg,true),100);
                        }
                        else if (obj.errMsg) {
                            currentScene.addChild(new AlertLayer(_this,obj.errMsg,true),100);
                        }
                        else {
                            currentScene.addChild(new AlertLayer(_this,"未知错误",true),100);
                        }
                    }
                }
            };
            var timestamp = Date.parse(new Date());
            var s = "stime="+timestamp+"&telephone="+this.phoneNum+httpKey;
            var sign = hex_md5(s);
            var url = httpStr+"getcode?telephone="+this.phoneNum+"&stime="+timestamp+"&sign="+sign
            xhr.open("GET", url, true);
            xhr.send();
        }
    },
    onConfirm:function(){
        cc.audioEngine.playEffect(res.effect_3,false);
        var string = this.editBox2.getString();
        if (string === ""){
            currentScene.addChild(new AlertLayer(this,"请输入验证码",true),100);
        }
        else if (typeof Number(string) !== "number"){
            currentScene.addChild(new AlertLayer(this,"请输入正确的验证码",true),100);
        }
        else{
            var xhr = cc.loader.getXMLHttpRequest();
            var _this = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var obj = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    if (obj.errCode === "0") {
                        userData.id = obj.result.userid;
                        userData.name = obj.result.telephone;
                        userData.gold = obj.result.coin;
                        userData.token = obj.result.token;
                        if (sys.localStorage.getItem(userData.name) !== null && sys.localStorage.getItem(userData.name) !== undefined) {
                            userData.localGold = Number(sys.localStorage.getItem(userData.name));
                        }
                        else {
                            userData.localGold = 100000;
                        }
                        nc.contect();
                        currentScene = new MoraGameScene();
                        cc.director.runScene(currentScene);
                    }
                    else {
                        if (obj.msg) {
                            currentScene.addChild(new AlertLayer(_this,obj.msg,true),100);
                        }
                        else if (obj.errMsg) {
                            currentScene.addChild(new AlertLayer(_this,obj.errMsg,true),100);
                        }
                        else {
                            currentScene.addChild(new AlertLayer(_this,"未知错误",true),100);
                        }
                    }
                }
            };
            var timestamp = Date.parse(new Date());
            var s = "stime="+timestamp+"&telephone="+this.phoneNum+"&userPwd="+hex_md5(this.codeNum)+httpKey
            var sign = hex_md5(s);
            var url = httpStr+"login?telephone="+this.phoneNum+"&userPwd="+hex_md5(this.codeNum)+"&stime="+timestamp+"&sign="+sign
            xhr.open("GET", url, true);
            xhr.send();
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});