function Recommend(){
	this.container = $("#container");
	this.html =
	'<div class="rcmd-box">'
	+'	<div class="rcmd-mist"></div>'
	+'	<div class="rcmd-wrap center">'
	+'		<form id="rcmd-form" action="'+ window.cfg.recommend +'" method="post">'
	+'			<input type="hidden" name="openid" value="'+ this.getOpenId() +'">'
	+'			<div class="rcmd-row rcmd-gender scope">'
	+'				<span class="bold">孩子性别</span>'
	+'				<input type="radio" name="sex" value="1" checked>'
	+'				<span class="rcmd-male">男</span>'
	+'				<input type="radio" name="sex" value="2">'
	+'				<span class="rcmd-female">女</span>'
	+'			</div>'
	+'			<div class="rcmd-row rcmd-age scope">'
	+'				<span class="bold">孩子年龄</span>'
	+'				<select id="age" name="age">'
	+'					<option value="" checked>请选择</option>'
	+'					<option value="1">1</option>'
	+'					<option value="2">2</option>'
	+'					<option value="3">3</option>'
	+'					<option value="4">4</option>'
	+'					<option value="5">5</option>'
	+'					<option value="6">6</option>'
	+'					<option value="7">7</option>'
	+'					<option value="8">8</option>'
	+'					<option value="9">9</option>'
	+'					<option value="10">10</option>'
	+'					<option value="11">11</option>'
	+'					<option value="12">12</option>'
	+'					<option value="13">13</option>'
	+'					<option value="14">14</option>'
	+'					<option value="15">15</option>'
	+'					<option value="16">16</option>'
	+'				<select>'
	// +'				<input type="text" name="age" id="age" value="" placeholder="请选择" readonly>'
	// +'				<div class="rcmd-updown">'
	// +'					<div class="rcmd-half" data-action="u"></div>'
	// +'					<div class="rcmd-half" data-action="d"></div>'
	// +'				</div>'
	+'			</div>'
	+'			<input type="text" class="rcmd-bookname" id="bookname" name="bookname" placeholder="你最喜爱的绘本书名">'
	+'			<textarea class="rcmd-bookdesc" id="reason" name="reason" placeholder="推荐理由或建议，或者是想对创作者说的话，让Ta看到吧～"></textarea>'
	+'			<input class="rcmd-confirm" type="submit" onclick="return validate();">'
	+'		</form>'
	+'		<div class="rcmd-warn"></div>'
	+'		<div class="rcmd-fake">提交推荐</div>'
	+'		<div class="rcmd-cross"></div>'
	+'	</div>'
	+'</div>';


	this.run();
	this.setValidate();	
}

Recommend.prototype = {

	run : function(){
		var self = this;
		self.container.append(self.html);
		self.getOpenId();
		self.bindRadio();
		// self.bindUpdown();
		self.bindCross();
		self.bindSubmit();
	},

	getOpenId : function(){
		return $.fn.cookie("visitor_openid") || $("#visitor_openid").val();
	},

	bindRadio : function(){
		var self = this;
		$(".rcmd-gender").children("span").on("click", function(e){
			var span = $(e.currentTarget);
			if( span.hasClass("bold") ) return;
			var inputs = $(".rcmd-gender").children("input");
			if( span.hasClass("rcmd-male") ){
				var input = $( inputs[0] );
			}
			if( span.hasClass("rcmd-female") ){
				var input = $( inputs[1] );
			}
			input.trigger("click");
		});
	},

	bindUpdown : function(){
		var self = this;
		$(".rcmd-half").on("click", function(e){
			var action = $( e.currentTarget ).attr( "data-action" ),
				input = $( "#age" );
			if( action == "u" ) self.addAge( input );
			if( action == "d" ) self.mnsAge( input );
		});
	},

	addAge : function( input ){
		var self = this,
			value = input.val();
		if(value == "16") return;

		if( !value ){
			input.val( 1 );	
		}else{
			input.val( parseInt( value ) + 1 );
		}
	},

	mnsAge : function( input ){
		var self = this,
			value = input.val();
		if(value == "1") return;

		if( !value ){
			input.val( 1 );
		}else{
			input.val( parseInt( value ) - 1 );
		}
	},

	bindCross : function(){
		var self = this;
		$(".rcmd-cross").on("click", function(){
			$(".rcmd-box").remove();
		});
	},

	bindSubmit : function(){
		var self = this;
		$(".rcmd-fake").on("click", function(){
			$(".rcmd-confirm").trigger("click");
		});
	},

	setValidate : function(){
		var self = this;
		window.validate = window.validate || function(){
			if(!valid("age", "请选择孩子的年龄")) return false;
			if(!valid("bookname", "书名")) return false;
			if(!valid("reason", "推荐理由")) return false;
			return true;

			function valid(id, text){
				var value = $("#" + id).val().replace(/(^\s*)|(\s*$)/g,"");
				if(!value && id == "age"){
					$(".rcmd-warn").text( text );
					return false;
				}
				if(!value){
					$(".rcmd-warn").text( text + "不能为空" );
					return false;
				}
				if(value.length > 20 && id == "bookname"){
					$(".rcmd-warn").text( text + "不能多于20字" );
					return false;
				}
				if(value.length > 100 && id == "reason"){
					$(".rcmd-warn").text( text + "不能多于100字" );
					return false;
				}
				$(".rcmd-warn").text("");
				$("#" + id).val( value );
				return true;
			}
		};
	}
};