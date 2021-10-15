const { Router } = require('express')
const express = require('express')
const Article = require('../model/article')
const { Types } = require('mongoose')

const router = Router()

router.get('/add-article', (req, rep) => {
    rep.render('back/add-article')
})

router.post('/add-article', express.json(), async (req, rep) => {

    try{
        const creer = new Article(req.body)
        const res = await creer.save()   
        rep.json(res)
    } catch (err) {
        const message = []
        for(let champs in err.errors){
            message.push(err.errors[champs].message)
        }
        rep.status(400).json({ error : message })
    }

    // établir une connexion à une base de données MongoDB => jour 5
    // créer un schéma mongoose pour stocker les articles =>
    // titre string obligatoire // contenu string obligatoire 
    // dt_creation mise automatiquement à maintenant
    // model que l'on va pouvoir utiliser dans add-article
})

router.post('/add-commentaire', express.json(), async (req, rep) => {
    try{
        const { id_article, email, commentaire } = req.body
        // console.log(req.body)
        if(!id_article){
            return rep.status(400).json({ error : 'id manquant' })
        }
        if(!Types.ObjectId.isValid(id_article)){
            return rep.status(400).json({ error : 'id invalide' })
        }
        let articleAModifier = await Article.findById(id_article)
    
        if(!articleAModifier){
            return rep.status(404).json({ error : 'article introuvable' })
        }
    
        articleAModifier = articleAModifier.commentaires.push({ email, commentaire })
        const res = await articleAModifier.save()
    
        rep.json({ success : res })
    } catch (err) {
        const erreurs = []
        for(let champ in err.errors){
            erreurs.push(err.errors[champ].message)
        }
        rep.status(400).json({ error : erreurs })
    }
})

module.exports = router