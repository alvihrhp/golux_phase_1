'use strict';

const express = require('express');
const routes = express.Router();
const HomeController = require('../controllers/HomeController');

routes.get('/', HomeController.getHome);

routes.get('/register', HomeController.registerForm);

routes.post('/register', HomeController.registerAction);

routes.get('/login', HomeController.loginForm);

routes.post('/login', HomeController.loginAction);

routes.get('/profile', HomeController.profile);

routes.get('/logout', HomeController.logoutAction);

routes.get('/contact', HomeController.contact);

module.exports = routes;