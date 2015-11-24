###JのSSD節約術

バトルフィールド4がリリースされて早2年。現在、すべてのDLCをダウンロードしている中毒者の方々は、約62GBものストレージを~~無駄に~~消費していると思います。先日もしょうもないDLCと、神DLCがリリースされましたね。

そこでみなさん、SSD足りてますか？
実は簡単な方法でSSDの容量を節約することができるんです。

やり方は簡単。Windowsの機能「シンボリックリンク」とDLCが入るだけのHDDを用意するだけです。ただし、実践前に機能を理解しておきましょう。

#####シンボリックリンクとは？

![よくわかる図解](https://scejapankun.files.wordpress.com/2015/11/ssdspacesavingtips-a.png)

そもそもシンボリックリンクとは何でしょう？たとえば「Aというファイル」とは**別のフォルダ**にある「Bというファイル」を**Aと同じフォルダにあるようにしたい場合**、BというファイルをAと同じフォルダへ移動させると思います。

しかしどうでしょう、Bというファイルが1TBあり、Aというファイルが入るディスクは500GBしかない場合、ファイルを移動するという手段は使えません。

そこで登場するのがシンボリックリンク機能です。実体は別のディスクにあっても、同じフォルダにあるように見せかけることができるのです。リンクを張るという意味ではショートカットとよく似ていますが、機能は全く異なります。

#####シンボリックリンクを使ってSSDを節約しよう。

バトルフィールド4のフォルダ構成は以下の通りです。以下は例のため一部異なることがあります。
```
C:\Program Files (x86)\Origin Games\Battlefield 4
├__Installer/
├Core/
├Data/
├pb/
├pbsetup/
├Support/
└Update/
  ├Patch/
  ├Xpack0/
  ├Xpack1/
  ├Xpack2/
  ├Xpack3/
  ├Xpack4/
  ├Xpack5/
  ├Xpack6/
...
```

これらのうちハードディスクに移すことのできるフォルダはXpack0～6です。たったこれだけか、と思いのそこのあなた。これらが占めるファイルサイズを考えたことはありますか？

|拡張パック|(GB)|
|:---|---:|
|(Xpack1) China Rising|4.43|
|(Xpack0) Second Assault|5.33|
|(Xpack2) Naval Strike|4.96|
|(Xpack3) Dragon's Theeth|7.22|
|(Xpack4) Final Stand|7.09|
|(Xpack5) Night Operations|0.96|
|(Xpack6) Community Operations|2.83|
|**合計**|**32.82**|

Xpack0～Xpack6までを合計すると約33GBにもなり、現在のバトルフィールド4のおよそ半分のSSD容量を節約できることになります。すごい！

では本題です。
シンボリックリンクを張るにはまず、Xpack0～6を他のハードディスクに移す必要があります。例では以下の環境で進めていきます。

#####インストールフォルダ
```
C:\Program Files (x86)\Origin Games\Battlefield 4\
```

#####移動先フォルダ
```
D:\Program Files\BF4-Xpack\
```
※今回は移動先フォルダが深くなると厄介なので略しました。
また、移動先フォルダのみ予め作成しておいてください。

####実際の作業

以下のフォルダをすべて移動先フォルダに移動させます。
```
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack0
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack1
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack2
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack3
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack4
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack5
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack6
```

どうでしょうか？移動先フォルダの構成はこうなったと思います。
```
D:\Program Files\BF4-Xpack\
├Xpack0\
├Xpack1\
├Xpack2\
├Xpack3\
├Xpack4\
├Xpack5\
├Xpack6\
```

最後に管理者権限でコマンドプロンプトを開いて以下のコマンドを入力します。
移動先やインストールフォルダが違う場合は、ダブルクオーテーションで囲うことを忘れないようにしましょう。
```
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack0" "D:\Program Files\BF4-Xpack\Xpack0"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack1" "D:\Program Files\BF4-Xpack\Xpack1"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack2" "D:\Program Files\BF4-Xpack\Xpack2"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack3" "D:\Program Files\BF4-Xpack\Xpack3"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack4" "D:\Program Files\BF4-Xpack\Xpack4"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack5" "D:\Program Files\BF4-Xpack\Xpack5"
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack6" "D:\Program Files\BF4-Xpack\Xpack6"
```

正常に完了していれば以下のような返答がコマンド一回ごとに返ってきます。
```
C:\Program Files (x86)\Origin Games\Battlefield 4\Update\Xpack0
<<===>> D:\Program Files\BF4-Xpack\Xpack0 のシンボリックリンクが作成されました
```

一旦、インストールフォルダに戻りましょう。
インストールフォルダにあったXpack0～6に矢印のマークがついたフォルダができていますか？

以上でファイルの移動自体は完了ですが、最後にひとつだけやることがあります。
それは、オリジンバトルフィールド4を選び右クリック、ゲームの修復を行ってください。
これを行わないとゲームが起動しないことがごく稀にあります。

####お疲れ様でした！
作業は以上で終了です。どうですか？SSDはきれいさっぱり空きました？
これでまででわからないことがあれば、Yahoo!知恵袋にお願いします。
