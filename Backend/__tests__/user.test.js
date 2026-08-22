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
            bio: "Testing my profile",
            avatar: "https://example.com/avatar.jpg",
          })
          .expect(201);
      })
      .then(() => {
        return agent.get("/api/users/me").expect(200);
      })
      .then((res) =>
        expect(res.body).toMatchObject({
          username: expect.any(String),
          email: expect.any(String),
          profile: {
            displayName: expect.any(String),
            bio: expect.any(String),
            avatar: expect.any(String),
          },
        }),
      );
  });
});

describe("DELETE /api/users/me", () => {
  test("Should delete the authenticated user", () => {
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
          .send({
            email: "uarukonda@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agent.delete("/api/users/me").expect(200);
      })
      .then(() => {
        return agent.get("/api/users/me").expect(404);
      })
      .then((response) => {
        expect(response.body).toEqual({ message: "User not found" });
      });
  });
});
