### 今更？Battlefield V 発売記念！Battlefield 1 のSSD節約術！

![drill](PAK87_HDDDRILL220141221152630_TP_V.jpg)

EAの粋な計らいによりBattlefield 1(以下BF1)のシーズンパスであるPremium Passを無料で入手した方も多いのではないでしょうか。またセールにつられ購入し涙された方、その他の事情で涙し続けた方もいるかもしれません。定期的に追加されたDLCはゲームフォルダを肥大させ続けました。現在、BF1は全DLCをフルインストールすると約81GBの保存容量を占めるまでに至っています。

今回はこのうちマルチプレイヤーのロードに影響が出ないようにSSDからHDDへファイルを移すテクニックをご紹介します。この方法を使用すると、約49.2GBをHDDに移動することができます。

### TL;DR
SSDからHDDにファイル移してSSDを節約します。

### はじめる前に
1. Battlefield 1を最新版にアップデートしましょう。
2. 50GB以上の空きがあるHDDを用意しましょう。

### 参考環境と例で使用する用語
インストールフォルダ(**SSD**)とは以下を指します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1
```
移動先(**HDD**)とは以下を指します。
```
D:\Origin Games\Battlefield 1
```

### Dataフォルダ編をはじめる

#### 手順1
まずは(**HDD**)に`Data`フォルダを作成します。
```
D:\Origin Games\Battlefield 1
└ Data/ (←作る)
```

#### 手順2
Dataフォルダの中にさらに`installation`フォルダを作成します。
```
D:\Origin Games\Battlefield 1
└ Data/
  └ installation/ (←作る)
```

#### 手順3
(**SSD**)のインストールフォルダ内の以下を参照します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation
├ mp_install/
├ mp_ravines_install/
├ mp_shoveltown_install/
├ mp_trench_install/
├ xpack1_install/
├ xpack2_install/
├ xpack3_install/
├ xpack3-1_install/
└ xpack4_install/
```

#### 手順4
以下のフォルダを(**HDD**)のData\installationフォルダに移動します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation
├ mp_install/
├ mp_ravines_install/
├ mp_shoveltown_install/
├ mp_trench_install/
├ xpack1_install/ (←HDDに移動する)
├ xpack2_install/ (←HDDに移動する)
├ xpack3_install/ (←HDDに移動する)
├ xpack3-1_install/ (←HDDに移動する)
└ xpack4_install/ (←HDDに移動する)
```

移動すると(**HDD**)のフォルダ構成がこうなります。

```
D:\Origin Games\Battlefield 1
├ Data/
│ └ installation/
│   ├ xpack1_install/
│   ├ xpack2_install/
│   ├ xpack3_install/
│   ├ xpack3-1_install/
│   └ xpack4_install/
└ Patch/
```

#### 手順5
(**SSD**)の`sp`フォルダを(**HDD**)のDataフォルダに移動します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\levels
├ frontend/
├ mp/
└ sp/ (←HDDに移動する)
```

移動すると(**HDD**)のフォルダ構成がこうなります。

```
D:\Origin Games\Battlefield 1
├ Data/
│ ├ installation/
│ │ ├ xpack1_install/
│ │ ├ xpack2_install/
│ │ ├ xpack3_install/
│ │ ├ xpack3-1_install/
│ │ └ xpack4_install/
│ └ sp/ (←増えた)
└ Patch/
```

#### 手順6
コマンドプロンプトを管理者権限で起動しを以下のコマンドを打ち込みます。移動先やインストールフォルダが違う場合は書き換えた後に、ダブルクオーテーションで囲うことを忘れないようにしましょう。


```
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack1_install" "D:\Origin Games\Battlefield 1\Data\installation\xpack1_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack2_install" "D:\Origin Games\Battlefield 1\Data\installation\xpack2_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack3_install" "D:\Origin Games\Battlefield 1\Data\installation\xpack3_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack3-1_install" "D:\Origin Games\Battlefield 1\Data\installation\xpack3-1_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack4_install" "D:\Origin Games\Battlefield 1\Data\installation\xpack4_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\levels\sp" "D:\Origin Games\Battlefield 1\Data\levels\sp"
```

正常に完了していれば以下のような返答がコマンド一回ごとに返ってきます。

C:\Program Files (x86)\Origin Games\Battlefield 1\Data\Win32\installation\xpack1_install
<<===>> D:\Origin Games\Battlefield 1\Data\installation\xpack1_install のシンボリックリンクが作成されました

