/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.1 2014/10/15
* @url https://github.com/japankun/japankun.github.io
*/

// initialize plugin
BBLog.handle("add.plugin", {
	/* Info */
	id : "jpnkun-rspm",
	name : "RSPM BBLog Plugin",
	build : '20141014',
	
	translations : {
		"en" : {
			"jpnkunrspm.enable" : "Enable RSPM Plugin"
		}
	},
	
	init : function (instance) {
	},
	
	domchange : function(instance){
		
		if (BBLog.cache("mode") == "bf4" && instance.japankunRSPM.checkPageUrl("^/bf4/.+?/soldier/.+?/stats/.+?/pc/$")) {
			if ($("#overview-skill-value").length && !$('#japankun-rspm').length) {
				instance.japankunRSPM.init(instance);
			}
		}
		
	},
	
	/**
	* japankunRSPM
	*/
	japankunRSPM : {
		
		//
		init : function(instance){
			
			if (!$('#japankun-rspm').length) {
				
				var soldierInfoName = $(".soldier-info-name span:last").text().replace(/\s+/g, "");
				
				$(".overview-skill-bar").after('<p id="japankun-rspm" style="margin:-.1em 0 1.3em 0;font-size:medium;">loading...</p>');
				$(".overview-skill-bar").css("margin", "-.6em auto 0.4em auto");
				instance.japankunRSPM.requestRSPM(instance, soldierInfoName);
				
			}
			
		},
		
		requestRSPM : function (instance, soldierInfoName) {
			
			var queryUrl = ("https://query.yahooapis.com/v1/public/yql?q=USE%20\'https%3A%2F%2Fraw.githubusercontent.com%2Fjapankun%2Fjapankun.github.io%2Fmaster%2FBF4%2FRSPM%2Fgoodgames_rspm.xml\'%20AS%20remote%3BSELECT%20*%20FROM%20remote%20WHERE%20url%3D\'http%3A%2F%2Fwww.goodgames.jp%2Fstatsnow%2Fbf4%2Fapi%2Frspm%3FsoldierName%3D"+soldierInfoName+"%26gameMode%3DConquestLarge0%26numRounds%3D25\'&format=json&callback=?");

			$.getJSON(queryUrl,
				
				function(data) {
					$("#japankun-rspm").text("");
					
					// KDR
					$("#japankun-rspm").append('<span style="display:block;width:111px;float:left;">K/D:<span id="japankun-rspm-value">' +
						parseFloat(data.query.results.json.kdr).toFixed(3) + '</span></span>');
					//RSPM
					$("#japankun-rspm").append('<span style="display:block;width:111px;float:left;">RSPM:<span id="japankun-kdr-value">' +
						Math.round(data.query.results.json.rspm) + '</span></span>');
					//KPM
					$("#japankun-rspm").append('<span style="display:block;width:111px;float:left;">KPM:<span id="japankun-kpm-value">' +
						parseFloat(data.query.results.json.kpm).toFixed(3) + '</span></span>');
					
			}).fail(function() {
    				$("#japankun-rspm-value").text("Error!");
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
