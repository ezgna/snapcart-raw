# Snapcart

Next.js 14 製のショッピングカートのサンプルアプリです。

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## ビルド・テスト

```bash
npm run build
npm run lint
npm test
npm start   # 本番相当（ポート 3000）
```

## Docker

```bash
docker build -t snapcart .
docker run -p 3000:3000 snapcart
```

## CI/CD（`main` への push）

GitHub Actions で **Lint → Test → GHCR へイメージ push → EC2 で pull & コンテナ起動** まで実行します。EC2 接続用の Secrets（`EC2_HOST` / `EC2_USERNAME` / `EC2_KEY`）がリポジトリに設定されている必要があります。
