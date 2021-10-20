const  sequelize  = require('sequelize');
const Op  =sequelize.Op;

const db = require('../models/index');
const userElement = db.userElement;
const element = db.element;
const elementType = db.elementType;
exports.createElement = async (req,res) =>{
    try {
        const {body} = req;
        if(!body.name) return res.status(404).send({message: "Se requiere el name"});
        if(body.name=== 'All'){
            const uS = await userElement.findAll({where:{statusDelete:true,userId:user.id}});
            for (let i = 0; i < uS.length; i++) {
                uS[i].statusDelete =false;
               
  
            }
            uS.save();
            return res.status(200).send({message:"Eliminados todos los elementos"});
        }
        const find = await element.findOne({
            where:{
                name: body.name,
               
            }
        });
    
        if(!find) return res.status(404).send({message: "No hay un elemento con ese nombre"});
       
        const found = await element.findOne({
            where:{
                elementId : find.id,
                statusDelete : true,
            }
        });
        if(!found) return res.status(404).send({message:"El elemento ya se existe"});

        found.statusDelete = false;
        
        found.save();
       
        return res.status(200).send({message:"Elemento creado"});
    } catch (error) {
        return res.status(500).send(message.error);
    }
    
}
exports.getElementsPro = async (req,res) =>{
    try {
        const user = req.user;
        const {ord} = req.query;
        //Si se desea ordenar por
        if(ord){
            const userElements = await userElement.findAll({
                where:{
                    userId : user.id,
                    statusDelete:false,
                }
            });
            
            const elements = [];
            for (let i = 0; i < userElements.length; i++) {
                elements[i]= await element.findByPk(userElements[i].elementId,{
                    include:{model:elementType},
                });
    
            }
            
            const errors = {
                1 :" No se encontró ese dato del elemento",
                2 :  "Es necesario ordType",
                3 : "Se necesita la forma de ordenar",
                4 : "Solo se puede ordenar de manera ASC y DES",
                5 : "No se puede buscar",
                6 : "No se pueden repetir tipos",
            }
            const result = await ordenElementos(elements,ord,req);
            
            if(result !== 'number'){
                return res.status(200).send(result);
            }else{
                return res.status(404).send({message: errors[result]})
            }
        }
        //127.0.0.1:3000/api/userElement?busqueda=Hidrógeno&Oxígeno&...
        const {busqueda} = req.query;
        if(busqueda){
            const result=await obtenerVariosValores(busqueda);
        }
        
        ////127.0.0.1:3000/api/userElement
        const elements = await userElement.findAll({
            where:{
                userId:user.id,
                statusDelete:false,
            },
        });
        console.log(elements)
        const get = [];
        for (let i = 0; i < elements.length; i++) {
                get[i]= await element.findByPk(elements[i].elementId,{
                    include:{model:elementType},
                });
    
        }
        const ordElements = await ordenNumAtomico('ASC',get)
        return res.status(200).send(ordElements);

    } catch (error) {
        return res.status(500).send({message:"Ocurrió un error"});
    }
    
    
}
exports.getElementsNr = async (req,res) =>{
    try {
        const find = await element.findAll({
            include:{model:elementType},
            order:[['atomicNumber','ASC']]
        });
        return res.status(200).send({message: "Para poder modificar y obtener de diferentes maneras debes registrarte",find});
    } catch (error) {
        return res.status(500).send({message: "Ocurrió un error."})
        
    }
}
async function obtenerVariosValores(busqueda){
    const result=[];
    for (let i = 0; i < busqueda.length; i++) {
        let find = await element.findOne({
            where:{name:busqueda[i]}
        });
        let find2 = await userElement.findOne({
            where:{statusDelete:false,
                elementId:find.id},
        })
        if(find2){
            result[i] = find2;
        }else{
            result[i] = {message:"No es encontró " + busqueda[i] + " entre tus elementos"};
        }
    }
    return result;
}
//127.0.0.1:3000/api/userElement/Hidrógeno
exports.putElement = async ( req,res) =>{
    try {
        const {body,params} = req;
        if(!params.name) return res.status(404).send({message:"Se requiere name"});
        if(!body.position) return res.status(404).send({message: "Se requiere la position a donde será cambiado el elemento"});
        if(body.position <= 0 && body.position >= 119) return res.status(500).send("Se debe colocar un número entre el 1 al 118");
        const find = await userElement.findOne({
            name : params,
        });
        const a = find.elementId;
        find.elementId = body.position;
        find.save();
        const find2 = await userElement.findByPk(body.position);
        find2.elementId = a;
        find2.save();

        
        return res.status(200).send({message:"Modificado"});
    } catch (error) {
        return res.status(500).send({message: "Ocurrió un problema"});
    }
}
//127.0.0.1:3000/api/userElement/Hidrógeno
exports.deleteElement = async (req,res) =>{
    try {
        const {name} = req.params;
        const {user} = req.user;
        if(!name) return res.status(404).send({message: "Es necesario el nombre para eliminar"});
        if(name === 'All'){
            const uS = await userElement.findAll({where:{statusDelete:false,userId:user.id}});
            for (let i = 0; i < uS.length; i++) {
                uS[i].statusDelete =true;
                
            }
            uS.save();
            return res.status(200).send({message:"Eliminados todos los elementos"});
  
        }
        const find = await element.findOne({
            where:{

                name: name,
            },
        });
        if(!find) return res.status(404).send({message: "No existe ningún elemento con ese nombre"});
        const find2 = await userElement.findOne({
            where:{
                userId : user.id,
                elementId: find.id,
            }
        });
        if(find2.statusDelete === true) return res.status(404).send({message:"No se encontró elemento."});
        find2.statusDelete = true;
        find2.save();
        return res.status(200).send({message:"Eliminado"});
    } catch (error) {
        return res.status(500).send({message: "Ocurrió un problema"});
    }
}

