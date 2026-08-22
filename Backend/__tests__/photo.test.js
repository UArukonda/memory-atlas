require("./setup.js");
const request = require("supertest");
const app = require("../app.js");

describe("POST /api/photo", () => {
  test("Should create and return photo successfully", async () => {
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

    const res = await agentA.post("/api/photo").send({
      url: "https://example.com/goa.jpg",
      type: "photo",
      caption: "Our first trip",
    });

    expect(res.statusCode).toBe(201);

    expect(res.body.photo).toBeDefined();
    expect(res.body.photo.url).toBe("https://example.com/goa.jpg");
    expect(res.body.photo.type).toBe("photo");
    expect(res.body.photo.caption).toBe("Our first trip");

    expect(res.body.photo.relationshipId).toBeDefined();
    expect(res.body.photo.uploadedBy).toBeDefined();
  });

  test("Should reject photo creation when user has no relationship", async () => {
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

    const res = await agentA.post("/api/photo").send({
      url: "https://example.com/goa.jpg",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("You are not in a relationship");
  });

  test("Should reject photo creation when user is not authenticated", async () => {
    const res = await request(app).post("/api/photo").send({
      url: "https://example.com/goa.jpg",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Please login");
  });
});

describe("GET /api/photo", () => {
  test("Should return all photos for the authenticated user's relationship", async () => {
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
      .post("/api/photo")
      .send({
        url: "https://example.com/goa.jpg",
        caption: "Goa trip",
      })
      .expect(201);

    await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/anniversary.jpg",
        caption: "Anniversary",
      })
      .expect(201);

    const response = await agentA.get("/api/photo");

    expect(response.statusCode).toBe(200);

    expect(response.body.photos).toBeDefined();
    expect(response.body.photos).toHaveLength(2);

    expect(response.body.photos[0].caption).toBe("Goa trip");
    expect(response.body.photos[1].caption).toBe("Anniversary");
  });

  test("Should return an empty array when the user has no photos", async () => {
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

    const response = await agentA.get("/api/photo");

    expect(response.statusCode).toBe(200);
    expect(response.body.photos).toBeDefined();
    expect(response.body.photos).toEqual([]);
  });

  test("Should reject request when user is not authenticated", async () => {
    const response = await request(app).get("/api/photo");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("GET /api/photo/:id", () => {
  test("Should return a photo by id", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/goa.jpg",
        caption: "Goa trip",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentA.get(`/api/photo/${photoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.photo).toBeDefined();
    expect(response.body.photo._id).toBe(photoId);
    expect(response.body.photo.caption).toBe("Goa trip");
  });

  test("Should reject access to photo that does not belong to user's relationship", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/private.jpg",
        caption: "Private photo",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentC.get(`/api/photo/${photoId}`);

    expect(response.statusCode).toBe(403);
  });

  test("Should handle a malformed photo id", async () => {
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

    const response = await agentA.get("/api/photo/not-a-real-objectid");

    expect(response.statusCode).toBe(404);
  });

  test("Should return 404 for a photo id that doesn't exist", async () => {
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

    const response = await agentA.get(`/api/photo/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });

  test("Should reject unauthenticated request", async () => {
    const response = await request(app).get("/api/photo/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("PATCH /api/photo/:id", () => {
  test("Should update a photo successfully", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/goa.jpg",
        caption: "Goa trip",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentA.patch(`/api/photo/${photoId}`).send({
      caption: "Our amazing Goa trip",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.photo.caption).toBe("Our amazing Goa trip");
    expect(response.body.photo.url).toBe("https://example.com/goa.jpg");
  });

  test("Should reject updating photo that does not belong to user's relationship", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/private.jpg",
        caption: "Private photo",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentC.patch(`/api/photo/${photoId}`).send({
      caption: "Hacked caption",
    });

    expect(response.statusCode).toBe(403);
  });

  test("Should reject unauthenticated update", async () => {
    const response = await request(app).patch("/api/photo/invalid-id").send({
      caption: "Updated",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});

describe("DELETE /api/photo/:id", () => {
  test("Should delete a photo successfully", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/goa.jpg",
        caption: "Goa trip",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentA.delete(`/api/photo/${photoId}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await agentA.get(`/api/photo/${photoId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test("Should reject deleting photo that does not belong to user's relationship", async () => {
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

    const photoResponse = await agentA
      .post("/api/photo")
      .send({
        url: "https://example.com/private.jpg",
        caption: "Private photo",
      })
      .expect(201);

    const photoId = photoResponse.body.photo._id;

    const response = await agentC.delete(`/api/photo/${photoId}`);

    expect(response.statusCode).toBe(403);

    const ownerResponse = await agentA.get(`/api/photo/${photoId}`);

    expect(ownerResponse.statusCode).toBe(200);
  });

  test("Should reject unauthenticated delete", async () => {
    const response = await request(app).delete("/api/photo/invalid-id");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please login");
  });
});
