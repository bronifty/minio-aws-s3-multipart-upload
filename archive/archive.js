import Minio from "minio";
import fs from "fs";

const bucket = "bronifty";
var s3Client = new Minio.Client({
  endPoint: "s3.amazonaws.com",
  accessKey: "AKIASC3HLN3B47KJOWAM",
  secretKey: "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",
});

s3Client.listBuckets(function (e, buckets) {
  if (e) return console.log(e);
  console.log("buckets :", buckets);
});

// Upload a local file as stream
var file = "video.mp4";
var fileStream = fs.createReadStream(file);
s3Client.putObject(bucket, file, fileStream, function (e) {
  if (e) {
    return console.log(e);
  }
  console.log("Successfully uploaded the stream");
});
