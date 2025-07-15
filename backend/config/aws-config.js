import "dotenv/config";
import AWS from "aws-sdk";

AWS.config.update({
	region: "ap-south-1",
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	httpOptions: {
		timeout: 30000,
		connectTimeout: 5000,
	},
});

const s3 = new AWS.S3();
const S3_BUCKET = "demomvcbucket";

export { s3, S3_BUCKET };
