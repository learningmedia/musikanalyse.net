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
var static       = require('metalsmith-static');

gulp.task('build', function (done) {
  metalsmith(__dirname)
    .use(collections({ tutorials: { pattern: 'tutorials/**', sortBy: 'title' } }))
    .use(collections({ downloads: { pattern: 'downloads/**', sortBy: 'tag' } }))
    .use(permalinks({ pattern: ':slug', relative: false }))
    .use(layouts({ engine: 'ejs' }))
    .use(inPlace({ engine: 'ejs', pattern: '**/*.html' }))
    .use(less({ pattern: 'styles/main.less', render: { paths: ['src/styles'] } }))
    .use(autoprefixer())
    .use(ignore('**/*.less'))
    .use(concat({ files: ['scripts/responsee.js', 'scripts/owl.carousel.js', 'scripts/template-scripts.js', 'scripts/site.js'], output: 'scripts/main.js' }))
    .use(static({ src: 'node_modules/mediaelement/build', dest: 'vendor/mediaelement' }))
    .build(done);
});

gulp.task('reload', ['build'], function () {
  browserSync.reload();
})

gulp.task('watch', ['build'], function () {
  browserSync({ server: { baseDir: 'build' }, port: 3000 });
  gulp.watch(['src/**', 'layouts/**'], ['reload']);
});

gulp.task('default', ['watch']);
