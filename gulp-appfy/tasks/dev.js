
var runSequence = require( 'run-sequence' );

/**
 * Gulp task to build the app for in mode developer
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    return function ( cb ) {
        //~ config.debug = false;
        config.watchify = true;
        //~ runSequence( 'browserify', 'browserify.vendor', 'postcss', cb );
        runSequence( 'browser-sync', 'js', 'postcss', 'watch', cb );
    };
};
