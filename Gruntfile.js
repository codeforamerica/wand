module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*', 'grunt-*']
  });

  grunt.initConfig({
    buildDir: 'dist',
    srcDir: 'src',
    srcJs: '<%=srcDir%>/js/**/*.js',
    srcSass: '<%=srcDir%>/sass/**/*.scss',

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
        separator: ';'
      },
      dist: {
        src: ['<%=srcJs%>'],
        dest: '<%=buildDir%>/wand.js'
      }
    },

    watch: {
      js: {
        files: ['<%=srcJs%>'],
        tasks: [
          'clean:dist',
          'concat'
        ],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['<%=srcSass%>'],
        tasks: [
          'clean:dist',
          'concat',
          'sass'
        ],
        options: {
          spawn: false
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: [
          'clean:dist',
          'concat'
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
    'concat',
    'sass',
    'connect:development',
    'watch'
  ]);
};
