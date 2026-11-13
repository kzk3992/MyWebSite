# DESIGN_REPORT — Mika Spark Studio 公式サイト（branch: fable/site-design）

## 前提の相違（要確認）
- 依頼文には「現行はライト基調」とあったが、リポジトリの現行デザインは**黒基調**（globals.css の --color-bg: #000）。黒基調を土台として磨いた。ライト化は行っていない。
- 「Works」の独立ページは存在しない（トップの #works セクション）。表示確認はトップ内 Works で実施。

## 変えたこと
### 全体（globals.css / components.module.css）
- 和文フォントスタックを明示（Hiragino Sans / Noto Sans JP / Yu Gothic UI / Meiryo）、本文 line-height 1.7、見出しに text-wrap: balance と文節折り返し（対応ブラウザのみ）、禁則 strict。Webフォントの追加なし。
- ヘッダー：言語切替が PC 幅で縦に3段に割れていた不具合を修正（JA / EN が1行に）。ロゴのホバー発光。
- セクション見出し：リード文がある場合は「見出し左・リード右」の2カラムにして余白の間延びを解消。
- スクロール出現（RevealObserver.tsx、IntersectionObserver のみ・依存追加なし）。JS が動いた時だけ隠す方式なので JS なしでも全内容が表示される。prefers-reduced-motion では無効。
- フッター：「Made independently in Japan.」に蛍光グリーンの菱形の印（Uzmera サイトのフッターと共通）。
- グッズ：カード幅に上限（モバイルで画像が画面幅いっぱいになるのを解消）。テキストが省略記号で切れて **¥120 が見えなくなっていた**のを折り返し表示に変更。
### トップ（日英共通・page.module.css）
- ヒーロー：ロゴ画像を screen 合成にして背景の方眼と淡い発光の上に置き、写真の矩形感を消した。見出し・コピー・ロゴが順に立ち上がる CSS アニメーション、スクロールでロゴがわずかに遅れて流れる（animation-timeline 対応ブラウザのみ、JS なし）。下端に Explore works のレール。ロゴ画像とコピー「小さなアイデアを、使えるプロダクトへ。」は不変。モバイルは絶対配置をやめ通常フローに。
- Works カード：3作で枠・余白・番号列・ホバー挙動を統一し、違いは作品色（--card-accent）と右側ビジュアルだけに。
  - Hirame：実画面を紙色の背景に。ホバーで画面とマスコットが少し動く。
  - Uzmera：既存のドット絵の庭（kemari_garden.png）・けまり娘・毬を使った舞台に。ホバーで毬が跳ねる。
  - まほうのある暮らし：深緑に CSS だけで描いた金の魔法陣（ゆっくり回転）。
  - 長い作品名は小さめの段に切り替え、「まほうのある／暮らし」で折り返す（以前は「まほうの／ある暮ら／し」）。
  - Hirame のビジュアルも他2作と同じくリンク化（宛先は既存の /apps/hirame/、/en/apps/hirame/。新しい宛先は増えていない）。

## 変えなかったこと・不変条件チェック
- npm run check（lint / typecheck / build / test:static）：**成功**。「静的出力を検証しました: 16ルート、19 HTML、リンク切れなし」
- 生成ファイル一覧（out/、_next 除く）の変更前後 diff：差分なし（_next を除く116ファイルすべて一致）
- href 一覧（全HTMLの a[href] と canonical/alternate）の変更前後 diff：
```
差分なし（246行すべて一致）
```
- ads.txt / app-ads.txt（変更前 sha1: dde0003889bdafaff944345d1cb85efdb6a8f7e8 と一致）：
```
dde0003889bdafaff944345d1cb85efdb6a8f7e8  public/ads.txt
dde0003889bdafaff944345d1cb85efdb6a8f7e8  public/app-ads.txt
dde0003889bdafaff944345d1cb85efdb6a8f7e8  public/apps/hirame/app-ads.txt
dde0003889bdafaff944345d1cb85efdb6a8f7e8  out/ads.txt
dde0003889bdafaff944345d1cb85efdb6a8f7e8  out/app-ads.txt
```
- 依存追加なし（package.json 未変更）。新規画像なし。push なし。作業開始時に他者の未コミット変更なし。

## 文言の微調整（全件）
1. Works セクションの小見出し：日 "Selected work / 01"、英 "Selected work / 02"（英は番号の誤り）→ 日英とも "01 / Selected work"（"02 / ABOUT" "03 / GOODS" と書式を統一）。
2. 英語ページの Uzmera カードの aria-label："Uzmera website を開く" → "Open the Uzmera website"（画面には出ない読み上げ用）。英語ページの Uzmera アイコン alt も "Uzmera app icon" に。

## 表示確認
1280 / 375 / 320 で トップ（日英）・Uzmera トップを撮影。横スクロールの発生なし（scrollWidth = clientWidth）。保存先 ~/fable-design-shots/（{ja,en,uzmera}-{1280,375,320}-{fold,full}.png）。about / hirame / support / privacy も 1280・375 で崩れなしを目視確認（保存はしていない）。
```
ja 1280: height=4590 scrollWidth=1280 clientWidth=1280
ja 375: height=5540 scrollWidth=375 clientWidth=375
ja 320: height=5809 scrollWidth=320 clientWidth=320
en 1280: height=4590 scrollWidth=1280 clientWidth=1280
en 375: height=5735 scrollWidth=375 clientWidth=375
en 320: height=5858 scrollWidth=320 clientWidth=320
uzmera 1280: height=3094 scrollWidth=1280 clientWidth=1280
uzmera 375: height=4116 scrollWidth=375 clientWidth=375
uzmera 320: height=4367 scrollWidth=320 clientWidth=320
```
注意：ヘッドレス Chromium のみで確認。Safari / 実機は未確認。
モバイル幅の *-full.png の左上に「本文へ移動 / Skip to content」が写っているのは全ページ撮影時の描画上の現象で、実際の位置は画面外（実測 top: -78px）。*-fold.png が実際の見え方。

## 残した課題・次に効くこと
- **不足素材**：Uzmera カードのワードマーク用ドットフォント。DotGothic16 は 2MB あるため公式サイトでは読み込ませていない（等幅フォントで代替）。「UZMERA」6字だけのサブセット woff2（数KB）があれば本来の表情になる。
- public/brand/icons/spark.png が 724KB、uzmera/app-icon.png が 1.2MB（表示は数十px）。縮小版を用意すると初期表示が軽くなる。
- フッターの logo-white.png は背景がグレーの矩形で見える。透過版があると締まる。
- components.module.css に未使用の necosmos 系スタイルが残っている（今回は削除していない）。