### Patchフォルダ編をはじめる

#### 手順1
まずは(**HDD**)に`Patch`フォルダを作成します。
```
D:\Origin Games\Battlefield 1
├ Data/ 
└ Patch/ (←作る)
```

#### 手順2
Patchフォルダの中にさらに`installation`フォルダを作成します。
```
D:\Origin Games\Battlefield 1
├ Data/
└ Patch/
  └ installation/ (←作る)
```

#### 手順3
(**SSD**)のインストールフォルダ内の以下を参照します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation
├ mp_install/
├ mp_ravines_install/
├ mp_shoveltown_install/
├ mp_trench_install/
├ xpack1_install/
├ xpack2_install/
├ xpack3_install/
├ xpack3-1_install/
└ xpack4_install/
```

#### 手順4
以下のフォルダを(**HDD**)のPatch\installationフォルダに移動します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation
├ mp_install/
├ mp_ravines_install/
├ mp_shoveltown_install/
├ mp_trench_install/
├ xpack1_install/ (←HDDに移動する)
├ xpack2_install/ (←HDDに移動する)
├ xpack3_install/ (←HDDに移動する)
├ xpack3-1_install/ (←HDDに移動する)
└ xpack4_install/ (←HDDに移動する)
```

移動すると(**HDD**)のフォルダ構成がこうなります。

```
D:\Origin Games\Battlefield 1
├ Data/
│ └ installation/
│   ├ xpack1_install/
│   ├ xpack2_install/
│   ├ xpack3_install/
│   ├ xpack3-1_install/
│   ├ xpack4_install/
│   └ sp/
└ Patch/
  └ installation/
    ├ xpack1_install/
    ├ xpack2_install/
    ├ xpack3_install/
    ├ xpack3-1_install/
    └ xpack4_install/
```

#### 手順5
(**SSD**)の`sp`フォルダを(**HDD**)のPatchフォルダに移動します。
```
C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\levels
├ frontend/
├ mp/
└ sp/ (←HDDに移動する)
```

移動すると(**HDD**)のフォルダ構成がこうなります。

```
D:\Origin Games\Battlefield 1
├ Data/
│ └ installation/
│   ├ xpack1_install/
│   ├ xpack2_install/
│   ├ xpack3_install/
│   ├ xpack3-1_install/
│   ├ xpack4_install/
│   └ sp/
└ Patch/
  ├ installation/
  │ ├ xpack1_install/
  │ ├ xpack2_install/
  │ ├ xpack3_install/
  │ ├ xpack3-1_install/
  │ └ xpack4_install/
  └ sp/ (←増えた)
```

#### 手順6
コマンドプロンプトを管理者権限で起動しを以下のコマンドを打ち込みます。移動先やインストールフォルダが違う場合は書き換えた後に、ダブルクオーテーションで囲うことを忘れないようにしましょう。

```
mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack1_install" "D:\Origin Games\Battlefield 1\Patch\installation\xpack1_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack2_install" "D:\Origin Games\Battlefield 1\Patch\installation\xpack2_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack3_install" "D:\Origin Games\Battlefield 1\Patch\installation\xpack3_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack3-1_install" "D:\Origin Games\Battlefield 1\Patch\installation\xpack3-1_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack4_install" "D:\Origin Games\Battlefield 1\Patch\installation\xpack4_install"

mklink /d "C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\levels\sp" "D:\Origin Games\Battlefield 1\Patch\levels\sp"
```

正常に完了していれば以下のような返答がコマンド一回ごとに返ってきます。

C:\Program Files (x86)\Origin Games\Battlefield 1\Patch\Win32\installation\xpack1_install
<<===>> D:\Origin Games\Battlefield 1\Patch\installation\xpack1_install のシンボリックリンクが作成されました

## おわり
![](https://i.imgur.com/8QLEsr5.png)

この記事が気に入ったらいいね！しよう

![](https://facebook.com/favicon.ico)[シェアする](http://www.facebook.com/sharer/sharer.php?u=https://www.amazon.co.jp/-/dp/B008N8TPK2)
![](https://twitter.com/favicon.ico)[ツイートする](https://twitter.com/intent/tweet?text=%E6%99%82%E3%81%A8%E6%B0%B8%E9%81%A0~%E3%83%88%E3%82%AD%E3%83%88%E3%83%AF~(%E9%80%9A%E5%B8%B8%E7%89%88)%20-%20PS3&url=https://www.amazon.co.jp/-/dp/B008N8TPK2)
