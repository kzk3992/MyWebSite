# Mika Spark Studio

個人開発ブランド「Mika Spark Studio」の公式Webサイトです。作品の紹介（トップと Works ページ）、スタジオ紹介、サポートの入口を掲載します。

各作品の詳細ページは作品ごとのサブドメインにあります: Hirame（https://hirame.mikaspark.com/ 、リポジトリ kzk3992/Hirame-site）、Uzmera（https://uzmera.mikaspark.com/ ）、まほうのある暮らし（https://mahou.mikaspark.com/ ）。旧URL `/apps/hirame/...` は `public/_redirects` で Hirame サイトへ 301 転送しています（`/apps/hirame/app-ads.txt` は転送せずこのサイトに残しています）。

Next.js App Router、TypeScript、CSS Modulesで実装し、`output: "export"` による完全静的出力を使用しています。バックエンド、データベース、Cookie、アクセス解析、外部フォントは使用していません。

## ローカル起動

Node.js 20以降を用意し、次を実行します。

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## 検証とproduction build

```bash
npm run lint
npm run typecheck
npm run build
npm run test:static
```

`npm run build` はproduction buildと静的exportを同時に行い、`out/` を生成します。まとめて検証する場合は `npm run check` を使用できます。

生成物をローカルで確認する場合:

```bash
npm run start
```

## GitHubへpush

空のGitHubリポジトリを作成後、リポジトリURLを指定します。

```bash
git add .
git commit -m "Build Mika Spark Studio website"
git remote add origin https://github.com/YOUR_NAME/YOUR_REPOSITORY.git
git push -u origin main
```

既にremoteが設定されている場合、`git remote add origin` は不要です。

## Cloudflare Pagesへのデプロイ

1. Cloudflare Dashboardで Workers & Pages → Create application → Pages → Connect to Git を選択します。
2. GitHubリポジトリを接続します。
3. Framework presetは `Next.js (Static HTML Export)` を選択するか、下記を手動設定します。
4. デプロイ後、主要ページと `robots.txt`、`sitemap.xml` を確認します。

Cloudflare Pagesの設定値:

| 項目 | 値 |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `22`（環境変数 `NODE_VERSION=22`） |
| Root directory | `/` |

このサイトは静的ファイルだけで動作するため、SSR用アダプターやCloudflare Functionsは不要です。

## 独自ドメイン

Cloudflare Pagesの対象プロジェクトで Custom domains → Set up a custom domain を開き、取得済みドメインを登録します。DNSがCloudflare管理下なら案内に従ってレコードを追加します。

公開前に [src/config/site.ts](src/config/site.ts) の `baseUrl` を実際の独自ドメイン（`https://` を含む）へ変更し、再ビルドしてください。この値はcanonical URL、OGP、`sitemap.xml`、`robots.txt`に使われます。現在は仮値 `https://mikaspark.com` です。

## 変更箇所

ブランド情報、URL、メールアドレス、作品一覧は [src/config/site.ts](src/config/site.ts) に集約しています。

- `supportEmail`: 実際に受信できるサポート用メールアドレスへ変更
- `baseUrl`: 取得済みの本番ドメインへ変更
- `copyrightYear`: 必要に応じて更新
- `products`: 新しいアプリ・ゲームの基本情報を追加
- `appStoreUrl`: 作品のApp Store URL。設定すると Works ページに「App Storeで見る」ボタンが出ます
- `legalDates`: Privacy Policy / Termsを変更したときに更新


## Hirame のページについて

Hirame の紹介・Privacy Policy・Terms・Support は kzk3992/Hirame-site へ移しました。スクリーンショットや法務文書の更新はそちらで行います。

## 新しいアプリ・ゲームの追加

1. `src/config/site.ts` の `products` に、`category`（`App` / `Game` / `Tool` / `Experiment`）を含む作品情報を追加します。
2. `src/app/apps/[slug]/page.tsx` 相当の紹介ページを作成します。ゲームの場合は必要に応じて `src/app/games/[slug]/` として構成できます。
3. 詳細ページや Privacy Policy・Terms・Support は、Hirame と同様に作品ごとのサブドメイン（別リポジトリ）に置く構成を基本とします。Works ページのカルーセルに載せる場合は `src/components/worksCarouselItems.ts` にも追加します。
4. `src/app/sitemap.ts` と `scripts/verify-static.mjs` の対象ルートへ追加します。
5. `npm run check` でリンク、metadata、静的出力を確認します。

トップページと全体Supportページは `products` 配列を使ってカード・リンクを生成するため、作品情報を追加しやすい構成です。

## 公開前チェック

- `supportEmail`が実在し受信できること
- `baseUrl`が取得済みの本番ドメインと一致すること
- App Store URLを公開後に設定すること
- 制定日・最終更新日を確認すること
- `npm run check` がすべて成功すること

