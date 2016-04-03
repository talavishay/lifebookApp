var watch = require( 'gulp-watch' ),
    browserSync = require( 'browser-sync' ),
    path = require( 'path' ),
    runSequence = require( 'run-sequence' );

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    var stylesSourceWatch = [
        //~ path.join(config.sourcePath, 'node_modules/**/*.css'),
        //~ path.join(config.sourcePath, 'css/**/*.css'),
        //~ path.join(config.sourcePath, 'styles/**/*.css'),
        //~ path.join(config.sourcePath, 'components/**/*.css'),
        path.join(config.sourcePath, config.entryCss)
    ];

    return function () {
         watch( 'src/**/*.js', function () {
             runSequence( 'js', browserSync.reload );
         } );

        watch(path.join(config.sourcePath, config.entryCss), function () {
            runSequence( 'postcss', browserSync.reload );
        } );
    };
};
