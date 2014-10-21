/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.2 2014/10/21
* @url https://github.com/japankun/japankun.github.io
*/

// My Code Works I Don't Know Why

// initialize plugin
BBLog.handle("add.plugin", {
	
	/* Info */
	id : "jpnkun-rspm",
	name : "RSPM BBLog Plugin",
	build : '20141021',
	
	translations : {
		"en" : {
			"jpnkunrspm.enable" : "Enable RSPM Plugin"
		}
	},
	
	init : function (instance) {
	},
	
	domchange : function(instance){
		
		if (BBLog.cache("mode") == "bf4" && instance.japankunRSPM.checkPageUrl("^/bf4/(.+?/)?soldier/.+?/stats/.+?/pc/$")) {
			if ($("#overview-skill-value").length && !$('#japankun-rspm').length) {
				instance.japankunRSPM.init(instance);
			}
		}
		
	},
	
	/**
	* japankunRSPM
	*/
	japankunRSPM : {
		
		init : function(instance){
			
			if (!$('#japankun-rspm').length) {
				
				var soldierInfoName = $(".soldier-info-name span:last").text();
				
				$(".overview-skill-bar").after('<p id="japankun-rspm" style="margin:-.1em 0 1.3em 0;font-size:medium;">loading...</p>');
				$(".overview-skill-bar").css("margin", "-.6em auto 0.4em auto");
				
				instance.japankunRSPM.requestRSPM(instance, soldierInfoName);
				
			}
			
		},
		
		requestRSPM : function (instance, soldierInfoName) {
			
			var openDataTableXML = "http://japankun.github.io/BF4/RSPM/goodgames_rspm.xml";
			var statsNowAPI      = "http://www.goodgames.jp/statsnow/bf4/api/rspm";
			var statsNowQuery    = "?soldierName=" + soldierInfoName + "&gameMode=ConquestLarge0&numRounds=25";
			var yahooPipesAPI    = "http://query.yahooapis.com/v1/public/yql?q=";
			var yahooPipesQuery  = encodeURIComponent("USE '")
				+ encodeURIComponent(openDataTableXML)
				+ encodeURIComponent("' AS remote;SELECT * FROM remote WHERE url='")
				+ encodeURIComponent(statsNowAPI)
				+ encodeURIComponent(statsNowQuery)
				+ "'&format=json&callback=?";
			
			var queryUrl = yahooPipesAPI+yahooPipesQuery;
			
			$.getJSON(queryUrl,
				
				function(data) {
					
					$("#japankun-rspm").text("");
					
					if (data.error) {
						$("#japankun-rspm").text("Connection Error!");
						return;
						
					}
					
					//KDR
					$("#japankun-rspm").append(
						'<span style="display:block;width:111px;float:left;">K/D:<span id="japankun-kdr-value">'
						+ parseFloat(data.query.results.json.kdr).toFixed(3) + '</span></span>');
						
					//RSPM
					$("#japankun-rspm").append(
						'<span style="display:block;width:111px;float:left;">RSPM:<span id="japankun-rspm-value">'
						+ Math.round(data.query.results.json.rspm) + '</span></span>');
						
					//KPM
					$("#japankun-rspm").append(
						'<span style="display:block;width:111px;float:left;">KPM:<span id="japankun-kpm-value">'
						+ parseFloat(data.query.results.json.kpm).toFixed(3) + '</span></span>');
						
					
			}).fail(function() {
    				$("#japankun-rspm").text("Error!");
			});
			
		},
		
		checkPageUrl : function (pattern) {
			
			if (document.location.pathname.match(new RegExp(pattern,'i'))) {
				return true;
			}
			
			return false;
			
		}
		
	}
	
});
