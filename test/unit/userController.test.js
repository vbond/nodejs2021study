import {jest} from '@jest/globals'

let testInstance
let reqMock
let resMock
let nextMock
let userServiceMock

const userActive = {
    id: '1',
    login: 'login',
    password: 'password',
    age: 20,
    isDeleted: false
}

const userDeleted = {
    id: '2',
    login: 'login2',
    password: 'password2',
    age: 20,
    isDeleted: true
}

beforeAll(() => {
    jest.doMock('../../src/services/userService', () => userServiceMock);
})

beforeEach(() => {
    jest.resetModules()
    prepareMocks()
    testInstance = require('../../src/controllers/userController')
})

describe('readUser function test', () => {

    test('should successfully read user when user exists', () => {
        testInstance.readUser(reqMock, resMock, nextMock)

        expect(userServiceMock.getUser).toHaveBeenCalledWith('1')
        expect(resMock.send).toHaveBeenCalledWith(`user = ${JSON.stringify(userActive)}`)
    })

    test('should return status 404 when user deleted', () => {
        userServiceMock.getUser = jest.fn(() => userDeleted);

        testInstance.readUser(reqMock, resMock, nextMock)

        expect(userServiceMock.getUser).toHaveBeenCalledWith('1')
        expect(resMock.status).toHaveBeenCalledWith(404)
        expect(nextMock).toHaveBeenCalledWith('user not found, id = 1')
    })

    test('should return status 404 when user does not exist', () => {
        userServiceMock.getUser = jest.fn(() => undefined);

        testInstance.readUser(reqMock, resMock, nextMock)

        expect(userServiceMock.getUser).toHaveBeenCalledWith('1')
        expect(resMock.status).toHaveBeenCalledWith(404)
        expect(nextMock).toHaveBeenCalledWith('user not found, id = 1')
    })
});

describe('autoSuggest function test', () => {

    test('should successfully send user when search result is not empty', () => {
        testInstance.autoSuggest(reqMock, resMock, nextMock)

        expect(userServiceMock.searchUser).toHaveBeenCalledWith('login', 2)
        expect(resMock.send).toHaveBeenCalledWith(`users = ${JSON.stringify([userActive])}`)
    })

    test('should return status 404 when search result is empty', () => {
        userServiceMock.searchUser = jest.fn(() => []);

        testInstance.autoSuggest(reqMock, resMock, nextMock)

        expect(userServiceMock.searchUser).toHaveBeenCalledWith('login', 2)
        expect(resMock.status).toHaveBeenCalledWith(404)
        expect(nextMock).toHaveBeenCalledWith('users not found')
    })
});

describe('instanceUser function test', () => {

    test('should successfully create user', () => {
        testInstance.instanceUser(reqMock, resMock, nextMock)

        expect(userServiceMock.createUser).toHaveBeenCalledWith('login', 'password', 20)
        expect(resMock.send).toHaveBeenCalledWith('user created, id = 1')
    })
});

describe('deleteUser function test', () => {

    test('should successfully delete user when user exists', () => {
        testInstance.deleteUser(reqMock, resMock, nextMock)

        expect(userServiceMock.removeUser).toHaveBeenCalledWith('1')
        expect(resMock.send).toHaveBeenCalledWith('user removed, id = 1')
    })

    test('should return status 404 when user does not exist', () => {
        userServiceMock.removeUser = jest.fn(() => undefined);

        testInstance.deleteUser(reqMock, resMock, nextMock)

        expect(userServiceMock.removeUser).toHaveBeenCalledWith('1')
        expect(resMock.status).toHaveBeenCalledWith(404)
        expect(nextMock).toHaveBeenCalledWith('user not found, id = 1')
    })
});

describe('modifyUser function test', () => {

    test('should successfully modify user when user exists', () => {
        testInstance.modifyUser(reqMock, resMock, nextMock)

        expect(userServiceMock.updateUser).toHaveBeenCalledWith('1','login', 'password', 20)
        expect(resMock.send).toHaveBeenCalledWith('user updated, id = 1')
    })

    test('should return status 404 when user does not exist', () => {
        userServiceMock.updateUser = jest.fn(() => undefined);

        testInstance.modifyUser(reqMock, resMock, nextMock)

        expect(userServiceMock.updateUser).toHaveBeenCalledWith('1','login', 'password', 20)
        expect(resMock.status).toHaveBeenCalledWith(404)
        expect(nextMock).toHaveBeenCalledWith('user not found, id = 1')
    })
});

const prepareMocks = () => {
    reqMock = {
        params: {
            id: '1'
        },
        query: {
            login: 'login',
            limit: 2
        },
        body: {
            login: 'login',
            password: 'password',
            age:20
        }
    }
    resMock = {
        status: jest.fn(),
        send: jest.fn()
    }
    nextMock = jest.fn()

    userServiceMock = {
        updateUser: jest.fn(() => userActive),
        removeUser: jest.fn(() => userActive),
        createUser: jest.fn(() => userActive),
        searchUser: jest.fn(() => [userActive]),
        getUser: jest.fn(() => userActive)
    }
}
