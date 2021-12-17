import { updateUser, removeUser, createUser, searchUser, getUser } from '../services/userService.js';


const readUser = (req, res, next) => {
    const id = req.params.id;

    const user = getUser(id);
    if (user && !user.isDeleted) {
        res.send(`user = ${JSON.stringify(user)}`);
    } else {
        res.status(404);
        next(`user not found, id = ${id}`);
    }
};

const autoSuggest = (req, res, next) => {
    const login = req.query.login;
    const limit = req.query.limit;

    const userResult = searchUser(login, limit);

    if (userResult.length > 0) {
        res.send(`users = ${JSON.stringify(userResult)}`);
    } else {
        res.status(404);
        next('users not found');
    }
};

const instanceUser = (req, res, next) => {
    const user = createUser(req.body.login, req.body.password, req.body.age);

    res.send(`user created, id = ${user.id}`);
};

const deleteUser = (req, res, next) => {
    const id = req.params.id;

    const user = removeUser(id);
    if (user) {
        res.send(`user removed, id = ${id}`);
    } else {
        res.status(404);
        next(`user not found, id = ${id}`);
    }
};

const modifyUser = (req, res, next) => {
    const id = req.params.id;

    const user = updateUser(id, req.body.login, req.body.password, req.body.age);
    if (user) {
        res.send(`user updated, id = ${id}`);
    } else {
        res.status(404);
        next(`user not found, id = ${id}`);
    }
};

export { modifyUser, deleteUser, instanceUser, autoSuggest, readUser };
