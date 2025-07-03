const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();
const BUCKET_URL = "https://sean-devon-food-blog-media.s3.us-east-1.amazonaws.com/";
const TABLE_NAME = "media";

// Read local metadata
const currentItems = JSON.parse(fs.readFileSync("media/metadata.json", "utf8"));
const currentKeys = new Set(currentItems.map((item) => item.imageKey));

async function getAllDynamoItems() {
    const items = [];
    let ExclusiveStartKey;

    do {
        const params = {
            TableName: TABLE_NAME,
            ExclusiveStartKey
        };
        const data = await docClient.scan(params).promise();
        items.push(...data.Items);
        ExclusiveStartKey = data.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    return items;
}

async function syncDynamoDB() {
    const dynamoItems = await getAllDynamoItems();

    // Delete removed entries
    for (const item of dynamoItems) {
        if (!currentKeys.has(item.imageKey)) {
            try {
                await docClient.delete({
                    TableName: TABLE_NAME,
                    Key: { id: item.id } // MUST match the table's key
                }).promise();
                console.log(`🗑️ Deleted from DynamoDB: ${item.title}`);
            } catch (err) {
                console.error(`❌ Failed to delete ${item.title}`, err);
            }
        }
    }


    // Add/update current items
    for (const item of currentItems) {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                ...item,
                id: String(item.id), // This MUST match the table's partition key
                imageUrl: BUCKET_URL + item.imageKey
            }
        };

        try {
            await docClient.put(params).promise();
            console.log(`✅ Upserted: ${item.title}`);
        } catch (err) {
            console.error(`❌ Failed: ${item.title}`, err);
        }
    }

}

syncDynamoDB();
