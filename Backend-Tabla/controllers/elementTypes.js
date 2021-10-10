
const db = require('../models/index');
const elementType = db.elementType;

exports.createType = async (req, res) =>{
    try {
       
        const {body} = req;
        console.log("AAA");
        if(!body.type) return res.status(404).send({message:"AA"});
        
        const create = await elementType.create({
            type: body.type,
        });
        return res.status(200).send({message:"a"});
    
    } catch (error) {
        return res.status(500).send({message:"BBBBBBBBB"});
    }
};

exports.getType = async (req,res) =>{
    try {
        const regresar = await elementType.findAll();
        return res.status(200).send(regresar);
    } catch (error) {
        return res.status(500).send(message.error);
        
    }
};