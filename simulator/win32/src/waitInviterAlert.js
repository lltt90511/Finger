var WaitInviterAlertLayer = cc.Layer.extend({
	waitInviterAlertScene:null,
    name:"",

	ctor:function (_name) {
        this._super();

        this.waitInviterAlertScene = ccs.load(res.waitInviterAlert_json);
        this.addChild(this.waitInviterAlertScene.node);
        this.name = _name;

        this.initView();

        return true;
    },
    initView:function() {
    	var btn = ccui.helper.seekWidgetByTag(this.waitInviterAlertScene.node, 12605);
        btn.addTouchEventListener(this.onBtn.bind(this));
    },
    onBtn:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onBtn");
            cc.audioEngine.playEffect(res.effect_3,false);
            var t = new Object();
            t.msgType = "1";
            t.opType = "FINGERGAMEINVITECANCEL";
            t.srcId = userData.id;
            t.srcTele = userData.name;
            t.destTele = this.name;
            t.stime = Date.parse(new Date());
            var s = "destTele="+t.destTele+"&msgType=1&opType=FINGERGAMEINVITECANCEL&srcId="+t.srcId+"&srcTele="+t.srcTele+"&stime="+t.stime+userData.token;
            console.log(s);
            t.sign = hex_md5(s);
            var str = JSON.stringify(t);
            nc.socketCall(str);
        }
    }
});