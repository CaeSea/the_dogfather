const devBuild = process.env.NODE_ENV !== "production",
  src = "src",
  dist = "dist",
  sass = require("gulp-sass"),
  server = require("browser-sync").create(),
  del = require("del"),
  postcss = require("gulp-postcss"),
  assets = require("postcss-assets"),
  mqpacker = require("css-mqpacker"),
  cssnano = require("cssnano"),
  gulp = require("gulp"),
  noop = require("gulp-noop"),
  htmlclean = require("gulp-htmlclean"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  concat = require("gulp-concat"),
  deporder = require("gulp-deporder"),
  terser = require("gulp-terser"),
  stripdebug = devBuild ? null : require("gulp-strip-debug"),
  sourcemaps = devBuild ? require("gulp-sourcemaps") : null,
  merge = require("merge-stream");

function browserSync(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./dist/**/*"]);
}

function favicon() {
  const out = `${dist}/`;

  return gulp
    .src(`${src}/*.png`)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
}

// image processing
function images() {
  const out = `${dist}/images/`;

  return gulp
    .src(`${src}/images/**/*`)
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
}

function html() {
  const out = `${dist}/`;

  return gulp
    .src(`${src}/**/*.html`)
    .pipe(newer(out))
    .pipe(devBuild ? noop() : htmlclean())
    .pipe(gulp.dest(out));
}

function js() {
  return gulp
    .src(`${src}/js/**/*`)
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(deporder())
    .pipe(concat("main.min.js"))
    .pipe(stripdebug ? stripdebug() : noop())
    .pipe(terser())
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(`${dist}/js/`))
    .pipe(server.stream());
}

function sw() {
  const out = `${dist}/`;
  return gulp
    .src(`${src}/sw.js`)
    .pipe(newer(out))
    .pipe(terser())
    .pipe(gulp.dest(out))
    .pipe(server.stream());
}

// CSS processing
function css() {
  const scss = gulp
    .src(`${src}/scss/main.scss`)
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(
      sass({
        outputStyle: "nested",
        imagePath: "/images/",
        precision: 3,
        errLogToConsole: true
      }).on("error", sass.logError)
    );

  const reset = gulp.src("node_modules/normalize.css/normalize.css");

  return merge(reset, scss)
    .pipe(postcss([assets({ loadPaths: ["images/"] }), mqpacker, cssnano]))
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(`${dist}/css/`))
    .pipe(server.stream());
}

function fonts() {
  return gulp
    .src(`${src}/assets/fonts/**/*`)
    .pipe(gulp.dest(`./${dist}/assets/fonts/`));
}

// watch for file changes
function watch(done) {
  // html changes
  gulp.watch(`${src}/**/*.html`, gulp.series(html, reload));
  // css changes
  gulp.watch(`${src}/scss/**/*`, gulp.series(css));
  // js changes
  gulp.watch(`${src}/js/**/*`, gulp.series(js));
  //sw changes
  gulp.watch(`${src}/sw.js`, gulp.series(sw));

  done();
}

exports.html = gulp.series(images, html);
exports.css = gulp.series(images, css);
exports.favicon = favicon;
exports.js = js;
exports.sw = sw;
exports.fonts = fonts;
exports.clean = clean;
exports.build = gulp.series(
  exports.clean,
  gulp.parallel(
    exports.favicon,
    exports.fonts,
    exports.html,
    exports.css,
    exports.js,
    exports.sw
  )
);
exports.watch = gulp.parallel(watch, browserSync);
exports.default = gulp.series(exports.build, exports.watch);
