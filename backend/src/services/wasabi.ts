import { S3 } from "aws-sdk";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3({
  endpoint: "https://s3.eu-central-2.wasabisys.com",
  region: "eu-central-2",
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  s3ForcePathStyle: true,
});

export const uploadToWasabi = async (
  buffer: Buffer,
  key: string,
  options?: { contentType?: string; cacheControl?: string; acl?: string },
): Promise<string> => {
  await s3
    .putObject({
      Bucket: process.env.WASABI_BUCKET!,
      Key: key,
      Body: buffer,
      ACL: options?.acl ?? "private", // 👈 više ti ne treba public-read
      ContentType: options?.contentType ?? "image/jpeg",
      CacheControl: options?.cacheControl,
    })
    .promise();

  // ✅ Vrati BunnyCDN URL
  return `${process.env.BUNNY_CDN_URL}/${key}`;
};
export const deleteFromWasabi = async (key: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.WASABI_BUCKET!,
      Key: key,
    })
    .promise();
};

// koristi SDK v3 za presigned
const s3client = new S3Client({
  region: "eu-central-2",
  endpoint: "https://s3.eu-central-2.wasabisys.com",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET_KEY!,
  },
});

export const getPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.WASABI_BUCKET!,
    Key: key,
  });
  return await getSignedUrl(s3client, command, { expiresIn: 3600 }); // 1h
};
