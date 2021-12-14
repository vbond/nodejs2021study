import { updateUser, removeUser, createUser, searchUser, getUser } from '../services/userService.js';


const _read = (req, res) => {
    const id = req.params.id;

    const user = getUser(id);
    if (user && !user.isDeleted) {
        res.send(`user = ${JSON.stringify(user)}`);
    } else {
        res.send(`user not found, id = ${id}`);
    }
};

const _autosuggest = (req, res) => {
    const login = req.params.login;
    const limit = parseInt(req.params.limit);

    const userResult = searchUser(login, limit);

    if (userResult.length > 0) {
        res.send(`users = ${JSON.stringify(userResult)}`);
    } else {
        res.send('users not found');
    }
};

const _create = (req, res) => {
    const user = createUser(req.body.login, req.body.password, req.body.age);

    res.send(`user created, id = ${user.id}`);
};

const _delete = (req, res) => {
    const id = req.params.id;

    const user = removeUser(id);
    if (user) {
        res.send(`user removed, id = ${id}`);
    } else {
        res.send(`user not found, id = ${id}`);
    }
};

const _update = (req, res) => {
    const id = req.params.id;

    const user = updateUser(id, req.body.login, req.body.password, req.body.age);
    if (user) {
        res.send(`user updated, id = ${id}`);
    } else {
        res.send(`user not found, id = ${id}`);
    }
};

export { _update, _delete, _create, _autosuggest, _read };
