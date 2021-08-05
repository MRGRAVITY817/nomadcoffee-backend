import * as jwt from "jsonwebtoken";
import * as AWS from "aws-sdk";
import client from "../../client";
import { Resolver } from "../../types";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verified = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({
      where: { id: verified["id"] },
    });
    return user ? user : null;
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to proceed",
        };
      }
    }
    return resolver(root, args, context, info);
  };

export const AwsVerifiedStorage = () => {
  const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
  const region = "kr-standard";
  const accessKeyId = process.env.NAVER_ACCESS_KEY;
  const secretAccessKey = process.env.NAVER_SECRET_KEY;
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  return S3;
};

export const uploadFile = async (file, userId, folder) => {
  const S3 = AwsVerifiedStorage();
  const bucketName = process.env.NAVER_BUCKET;
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `instaclone/${folder}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await S3.upload({
    Body: readStream,
    Bucket: bucketName,
    Key: objectName,
    ACL: "public-read",
  }).promise();
  return Location;
};
