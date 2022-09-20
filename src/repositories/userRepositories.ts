import {users} from '@prisma/client';
import {prisma} from '../database';

export type CreateUserData = Omit<users, "id">;

async function findUserById(id: number){
    const userData = await prisma.users.findFirst({
        where:{
            id
        }
    });
    return userData;
};

async function findUserByEmail(email: string){
    const userData = await prisma.users.findFirst({
        where:{
            email
        }
    });
    return userData;
};

async function insertUser(CreateUserData: CreateUserData){
    return prisma.users.create({
        data: CreateUserData
    });
};

export default {
    findUserById,
    findUserByEmail,
    insertUser
};