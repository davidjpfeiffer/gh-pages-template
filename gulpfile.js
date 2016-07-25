'use strict';

let gulp = require('gulp-help')(require('gulp'));
let sass = require('gulp-sass');
let changed = require('gulp-changed');
let minifyHTML = require('gulp-htmlmin');
let minifyCSS = require('gulp-clean-css');
let minifyJS = require('gulp-uglify');
let inlineSource = require('gulp-inline-source');
let useRef = require('gulp-useref');
let gulpIf = require('gulp-if');
let del = require('del');
let imageMin = require('gulp-imagemin');
let runSequence = require('run-sequence');
let browserSync = require('browser-sync').create();
let sitemap = require('gulp-sitemap');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./gulp.config.json'));

gulp.task('build-dev', 'Build all files for development environment.', () => {
  runSequence('clean', 'build');
});

gulp.task('build-prod', 'Build all files for production environment.', () => {
  runSequence('clean', 'build', 'minify', 'inline', 'build-favicon', 'build-sitemap');
});

gulp.task('build', false, ['build-html', 'build-styles', 'build-scripts', 'build-images', 'build-fonts', 'build-icons']);

gulp.task('build-html', 'Build and concatenate all HTML files.', () => {
  return gulp.src(config.paths.src.html)
    .pipe(gulp.dest(config.paths.dist.html))
    .pipe(browserSync.stream());
});

gulp.task('build-styles', 'Build and concatenate all CSS / SCSS files.', () => {
  return gulp.src(concat(config.paths.src.styles, config.paths.lib.styles))
    .pipe(changed(config.paths.dist.styles))
    .pipe(sass())
    .on('error', swallowError)
    .pipe(gulp.dest(config.paths.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('build-scripts', 'Build and concatenate all JS files.', () => {
  return gulp.src(concat(config.paths.lib.scripts, config.paths.src.scripts))
    .pipe(changed(config.paths.dist.scripts))
    .pipe(gulp.dest(config.paths.dist.scripts))
    .pipe(browserSync.stream());
});

gulp.task('build-images', 'Build images.', () => {
  return gulp.src(config.paths.src.img)
    .pipe(gulp.dest(config.paths.dist.img));
});

gulp.task('minify-images', 'Minify images in src (run whenever you add new images).', () => {
  return gulp.src(config.paths.src.img)
    .pipe(imageMin())
    .pipe(gulp.dest('src/assets/images/'));
});

gulp.task('build-fonts', 'Build fonts.', () => {
  return gulp.src(config.paths.src.fonts)
    .pipe(changed(config.paths.dist.fonts))
    .pipe(gulp.dest(config.paths.dist.fonts));
});

gulp.task('build-icons', 'Build icons.', () => {
  return gulp.src(config.paths.src.icons)
    .pipe(changed(config.paths.dist.icons))
    .pipe(gulp.dest(config.paths.dist.icons));
});

gulp.task('build-favicon', false, () => {
  return gulp.src(config.paths.src.favicon)
    .pipe(gulp.dest(config.paths.dist.favicon));
});

gulp.task('build-sitemap', false, () => {
  return gulp.src(config.paths.src.html, { read: false })
    .pipe(sitemap({
      siteUrl: 'https://davidjpfeiffer.github.io/gh-pages-template',
      changefreq: 'monthly',
      priority: '1.0',
      lastmod: getUtcDate()
    }))
    .pipe(gulp.dest(config.paths.dist.sitemap));
});

gulp.task('minify', false, () => {
  return gulp.src(config.paths.dist.html + '/index.html')
    .pipe(useRef())
    .pipe(gulpIf('*.html', minifyHTML({ collapseWhitespace: true })))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.js', minifyJS()))
    .pipe(gulp.dest(config.paths.dist.html));
});

gulp.task('inline', false, () => {
  return gulp.src(config.paths.dist.html + '/index.html')
    .pipe(inlineSource())
    .pipe(gulp.dest(config.paths.dist.html));
});

gulp.task('clean', 'Delete generated files.', () => {
  return del(['dist']);
});

gulp.task('watch', 'Watch files for changes.', ['browser-sync'], () => {
  gulp.watch(config.paths.watch.html, ['build-html']);
  gulp.watch(config.paths.watch.styles, ['build-styles']);
  gulp.watch(config.paths.watch.scripts, ['build-scripts']);
});

gulp.task('browser-sync', false, () => {
  browserSync.init({
    server: 'dist',
    logFileChanges: true
  });
});

function getUtcDate() {
  return (new Date()).getTime();
}

function concat(arrayOne, arrayTwo) {
  return [].concat(arrayOne, arrayTwo);
}

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}