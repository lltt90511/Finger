var BetAlertLayer = cc.Layer.extend({
	betAlertScene:null,
	editBox:null,
	targetObj:null,
	ctor:function (_targetObj) {
        this._super();

        this.betAlertScene = ccs.load(res.betAlert_json);
        this.addChild(this.betAlertScene.node);
        this.targetObj = _targetObj;

        this.initView();

        return true;
    },
    initView:function(){
        console.log("initView!!!!!!!!!");
        var btn = ccui.helper.seekWidgetByTag(this.betAlertScene.node, 12471);
        btn.addTouchEventListener(this.onConfirm.bind(this));
        var backBtn = ccui.helper.seekWidgetByTag(this.betAlertScene.node, 12547);
        backBtn.addTouchEventListener(this.onBack.bind(this));
        this.initInput();
    },
    initInput:function(){
        var input = ccui.helper.seekWidgetByName(this.betAlertScene.node,"cost");
        var inputSize = input.getContentSize();
        this.editBox = new cc.EditBox(cc.size(inputSize.width,inputSize.height),new cc.Scale9Sprite(res.empty));
        this.editBox.setDelegate(this); 
        this.editBox.setTag(1);  
        this.editBox.setPosition(cc.p(460,1050));
        this.editBox.setAnchorPoint(cc.p(0,0.5));
        this.editBox.setFontSize(40);
        this.editBox.setPlaceholderFontSize(40);
        this.editBox.setReturnType(1);
        this.editBox.setMaxLength(20);
        this.editBox.setPlaceHolder("请输入押注金额");
        this.editBox.setString("");
        this.betAlertScene.node.addChild(this.editBox,1);
    },
    editBoxEditingDidBegin: function (sender) {
        console.log("editBoxEditingDidBegin!!!!%d");
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
    onBack:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onBack");
            cc.audioEngine.playEffect(res.effect_3,false);
            this.removeFromParent(true);
        }
    },
    onConfirm:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onConfirm");
            cc.audioEngine.playEffect(res.effect_3,false);
            var string = this.editBox.getString();
            if (string === "" || typeof Number(string) !== "number") {
            	currentScene.addChild(new AlertLayer(this,"请输入押注金额",true),100);
            }
            else if (Number(string) > userData.gold) {
            	currentScene.addChild(new AlertLayer(this,"押注金额过大",true),100);
            }
            else {
	            if (this.targetObj.isInvite) {
	            	var t = new Object();
            		t.msgType = "1";
	                t.opType = "FINGERGAMEBET";
	                t.srcId = userData.id;
	                t.roomId = this.targetObj.roomId;
	                t.betCoin = Number(string);
	                t.stime = Date.parse(new Date());
	                var s = "betCoin="+t.betCoin+"&msgType=1&opType=FINGERGAMEBET&roomId="+t.roomId+"&srcId="+t.srcId+"&stime="+t.stime+userData.token;
	                t.sign = hex_md5(s);
	                var str = JSON.stringify(t);
	                nc.socketCall(str);
	            }
	            else {
            		if (this.targetObj.onBetAlertBack !== undefined && this.targetObj.onBetAlertBack !== null) {
	            		this.targetObj.onBetAlertBack(Number(string));
	            	}
            		this.removeFromParent(true);
	            }
            }
        }
    }
});