
jest.mock('../db.js', () => {
    const db = require('./test_db');
    return db;
});

const User = require('../models/user');

describe('user.js tests', function () {
    it('getUser() Success', async () => {
        var testUser = {
            age: 15,
            username: 'user_a'
        };
        let newUser = await User.db.collection('users').doc('getUserTest').set(testUser);
        return await User.getUser('getUserTest').then(user => {expect(user).toEqual(testUser)});
    })

    it('getUser() Failure', async () => {
        return await User.getUser('non-existantUser').then().catch(err => {expect(err).toEqual(new Error('Cannot find user in the database.'))});
    })

    test("getAvgRating() Success", () => {
        let ratings = [0, 0, 1, 2, 3, 4, 5];
        expect(User.getAvgRating(ratings)).toBe((15/7));
    });

    test("getAvgRating() Failure", () => {
        let ratings = [];
        expect(User.getAvgRating(ratings)).toBe(-1);
    });

    test("getDeviceTokens() Success", () => {
        let testUsers = [
            {
                "deviceToken": "JonDeviceToken",
                "userName": "Jon Smith",
                "userID": "10157425230694386",
                "gender": "Male",
                "age": 21,
                "preferences": {
                    "proximity": -1,
                    "other": true,
                    "ageMax": 80,
                    "ageMin": 18,
                    "female": true,
                    "male": true
                }
            },
            {
                "userID": "10215891348511047",
                "gender": "Male",
                "rating": 0.5,
                "age": 21,
                "preferences": {
                    "ageMin": 1,
                    "female": true,
                    "male": true,
                    "proximity": 100,
                    "other": true,
                    "ageMax": 55
                },
                "deviceToken": "CormacDeviceToken",
                "userName": "Cormac Mollitor",
                "ratingHistory": [
                    0,
                    1
                ]
            },
            {
                "ratingHistory": [
                    3,
                    3,
                    3,
                    2,
                    4,
                    5,
                    0,
                    5
                ],
                "userID": "1146564348829220",
                "gender": "Female",
                "rating": 3.125,
                "age": 21,
                "preferences": {
                    "female": true,
                    "male": true,
                    "proximity": 2,
                    "other": true,
                    "ageMax": 25,
                    "ageMin": 18
                },
                "deviceToken": "LisaDeviceToken",
                "userName": "Lisa Kirby"
            },
            {
                "userName": "Changed Test User",
                "ratingHistory": [
                    1,
                    3,
                    2,
                    4,
                    7,
                    5,
                    0,
                    5
                ],
                "userID": "testID",
                "gender": "Other",
                "rating": 3.375,
                "age": 80,
                "preferences": {
                    "female": true,
                    "male": false,
                    "proximity": 5,
                    "other": true,
                    "ageMax": 80,
                    "ageMin": 0
                },
                "deviceToken": "TestUserDeviceToken"
            }
        ];
        let tokens = ["JonDeviceToken", "CormacDeviceToken", "LisaDeviceToken", "TestUserDeviceToken"];
        expect(User.getDeviceTokens(testUsers)).toEqual(tokens);
    });

    test("getDeviceTokens() Failure", () => {
        let testUsers = [];
        let tokens = [];
        expect(User.getDeviceTokens(testUsers)).toEqual(tokens);
    });


    test("getUserProfiles() Success", () => {
        let testUser = {
            "ratingHistory":[1,3,2,4,7,5,0,5],
            "userID":"testID",
            "gender":"Other",
            "rating":3.375,
            "age":80,
            "preferences":
            {
                "ageMin":0,
                "female":true,
                "male":false,
                "proximity":5,
                "other":true,
                "ageMax":80
            },
            "deviceToken":"TestUserDeviceToken",
            "userName":"Test User"
        };
        let profile = {
                "userID": "testID",
                "userName": "Test User",
                "age": 80,
                "gender": "Other",
                "rating": 3.375
            };
        let userArr = [];
        userArr.push(testUser);
        expect(User.getUserProfiles(userArr).length).toBe(1);
        expect(User.getUserProfiles(userArr)[0]).toEqual(profile);
    });

    test("getUserProfiles() Failure", () => {
        let userArr = [];
        expect(User.getUserProfiles(userArr).length).toBe(0);
        expect(User.getUserProfiles(userArr)[0]).toEqual(undefined);
    });
});