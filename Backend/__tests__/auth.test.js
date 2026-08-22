jest.mock("../repositories/user.repository.js", () => {
  const actual = jest.requireActual("../repositories/user.repository.js");
  return {
    ...actual,
    findUserByEmail: jest.fn(actual.findUserByEmail),
  };
});

const { findUserByEmail } = require("../repositories/user.repository.js");

require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/auth/register", () => {
  test("should create a new user", async () => {
    // Arrange
    const user = {
      username: "uppi",
      email: "uarukonda@gmail.com",
      password: "Upender123",
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
  test("should reject duplicate email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "uppi",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201);

    const user = {
      username: "someoneElse",
      email: "uarukonda@gmail.com",
      password: "Upender123",
    };

    const res = await request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(409);

    expect(res.body).toEqual({
      message: "User with this email already exists, please login",
    });
  });
  test("should reject duplicate username", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "uppi",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201);

    const user = {
      username: "uppi",
      email: "uaru@gmail.com",
      password: "Upender123",
    };

    return request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(409)
      .then((res) => {
        expect(res.body).toEqual({
          message: "Username already taken, please try different username",
        });
      });
  });
  test("should require username", () => {
    const user = {
      email: "uppi@gmail.com",
      password: "Upender123",
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
  test("should require email", () => {
    const user = {
      username: "uppi",
      password: "Upender123",
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
  test("should require password", () => {
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

describe("POST /api/auth/login", () => {
  test("400: responds with an error when email is missing", () => {
    const user = {
      password: "Upender123",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Email is required",
        });
      });
  });

  test("400: responds with an error when password is missing", () => {
    const user = {
      email: "uarukonda@gmail.com",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Password is required",
        });
      });
  });

  test("404: responds with an error when no account exists with the provided email", () => {
    const user = {
      email: "aru@gmail.com",
      password: "Upender123",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
          message: "Invalid email or password.",
        });
      });
  });

  test("401: responds with an error when the password is incorrect", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "uppi",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201);

    const user = {
      email: "uarukonda@gmail.com",
      password: "Upender23",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual({
          message: "Invalid email or password.",
        });
      });
  });

  test("200: responds with a JWT token and user details when login is successful", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "uppi",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "uarukonda@gmail.com", password: "Upender123" })
      .expect(200);

    expect(res.headers["set-cookie"][0]).toMatch(/token=/);
    expect(res.body).toEqual({
      message: "Login successful",
      email: "uarukonda@gmail.com",
      username: "uppi",
    });
  });

  test("200: does not return the user's password in the response", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "uppi",
        email: "uarukonda@gmail.com",
        password: "Upender123",
      })
      .expect(201);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "uarukonda@gmail.com", password: "Upender123" })
      .expect(200);

    expect(res.body.password).toEqual(undefined);
  });

  test("500: responds with an internal server error when the database query fails", async () => {
    findUserByEmail.mockRejectedValueOnce(
      new Error("Database connection failed"),
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "uarukonda@gmail.com", password: "Upender123" })
      .expect(500);

    expect(res.body.message).toEqual("Internal Server Error");
  });
});

describe("POST /api/auth/logout", () => {
  test("Should return 200 on successful logout", () => {
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
        return agent.post("/api/auth/logout").expect(200);
      })
      .then((res) => expect(res.body.message).toBe("Logout successful"));
    // .then(() => {
    //   return agent.get("/api/users/me").expect(200);
    // })
  });
});

describe("POST /api/auth/forgot-password", () => {
  test("Should send email to user", () => {
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
        return request(app)
          .post("/api/auth/forgot-password")
          .send({ email: "uarukonda@gmail.com" })
          .expect(200);
      });
  });
  test("Should update user password", () => {
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
        return request(app)
          .post("/api/auth/forgot-password")
          .send({ email: "uarukonda@gmail.com" })
          .expect(200);
      })
      .then((response) => {
        const token = response.body.token;
        return request(app)
          .post("/api/auth/reset-password")
          .send({ token, newPassword: "Arukonda123" })
          .expect(200);
      });
  });
});
