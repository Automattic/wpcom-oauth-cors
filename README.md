ioauth
======

Implicit Open Auth client-side module for WordPress.com

```cli
> npm install ioauth
```

# How to use

```js
var iOAuth = require('ioauth')('<client-id>');

iOAuth(function(token){
  // your `token` is here!!!
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
