import Joi from "joi";

const testSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    teacherId: Joi.number().required(),
    categoryId: Joi.number().required(),
    disciplineId: Joi.number().required()
});

export default testSchema;