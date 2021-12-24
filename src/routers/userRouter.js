import express from 'express';
import { validatorBody, validatorQuery } from '../schema/schema.js';
import { modifyUser, deleteUser, instanceUser, autoSuggest, readUser } from '../controllers/userController.js';


const router = express.Router();

router.get('/users/:id', readUser);

router.get('/users', validatorQuery, autoSuggest);

router.post('/users', validatorBody, instanceUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', validatorBody, modifyUser);

export default router;
