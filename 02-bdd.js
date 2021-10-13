const { connect } = require('mongoose')
require('dotenv').config()

module.exports = function() {
    connect(process.env.BD, { useNewUrlParser : true })
        .then( () => console.log(`connexion à MongoDB`))
        .catch( (err) => console.log(`connexion impossible à MongoDB : ${err}`))
}