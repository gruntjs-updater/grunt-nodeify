
# grunt-nodeify

> Convert js files to node modules by executing the code in the files and linking each function/objects created in the global scope. 

/!\ Caution with the js files you pass to the task, I use vm.runInContext(code, context, [filename]) and it effectively executes the js code. I don't know how it is sandboxed,  it might run dangerous code.  
/!\ It is a fast coding draft

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
   nodeify: {
         target:{
             files:[{
                 src: ['_xt.js', 'modules/_xt.events.js'],
                 dest: 'node/'
             }]
         }
     }
});
```

### Usage Examples

#### Default Options
In this example, nodeify will convert _xt.js and _xt.events.js by adding module.export and requires node instructions

```js
grunt.initConfig({
   nodeify: {
         _xt:{
             files:[{
                 src: ['_xt.js', 'modules/_xt.events.js'],
                 dest: 'node/'
             }]
         }
     }
});
```
  
  As _xt,js only creates a single object called '_xt', the generation add only one property to the export object.  
  At the end of node/_xt.js you'll find:

``` js
module.export = {
    _xt: _xt
}
```

  At the beginning of node/_xt.event.js you'll find:
``` js
var _xt = require("./_xt.js");
```
  _xt.events will also export _xt as _xt remains in the global scope but also each new global object created.
``` js
module.export = {
    _xt: _xt
}
```
  
  Each file of a target is linked with the others depending the order. If you don't want a file to export something, create a second target.
