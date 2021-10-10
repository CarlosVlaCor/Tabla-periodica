const jwt = require('jsonwebtoken');

const privateKey = 'pR1b@t3k3%.';

exports.verifyToken = async (req,res,next) =>{
    try {
        const token = req.get('token');

        const decoded = jwt.verify(token,privateKey);

        req.user = decoded.user;

        next();
    } catch (error) {
        return res.status(505).send({message: "Token no valido"});
    }
};