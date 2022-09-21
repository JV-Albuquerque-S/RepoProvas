import app from "../src/app";
import { prisma } from "../src/database";
import supertest from "supertest";

//const token = {authorization: ""};

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`;

    /*const body = {
        email: "abc@gmail.com",
        password: "12345"
    };
    const registerBody = {
        email: "abc@gmail.com",
        password: "12345",
        confirmPassword:"12345"
    };
    await supertest(app).post("/sign-up").send(registerBody);
    const auth = await supertest(app).post("/sign-in").send(body);
    token.authorization = auth.body.token;*/
});

describe("POST /tests", () => {
    it("401 on missing token", async () => {
        const body = {
            name: "CSS Test",
            pdfUrl: "https://www.google.com/pdf",
            categoryId: 3,
            disciplineId: 2,
            teacherId: 4,
        };
        const response = await supertest(app).post("/tests").send(body);
        const status = response.status;

        expect(status).toEqual(401);
    });
    it("401 on teacherDiscipline not found", async () => {
        const loginBody = {
            email: "abc@gmail.com",
            password: "12345"
        };

        const registerBody = {
            email: "abc@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        };

        await supertest(app).post("/sign-up").send(registerBody);
        const token = (await supertest(app).post("/sign-in").send(loginBody)).body.token;
        console.log(token);

        const body = {
            name: "CSS Test",
            pdfUrl: "https://www.google.com/pdf",
            categoryId: 3,
            disciplineId: 9999999999,
            teacherId: 4,
        };
        const response = await supertest(app).post("/tests").set(token).send(body);
        const status = response.status;

        expect(status).toEqual(401);
    });
    it("401 on category not found", async () => {
        const loginBody = {
            email: "abc@gmail.com",
            password: "12345"
        };

        const registerBody = {
            email: "abc@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        };

        await supertest(app).post("/sign-up").send(registerBody);
        const token = (await supertest(app).post("/sign-in").send(loginBody)).body.token;
        console.log(token);

        const body = {
            name: "CSS Test",
            pdfUrl: "https://www.google.com/pdf",
            categoryId: 9999999999999,
            disciplineId: 2,
            teacherId: 4,
        };
        const response = await supertest(app).post("/tests").set(token).send(body);
        const status = response.status;

        expect(status).toEqual(401);
    });
    it("422 on invalid input", async () => {
        const loginBody = {
            email: "abc@gmail.com",
            password: "12345"
        };

        const registerBody = {
            email: "abc@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        };

        await supertest(app).post("/sign-up").send(registerBody);
        const token = (await supertest(app).post("/sign-in").send(loginBody)).body.token;
        console.log(token);

        const body = {
            name: "CSS Test",
            pdfUrl: "https://www.google.com/pdf",
            categoryId: 3
        };
        const response = await supertest(app).post("/tests").set(token).send(body);
        const status = response.status;

        expect(status).toEqual(422);
    });
    it("201 on valid input", async () => {
        const loginBody = {
            email: "abc@gmail.com",
            password: "12345"
        };

        const registerBody = {
            email: "abc@gmail.com",
            password: "12345",
            confirmPassword:"12345"
        };

        await supertest(app).post("/sign-up").send(registerBody);
        const token = (await supertest(app).post("/sign-in").send(loginBody)).body.token;
        console.log(token);
        
        const body = {
            name: "CSS Test",
            pdfUrl: "https://www.google.com/pdf",
            categoryId: 3,
            disciplineId: 2,
            teacherId: 4,
        };
        const response = await supertest(app).post("/tests").set(token).send(body);
        const status = response.status;
        console.log("token aqui ó:"+typeof token);

        expect(status).toEqual(201);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
})