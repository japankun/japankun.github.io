user.cfg Tips
==================

 - (Booelan) (true/false)のいずれかを設定(1/0)で代用可能 
 - (Int32/Uint32) 整数
 - (Float32) 整数もしくは小数
 - [InGame] ゲーム内コンソールからの設定が即時に反映される項目
 - (その他) その他の設定値は項目ごとに書いてあります

### GameTime.MaxVariableFps (Float32)[InGame]
(200) ゲーム内の最大FPSを変更する

 - 記述するとカクツキが出る場合有り

### PerfOverlay.Enable (Boolean)[InGame]
(true) *PerfOverlay.*～で表示可能な全ての項目を表示する

### PerfOverlay.DrawGraph (Boolean)[InGame]
(false) 画面左下にフレームグラフを表示する

### PerfOverlay.DrawGraphMethod (Uint32)[InGame]
(1) *PerfOverlay.DrawGraph*で表示されるグラフの計測方法を変更する

 - (1) 平均の数値
 - (2) 実際の数値

### PerfOverlay.DrawCpuGraph (Boolean)[InGame]
(true) *PerfOverlay.DrawGraph*で表示されるグラフにCPUグラフを追加する

### PerfOverlay.DrawGpuGraph (Boolean)[InGame]
(true) *PerfOverlay.DrawGraph*で表示されるグラフにGPUグラフを追加する

### PerfOverlay.DrawFrameGraph (Boolean)[InGame]
(false) *PerfOverlay.DrawGraph*で表示されるグラフにFrameグラフを追加する

### PerfOverlay.DrawFps (Boolean)[InGame]
(false) 画面右上にFPSを表示する

### PerfOverlay.DrawFpsMethod (Uint32)[InGame]
(1) *PerfOverlay.DrawFps*で表示されるFPSの計測方法を変更する

 - (1) 平均のFPS
 - (2) 実際のFPS?

### PerfOverlay.FcatWidth (Float32)
(20) 情報ください

### PerfOverlay.LegendDisplayFormat (Uint32)
(0) 情報ください

### PerfOverlay.FpsTimePeriod (Float32)[InGame]
(0.5) *PerfOverlay.DrawFps*で表示されるFPSの更新頻度(秒)

### PostProcess.DofMethod (DofMethod)
(Gaussian) ビデオオプションのWEAPON DOFに使用するぼかしの方法

 - (Gaussian)
 - (Sprite)

### PostProcess.BlurMethod (BlurMethod)
(Gaussian) モーションブラーに使用するぼかしの方法

 - (Gaussian)
 - (Sprite)

### PostProcess.DynamicAOEnable (Boolean)[InGame]
(false) アンビエントオクルージョンを有効にするか否か

 - 有効時にはオブジェクトの下に影が増える
 - 有効にする場合は*PostProcess.DynamicAOMethod*とセットで使用する

### PostProcess.DynamicAOMethod (DynamicAOMethod)[InGame]
(HBAO) アンビエントオクルージョンに使用するメソッドを変更する

 - (SSAO) 簡易的な陰影付ける
 - (HBAO) SSAOよりリアルな陰影を付ける

### Render.DrawScreenInfo (Boolean)
(false) 画面上部に使用API、画面解像度、周波数、使用GPU等を表示する

### RenderDevice.DxDiagDriverDetectionEnable (Boolean)
(true) 情報ください

### RenderDevice.Dx11Enable (Boolean)
(true) DirectX 11.0を有効にする

 - グラフィックボードが対応していれば設定に関わらずDirectX 11.0が使用される
 - 無効にすると僅かにFPSが低下することがある
 - GeforceのDirectX 11.0対応ボードなら、trueにして明示的に記述する

### RenderDevice.Dx11Dot1Enable (Boolean)
(true) DirectX 11.1を有効にする

### RenderDevice.Dx11Dot1RuntimeEnable (Boolean)
(true) DirectX 11.1のランタイムを有効にする

### RenderDevice.TripleBufferingEnable (Boolean)
(true) トリプルバッファリングを有効にする

### RenderDevice.ForceRenderAheadLimit (Int32)
(-1) レンダリング前最大フレーム数

 - (-1, 0) 無効
 - (1) 1フレーム
 - (2) 2フレーム


### StereoConvergenceScale (Float32)
(1) 3D表示に関する設定

### StereoSeparationScale (Float32)
(1) 3D表示に関する設定

### StereoSoldierZoomConvergenceScale (Float32)
(1) 3D表示に関する設定

### UI.DrawEnable (Boolean)[InGame]
(true) UI(ミニマップ/弾数/オブジェクティブ等)を表示する

 - (false) 完全にUIを非表示
 - 過去に記述すると無限ロードに陥るバグ有り

### WorldRender.TransparencyShadowmapsEnable (Boolean)
(false) 透過シャドウマップを有効にする

### WorldRender.MortionBlurEnable (Boolean)[InGame]
(false) モーションブラーを有効にする

 - (true) ビデオオプションのPOST PROCESSをMEDIUM以上にしないと有効にならない

### WorldRender.MortionBlurRadialBlurMax (Float32)[InGame]
(0.06) モーションブラーに関する設定

### WorldRender.MortionBlurQuality (Uint32)[InGame]
(1) モーションブラーに関する設定

### WorldRender.MortionBlurMaxSampleCount (Uint32)[InGame]
(16) モーションブラーに関する設定

### WorldRender.SpotLightShadowmapEnable (Boolean)
(true) シャドウマップに関する設定

### WorldRender.SpotLightShadowmapResolution (Uint32)
(1024) シャドウマップに関する設定

### WorldRender.LightTileCsPathEnable (Boolean)
(true) シャドウマップに関する設定

### WorldRender.PlanarReflectionEnable (Boolean)[InGame]
(true) 面に対する反射の設定
 - 無効時には海面などが暗くなる
