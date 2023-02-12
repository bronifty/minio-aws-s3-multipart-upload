import express from "express";
import path from "path";
import Minio from "minio";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";

const app = express();
const upload = multer();
dotenv.config();

app.use(express.static(path.join(process.cwd(), "public")));

const bucket = process.env.AWS_S3_BUCKET;

const s3Client = new Minio.Client({
  endPoint: "s3.amazonaws.com",
  accessKey: process.env.AWS_S3_ACCESS_KEY,
  secretKey: process.env.AWS_S3_SECRET_KEY,
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log("File Buffer: ", file.buffer);
  console.log("File Name: ", file.originalname);

  s3Client.putObject(
    bucket,
    file.originalname,
    file.buffer,
    file.mimetype,
    (err, etag) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send("File uploaded successfully");
    }
  );
});

app.post("/local-file", (req, res) => {
  var file = "local-file";
  var fileStream = fs.createReadStream(file);
  s3Client.putObject(bucket, file, fileStream, function (e) {
    if (e) {
      return console.log(e);
    }
    console.log("Successfully uploaded the stream");
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
