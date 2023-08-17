const request = require("supertest");
const app = require("../app");

/**
 * This is a test in login functionality.
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

describe("[AUTH] This is a test for /auth/login", () => {
  test("This should return a 404 http status code", async () => {
    const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);

    expect(response.statusCode).toEqual(404);
  });
});

describe("[AUTH] This is a test for /auth/register", () => {
    test("This should return a 200 http status code", async () => {
      const response = await request(app)
      .post("/api/auth/register")
      .send(testAuthRegister);
    
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("dataUser");
    });
});
