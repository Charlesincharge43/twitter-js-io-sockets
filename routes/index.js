

module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  // could use one line instead: const router = require('express').Router();
  const tweetBank = require('../tweetBank');//why is it still ../tweetBank?

  // var locals = {
  //     title: 'An Example',
  //     people: [
  //         { name: 'Gandalf'},
  //         { name: 'Frodo' },
  //         { name: 'Hermione'}
  //     ]
  // };


  router.get('/', function (req, res) {
    let tweets = tweetBank.list();//tweets is the object that contains all tweets
    res.render( 'index', { tweets: tweets } );
    //res.render basically provides the relevant information to fill in the
    //{% for tweet in tweets %} part of index.html (template) in the creation of a new
    //html

    //res.render( 'index', locals );//testing purposes
  });




  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find( {name: name} );//Remember before the colon, name is property (not variable)
    //the second name (after colon) is the variable that takes the value of the params.name (via var name)
    res.render( 'index', { tweets: tweets, user: name, showForm: true } );//remember the tweets part must match
    //the variable in index.html (so it has to be 'tweets', not anything else unless
    //you change the variable name in html document)
  });

  // router.get('/', function(req, res) {
  //   res.render( 'index', { tweets: tweets, showForm: true } );
  // });


  router.get('/tweets/:id', function(req, res) {
    var id = +req.params.id;//!!!! REMEMBER YOU NEED TO CONVERT FROM STRING TO NUMBER...
    //PARAMS ARE STRING INITIALLY
    var tweets = tweetBank.find( {id: id} );
    res.render( 'index', { tweets: tweets } );//remember the tweets part must match
    //the variable in index.html (so it has to be 'tweets', not anything else unless
    //you change the variable name in html document)
  });



  // router.get('/stylesheets/style.css',function(req,res){
  //   //res.sendFile('stylesheets/style.css');//Not working for some reason...
  //   res.sendFile('/Users/lli494/Desktop/Foundations/twitter-js/public/stylesheets/style.css');
  //   //MUST BE ABSOLUTE PATH... NOT RELATIVE
  // });
  //The above had to be commented out once we included static routing (see app.js)

  router.get('/test',function(req,res){
    console.log(tweetBank.lastid());
  })

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    //tweetBank.add(name, text);
    //The above is the original way of getting it to post to work (without making a new DOM node)
    //Below is the io way
    var lastid=tweetBank.lastid();
    io.emit('newTweet', {name:name, content:text, id:lastid});//The object goes into the socket.on('newTweet'.. function
    res.redirect('/');
  });



  // module.exports = router;
  //Above is for non-socket io

  return router;
};
