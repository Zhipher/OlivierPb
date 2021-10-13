
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('./02-model')
const profilValid = require('./02-middle-verif-profil')

const route = express.Router()

route.post('/inscription', express.json(), async (req, rep) => {

    let profil = req.body

    const { value, error } = profilValid(profil)
    rep.json(error)

    if(error){
        return rep.status(400).send(`Le mot de passe n'est pas conforme`)
    }

    // avant de créer le profil, i lfaut vérifier s'il n'y a pas un autre
    // login existant
    const isUnique = await User.findOne({ login : profil.login })
    if(isUnique){
        return rep.status(400).send(`veuillez choisir un autre login`)
    }

    // crypter le mot de passe que l'on va soumettre 
    // utiliser une librairie bcrypt => hasher les mots de passe
    // hasher => on prend quelque chose en clair, pour le crypter
    // l'inverse n'existe pas
    // si l'utilisateur ne se rappelle plus son mot de passe en clair
    // la seule solution est de changer le mot de passe
    // npm i bcrypt 
    const salt = await bcrypt.genSalt(10)

    // npm i joi-password-complexity

    const passwordHashed = await bcrypt.hash(profil.password, salt)
    // const tab = [
    //     salt,
    //     passwordHashed,
    // ]
    // rep.json(tab)

    profil = {
        login : profil.login, 
        password : passwordHashed,
    }
    const creer = new User(profil)
    const res = await creer.save()
    rep.status(200).send(`l'utilisateur est créé`)
})

module.exports = route