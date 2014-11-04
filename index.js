
/**
 * Module dependencies.
 */

var url = require('url');
var querystring = require('querystring');
var debug = require('debug')('ioauth');

/**
 * Authotize WordPress.com endpoint
 */

var authorizeEndpoint = 'https://public-api.wordpress.com/oauth2/authorize';

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
    // get url parsed object
    var url_parsed = url.parse(location.href, true);

    // get hash object
    var hash;
    if (url_parsed.hash && url_parsed.hash.length > 1) {
      hash = querystring.parse(url_parsed.hash.substring(1));
    }

    if (hash && hash.access_token) {
      // Token is present in current URI
      // store access_token
      localStorage.ioauth = JSON.stringify(hash);
    } else if (!localStorage.ioauth) {
      auth();
    }

    fn(JSON.parse(localStorage.ioauth));
  };

  /**
   * Authentication request
   *
   * @api private
   */

  function auth () {
    // redirect to OAuth page
    console.log('-> params -> ', params);
    var redirect = authorizeEndpoint + '?' + querystring.stringify(params);
    debug('Redirect url: %o', redirect);

    window.location = redirect;
  }
}
