
/**
 * Module dependencies.
 */

var iOAuth = require('../')("37508");

iOAuth.get(function(auth){
  document.getElementById('token').innerHTML = auth.access_token;
});

document.getElementById('reset').onclick = function(e) {
  iOAuth.reset();
  iOAuth.get();
};
