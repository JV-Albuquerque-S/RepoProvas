import { Request, Response } from "express";
import { TestSchemaData } from "../repositories/testRepository";
import * as testService from "../services/testService"

export async function postTest(req: Request, res: Response){
    const TestData: TestSchemaData = req.body;
    await testService.createTest(TestData);
    res.sendStatus(201)
}

export async function getTestsByTeacher(req: Request, res: Response){
    const tests = await testService.getTestsByTeacher();
    res.send({tests});
}

export async function getTestsByDiscipline(req: Request, res: Response){
    const tests = await testService.getTestsByDiscipline();
    res.send({tests});
}