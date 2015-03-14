RSPM BBLog Plugin
==================

##これは何？
BF4バトルログ(進行過程ページ)にgoodgamesさんのRSPMとVALUEを表示させるBetter Battlelogプラグインです。

![RSPM-Plugin-Image](https://scejapankun.files.wordpress.com/2015/03/rspm-and-value.png)

- 初期設定ではコンクエストラージ25ラウンド表示です。
- TDM/Domination/Rushの表示をしたい場合はベターバトルログのメニュー下部で設定してください。
- オプションで設定されたRSPMは下記の優先度を使用して表示します。
- Domination>Rush>TDM>Conquest Large

使用するにはBetter BattlelogメニューのPluginsから下のURLを追加してやってください。
http://japankun.github.io/BF4/RSPM/japankun-rspm.js

####VALUEの計算式
```math
VALUE＝(RSPM*2 + KDR*350 + KPM*1170 - DPM*900) / 3
```

####動作確認
- Better Battlelog 4.5.0- (4.6.1確認済み)
- Chrome 38.0.2125.104以上
- Firefox 33.0以上

####利用サービスなど
- [Real SPM calculator "StatsNow!!"](http://www.goodgames.jp/statsnow/bf4/)
- [Better Battlelog](http://getbblog.com/en/)

####以前利用していたサービスなど
- [Yahoo Query Language](https://developer.yahoo.com/yql/)
