import * as testRepository from "../repositories/testRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository"
import { TestSchemaData } from "../repositories/testRepository";

export async function getTestsByTeacher() {
    const tests = await testRepository.testsGroupedByTeacher();
    return tests
  }

  export async function getTestsByDiscipline() {
    const tests = await testRepository.testsGroupedByDiscipline();
    return tests
  }

  export async function createTest(TestData: TestSchemaData){
      const category = await categoryRepository.getCategoryById(TestData.categoryId);
      if (!category) throw {status: 401, message: "category not found"};
      const teacherDiscipline = await teacherDisciplineRepository.teacherDisciplineRelation(TestData.teacherId, TestData.disciplineId);
      if(!teacherDiscipline) throw {status: 401, message: "Relation not found"};
      const insertData: testRepository.TestInsertData = {
        teacherDisciplineId: teacherDiscipline.id,
        categoryId: TestData.categoryId,
        name: TestData.name,
        pdfUrl: TestData.pdfUrl
      };
      await testRepository.insertTest(insertData);
  };