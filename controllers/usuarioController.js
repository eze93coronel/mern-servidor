const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult}= require('express-validator');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async  (req,res)=>{
      //
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array()});
      }

    //extraer mail y password 
    const {email,password} = req.body
    try {
        // revisar que el usuario sea un registro unico
        let usuario = await Usuario.findOne({email});

        //
        if(usuario){
            return res.status(400).json({msg:'usuario existente broo'})
        }


        // crea el nuevo usuario
        usuario = new Usuario(req.body);

     //hashear el password 
      const salt = await bcryptjs.genSalt(10);
      usuario.password = await bcryptjs.hash(password, salt); 

         //guardar el usuario
        await usuario.save()
 
       // crear y  firmar el jwt 
       const payload ={

       usuario:{
           id:usuario.id
       }

       }; 

       //firmar el jwt 

      jwt.sign( payload,config.secret,{
           expiresIn: 3600
       },(error, token)=>{
           if(error) throw error;

           console.log()
           //mensaje de confirmacin 
         
        res.send({   token}); 
       });
       
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error');
    }
     

    
} ;

 
