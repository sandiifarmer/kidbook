function Album( selector ){
	this.container = $("#container");
	this.selector = selector;
	this.html =
	'<div class="album-box album-transparent">'
	+'	<div class="album-mist trans1"></div>'
	+'	<div class="album-wrap">'
	+'		<img src="">'
	+'	</div>'
	+'</div>';

	this.bindShow();
}

Album.prototype = {

	bindShow : function(){
		var self = this;
		self.container
			.undelegate(self.selector, "click")
			.delegate(self.selector, "click", function(e){
				var img = $(e.currentTarget).children("img");
				if( !img || !img.length ) return;
				self.run( img );
			});
	},

	run : function( img ){
		var self = this;
		$(document.body).addClass("album-full");
		$("html").addClass("album-full");
		self.container.append(self.html);
		$(".album-wrap").css({
			width : self.container.width(),
			height : self.container.height(),
		}).children("img").attr({
			src : img.attr("src")
		});
		setTimeout(function(){
			$(".album-wrap").addClass("trans1");
			$(".album-box").removeClass("album-transparent");
		}, 200);
		self.bindHide();
	},

	bindHide : function(){
		var self = this;
		$(".album-box").on("click", function(e){
			// self.container.undelegate(self.selector, "click");
			$(".album-box").remove();
			$(document.body).removeClass("album-full");
			$("html").removeClass("album-full");
		});
	}

};