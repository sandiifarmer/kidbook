function Uploader(){
	this.container = $("#container");
	this.html =
	'<div class="up-box">'
	+'	<div class="up-mist"></div>'
	+'	<div class="up-wrap center">'
	+'		<div class="up-icon">'
	+'			<img src="">'
	+'		</div>'
	+'		<input id="image" name="image" type="file" class="up-file">'
	+'		<input id="openid" name="openid" type="hidden">'
	+'		<div class="up-pic"></div>'
	+'		<form id="save-form" name="save-form" action="'+ window.cfg.saveImg +'" method="post">'
	+'			<input type="hidden" id="imageid" name=imageid>'
	+'			<input type="text"   id="author"  name="author" class="up-input" placeholder="留下大名">'
	+'			<input type="text"   id="phone"   name="phone"  class="up-input" placeholder="联系电话">'
	+'			<div class="up-warn"></div>'
	+'			<div class="up-tip">请保证您所上传属于自己的原创作品，如有版权纠纷，中国童书博览会概不负责，同时承诺本次活动所收集作品绝不私自用于商用。</div>'
	+'			<div class="up-fake">提交</div>'
	+'			<input class="up-confirm" type="submit" onclick="return validate();">'
	+'		</form>'
	+'		<div class="up-cross"></div>'
	+'	</div>'
	+'</div>';

	this.run();
	this.setValidate();	
}

Uploader.prototype = {

	run : function(){
		var self = this;
		self.container.append(self.html);
		self.fillInfo();
		self.bindUpload();
		self.bindCross();
		self.bindSubmit();
	},

	fillInfo : function(){
		var self = this;
		$(".up-icon").children("img").attr({
			src : $("#headimgurl").val()
		});

		if( !$("#visitor_openid").val() )
			$("#visitor_openid").val( $.cookie("visitor_openid") );
		$("#openid").val( $("#visitor_openid").val() );

		var author = $("#hidden_author").val() || $.cookie("hidden_author");
		if(author){
			$("#author")
				.val( author );
				// .attr({"readonly" : "readonly"});
		}
			
		var phone = $("#hidden_phone").val() || $.cookie("hidden_phone");
		if(phone){
			$("#phone")
				.val( phone );
				// .attr({"readonly" : "readonly"});
		}
	},

	bindUpload : function(){
		var self = this;
		$(".up-pic").on("click", function(){
			$("#image").trigger("click");
		});
		$("#image").on("change", function(){
			$(".up-warn")
				.addClass("up-loading")
				.text("");
			self.doUpload( $("#image") );
		});
	},

	doUpload : function( input ){
		var self = this;
        input.wrap('<form enctype="multipart/form-data"/>');
        input.parent("form").append( $("#openid") );
        input.parent("form").ajaxSubmit({
        	url : window.cfg.uploadImg,
            type : "post",
            success : function(data) {
            	input.unwrap();
            	data = eval("("+ data +")");
            	if(data.code == 200){            		
              	  	self.uploadSuccess(data);
              	  	$(".up-warn")
              	  		.removeClass("up-loading")
              	  		.text("图片上传成功！");
            	}else{
            		$(".up-warn")
              	  		.removeClass("up-loading")
            			.text("图片上传失败，请再试一次..");
            	}
                
         	}
        });
	},

	uploadSuccess : function(data){
		var self = this;
		$("#imageid").val( data.imageid );
		$(".up-pic")
			.append('<img src="'+ data.image +'">')
			.css({backgroundImage : "none"});
	},

	bindCross : function(){
		var self = this;
		$(".up-cross").on("click", function(){
			$(".up-box").remove();
		});
	},

	bindSubmit : function(){
		var self = this;
		$(".up-fake").on("click", function(){
			$(".up-confirm").trigger("click");
		});
	},

	setValidate : function(){
		var self = this;
		window.validate = window.validate || function(){
			$(".up-warn").removeClass("up-loading");
			if(!valid("imageid", "图片上传尚未完成..")) return false;
			if(!valid("author", "作者姓名")) return false;
			if(!valid("phone", "联系电话")) return false;
			return true;

			function valid(id, text){
				var value = $("#" + id).val().replace(/(^\s*)|(\s*$)/g,"");
				if(!value && id == "imageid"){
					$(".up-warn").text( text );
					return false;
				}
				if(!value){
					$(".up-warn").text( text + "不能为空" );
					return false;
				}
				if(value.length > 20 && id != "imageid"){
					$(".up-warn").text( text + "不能多于20字" );
					return false;
				}
				$(".join-warn").text("");
				return true;
			}
		};
	}
};