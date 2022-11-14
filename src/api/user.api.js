const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

module.exports = function () {
    router.get('/', UserController.getAllUser);
    router.post('/create', UserController.createUser);
    router.post('/validate', UserController.validateUser);
    router.post('/:id/verify/:token', UserController.verifyUser);
    router.get('/verify-email', UserController.verifyEmail);
    router.post('/getUser', UserController.getUserByEmail);
    router.post('/createGoogleUser', UserController.createGoogleUser);
    router.put('/updateUser', UserController.updateUser);
    router.get('/:id', UserController.getUserById);
    router.delete('/:id', UserController.deleteUser);
    router.get('/search/:search', UserController.searchUser);

    return router;
}
