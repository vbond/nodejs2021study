import express from 'express';
import { validatorBody, validatorQuery } from '../schema/schema.js';
import { modifyUser, deleteUser, instanceUser, autoSuggest, readUser } from '../controllers/userController.js';
import logger from "../logger/logger.js";

const router = express.Router();

router.use((req, res, next) => {
    logger.info("req.method=" + req.method);
    logger.info("req.url=" + req.url);
    logger.info("req.body=" + JSON.stringify(req.body));
    next();
});

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

    if (!res.statusCode || res.statusCode === 200) {
        res.status(500);
    }

    res.send(err);
});

export default router;
