require("./setup");
const app = require("../app.js");
const request = require("supertest");

describe("POST /api/relationship", () => {
  test("Should create a relationship between two users", () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    let relationshipCode;

    return agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@gmail.com",
        password: "Upender123",
      })
      .expect(201)
      .then(() => {
        return agentB.post("/api/auth/register").send({
          username: "userB",
          email: "userb@gmail.com",
          password: "Upender123",
        });
      })
      .then(() => {
        return agentB
          .post("/api/auth/login")
          .send({
            email: "userb@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agentB.get("/api/users/me").expect(200);
      })
      .then((response) => {
        relationshipCode = response.body.relationshipCode;

        return agentA
          .post("/api/auth/login")
          .send({
            email: "usera@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agentA
          .post("/api/relationship")
          .send({ relationshipCode })
          .expect(201);
      });
  });
  test("Should reject an invalid relationship code", () => {
    const agent = request.agent(app);

    return agent
      .post("/api/auth/register")
      .send({
        username: "invalidCodeUser",
        email: "invalidcode@gmail.com",
        password: "Upender123",
      })
      .expect(201)
      .then(() => {
        return agent
          .post("/api/auth/login")
          .send({
            email: "invalidcode@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agent
          .post("/api/relationship")
          .send({ relationshipCode: "XXXXXX" })
          .expect(400)
          .then((res) => {
            expect(res.body.message).toBe("Invalid relationship code");
          });
      });
  });
  test("Should reject connecting with yourself", () => {
    const agent = request.agent(app);
    let relationshipCode;

    return agent
      .post("/api/auth/register")
      .send({
        username: "selfUser",
        email: "self@gmail.com",
        password: "Upender123",
      })
      .expect(201)
      .then(() => {
        return agent
          .post("/api/auth/login")
          .send({
            email: "self@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agent.get("/api/users/me").expect(200);
      })
      .then((res) => {
        relationshipCode = res.body.relationshipCode;

        return agent
          .post("/api/relationship")
          .send({ relationshipCode })
          .expect(400);
      })
      .then((res) => {
        expect(res.body.message).toBe("You cannot connect with yourself");
      });
  });
  test("Should reject user B who is already in a relationship", () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);

    let codeA, codeB, codeC;

    return agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@gmail.com",
        password: "Upender123",
      })
      .expect(201)
      .then(() => {
        return agentB.post("/api/auth/register").send({
          username: "userB",
          email: "userb@gmail.com",
          password: "Upender123",
        });
      })
      .then(() => {
        return agentB
          .post("/api/auth/login")
          .send({
            email: "userb@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agentB.get("/api/users/me").expect(200);
      })
      .then((response) => {
        codeB = response.body.relationshipCode;

        return agentA
          .post("/api/auth/login")
          .send({
            email: "usera@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agentA
          .post("/api/relationship")
          .send({ relationshipCode: codeB })
          .expect(201);
      })
      .then(() => {
        return agentC
          .post("/api/auth/register")
          .send({
            username: "userC2",
            email: "userc2@gmail.com",
            password: "Upender123",
          })
          .expect(201);
      })
      .then(() => {
        return agentC
          .post("/api/auth/login")
          .send({
            email: "userc2@gmail.com",
            password: "Upender123",
          })
          .expect(200);
      })
      .then(() => {
        return agentC
          .post("/api/relationship")
          .send({ relationshipCode: codeB })
          .expect(400);
      })
      .then((res) => {
        expect(res.body.message).toBe("This user is already in a relationship");
      });
  });
});

describe("GET /api/relationship", () => {
  test("Should reject unauthenticated user", async () => {
    const response = await request(app).get("/api/relationship");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });

  test("Should return 404 if user is not in a relationship", async () => {
    // Login user A
    const agentA = request.agent(app);

    await agentA.post("/api/auth/register").send({
      username: "upender",
      email: "uarukonda@gmail.com",
      password: "Password123",
    });

    await agentA.post("/api/auth/login").send({
      email: "uarukonda@gmail.com",
      password: "Password123",
    });

    const response = await agentA.get("/api/relationship");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("You are not in a relationship");
  });

  test("Should return relationship and partner when logged-in user is userA", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    const registerA = await agentA.post("/api/auth/register").send({
      username: "userA",
      email: "usera@test.com",
      password: "Password123",
    });

    expect(registerA.statusCode).toBe(201);

    const registerB = await agentB.post("/api/auth/register").send({
      username: "userB",
      email: "userb@test.com",
      password: "Password123",
    });

    expect(registerB.statusCode).toBe(201);

    await agentA.post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123",
    });

    await agentB.post("/api/auth/login").send({
      email: "userb@test.com",
      password: "Password123",
    });

    const userBResponse = await agentB.get("/api/users/me");

    expect(userBResponse.statusCode).toBe(200);

    const relationshipCode = userBResponse.body.relationshipCode;

    const relationshipResponse = await agentA.post("/api/relationship").send({
      relationshipCode,
    });

    expect(relationshipResponse.statusCode).toBe(201);

    const response = await agentA.get("/api/relationship");

    expect(response.statusCode).toBe(200);
    expect(response.body.relationship).toBeDefined();
    expect(response.body.relationship.userBId).toBe(userBResponse.body.id);
    expect(response.body.partner).toBeDefined();
    expect(response.body.partner.id).toBe(userBResponse.body.id);
    expect(response.body.partner.username).toBe("userB");
    expect(response.body.partner.email).toBe("userb@test.com");
    expect(response.body.partner.password).toBeUndefined();
    expect(response.body.partner.relationshipCode).toBeUndefined();
  });

  test("Should return the correct partner when logged-in user is userB", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    const registerA = await agentA.post("/api/auth/register").send({
      username: "userA",
      email: "usera@test.com",
      password: "Password123",
    });

    expect(registerA.statusCode).toBe(201);

    const registerB = await agentB.post("/api/auth/register").send({
      username: "userB",
      email: "userb@test.com",
      password: "Password123",
    });

    expect(registerB.statusCode).toBe(201);

    await agentA.post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123",
    });

    await agentB.post("/api/auth/login").send({
      email: "userb@test.com",
      password: "Password123",
    });

    const userBResponse = await agentB.get("/api/users/me");

    expect(userBResponse.statusCode).toBe(200);

    const relationshipCode = userBResponse.body.relationshipCode;

    const relationshipResponse = await agentA.post("/api/relationship").send({
      relationshipCode,
    });

    expect(relationshipResponse.statusCode).toBe(201);

    const userAResponse = await agentA.get("/api/users/me");

    expect(userAResponse.statusCode).toBe(200);

    const response = await agentB.get("/api/relationship");

    expect(response.statusCode).toBe(200);

    expect(response.body.relationship).toBeDefined();
    expect(response.body.partner).toBeDefined();

    expect(response.body.partner.id).toBe(userAResponse.body.id);
    expect(response.body.partner.username).toBe(userAResponse.body.username);
  });

  test("Should return relationship details", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register A
    const registerA = await agentA.post("/api/auth/register").send({
      username: "userA",
      email: "usera@test.com",
      password: "Password123",
    });

    expect(registerA.statusCode).toBe(201);

    // Register B
    const registerB = await agentB.post("/api/auth/register").send({
      username: "userB",
      email: "userb@test.com",
      password: "Password123",
    });

    expect(registerB.statusCode).toBe(201);

    // Login A
    await agentA.post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123",
    });

    // Login B
    await agentB.post("/api/auth/login").send({
      email: "userb@test.com",
      password: "Password123",
    });

    // Get B's relationship code
    const userBResponse = await agentB.get("/api/users/me");

    expect(userBResponse.statusCode).toBe(200);

    const relationshipCode = userBResponse.body.id
      ? userBResponse.body.relationshipCode
      : userBResponse.body.user.relationshipCode;

    // A connects to B
    const relationshipResponse = await agentA.post("/api/relationship").send({
      relationshipCode,
    });

    expect(relationshipResponse.statusCode).toBe(201);

    const updateResponse = await agentA.patch("/api/relationship").send({
      relationshipStartDate: "2022-08-15",
      coupleNickname: "Us Forever ❤️",
      relationshipDescription: "Our story together",
      coverPhoto: "cover-photo-url",
    });

    expect(updateResponse.statusCode).toBe(200);

    expect(updateResponse.body).toBeDefined();

    expect(updateResponse.body.relationshipStartDate).toBe(
      "2022-08-15T00:00:00.000Z",
    );

    expect(updateResponse.body.coupleNickname).toBe("Us Forever ❤️");

    expect(updateResponse.body.relationshipDescription).toBe(
      "Our story together",
    );

    expect(updateResponse.body.coverPhoto).toBe("cover-photo-url");
  });

  test("Should return partner profile information", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register A
    const registerA = await agentA.post("/api/auth/register").send({
      username: "userA",
      email: "usera@test.com",
      password: "Password123",
    });

    expect(registerA.statusCode).toBe(201);

    // Register B
    const registerB = await agentB.post("/api/auth/register").send({
      username: "userB",
      email: "userb@test.com",
      password: "Password123",
    });

    expect(registerB.statusCode).toBe(201);

    // Login A
    await agentA.post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123",
    });

    // Login B
    await agentB.post("/api/auth/login").send({
      email: "userb@test.com",
      password: "Password123",
    });

    // Get B's relationship code
    const userBResponse = await agentB.get("/api/users/me");

    expect(userBResponse.statusCode).toBe(200);

    const relationshipCode = userBResponse.body.relationshipCode;

    // A connects to B
    const relationshipResponse = await agentA.post("/api/relationship").send({
      relationshipCode,
    });

    expect(relationshipResponse.statusCode).toBe(201);

    // Create B's profile
    const profileResponse = await agentB.post("/api/profile").send({
      bio: "This is B's bio",
      avatar: "profile-photo-url",
    });

    expect(profileResponse.statusCode).toBe(201);

    // A gets relationship
    const response = await agentA.get("/api/relationship");

    expect(response.statusCode).toBe(200);
    expect(response.body.partner.profile).toBeDefined();
    expect(response.body.partner.profile.bio).toBe("This is B's bio");
    expect(response.body.partner.profile.avatar).toBe("profile-photo-url");
  });

  test("Should not return sensitive partner information", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register A
    const registerA = await agentA.post("/api/auth/register").send({
      username: "userA",
      email: "usera@test.com",
      password: "Password123",
    });

    expect(registerA.statusCode).toBe(201);

    // Register B
    const registerB = await agentB.post("/api/auth/register").send({
      username: "userB",
      email: "userb@test.com",
      password: "Password123",
    });

    expect(registerB.statusCode).toBe(201);

    // Login A
    await agentA.post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123",
    });

    // Login B
    await agentB.post("/api/auth/login").send({
      email: "userb@test.com",
      password: "Password123",
    });

    // Get B's relationship code
    const userBResponse = await agentB.get("/api/users/me");

    expect(userBResponse.statusCode).toBe(200);

    const relationshipCode = userBResponse.body.relationshipCode;

    // A connects to B
    const relationshipResponse = await agentA.post("/api/relationship").send({
      relationshipCode,
    });

    expect(relationshipResponse.statusCode).toBe(201);

    // A gets relationship
    const response = await agentA.get("/api/relationship");

    expect(response.statusCode).toBe(200);

    expect(response.body.partner).toBeDefined();

    // Sensitive fields must not be exposed
    expect(response.body.partner.password).toBeUndefined();

    expect(response.body.partner.relationshipCode).toBeUndefined();
  });
});
