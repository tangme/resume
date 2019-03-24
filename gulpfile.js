const gulp = require('gulp');
const babel = require('gulp-babel');//转义js语法
// const concat = require('gulp-concat');
const uglify = require('gulp-uglify');//压缩js
const rename = require('gulp-rename');//文件重命名
const cleanCSS = require('gulp-clean-css');//压缩css
const jsonMinify = require('gulp-json-minify');//压缩json
const useref = require('gulp-useref');//文件合并串联
const gulpif = require('gulp-if');//判断


// const del = require('del');
 
const outPutFolderName = 'docs';

//定义 入口、出口路径
const paths = {
	styles:{
		src:'src/css/*.css',
		dest:`${outPutFolderName}/css/`
	},
	scripts:{
		src:'src/js/*.js',
		dest:`${outPutFolderName}/js/`
	},
	jsons:{
		src:'src/js/*.json',
		dest:`${outPutFolderName}/js/`
	},
	htmls:{
		src:'src/*.html',
		dest:`${outPutFolderName}/`
	},
	imgs:{
		src:'src/images/*.*',
		dest:`${outPutFolderName}/images/`
	}
};

/**
 * [styles 压缩css]
 * @return {[type]} [description]
 */
function styles(){
	return gulp.src(paths.styles.src)
	.pipe(cleanCSS())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest(paths.styles.dest));
}

/**
 * [scripts 转义压缩js]
 * @return {[type]} [description]
 */
function scripts(){
	return gulp.src(paths.scripts.src)
	.pipe(babel({
		presets: ['@babel/preset-env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest(paths.scripts.dest));

	/*return gulp.src(paths.scripts.src,{ sourcemaps: true })
	.pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest(paths.scripts.dest));*/
}

/**
 * [compressJsons 压缩json]
 * @return {[type]} [description]
 */
function compressJsons(){
	return gulp.src(paths.jsons.src)
        .pipe(jsonMinify())
        .pipe(gulp.dest(paths.jsons.dest))
}

/**
 * [compressImages 压缩图片]
 * @return {[type]} [description]
 */
function compressImages(){
	return gulp.src(paths.imgs.src)
	.pipe(gulp.dest(paths.imgs.dest));
}

/**
 * [buildFromHTML html文件中串联定义好的 js、css文件]
 * @return {[type]} [description]
 */
function buildFromHTML(){
	return gulp.src(paths.htmls.src)
	.pipe(useref())
	.pipe(gulpif('*.css',cleanCSS()))
	.pipe(gulpif('*.js',babel({
		presets: ['@babel/preset-env']
	})))
	.pipe(gulpif('*.js',uglify()))
	.pipe(gulp.dest(paths.htmls.dest));
}

/**
 * [打包任务]
 */
gulp.task('build',function(){
	console.log('build task is running.');
	compressImages();
	compressJsons();
	buildFromHTML();
});

gulp.task('dev',function(){
	gulp.watch(paths.styles.src,[styles]);
	gulp.watch(paths.scripts.src,[scripts]);
});
