function Pie(){
	this.container = $("#container");
	this.box = $("#pie-box");
	this.name = this.getName();
	this.opt = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data : this.name
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            restore : {show: true}
	        }
	    },
	    calculable : true,
	    series : [
	        {
	            name:'绘本书名',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            itemStyle : {
	                normal : {
	                    label : {
	                        show : false
	                    },
	                    labelLine : {
	                        show : false
	                    }
	                }
            	},
	            data : window.data
	        }
	    ]
	};

	this.run();
}

Pie.prototype = {

	run : function(){
		var self = this;
		self.box.css({height : self.box.width()});
		echarts.init(document.getElementById('pie-box')).setOption(self.opt)
	},

	getName : function(){
		var self = this,
			len = window.data.length,
			name = [];
		for(var i = 0; i < len; i++){
			name.push( window.data[i].name );
		}
		return name;
	}
};