module.exports = (sequelize,Sequelize) =>{
    const Modify = sequelize.define('modifiedElement',{
        name:{
            type: Sequelize.STRING,
        },
        atomicSymbol:{
            type: Sequelize.STRING,
        },
        atomicNumber:{
            type: Sequelize.INTEGER,
        },
        atomicMass:{
            type: Sequelize.FLOAT,
        },
        period:{
           type: Sequelize.INTEGER 
        },
        group:{
            type:Sequelize.INTEGER,
        },
        image:{
            type: Sequelize.STRING,
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue:false,
        }

    });
    return Modify;
}