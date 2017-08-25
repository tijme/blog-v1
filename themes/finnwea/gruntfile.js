module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Clean compiled assets
     */
    clean: {
      beforeDist: ['source/css/**', 'source/img/**'],
      afterDist: 'tmp'
    },

    /**
     * Compile Sass to CSS
     */
    sass: {
      options: {
        noCache: true
      },
      compileCore: {
        src: 'sass/bootstrap-theme.scss',
        dest: 'tmp/css/<%= pkg.name %>.css'
      }
    },

    /**
     * Minify CSS files
     */
    cssmin: {
      options: {
        keepSpecialComments: false
      },
      minifyCore: {
        src: '<%= sass.compileCore.dest %>',
        dest: 'source/css/<%= pkg.name %>.min.css'
      }
    },

    /**
     * Copy fonts
     */
    copy: {
      images: {
        expand: true,
        flatten: false,
        cwd: 'src/img/',
        src: ['*.*', '**/*.*'],
        dest: 'dist/img/'
      }
    },

    /**
     * Watch for changes
     */
    watch: {
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['default']
      }
    },

    exec: {
      hexo_clean: {
        cmd: 'hexo clean',
        cwd: '../../'
      },
      hexo_generate: {
        cmd: 'hexo generate',
        cwd: '../../'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dist-css', [
    'sass:compileCore',
    'cssmin:minifyCore',
    'copy:images',
  ]);

  grunt.registerTask('default', [
    'clean:beforeDist',
    'dist-css',
    'copy:images',
    'clean:afterDist',
    'exec:hexo_clean',
    'exec:hexo_generate'
  ]);

  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);

};
