function CouponCard(opt){
	this.container = $("#container");
	this.opt = opt || {};
	this.btnId = this.opt.btnId || "#wx-card";
	this.cardId = this.opt.cardId;

	this.bind();
};

CouponCard.prototype = {

	bind : function(){
		var self = this;
		$(self.btnId).on("click", function(){
			var url = window.cfg.check_coupon,
				param = { id : $("#activity_id").val() };
			$.get(url , param, function(data){
				if(data.status == "HAVE_RECEIVED"){
					new Wait("不能重复领取…", "autoHide");
				}else if(data.status == "RECEIVEABLE"){
					new WXCard({
						cardId : self.cardId,
						success : self.success
					});
				}else{
					new Wait("领取失败，请再试一次…", "autoHide");
				}
			}, "json");
		});
	},

	success : function(){
		var self = this;
		receive_coupon();
		function receive_coupon(){
			var url = window.cfg.receive_coupon,
				param = {};
			param.id = $("#activity_id").val();
			param.cardid = self.cardId;
			$.get(url, param, function(data){
				if(data.code != 200) receive_coupon();
			}, "json");
		}
	}	
};