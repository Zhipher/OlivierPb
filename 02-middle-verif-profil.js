// // 02-middle-verif-profil.js
const Joi = require("joi");
const passwordComplexity  = require("joi-password-complexity");

// vérifier que le password qui est donné lors de la création 
// contient Majuscule / minuscule / chiffre / caractère spéciaux 

function profilValid( profil ){

    const options = {
        min : 5,
        max: 200,
        lowerCase : 1,
        upperCase : 1,
        numeric : 1,
        symbol : 1,
        requirementCount: 6
    }

    const schemaProfil = Joi.object({
        login : Joi.string().min(5).required(),
        password : new passwordComplexity (options).required()
    })

    return schemaProfil.validate(profil);
}

module.exports = profilValid ; 