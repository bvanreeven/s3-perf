import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as uuid from "uuid";

interface Config {
  AWS_S3_BUCKET_NAME: string,
  AWS_S3_ACCESS_KEY_ID: string,
  AWS_S3_SECRET_ACCESS_KEY: string
}

const config: Config = require("./config.json");

console.log("Hello world!");

const s3 = new AWS.S3({
  accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY
});

const prefix = uuid.v4() + "_test";

async function main() {
  
  console.log(`Uploading files to bucket ${config.AWS_S3_BUCKET_NAME} with prefix ${prefix}...`)

  const filePaths: string[] = [];

  for (let i = 1; i <= 100; i++) {
    filePaths.push(`files/file${i}.txt`);
  }

  console.time("upload");

  // SEQUENTIAL:

  // for (let i = 0; i < filePaths.length; i++) {
  //   await uploadFile(filePaths[i]);
  // }

  // PARALLEL:

  await Promise.all(filePaths.map(uploadFile));

  console.timeEnd("upload");
}

async function uploadFile(filePath: string): Promise<void> {
  const putObjectRequest = {
    Bucket: config.AWS_S3_BUCKET_NAME,
    Key: prefix + "/" + filePath,
    Body: fs.createReadStream(filePath)
  };
  await s3.putObject(putObjectRequest).promise();
  console.log(` - Uploaded ${putObjectRequest.Key}`)
}

async function delay(timeout: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, timeout));
}

main();
