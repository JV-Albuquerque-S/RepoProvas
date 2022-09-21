import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../database";

const secret = process.env.JWT_SECRET || "g64s48g468dfg468d468g84zd468h468z68dt48h";

export default async function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw { status: 401, message: "missing token" };
    //
    // --------- FALAR COM ADRIANO SOBRE O ERRO DO JWT ------------
    //
    try {
        const data = jwt.verify(token, secret) as JwtPayload;

        const user = await prisma.users.findFirst({
            where: {
                email: data.email,
            },
        });

        if (!user) throw { status: 404, message: "user not found" };

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        throw { status: 401, message: "invalid token" };
    }
}