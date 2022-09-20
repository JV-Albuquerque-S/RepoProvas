import app from "../src/app.js";
import supertest from "supertest";

describe("POST /auth/sign-up", () => {
    it("409 on email already registered", async () => {
        const body = { email: "admin@gmail.com", password: "1234567890", confirmPassword:"1234567890" };
        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(409);
    });
    it("422 on password no matching", async () => {
        const body = { email: "admin@gmail.com", password: "1234567890", confirmPassword:"1234567809" };
        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(422);
    });
    it("201 on valid input", async () => {
        const body = { email: "jose@gmail.com", password: "1234567890", confirmPassword:"1234567890" };
        const response = await supertest(app).post("/sign-up").send(body);
        const status = response.status;

        expect(status).toEqual(201);
    });
});

describe("POST /auth/login", () => {
    it("422 on empty body", async () => {
        const response = await supertest(app).post("/sign-in").send({});
        const status = response.status;

        expect(status).toEqual(422);
    });
    it("401 on wrong password", async () => {
        const body = { email: "admin@gmail.com", password: "1234567980" };
        const response = await supertest(app).post("/sign-in").send(body);
        const status = response.status;

        expect(status).toEqual(401);
    });
    it("token on valid input", async () => {
        const body = { email: "admin@gmail.com", password: "1234567890" };
        const response = await supertest(app).post("/sign-in").send(body);
        const token = response.body.token;

        expect(token).not.toBeNull();
    });
});