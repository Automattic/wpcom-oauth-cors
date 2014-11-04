ioauth
======

Implicit Open Auth client-side module for WordPress.com

```cli
> npm install ioauth
```

# How to use

```js
var iOAuth = require('ioauth')('<client-id>');

// get auth object
iOAuth.get(function(auth){
  // your token is here auth.access_token!
});

// clean stored token
iOAuth.clean();

// get stored token
var auth = iOAuth.token();
```

## Test

* Compile testing js file

```cli
> make test
```

* Go to `test/` folder

* Run web server (using `serve` for instance)

* Open `index.html` with a browser
