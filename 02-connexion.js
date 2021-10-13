const express = require('express')
const User = require('./02-model')
const bcrypt = require('bcrypt')

const route = express.Router()

route.post('/connexion', express.json(), async(req, rep, next) => {
    let profil = req.body

    const profilRecherche = await User.findOne({ login : profil.login })

    // personne => null
    if(!profilRecherche){
        return rep.status(404).send(`aucun profil trouvé`)
    }

    // Vérifier le mot de passe
    bcrypt.compare( profil.password, profilRecherche.password, (err, result) => {
        if(!result){
            return rep.status(404).send(`le mot de passe n'est pas le bon`)
        }
        return rep.send(`Bienvenue !!`)
    } )
})

module.exports = route