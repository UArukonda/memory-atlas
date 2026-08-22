const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const connectDB = require("../db/db.js");

let mongoServer;

const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connectDB(uri);
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

const closeTestDB = async () => {
  await mongoose.disconnect();

  await mongoServer.stop();
};

beforeAll(async () => {
  await connectTestDB();
}, 30000);

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeTestDB();
});

describe("test", () => {
  test("should ", () => {});
});
