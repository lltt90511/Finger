var res = {
    start_json : "res/login.json",
    alert_json : "res/alert.json",
    commonTop_json : "res/common_top.json",
    moraGame_json : "res/moraGame.json",
    betAlert_json : "res/betAlert.json",
    inviterAlert_json : "res/inviterAlert.json",
    waitInviterAlert_json : "res/waitInviterAlert.json",

    bgMusic_1 : "res/sound/bgm1.mp3",
    effect_1 : "res/sound/effect_01.wav", //倒计时音效
    effect_2 : "res/sound/effect_02.wav", //转圈音效
    effect_3 : "res/sound/effect_03.wav", //点击按钮音效
    effect_st : "res/sound/effect_16.wav", //石头音效
    effect_jd : "res/sound/effect_18.wav", //剪子音效
    effect_bu : "res/sound/effect_17.wav", //布音效
    effect_jieguo : "res/sound/effect_14.wav", //显示结果
    effect_shibai : "res/sound/effect_10.wav", //失败音效
    effect_pingju : "res/sound/effect_11.wav", //平局音效
    effect_shengli : "res/sound/effect_09.wav", //胜利音效
    effect_xialuo : "res/sound/effect_13.wav", //下落音效
    effect_jifei : "res/sound/effect_08.wav", //击飞音效
    effect_into : "res/sound/effect_15.wav", //进入游戏
    
    pic_wenhao : "res/qietu/mopra/wenhao.png",
    pic_shibai : "res/qietu/mora/shibai.png",
    pic_shengli : "res/qietu/mora/shengli.png",
    pic_pingju : "res/qietu/mora/pingju.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
