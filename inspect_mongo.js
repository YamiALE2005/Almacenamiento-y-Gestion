const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const mongodbUri = process.env.MONGODB_URI;
console.log("Connecting to:", mongodbUri);

mongoose.connect(mongodbUri)
    .then(async () => {
        console.log("Connected to MongoDB!");
        const dbs = await mongoose.connection.db.admin().listDatabases();
        console.log("Databases:");
        dbs.databases.forEach(db => console.log(` - ${db.name}`));

        console.log("\nCurrent Database:", mongoose.connection.name);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections & Counts:");
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments({});
            console.log(` - ${col.name}: {count: ${count}}`);
        }

        await mongoose.connection.close();
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection error:", err);
        process.exit(1);
    });
