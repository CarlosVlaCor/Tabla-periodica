const express = require('express');

const router= express.Router();

const users = require('../controllers/users.js');
const generalities = require('../controllers/generalities');
const type = require('../controllers/elementTypes');
const middleware = require("../middleware/authorization");
const elements = require('../controllers/elements');
const userElement = require('../controllers/userElements');
//rutas para users
router.route('/users').post(users.createUser);
//rutas para generalities
router.route("/login").post(generalities.login);


//rutas para elementType
//router.route("/type").post(type.createType);

//rutas para elements
//router.route("/elements").post(elements.createElement).get(elements.getElement);

//rutas para usserElements
router.route("/userElement").post(middleware.verifyToken,userElement.createElement).get(middleware.verifyToken,userElement.getElementsPro);
router.route("/userElement/:name").put(middleware.verifyToken,userElement.putElement).delete(middleware.verifyToken,userElement.deleteElement);
router.route("/userElementNr").get(userElement.getElementsNr);
module.exports = router;

