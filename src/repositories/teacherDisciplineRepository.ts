import { prisma } from "../database";

export async function teacherDisciplineRelation(teacherId: number, disciplineId: number){
    const relation = await prisma.teacherDisciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    });
    return relation
};