const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const User = db.user;
const privateKey = "pR1b@t3k3%."
const {expireIn} = '1h';
exports.login = async (req,res) =>{
    try {
        const {body} = req;

        if(!body.email) return res.status(404).send({message: "Email es requerido"});
        if(!body.password) return res.status(404).send({message: "Password es requerido"});

        const user = await User.findOne({
            where:{
                email: body.email,
            }
        });
        if(!user && !bcrypt.compareSync(password,user.password)) return res.status(404).send({message: "Datos incorrectos"});
        
        const response ={
            id: user.id,
            username: user.username,
            email: user.email,
        };
        let token = jwt.sign({
            user: response,
        },
        privateKey,
        expireIn);

        return res.status(200).send({
            user:response,
            token,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}