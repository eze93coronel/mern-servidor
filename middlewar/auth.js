const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = function(req,res,next){
    // leer el token de
  const token  = req.header('x-auth-token');
 
  console.log(token);

    // revisar token token
    if(!token){
        return res.status(400).json({msg:'no ahi token, permiso no valido'});
    }

    //validar token
    try {
        const cifrado = jwt.verify(token,config.secret);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        res.status(401).json({msg:'token no valido'})
    }
}