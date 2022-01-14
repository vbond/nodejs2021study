import { updateUser, removeUser, createUser, searchUser, getUser, usersMap } from '../../src/services/userService';

const user1 = {
    id: '1',
    login: 'login',
    password: 'password',
    age: 20,
    isDeleted: false
}
const user2 = {
    id:'2',
    login:'login2',
    password:'password',
    age:22,
    isDeleted: false
}
const user3 = {
    id:'3',
    login:'login3',
    password:'password',
    age:24,
    isDeleted: true
}

beforeEach(() => {
    prepareData();
})

describe('getUser function test', () => {

    test('should successfully get user when user exists', () => {
        const result = getUser('2');

        expect(result).toEqual(user2);
    })

    test('should not get user when user does not exist', () => {
        const result = getUser('4');

        expect(result).toBeUndefined();
    })

});

describe('searchUser function test', () => {

    test('should return active sorted users when search matches', () => {
        const result = searchUser('login', 10)

        expect(result).toEqual([user1, user2]);
    })

    test('should return active user when search matches with limit 1', () => {
        const result = searchUser('login', 1)

        expect(result).toEqual([user1]);
    })

    test('should return empty result when search does not match', () => {
        const result = searchUser('login123', 10)

        expect(result).toEqual([]);
    })
});

describe('createUser function test', () => {

    test('should successfully create user', () => {
        const result = createUser('login123', 'password', 25);

        expect(result).toEqual(usersMap.get(result.id));
        expect(result.login).toEqual('login123');
        expect(result.password).toEqual('password');
        expect(result.age).toEqual(25);
    })
});

describe('removeUser function test', () => {

    test('should successfully delete user when user is active', () => {
        const result = removeUser('1')

        expect(result).toBeDefined();
        expect(result.isDeleted).toBeTruthy();
        expect(result).toEqual(usersMap.get('1'));
    })

    test('should not delete user when user is inactive', () => {
        const result = removeUser('3')

        expect(result).toBeUndefined()
    })

    test('should not delete user when user does nit exist', () => {
        const result = removeUser('5')

        expect(result).toBeUndefined()
    })
});

describe('updateUser function test', () => {

    test('should successfully modify user when active user exists', () => {
        const result = updateUser('2', 'login456', 'password123', 59)

        expect(result).toEqual(usersMap.get(result.id));
        expect(result.login).toEqual('login456');
        expect(result.password).toEqual('password123');
        expect(result.age).toEqual(59);
    })

    test('should not update user when user is inactive', () => {
        const result = updateUser('3', 'login456', 'password123', 59)

        expect(result).toBeUndefined()
    })

    test('should not update user when user does not exist', () => {
        const result = updateUser('5', 'login456', 'password123', 59)

        expect(result).toBeUndefined()
    })
});

const prepareData = () => {
    usersMap.clear();

    usersMap.set('1', user1);
    usersMap.set('2', user2);
    usersMap.set('3', user3);
}
