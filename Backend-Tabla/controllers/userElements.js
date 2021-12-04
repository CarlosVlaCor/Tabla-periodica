
const  sequelize  = require('sequelize');
const Op  =sequelize.Op;

const db = require('../models/index');
const userElement = db.userElement;
const element = db.element;
const elementType = db.elementType;
const modified = db.modified;
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
            let findModi;
            for (let i = 0; i < userElements.length; i++) {
                findModi = await modified.findOne({
                    where:{userElementId:userElements[i].id},
                    include:{model:elementType}
                });
                if(!findModi){
                    elements[i]= await element.findByPk(userElements[i].elementId,{
                        include:{model:elementType},
                    });
        
                }else{
                    elements[i] = findModi;
                }
                
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
        //127.0.0.1:3000/api/userElement?busqueda=Hidrógeno&busqueda=Oxígeno&...
        const {busqueda} = req.query;    
        if(busqueda){
            const result=await obtenerVariosValores(busqueda,user.id);
            return res.status(200).send(result);
        }
        console.log("a");

        ////127.0.0.1:3000/api/userElement
        const findUE = await userElement.findAll({
            where:{
                userId:user.id,
                statusDelete:false,
            },
        });
        
        const get = [];
        let findModi;

        for (let i = 0; i < findUE.length; i++) {
                findModi = await modified.findOne({
                    where:{userElementId:findUE[i].id,
                          statusDelete:false},
                    include:{model:elementType},
                });
                
                if(!findModi){
                    get[i]= await element.findByPk(findUE[i].elementId,{
                        include:{model:elementType},
                    });
                }else{
                    get[i] = findModi;
                }
                
    
        }
        const ordElements = await ordenNumAtomico('ASC',get);
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
async function obtenerVariosValores(busqueda,idUser){
    const result=[];
   
    if(typeof busqueda !== 'string'){
        for (let i = 0; i < busqueda.length; i++) {
            let findModi = await modified.findOne({
                where:{name:busqueda[i],statusDelete:false},
                include:{model:elementType}
            });
           
             if(!findModi){
                let find = await element.findOne({
                    where:{name:busqueda[i]},
                    include:{model:elementType},
                });
                
                let find2 = await userElement.findOne({
                    where:{statusDelete:false,
                        elementId:find.id,
                        userId:idUser},
                }) 
                if(find2){
                    result[i] = find;
                }else{
                    result[i] = {message:"No es encontró " + busqueda[i] + " entre tus elementos"};
                }
            }else{
                console.log(findModi.userElementId)
                let find2 = await userElement.findOne({
                    where:{statusDelete:false,
                        id:findModi.userElementId,
                        userId:idUser},
                }) 
                if(find2){
                    result[i] = findModi;
                }else{
                    result[i] = {message:"No es encontró " + busqueda[i] + " entre tus elementos"};
                }
            }
        }
    }else{
        let findModi = await modified.findOne({
            where:{name:busqueda,statusDelete:false},
            include:{model:elementType}
        });
       
        if(!findModi){
            let find = await element.findOne({
                where:{name:busqueda},
                include:{model:elementType},
            });
          
            let find2 = await userElement.findOne({
                where:{statusDelete:false,
                    elementId:find.id,
                    userId:idUser},
            }) 
            console.log(find2);
            if(find2){
                result[0] = find;
            }else{
                result[0] = {message:"No es encontró " + busqueda + " entre tus elementos"};
            }
        }else{
            let find2 = await userElement.findOne({
                where:{statusDelete:false,
                    id:findModi.userElementId,
                    userId:idUser},
            }); 
            if(find2){
                result[0] = findModi;
            }else{
                result[0] = {message:"No es encontró " + busqueda[i] + " entre tus elementos"};
            }
        }
    }
  return result;
}
//127.0.0.1:3000/api/userElement/Hidrógeno
exports.putElement = async ( req,res) =>{
    try {
        const {body,params} = req;
        if(!params.name) return res.status(404).send({message:"Se requiere name"});
        if(!body) return res.status(404).send({message: "Se requieren los atributos del elemento a cambiar"});
        const find = await element.findOne({where:{name:params.name}});
        if(!find) return res.status(404).send({message: "No se encontró el elemento"});
        const findUE = await userElement.findOne({where:{
            userId : req.user.id,
            elementId:find.id,
            statusDelete: false,
            },
        });
        console.log(findUE);

        if(!findUE) return res.status(404).send({message:"No se encontró entre tus elementos"});
        if(!body.name) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.atomicNumber) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.atomicMass) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.period) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.atomicSymbol) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.group) return res.stauts(404).send({message:"Se requiere el nombre"});
        if(!body.elementTypeId) return res.status(404).send({message:"Se erequiere el elementTypeId"});

        const findModi = await modified.findOne({where:{userElementId:findUE.id}});

        if(findModi){
            findModi.name = body.name;
            findModi.atomicNumber= body.atomicNumber;
            findModi.atomicMass = body.atomicMass;
            findModi.period = body.period;
            findModi.atomicSymbol = body.atomicSymbol;
            findModi.group = body.group;
            findModi.elementTypeId = body.elementTypeId;
            findModi.statusDelete = false;
            findModi.save();
        }else{
            console.log("a");
            const create = await modified.create({
            name: body.name,
            atomicSymbol:body.atomicSymbol,
            atomicNumber: body.atomicNumber,
            atomicMass: body.atomicMass,
            group: body.group,
            period: body.period,
            elementTypeId: body.elementTypeId,
            image: findUE.imagen,
            userElementId: findUE.id,
            });
        }
      

        
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
        const findModi = await modified.findOne({where:{idUserElement:find.id}});
        if(findModi){
            modified.statusDelete = true;
            findModi.save();
        }
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