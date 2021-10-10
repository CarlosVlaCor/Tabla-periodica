const db = require('../models/index');
const user = db.user;
const bcrypt = require('bcryptjs');
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
        return res.status(200).send({message: "El usuario ha sido creado"});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getUsers = async (req,res) =>{
    try {
        const find = await user.findAll();
        
        const usern = []
        for (let i = 0; i < find.length; i++) {
            ass[i] ={
                username: find[i].username,
            };
            
        }
        
        return res.status(200).send(usern);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};