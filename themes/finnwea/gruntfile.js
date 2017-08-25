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
        tasks: ['dist-css']
      }
    },

  });

  require('load-grunt-tasks')(grunt);

  // grunt.registerTask('dist-js', [
  //   'concat',
  //   'uglify:core',
  //   'copy:images',
  // ]);

  grunt.registerTask('dist-css', [
    'sass:compileCore',
    'cssmin:minifyCore',
    'copy:images',
  ]);

  grunt.registerTask('default', [
    'clean:beforeDist',
    'dist-css',
    // 'copy:fonts',
    'copy:images',
    // 'dist-js',
    'clean:afterDist'
  ]);

  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);

};
