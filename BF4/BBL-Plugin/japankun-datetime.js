/**
* @name DATETIME BBLog Plugin
* @author japankun
* @version 0.1 2014/12/18
* @url https://github.com/japankun/japankun.github.io
*/

// My Code Works I Don't Know Why

// initialize plugin
BBLog.handle("add.plugin", {
	
	/* Info */
	id : "jpnkun-datetime",
	name : "DATETIME BBLog Plugin",
	build : '20141218',
	
	translations : {
		"en" : {
			"jpnkun-datetime.enable" : "Enable DATETIME Plugin"
		}
	},
	
	init : function (instance) {
	},
	
	domchange : function(instance){
		
		if (BBLog.cache("mode") == "bf4" && instance.japankunDATETIME.checkPageUrl("^/bf4/(.+?/)?battlereport/show/.+?/.+?/(.+?/)?$")) {
			if ($("#battlereport-metadata").length) {
				instance.japankunDATETIME.init(instance);
			}
		}
		
	},
	
	/**
	* japankunDATETIME
	*/
	japankunDATETIME : {
		
		init : function(instance){
			
			if (!$('#japankun-datetime').length) {
				
				var unixTime = $(".battlereport-metadata-inner .base-ago").attr("data-timestamp");
				var date = new Date(unixTime*1000);
				
				
				$(".battlereport-metadata-inner .base-ago").before('<span id="japankun-datetime">'+
					date.getFullYear()+"/"+(date.getMonth()+1)+"/"+
					date.getDate()+" "+date.toLocaleTimeString()+'</span> - ');
				
			}
			
		},
		
		checkPageUrl : function (pattern) {
			
			if (document.location.pathname.match(new RegExp(pattern,'i'))) {
				return true;
			}
			
			return false;
			
		}
		
	}
	
});
