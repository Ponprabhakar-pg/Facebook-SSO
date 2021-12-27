const passport = require('passport');
const express = require('express');
const axios = require('axios')
var router = express.Router();

router.get('/', function (req, res) {
  res.render('pages/index.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, function (req, res) {
//   res.redirect('/user')
  console.log(req.user._json.email)

  axios({
    method: 'get',
    url: `http://localhost:4000/cbmail/`+req.user._json.email,
    headers: {
      }
  }).then((response) => {
    console.log(response);
    if(response.status==404 || response.status==500){
      res.render('pages/fail')
    }
    else{
      console.log(response.data)
      res.render('pages/profile',{ user: response.data })
    }
  })
  .catch((error) => {
    res.render('pages/fail')
  })

//   res.render('pages/profile.ejs', {
//     user: req.user // get the user out of session and pass to template
//   });
});


router.get('/user', isLoggedIn, function (req, res) {

    console.log(req)
    // res.render('pages/profile.ejs', {
    //   user: req.user // get the user out of session and pass to template
    // });
  });


router.get('/error', isLoggedIn, function (req, res) {
  res.render('pages/error.ejs');
});
 
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));
 
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  }));
 
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
 
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
 
module.exports = router;