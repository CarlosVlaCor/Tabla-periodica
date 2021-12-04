module.exports = (sequelize,Sequelize) =>{
    const UserElement = sequelize.define('userElement',{
        statusDelete:{
            type:Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });
    return UserElement;
}