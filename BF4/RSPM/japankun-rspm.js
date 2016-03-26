/**
* @name RSPM BBLog Plugin
* @author japankun
* @version 0.5.9 2016/03/26
* @url https://github.com/japankun/japankun.github.io
*/

// My Code Works I Don't Know Why
// initialize plugin
BBLog.handle("add.plugin", {

	/* Info */
	id : "jpnkun-rspm",
	name : "RSPM BBLog Plugin",
	build : '20160326',

	configFlags: [
		["option.show-rspm-value", 0],
		["option.show-rspm-cq"   , 1],
		["option.show-rspm-tdm"  , 0],
		["option.show-rspm-rush" , 0],
		["option.show-rspm-dom"  , 0],
		["option.show-rspm-debug", 0],
		["option.show-rspm-graph", 1],
		["option.resize-weapons" , 0]
	],

	translations : {
		"en" : {
			"jpnkunrspm.enable"      : "Enable RSPM Plugin",
			"option.show-rspm-value" : "Enable RSPM Value Plugin (25Rounds)"
				+ "<br>Priority: Domination>Rush>TDM>Conquest Large",
			"option.show-rspm-cq"    : "Conquest Large",
			"option.show-rspm-tdm"   : "Team DeathMatch",
			"option.show-rspm-rush"  : "Rush",
			"option.show-rspm-dom"   : "Domination",
			"option.show-rspm-debug" : "DEBUG Mode *for development",
			"option.show-rspm-graph" : "Enable Weapons Damage Graph",
			"option.resize-weapons"  : "Enable Accessories Resize"
		}

	},

	init : function (instance) {
		console.log('%cJapanKun::%cRSPM Build ' + instance.build,
			'background-color:#000;color:#fff', 'background-color:#000;color:#99ffff');
		instance.japankunRSPM.debugMode(instance);
	},

	domchange : function (instance) {

		console.log("CALL domchange");

		if (BBLog.cache("mode") != "bf4")
			return;

		/**
		* RSPM/VALUE
		*/
		if (instance.storage("option.show-rspm-value")
		&& instance.japankunRSPM.checkPageUrl("^/bf4/(.+?/)?soldier/.+?/stats/.+?/pc/$")) {

			if ($("#overview-skill-value").length && !$('#japankun-rspm').length) {
				console.log("RUN JapankunRSPM Init");
				instance.japankunRSPM.init(instance);
			}
		}

		/**
		* WEAPON DAMAGE GRAPH
		*/
		if (instance.storage("option.show-rspm-graph")
		&& instance.japankunRSPM.checkPageUrl("^/bf4/(.+?/)?soldier/.+?/weapons/.+?/.*")) {

			if (!$('#japankun-weapondamage').length && $('.track-weapon-stats .firemode-icon').length) {
				console.log("RUN Japankun WEAPON DAMAGE Init");
				$(".track-weapon-stats:first").after('<div class="clearfix image-container">'
					+ '<img id="japankun-weapondamage"></div>');

			} else if ($('.track-weapon-stats .firemode-icon').length) {
				instance.japankunRSPM.damageGraph($('.box-content h4').text());
			}

		}

		/**
		* Weapon Accessories Resize
		*/
		if (instance.storage("option.resize-weapons")
		&& instance.japankunRSPM.checkPageUrl("^/bf4/(.+?/)?soldier/.+?/weapons?(unlocks)?/.+?/.*")) {

			// Weapon Fancy Image
			if ($("img.weapon_unlock")) {
				$("img.weapon_unlock").width('192');
				$("img.weapon_unlock").height('192');
				$(".stat-details .image-container .squarelarge").css("margin", "-20% auto");
			}

			// Attachment Area
			if ($("ul.weapon-accessories")) {
				$("ul.weapon-accessories > li").width('63');
				$("ul.weapon-accessories > li:nth-child(4n+1)").css("margin-left", "1px");
				$("ul.weapon-accessories > li:nth-child(5n+1)").css("margin-left", "0");
				$("ul.weapon-accessories > li:nth-child(5n+1)").css("width", "64");

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

		init : function (instance) {

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

				function (data) {

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

				function (data) {

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

		damageGraph : function (weaponName) {

			var weaponDamage = {

				//AR
				"AEK-971"  : "24.5_18_12.5_60",
				"AK-12"    : "24.5_18_12.5_60",
				"AN-94"    : "24.5_18_12.5_60",
				"AR160"    : "24.5_18_12.5_60",
				"BULLDOG"  : "33_21.6_8_60",
				"CZ-805"   : "24.5_18_12.5_60",
				"F2000"    : "24.5_18_12.5_60",
				"FAMAS"    : "24.5_18_12.5_60",
				"ACE 23"   : "24.5_18_12.5_60",
				"L85A2"    : "24.5_18_12.5_60",
				"M16A4"    : "24.5_18_12.5_60",
				"M416"     : "24.5_18_12.5_60",
				"QBZ-95-1" : "24.5_18_12.5_60",
				"SAR-21"   : "24.5_18_12.5_60",
				"SCAR-H"   : "33_21.6_8_60",
				"AUG A3"   : "24.5_18_12.5_60",

				//CARBINE
				"A-91"       : "24_15.4_8_50",
				"ACW-R"      : "24_15.4_8_50",
				"AK 5C"      : "24_15.4_8_50",
				"AKU-12"     : "24_15.4_8_50",
				"G36C"       : "24_15.4_8_50",
				"ACE 21 CQB" : "24_15.4_8_50",
				"ACE 52 CQB" : "33_18_8_50",
				"GROZA-1"    : "30_16.7_8_52.5",
				"M4"         : "24_15.4_8_50",
				"MTAR-21"    : "24_15.4_8_50",
				"SG553"      : "24_15.4_8_50",
				"TYPE-95B-1" : "24_15.4_8_50",

				//LMG
				"AWS"          : "24.5_18_8_65",
				"L86A2"        : "24.5_18_8_65",
				"LSAT"         : "24.5_18_8_65",
				"M240B"        : "33_21.6_8_65",
				"M249"         : "24.5_18_8_65",
				"M60-E4"       : "33_21.6_8_65",
				"MG4"          : "24.5_18_8_65",
				"PKP PECHENEG" : "33_21.6_8_65",
				"QBB-95-1"     : "24.5_18_8_65",
				"RPK"          : "30_20_8_65",
				"RPK-12"       : "24.5_18_8_65",
				"TYPE 88 LMG"  : "24.5_18_8_65",
				"U-100 MK5"    : "24.5_18_8_65",

				//PDW
				"AS VAL"  : "27_15.4_5_43.67",
				"CBJ-MS"  : "22.5_14.3_20_47.34",
				"GROZA-4" : "27_15.4_5_43.67",
				"JS2"     : "22.5_13.5_20_50",
				"PDW-R"   : "24_15.4_8_50",
				"MP7"     : "20_12.5_15_47.5",
				"MPX"     : "24.5_13.5_13.34_50",
				"MX4"     : "22.5_13.5_20_50",
				"P90"     : "21_12.5_10.67_47.5",
				"PP-2000" : "22.5_13.5_20_50",
				"CZ-3A1"  : "22.5_13.5_20_50",
				"SR-2"    : "23.5_13.5_16.67_50",
				"UMP-45"  : "30_15.4_8_50",
				"UMP-9"   : "22.5_13.5_20_50",

				//DMR
				"ACE 53 SV"  : "45_38_15_80",
				"M39 EMR"    : "45_38_15_80",
				"MK11 MOD 0" : "45_38_15_80",
				"QBU-88"     : "43_34_8_65",
				"RFB"        : "45_38_15_80",
				"SCAR-H SV"  : "45_38_15_80",
				"SKS"        : "43_34_8_60",
				"SVD-12"     : "45_38_15_60",

				//SR
				"AMR-2"       : "110_110_0_0",
				"AMR-2 CQB"   : "110_110_0_0",
				"AMR-2 MID"   : "110_110_0_0",
				"CS-LR4"      : "100_59_12.5_100",
				"CS5"         : "100_59_12.5_100",
				"FY-JS"       : "100_36.6_12.5_147.8",
				"GOL Magnum"  : "100_59_12.5_150",
				"JNG-90"      : "100_59_12.5_100",
				"L115"        : "100_59_12.5_150",
				"SRR-61"      : "100_59_12.5_150",
				"M40A5"       : "100_59_12.5_100",
				"M82A3"       : "110_110_0_0",
				"M82A3 CQB"   : "110_110_0_0",
				"M82A3 MID"   : "110_110_0_0",
				"M98B"        : "100_59_12.5_150",
				"RORSCH MK-1" : "110_110_100_200",
				"SCOUT ELITE" : "100_36.6_12.5_110",
				"SR338"       : "50_38_15_150",
				"338-RECON"   : "100_59_12.5_150",
				"SV-98"       : "100_59_12.5_100",

				//HG
				".44 MAGNUM" : "56_37.5_12.5_50",
				"93R"        : "22_12.1_8_55",
				"COMPACT 45" : "36.6_15.4_8_40",
				"CZ-75"      : "30_15.4_12.5_55",
				"DEAGLE 44"  : "56_28_12.5_50",
				"FN57"       : "22_13.5_8_60",
				"G18"        : "22_12.1_8_55",
				"M1911"      : "36.6_15.4_8_40",
				"M412 REX"   : "56_28_15_37",
				"M9"         : "27_12.1_10_55",
				"MARE'S LEG" : "56_37.5_15_45",
				"MP443"      : "27_12.1_10_55",
				"P226"       : "27_12.1_10_55",
				"QSZ-92"     : "22_13.5_8_60",
				"SW40"       : "56_28_15_37",
				"UNICA 6"    : "56_28_15_37",

				//SG (NO DATA)
				"UTS 15"       : "",
				"USAS-12 FLIR" : "",
				"USAS-12"      : "",
				"SPAS-12"      : "",
				"SAIGA 12K"    : "",
				"QBS-09"       : "",
				"HAWK 12G"     : "",
				"DBV-12"       : "",
				"DAO-12"       : "",
				"870 MCS"      : "",
				"SHORTY 12G"   : "",

				//PHANTOM
				"PHANTOM"      : "",

				//PICKUP
				"M60 ULT"      : "41_23.6_8_65",

				//DMG DATA
				"LAST UPDATE"  : "20151124",
				"BANPEIKUN"    : ""

			};

			console.log('fetch:'+weaponName);
			//console.log(weaponDamage[weaponName]);

			var weaponGraph = weaponDamage[weaponName];

			if (weaponGraph.length) {

				var dmg = weaponGraph.split('_');

				// graph
				$('#japankun-weapondamage').attr('src',
					'http://symthic.com/goods/i/bf4/dom/'+weaponGraph+'.png');

				// tooltip
				$('#japankun-weapondamage').attr('data-tooltip',
					'Max dmg: '+dmg[0]+'<br>'+
					'Min dmg: '+dmg[1]+'<br>'+
					'Drop-off start: '+dmg[2]+'m<br>'+
					'Drop-off end: '+dmg[3]+'m'
				);

				console.log('return:'+dmg);

			}

			return weaponGraph;

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
