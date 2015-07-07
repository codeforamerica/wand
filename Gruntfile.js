module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*', 'grunt-*']
  });

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

    standard: {
      options: {
        format: true
      },
      app: {
        src: ['<%=srcJs%>']
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
        trailing: true,
        asi: true
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
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'standard',
    'uglify:build'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'standard'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'copy',
    'connect:development',
    'watch',
  ]);
};
