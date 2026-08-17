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
