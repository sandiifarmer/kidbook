function Join(){
	this.container = $("#container");
	this.id = $("#id").val();
	this.status = $("#status").val();

	this.bindShow();
	this.bindHide();
	this.bindSubmit();
}

Join.prototype = {

	bindShow : function(){
		var self = this;
		$("#join").on("click", function(){
			$("#company").val("");
			$("#phone").val("");
			$("#intro").val("");
			$(".join-warn").text("");
			$(".join-box").show();
			document.getElementById("container").scrollTop = 0;
			self.container.css({overflowY : "hidden"});
			if(self.status == "edit") self.getInfo();
		});
	},

	getInfo : function(){
		var self = this,
			url = window.cfg.get;
		url += ("?id=" + self.id);
		$.get(url, function(data){
			if(data.code != 200) return;
			$("#company").val(data.company);
			$("#phone").val(data.phone);
			$("#intro").val(data.intro);
		}, "json");
	},

	bindHide : function(){
		var self = this;
		$(".join-cross").on("click", function(e){
			$(".join-box").hide();
			self.container.css({overflowY : "scroll"});
		});
	},

	bindSubmit : function(){
		var self = this;
		$(".join-fake").on("click", function(){
			$(".join-confirm").trigger("click");
		});
	}
};