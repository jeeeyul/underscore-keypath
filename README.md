# underscore-obj

[![Build Status](https://travis-ci.org/jeeeyul/underscore-obj.png?branch=master)](https://travis-ci.org/jeeeyul/underscore-obj)

object extensions for underscore

```bash
$ npm install underscore-obj
```

## How to use
```javascript
var _ = require("underscore-obj");
```

or you may want to use origianl underscore:

```javascript
var _ = require("underscore");
require("underscore-obj"); // it will extend original underscore
```
in this case, please install "underscore" first.
```bash
$ npm install underscore underscore-obj
```

## example
```javascript
var foo = {
  bar : {
    name : "Cool!"
  }
};

_(foo).valueForKeyPath("bar.name"); // --> "Cool!"
```

see [API](https://github.com/jeeeyul/underscore-obj/wiki/API) Document
