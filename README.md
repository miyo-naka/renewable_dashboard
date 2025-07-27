# Renewable Energy Dashboard

このダッシュボードは、**世界および各地域の再生可能エネルギー導入の推移（1965 年〜2024 年）**を可視化する Web アプリケーションです。  
国際的なエネルギー統計データをもとに、再生可能エネルギー（太陽光・風力・水力・バイオエネルギー等）のシェアや発電量の変化を、インタラクティブなグラフで直感的に把握できます。

## 主な機能

- **地域別・年別の再生可能エネルギー比率の推移**（折れ線グラフ）
- **エネルギー源ごとの発電量推移**（折れ線グラフ、地域選択可）
- **特定年・地域のエネルギー源別構成**（積み上げ棒グラフ・円グラフ）
- **サイドバーによるページナビゲーション**
  - Top Page: 世界・主要地域の推移
  - Break down: 地域・年ごとの詳細な内訳
  - About: アプリの概要

## 使用技術

- **Next.js**（App Router 構成）
- **TypeScript**
- **Recharts**（グラフ描画）
- **Papaparse**（CSV データ処理）
- **Tailwind CSS**（スタイリング）

## データソース

- Energy Institute - Statistical Review of World Energy (2025)
- Our World in Data によるデータ加工

## セットアップ方法

1. 依存パッケージのインストール
   ```bash
   npm install
   ```
2. 開発サーバーの起動
   ```bash
   npm run dev
   ```
3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## フォルダ構成

- `src/app/` ... 各ページ（Top, Breakdown, About）
- `src/components/` ... グラフ・サイドバー等の UI コンポーネント
- `public/data/` ... 加工済み CSV データ

## ライセンス・注意事項

- 本アプリはポートフォリオ・学習目的で作成されています。
- データやグラフの解釈にはご注意ください。
