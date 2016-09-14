function ScheduleTab(){
	this.nav = $(".sch-nav").children("li");
	this.tab = $(".sch-tab").children("li");
	this.bind();
}

ScheduleTab.prototype = {

	bind : function(){
		var self = this;
		self.nav.on("click", function(e){
			var nav = $( e.currentTarget );
			if( nav.hasClass("checked") ) return;
			var checkedNav = nav.siblings(".checked"),
				checkedTab = self.tab.filter(".checked"),
				tab = $( self.tab[ nav.index() ] );
			nav.addClass("checked");
			tab.addClass("checked");
			checkedNav.removeClass("checked");
			checkedTab.removeClass("checked");
		});
	}
};