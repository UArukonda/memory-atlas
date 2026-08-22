require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/letter", () => {
  test("Should create and return letter successfully", async () => {
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

    const res = await agentA.post("/api/letter").send({
      to: "Sunshine",
      title: "Happy Anniversary",
      message: "Every day with you feels like the first.",
      date: "2026-08-18",
      from: "Your Upi",
    });

    expect(res.statusCode).toBe(201);

    expect(res.body.letter).toBeDefined();
    expect(res.body.letter.title).toBe("Happy Anniversary");
    expect(res.body.letter.message).toBe(
      "Every day with you feels like the first.",
    );
    expect(res.body.letter.to).toBe("Sunshine");
    expect(res.body.letter.from).toBe("Your Upi");
    expect(res.body.letter.relationshipId).toBeDefined();
    expect(res.body.letter.createdBy).toBeDefined();
  });

  test("Should reject letter creation when user has no relationship", async () => {
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

    const res = await agentA.post("/api/letter").send({
      title: "Happy Anniversary",
      message: "Every day with you feels like the first.",
      date: "2026-08-18",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("You are not in a relationship");
  });

  test("Should reject letter creation when user is not authenticated", async () => {
    const res = await request(app).post("/api/letter").send({
      title: "Happy Anniversary",
      message: "Every day with you feels like the first.",
      date: "2026-08-18",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Please login");
  });
});

describe("GET /api/letter", () => {
  test("Should return all letters for the authenticated user's relationship", async () => {
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
      .post("/api/letter")
      .send({
        title: "Happy Anniversary",
        message: "Every day with you feels like the first.",
        date: "2026-08-18",
      })
      .expect(201);

    await agentA
      .post("/api/letter")
      .send({
        title: "Just Because",
        message: "No reason, just thinking about you.",
        date: "2026-09-01",
      })
      .expect(201);

    const response = await agentA.get("/api/letter");

    expect(response.statusCode).toBe(200);

    expect(response.body.letters).toBeDefined();
    expect(response.body.letters).toHaveLength(2);

    expect(response.body.letters[0].title).toBe("Happy Anniversary");
    expect(response.body.letters[1].title).toBe("Just Because");
  });

  test("Should return an empty array when the user has no letters", async () => {
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

    const response = await agentA.get("/api/letter");

    expect(response.statusCode).toBe(200);
    expect(response.body.letters).toBeDefined();
    expect(response.body.letters).toEqual([]);
  });

  test("Should reject request when user is not authenticated", async () => {
    const response = await request(app).get("/api/letter");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("GET /api/letter/:id", () => {
  test("Should return a letter by id", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        to: "Sunshine",
        title: "Happy Anniversary",
        message: "Every day with you feels like the first.",
        date: "2026-08-18",
        from: "Your Upi",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentA.get(`/api/letter/${letterId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.letter).toBeDefined();
    expect(response.body.letter.to).toBe("Sunshine");
    expect(response.body.letter.from).toBe("Your Upi");
    expect(response.body.letter._id).toBe(letterId);
    expect(response.body.letter.title).toBe("Happy Anniversary");
  });

  test("Should reject access to letter that does not belong to user's relationship", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        title: "A and B Letter",
        message: "Private letter",
        date: "2026-08-18",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentC.get(`/api/letter/${letterId}`);

    expect(response.statusCode).toBe(403);
  });

  test("Should handle a malformed letter id", async () => {
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

    const response = await agentA.get("/api/letter/not-a-real-objectid");

    expect(response.statusCode).toBe(404);
  });

  test("Should return 404 for a letter id that doesn't exist", async () => {
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

    const response = await agentA.get(`/api/letter/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });

  test("Should reject unauthenticated request", async () => {
    const response = await request(app).get("/api/letter/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("PATCH /api/letter/:id", () => {
  test("Should update a letter successfully", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        title: "Happy Anniversary",
        message: "Every day with you feels like the first.",
        date: "2026-08-18",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentA.patch(`/api/letter/${letterId}`).send({
      title: "Happy Anniversary, My Love",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.letter.title).toBe("Happy Anniversary, My Love");
    expect(response.body.letter.message).toBe(
      "Every day with you feels like the first.",
    );
  });

  test("Should reject updating letter that does not belong to user's relationship", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        title: "Private Letter",
        message: "Private message",
        date: "2026-08-18",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentC.patch(`/api/letter/${letterId}`).send({
      title: "Hacked Letter",
    });

    expect(response.statusCode).toBe(403);
  });

  test("Should reject unauthenticated update", async () => {
    const response = await request(app).patch("/api/letter/invalid-id").send({
      title: "Updated",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("DELETE /api/letter/:id", () => {
  test("Should delete a letter successfully", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        title: "Happy Anniversary",
        message: "Every day with you feels like the first.",
        date: "2026-08-18",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentA.delete(`/api/letter/${letterId}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await agentA.get(`/api/letter/${letterId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test("Should reject deleting letter that does not belong to user's relationship", async () => {
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

    const letterResponse = await agentA
      .post("/api/letter")
      .send({
        title: "Private Letter",
        message: "Private message",
        date: "2026-08-18",
      })
      .expect(201);

    const letterId = letterResponse.body.letter._id;

    const response = await agentC.delete(`/api/letter/${letterId}`);

    expect(response.statusCode).toBe(403);

    const ownerResponse = await agentA.get(`/api/letter/${letterId}`);

    expect(ownerResponse.statusCode).toBe(200);
  });

  test("Should reject unauthenticated delete", async () => {
    const response = await request(app).delete("/api/letter/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});
