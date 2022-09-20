import {user} from '@prisma/client';
import {prisma} from '../database';

export type CreateUserData = Omit<user, "id">;

async function findUserById(id: number){
    const userData = await prisma.user.findFirst({
        where:{
            id
        }
    });
    return userData;
};

async function findUserByEmail(email: string){
    const userData = await prisma.user.findFirst({
        where:{
            email
        }
    });
    return userData;
};

async function insertUser(CreateUserData: CreateUserData){
    return prisma.user.create({
        data: CreateUserData
    });
};

export default {
    findUserById,
    findUserByEmail,
    insertUser
};