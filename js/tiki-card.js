function TikiCard(opt){
	this.container = $("#container");
	this.opt = opt || {};
	this.btnId = this.opt.btnId || "#wx-card";
	this.cardId = this.opt.cardId;

	this.bind();
};

TikiCard.prototype = {

	bind : function(){
		var self = this;
		$(self.btnId).on("click", function(){
			var url = window.cfg.check_ticket,
				param = { id : $("#activity_id").val() };
			$.get(url , param, function(data){
				if(data.status == "NOT_ENOUGH_SUPPORTERS"){
					new Wait("还需要召唤更多小伙伴…", "autoHide");
				}else if(data.status == "HAVE_RECEIVED"){
					new Wait("不能重复领取门票…", "autoHide");
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
		receive_ticket();
		function receive_ticket(){
			var url = window.cfg.receive_ticket,
				param = {};
			param.id = $("#activity_id").val();
			param.cardid = self.cardId;
			$.get(url, param, function(data){
				if(data.code == 200){
					$(self.btnId)
						.after('<div class="center gray">已领取</div>')
						.remove();
				}else{
					receive_ticket();
				}
			}, "json");
		}
	}	
};