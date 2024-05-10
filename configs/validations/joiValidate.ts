import joi from "joi";
const objectId = joi.string().regex(/^[0-9a-fA-F]{24}$/); 

export const createCategoryJoi = joi.object({
    categoryName:joi.string().min(2).required(),
})

export const createNoteJoi = joi.object({
    title:joi.string().min(1).max(100).required(),
    content:joi.string().min(1).max(20000).required(),
    categoryId:joi.string().required(),
})

export const editNoteJoi = joi.object({
    title:joi.string().min(1).max(100),
    content:joi.string().min(1).max(20000),
    categoryId:joi.string(),
})


//===============================JOI VALIDATION OF USER===========================================================

export const loginJoi = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(44).required(),

})
export const registerJoi = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(44).required(),
    name:joi.string().min(1).required(),
})