async function ordenElementos(elements,tipoOrd,req){
    //127.0.0.1:3000/api/userElement?ord=element&ordType=numAtomico&forma=ASC
    if(tipoOrd === 'element'){
        //Obtener elementos 

        const {ordType} = req.query;
        console.log(ordType);
        if(!ordType) return 2;
         
         //Comprobar la segunda query
         const {forma} = req.query;
         if(!forma) return 3;
         if(forma!=='DES' && forma !== 'ASC') return 4;
        
         const ord ={
             numAtomico: ordenNumAtomico,
             masaAtomica: ordenMasaAtomica,
             alfabetico: ordenAlfabetico,
         }
         if(ord[ordType]){
            const result = await ord[ordType](forma,elements);
             return result;
            
         }else{
             return 1;
         }
    //127.0.0.1:3000/api/userElement?ord=type&orden=gas&orden=hal&orden=noMet&orden=met&otrosMet&orden=metTrans&orden=alcaterreo&orden=metAlcalinos&orden=lant&orden=acti
    }else if(tipoOrd === 'type'){
        const {orden} = req.query;
        
        const tipos={
            gas: "Gases nobles",
            hal: "Halógenos",
            noMet:"No metales",
            met:"Metaloides",
            otrosMet: "Otros metales",
            metTrans:"Metales de transición",
            alcaterreo: "Alcalinotérreos",
            metAlcalinos:"Metales alcalinos",
            lant:"Lantánidos",
            acti:"Actínidos",

        }
        const pasaOrden = [];

        for (let i = 0; i < orden.length; i++) {
            const verif = tipos[orden[i]];
            if(verif){
                pasaOrden[i] = verif;
            }
        }
        
        if(pasaOrden <10 || pasaOrden >10) return 5;
        
        for (let i = 0; i < pasaOrden.length; i++) {
            let j = 1+i;
            for ( ; j < pasaOrden.length; j++) {
                if(pasaOrden[i] == pasaOrden[j]){
                    return 6;
                }
                
            }
            
        }  
        
        const result = await ordenTipo(pasaOrden,elements);  
        return result;
    }
}
//Ordenamiento
async function ordenNumAtomico(forma,elements){
    let mayor;
    let menor;
    
    if(forma === 'DES'){
     
        for (let i = 0; i < elements.length; i++) {
            j = i +1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].atomicNumber > elements[j].atomicNumber){
                    menor = elements[i];
                    mayor= elements[j];
                    elements[i] = mayor;
                    elements[j] = menor;
                }
            }
                
        }
            
        
    }else {
        for (let i = 0; i < elements.length; i++) {
            j = i + 1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].atomicNumber < elements[j].atomicNumber){
                    mayor = elements[i];
                    menor = elements[j];
                    elements[i] = menor;
                    elements[j] = mayor;
                }
                
            }
            
        }
    }
    return elements;
}
async function ordenMasaAtomica(forma,elements){
    let mayor;
    let menor;
    
    if(forma === 'DES'){
     
        for (let i = 0; i < elements.length; i++) {
            j = i +1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].atomicMass > elements[j].atomicMass){
                    menor = elements[i];
                    mayor= elements[j];
                    elements[i] = mayor;
                    elements[j] = menor;
                }
            }
                
        }
            
        
    }else {
        for (let i = 0; i < elements.length; i++) {
            j = i + 1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].atomicMass < elements[j].atomicMass){
                    mayor = elements[i];
                    menor = elements[j];
                    elements[i] = menor;
                    elements[j] = mayor;
                }
                
            }
            
        }
    }
    return elements;
}
async function ordenAlfabetico(forma,elements){
    let mayor;
    let menor;
    
    if(forma === 'DES'){
     
        for (let i = 0; i < elements.length; i++) {
            j = i +1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].name > elements[j].name){
                    menor = elements[i];
                    mayor= elements[j];
                    elements[i] = mayor;
                    elements[j] = menor;
                }
            }
                
        }
            
        
    }else {
        for (let i = 0; i < elements.length; i++) {
            j = i + 1;
            for (let j = 0; j < elements.length; j++) {
                if(elements[i].name < elements[j].name){
                    mayor = elements[i];
                    menor = elements[j];
                    elements[i] = menor;
                    elements[j] = mayor;
                }
                
            }
            
        }
    }
    return elements;
}
async function ordenTipo(orden,elements){
    ordenNumAtomico('ASC',elements);
    let elemento1;
    let elemento2;
    console.log(elements[0].elementType.type);
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements.length; j++) {
            if(orden[i] === elements[j].elementType.type){
                elemento1 = elements[i];
                elemento2 = elements[j];
                elements[i]=elemento2;
                elements[j]=elemento1;
                break;
            }
            
        }
        
    }
    return elements;
}