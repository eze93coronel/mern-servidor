const express = require('express');
 const router = express.Router();
 const tareaController = require('../controllers/tareaController');
 const auth = require('../middlewar/auth');
 const {check} = require('express-validator');

 //crear una tarea controller
 //api/tareas 
 router.post('/',
 auth, 
   [
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('proyecto','el Proyecto es obligatorio').not().isEmpty()

   ],
 tareaController.crearTarea
 );
// obtener las tareas por proyecto
router.get('/',
     auth,
     tareaController.obtenerTareas
);

router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

 module.exports = router;

 //eliminar una tarea 
 router.delete('/:id',
     auth,
     tareaController.eliminarTarea
 )