var Profile = require("../models/Profile");
var bcrypt = require('bcryptjs')


// Servicio que valida la disponibilidad de un nombre de usuario
const usernameValidate = async (req, res, err) => {
  try {
    //busca usuario por nombre
    let profiles = await Profile.find().byUsername(
      req.params.username.toLowerCase()
    );
    //conprueba repsuetsa
    if (profiles.length > 0) throw new Error("Usuario existente");

    //ususario libre
    res.send({ ok: true, message: "Usuario disponible" });
  } catch (err) {
    //conexion falas
    res.send({
      ok: false,
      message: err.message || "Error al validar el nombre de usuario",
    });
  }
};

//alta de usuario
const  signup = async (req, res, err)=>{
try {
    const newProfile = new Profile({
        name: req.body.name,
        userName: req.body.username.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 10)
    })

    //guardnad en base
    newProfile = await newProfile.save()

    //mensage de exito
    res.send({ ok:true, body:{profile:newProfile}})

} catch (err) {
    console.log(err)
    let errorMessage = null
    if (err.errors != null && err.errors.userName != null) {
        errorMessage = "Nombre de usuario existente"
    } else {
        errorMessage = "Error al guardar registro de usuario"
    }

    res.send({ok: false, message: "error al crear el usuario", error: errorMessage || err.message})
}
}

module.exports = { usernameValidate, signup };
