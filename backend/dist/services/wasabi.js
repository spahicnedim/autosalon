"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = exports.deleteFromWasabi = exports.uploadToWasabi = void 0;
const aws_sdk_1 = require("aws-sdk");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_s3_2 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3 = new aws_sdk_1.S3({
    endpoint: "https://s3.eu-central-2.wasabisys.com",
    region: "eu-central-2",
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
    s3ForcePathStyle: true,
});
const uploadToWasabi = async (buffer, key, options) => {
    await s3
        .putObject({
        Bucket: process.env.WASABI_BUCKET,
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
exports.uploadToWasabi = uploadToWasabi;
const deleteFromWasabi = async (key) => {
    await s3
        .deleteObject({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
    })
        .promise();
};
exports.deleteFromWasabi = deleteFromWasabi;
// koristi SDK v3 za presigned
const s3client = new client_s3_2.S3Client({
    region: "eu-central-2",
    endpoint: "https://s3.eu-central-2.wasabisys.com",
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
    },
});
const getPresignedUrl = async (key) => {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
    });
    return await (0, s3_request_presigner_1.getSignedUrl)(s3client, command, { expiresIn: 3600 }); // 1h
};
exports.getPresignedUrl = getPresignedUrl;
