const dotenv = require('dotenv');
const express = require('express') ;
const conectarDB = require('./config/db');

const cors = require('cors');

// acrear el app 

const app = express();

// CONECTAR ALA BASE DE DATOS D MONGO 
conectarDB();

//habilitar cors 
app.use(cors());

//hablititar esprees.json 
app.use(express.json({extended : true}));

const PORT = process.env.PORT || 3000
 
//importar rutas 
app.use('/api/usuarios',require('./routes/usuarios'));

app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));








//ARRANACRA LA APP 
 app.listen(PORT, ()=>{
     console.log(`el servidor arrancando del puerto ${PORT}`)
 })