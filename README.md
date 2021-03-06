wpcom-oauth-cors
================

[WordPress.com](http://wordpress.com)
[implicit OAuth2](http://tutorials.jenkov.com/oauth2/authorization.html#implicit)
**client-side** authorization module.

The **server-side** (Node.js) counterpart to this module is
[`wpcom-oauth`](https://github.com/Automattic/node-wpcom-oauth).

```cli
> npm install wpcom-oauth-cors
```

# How to use

```js
var wpcomOAuth = require('wpcom-oauth-cors')('<client-id>');

// get auth object
wpcomOAuth.get(function(auth){
  // Here, your token is available as auth.access_token
  // e.g.:
  // var wpcom = require('wpcom');
  // var wpc = wpcom(auth.access_token);
});

// clean stored token
wpcomOAuth.clean();

// get stored token
var auth = wpcomOAauth.token();
```

## API

### wpcomOAuth(client_id, params)

Create a wpcomOAuth instance giving `client_id` (String) and optional parameters object

**params**:

* `redirect`
* `blog`
* `response_type`
* `scope`
* `state`

### wpcomOAuth.get(fn)

### wpcomOAuth.clean()

### wpcomOAuth.request()

### wpcomOAuth.reset()

### wpcomOAuth.token()


## Example

This snippet will log a posts array from site with id `123456`.

```js
var wpcom = require('wpcom');
var wpcomOAuth = require('wpcom-oauth-cors')('<client-id>');

// get auth object
wpcomOAuth.get(function(auth){
  // Here, your token is available as auth.access_token
  var wpc = wpcom( auth.access_token );
  var mySite = wpc.site( 123456 );
  mySite.postsList({ number: 50, fields: "author,URL,title,geo" }, function(err, list) {
	  console.log( list );
  });
});

```

## Test

* Compile testing js file

```cli
> make test
```

* Go to `test/` folder

* Run web server (using `serve` for instance)

* Open `index.html` with a browser
