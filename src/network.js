//socket连接类
var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket
var network = cc.Class.extend({
	websocket:null,
	contectCnt:0,
	isToStart:false,
	//创建一个socket连接 func是连接成功的回调
	contect:function(func){
		var _this = this;
		console.log("contect!!!!!!");
	    if (_this.websocket === null){
		    _this.websocket = new WebSocket("ws://dev.party1.cn:5001/fingerWebSocket");
		    this.websocket.onopen = function (ev) {
		        console.log("Send Text WS was opened.");
		        _this.contectCnt = 0;
		        _this.isToStart = false;
                var t = new Object();
                t.msgType = 0;
                t.loginUser = userData.id;
                 var str = JSON.stringify(t);
                 _this.socketCall(str);
		        // _this.socketCall("{msgType:0,loginUser:18157170815}");
		    };
		    this.websocket.onerror = function (ev) {
		        console.log("Send Text fired an error");
		    };
		    this.websocket.onmessage = function(ev) {
		        console.log("get Text WS from server");
		        console.log(JSON.stringify(ev));
		        var data = JSON.parse(ev.data);
		        console.log("data"+data.opType);
		        var callFunc = _this.getCallFunc(data.opType).bind(_this);
		        if (callFunc !== undefined && callFunc !== null){
		        	if (data !== undefined && data !== null){
		        		console.log("data"+data);
		        		callFunc(data); 
		        	}
		        }
			};
			this.websocket.onclose = function(ev) {
		        console.log("Send Text WS was colse.");
		        _this.websocket = null;
                if (isLogout) {
	                var confirmFunc = function() {
			        	_this.contectCnt = _this.contectCnt + 1;
	                	_this.contect();
	                }
	                var cancelFunc = function() {
	                    currentScene = new StartScene();
	                    cc.director.runScene(currentScene);
	                }
			        if (_this.contectCnt >= 3) {
			        	currentScene.addChild(new AlertLayer(_this,"暂时无法连接服务器，请稍后重试",false,confirmFunc,null,"重试", "取消"),100);
	                    if (!_this.isToStart) {
	                    	_this.isToStart = true;
	                    	currentScene = new StartScene();
	                    	cc.director.runScene(currentScene);
	                    }
			        }
			        else {
			        	currentScene.addChild(new AlertLayer(_this,"连接服务器失败，请检查网络连接",false,confirmFunc,cancelFunc,"重试", "取消"),100);
			        }
                }
			};
		}
	},
	close:function() {
		this.websocket.close();
	},
	socketCall:function(socketStr){
		if (socketStr === undefined || socketStr === null || typeof socketStr !== "string") {
			return;
		}
		this.websocket.send(socketStr);
	    console.log("WebSocket send !!!!!"+socketStr);
	},
	//发送自定义事件
	pushEvent:function(custom,data){
	    var event = new cc.EventCustom(custom);
	    event.setUserData(data);
	    cc.eventManager.dispatchEvent(event);
	},
	//注册回调方法。
	getCallFunc:function(name) {
		switch (name) {
			//bet
			case "FINGERGAMEBET_RETURN":
				return this.fingerGameBetReturn;
			break;
			//invite
			case "FINGERGAMEINVITE_RETURN":
				return this.fingerGameInviteReturn;
			break;
			//invite cancel
			case "FINGERGAMEINVITECANCEL_RETURN":
				return this.fingerGameInviteCancelReturn;
			break;
			//invite argee
			case "FINGERGAMEINVITEAGREE_RETURN":
				return this.fingerGameInviteAgreeReturn;
			break;
			//invite refuse
			case "FINGERGAMEINVITEREFUSE_RETURN":
				return this.fingerGameInviteRefuseReturn;
			break;
			//guess return
			case "FINGERGAMEGUESS_RETURN":
				return this.fingerGameGuessReturn;
			break;
			//guess result
			case "FINGERGAMEGUESSRESULT":
				return this.fingerGameGuessResult;
			break;
			//logout
			case "LOGOUT_RETURN":
				return this.logoutReturn;
			break;
			default:
				return null;
		}
	},
	fingerGameBetReturn:function(data){
	    console.log("fingerGameBetReturn!!!!!");
	    this.pushEvent("FINGER_GAME_BET_RETURN",data);   
	},
	fingerGameInviteReturn:function(data){
	    console.log("fingerGameInviteReturn!!!!!");
	    this.pushEvent("FINGER_GAME_INVITE_RETURN",data); 
	},
	fingerGameInviteCancelReturn:function(data){
	    console.log("fingerGameInviteCancelReturn!!!!!");
	    this.pushEvent("FINGER_GAME_INVITE_CANCEL_RETURN",data);   
	},
	fingerGameInviteAgreeReturn:function(data){
	    console.log("fingerGameInviteAgreeReturn!!!!!");
	    this.pushEvent("FINGER_GAME_INVITE_AGREE_RETURN",data);   
	},
	fingerGameInviteRefuseReturn:function(data){
	    console.log("fingerGameInviteRefuseReturn!!!!!");
	    this.pushEvent("FINGER_GAME_INVITE_REFUSE_RETURN",data);   
	},
	fingerGameGuessReturn:function(data){
	    console.log("fingerGameGuessReturn!!!!!");
	    this.pushEvent("FINGER_GAME_GUESS_RETURN",data);   
	},
	fingerGameGuessResult:function(data){
	    console.log("fingerGameGuessResult!!!!!");
	    this.pushEvent("FINGER_GAME_GUESS_RESULT",data);   
	},
	logoutReturn:function(data){
	    console.log("logoutReturn!!!!!");
	    this.pushEvent("LOGOUT_RETURN",data);   
	}
});