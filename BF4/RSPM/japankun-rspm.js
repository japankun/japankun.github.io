/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.5.3 2015/03/16
* @url https://github.com/japankun/japankun.github.io
*/

// My Code Works I Don't Know Why

// initialize plugin
BBLog.handle("add.plugin", {

	/* Info */
	id : "jpnkun-rspm",
	name : "RSPM BBLog Plugin",
	build : '20150316',

	configFlags: [
		["option.show-rspm-value", 1],
		["option.show-rspm-cq"   , 1],
		["option.show-rspm-tdm"  , 0],
		["option.show-rspm-rush" , 0],
		["option.show-rspm-dom"  , 0],
		["option.show-rspm-debug", 0]
	],

	translations : {
		"en" : {
			"jpnkunrspm.enable"      : "Enable RSPM Plugin",
			"option.show-rspm-value" : "Show RSPM Value (25Rounds)"
				+ "<br>Priority: Domination>Rush>TDM>Conquest Large",
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
				console.log("RUN JapankunRSPM Init");
				instance.japankunRSPM.init(instance);
			}
		}

	},

	/**
	* japankunRSPM
	*/
	japankunRSPM : {

		statsValue : {
			deaths     : 0,
			kills      : 0,
			timePlayed : 0,
			rspm       : 0,
			rspmkdr    : 0.01,
			rspmkpm    : 0.01,
			kdr        : 0.01,
			kpm        : 0.01,
			dpm        : 0.01,
			value      : 0
		},

		init : function(instance) {

			if (!$('#japankun-rspm').length) {

				// Original SPM Column
				$("#overview-skill-value").css("margin-top", "0");

				// JapanKun Plugin Column
				$(".overview-skill-bar").after('<p id="japankun-rspm"></p>');
				$(".overview-skill-bar").css("margin", "-.6em auto .4em auto");

				// JapanKun Plugin Column CSS
				$("#japankun-rspm").css("margin", "-.1em 0 1.3em 0");
				$("#japankun-rspm").css("font-size", "medium");
				$("#japankun-rspm").html('<span class="loader small"></span>LOADING...');

				var soldierInfoName = $(".soldier-info-name span:last").text();

				instance.japankunRSPM.requestWRSWStats(instance);
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

			var openShiftAPI = "http://github-japankun.rhcloud.com/rspm/rspm.php"
				+ "?gameMode=" + gameMode + "&soldierInfoName=";
			var queryUrl     = openShiftAPI + soldierInfoName + "&callback=?";

			$.getJSON(queryUrl,

				function(data) {

					$("#japankun-rspm").text("");

					if (data.error || data.results === null) {
						$("#japankun-rspm").text("Connection Error!");
						return;

					}

					var json = data.query.results.json;

					// RSPM KDR
					instance.japankunRSPM.statsValue.rspmkdr
						= parseFloat(json.kdr).toFixed(3);

					// RSPM
					instance.japankunRSPM.statsValue.rspm
						= Math.round(json.rspm);

					// RSPM KPM
					instance.japankunRSPM.statsValue.rspmkpm
						= parseFloat(json.kpm).toFixed(3);

					instance.japankunRSPM.renderHTML(instance);

			}).fail(function() {
				$("#japankun-rspm").text("Connection Error!");
			});

		},

		requestWRSWStats : function (instance) {

			var personaId = location.href.match(/^.*\/stats\/(\d+)\/pc\/$/);
			var WRSWAPI = "http://battlelog.battlefield.com/bf4/warsawoverviewpopulate/"
				+ personaId[1] + "/1/";

			$.getJSON(WRSWAPI,

				function(data) {

					var ovStats = data.data.overviewStats;

					instance.japankunRSPM.statsValue.deaths = ovStats.deaths;
					instance.japankunRSPM.statsValue.kills  = ovStats.kills;
					instance.japankunRSPM.statsValue.timePlayed = ovStats.timePlayed;

					// KDR
					instance.japankunRSPM.statsValue.kdr
						= parseFloat((ovStats.kills/ovStats.deaths)).toFixed(2);

					// KPM
					instance.japankunRSPM.statsValue.kpm
						= parseFloat((ovStats.kills/(ovStats.timePlayed/60))).toFixed(2);

					// DPM (Death/Min)
					instance.japankunRSPM.statsValue.dpm
						= parseFloat((ovStats.deaths/(ovStats.timePlayed/60))).toFixed(2);

					instance.japankunRSPM.renderHTML(instance);

			}).fail(function() {
				$("#japankun-rspm-value").after('<br>'+"StatusEngine Error!");
			});

		},

		renderHTML : function (instance) {

			var statsValue = instance.japankunRSPM.statsValue;

			// data check
			if (!statsValue.rspm || !statsValue.kpm)
				return;

			$("#japankun-rspm").html("");
			var blockCss = "display:block;width:111px;float:left;";

			// RSPMKDR
			$("#japankun-rspm").append(
				'<span style="'+blockCss+'margin-top:.3em;">'
				+ 'K/D:<span id="japankun-kdr-value">'+statsValue.rspmkdr+'</span></span>');

			// RSPM / VALUE
			$("#japankun-rspm").append(
				'<span style="'+blockCss+'font-size:small;">'
				+ 'RSPM:<span id="japankun-rspm-value">'+statsValue.rspm+'</span><br>'
				+ 'VALUE:<span id="japankun-rspm-value-value">'
				+ Math.round((statsValue.rspm*2 + statsValue.kdr*350 +
					statsValue.kpm*1170 - statsValue.dpm*900) / 3)
				+ '</span>');

			// RSPMKPM
			$("#japankun-rspm").append(
				'<span style="'+blockCss+'margin-top:.3em;">'
				+ 'KPM:<span id="japankun-kpm-value">'+statsValue.rspmkpm+'</span></span>');

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

			if (instance.storage("option.show-rspm-debug")) {

				$("#community-bar > div > div > div.game-logo > a").css('background-image',
					"url(https://camo.githubusercontent.com/5d2fcb99804e264c038df764c7e7398da4a4fb76/68747470733a2f2f7363656a6170616e6b756e2e66696c65732e776f726470726573732e636f6d2f323031352f30332f6266347061796c696e65312e706e67)");

				$("#top-tiles > div.span4.topstory > a").css('background-image',
					"url(https://camo.githubusercontent.com/bd9262f2593c78aa5388182ffe97680c3758a7e2/687474703a2f2f692e7974696d672e636f6d2f76692f684b793054515f325966632f6d617872657364656661756c742e6a7067)");

				$("#top-tiles > div.span4.topstory > a > h1").text("new DLC available now");

			}

		}

	}

});
