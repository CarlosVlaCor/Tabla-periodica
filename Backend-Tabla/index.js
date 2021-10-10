const express = require('express');
const morgan = require('morgan');
const db = require('./models/index');
const router = require('./routes/routes');
const app = express();

db.sequelize.sync();
/*db.sequelize.sync({force:true}).then(()=>{
    console.log("Tablas restablecidas");
});*/
app.use(morgan('dev'));

app.use(express.json({limit: '50mb'}));

app.get('/', (req,res)=>{
    res.json({message: "Servidor en funcionamiento"})
});

app.use('/api',router);

app.listen(3000,()=>{
    console.log("Servidor corriendo");
});