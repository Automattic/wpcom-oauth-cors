
/**
 * Module dependencies.
 */

var url = require('url');
var querystring = require('querystring');

// parse the current URL, in case of an OAuth token response
var parsed = url.parse(location.href, true);

/**
 * Expose `IOAuth` function
 */

module.exports = IOAuth;

/**
 * Handler WordPress.com implicit open authentication
 */

function IOAuth(fn){

}
