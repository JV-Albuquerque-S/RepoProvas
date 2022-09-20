import { Request, Response } from "express";
import { CreateUserData } from "../repositories/userRepositories";
import * as authService from "../services/authService"

export async function signIn(req: Request, res: Response){
    const user:CreateUserData = req.body;
    const token = await authService.signIn(user);
    return res.send({token});
}

export async function signUp(req: Request, res: Response){
    const {email, password}:CreateUserData = req.body;
    await authService.signUp({email, password});
    res.sendStatus(201);
}