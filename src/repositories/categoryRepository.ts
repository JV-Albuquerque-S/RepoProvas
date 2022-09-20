import { prisma } from "../database";

export async function getCategoryById(id: number){
    const foundCategory = await prisma.categories.findFirst({
        where:{
            id
        }
    });
    return foundCategory;
};

export async function getAllCategories(){
    const categories = await prisma.categories.findMany({});
    return categories;
}
