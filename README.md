# MinIO Reference Implementation

- update your env.example to .env with AWS creds and bucket name

```shell
npm i && npm start
```


### Notes
- multer makes it easier to deal with the file stream in the POST request from the HTML form
- MinIO is a generic S3 client
    - If you omit args it will infer the types
- [minio js docs examples](https://github.com/minio/minio-js/tree/master/examples)


### Posts
- [blog](https://dev.to/bronifty/use-minio-for-aws-s3-multipart-upload-reference-implementation-in-nodejs-21h9)
- [youtube](https://youtu.be/yNd7OelQAb4)


