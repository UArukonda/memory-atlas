require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("GET /api/users/me", () => {
  test("should return the user", () => {
    const agent = request.agent(app);

    return agent
      .post("/api/auth/register")
      .send({
        username: "uarukonda",
        email: "uarukonda@gmail.com",
        password: "12121212",
      })
      .expect(201)
      .then(() => {
        return agent
          .post("/api/auth/login")
          .send({ email: "uarukonda@gmail.com", password: "12121212" })
          .expect(200);
      })
      .then(() => {
        return agent.get("/api/users/me").expect(200);
      })
      .then((res) =>
        expect(res.body).toMatchObject({
          username: expect.any(String),
          email: expect.any(String),
          displayName: expect.any(String),
          bio: expect.any(String),
          avatar: expect.any(String),
        }),
      );
  });
});
