'use strict'
const passport = require('passport')

function loginController(req, res, next) {
  // Is logged in
  if (req.session && req.session.user) {
     res.status(400).json({error: 'Already logged in'})
     return
   }

   if (!req.body) {
     res.status(400).json({error: 'Invalid request'})
     return
   }

   if (!req.body['username'] || !req.body['password']) {
     res.status(400).json({error: 'Username and password are required'})
     return
   }

   passport.authenticate('local', function (err, user, info) {
     if (err) {
       res.status(500).json({error: 'Internal server error'})
       return next(err)
     }

     // Invalid credentials
     if (user === false) {
       res.status(400).json({error: info.message })
       return
     }

     req.session.user = user

     req.session.save(err => {
       if (err) {
         return next(err)
       }
       res.status(204).send()
       return next(null)
     })
   })(req, res, next)
}

module.exports = loginController
