
/**
 * Module dependencies.
 */

var wpOAuth = require('../')('');  // -< complete your client_id

wpOAuth.get(function(auth){
  document.getElementById('token').innerHTML = auth.access_token;
});

document.getElementById('reset').onclick = function(e) {
  wpOAuth.clean();
};

console.log('-> wpOAuth.token() -> ', wpOAuth.token());