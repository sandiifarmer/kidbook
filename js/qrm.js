function Qrm(){
	this.html =
	'<div class="qrm-box">'
	+'	<div class="qrm-mist"></div>'
	+'	<div class="qrm-wrap center">'
	+'		<div class="qrm-pic center">'
	+'			<img src="'+ window.cfg.qrcode +'">'
	+'		</div>'
	+'		<div class="qrm-cross"></div>'
	+'	</div>'
	+'</div>';

	this.run();
};


Qrm.prototype = {

	run : function(){
		var self = this;
		$(document.body).addClass("qrm-full");
		$("html").addClass("qrm-full");
		$(document.body).append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".qrm-cross").on("click", function(){
			$(".qrm-box").remove();
			$(document.body).removeClass("qrm-full");
			$("html").removeClass("qrm-full");
		});
	}
};