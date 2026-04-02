# Snapcart

Sample shopping cart app built with Next.js 14.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build and test

```bash
npm run build
npm run lint
npm test
npm start   # production-like run on port 3000
```

## Docker

```bash
docker build -t snapcart .
docker run -p 3000:3000 snapcart
```

## CI/CD (push to `main`)

GitHub Actions runs **Lint → Test → push image to GHCR → pull on EC2 and run the container**. Configure repository secrets for EC2: `EC2_HOST`, `EC2_USERNAME`, and `EC2_KEY`. For post-deploy notifications, set `LAMBDA_URL` to your Lambda function URL.
