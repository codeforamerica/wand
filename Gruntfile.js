module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*']
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

      }
    },

    connect: {
      options: {
        port: 4000
      },
      development: {
        options: {
          keepalive: true,
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'uglify:build'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'copy',
    'connect:development',
    'watch'
  ]);
};
