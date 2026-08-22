require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/memory", () => {
  test("Should create and return memory successfully", async () => {
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
      .send({ relationshipCode: userBData.body.relationshipCode });

    const res = await agentA.post("/api/memory").send({
      title: "Our First Trip",
      place: "Goa",
      description: "Our first trip together",
      date: "2025-06-15",
      photo: "https://example.com/goa.jpg",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.memory.title).toBe("Our First Trip");
    expect(res.body.memory.place).toBe("Goa");
    expect(res.body.memory.description).toBe("Our first trip together");
    expect(res.body.memory.photo).toBe("https://example.com/goa.jpg");
    expect(res.body.memory.relationshipId).toBeDefined();
    expect(res.body.memory.createdBy).toBeDefined();
  });

  test("Should reject memory creation when user has no relationship", async () => {
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

    const res = await agentA.post("/api/memory").send({
      title: "Our First Trip",
      place: "Goa",
      description: "Our first trip together",
      date: "2025-06-15",
      photo: "https://example.com/goa.jpg",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("You are not in a relationship");
  });

  test("Should reject memory creation when user is not authenticated", async () => {
    const res = await request(app).post("/api/memory").send({
      title: "Our First Trip",
      place: "Goa",
      description: "Our first trip together",
      date: "2025-06-15",
      photo: "https://example.com/goa.jpg",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Please login");
  });
});

describe("GET /api/memory", () => {
  test("Should return all memories for the authenticated user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register A
    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    // Login A
    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    // Register B
    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    // Login B
    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    // Get B's relationship code
    const userBData = await agentB.get("/api/users/me");

    // A connects to B
    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    // A creates memory 1
    await agentA
      .post("/api/memory")
      .send({
        title: "Our First Trip",
        place: "Goa",
        description: "Our first trip together",
        date: "2025-06-15",
        photo: "https://example.com/goa.jpg",
      })
      .expect(201);

    // A creates memory 2
    await agentA
      .post("/api/memory")
      .send({
        title: "Our Anniversary",
        place: "Hyderabad",
        description: "Our first anniversary",
        date: "2026-06-15",
        photo: "https://example.com/anniversary.jpg",
      })
      .expect(201);

    // Get all memories
    const response = await agentA.get("/api/memory");

    expect(response.statusCode).toBe(200);

    expect(response.body.memories).toBeDefined();
    expect(response.body.memories).toHaveLength(2);

    expect(response.body.memories[0].title).toBe("Our First Trip");
    expect(response.body.memories[0].place).toBe("Goa");

    expect(response.body.memories[1].title).toBe("Our Anniversary");
    expect(response.body.memories[1].place).toBe("Hyderabad");
  });

  test("Should return an empty array when the user has no memories", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register A
    await agentA
      .post("/api/auth/register")
      .send({
        username: "userA",
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(201);

    // Login A
    await agentA
      .post("/api/auth/login")
      .send({
        email: "usera@test.com",
        password: "Password123",
      })
      .expect(200);

    // Register B
    await agentB
      .post("/api/auth/register")
      .send({
        username: "userB",
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(201);

    // Login B
    await agentB
      .post("/api/auth/login")
      .send({
        email: "userb@test.com",
        password: "Password123",
      })
      .expect(200);

    // Get B's relationship code
    const userBData = await agentB.get("/api/users/me");

    // A connects to B
    await agentA
      .post("/api/relationship")
      .send({
        relationshipCode: userBData.body.relationshipCode,
      })
      .expect(201);

    // No memories created

    const response = await agentA.get("/api/memory");

    expect(response.statusCode).toBe(200);
    expect(response.body.memories).toBeDefined();
    expect(response.body.memories).toEqual([]);
  });

  test("Should reject request when user is not authenticated", async () => {
    const response = await request(app).get("/api/memory");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("GET /api/memory/:id", () => {
  test("Should return a memory by id", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Our First Trip",
        place: "Goa",
        description: "Our first trip together",
        date: "2025-06-15",
        photo: "https://example.com/goa.jpg",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentA.get(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.memory).toBeDefined();
    expect(response.body.memory._id).toBe(memoryId);
    expect(response.body.memory.title).toBe("Our First Trip");
    expect(response.body.memory.place).toBe("Goa");
  });

  test("Should reject access to memory that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);

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

    await agentC
      .post("/api/auth/login")
      .send({
        email: "userc@test.com",
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "A and B Memory",
        place: "Goa",
        description: "Private memory",
        date: "2025-06-15",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC.get(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(404);
  });

  test("Should reject unauthenticated request", async () => {
    const response = await request(app).get("/api/memory/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });

  test("Should reject access to memory belonging to a different relationship", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "A and B Memory",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC.get(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("You do not have access to this");
  });
});

describe("PATCH /api/memory/:id", () => {
  test("Should update a memory successfully", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Our First Trip",
        place: "Goa",
        description: "Our first trip together",
        date: "2025-06-15",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentA.patch(`/api/memory/${memoryId}`).send({
      title: "Our Amazing First Trip",
      place: "North Goa",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.memory.title).toBe("Our Amazing First Trip");
    expect(response.body.memory.place).toBe("North Goa");
    expect(response.body.memory.description).toBe("Our first trip together");
  });

  test("Should reject updating memory that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);

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

    await agentC
      .post("/api/auth/login")
      .send({
        email: "userc@test.com",
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Private Memory",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC.patch(`/api/memory/${memoryId}`).send({
      title: "Hacked Memory",
    });

    expect(response.statusCode).toBe(404);
  });

  test("Should reject unauthenticated update", async () => {
    const response = await request(app).patch("/api/memory/invalid-id").send({
      title: "Updated",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });

  test("Should reject updating memory belonging to a different relationship", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Private Memory",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC
      .patch(`/api/memory/${memoryId}`)
      .send({ title: "Hacked Memory" });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("You do not have access to this");
  });
});

describe("DELETE /api/memory/:id", () => {
  test("Should delete a memory successfully", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Our First Trip",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentA.delete(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await agentA.get(`/api/memory/${memoryId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test("Should reject deleting memory that does not belong to user's relationship", async () => {
    const agentA = request.agent(app);
    const agentB = request.agent(app);
    const agentC = request.agent(app);

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

    await agentC
      .post("/api/auth/login")
      .send({
        email: "userc@test.com",
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Private Memory",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC.delete(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(404);

    // Verify the memory still exists
    const ownerResponse = await agentA.get(`/api/memory/${memoryId}`);

    expect(ownerResponse.statusCode).toBe(200);
  });

  test("Should reject unauthenticated delete", async () => {
    const response = await request(app).delete("/api/memory/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });

  test("Should reject deleting memory belonging to a different relationship", async () => {
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

    const memoryResponse = await agentA
      .post("/api/memory")
      .send({
        title: "Private Memory",
        description: "test description",
        place: "Goa",
      })
      .expect(201);

    const memoryId = memoryResponse.body.memory._id;

    const response = await agentC.delete(`/api/memory/${memoryId}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("You do not have access to this");

    const ownerResponse = await agentA.get(`/api/memory/${memoryId}`);
    expect(ownerResponse.statusCode).toBe(200);
  });
});
