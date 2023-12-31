const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");

/**
 * Cleans the Users collection to successfully execute the tests.
 */
beforeAll( async () => {
  await usersModel.deleteMany();
})

/**
 * This is a test for Login and Register functionalities.
 * Describe() and test() provides a description in case of error.
 * Inside test() -> Is written the code that will be tested. 
 *               -> Is needed the original app module.
 *               -> A post request is made to the endpoint and the login credentials are sent. 
 */

const testAuthLogin = {
    email: "nico-test-error-login@gmail.com",
    password: "HolaTest123",
}

const testAuthRegister = {
    name: "Auth Register Test",
    age: 26,
    email: "test-error-register@gmail.com",
    password: "HolaRegister"
}

describe("[AUTH] Test for Login", () => {
  test("This should return a 404 http status code", async () => {
    const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);

    expect(response.statusCode).toEqual(404);
  });
});

describe("[AUTH] Test for Register", () => {
    test("This should return a 200 http status code", async () => {
      const response = await request(app)
      .post("/api/auth/register")
      .send(testAuthRegister);
    
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("dataUser");
    });
});
