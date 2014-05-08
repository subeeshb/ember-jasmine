module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

        // please refer to "path" in package.json
        // defining paths of /scripts/ in app & dist folder
        appScripts: '<%= pkg.path.app %>/<%= pkg.path.scripts %>',
        distScripts: '<%= pkg.path.dist %>/<%= pkg.path.scripts %>',

        // defining paths of /scripts/modules/ in app & dist folder
        appModules: '<%= appScripts %>/<%= pkg.path.modules %>',
        distModules: '<%= distScripts %>/<%= pkg.path.modules %>',

        // defining path of source and compiled template in app folder
        sourceTemplates: '<%= pkg.path.app %>/<%= pkg.path.templates %>/<%= pkg.path.html %>',
        compiledTemplates: '<%= pkg.path.app %>/<%= pkg.path.templates %>/<%= pkg.path.js %>',

        meta: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        ember_handlebars: {
          compile: {
            options: {
              processName: function(filePath) {
                var data = filePath.substring(filePath.lastIndexOf('/') + 1,filePath.length);
                var arr=[];
                arr = data.split(".");
                fullName = (filePath.indexOf('/components/') > -1) ? 'components/'+arr[0] : arr[0];
                return fullName;
              }
            },
            files: [
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'templates/html/',      // Src matches are relative to this path.
              src: ['**/*.handlebars'], // Actual pattern(s) to match.
              dest: 'templates/js/',   // Destination path prefix.
              ext: '.js'   // Dest filepaths will have this extension.
            }
            ]
          }
        },

        concat:{

          library:{
            src:[
            'js/libs/jquery-1.10.2.js',
            'js/libs/handlebars-1.1.2.js',
            'js/libs/ember-1.5.0.js',
            ],
            dest:'dist/js/libs.js'
          },

          app:{
            src:[
            'js/app.js',
            'js/modules/**/*.js',
            'templates/js/**/*.js'
            ],
            dest:'dist/js/app.js'
          },

          app_for_testing:{
            src:[
            'dist/js/app.js',
            'tests/runner.js'
            ],
            dest:'dist/js/app.js'
          },
          test_specs: {
            src:[
            'tests/specs/**/test-*.js'
            ],
            dest:'dist/tests/specs.js'
          }          
        },

        copy: {
         main: {
           files: [
           {
             expand: true,
             cwd: '.',
             src: ['index.html', 'data.json'],
             dest: 'dist'
           },
           {
             expand: true,
             cwd: 'css',
             src: ['*.css'],
             dest: 'dist/css'
           }
           ]
         },
         tests: {
           files: [
           {
             expand: true,
             cwd: 'tests',
             src: ['**/*.js', '**/*.css'],
             dest: 'dist/tests'
           }
           ]
         }
       },

       clean: {
        dist: "dist/",
        jsTemplate: "app/templates/html/**/*.js"
      },

      karma: {
        unit: {
          configFile: 'karma.conf.js'
        }
      },

      nodestatic: {
        server: {
          options: {
            port: 9999,
            base: 'dist',
            keepalive: true
          }
        },
        server_watch: {
          options: {
            port: 9999,
            base: 'dist',
            keepalive: false
          }
        }
      },

      watch: {
        options: {
          livereload: true,
        },
        css: {
          files: ['js/**/*', 'tests/**/*'],
          tasks: ['build_with_qunit'],
        },
      }

    });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-ember-handlebars');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-nodestatic');
grunt.loadNpmTasks('grunt-contrib-watch');


grunt.registerTask('default', [
  'clean',
  'ember_handlebars',
  'concat:library',
  'concat:app',
  'copy'
  ]);

grunt.registerTask('build_with_qunit', [
  'default',
  'concat:app_for_testing',
  'copy:tests',
  'concat:test_specs'
  ]);


//for development. Build, add test hooks, and watch for changes.
grunt.registerTask('dev', [
  'build_with_qunit',
  'nodestatic:server_watch',
  'watch'
  ]);

//Build without test runner hooks and start server.
grunt.registerTask('server', [
  'default',
  'nodestatic'
  ]);


//production build. Ideally, should also contain additional tasks to minify JS, compress images, etc
grunt.registerTask('dist', [
  'default',
  'karma'
]);

};

