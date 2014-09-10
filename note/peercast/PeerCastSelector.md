###PeerCastSelector

 - 「TYPE」によってリレーするPeerCastを替えたいときに使う
 - ただのバッチファイル
 
###ダウンロード

[PeerCastSelector.bat](https://raw.githubusercontent.com/japankun/japankun.github.io/master/note/peercast/PeerCastSelector.bat)

###使い方

 1. pcyLiteの設定＞その他のタブを開く
 2. プレイヤー設定の追加ボタンを押す
 3. 拡張子に切り替えたいTYPE(例：FLV)を設定する
 4. ファイル名にPeerCastSelector.batのパス(例：D:\PeerCast\PeerCastSelector.bat)を設定する
 5. 引数に「"&lt;stream/>" "&lt;channelname/>" "&lt;direct/>" "&lt;type/>" "再生したいプレイヤー"」を設定する
 6. PeerCastSelector.batをメモ帳などで開く
 7. PeerCastStationのポートとPeerCastのポートを必要があれば書き換える(初期値PC:7144、PCS:7146)
 8. いつものようにpcypLiteから再生するとTYPEによって接続先が変わる
