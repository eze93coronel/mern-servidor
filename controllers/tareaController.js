const Tarea = require('../models/Tarea');

const Proyecto = require('../models/Proyecto');

const {validationResult} = require('express-validator');

// crea una nueva tarea 

exports.crearTarea = async(req,res)=>{
      // revisar errores 
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array()});
      }
    
 
      try {
         //extraer el proyecto comprobar si existe 
  const {proyecto} = req.body;

          const   existeProyecto = await Proyecto.findById(proyecto);
    if(!existeProyecto) {
        return res.status(404).json({msg: 'Proyecto no encontrado'});
    }
     //revisar si el proyecto actual es del usuario autenticasdo 
     if(existeProyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg:'No autorizado men'})
    }
  // creamos la tarea 
  const tarea = new Tarea(req.body);
  await tarea.save();
  res.json({tarea});   
     

      } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error ');
          
      }

}


//obten las tareas del proyecto 
exports.obtenerTareas = async (req,res)=>{
  

    try {
                  //extraer el proyecto comprobar si existe 
     const {proyecto} = req.query;

  const   existeProyecto = await Proyecto.findById(proyecto);
   if(!existeProyecto) {
    return res.status(404).json({msg: 'Proyecto no encontrado'});
}
//revisar si el proyecto actual es del usuario autenticzado
  if(existeProyecto.creador.toString() !== req.usuario.id){
   return res.status(401).json({msg:'No autorizado men'})
}
   //obten las tareas del proyecto 
   const tareas = await Tarea.find({proyecto});
   res.json({tareas});

    } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');       


    }

 
}

//actualizar tarea tarea
exports.actualizarTarea = async (req,res) => {
   
    try {
           //extraer el proyecto comprobar si existe 
     const {proyecto,nombre,estado} = req.body;

     //la atarea existe 
     let tarea = await Tarea.findById(req.params.id);

     if(!tarea){
         return res.status(404).json({msg:'tarea no existente'});
     }

     //extraer proyecyo
     const   existeProyecto = await Proyecto.findById(proyecto);

   //revisar si el proyecto actual es del usuario autenticzado
     if(existeProyecto.creador.toString() !== req.usuario.id){
      return res.status(401).json({msg:'No autorizado men'})
   }  

    // creara el objeto con la nueva informacion 
  const nuevaTarea = {};

   nuevaTarea.nombre = nombre;

   nuevaTarea.estado = estado;


//guardar la tarea 
 tarea = await Tarea.findByIdAndUpdate({_id: req.params.id},nuevaTarea,{new : true});

 res.json({tarea});


    } catch (error) {
        res.status(500).send('hubo un error');
    }

}
//elimina una tarea d
exports.eliminarTarea = async (req,res)=>{

    try {
        //extraer el proyecto comprobar si existe 
  const {proyecto} = req.query;

  //la atarea existe 
  let tarea = await Tarea.findById(req.params.id);

  if(!tarea){
      return res.status(404).json({msg:'tarea no existente'});
  }

  //extraer proyecyo
  const   existeProyecto = await Proyecto.findById(proyecto);

//revisar si el proyecto actual es del usuario autenticzado
  if(existeProyecto.creador.toString() !== req.usuario.id){
   return res.status(401).json({msg:'No autorizado men'})
}  

//eliminar 
await Tarea.findByIdAndRemove({_id:req.params.id});
res.json({msg:'tarea eliminada'});


 } catch (error) {
     res.status(500).send('hubo un error');
 }
     
}