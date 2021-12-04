
const db = require('../models/index');
const elementType = db.elementType;

exports.createType = async (req, res) =>{
    try {
       
        const {body} = req;
    
        if(!body.type) return res.status(404).send({message:"AA"});
        
        const create = await elementType.create({
            type: body.type,
        });
        return res.status(200).send({message:"Creado"});
    
    } catch (error) {
        return res.status(500).send({message:"Error"});
    }
};

