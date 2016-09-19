var InviterAlertLayer = cc.Layer.extend({
	inviterAlertScene:null,
	id:0,
	name:"",
	roomId:0,

	ctor:function (_name,_roomId) {
        this._super();

        this.inviterAlertScene = ccs.load(res.inviterAlert_json);
        this.addChild(this.inviterAlertScene.node);
        this.name = _name;
        this.roomId = _roomId;

        this.initView();

        return true;
    },
    initView:function() {
    	var nameLabel = ccui.helper.seekWidgetByTag(this.inviterAlertScene.node, 12580);
    	setTextString(nameLabel,"玩家"+this.name);
    	var tongyi = ccui.helper.seekWidgetByTag(this.inviterAlertScene.node, 12434);
        tongyi.addTouchEventListener(this.onTongyi.bind(this));
    	var jujue = ccui.helper.seekWidgetByTag(this.inviterAlertScene.node, 12437);
        jujue.addTouchEventListener(this.onJujue.bind(this));
    },
    onTongyi:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onTongyi");
            cc.audioEngine.playEffect(res.effect_3,false);
            var t = new Object();
            t.msgType = "1";
            t.opType = "FINGERGAMEINVITEAGREE";
            t.srcId = userData.id;
            t.srcTele = userData.name;
            t.roomId = this.roomId;
            t.stime = Date.parse(new Date());
            var s = "msgType=1&opType=FINGERGAMEINVITEAGREE&roomId="+t.roomId+"&srcId="+t.srcId+"&srcTele="+t.srcTele+"&stime="+t.stime+userData.token;
            console.log(s);
            t.sign = hex_md5(s);
            var str = JSON.stringify(t);
            nc.socketCall(str);
        }
    },
    onJujue:function(target,event) {
        if (event === ccui.Widget.TOUCH_ENDED){
            console.log("onJujue");
            cc.audioEngine.playEffect(res.effect_3,false);
            var t = new Object();
            t.msgType = "1";
            t.opType = "FINGERGAMEINVITEREFUSE";
            t.srcId = userData.id;
            t.srcTele = userData.name;
            t.roomId = this.roomId;
            t.stime = Date.parse(new Date());
            var s = "msgType=1&opType=FINGERGAMEINVITEREFUSE&roomId="+t.roomId+"&srcId="+t.srcId+"&srcTele="+t.srcTele+"&stime="+t.stime+userData.token;
            console.log(s);
            t.sign = hex_md5(s);
            var str = JSON.stringify(t);
           	nc.socketCall(str);
        }
    }
});