'use strict'

function loginController(req, res) {
  // Is logged in
  if (req.session && req.session.user) {
     res.status(400).json({error: 'already logged in'})
     return
   }

   if (!req.body) {
     res.status(400).json({error: 'username or password invalid'})
     return
   }

   if (req.body['username'] === undefined || req.body['password'] === undefined) {
     res.status(400).json({error: 'username or password undefined'})
     return
   }

   passport.authenticate('local', function (err, user, info) {
     if (err) {
       res.status(500).json({error: 'internal server error'})
       return next(err)
     }

     // Invalid credentials
     if (user === false) {
       res.status(400).json({error: 'invalid login credentials'})
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
