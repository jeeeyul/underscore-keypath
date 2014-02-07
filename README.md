# underscore-keypath

[![Build Status](https://travis-ci.org/jeeeyul/underscore-keypath.png?branch=master)](https://travis-ci.org/jeeeyul/underscore-keypath)

key-path mechanism extensions for underscore.

**underscore-keypath** let you access JavaScript objects and arrays with keypath easily.

```bash
$ npm install underscore-keypath
```

## How to use
```javascript
var _ = require("underscore-keypath");
```

or you may want to use origianl underscore:

```javascript
var _ = require("underscore");
require("underscore-keypath"); // it will extend original underscore
```
in this case, please install "underscore" first.
```bash
$ npm install underscore underscore-keypath
```

## example
```javascript
var foo = {
  bar : {
    name : "Cool!"
  },
  scores : [55, 27, 100, 33]
};

_(foo).valueForKeyPath("bar.name"); // --> "Cool!"
_(foo).valueForKeyPath("scores.@max"); // --> 100
```

see [API Document](https://github.com/jeeeyul/underscore-keypath/wiki)
