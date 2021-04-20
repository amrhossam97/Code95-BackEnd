const Users = require('../models/userModel');

module.exports = function (app) {
   
    // get all Users
    app.get('/api/users', function (req, res ,next) {

        Users.find({})
        .then(Users => res.status(200).send(Users))
        .catch(next)
    });

}
