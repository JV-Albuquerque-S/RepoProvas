import { getAllCategories } from "../repositories/categoryRepository";
import { Request, Response } from "express";

export async function getCategories(req: Request, res: Response){
    const categories = await getAllCategories();
    return res.send({categories});
}