require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/auth/register", () => {
  test("should create a new user", async () => {
    // Arrange
    const user = {
      username: "uppi",
      email: "uarukonda@gmail.com",
      password: "upender123",
    };

    // Act
    const res = await request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(201);

    // Assert
    expect(res.body.email).toBe(user.email);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      email: user.email,
    });
  });
  xtest("should reject duplicate email", async () => {
    // Arrange
    const user = {
      username: "uppi",
      email: "uarukonda@gmail.com",
      password: "upender123",
    };

    // Act
    const res = await request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(409);

    // Assert
    expect(res.body).toEqual({
      message: "user with this email already exists, please login",
    });
  });
  xtest("should reject duplicate username", async () => {
    const user = {
      username: "uppi",
      email: "uaru@gmail.com",
      password: "upender123",
    };

    // Act
    return request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(409)
      .then((res) => {
        expect(res.body).toEqual({
          message: "username already taken, please try different username",
        });
      });
  });
  xtest("should require username", () => {
    const user = {
      email: "uppi@gmail.com",
      password: "upender123",
    };

    return request(app)
      .post("/api/auth/register")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Username is required",
        });
      });
  });
  xtest("should require email", () => {
    const user = {
      username: "uppi",
      password: "upender123",
    };

    return request(app)
      .post("/api/auth/register")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Email is required",
        });
      });
  });
  xtest("should require password", () => {
    const user = {
      username: "uppi",
      email: "uppi@gmail.com",
    };

    return request(app)
      .post("/api/auth/register")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Password is required",
        });
      });
  });
});
