import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

import userRepository from '../repositories/userRepositories';
import { CreateUserData } from '../repositories/userRepositories';

const secret = process.env.JWT_SECRET || "g64s48g468dfg468d468g84zd468h468z68dt48h";

export async function signIn(userData: CreateUserData){
    const user = await userRepository.findUserByEmail(userData.email);
    if(!user) throw {status: 401, message: "Invalid credentials teste"};
    const validPassword = bcrypt.compareSync(userData.password, user.password);
    if(!validPassword) throw {status: 401, message:"Invalid credentials"}
    //
    // --------- FALAR COM ADRIANO SOBRE O ERRO DO JWT ------------
    //
    const token = jwt.sign({userId: user.id}, secret);
    return token;
}

export async function signUp(createUserData: CreateUserData){
    const alreadyExist = await userRepository.findUserByEmail(createUserData.email);
    if(alreadyExist) throw {status: 409, message: "Email already used"}
    const hashedPassword = bcrypt.hashSync(createUserData.password, bcrypt.genSaltSync());
    await userRepository.insertUser({...createUserData, password: hashedPassword});
}