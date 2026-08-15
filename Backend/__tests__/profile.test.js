require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/profile", () => {
  test("create user profile", () => {
    const agent = request.agent(app);

    return agent
      .post("/api/auth/register")
      .send({
        username: "uarukonda",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201)
      .then(() => {
        return agent
          .post("/api/auth/login")
          .send({ email: "uarukonda@gmail.com", password: "Upender123" })
          .expect(200);
      })
      .then(() => {
        return agent
          .post("/api/profile")
          .send({
            displayName: "Upender",
            bio: "my life my rules",
            avatar: "adasfdsfsd",
          })
          .expect(201);
      });
  });
});
