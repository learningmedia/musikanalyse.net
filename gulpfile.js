var gulp        = require('gulp');
var browserSync = require('browser-sync');
var metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var layouts     = require('metalsmith-layouts');
var inPlace     = require('metalsmith-in-place');
var concat      = require('metalsmith-concat');

gulp.task('build', function (done) {
  metalsmith(__dirname)
    .use(collections({ tutorials: { pattern: 'tutorials/**', sortBy: 'date' } }))
    .use(permalinks({ pattern: ':slug', relative: false }))
    .use(layouts({ engine: 'handlebars', partials: 'partials' }))
    .use(inPlace({ engine: 'handlebars', partials: 'partials' }))
    .use(concat({ files: ['content/bootstrap.css', 'content/bootstrap-responsive.css', 'content/site.css'], output: 'content/styles.css' }))
    .use(concat({ files: ['content/jquery.js', 'content/bootstrap.js', 'content/site.js'], output: 'content/scripts.js' }))
    .build(done);
});

gulp.task('reload', ['build'], function () {
  browserSync.reload();
})

gulp.task('watch', ['build'], function () {
  browserSync({ server: { baseDir: 'build' }, port: 3000 });
  gulp.watch(['src/**', 'layouts/**', 'partials/**'], ['reload']);
});

gulp.task('default', ['watch']);
