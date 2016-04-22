var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    browserSync = require( 'browser-sync' ),
    streamify = require( 'gulp-streamify' ),
    source = require( 'vinyl-source-stream' ),
    path = require( 'path' ),
    util = require('gulp-util'),
    collapse = require('bundle-collapser/plugin'),
    buffer = require('vinyl-buffer'),
	bowerResolve = require('bower-resolve'),
     _ = require('underscore'),
    sourcemaps = require('gulp-sourcemaps'),
    nodeResolve = require('resolve');
    //~ p = require('partialify/custom');

/**
 * Gulp task to run browserify over config.entryJs
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
module.exports = function ( config ) {
    var onBundleError;
    if ( config.notify.onError ) {
        onBundleError = notify.onError( "Browserify Error: <%= error.message %>" );
    } else {
        onBundleError = function ( err ) {
            util.log(util.colors.red('Error'), err.message);
        };
    }

    /**
     * Function to run the Browserify Bundler over pipes
     * @param  {object} bundler Bundler object
     * @return {object} stream  Gulp stream
     */
    function browserifyBundle( bundler ) {
        if ( !(config.debug) ) {
            bundler.plugin(collapse);
        }

        var stream = bundler
            .bundle()
            .on( "error", onBundleError )
            .pipe( source( 'index.vendor.js' ) );

        //~ if ( config.debug ) {
            // source map external
            stream = stream.pipe(buffer())
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/'
                }));
        //~ } else {
            //~ stream = stream.pipe( streamify( uglify() ) );
        //~ }

        stream = stream.pipe( gulp.dest( config.destVendorPath ) );

        if ( config.notify.onUpdated ) {
            return stream.pipe( notify( "Browserify Bundle - Updated" ) );
        }

        return stream;
    }

    return function () {
        var bundler = browserify( {
            entries: path.join(config.sourcePath, config.entryVendorJs),
            debug: false
        } );
        
        _.each(config.vendors, function(mod){
			bundler.require(nodeResolve.sync(mod), { expose: mod });
		});
        bundler.require(bowerResolve.fastReadSync('Jcrop'), { expose: 'Jcrop' });
        //~ bundler.external('jquery');
        //~ bundler.external('backbone');

        return browserifyBundle( bundler );
    };
};
