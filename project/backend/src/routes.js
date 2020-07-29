const express = require('express');

const UserController = require('./controllers/UserController');
const VehicleController = require('./controllers/VehicleController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/vehicles', VehicleController.index);
routes.post('/vehicles', VehicleController.create);
routes.delete('/vehicles/:id', VehicleController.delete);

module.exports = routes;