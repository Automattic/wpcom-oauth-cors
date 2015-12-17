
/**
 * Module dependencies.
 */

var url = require('url');
var querystring = require('querystring');
var debug = require('debug')('wpcom-oauth');

/**
 * Authotize WordPress.com endpoint
 */

var authorizeEndpoint = 'https://public-api.wordpress.com/oauth2/authorize';

/**
 * Expose `wpOAuth` function
 */

exports = module.exports = wpOAuth;

/**
 * Keep a local cache in case localStorage is not available
 */
var localCache = {};

/**
 * Handle WordPress.com Implicit Open Authentication
 *
 * @param {String} client_id
 * @param {Object} [opts]
 * @api public
 */

function wpOAuth(client_id, opts){
  // `Client ID` must be defined
  if (!client_id) {
    throw '`client_id` is undefined';
  }
  debug('client_id: %o', client_id);

  // options
  opts = opts || {};

  // authentication request params
  var params = exports.params = {
    client_id: client_id,
    response_type: opts.response_type || 'token'
  };

  // options - `Redirect URL`
  params.redirect_uri = opts.redirect || exports.getCurrentUrl().replace(/\#.*$/, '');
  debug('Redirect_URL: %o', params.redirect_uri);

  if (opts.scope) params.scope = opts.scope;

  return wpOAuth;
}

/**
 * Returns current localStorage value for a key
 *
 * @param {String} key
 * @api private
 */

exports.getLocalStorageValue = function( key ) {
  if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
  return localCache[key];
}

/**
 * Saves new key-value pair to localStorage
 *
 * @param {String} key
 * @param {Object} value
 * @api private
 */

exports.setLocalStorageValue = function( key, value ) {
  if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
  localCache[key] = value;
}

/**
 * Returns current browser window URL as a string
 *
 * @api private
 */

exports.getCurrentUrl = function() {
  if (typeof window !== 'undefined') return window.location.href;
  return '';
}

/**
 * Changes current browser window URL
 *
 * @param {String} url
 * @api private
 */

exports.setCurrentUrl = function( url ) {
  if (typeof window !== 'undefined') window.location = url;
}

/**
 * Get token authentication object
 *
 * @param {Function} [fn]
 * @api public
 */

exports.get = function(fn){
  fn = fn || function(){};

  // get url parsed object
  var url_parsed = url.parse(exports.getCurrentUrl(), true);

  // get hash object
  var hash;
  if (url_parsed.hash && url_parsed.hash.length > 1) {
    hash = querystring.parse(url_parsed.hash.substring(1));
  }

  if (hash && hash.access_token) {
    // Token is present in current URI
    // store access_token
    exports.setLocalStorageValue('wp_oauth', JSON.stringify(hash));

    // clean hash from current URI
    exports.setCurrentUrl(exports.getCurrentUrl().replace(/\#.*$/, ''));
  } else if (!exports.getLocalStorageValue('wp_oauth')) {
    return exports.request();
  }

  fn(JSON.parse(exports.getLocalStorageValue('wp_oauth')));
};

/**
 * Clean authentication from store
 *
 * @api public
 */

exports.clean = function(){
  debug('clean');
  exports.setLocalStorageValue('wp_oauth', null);
};

/**
 * Make WordPress.com implicit oauth request
 *
 * @api public
 */

exports.request = function(){
  // redirect to OAuth page
  var redirect = authorizeEndpoint + '?' + querystring.stringify(exports.params);
  debug('Redirect url: %o', redirect);
  exports.setCurrentUrl(redirect);
};

/**
 * Clean and request a new token
 */

exports.reset = function(){
  exports.clean();
  exports.request();
};

/**
 * Return authentication object
 *
 * @api public
 */

exports.token = function(){
  return exports.getLocalStorageValue('wp_oauth') ? JSON.parse(exports.getLocalStorageValue('wp_oauth')) : null;
};
