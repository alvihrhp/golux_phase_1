'use strict';

const express = require('express');
const routes = express.Router();
const checkBookAuthorization = require('../middleware/checkBookAuthorization');
const FleetController = require('../controllers/FleetController');

routes.get('/', FleetController.getList);

routes.get('/sedan', FleetController.getSedanCar);

routes.get('/suv', FleetController.getSuvCar);

routes.get('/sport', FleetController.getSportsCar);

routes.get('/minibus', FleetController.getMinibus);

routes.get('/detail/:id', FleetController.detail);

routes.get('/book/:id', checkBookAuthorization, FleetController.bookForm);

routes.post('/book/:id', FleetController.bookAction);

module.exports = routes;