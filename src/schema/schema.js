import joi from 'joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({});
const bodySchema = joi.object({
    login: joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),

    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required(),

    age: joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

const querySchema = joi.object({
    login: joi.string()
        .alphanum()
        .default(''),

    limit: joi.number()
        .default(10)
});

const validatorBody = validator.body(bodySchema)
const validatorQuery = validator.query(querySchema)

export { validatorBody, validatorQuery }
