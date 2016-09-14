function OpenCard(opt){
	this.opt = opt || {};
	this.cardList = this.opt.cardList || [];
	// this.action	= this.opt.action 	|| ["openCard"];
	this.action	= this.opt.action 	|| ["chooseCard"];
	this.wait = null;

	this.run();
}

OpenCard.prototype = {

	run : function(){
		var self = this;
		if(!self.cardList.length) return;
		self.wait = new Wait("正在获取卡券，请稍候...");
		self.getSignature();
	},

	getSignature : function(){
		var self = this,
			url = window.cfg.getSignature,
			param = {};
		param.noncestr = "kidbook";
		param.timestamp = Math.floor(new Date().getTime() / 1000);
		param.url = location.href.split('#')[0];
		$.get(url, param, function(data){			
			if(data.code == 200 && data.signature){
				self.init(param.timestamp, param.noncestr, data.signature);
			}
		}, "json");
	},

	init : function(t, n, s){
		var self = this;
		wx.config({
		    debug: true,
		    appId : "wxf9dc3c84d5f267f2",
		    timestamp: t,
		    nonceStr: n,
		    signature: s,
		    jsApiList: self.action
		});
		wx.ready(function(){
			alert("rrready");
			self.chooseCard();
		});
	},

	chooseCard : function(){
		var self = this,
			url = window.cfg.getCardSignature,
			param = {};
		param.timestamp = Math.floor(new Date().getTime() / 1000);
		param.code = "";
		// param.card_id = "pfdNtt5N1WHzQf_Luo7EyWkMwjeY";
		// param.card_id = "pfdNtt8UegRT9yilMtW_ExIC09xo";
		// param.card_id = "";
		// param.openid = self.getOpenId();
		param.balance = "";
		param.signType = "SHA1"	
		$.get(url, param, function(data){
			if(data.code == 200 && data.signature){
				self.wait.hide();
				self.doChoose(param, data.signature);
			}
		}, "json");
	},

	getOpenId : function(){
		return $.fn.cookie("visitor_openid") || $("#visitor_openid").val();
	},

	doChoose : function(param, signature){
		var self = this;
		wx.chooseCard({
		    shopId: '', // 门店Id
		    cardType: '', // 卡券类型
		    // cardId: param.card_id, // 卡券Id
		    cardId: "", // 卡券Id
		    timestamp: param.timestamp, // 卡券签名时间戳
		    nonceStr: "kidbook", // 卡券签名随机串
		    signType: 'SHA1', // 签名方式，默认'SHA1'
		    cardSign: signature, // 卡券签名，详见附录4
		    success: function (res) {
		        var cardList= res.cardList; // 用户选中的卡券列表信息
		    }
		});
	}
};