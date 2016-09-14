function CardList(){
	this.cardId = "";
	this.wait = null;

	this.bind();
}

CardList.prototype = {

	bind : function(){
		var self = this;
		$(".card-box").children("li").on("click", function(e){
			var li = $( e.currentTarget );
			self.cardId = li.attr("data-cardid");
			if( !self.cardId ) return;
			self.wait = new Wait("正在校验卡券，请稍候...");
			self.getSignature();
		});
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
		    debug: false,
		    appId : "wxf9dc3c84d5f267f2",
		    timestamp: t,
		    nonceStr: n,
		    signature: s,
		    jsApiList: ["addCard"]
		});
		wx.ready(function(){
			self.execCardExt();
		});
	},

	execCardExt : function(){
		var self = this,
			url = window.cfg.getCardSignature,
			param = {};
		param.timestamp = Math.floor(new Date().getTime() / 1000);
		param.code = "";
		param.card_id = self.cardId;
		param.openid = self.getOpenId();
		param.balance = "";
		$.get(url, param, function(data){
			if(data.code == 200 && data.signature){
				self.wait.hide();
				self.addCard(param, data.signature);
			}
		}, "json");
	},

	getOpenId : function(){
		return $.fn.cookie("visitor_openid") || $("#visitor_openid").val();
	},

	addCard : function(param, signature){
		var self = this,
			cardExt = JSON.stringify( self.getCardExt(param, signature) );
		wx.addCard({
		    cardList: [{
		        cardId: self.cardId,
		        cardExt: cardExt
		    }],
		    success: function (res) {
		        var cardList = res.cardList;
		        // alert( JSON.stringify(res.cardList) );
		        // alert("回调成功啦");
		    }
		});
	},

	getCardExt : function(param, signature){
		var self = this,
			cardExt = {};
		cardExt.code = param.code;
		cardExt.openid = param.openid;
		cardExt.timestamp = param.timestamp;
		cardExt.signature = signature;
		return cardExt;
	}
};