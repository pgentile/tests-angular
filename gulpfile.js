'usr strict';

var gulp = require('gulp')
var bower = require('gulp-bower');


/* C'est de la merde, ca ne fait pas le mapping
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
})
*/

gulp.task('default', ['bower'], function() {

})
