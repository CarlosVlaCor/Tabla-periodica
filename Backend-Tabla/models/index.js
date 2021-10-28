const Sequelize = require('sequelize');
const DB = require('../config/config');

const sequelize = new Sequelize(DB.DBNAME,DB.USER,DB.PASSWORD,{
    host: DB.HOST,
    dialect : DB.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize,Sequelize);
db.elementType = require('./elementType')(sequelize,Sequelize);
db.element = require('./element')(sequelize,Sequelize);
db.userElement = require('./userElement')(sequelize,Sequelize);
db.modified = require('./modified')(sequelize,Sequelize);


db.elementType.hasMany(db.element);
db.element.belongsTo(db.elementType);
db.user.hasMany(db.userElement);
db.userElement.belongsTo(db.user);
db.element.hasMany(db.userElement);
db.userElement.belongsTo(db.element);
db.userElement.hasMany(db.modified);
db.modified.belongsTo(db.userElement);
db.elementType.hasMany(db.modified);
db.modified.belongsTo(db.elementType);


module.exports = db;