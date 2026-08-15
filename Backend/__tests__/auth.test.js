require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/auth/register", () => {
  xtest("should create a new user", async () => {
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

describe("POST /api/auth/login", () => {
  xtest("400: responds with an error when email is missing", () => {
    const user = {
      password: "upender123",
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

  xtest("400: responds with an error when password is missing", () => {
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

  xtest("404: responds with an error when no account exists with the provided email", () => {
    const user = {
      email: "aru@gmail.com",
      password: "upender123",
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

  xtest("401: responds with an error when the password is incorrect", () => {
    const user = {
      email: "uarukonda@gmail.com",
      password: "upender23",
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

  xtest("200: responds with a JWT token and user details when login is successful", () => {
    const user = {
      email: "uarukonda@gmail.com",
      password: "upender123",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          token: expect.any(String),
          user: {
            id: expect.any(String),
            email: user.email,
            username: expect.any(String),
          },
        });
      });
  });

  xtest("200: does not return the user's password in the response", () => {
    const user = {
      email: "uarukonda@gmail.com",
      password: "upender123",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.user.password).toEqual(undefined);
      });
  });

  xtest("500: responds with an internal server error when the database query fails", () => {
    const user = {
      email: "uarukonda@gmail.com",
      password: "upender123",
    };

    return request(app)
      .post("/api/auth/login")
      .send(user)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual("Internal server error");
      });
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
        return agent.post("/api/auth/logout").expect(200);
      })
      .then((res) => expect(res.body.message).toBe("Logout successful"));
    // .then(() => {
    //   return agent.get("/api/users/me").expect(200);
    // })
  });
});
