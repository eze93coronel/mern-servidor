const mongoose = require('mongoose');
const url ="mongodb+srv://ROOTMAN:ROOTMAN@cluster0.qnhek.mongodb.net/MERNSTASK";
require('dotenv').config({path: '.variables.env'});

const conectarDB = async ()=>{
   try { 


       await mongoose.connect(url,{
           useNewUrlParser: true,
           useUnifiedTopology:true
          
            
       })
       console.log('BASE DE DATOS CONECTADA'); 
      
   } catch (error) {
       console.log(error)
       process.exit(1) // detener la pap en caso que allla alguna falla
   }
}

module.exports = conectarDB;

