/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.4.1 2015/01/17
* @url https://github.com/japankun/japankun.github.io
*/

// My Code Works I Don't Know Why

// initialize plugin
BBLog.handle("add.plugin", {
	
	/* Info */
	id : "jpnkun-rspm",
	name : "RSPM BBLog Plugin",
	build : '20150117',
	
	configFlags: [
		["option.show-rspm-value", 1],
		["option.show-rspm-cq"   , 1],
		["option.show-rspm-tdm"  , 0],
		["option.show-rspm-rush" , 0],
		["option.show-rspm-dom"  , 0],
		["option.show-rspm-debug"  , 0]
	],
	
	translations : {
		"en" : {
			"jpnkunrspm.enable"      : "Enable RSPM Plugin",
			"option.show-rspm-value" : "Show RSPM Value (25Rounds)"+
				"<br>Priority: Domination>Rush>TDM>Conquest Large",
			"option.show-rspm-cq"    : "Conquest Large",
			"option.show-rspm-tdm"   : "Team DeathMatch",
			"option.show-rspm-rush"  : "Rush",
			"option.show-rspm-dom"   : "Domination",
			"option.show-rspm-debug" : "DEBUG Mode *for development"
		}
	},
	
	init : function (instance) {
		instance.japankunRSPM.debugMode(instance);
	},
	
	domchange : function(instance){
		
		if (!instance.storage("option.show-rspm-value")) {
			return;
		}
		
		if (BBLog.cache("mode") == "bf4"
		&& instance.japankunRSPM.checkPageUrl("^/bf4/(.+?/)?soldier/.+?/stats/.+?/pc/$")) {
			
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
			
			var gameMode;
			
			if (instance.storage("option.show-rspm-dom")) {
				gameMode = "Domination0";
			} else if (instance.storage("option.show-rspm-rush")) {
				gameMode = "RushLarge0";
			} else if (instance.storage("option.show-rspm-tdm")) {
				gameMode = "TeamDeathMatch0";
			} else {
				gameMode = "ConquestLarge0";
			}
			
			
			/*
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
			*/
			
			var openShiftAPI = "http://github-japankun.rhcloud.com/rspm/rspm.php"
				+"?gameMode="+gameMode+"&soldierInfoName=";
			var queryUrl     = openShiftAPI + soldierInfoName + "&callback=?";
			
			$.getJSON(queryUrl,
				
				function(data) {
					
					$("#japankun-rspm").text("");
					
					if (data.error || data.results === null) {
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
			
		},
		
		/**
		* DEBUG Mode
		*/
		debugMode : function (instance) {
		
			var curDate = new Date();
			var m = curDate.getMonth()+1;
			var d = curDate.getDate();
			
			if ((m == 4 && d == 1) || instance.storage("option.show-rspm-debug")) {
				
				$("#community-bar > div > div > div.game-logo > a").css('background-image',
					"url(https://camo.githubusercontent.com/60f7b0b470c1709cae96e0a60866780625a6b3ed/687474703a2f2f692e696d6775722e636f6d2f39664563646a442e706e67)");
					
				$("#top-tiles > div.span4.topstory > a").css('background-image',
					"url(https://camo.githubusercontent.com/bd9262f2593c78aa5388182ffe97680c3758a7e2/687474703a2f2f692e7974696d672e636f6d2f76692f684b793054515f325966632f6d617872657364656661756c742e6a7067)");
					
				$("#top-tiles > div.span4.topstory > a > h1").text("new DLC available now");
				
			}
			
		}
		
	}
	
});
