wpcom-oauth
===========

Implicit Open Auth client-side module for WordPress.com

```cli
> npm install wpcom-oauth
```

# How to use

```js
var wpcomOAuth = require('wpcom-oauth')('<client-id>');

// get auth object
wpcomOAuth.get(function(auth){
  // your token is here auth.access_token!
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

* `redirect_uri`
* `response_type`
* `scope`

### wpcomOAuth.get(fn)

### wpcomOAuth.clean()

### wpcomOAuth.request()

### wpcomOAuth.reset()

### wpcomOAuth.token()

## Test

* Compile testing js file

```cli
> make test
```

* Go to `test/` folder

* Run web server (using `serve` for instance)

* Open `index.html` with a browser