user.cfg Tips
==================
### PerfOverlay.Enable (Boolean)
(true) *PerfOverlay.*～で表示可能な全ての項目を表示する

### PerfOverlay.DrawGraph (Boolean)
(false) 左下にフレームグラフを表示する

### PerfOverlay.DrawGraphMethod (Uint32)
(1) *PerfOverlay.DrawGraph*で表示されるグラフの計測方法を変更する

 - (1) 平均の数値
 - (2) 実際の数値

### PerfOverlay.DrawCpuGraph (Boolean)
(true) *PerfOverlay.DrawGraph*で表示されるグラフにCPUグラフを追加する

### PerfOverlay.DrawGpuGraph (Boolean)
(true) *PerfOverlay.DrawGraph*で表示されるグラフにGPUグラフを追加する

### PerfOverlay.DrawFrameGraph (Boolean)
(false) *PerfOverlay.DrawGraph*で表示されるグラフにFrameグラフを追加する

### PerfOverlay.DrawFps (Boolean)
(false) 右上にFPSを表示する

### PerfOverlay.DrawFpsMethod (Uint32)
(1) *PerfOverlay.DrawFps*で表示されるFPSの計測方法を変更する

 - (1) 平均のFPS
 - (2) 実際のFPS?

### PerfOverlay.FcatWidth (Float32)
(20) 調査中

### PerfOverlay.LegendDisplayFormat (Uint32)
(0) 調査中

### PerfOverlay.FpsTimePeriod (Float32)
(0.5) *PerfOverlay.DrawFps*で表示されるFPSの更新頻度(秒)

### UI.DrawEnable (Boolean)
(true) UI(ミニマップ/弾数/オブジェクティブ等)を表示する

 - (false) 完全にUIを非表示
 - 過去に記述すると無限ロードに陥るバグ有り
