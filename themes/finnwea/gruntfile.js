module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Clean compiled assets
     */
    clean: {
      beforeDist: 'dist/**',
      afterDist: 'dist/tmp'
    },

    /**
     * Concatenate JavaScript
     */
    // concat: {
    //   options: {
    //     stripBanners: true
    //   },
    //   compileCore: {
    //     src: [
    //       // 'src/js/bootstrap/transition.js',
    //       // 'src/js/bootstrap/alert.js',
    //       // 'src/js/bootstrap/button.js',
    //       // 'src/js/bootstrap/carousel.js',
    //       // 'src/js/bootstrap/collapse.js',
    //       // 'src/js/bootstrap/dropdown.js',
    //       // 'src/js/bootstrap/modal.js',
    //       // 'src/js/bootstrap/tooltip.js',
    //       // 'src/js/bootstrap/popover.js',
    //       // 'src/js/bootstrap/scrollspy.js',
    //       // 'src/js/bootstrap/tab.js',
    //       // 'src/js/bootstrap/affix.js'
    //     ],
    //     dest: 'dist/tmp/js/<%= pkg.name %>.js'
    //   }
    // },

    /**
     * Obfuscate JavaScript
     */
    // uglify: {
    //   options: {
    //     preserveComments: false
    //   },
    //   core: {
    //     src: '<%= concat.compileCore.dest %>',
    //     dest: 'dist/js/<%= pkg.name %>.min.js'
    //   }
    // },

    /**
     * Compile Sass to CSS
     */
    sass: {
      compileCore: {
        src: 'src/sass/bootstrap-theme.scss',
        dest: 'dist/tmp/css/<%= pkg.name %>.css'
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
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },

    /**
     * Copy fonts
     */
    copy: {
      fonts: {
        expand: true,
        flatten: false,
        cwd: 'src/fonts/',
        src: ['*.*', '**/*.*'],
        dest: 'dist/fonts/'
      },
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
        files: 'src/sass/**/*.scss',
        tasks: ['dist-css']
      },
      // js: {
      //   files: 'src/js/**/*.js',
      //   tasks: ['dist-js']
      // }
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
    'copy:fonts',
    'copy:images',
    // 'dist-js',
    'clean:afterDist'
  ]);

  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);

};
