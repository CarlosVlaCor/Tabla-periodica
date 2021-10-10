const express = require('express');

const router= express.Router();

const users = require('../controllers/users.js');
const generalities = require('../controllers/generalities');

const middleware = require("../middleware/authorization");
//rutas para users
router.route('/users').post(users.createUser).get(users.getUsers);

//rutas para generalities
router.route("/login").post(generalities.login);
module.exports = router;


