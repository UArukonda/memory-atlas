require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/journal", () => {
  test("Should create and return journal successfully", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    const res = await agentA.post("/api/journal").send({
      title: "The Day We Met",
      description: "I still remember the first day we met.",
      date: "2024-06-15",
    });

    expect(res.statusCode).toBe(201);

    expect(res.body.journal).toBeDefined();
    expect(res.body.journal.title).toBe("The Day We Met");
    expect(res.body.journal.description).toBe(
      "I still remember the first day we met.",
    );

    expect(res.body.journal.relationshipId).toBeDefined();
    expect(res.body.journal.createdBy).toBeDefined();
  });

  test("Should reject journal creation when user has no relationship", async () => {
    const agentA = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    const res = await agentA.post("/api/journal").send({
      title: "The Day We Met",
      description: "I still remember the first day we met.",
      date: "2024-06-15",
    });

    expect(res.statusCode).toBe(404);

    expect(res.body.message).toBe("You are not in a relationship");
  });

  test("Should reject journal creation when user is not authenticated", async () => {
    const res = await request(app).post("/api/journal").send({
      title: "The Day We Met",
      description: "I still remember the first day we met.",
      date: "2024-06-15",
    });

    expect(res.statusCode).toBe(401);

    expect(res.body.message).toBe("Please login");
  });
});

