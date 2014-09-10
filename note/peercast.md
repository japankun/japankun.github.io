##PeerCastStationとPeerCastをpcypLiteで併用する方法

 1. PeerCastを7144ポート、PeerCastStationを7146ポートで動作させます
 2. pcypのYP設定項目Typeを「wmv|raw|flv|webm|mkv」に変更します
 3. pcyp設定のその他タブを開きます
 4. プレイヤー設定から追加ボタンを押します
 5. 拡張子に「FLV」、ファイル名にpcfpを参照するように設定します
 6. 引数を「"http://{PeerCastStationの動作しているIP}:7146/pls/&lt;id/&gt;" "<channelname/>" "<direct/>"」に書き換えます
 7. 通常通りチャンネルを再生するとFLV配信はPeerCastStationへ、WMVはPeerCastに接続するように変わります
