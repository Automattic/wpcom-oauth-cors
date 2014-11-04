
/**
 * Module dependencies.
 */

var url = require('url');
var querystring = require('querystring');
var debug = require('debug')('ioauth');

/**
 * Expose `IOAuth` function
 */

module.exports = IOAuth;

/**
 * Handler WordPress.com implicit open authentication
 *
 * @param {String} client_id
 * @param {Object} opts
 * @return {Function}
 */

function IOAuth(client_id, opts){
  // `Client ID` must be defined
  if (!client_id) {
    throw '`client_id` is undefined';
  }
  debug('client_id: %o', client_id);

  // options
  opts = opts || {};

  // authentication request params
  var params = {
    client_id: client_id,
    response_type: 'token'
  };

  // options - `Redirect URL`
  params.redirect_uri = opts.redirect || location.href.replace(/\#.*$/, '');

  debug('Redirect_URL: %o', params.redirect_uri);


  /**
   * Return implicit oauth function
   *
   * @param {Function} fn
   * @api public
   */
  
  return function(fn){
  };
}
