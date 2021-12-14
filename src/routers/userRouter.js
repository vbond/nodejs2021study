import express from 'express';
import validator from '../schema/schema.js';
import { _update, _delete, _create, _autosuggest, _read } from '../controllers/userController.js';


const router = express.Router();

router.get('/user/:id', _read);

router.get('/users/:login/:limit', _autosuggest);

router.post('/user', validator, _create);

router.delete('/user/:id', _delete);

router.put('/user/:id', validator, _update);

export default router;
