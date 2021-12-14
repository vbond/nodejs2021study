import joi from 'joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({});
const schema = joi.object({
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

export default validator.body(schema);
