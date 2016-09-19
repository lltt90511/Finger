var MoraGameLayer = cc.Layer.extend({
    moraGameScene:null,
    commonTopLayer:null,
    betAlertLayer:null,
    inviterAlertLayer:null,
    waitInviterAlertLayer:null,

    bg:null,

    headImage:null,
    nameLabel:null,
    goldLabel:null,
    goldNum:null,

    yazhuImage:null,
    yazhuNum:null,
    jinbiImage:null,

    yaoqingBtn:null,
    yazhuBtn:null,

    destBg:null,
    destImage:null,

    resultImage:null,

    srcStBg:null,
    srcStBtn:null,
    srcJdBg:null,
    srcJdBtn:null,
    srcBuBg:null,
    srcBuBtn:null,

    countDownBg:null,
    countDownNum:null,

    jieguoLayout:null,
    jieguoLabel:null,
    jieguoNum:null,
    jieguoJinBiImage:null,

    alertLayout:null,
    alertImage:null,
    alertQuedingBtn:null,
    alertBackBtn:null,
    waitChange:null,

    isInvite:false,
    isMaster:false,
    isGuess:false,
    isCountDown:false,

    destId:-1,
    destTele:"",
    destCoin:0,
    betCoin:0,
    roomId:-1,
    srcGuess:-1,
    destGuess:-1,
    seqId:0,

    countDownTime:10,
    winOrLost:0,//0失败，1平局，2胜利
    
    picArr:new Array("shitou_1.png","jiandao_1.png","bu_1.png"),
    soundArr:new Array(res.effect_st,res.effect_jd,res.effect_bu),
    destPosX:540,
    destPosY:1220,
    srcPosX:0,
    srcPosY:610,

    editBox:null,
    srcSelect:null,

    listener1:null,
    listener2:null,
    listener3:null,
    listener4:null,
    listener5:null,
    listener6:null,
    listener7:null,
    listener8:null,

	ctor:function () {
        this._super();

        console.log("MoraGameLayer ctor");
        cc.audioEngine.playEffect(res.effect_into,false);

        this.moraGameScene = ccs.load(res.moraGame_json);
        this.addChild(this.moraGameScene.node);

        this.initView();

        return true;
    },
    initView:function() {
        this.commonTopLayer = new CommonTopLayer(this);
        this.commonTopLayer.setPosition(cc.p(0,1750));
        this.moraGameScene.node.addChild(this.commonTopLayer,5);

        this.bg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12528); 

        this.headImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12529); 
        this.nameLabel = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12606);
        this.goldLabel = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 29736);
        this.goldNum = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12612);

        this.yazhuImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12550);
        this.yazhuNum = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12552);
        this.jinbiImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12555);
        
        this.yaoqingBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12531);
        this.yaoqingBtn.addTouchEventListener(this.onYaoqing.bind(this));
        this.yazhuBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12549);
        this.yazhuBtn.addTouchEventListener(this.onYazhu.bind(this));

        this.destBg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12532);
        this.destImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12533);
        
        this.resultImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12534);

        this.countDownBg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12556);
        this.countDownNum = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12558);

        this.srcStBg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12540);
        this.srcStBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12541);
        this.srcStBtn.addTouchEventListener(this.onGuess.bind(this));
        this.srcJdBg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12536);
        this.srcJdBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12537);
        this.srcJdBtn.addTouchEventListener(this.onGuess.bind(this));
        this.srcBuBg = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12542);
        this.srcBuBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12543);
        this.srcBuBtn.addTouchEventListener(this.onGuess.bind(this));

        this.jieguoLayout = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13402);
        this.jieguoLabel = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13401);
        this.jieguoNum = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13403);
        this.jieguoJinBiImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13404);
 
        this.alertLayout = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13406);
        this.alertImage = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12584);
        this.alertQuedingBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12587);
        this.alertQuedingBtn.addTouchEventListener(this.onAlertQueding.bind(this));
        this.alertBackBtn = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 12588);
        this.alertBackBtn.addTouchEventListener(this.onAlertBack.bind(this));

        this.waitChange = ccui.helper.seekWidgetByTag(this.moraGameScene.node, 13407);

        this.initInput();

        this.showOrHideAlert(1,false);
        this.showOrHideAlert(2,false);

        this.initDest();
        this.initListener();
    },
    initDest:function() {
        this.headImage.setVisible(false);
        this.nameLabel.setVisible(false);
        this.goldLabel.setVisible(false);
        this.goldNum.setVisible(false);
        this.countDownBg.setVisible(false);
        this.resultImage.setOpacity(0);
        this.jieguoLayout.setOpacity(0);
        this.yaoqingBtn.setVisible(true);
        this.yaoqingBtn.setTouchEnabled(true);
        this.yazhuBtn.setVisible(true);
        this.yazhuBtn.setTouchEnabled(true);
        setTextString(this.countDownNum,this.countDownTime);
    },
    initListener:function() {
        this.listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_BET_RETURN",
            callback: this.fingerGameBetReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener1, 1);
        this.listener2 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_INVITE_RETURN",
            callback: this.fingerGameInviteReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener2, 2);
        this.listener3 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_INVITE_CANCEL_RETURN",
            callback: this.fingerGameInviteCancelReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener3, 3);
        this.listener4 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_INVITE_AGREE_RETURN",
            callback: this.fingerGameInviteAgreeReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener4, 4);
        this.listener5 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_INVITE_REFUSE_RETURN",
            callback: this.fingerGameInviteRefuseReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener5, 5);
        this.listener6 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_GUESS_RETURN",
            callback: this.fingerGameGuessReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener6, 6);
        this.listener7 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "FINGER_GAME_GUESS_RESULT",
            callback: this.fingerGameGuessResult.bind(this)
        });
        cc.eventManager.addListener(this.listener7, 7);
        this.listener8 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "LOGOUT_RETURN",
            callback: this.logoutReturn.bind(this)
        });
        cc.eventManager.addListener(this.listener8, 8);
    },
    fingerGameBetReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameBetReturn!!!!!");  
        if (data.errCode === 200) {
            if (this.betCoin === 0) {
                this.betCoin = data.betCoin;
                this.setYazhuGold(this.betCoin);
            }
            else {
                if (data.srcId === userData.id) {
                    if (this.isMaster) {
                        this.showOrHideAlert(2,true);
                    }         
                    else {
                        this.betCoin = data.betCoin;
                        this.setYazhuGold(this.betCoin);
                    }           
                }
                else if(data.srcId === this.destId){
                    if (this.isMaster) {
                        this.showOrHideAlert(2,false);
                        if (this.betCoin === data.betCoin) {
                            currentScene.addChild(new AlertLayer(this,"对方拒绝您修改的押注金额，押注金额已被还原！",true),100);
                        } 
                        else {
                            this.betCoin = data.betCoin;
                            this.setYazhuGold(this.betCoin);
                        }
                    }
                    else {
                        var _this = this;
                        var confirmFunc = function() {
                            var t = new Object();
                            t.msgType = "1";
                            t.opType = "FINGERGAMEBET";
                            t.srcId = userData.id;
                            t.roomId = _this.roomId;
                            t.betCoin = data.betCoin;
                            t.stime = Date.parse(new Date());
                            var s = "betCoin="+t.betCoin+"&msgType=1&opType=FINGERGAMEBET&roomId="+t.roomId+"&srcId="+t.srcId+"&stime="+t.stime+userData.token;
                            console.log(s);
                            t.sign = hex_md5(s);
                            var str = JSON.stringify(t);
                            nc.socketCall(str);
                        }
                        var cancelFunc = function() {
                            var t = new Object();
                            t.msgType = "1";
                            t.opType = "FINGERGAMEBET";
                            t.srcId = userData.id;
                            t.roomId = _this.roomId;
                            t.betCoin = _this.betCoin;
                            t.stime = Date.parse(new Date());
                            var s = "betCoin="+t.betCoin+"&msgType=1&opType=FINGERGAMEBET&roomId="+t.roomId+"&srcId="+t.srcId+"&stime="+t.stime+userData.token;
                            console.log(s);
                            t.sign = hex_md5(s);
                            var str = JSON.stringify(t);
                            nc.socketCall(str);
                        }
                        currentScene.addChild(new AlertLayer(this,"对方修改了押注金额!当前押注金额"+data.betCoin+"!是否同意？",false,confirmFunc,cancelFunc,"同意","拒绝"),100);
                    }
                }
            }
            if (this.betAlertLayer) {
                this.betAlertLayer.removeFromParent(true);
                this.betAlertLayer = null;
            }
        }
        else{
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    fingerGameInviteReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameInviteReturn!!!!!"); 
        if (data.errCode === 200) {
            this.betCoin = 0;
            this.setYazhuGold(this.betCoin);
            this.roomId = data.roomId;
            if (userData.id === data.srcId) {
                this.editBox.setString("");
                this.isMaster = true;
                this.destId = data.destId;
                this.destTele = data.destTele;
                if (this.waitInviterAlertLayer === null) {
                    this.waitInviterAlertLayer = new WaitInviterAlertLayer(this.destTele);
                    this.waitInviterAlertLayer.setPosition(cc.p(0,0));
                    this.moraGameScene.node.addChild(this.waitInviterAlertLayer,50);
                }
            }
            else { 
                this.destId = data.srcId;
                this.destTele = data.srcTele;
                this.destCoin = data.srcCoin;
                if (this.inviterAlertLayer === null) {
                    this.inviterAlertLayer = new InviterAlertLayer(this.destTele,this.roomId);
                    this.inviterAlertLayer.setPosition(cc.p(0,0));
                    this.moraGameScene.node.addChild(this.inviterAlertLayer,50);
                }
            }
        }
        else{
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    fingerGameInviteCancelReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameInviteCancelReturn!!!!!");  
        if (data.errCode === 200) {
            if (this.roomId === data.roomId) {
                if (userData.id === data.srcId) {
                    if (this.waitInviterAlertLayer) {
                        this.waitInviterAlertLayer.removeFromParent(true);
                        this.waitInviterAlertLayer = null;
                    }
                }
                else {
                    currentScene.addChild(new AlertLayer(this,"对方取消了邀请"),100);
                    if (this.inviterAlertLayer) {
                        this.inviterAlertLayer.removeFromParent(true);
                        this.inviterAlertLayer = null;
                    }
                }
                this.resetView();
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    fingerGameInviteAgreeReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameInviteAgreeReturn!!!!!");  
        if (data.errCode === 200) {
            if (this.roomId === data.roomId) {
                if (userData.id === data.srcId) {
                    if (this.inviterAlertLayer) {
                        this.inviterAlertLayer.removeFromParent(true);
                        this.inviterAlertLayer = null;
                    }
                    this.yazhuBtn.setVisible(false);
                    this.yazhuBtn.setTouchEnabled(false);
                }
                else {
                    if (this.waitInviterAlertLayer) {
                        this.waitInviterAlertLayer.removeFromParent(true);
                        this.waitInviterAlertLayer = null;
                    }
                    this.destId = data.srcId;
                    this.destTele = data.srcTele;
                    this.destCoin = data.srcCoin;
                }
                this.isInvite = true;
                this.yaoqingBtn.setVisible(false);
                this.yaoqingBtn.setTouchEnabled(false);
                this.headImage.setVisible(true);
                this.nameLabel.setVisible(true);
                setTextString(this.nameLabel,this.destTele);
                this.goldLabel.setVisible(true);
                this.goldNum.setVisible(true);
                setTextString(this.goldNum,this.destCoin);
                this.showOrHideAlert(1,false);
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    fingerGameInviteRefuseReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameInviteRefuseReturn!!!!!"); 
        if (data.errCode === 200) {
            if (this.roomId === data.roomId) {
                if (userData.id === data.srcId) {
                    if (this.inviterAlertLayer) {
                        this.inviterAlertLayer.removeFromParent(true);
                        this.inviterAlertLayer = null;
                    }
                }
                else {
                    currentScene.addChild(new AlertLayer(this,"对方拒绝您的邀请",true),100);
                    if (this.waitInviterAlertLayer) {
                        this.waitInviterAlertLayer.removeFromParent(true);
                        this.waitInviterAlertLayer = null;
                    }
                }  
                this.resetView();
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    fingerGameGuessReturn:function(event){
        var data = event.getUserData();
        console.log("fingerGameGuessReturn!!!!!"+this.destId+"@!!!"+data.srcId); 
        if (data.errCode === 200) {
            if (this.roomId === data.roomId) {
                if (this.isMaster) {
                    this.yazhuBtn.setVisible(false);
                    this.yazhuBtn.setTouchEnabled(false);
                }
                if (userData.id === data.srcId) { 
        console.log("fingerGameGuessReturn1!!!!!");                        
                    if (!this.isGuess) {
                        this.isGuess = true;
                    }
                }
                   else if (this.destId === data.srcId) {
        console.log("fingerGameGuessReturn2!!!!!"+data.type); 
                    this.seqId = data.seqId;
                    this.destGuess = data.type;
                    this.destImage.loadTexture("res/qietu/mora/wenhao.png");
                    if (!this.isCountDown && !this.isGuess) {
                        this.isCountDown = true;
                        this.countDownBg.setVisible(true);
                        this.countDownTimer();
                        this.schedule(this.countDownTimer,1);
                    }
                }
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
            this.setSrcBright(-1);
            this.setSrcTouchEnabled(true);
        }
    },
    fingerGameGuessResult:function(event){
        var data = event.getUserData();
        console.log("fingerGameGuessResult!!!!!");  
        if (data.errCode === 0) {
            if (this.roomId === data.roomId) {
                if (userData.id === data.srcId) {
                    userData.gold = data.srcCoin;
                    this.destCoin = data.destCoin;
                }
                else if(userData.id === data.destId) {
                    userData.gold = data.destCoin;
                    this.destCoin = data.srcCoin;
                }
                this.onFinishGuess();
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    logoutReturn:function(event){
        var data = event.getUserData();
        console.log("logoutReturn!!!!!"+this.roomId+"roo!!!!"+userData.id+"!@#$"+this.destId+"!@@@"+data.srcId); 
        if (data.errCode === 200) {
            if (this.roomId === data.roomId && this.isInvite && (userData.id === data.srcId || this.destId === data.srcId)) {
                if (this.isCountDown) {
                    this.unschedule(this.countDownTimer);
                }
                this.destImage.loadTexture("res/qietu/mora/di_2.png");
                this.resetView();
            }
        }
        else {
            if (userData.id === this.srcId) {
                currentScene.addChild(new AlertLayer(this,data.errMsg,true),100);
            }
        }
    },
    resetView:function() {
        this.isInvite = false;
        this.isMaster = false;
        this.isGuess = false;
        this.isCountDown = false;
        this.destId = -1;
        this.destTele = "",
        this.destCoin = 0,
        this.betCoin = 0,
        this.roomId = -1,
        this.srcGuess = -1,
        this.destGuess = -1,
        this.seqId = 0,
        this.countDownTime = 10;
        this.winOrLost = -1;
        this.srcSelect = null;
        this.initDest();
    },
    initInput:function(){
        var input = ccui.helper.seekWidgetByName(this.moraGameScene.node,"input");
        var inputSize = input.getContentSize();
        this.editBox = new cc.EditBox(cc.size(inputSize.width,inputSize.height),new cc.Scale9Sprite(res.empty));
        this.editBox.setDelegate(this); 
        this.editBox.setTag(1);  
        this.editBox.setPosition(cc.p(647,1010));
        this.editBox.setAnchorPoint(cc.p(0,0.5));
        this.editBox.setFontSize(40);
        this.editBox.setPlaceholderFontSize(30);
        this.editBox.setReturnType(1);
        this.editBox.setMaxLength(20);
        // this.editBox.setPlaceHolder("请输入手机号码");
        this.editBox.setString("");
        this.moraGameScene.node.addChild(this.editBox,30);
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
    },
    onBack:function() {
        console.log("onBack!!!!");
        if (this.isInvite) {
            var t = new Object();
            t.msgType = "1";
            t.opType = "LOGOUT";
            t.srcId = userData.id;
            t.roomId = this.roomId;
            t.stime = Date.parse(new Date());
            var s = "msgType=1&opType=LOGOUT&roomId="+this.roomId+"&srcId="+t.srcId+"&stime="+t.stime+userData.token;
            t.sign = hex_md5(s);
            var str = JSON.stringify(t);
            nc.socketCall(str);
        }
        else {
            var xhr = cc.loader.getXMLHttpRequest();
            var _this = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var obj = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    if (obj.errCode === "0") {
                        isLogout = true;
                        nc.close();
                        currentScene = new StartScene();
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
            var s = "id="+userData.id+"&stime="+timestamp+httpKey;
            var sign = hex_md5(s);
            var url = httpStr+"logout?id="+userData.id+"&stime="+timestamp+"&sign="+sign
            xhr.open("GET", url, true);
            xhr.send();
        }
    },
    setYazhuGold:function(gold) {
        this.betCoin = gold;
        setTextString(this.yazhuNum,gold);
        this.yazhuImage.setPositionX(200-this.yazhuNum.getVirtualRendererSize().width/2);
        this.jinbiImage.setPositionX(200+this.yazhuNum.getVirtualRendererSize().width/2);
    },
    setJieguoGold:function(gold) {
        setTextString(this.jieguoNum,gold);
        this.jieguoLabel.setPositionX(100-this.jieguoNum.getVirtualRendererSize().width/2);
        this.jieguoJinBiImage.setPositionX(100+this.jieguoNum.getVirtualRendererSize().width/2);
    },
    showOrHideAlert:function(type,flag) {
        this.alertLayout.setVisible(flag);
        this.alertLayout.setTouchEnabled(flag);
        if (type === 1) {
            this.alertImage.setVisible(flag);
            this.editBox.setVisible(flag);
            this.editBox.setTouchEnabled(flag);
            this.alertQuedingBtn.setTouchEnabled(flag);
            this.alertBackBtn.setTouchEnabled(flag);
        }
        else if (type === 2) {
            this.waitChange.setVisible(flag);
        }
    },
    onYaoqing:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onYaoqing");
            cc.audioEngine.playEffect(res.effect_3,false);
            this.showOrHideAlert(1,true);
        }
    },
    onYazhu:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onYazhu");
            cc.audioEngine.playEffect(res.effect_3,false);
            if (this.betAlertLayer === null) {
                this.betAlertLayer = new BetAlertLayer(this);
            }
            this.betAlertLayer.setPosition(cc.p(0,0));
            this.moraGameScene.node.addChild(this.betAlertLayer,50);
        }
    },
    onGuess:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onGuess");
            cc.audioEngine.playEffect(res.effect_3,false);
            if (this.betCoin === 0) {
                currentScene.addChild(new AlertLayer(this,"请先押注",true),100);
            }
            else {
                var tag = target.getTag();
                switch (tag) {
                    case 12537:
                        cc.audioEngine.playEffect(res.effect_jd,false);
                        this.minePosX = 540;
                        this.srcGuess = 1;
                    break;
                    case 12541:
                        cc.audioEngine.playEffect(res.effect_st,false);
                        this.minePosX = 210;
                        this.srcGuess = 0;
                    break;
                    case 12543:
                        cc.audioEngine.playEffect(res.effect_bu,false);
                        this.minePosX = 870;
                        this.srcGuess = 2;
                    break;
                }
                if (this.isInvite) {   
                    if (this.isCountDown) {
                        this.unschedule(this.countDownTimer);
                        this.countDownBg.setVisible(false);
                    }
                    var t = new Object();
                    t.msgType = "1";
                    t.opType = "FINGERGAMEGUESS";
                    t.srcId = userData.id;
                    t.roomId = this.roomId;
                    t.seqId = this.seqId.toString();
                    t.betCoin = this.betCoin;
                    t.type = this.srcGuess.toString();
                    t.stime = Date.parse(new Date());
                    var s = "betCoin="+t.betCoin+"&msgType=1&opType=FINGERGAMEGUESS&roomId="+t.roomId+"&seqId="+t.seqId+"&srcId="+t.srcId+"&stime="+t.stime+"&type="+t.type+userData.token;
                    console.log(s);
                    t.sign = hex_md5(s);
                    var str = JSON.stringify(t);
                    nc.socketCall(str);
                }
                else {                    
                    if (!this.isGuess) {
                        this.isGuess = true;
                    }
                    this.destGuess = Math.floor(Math.random()*3);
                    this.onFinishGuess();
                }
                this.setSrcBright(this.srcGuess);
                this.setSrcTouchEnabled(false);
            }
        }
    },
    onAlertQueding:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onAlertQueding");
            cc.audioEngine.playEffect(res.effect_3,false);
            var string = this.editBox.getString();
            if (string === null || string === undefined || string === "") {
                currentScene.addChild(new AlertLayer(this,"请输入对方的手机号码",true),100);
            }
            else if (string.length !== 11 || typeof Number(string) !== "number"){
                currentScene.addChild(new AlertLayer(this,"请输入正确的手机号码",true),100);
            }
            else{
                var t = new Object();
                t.msgType = "1";
                t.opType = "FINGERGAMEINVITE";
                t.srcId = userData.id.toString();
                t.srcTele = userData.name;
                t.destTele = string;
                t.stime = Date.parse(new Date());
                var s = "destTele="+t.destTele+"&msgType=1&opType=FINGERGAMEINVITE&srcId="+t.srcId+"&srcTele="+t.srcTele+"&stime="+t.stime+userData.token;
                console.log(s)
                t.sign = hex_md5(s);
                var str = JSON.stringify(t);
                nc.socketCall(str);
            }
        }
    },
    onAlertBack:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onAlertBack");
            cc.audioEngine.playEffect(res.effect_3,false);
            this.editBox.setString("");
            this.showOrHideAlert(1,false);
        }
    },
    onBetAlertBack:function(gold) {
        this.betCoin = gold;
        this.setYazhuGold(this.betCoin);
    },
    setSrcTouchEnabled:function(flag) {
        this.srcStBtn.setTouchEnabled(flag);
        this.srcJdBtn.setTouchEnabled(flag);
        this.srcBuBtn.setTouchEnabled(flag);
    },
    setSrcTouchEnabled:function(flag) {
        this.srcStBtn.setTouchEnabled(flag);
        this.srcJdBtn.setTouchEnabled(flag);
        this.srcBuBtn.setTouchEnabled(flag);
    },
    setSrcBright:function(type) {
        this.srcStBtn.setBright(type!==0);
        this.srcJdBtn.setBright(type!==1);
        this.srcBuBtn.setBright(type!==2);
    },
    countDownTimer:function() {
        console.log("countDownTimer!!!!!!!!!"+this.countDownTime);
        if (this.isCountDown) {
            if (this.countDownTime > 0) {
                this.countDownTime = this.countDownTime - 1;
                setTextString(this.countDownNum,this.countDownTime);
            }
            else{
                this.unschedule(this.countDownTimer);
                this.countDownBg.setVisible(false);
                this.isCountDown = false;
                this.srcGuess = Math.floor(Math.random()*3);
                this.setSrcBright(this.srcGuess);
                this.setSrcTouchEnabled(false);
                var t = new Object();
                t.msgType = "1";
                t.opType = "FINGERGAMEGUESS";
                t.srcId = userData.id;
                t.roomId = this.roomId;
                t.seqId = this.seqId.toString();
                t.betCoin = this.betCoin;
                t.type = this.srcGuess.toString();
                t.stime = Date.parse(new Date());
                var s = "betCoin="+t.betCoin+"&msgType=1&opType=FINGERGAMEGUESS&roomId="+t.roomId+"&seqId="+t.seqId+"&srcId="+t.srcId+"&stime="+t.stime+"&type="+t.type+userData.token;
                console.log(s);
                t.sign = hex_md5(s);
                var str = JSON.stringify(t);
                nc.socketCall(str);
            }
        }
    },
    onFinishGuess:function() {
        this.setSrcTouchEnabled(false);
        if (this.isCountDown) {
            this.isCountDown = false;
            this.unschedule(this.countDownTimer);
        }
        if (this.srcGuess === this.destGuess) {
            this.winOrLost = 1;
        }
        else {
            if (this.srcGuess === 0 && this.destGuess === 2) {
                this.winOrLost = 0;
                if (!this.isInvite) {
                    userData.localGold = userData.localGold - this.betCoin;
                }
            }
            else if ((this.srcGuess === 2 && this.destGuess === 0) || this.srcGuess < this.destGuess) {
                this.winOrLost = 2;
                if (!this.isInvite) {
                    userData.localGold = userData.localGold + this.betCoin;
                }
            }
            else if (this.srcGuess > this.destGuess) {
                this.winOrLost = 0;
                if (!this.isInvite) {
                    userData.localGold = userData.localGold - this.betCoin;
                }
            }
        }
        if (this.winOrLost === 0) {
            setTextString(this.jieguoLabel,"您输掉了");
        }
        else if (this.winOrLost === 2) {
            setTextString(this.jieguoLabel,"您赢得了");
        }
        this.setJieguoGold(this.betCoin);

        if (this.winOrLost === 0) {
            this.resultImage.loadTexture(res.pic_shibai);
        }
        else if (this.winOrLost === 1) {
            this.resultImage.loadTexture(res.pic_pingju);
        }
        else if (this.winOrLost === 2) {
            this.resultImage.loadTexture(res.pic_shengli);
        }
        // cc.audioEngine.playEffect(res.effect_jieguo,false);
        // var flip = cc.flipX3D(0.2);
        // var flip_r = cc.flipX3D(0.2);
        // var seq = cc.sequence(flip,flip_r);
        // this.destBg.runAction(flip);
        if (this.srcGuess === 0) {
            this.srcSelect = this.srcStBg;
            this.srcPosX = 210;
        }
        else if (this.srcGuess === 1) {
            this.srcSelect = this.srcJdBg;
            this.srcPosX = 540;
        }
        else if (this.srcGuess === 2) {
            this.srcSelect = this.srcBuBg;
            this.srcPosX = 870;
        }
        var _this = this;
        var func = function() {
            _this.resultImage.setOpacity(255);
            _this.resultImage.setScale(0);
            if (_this.winOrLost === 0) {
                cc.audioEngine.playEffect(res.effect_shibai,false);
            }
            else if (_this.winOrLost === 1) {
                cc.audioEngine.playEffect(res.effect_pingju,false);
            }
            else if (_this.winOrLost === 2) {
                cc.audioEngine.playEffect(res.effect_shengli,false);
            }
            if (_this.winOrLost !== 1) {
                var fadeIn = cc.fadeIn(0.5);
                var delayTime = cc.delayTime(1.0);
                var fadeOut = cc.fadeOut(0.5);
                var seq = cc.sequence(fadeIn,delayTime,fadeOut);
                _this.jieguoLayout.runAction(seq);
            }
            var callFunc = cc.callFunc(function(target,data) {
                _this.commonTopLayer.resetGoldLabel();
                if (_this.isInvite) {
                    setTextString(_this.goldNum,_this.destCoin);
                }
                sys.localStorage.setItem(userData.name,userData.localGold.toString());
                var delayTime = cc.delayTime(1.0);
                var callFunc = cc.callFunc(function(target,data) {
                    var fadeOut1 = cc.fadeOut(0.5);   
                    var fadeOut2 = cc.fadeOut(0.5); 
                    var callFunc1 = cc.callFunc(function(target,data) {    
                        _this.destImage.loadTexture("res/qietu/mora/di_2.png");
                    },_this);
                    var seq1 = cc.sequence(fadeOut2,callFunc1);
                    _this.resultImage.runAction(fadeOut1);
                    _this.destImage.runAction(seq1);
                    var fadeOut3 = cc.fadeOut(0.5);
                    var callFunc2 = cc.callFunc(function(target,data) {    
                        _this.destBg.setPosition(cc.p(_this.destPosX,_this.destPosY));
                        var delayTime = cc.delayTime(0.1);
                        var callFunc = cc.callFunc(function(target,data) {    
                            var fadeIn1 = cc.fadeIn(0.5);
                            var fadeIn2 = cc.fadeIn(0.5);
                            _this.destBg.runAction(fadeIn1);
                            _this.destImage.runAction(fadeIn2);
                        });
                        var seq = cc.sequence(delayTime,callFunc);
                        _this.destBg.runAction(seq);
                    },_this);
                    var seq2 = cc.sequence(fadeOut3,callFunc2);
                    _this.destBg.runAction(seq2);
                    var fadeOut4 = cc.fadeOut(0.5);
                    var callFunc3 = cc.callFunc(function(target,data) {   
                        _this.srcSelect.setPosition(cc.p(_this.srcPosX,_this.srcPosY));
                        _this.setSrcBright(-1);
                        if (_this.isMaster) {
                            _this.yazhuBtn.setVisible(true);
                            _this.yazhuBtn.setTouchEnabled(true);
                        }
                        var delayTime = cc.delayTime(0.1);
                        var fadeIn = cc.fadeIn(0.5);
                        var callFunc = cc.callFunc(function(target,data) {   
                              _this.countDownTime = 10;
                              _this.isCountDown = false;
                              _this.isGuess = false;
                              _this.destGuess = -1;
                              _this.seqId = 0;
                              _this.setSrcTouchEnabled(true);
                        },_this);
                        var seq = cc.sequence(delayTime,fadeIn,callFunc);
                        _this.srcSelect.runAction(seq);
                    },_this);
                    var seq3 = cc.sequence(fadeOut4,callFunc3);
                    _this.srcSelect.runAction(seq3);
                });
                var seq = cc.sequence(delayTime,callFunc);
                _this.runAction(seq);
            },_this);
            var scaleTo1 = cc.scaleTo(0.2,1.2);
            var scaleTo2 = cc.scaleTo(0.15,1.0);
            var scaleTo3 = cc.scaleTo(0.1,1.05);
            var scaleTo4 = cc.scaleTo(0.05,1.0);
            var seq = cc.sequence(scaleTo1,scaleTo2,scaleTo3,scaleTo4,callFunc);
            _this.resultImage.runAction(seq);
        }
        var delayTime = cc.delayTime(0.5);
        var callFunc = cc.callFunc(function(target,data) {
            if (_this.destGuess >= 0) {
                _this.destImage.loadTexture("res/qietu/mora/"+_this.picArr[_this.destGuess]);
            }
            _this.destBg.setScale(1.5);
            var shadowBg = new ccui.ImageView();
            shadowBg.loadTexture("res/qietu/mora/di.png");
            shadowBg.setOpacity(80);
            shadowBg.setPosition(cc.p(_this.destBg.getPositionX(),_this.destBg.getPositionY()));
            _this.bg.addChild(shadowBg);
            var shadow = new ccui.ImageView();
            shadow.loadTexture("res/qietu/mora/"+_this.picArr[_this.destGuess]);
            shadow.setOpacity(50);
            shadow.setPosition(cc.p(shadowBg.getContentSize().width/2,shadowBg.getContentSize().height/2));
            shadowBg.addChild(shadow);
            var delayTime1 = cc.delayTime(0.32);
            var scaleTo1 = cc.scaleTo(0.1,1.5);
            var callFunc1 = cc.callFunc(function(target,data) {
                shadow.removeFromParent(true);
                shadowBg.removeFromParent(true);
            },_this);
            var seq1 = cc.sequence(delayTime1,scaleTo1,callFunc1);
            shadowBg.runAction(seq1);
            var delayTime2 = cc.delayTime(0.2);
            var scaleTo2 = cc.scaleTo(0.2,1.0);
            var callFunc2 = cc.callFunc(function(target,data) {
                cc.audioEngine.playEffect(_this.soundArr[_this.destGuess],false);
            },_this);
            var seq2 = cc.sequence(delayTime2,scaleTo2,callFunc2);
            _this.destBg.runAction(seq2);
            var delayTime3 = cc.delayTime(0.5);
            var callFunc3 = cc.callFunc(function(target,data) {
                if (_this.winOrLost === 1) {
                    func();
                }
                else {
                    cc.audioEngine.playEffect(res.effect_jifei,false);
                    if (_this.winOrLost === 0) {
                        var moveTo1 = cc.moveTo(0.2,cc.p(_this.srcPosX,_this.srcPosY));
                        _this.destBg.runAction(moveTo1);
                        var delayTime1 = cc.delayTime(0.09);
                        var moveTo2 = cc.moveTo(0.2,cc.p(_this.srcPosX*2-_this.destPosX,-200));
                        var delayTime2 = cc.delayTime(0.1);
                        var callFunc = cc.callFunc(function(target,data) {
                            func();
                        })
                        var seq = cc.sequence(delayTime1,moveTo2,delayTime2,callFunc);
                        _this.srcSelect.runAction(seq);
                    }
                    else if (_this.winOrLost === 2) {
                        var moveTo1 = cc.moveTo(0.2,cc.p(_this.destPosX,_this.destPosY));
                        _this.srcSelect.runAction(moveTo1);
                        var delayTime1 = cc.delayTime(0.06);
                        var moveTo2 = cc.moveTo(0.2,cc.p(_this.destPosX*2-_this.srcPosX,cc.winSize.height+200));
                        var delayTime2 = cc.delayTime(0.1);
                        var callFunc = cc.callFunc(function(target,data) {
                            func();
                        })
                        var seq = cc.sequence(delayTime1,moveTo2,delayTime2,callFunc);
                        _this.destBg.runAction(seq);
                    }
                }
            },_this);
            var seq3 = cc.sequence(delayTime3,callFunc3);
            _this.runAction(seq3);
        },_this);
        var seq = cc.sequence(delayTime,callFunc); 
        this.runAction(seq);
    },
    onExit:function() {
        cc.eventManager.removeListener(this.listener1); 
        cc.eventManager.removeListener(this.listener2); 
        cc.eventManager.removeListener(this.listener3); 
        cc.eventManager.removeListener(this.listener4); 
        cc.eventManager.removeListener(this.listener5); 
        cc.eventManager.removeListener(this.listener6); 
        cc.eventManager.removeListener(this.listener7); 
        cc.eventManager.removeListener(this.listener8); 
    }
});

var MoraGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        console.log("MoraGameScene ctor");
        var layer = new MoraGameLayer();
        this.addChild(layer);
    }
});