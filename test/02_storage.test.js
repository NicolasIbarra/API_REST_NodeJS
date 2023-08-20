const request = require("supertest");
const app = require("../app");
const { signToken } = require("../utils/handleJwt");
const { usersModel, storageModel } = require("../models");
const filePath = `${__dirname}/TestFiles/bear.jpeg`;

let jwtToken = "";
let fileId = "";

/**
 * A session token is needed to post a file:
 *      -> An existing user is searched in the DB and sent to JWT function to generate a token.
 */
beforeAll(async () => {
  const user = await usersModel.findOne({ email: "nico@gmail.com" });
  jwtToken = await signToken(user);
});

describe("[STORAGE] Test for uploading a file", () => {
  test("This should return a 200 http status code", async () => {
    const response = await request(app)
      .post("/api/storage")
      .set("Authorization", `Bearer ${jwtToken}`)
      .attach("myFile", filePath);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("[STORAGE] Test for getting all files", () => {
  test("This should return a 200 http status code", async () => {
    const response = await request(app)
      .get("/api/storage")
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("files");
  });
});

describe("[STORAGE] Test for getting one file", () => {

  test("This should return an item id", async () => {
    const {_id} = await storageModel.findOne();
    fileId = _id.toString(); 
  })

  test("This should return a 200 http status code", async () => {
    const response = await request(app)
      .get(`/api/storage/${fileId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });
});

/**
 * DELETE - NOT WORKING
 */
describe("[STORAGE] Test for deleting one file", () => {

  test("This should return an item id", async () => {
    const {_id} = await storageModel.findOne();
    fileId = _id.toString(); 
  })

  test("This should return a 200 http status code", async () => {
    const response = await request(app)
      .delete(`/api/storage/${fileId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });
});
