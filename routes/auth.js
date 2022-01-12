// rutas para autenticar usuarios 
const express =  require('express');
const router = express.Router();
const {check} = require('express-validator');
const authControllers = require('../controllers/authControllers')
const auth = require('../middlewar/auth');
//iniciar sesion
//api/auth
router.post('/',
authControllers.autenticarUsuario
);

//obtiene el usuario autenticado en 
router.get('/',
auth,
authControllers.usuarioAutenticado
)
module.exports= router;