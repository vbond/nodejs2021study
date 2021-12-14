import { v4 as uuidv4 } from 'uuid';


const usersMap = new Map();

const getUser = id => {
    return usersMap.get(id);
};

const searchUser = (login, limit) => {
    const pattern = RegExp(`.*${login}.*`);

    const userResult = Array.from(usersMap.values())
        .filter(user => pattern.test(user.login) && !user.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, limit);

    return userResult;
};

const createUser = (login, password, age) => {
    const id = uuidv4();

    const user = {
        id,
        login,
        password,
        age,
        isDeleted: false
    };
    usersMap.set(id, user);

    return user;
};

const removeUser = id => {
    const user = usersMap.get(id);
    if (user && !user.isDeleted) {
        user.isDeleted = true;

        return user;
    }
};

const updateUser = (id, login, password, age) => {
    const user = usersMap.get(id);
    if (user && !user.isDeleted) {
        user.login = login;
        user.password = password;
        user.age = age;

        return user;
    }
};

export { updateUser, removeUser, createUser, searchUser, getUser };
