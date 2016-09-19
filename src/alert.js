//弹出框layer，
//{string}confirmString,{string}cancleString
//{function}confirmFunc,{function}cancleFunc
//必须要在调用的那个类里实现confirmFunc，cancleFunc是可选的
//当confirmString和cancleString都没传的时候，只显示确认按钮。
var AlertLayer = cc.Layer.extend({
	alertscene:null,
	targetObj:null,
    callConfirmFunc:null,
    callCancleFunc:null,
	ctor:function (targetObj,titleString,isOne,confirmFunc,cancleFunc,confirmString,cancleString) {
        this._super();

        console.log("AlertLayer ctor");
        this.alertscene = ccs.load(res.alert_json);
        this.addChild(this.alertscene.node);

        // this.alertscene.node.setTouchEnabled(true);
        this.callConfirmFunc = confirmFunc;
        this.callCancleFunc = cancleFunc;

        this.initView(targetObj,titleString,isOne,confirmString,cancleString);
        return true;
    },
    initView:function(targetObj,titleString,isOne,confirmString,cancleString){
    	this.targetObj = targetObj;
        if (titleString === null || titleString === undefined) {
            titleString = "未知错误";
        }
    	var title = ccui.helper.seekWidgetByName(this.alertscene.node,"title");
    	title.setString(titleString);
    	// alert.setTouchEnabled(true);
    	var confirm = ccui.helper.seekWidgetByName(this.alertscene.node,"confirm");
        confirm.addTouchEventListener(this.onConfirm,this);
    	var cancle = ccui.helper.seekWidgetByName(this.alertscene.node,"cancle");
        cancle.addTouchEventListener(this.onCancle,this);
        if (confirmString !== undefined && confirmString !== null && confirmString !== ""){
            var text = ccui.helper.seekWidgetByName(confirm,"text");
            text.setString(confirmString);
        }
        if (cancleString !== undefined && cancleString !== null && cancleString !== ""){
            var text = ccui.helper.seekWidgetByName(cancle,"text");
            text.setString(cancleString);
        }
        if (isOne) {
            confirm.setPositionX(540);
            cancle.setVisible(false);
            cancle.setTouchEnabled(false);
        }
    },
    onConfirm:function(target,event){
        if (event == ccui.Widget.TOUCH_ENDED){
            if (this.callConfirmFunc !== undefined && this.callConfirmFunc !== null){
    			this.callConfirmFunc(target,event);
    		}
            this.removeFromParent(true);
        }
    },
    onCancle:function(target,event){
        if (event == ccui.Widget.TOUCH_ENDED){
            console.log("onCancle!!!!");
            if (this.callCancleFunc !== undefined && this.callCancleFunc !== null){
    			// this.call(this.targetObj,cancleFunc);
    			this.callCancleFunc(target,event);
    		}
            this.removeFromParent(true);
        }
    }
});