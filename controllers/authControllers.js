const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult}= require('express-validator');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res)=>{
    // si ahi errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // extraer mail y password 
    const {email,password} = req.body;

    try {
        // rebisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({msg:'el usuario no existe'});
        }
        // revisar el password
     const passCorrecto = await bcryptjs.compare(password,usuario.password);

     if(!passCorrecto) {
        return res.status(400).json({msg:'el password es incorrecto'});
    }

    // si todo coincide pass y usuario creamos token
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
        console.log(error);
    }
  

}

//obtieene el usuaio autenticado 
exports.usuarioAutenticado = async (req,res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error che..'});
        
    }
}