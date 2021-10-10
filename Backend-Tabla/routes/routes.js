const express = require('express');

const router= express.Router();

const users = require('../controllers/users.js');
const generalities = require('../controllers/generalities');
const type = require('../controllers/elementTypes');
const middleware = require("../middleware/authorization");
const elements = require('../controllers/elements');
//rutas para users
router.route('/users').post(users.createUser).get(users.getUsers);

//rutas para generalities
router.route("/login").post(generalities.login);


//rutas para elementType
router.route("/type").post(type.createType).get(type.getType);

//rutas para elements
router.route("/elements").post(elements.createElement);

module.exports = router;

