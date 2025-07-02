const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();
const BUCKET_URL = "https://sean-devon-food-blog-media.s3.us-east-1.amazonaws.com/";

const items = JSON.parse(fs.readFileSync("media/metadata.json", "utf8"));

async function uploadToDynamoDB() {
    for (const item of items) {
        const params = {
            TableName: "media",
            Item: {
                ...item,
                imageUrl: BUCKET_URL + item.imageKey
            }
        };

        try {
            await docClient.put(params).promise();
            console.log(`✅ Uploaded: ${item.title}`);
        } catch (err) {
            console.error(`❌ Failed: ${item.title}`, err);
        }
    }
}

uploadToDynamoDB();
