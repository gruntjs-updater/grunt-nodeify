module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        nodeunit: {
            all: ['test/*.js']
        },

        nodeify:{
            ex:{
                files:[{
                    src: ['fixtures/ex1.js', 'fixtures/ex2.js'],
                    dest: 'node/'
                }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadTasks("tasks");
    
    // Tasks
    grunt.registerTask("test", ["nodeify", "nodeunit"]);
};
