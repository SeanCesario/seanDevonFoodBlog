const fs = require("fs");
const path = require("path");

const MEDIA_DIR = "media/";
const OUTPUT_FILE = "media/metadata.json";

// Helper to format a readable title from filename
const formatTitle = (filename) =>
    path.basename(filename, path.extname(filename))
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

// Get image files only
const files = fs.readdirSync(MEDIA_DIR)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

// Map files to metadata objects with incrementing IDs
const metadata = files.map((file, index) => ({
    id: index + 1,
    title: formatTitle(file),
    imageKey: `${file}`
}));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));
console.log(`✅ metadata.json generated with ${metadata.length} items.`);
