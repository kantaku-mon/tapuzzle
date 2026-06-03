# ZEROGRID

> A 6×6 logic puzzle game. Tap cells to reduce them (and their neighbors) to zero.

![ZeroGrid](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

---

## ゲームルール

- **6×6 のマス目**に数字が入っています。
- **マスをタップ**すると、そのマスの数字と**隣り合った上下左右のマス**の数字がそれぞれ **1 つ減ります**。
  - 内側のマス（4 つの隣接）: 合計 5 マスが 1 減る
  - 辺に面したマス（3 つの隣接）: 合計 4 マスが 1 減る
  - 角のマス（2 つの隣接）: 合計 3 マスが 1 減る
- **全マスをゼロにする**とクリア 🎉
- **1 つでもマイナスになる**とゲームオーバー 💀

### 難易度

| 難易度 | 生成タップ数 |
| ------ | ----------- |
| EASY   | 5〜8 回     |
| NORMAL | 8〜14 回    |
| HARD   | 14〜22 回   |

すべてのパズルは**逆手順生成**（ゼロ盤面から逆タップを重ねて作成）なので、必ず解が存在します。

---

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript 5**
- **Tailwind CSS 3**
- **React 19**

---

## ローカル起動

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## ビルド

```bash
npm run build
npm run start
```

---

## Vercel デプロイ

1. [Vercel](https://vercel.com) にリポジトリを接続
2. **追加設定なし**でそのままデプロイ可能
3. 環境変数は不要（`.env.example` 参照）

---

## プロジェクト構成

```
zerogrid/
├── src/
│   ├── app/
│   │   ├── globals.css       # グローバルスタイル
│   │   ├── layout.tsx        # ルートレイアウト・メタデータ
│   │   └── page.tsx          # エントリーポイント
│   ├── components/
│   │   ├── Cell.tsx          # 個別マスコンポーネント
│   │   ├── Grid.tsx          # 6×6 グリッド
│   │   ├── HUD.tsx           # ステータス・難易度 UI
│   │   ├── StatusOverlay.tsx # クリア/ゲームオーバー画面
│   │   ├── RulesPanel.tsx    # ルール説明パネル
│   │   └── GamePage.tsx      # メインゲーム画面
│   ├── lib/
│   │   ├── gameLogic.ts      # ゲームロジック（生成・タップ・判定）
│   │   └── useGameState.ts   # React カスタムフック
│   └── types/
│       └── game.ts           # 型定義
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

---

## ライセンス

MIT
