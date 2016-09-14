function RenderList(){
	this.container = $("#container");
	this.box = $("#list-body");
	this.obox = this.box[0];
	this.leftUl = $("#list-left");
	this.rightUl = $("#list-right");
	this.hint = $(".list-more");
	this.buffer = $(".list-buffer");
	this.pageno = 1;
	this.valve = true;

	this.bindRequest();
	this.request();
	this.bindLike();
}

RenderList.prototype = {

	bindRequest : function(){
		var self = this;
		self.box.on("scroll touchend", function(){
			if(!self.valve) return;
			var scrollTop = self.obox.scrollTop,
				scrollHeight = self.obox.scrollHeight,
				clientHeight = self.obox.clientHeight,
				atBottom = !!(scrollTop == scrollHeight - clientHeight);
			if(atBottom){
				self.request();
			}
		});
	},

	request : function(){
		var self = this;

		self.valve = false;
		self.hint.text("加载中..");
		
		var	url = window.cfg.list;
		url += ("&pageno=" + self.pageno);
		$.getJSON(url, function(data){
			if(data.code == 200){
				self.preload(data);
			}			
			if(data.totalpage > self.pageno){
				self.pageno++;				
			}else{
				self.valve = false;
				self.hint.text("没有更多了");
			}
		});
	},

	preload : function(data){
		var self = this;
		self.buffer.html("");
		for(var i = 0; i < data.data.length; i++){
			var src = data.data[i].image;
			self.buffer.append('<img src="" data-src="'+ src +'">');
		}
		var imgs = self.buffer.children("img"),
			loaded = 0;
		imgs.on("load",function(){
            loaded++;
            if(loaded == imgs.length){
                self.render(data);
            }
        }).on("error",function(){
            loaded++;
            if(loaded == imgs.length){
                self.render(data);
            }
        }).each(function(i){
            $(this).attr({ src : $(this).attr("data-src") });
        });
	},

	render : function(data){
		var self = this,
			arr = data.data;
		for(var i = 0; i < arr.length; i++){
			self.single( arr[i] );
		}
		if(data.totalpage > self.pageno){
			self.valve = true;
			self.hint.text("加载更多..");
		}else{
			self.hint.text("没有更多了");
		}
	},

	single : function(dat){
		var self = this,
			red = dat.liked ? "list-red" : "",
			html = 
			'<li data-imageid="'+ dat.imageid +'">'
			+'	<div class="list-pic">'
			+'		<img src="'+ dat.image +'">'
			+'	</div>'
			+'	<div class="list-info">'
			+'		<div class="list-icon">'
			+'			<img src="'+ dat.headimgurl +'">'
			+'		</div>'
			+'		<div class="list-name">'+ dat.author +'</div>'
			+'		<div class="list-heart '+ red +'"></div>'
			+'		<div class="list-num">'+ dat.likenum +'</div>'
			+'	</div>'
			+'</li>',
			lH = self.leftUl.height(),
			rH = self.rightUl.height(),
			box = (lH < rH) ? self.leftUl : self.rightUl;
		box.append(html);
	},

	bindLike : function(){
		var self = this;
		self.container.delegate(".list-heart", "click", function(e){
			var heart = $( e.currentTarget );
			if( heart.hasClass("list-red") ) return;
			var li = heart.parent().parent(),
				imageid = li.attr("data-imageid"),
				url = window.cfg.like;
			url += ("?imageid=" + imageid);
			$.get(url, function(){
				//
			});

			heart.addClass("list-red");
			var num = heart.siblings(".list-num"),
				n = parseInt( num.text() ) + 1;
			num.text( n );
		});
	}
};