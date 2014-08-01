
# grunt-nodeify

> Convert js files to node modules by executing the code in the files and linking each function/objects created in the global scope. 


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nodeify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nodeify');
```

## The "nodeify" task

### Overview
In your project's Gruntfile, add a section named `nodeify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    nodeify:{
        ex:{
            files:[{
                src: ['fixtures/ex1.js', 'fixtures/ex2.js'],
                dest: 'node/'
            }]
        }
    }
});
```

### Usage Examples


In this example (see unit test), nodeify will convert ex1.js and ex2.js by adding module.export and requires node instructions  
  
fixtures/ex1.js

```js
var ex1 = {
    p : function(){
        return 'p';
    }
};

var ex11 = function(){
    return 'ex11';
};
```
fixtures/ex2.js

```js
var ex2 = {
    func: function(){
        return 'func';
    },

    p: function(){
        return ex1.p();
    }
};

var ex21 = 'ex21' + ex11();
```
  
   
After nodeify:
  
node/ex1.js

```js
var ex1 = {
    p : function(){
        return 'p';
    }
};

var ex11 = function(){
    return 'ex11';
};
module.exports = {
    ex11: ex11,
    ex1: ex1
};
```
node/ex2.js

```js
var ex11 = require("./ex1.js").ex11;
var ex1 = require("./ex1.js").ex1;

var ex2 = {
    func: function(){
        return 'func';
    },

    p: function(){
        return ex1.p();
    }
};

var ex21 = 'ex21' + ex11();
module.exports = {
    ex2: ex2,
    ex11: ex11,
    ex1: ex1,
    ex21: ex21
};
```
  
  
  Each file of a target is linked with the others depending the order. If you don't want a file to export something, create a second target. Every object in the global scope is exported..
