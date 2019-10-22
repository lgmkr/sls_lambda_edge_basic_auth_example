# Usage

- Provisioning AWS (CloudFront, S3, Lambda@edge)

```
npm run sls:deploy
```

- Upload static files (/public folder)

```
npm run s3:upload
```

- Invalidate CloudFront cache
  (Note: update your CloudFront Distribution ID `--distribution-id`)

```
npm run cloudfront:invalidate
```

# Todo

- limit public access to s3 bucket
