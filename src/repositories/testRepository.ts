import { tests } from "@prisma/client";
import { prisma } from "../database";

export type TestSchemaData = Omit<tests, "id"|"teacherDisciplineId"> & {teacherId: number, disciplineId:number}
export type TestInsertData = Omit<tests, "id">

export async function testsGroupedByTeacher(){
    const tests = await prisma.teacherDisciplines.findMany({
        include: {
            disciplines: {
                include: {
                    terms: true
                }
            },
            teachers: true,
            tests: {
                include: {
                    categories: true
                }
            }
        }
    });

    return tests;
};

export async function testsGroupedByDiscipline(){
    const tests = await prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        select: {
                            teachers: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categories: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return tests;
};

export async function insertTest(TestData:TestInsertData){
    await prisma.tests.create({
        data:{...TestData}
    });
};