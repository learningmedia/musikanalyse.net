const moment = require('moment');
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
const metadata = require('metalsmith-collection-metadata');

const downloadInfos = [{
  title: 'Grundlagen',
  categories: ['grundlagen']
}, {
  title: 'Musik und Form',
  categories: ['form']
}, {
  title: 'Zu Methoden der musikalischen Analyse',
  categories: ['methoden']
}, {
  title: 'Gattungen (Fuge, Sonate etc.)',
  categories: ['gattungen']
}, {
  title: 'Musik und Kontext (Musikgeschichte)',
  categories: ['Musikgeschichte']
}, {
  title: 'Arbeitsbögen',
  categories: ['aufgaben']
}];

const tutorialInfos = [{
  title: 'Grundlagen',
  categories: ['Grundlagen']
}, {
  title: 'Form',
  categories: ['Form']
}, {
  title: 'Stilübungen & Improvisation',
  categories: ['Stilübungen (Tonsatz)', 'Improvisation']
}, {
  title: 'Satzmodelle',
  categories: ['Satzmodelle']
}, {
  title: 'Musik und Kontext',
  categories: ['Musikgeschichte']
}, {
  title: 'Analysen und Werkeinführungen',
  categories: ['Analysen']
}, {
  title: 'Methoden',
  categories: ['Methoden']
}, {
  title: 'Terminologie',
  categories: ['Terminologie']
}, {
  title: 'Pop & Rock',
  categories: ['Popularmusik']
}, {
  title: 'Film & Filmanalyse',
  categories: ['Film']
}, {
  title: 'Didaktik (Schule)',
  categories: ['Didaktik']
}];

function summary({ dest }) {
  return function (files, metalsmith) {
    const summaryCollections = {
      tutorials: metalsmith._metadata.tutorials.map(tut => ({
        title: tut.title,
        author: tut.author,
        date: tut.date.toISOString(),
        modified: tut.modified.toISOString(),
        categories: tut.category.split(',').map(x => x.trim()),
        abstract: tut.abstract,
        link: `/${tut.path}`
      })),
      downloads: metalsmith._metadata.downloads.map(dl => ({
        title: dl.title,
        author: dl.author,
        categories: dl.category.split(',').map(x => x.trim()),
        abstract: dl.abstract,
        thumbnail: dl.thumbnail,
        link: dl.link
      }))
    };

    files[dest] = {
      contents: JSON.stringify(summaryCollections, null, 2),
      path: dest
    };
  }
}

function build(done) {
  metalsmith(__dirname)
    .use(collections({
      tutorials: { pattern: 'tutorials/**', sortBy: 'title' },
      downloads: { pattern: 'downloads/**', sortBy: 'title' }
    }))
    .use(metadata({
      'tutorials': {
        backButton: true
      }
    }))
    .use(permalinks({ pattern: ':slug', relative: false }))
    .use(layouts({
      engineOptions: {
        globals: {
          downloadInfos,
          tutorialInfos
        },
        filters: {
          formatDate: date => moment(date).locale('de-DE').format('LL'),
          categories: (coll, cats) => coll.filter(item => cats.some(x => item.category.includes(x)))
        }
      }
    }))
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
    .use(mstatic({ src: '.htacaccess', dest: '/' }))
    .use(mstatic({ src: 'web.config', dest: '/' }))
    .use(summary({ dest: 'summary.json' }))
    .build(done);
}

function reload(done) {
  browserSync.reload();
  done();
}

function startWatch() {
  browserSync({ server: { baseDir: 'build' }, port: 3000 });
  watch(['src/**', 'layouts/**'], series(build, reload));
}

exports.build = build;
exports.default = series(build, startWatch);
