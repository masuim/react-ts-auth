# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

### フロントエンド

- React 18
- TypeScript
- Tailwind CSS v3.4.1 (※)
- shadcn/ui (UI コンポーネントライブラリ)
- React Router DOM (ルーティング)
- Zod (バリデーション)
- Universal Cookie (Cookie 管理)

※ Tailwind CSS のバージョンについて：

- 最新の v4 ではなく、v3.4.1 を使用しています
- これは、shadcn/ui が Tailwind CSS v3 系に最適化されているためです
- 将来的なアップグレードは、shadcn/ui の Tailwind CSS v4 対応を確認してから検討します

### アーキテクチャ

- Atomic Design
- ディレクトリベースのコンポーネント設計

## プロジェクト構成

```
src/
├── components/         # Atomic Designベースのコンポーネント
│   ├── atoms/         # 最小単位のコンポーネント
│   ├── molecules/     # 複数のatomsで構成されるコンポーネント
│   ├── organisms/     # 複数のmoleculesで構成されるコンポーネント
│   ├── templates/     # ページレイアウトのテンプレート
│   └── pages/         # ページコンポーネント
├── features/          # 機能ごとのロジック
│   ├── auth/          # 認証関連
│   └── user/          # ユーザー関連
├── hooks/             # カスタムフック
├── lib/               # ユーティリティ関数やヘルパー
├── types/             # 型定義
├── styles/            # グローバルスタイル
└── mocks/             # モックデータ
```

## セットアップ手順

1. 依存パッケージのインストール

```bash
npm install
```

2. Tailwind CSS のインストールと設定

```bash
# 特定のバージョンを指定してインストール
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p
```

3. shadcn/ui のセットアップ

```bash
npx shadcn@latest init
```

shadcn/ui の設定オプション：

- スタイル: New York
  - より洗練された見た目とプロフェッショナルな印象を与えるデザイン
  - デフォルトのスタイルよりもエンタープライズ向けの UI に適している
- カラーテーマ: Neutral
  - ビジネスアプリケーションに適した落ち着いた色調
  - カスタマイズの余地を残しつつ、基本的なデザインシステムとして機能

4. その他の必要なパッケージのインストール

```bash
npm install @hookform/resolvers universal-cookie zod react-router-dom
```

5. 開発サーバーの起動

```bash
npm run dev
```

## 機能概要

### 認証機能

- ログインページ
  - フォームバリデーション（Zod）
  - エラーハンドリング
  - トークンベースの認証

### ダッシュボード

- ログイン状態の維持
- ユーザー情報の表示
- ログアウト機能

## 開発ガイドライン

### コンポーネント設計

- Atomic Design の原則に従う
- 再利用可能なコンポーネントの作成
- Props 型の明示的な定義

### スタイリング

- Tailwind CSS のユーティリティクラスを使用
- shadcn/ui コンポーネントのカスタマイズ
  - 必要に応じてコンポーネントの追加: `npx shadcn-ui@latest add [component-name]`
  - カスタマイズは`src/components/ui`ディレクトリ内で管理

### 状態管理

// TODO: 開発開始時の状態を記載しているため、今後ライブラリ使用時など随時変更が必要になります。

- ローカルステート: React useState
- グローバルステート: 必要に応じて追加

## ライセンス

MIT
