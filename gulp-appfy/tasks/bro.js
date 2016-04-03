var gulp = require( 'gulp' );
module.exports = function ( config ) {
gulp.task('build', () =>
  gulp.src('index.js')
    .pipe(bro())
    .pipe(gulp.dest('dist'))
)

gulp.watch('*.js', ['build'])
