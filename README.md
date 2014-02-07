# underscore-obj

[![Build Status](https://travis-ci.org/jeeeyul/underscore-obj.png?branch=master)](https://travis-ci.org/jeeeyul/underscore-obj)

object extensions for underscore

## API

## valueForKeyPath(obj, keyPath, fallbackValue)
```javascript
var obj = {
  foo : {
    bar : "test"
  }
};

_(obj).valueForKeyPath("foo.bar"); // --> "test"
_(obj).valueForKeyPath("foo.notExistingProperty", "fallback"); // --> "fallback"
```

### getter
What if there is a getter for given keypath, underscore-obj tries to use it.
```javascript
var obj = {
  foo : {
    _name : "Hello",
    _valid : true,
    
    getName : function(){
      return this._name;
    },
    
    isValid : function(){
      return this._valid;
    }
  }
};

_(obj).valueForKeyPath("foo.name"); // --> "Hello"
_(obj).valueForKeyPath("foo.valid"); // --> true
```

## setValueForKeyPath(obj, keyPath, newValue)
Do you really need description for this function? Really?
