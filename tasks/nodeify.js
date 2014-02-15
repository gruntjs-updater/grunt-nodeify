/*
 * grunt-nodeify
 * https://github.com/KNedelec/grunt-nodeify
 *
 * Copyright (c) 2014 Kevin Nedelec
 * Licensed under the MIT license.
 */

var vm = require('vm'),
    fs = require('fs'),
    util = require('util'),
    os = require('os'),
    path = require('path')
;

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var EOL = os.EOL, TAB = '\t';

    grunt.registerMultiTask('nodeify', 'Convert js files to node modules', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        var requires = [];
        var lastFile = '', lastContent = '';

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                var sandbox = { };
                var context = vm.createContext(sandbox);
                var fileContent = nudeContent = grunt.file.read(filepath);
                if(lastFile){
                    var reqStr = writeRequires(requires, lastFile); 
                    fileContent = reqStr + fileContent;
                }
                vm.runInContext(lastContent + ';' + EOL + nudeContent, context);
                lastContent = nudeContent;
                fileContent = fileContent + writeExport(context, requires);

                var s = path.basename(filepath, '.js');
                lastFile = './' + s + '.js';
                grunt.file.write(path.join(f.dest, lastFile), fileContent);


            });
        });
    });

    function writeRequires(requires, lastFile){
        var props = [];
        for(var i = 0; i < requires.length; i++){
            props.push('var ' + requires[i] + ' = require("' + lastFile + '")');
        }
        return props.join(';'+EOL) + ';' + EOL + EOL;
    }
    function writeExport(context, requires){
        var props = [];
        for(var prop in context){
            if(!context.hasOwnProperty(prop)){
                continue;
            }
            if(requires.indexOf(prop) === -1){
                requires.push(prop);
            }

            props.push( EOL + TAB + prop + ': ' + prop ); 
        }

        if(!props.length){
            return '';
        }

        var strProps = props.join(',');
        return 'module.export = {'  + strProps + EOL + '}' + EOL;
    }
};
