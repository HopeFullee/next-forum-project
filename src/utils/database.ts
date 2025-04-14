import { MongoClient, MongoClientOptions } from "mongodb";

const url: string = process.env.MONGO_DB_URL as string;

const options = { useNewUrlParser: true } as MongoClientOptions;
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
