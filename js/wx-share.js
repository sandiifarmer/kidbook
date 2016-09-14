function WXShare(opt){
	this.opt 	= opt || {};
	this.action	= this.opt.action 	|| ["timeline","appMessage"];
	this.title 	= this.opt.title	|| $("title").text();
	this.desc 	= this.opt.desc		|| "";
	this.link 	= this.opt.link		|| location.href;
	this.imgUrl = this.opt.imgUrl	|| window.cfg.imgUrl;
	this.success= this.opt.success	|| function(){};
	this.cancel	= this.opt.cancel	|| function(){};

	this.getSignature();
}

WXShare.prototype = {

	getSignature : function(){
		var self = this,
			u = window.cfg.getSignature,
			noncestr = "kidbook",
			timestamp = Math.floor(new Date().getTime() / 1000),
			url = encodeURIComponent( location.href.split('#')[0] );
		if(!u) return;
		u += ("?noncestr=" + noncestr);
		u += ("&timestamp=" + timestamp);
		u += ("&url=" + url);
		$.get(u, function(data){
			if(data.code == 200 && data.signature){
				self.init(timestamp, noncestr, data.signature);
			}else{
				// alert("get signature fail..");
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
		    jsApiList: [
		    	"onMenuShareTimeline",
		    	"onMenuShareAppMessage",
		    	"onMenuShareQQ"
		    ]
		});
		wx.ready(function(){
			self.run();
		});
	},

	run : function(){
		var self = this;
		for(var i = 0; i < self.action.length; i++){
			var action = self.action[i];

			if(action == "timeline") 	self.timeline();
			if(action == "appMessage")	self.appMessage();
			if(action == "qq") 			self.qq();
		}
	},

	timeline : function(){
		var self = this;
		wx.onMenuShareTimeline({
		    title 	: self.title,
		    link 	: self.link,
		    imgUrl 	: self.imgUrl,
		    success : self.success,
		    cancel 	: self.cancel
		});
	},

	appMessage : function(){
		var self = this;
		wx.onMenuShareAppMessage({
			title 	: self.title,
			desc 	: self.desc,
		    link 	: self.link,
		    imgUrl 	: self.imgUrl,
		    type 	: '',
		    dataUrl : '',
		    success : self.success,
		    cancel 	: self.cancel
		});
	},

	qq : function(){
		var self = this;
		wx.onMenuShareTimeline({
		    title 	: self.title,
		    desc	: self.desc,
		    link 	: self.link,
		    imgUrl 	: self.imgUrl,
		    success : self.success,
		    cancel 	: self.cancel
		});
	}
};