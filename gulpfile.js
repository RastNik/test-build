
let progect_folder = "dist";
let source_folder = "src";

let fs = require('fs');

let path = {
	build: {
		html: progect_folder + "/",
		php: progect_folder + "/",
		css: progect_folder + "/css/",
		js: progect_folder + "/js/",
		img: progect_folder + "/img/",
		fonts: progect_folder + "/fonts/",
		files: progect_folder + "/files/",
		PHPMailer: progect_folder + "/PHPMailer/"
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		php: [source_folder + "/*.php", "!" + source_folder + "/_*.php"],
		css: [source_folder + "/sass/*.sass", "!" + source_folder + "/sass/_*.sass"],
		js: source_folder + "/js/*.js",
		img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp,svg,mp4}",
		svgNoSprite: source_folder + "/img/*.svg",
		fonts: source_folder + "/fonts/**",
		files: source_folder + "/files/**",
		PHPMailer: source_folder + "/PHPMailer/**"
	},
	watch: {
		html: source_folder + "/**/*.html",
		php: source_folder + "/**/*.php",
		css: source_folder + "/sass/**/*.sass",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp,svg,mp4}",
		fonts: source_folder + "/fonts/**",
		files: source_folder + "/files/**",
		PHPMailer: source_folder + "/PHPMailer/**"
	},
	clean: "./" + progect_folder + "/"
}

let { src, dest, parallel } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	groupMedia = require('gulp-group-css-media-queries'),
	cleanCss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	replace = require('gulp-replace'),
	webp = require('gulp-webp');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + progect_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function php() {
	return src(path.src.php)
		.pipe(fileinclude())
		.pipe(dest(path.build.php))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			sass({
				outputStyle: "expanded"
			})
		)
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(cleanCss())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream())
}

function files() {
	return src(path.src.files)
		.pipe(dest(path.build.files))
		.pipe(browsersync.stream())
}

function PHPMailer() {
	return src(path.src.PHPMailer)
		.pipe(dest(path.build.PHPMailer))
		.pipe(browsersync.stream())
}

function cb() { }

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.php], php);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.src.fonts], fonts);
	gulp.watch([path.src.files], files);
	gulp.watch([path.src.PHPMailer], PHPMailer);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, php, css, js, images, fonts, files, PHPMailer));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.php = php;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.files = files;
exports.PHPMailer = PHPMailer;
exports.build = build;
exports.watch = watch;
exports.default = watch;

function buildProduction(done) {
	gulp.series(clean, gulp.parallel(html, php, css, js, images, fonts, files, PHPMailer))(done);
}

exports.buildProduction = buildProduction;
