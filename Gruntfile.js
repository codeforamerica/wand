module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*', 'grunt-*']
  })

  grunt.initConfig({
    buildDir: 'dist',
    srcDir: 'src',
    srcJs: '<%=srcDir%>/js/**/*.js',

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
      files: ['<%=srcJs%>'],
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

    copy: {
      js: {
        expand: true,
        flatten: true,
        src: ['<%=srcJs%>'],
        dest: '<%=buildDir%>'
      }
    },

    watch: {
      js: {
        files: ['<%=srcDir%>/**/*.js'],
        tasks: [
          'clean:dist',
          'copy'
        ],
        options: {
          spawn: false
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: [
          'clean:dist',
          'copy'
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
  })

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'uglify:build'
  ])

  grunt.registerTask('test', [
    'jshint',
    'karma:single'
  ])

  grunt.registerTask('default', [
    'clean:dist',
    'copy',
    'connect:development',
    'watch'
  ])
}
