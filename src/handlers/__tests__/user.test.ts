import request from "supertest";
import prisma from "../../db";
import { createJWT, hashPassword } from "../../modules/auth";
import { app } from "../../server";

describe("User handlers", () => {
  let user;
  let token;

  beforeAll(async () => {
    // Create a test user
    const hashedPassword = await hashPassword("password");
    user = await prisma.user.create({
      data: {
        username: "test@example.com",
        password: hashedPassword,
      },
    });

    // Generate a JWT token for the test user
    token = createJWT(user.id);
  });

  afterAll(async () => {
    // Delete the test user
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ["test@example.com", "newuser@example.com"],
        },
      },
    });

    // Disconnect Prisma client
    await prisma.$disconnect();
  });

  describe("POST /user", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/user")
        .send({
          username: "newuser@example.com",
          password: "password",
        })
        .expect(201);

      expect(response.body.token).toBeTruthy();
    });
  });

  it("should return a 400 error if username is missing", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        password: "password",
      })
      .expect(400);

    // expect(response.body).toMatchObject({
    //   error: "username is required",
    // });
  });

  it("should return a 400 error if password is missing", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        username: "newuser@example.com",
      })
      .expect(400);

    //   expect(response.body).toMatchObject({
    //     error: "Password is required",
    //   });
    // });
  });

  describe("POST /signin", () => {
    it("should sign in a user with valid credentials", async () => {
      const response = await request(app)
        .post("/signin")
        .send({
          username: "test@example.com",
          password: "password",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        token: expect.any(String),
      });
    });

    it("should return a 401 error if username is incorrect", async () => {
      const response = await request(app)
        .post("/signin")
        .send({
          username: "wrong@example.com",
          password: "password",
        })
        .expect(401);

      //   expect(response.body).toMatchObject({
      //     error: "Invalid email or password",
      //   });
    });

    it("should return a 401 error if password is incorrect", async () => {
      const response = await request(app)
        .post("/signin")
        .send({
          username: "test@example.com",
          password: "wrongpassword",
        })
        .expect(401);

      //   expect(response.body).toMatchObject({
      //     error: "Invalid email or password",
      //   });
    });
  });
});
