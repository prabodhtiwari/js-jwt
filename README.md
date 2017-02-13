# js-jwt

JavaScript library of jwt encoding works on both browser and node

- npm (Node.js package manager)

```bash
npm install js-jwt --save
```

### Usage

Modular include:

```javascript
var jwt = require("js-jwt");
jwt.init('SH256','secret-key') //you can init with secrete and without secret-key
var token = jwt.encode({id:1, name: 'john doe'}, 'secret-key') //here you can paas secret-key if you want to encode with different secretKey
...
console.log(token);

var data = jwt.encode(token, 'secret-key') //secret key is not required if it is already passed in init()
...
console.log(data)
```


### List of alg supported

SH256
SH512