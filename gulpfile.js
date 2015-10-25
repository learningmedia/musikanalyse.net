var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var metalsmith   = require('metalsmith');
var collections  = require('metalsmith-collections');
var permalinks   = require('metalsmith-permalinks');
var layouts      = require('metalsmith-layouts');
var inPlace      = require('metalsmith-in-place');
var less         = require('metalsmith-less');
var autoprefixer = require('metalsmith-autoprefixer');
var ignore       = require('metalsmith-ignore');
var concat       = require('metalsmith-concat');

gulp.task('build', function (done) {
  metalsmith(__dirname)
    .use(collections({ tutorials: { pattern: 'tutorials/**', sortBy: 'title' } }))
    .use(permalinks({ pattern: ':slug', relative: false }))
    .use(layouts({ engine: 'handlebars', partials: 'partials' }))
    .use(inPlace({ engine: 'handlebars', partials: 'partials' }))
    .use(less({ pattern: 'styles/main.less', render: { paths: ['src/styles'] } }))
    .use(autoprefixer())
    .use(ignore('**/*.less'))
    .use(concat({ files: ['scripts/jquery.js', 'scripts/main.js'], output: 'scripts/main.js' }))
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
