const less = require('metalsmith-less');
const metalsmith = require('metalsmith');
const { watch, series } = require('gulp');
const concat = require('metalsmith-concat');
const ignore = require('metalsmith-ignore');
const browserSync = require('browser-sync');
const mstatic = require('metalsmith-static');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const autoprefixer = require('metalsmith-autoprefixer');

function build(done) {
  metalsmith(__dirname)
    .use(collections({
      tutorials: { pattern: 'tutorials/**', sortBy: 'title' },
      downloads: { pattern: 'downloads/**', sortBy: 'title' }
    }))
    .use(permalinks({ pattern: ':slug', relative: false }))
    .use(layouts({ engine: 'ejs' }))
    .use(less({ pattern: 'styles/main.less', render: { paths: ['src/styles'] } }))
    .use(autoprefixer())
    .use(ignore('**/*.less'))
    .use(concat({
      files: [
        'scripts/responsee.js',
        'scripts/owl.carousel.js',
        'scripts/accordion.js',
        'scripts/template-scripts.js',
        'js-cookie/src/js.cookie.js',
        'scripts/site.js'
      ],
      searchPaths: ['node_modules', 'src'],
      output: 'scripts/main.js'
    }))
    .use(concat({
      files: [
        'jquery.klavier/dist/jquery.klavier.min.js',
        'vexflow/releases/vexflow-min.js',
        'notelex/dist/notelex.min.js'
      ],
      output: 'scripts/notelex-bundle.js',
      searchPaths: ['node_modules']
    }))
    .use(mstatic({ src: 'node_modules/video.js/dist', dest: 'vendor/video.js' }))
    .use(mstatic({ src: 'node_modules/videojs-youtube/dist', dest: 'vendor/videojs-youtube' }))
    .use(mstatic({ src: 'scripts/jquery.klavier.js', dest: 'scripts/jquery.klavier.js' }))
    .use(mstatic({ src: 'scripts/gbExercises.js', dest: 'scripts/gbExercises.js' }))
    .build(done);
}

function reload() {
  browserSync.reload();
}

function startWatch() {
  browserSync({ server: { baseDir: 'build' }, port: 3000 });
  watch(['src/**', 'layouts/**'], series(build, reload));
}

exports.build = build;
exports.default = series(build, startWatch);
