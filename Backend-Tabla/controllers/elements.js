
const db = require('../models/index');
const element = db.element;
const uploadImages= require('../utils/uploadImages');
const elementType = db.elementType;
exports.createElement = async (req,res) =>{
    try {
        const {body} = req;
        if(!body.name) return res.status(404).send({message:"Se olvidó el name"});
        if(!body.atomicSymbol) return res.status(404).send({message:"Se olvidó el atomicSymbol"});
        if(!body.atomicNumber) return res.status(404).send({message:"Se olvidó el atomicNumber"});
        if(!body.atomicMass) return res.status(404).send({message:"Se olvidó el atomicMass"});
        if(!body.group) return res.status(404).send({message:"Se olvidó el group"});
        if(!body.period) return res.status(404).send({message:"Se olvidó el period"});
        if(!body.image) return res.status(404).send({message:"Se olvidó el image"});
        if(!body.elementTypeId)return res.status(404).send({message:"A"});
        
        let imagen = await uploadImages.fileUpload(body.image,'/images',body.name);
       console.log(imagen);
        const create = await element.create({
            name: body.name,
            atomicSymbol:body.atomicSymbol,
            atomicNumber: body.atomicNumber,
            atomicMass: body.atomicMass,
            group: body.group,
            period: body.period,
            elementTypeId: body.elementTypeId,
            image: imagen,
        });
        
        return res.status(200).send({message: "Creado"});
    } catch (error) {
        return res.status(500).send(message.error);
    }
}
exports.getElement = async (req,res) =>{
    try {
        const {name }= req.query;
        const find = await element.findOne({
            where:{name:name},
            include:{model:elementType}
        });
        console.log(name);
        return res.status(200).send(find);
    } catch (error) {
        
    }
}
