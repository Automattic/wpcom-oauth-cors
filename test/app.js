
/**
 * Module dependencies.
 */

var iOAuth = require('../')("37508");

iOAuth(function(auth){
  console.log('-> auth -> ', auth);
  document.getElementById('token').innerHTML = auth.access_token;
});
