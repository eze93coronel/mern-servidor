const express = require('express');
 const router = express.Router();
 const proyectoController = require('../controllers/proyectosControllers');
 const auth = require('../middlewar/auth');
 const {check} = require('express-validator');

//crea proyectos 
//api/proyectos
 router.post('/',
      auth,
      [
       check('nombre','el nombre del proyecto es obligatorio').not().isEmpty()
      ],
      proyectoController.crearProyecto
 )
 //obtinee los proyectos
 router.get('/',
 auth,
 proyectoController.obtenerProyectos
)

//actualiza los pt con ID 
router.put('/:id',
auth,
     [
     check('nombre','el nombre del proyecto es obligatorio').not().isEmpty()
    ],
 proyectoController.actualizarProyecto
    
)

//ELIMINAR UN PROYECTO 
router.delete('/:id',
auth,
 proyectoController.eliminarProyecto
    
)

 module.exports = router;