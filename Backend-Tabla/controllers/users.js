const db = require('../models/index');
const user = db.user;
const element = db.element;
const bcrypt = require('bcryptjs');
const userElement = db.userElement;

exports.createUser = async (req,res) =>{
    try {
        const {body} = req;
        if(!body.username) return res.status(404).send({message: "El username es requerido"});
        if(!body.email) return res.status(404).send({message:"El email es requerido"});
        if(!body.password) return res.status(404).send({message: "Password es requerido"});
        let encriptedPassword = bcrypt.hashSync(body.password,10);
        const create = await user.create({
            username:body.username,
            email:body.email,
            password: encriptedPassword,
        });
        const findUser = await user.findOne({
            where:{
                email: body.email,
            }
        });
        const findElements = await element.findAll();
        
        createUserElements(findUser.id,findElements);
        return res.status(200).send({message:"Creado"});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



