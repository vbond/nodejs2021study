import express from 'express';
import { validatorBody, validatorQuery } from '../schema/schema.js';
import { modifyUser, deleteUser, instanceUser, autoSuggest, readUser } from '../controllers/userController.js';
import logger from "../logger/logger.js";

const router = express.Router();

router.get('/users/:id', readUser);

router.get('/users', validatorQuery, autoSuggest);

router.post('/users', validatorBody, instanceUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', validatorBody, modifyUser);

router.use((err, req, res, next) => {
    logger.error(`req.method: ${req.method}`);
    logger.error(`req.url: ${req.url}`);
    logger.error(`req.body: ${JSON.stringify(req.body)}`);
    logger.error(`message: ${err}`);

    res.send(err);
});

export default router;
