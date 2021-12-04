module.exports = (sequelize,Sequelize) =>{
    const Type = sequelize.define('elementType',{
        type:{
            type: Sequelize.STRING,
            unique: true,
        }
        
    });
    return Type;
}
