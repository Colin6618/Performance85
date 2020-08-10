// require("dotenv-flow").config();
const app = require("../../server.js");
const supertest = require("supertest");
const { setupDB } = require("./dbSetup.js");
const { User } = require("../models/user.model.js");

setupDB();

const request = supertest(app);
//issue here:  mongoose status after jest completed. Only affect testing. jest force quit to ignore.
//https://github.com/facebook/jest/blob/513a6fbad495d6c72de65ede00c5c787718a4724/docs/MongoDB.md

describe("GET: /:id route to get data", () => {
  let insertedData = {
    name: "TESTname3",
    username: "TESTemployee3",
    email: "TESTemployee3@yahoo.com",
    password: "TESTemployee3",
  };
  beforeEach((done) => {
    new User(insertedData)
      .save()
      .then(() => done())
      .catch((err) => done(err));
  });

  test("existing data", async (done) => {
    await request
      .get("/api/users")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        const { password, ...obj } = insertedData;
        expect(res.body[0]).toMatchObject(obj);
        done();
      })
      .catch((err) => done(err));
  });
});
