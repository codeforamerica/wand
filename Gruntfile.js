module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*', 'grunt-*']
  });

  grunt.initConfig({
    buildDir: 'dist',
    srcDir: 'src',
    srcJs: '<%=srcDir%>/js/**/*.js',
    srcSass: '<%=srcDir%>/sass/**/*.scss',
    handlebars: 'node_modules/handlebars/dist',

    clean: {
      dist: {
        files: [{
          src: ['<%=buildDir%>']
        }]
      }
    },

    uglify: {
      build: {
        files: {
          '<%=buildDir%>/wand.min.js': ['<%=srcJs%>']
        }
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        files: [{
          expand: true,
          flatten: true,
          src: ['<%=srcSass%>'],
          dest: '<%=buildDir%>',
          ext: '.css'
        }]
      }
    },

    karma: {
      options: {
        files: [
          '<%=handlebars%>/handlebars.runtime.js',
          '<%=handlebars%>/handlebars.js',
          '<%=srcJs%>',
          'test/**/*.spec.js'
        ],
        basePath: '.',
        colors: true,
        frameworks: ['mocha', 'chai'],
        plugins: [
          'karma-chai',
          'karma-mocha',
          'karma-phantomjs-launcher',
          'karma-spec-reporter'
        ],
        browsers: ['PhantomJS']
      },
      single: {
        singleRun: true,
        reporters: ['spec']
      },
      continuous: {
        singleRun: false,
        reporters: ['spec']
      }
    },

    jshint: {
      files: ['<%=srcJs%>', 'Gruntfile.js'],
      options: {
        curly: true,
        devel: true,
        eqnull: true,
        evil: true,
        immed: true,
        maxcomplexity: 8,
        newcap: true,
        noarg: true,
        sub: true,
        trailing: true
      }
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dev: {
        src: [
          '<%=handlebars%>/handlebars.runtime.js',
          '<%=handlebars%>/handlebars.js',
          '<%=srcJs%>'
        ],
        dest: '<%=buildDir%>/wand.js',
      },
    },

    watch: {
      js: {
        files: ['<%=srcJs%>'],
        tasks: [
          'concat:dev'
        ],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['<%=srcSass%>'],
        tasks: [
          'concat:dev',
          'sass'
        ],
        options: {
          spawn: false
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: [
          'concat:dev'
        ]
      }
    },

    connect: {
      development: {
        options: {
          base: './',
          port: 4000
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'uglify:build'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:single'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'concat:dev',
    'sass',
    'connect:development',
    'watch'
  ]);
};
