function Share(){
	this.container = $("#container");
	this.html =
	'<div class="shr-box">'
	+'	<div class="shr-mist"></div>'
	+'	<div class="shr-hand"></div>'
	+'</div>';

	this.run();
}

Share.prototype = {

	run : function(){
		var self = this;
		$(document.body).addClass("shr-full");
		$("html").addClass("shr-full");
		$(document.body).append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".shr-mist").on("click", function(e){
			$(".shr-box").remove();
			$(document.body).removeClass("shr-full");
			$("html").removeClass("shr-full");
		});
	}

};