describe("GET /api/journal", () => {
  test("Should return all journals for the authenticated user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    await agentA
      .post("/api/journal")
      .send({
        title: "The Day We Met",
        description: "I still remember the first day we met.",
        date: "2024-06-15",
      })
      .expect(201);

    await agentA
      .post("/api/journal")
      .send({
        title: "Our First Trip",
        description: "Our first trip together was unforgettable.",
        date: "2025-06-15",
      })
      .expect(201);

    const response = await agentA.get("/api/journal");

    expect(response.statusCode).toBe(200);

    expect(response.body.journals).toBeDefined();
    expect(response.body.journals).toHaveLength(2);

    expect(response.body.journals[0].title).toBe("The Day We Met");
    expect(response.body.journals[1].title).toBe("Our First Trip");
  });

  test("Should return an empty array when the user has no journals", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    const response = await agentA.get("/api/journal");

    expect(response.statusCode).toBe(200);
    expect(response.body.journals).toBeDefined();
    expect(response.body.journals).toEqual([]);
  });

  test("Should reject request when user is not authenticated", async () => {
    const response = await request(app).get("/api/journal");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("GET /api/journal/:id", () => {
  test("Should return a journal by id", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "The Day We Met",
        description: "I still remember the first day we met.",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentA.get(`/api/journal/${journalId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.journal).toBeDefined();
    expect(response.body.journal._id).toBe(journalId);
    expect(response.body.journal.title).toBe("The Day We Met");
  });

  test("Should reject access to journal that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);
    const agentD = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentC
      .post("/api/auth/register")
      .send({
        username: "userC",
        email: "userc@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentD
      .post("/api/auth/register")
      .send({
        username: "userD",
        email: "userd@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({ email: "usera@test.com", password: "Password123" })
      .expect(200);
    await agentB
      .post("/api/auth/login")
      .send({ email: "userb@test.com", password: "Password123" })
      .expect(200);
    await agentC
      .post("/api/auth/login")
      .send({ email: "userc@test.com", password: "Password123" })
      .expect(200);
    await agentD
      .post("/api/auth/login")
      .send({ email: "userd@test.com", password: "Password123" })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");
    await agentA
      .post("/api/relationship")
      .send({ relationshipCode: userBData.body.relationshipCode })
      .expect(201);

    const userDData = await agentD.get("/api/users/me");
    await agentC
      .post("/api/relationship")
      .send({ relationshipCode: userDData.body.relationshipCode })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "A and B Journal",
        description: "Private entry",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentC.get(`/api/journal/${journalId}`);

    expect(response.statusCode).toBe(403);
  });

  test("Should reject unauthenticated request", async () => {
    const response = await request(app).get("/api/journal/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });

  test("Should handle a malformed journal id", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({ relationshipCode: userBData.body.relationshipCode })
      .expect(201);

    const response = await agentA.get("/api/journal/not-a-real-objectid");

    expect(response.statusCode).toBe(500);
  });

  test("Should return 404 for a journal id that doesn't exist", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({ relationshipCode: userBData.body.relationshipCode })
      .expect(201);

    const nonExistentId = "64a1f0c2e1b2c3d4e5f6a7b8";

    const response = await agentA.get(`/api/journal/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /api/journal/:id", () => {
  test("Should update a journal successfully", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "The Day We Met",
        description: "I still remember the first day we met.",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentA.patch(`/api/journal/${journalId}`).send({
      title: "The Unforgettable Day We Met",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.journal.title).toBe("The Unforgettable Day We Met");
    expect(response.body.journal.description).toBe(
      "I still remember the first day we met.",
    );
  });

  test("Should reject updating journal that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);
    const agentD = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentC
      .post("/api/auth/register")
      .send({
        username: "userC",
        email: "userc@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentD
      .post("/api/auth/register")
      .send({
        username: "userD",
        email: "userd@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({ email: "usera@test.com", password: "Password123" })
      .expect(200);
    await agentB
      .post("/api/auth/login")
      .send({ email: "userb@test.com", password: "Password123" })
      .expect(200);
    await agentC
      .post("/api/auth/login")
      .send({ email: "userc@test.com", password: "Password123" })
      .expect(200);
    await agentD
      .post("/api/auth/login")
      .send({ email: "userd@test.com", password: "Password123" })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");
    await agentA
      .post("/api/relationship")
      .send({ relationshipCode: userBData.body.relationshipCode })
      .expect(201);

    const userDData = await agentD.get("/api/users/me");
    await agentC
      .post("/api/relationship")
      .send({ relationshipCode: userDData.body.relationshipCode })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "Private Journal",
        description: "Private entry",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentC.patch(`/api/journal/${journalId}`).send({
      title: "Hacked Journal",
    });

    expect(response.statusCode).toBe(403);
  });

  test("Should reject unauthenticated update", async () => {
    const response = await request(app).patch("/api/journal/invalid-id").send({
      title: "Updated",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("DELETE /api/journal/:id", () => {
  test("Should delete a journal successfully", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");

    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "The Day We Met",
        description: "I still remember the first day we met.",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentA.delete(`/api/journal/${journalId}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await agentA.get(`/api/journal/${journalId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test("Should reject deleting journal that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);
    const agentD = request.agent(app);

    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentC
      .post("/api/auth/register")
      .send({
        username: "userC",
        email: "userc@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentD
      .post("/api/auth/register")
      .send({
        username: "userD",
        email: "userd@test.com",
        password: "Password123",
      })
      .expect(201);

    await agentA
      .post("/api/auth/login")
      .send({ email: "usera@test.com", password: "Password123" })
      .expect(200);
    await agentB
      .post("/api/auth/login")
      .send({ email: "userb@test.com", password: "Password123" })
      .expect(200);
    await agentC
      .post("/api/auth/login")
      .send({ email: "userc@test.com", password: "Password123" })
      .expect(200);
    await agentD
      .post("/api/auth/login")
      .send({ email: "userd@test.com", password: "Password123" })
      .expect(200);

    const userBData = await agentB.get("/api/users/me");
    await agentA
      .post("/api/relationship")
      .send({ relationshipCode: userBData.body.relationshipCode })
      .expect(201);

    const userDData = await agentD.get("/api/users/me");
    await agentC
      .post("/api/relationship")
      .send({ relationshipCode: userDData.body.relationshipCode })
      .expect(201);

    const journalResponse = await agentA
      .post("/api/journal")
      .send({
        title: "Private Journal",
        description: "Private entry",
        date: "2024-06-15",
      })
      .expect(201);

    const journalId = journalResponse.body.journal._id;

    const response = await agentC.delete(`/api/journal/${journalId}`);

    expect(response.statusCode).toBe(403);

    const ownerResponse = await agentA.get(`/api/journal/${journalId}`);

    expect(ownerResponse.statusCode).toBe(200);
  });

  test("Should reject unauthenticated delete", async () => {
    const response = await request(app).delete("/api/journal/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});
