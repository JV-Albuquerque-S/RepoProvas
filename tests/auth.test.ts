import app from "../src/app";
import supertest from "supertest";
import {prisma} from "../src/database"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
});

describe("POST /auth/sign-up", () => {
    it("409 on email already registered", async () => {
        const body = {
            email: "abc@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        };
        await supertest(app).post("/sign-up").send(body);
        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(409);
    });

    it("422 on password no matching", async () => {
        const body = {
            email: "abc@gmail.com",
            password: "123",
            confirmPassword:"124"
        };

        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(422);
    });

    it("201 on valid input", async () => {
        const body = {
            email: "abcde@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        }
        ;
        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(201);
    });
});

describe("POST /auth/sign-in", () => {
    it("422 on empty body", async () => {
        const response = await supertest(app).post("/sign-in").send({});
        const status = response.status;

        expect(status).toEqual(422);
    });

    it("401 on wrong password", async () => {
        const body = {
            email: "abc@gmail.com",
            password: "122"
        };

        const response = await supertest(app).post("/sign-in").send(body);
        const status = response.status;

        expect(status).toEqual(401);
    });

    it("token on valid input", async () => {
        const body = {
            email: "abc@gmail.com",
            password: "123"
        };

        const response = await supertest(app).post("/sign-in").send(body);
        const token = response.body.token;

        expect(token).not.toBeNull();
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});