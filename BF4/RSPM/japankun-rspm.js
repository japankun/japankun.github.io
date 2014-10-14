/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.1 2014/10/14
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
				
				var soldierInfoName = $(".soldier-info-name").text().replace(/\s+/g, "");
				
				$("#overview-skill-value").append('<p id="japankun-rspm" style="margin:-.1em 0 -.4em 0;font-size:medium;">RSPM:<span id="japankun-rspm-value">loading...</span></p>');
				$("#japankun-rspm-value").text(instance.japankunRSPM.requestRSPM(instance, soldierInfoName));
			}
			
		},
		
		requestRSPM : function (instance, soldierInfoName) {
			
			var queryUrl = ("https://query.yahooapis.com/v1/public/yql?q=USE%20\'https%3A%2F%2Fraw.githubusercontent.com%2Fjapankun%2Fjapankun.github.io%2Fmaster%2FBF4%2FRSPM%2Fgoodgames_rspm.xml\'%20AS%20remote%3BSELECT%20*%20FROM%20remote%20WHERE%20url%3D\'http%3A%2F%2Fwww.goodgames.jp%2Fstatsnow%2Fbf4%2Fapi%2Frspm%3FsoldierName%3D"+soldierInfoName+"%26gameMode%3DConquestLarge0%26numRounds%3D25\'&format=json&callback=?");

			$.getJSON(queryUrl,
				
				function(data) {
					$("#japankun-rspm-value").text(Math.round(data.query.results.json.rspm));
			}).fail(function() {
    					$("#japankun-rspm-value").text("Error!");
			);
			
		},
		
		checkPageUrl : function (pattern) {
			
			if (document.location.pathname.match(new RegExp(pattern,'i'))) {
				return true;
			}
			
			return false;
			
		}
		
	}
	
});