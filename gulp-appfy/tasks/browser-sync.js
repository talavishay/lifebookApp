var browserSync = require( 'browser-sync' );

/**
 * Gulp task to create a server test
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
module.exports = function ( config ) {
    return function () {
        browserSync( {
			browser: "google-chrome",
			reloadOnRestart: true,
			reloadOnRestart: true,
			notify: true,

			ui: {
				port: 8080
			},
			tunnel: "d8",
			startPath: "/modules/custom/app/js/",
			//~ ghostMode: true,
            //~ port: config.browsersync.port,
            notify: config.browsersync.notify,
            //~ server: {
                //~ baseDir: './',
				//~ directory: true,
				//~ logLevel: "debug"
            //~ },
	    //files: ["src/svg/**/*.svg"]
        });
    };
};
