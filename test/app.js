
/**
 * Module dependencies.
 */

var iOAuth = require('../')("37508", { scope: 'global' });

iOAuth.get(function(auth){
  document.getElementById('token').innerHTML = auth.access_token;
});

document.getElementById('reset').onclick = function(e) {
  iOAuth.clean();
  //iOAuth.request();
};

console.log('-> iOAuth.token() -> ', iOAuth.token());
