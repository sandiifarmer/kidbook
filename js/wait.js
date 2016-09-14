function Wait(text, hideType){
	this.container = $("#container");
	this.html =
	'<div class="wait-box">'
	+'	<div class="wait-mist"></div>'
	+'	<div class="wait-wrap center">'+ text +'</div>'
	+'</div>';

	this.show();
	if( hideType == "autoHide" ) this.autoHide();
}

Wait.prototype = {

	show : function(){
		var self = this;
		$(document.body).addClass("shr-full");
		$("html").addClass("shr-full");
		$(document.body).append( self.html );
	},

	hide : function(){
		var self = this;
		$(".wait-box").remove();
		$(document.body).removeClass("shr-full");
		$("html").removeClass("shr-full");
	},

	autoHide : function(){
		var self = this;
		setTimeout(function(){
			self.hide();
		}, 2000);
	}
};