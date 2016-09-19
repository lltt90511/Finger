var CommonTopLayer = cc.Layer.extend({
	commonTopScene:null,
	jindouLabel:null,
    yindouLabel:null,
    targetObj:null,
	
    ctor:function (_targetObj) {
        this._super();

        console.log("CommonTopLayer ctor");
        this.commonTopScene = ccs.load(res.commonTop_json);
        this.addChild(this.commonTopScene.node);
        this.targetObj = _targetObj;

        this.initView();
        
        return true;
    },
    initView:function() {
    	var name = ccui.helper.seekWidgetByName(this.commonTopScene.node,"name");
        setTextString(name,userData.name);
    	this.jindouLabel = ccui.helper.seekWidgetByTag(this.commonTopScene.node,28873);
        this.yindouLabel = ccui.helper.seekWidgetByTag(this.commonTopScene.node,28877);
    	var back = ccui.helper.seekWidgetByName(this.commonTopScene.node,"close");
    	back.addTouchEventListener(this.onBack.bind(this),this);
        this.resetGoldLabel();
    },
    resetGoldLabel:function() {
        setTextString(this.jindouLabel,"金豆:"+userData.localGold);
        setTextString(this.yindouLabel,"银豆:"+userData.gold);
    },
    onBack:function(target,event) {
    	if (event === ccui.Widget.TOUCH_ENDED){
        	console.log("onBack");
            cc.audioEngine.playEffect(res.effect_3,false);
            this.targetObj.onBack();
    	}
    },
    onExit:function() {
        console.log("CommonTopLayer onExit");
    }
});