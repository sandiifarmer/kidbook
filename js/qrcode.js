function Qrcode(){
	this.html =
	'<div class="qr-box">'
	+'	<div class="qr-mist"></div>'
	+'	<div class="qr-wrap">'
	+'		<div style="height:40px;"></div>'
	+'		<p class="qr-bold">太喜欢某人的作品想联系？</p>'
	+'		<p class="qr-bold">或者了解更多的活动内容？</p>'
	+'		<p>关注公众号留言将最快为您解决！</p>'
	+'		<div class="qr-pic">'
	+'			<img src="'+ window.cfg.qrcode +'">'
	+'		</div>'
	+'		<p>小编直达号 18801177082</p>'
	+'		<div class="qr-cross"></div>'
	+'	</div>'
	+'</div>';

	this.run();
};


Qrcode.prototype = {

	run : function(){
		var self = this;
		$(document.body).append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".qr-cross").on("click", function(){
			$(".qr-box").remove();
		});
	}
};