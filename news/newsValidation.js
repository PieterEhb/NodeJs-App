import joi from 'joi';

export const createNewsValidation = joi.object().keys({
    title: joi.string().min(3).max(50).required(),
    content: joi.string().min(10).max(10000).required(),
    userId: joi.number().greater(0).required()
});

export const updateNewsValidation = joi.object().keys({
    title: joi.string().min(3).max(50).required(),
    content: joi.string().min(10).max(10000).required(),
});

