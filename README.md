# Mika Spark Studio

個人開発ブランド「Mika Spark Studio」の公式Webサイトです。iOSアプリ「Hirame」の紹介、法務文書、サポート情報を掲載します。

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
- `appStoreUrl`: Hirame公開後にApp Store URLを設定。`null` の間はComing Soon表示
- `legalDates`: Privacy Policy / Termsを変更したときに更新

メールアドレスはサポートページと法務ページで設定値から参照されます。

## Hirameスクリーンショットの追加

1. 画像を `public/images/hirame/` に配置します（例: `screen-01.webp`）。
2. [src/config/site.ts](src/config/site.ts) のHirameの `screenshots` に `/images/hirame/screen-01.webp` を追加します。
3. [src/app/apps/hirame/page.tsx](src/app/apps/hirame/page.tsx) のスクリーンショット表示は配列を参照します。必要に応じて端末モック用スタイルを調整します。

画像が1枚もない場合は「Screenshots coming soon」を表示します。App Store用画像はWebPまたは最適化済みPNGを推奨し、内容を説明する適切な代替テキストも設定してください。

## 新しいアプリ・ゲームの追加

1. `src/config/site.ts` の `products` に、`category`（`App` / `Game` / `Tool` / `Experiment`）を含む作品情報を追加します。
2. `src/app/apps/[slug]/page.tsx` 相当の紹介ページを作成します。ゲームの場合は必要に応じて `src/app/games/[slug]/` として構成できます。
3. Privacy Policy、Terms、Supportが必要なら、Hirameと同じ構成で作品配下に追加します。
4. `src/app/sitemap.ts` と `scripts/verify-static.mjs` の対象ルートへ追加します。
5. `npm run check` でリンク、metadata、静的出力を確認します。

トップページと全体Supportページは `products` 配列を使ってカード・リンクを生成するため、作品情報を追加しやすい構成です。

## 公開前チェック

- `supportEmail`が実在し受信できること
- `baseUrl`が取得済みの本番ドメインと一致すること
- Hirameの実装仕様とPrivacy Policy / Terms / FAQの記載が一致すること
- App Store URLを公開後に設定すること
- 制定日・最終更新日を確認すること
- `npm run check` がすべて成功すること

Privacy PolicyとTermsは、Hirameの現時点の想定仕様（端末内保存、ログインなし、iCloud・広告・課金なし）に基づくドラフトです。アプリ実装側の保存方式やSDK構成が変更された場合は、公開前に必ず内容を更新してください。
