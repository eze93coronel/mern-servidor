const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator')

exports.crearProyecto = async (req,res) => {
  // revisar errores 
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
try {
    // crea un nuevo proyecto de
   const proyecto = new Proyecto(req.body);

   // gauardar el creador via jwt 
   proyecto.creador =req.usuario.id;

   //guardamaos proyecto
   proyecto.save();
   res.json(proyecto);


} catch (error) {
    console.log(error)
    res.status(500).send('hubo un error')
}

};

// 0btiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req,res) =>{
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos});
    } catch (error) {
        res.status(500).send('Huno un error man');
    }
}

//actualiza un proyecto 
exports.actualizarProyecto = async (req,res)=>{
  // revisar errores 
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()});
  };

//extarer la info del proyecto
const {nombre } = req.body;
const nuevoProyecto = {};

if(nombre){
    nuevoProyecto.nombre = nombre;
}


try {

    //revisar el id
 let proyecto = await Proyecto.findById(req.params.id);


    // si el proyecto existe o no exist

if(!proyecto){
    return res.status(404).json({msg:'Proyecto no enconttrado'});
}
    //verifiacar el creador del proyecto
if(proyecto.creador.toString() !== req.usuario.id){
    return res.status(401).json({msg:'No autorizado men'})
}

    // actualizar
    proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set : nuevoProyecto},{new :true})
     
    res.json({proyecto});


} catch (error) {
    console.log(error);
    res.status(500).send('error en el servidor');
    
}

}

// elimina un proyecto por su id 
exports.eliminarProyecto = async (req,res)=>{
    try {
        
    //revisar el id
 let proyecto = await Proyecto.findById(req.params.id);


 // si el proyecto existe o no exist

if(!proyecto){
 return res.status(404).json({msg:'Proyecto no enconttrado'});
}
 //verifiacar el creador del proyecto
if(proyecto.creador.toString() !== req.usuario.id){
 return res.status(401).json({msg:'No autorizado men'})
}

//eliminar un proyecto
await Proyecto.findByIdAndRemove({_id: req.params.id});
res.json({msg: 'Proyecto eliminado =/'});

    } catch (error) {
          console.log(error);
          res.status(500).send('error en el servidor');
    }
}