# 開発ノート（コラム）投稿パイプライン

mikaspark.com の `/notes/` に短い開発コラムを投稿するための仕組みと手順。
2026-11-26 構築。投稿先を Threads から自サイトへ移す決定（2026-11-25）に基づく。

## 構成

- 記事の正本: `src/content/notes/*.md`（ファイル名＝スラッグ＝URL）
- 一覧: `src/app/(ja)/notes/page.tsx`、記事: `src/app/(ja)/notes/[slug]/page.tsx`
- 読み込みとMarkdown変換: `src/lib/notes.ts`（依存なしの最小レンダラ）
- 公開スクリプト: `scripts/publish-note.mjs`
- 画像: `public/notes/<スラッグ>/` に置き、本文からは `/notes/<スラッグ>/<ファイル名>` で参照

## 記事の形式

front matter に `title` / `date`（YYYY-MM-DD）/ `description` の3つが必須。

```md
---
title: 記事タイトル
date: 2026-11-26
description: 一覧とOGPに出る1〜2文の要約。
---

本文。対応する記法は ## 見出し / 段落 / - リスト / 1. 番号リスト / > 引用 /
コードフェンス / --- 罫線 / **太字** / `コード` / [リンク](url) / ![画像](url)。
生HTMLは書けない（エスケープされる）。
```

## 公開フロー（承認ゲート付き）

1. Muse が下書き（.md）を作り、宮下さんに文面を見せて承認を得る。**承認なしに公開しない**
2. Mac のリポジトリ clone（~/Public/MyWebSite、ブランチ redesign）で
   `node scripts/publish-note.mjs <下書き.md>` を実行する
3. スクリプトが `npm run check`（lint/typecheck/build/静的検証）を通し、
   commit → push する。Cloudflare Pages が redesign を自動デプロイする
4. スクリプトが本番URL（200＋タイトル含有）まで自動確認する。
   失敗したら「公開済み」と報告しない

## 毎日の運用

- 18:30 の日次ジョブが下書きを1本作って提示する（従来の Threads 下書きの後継）
- 宮下さんが「投稿して」と言ったら、上記フローで公開し、公開URLを報告する
- 下書きと投稿済みの管理は `~/workspace/threads/post-log.md` の後継ログで行う
