module.exports = (sequelize,Sequelize) =>{
    const Element = sequelize.define('element',{
        name:{
            type: Sequelize.STRING,
            unique:true,
        },
        atomicSymbol:{
            type: Sequelize.STRING,
        },
        atomicNumber:{
            type:Sequelize.INTEGER,
        },
        atomicMass:{
            type: Sequelize.FLOAT,
        },
        group:{
            type: Sequelize.INTEGER,
        },
        period:{
            type: Sequelize.INTEGER,
        },
        image:{
            type: Sequelize.STRING,
        }
    });
    return Element;
}