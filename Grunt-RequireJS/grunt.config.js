module.exports = function () {
		var module = {};
		var dir = {
				dev: 'ui_src',
				dist: 'ui_dist',

				dev_js: 'ui_src/js',
				dev_sass: 'ui_src/sass',

				dist_js: 'ui_dist/js',
				dist_css: 'ui_dist/css'
		};

		module.requireJsOptions = function (opt) {
		    var optimize = opt === 'dev' ? ['none', true] : ['uglify', false];
				return {
						appDir: dir.dev_js, // source directory
						baseUrl: './', // relative to appDir
						optimize: optimize[0], // output style
						mainConfigFile: dir.dev_js + '/app.js', // main require file
						dir: dir.dist_js, // output directory,
						generateSourceMaps: optimize[1],
						preserveLicenseComments: false,
						modules: [
								{
									name: 'pagetypes/front-page'
								},
								{
									name: 'pagetypes/about-page'
								},
								{
									name: 'pagetypes/product-page'
								},
								{
									name: 'pagetypes/contact-page'
								}
						]
				};
		};

		module.requireJsSingleFile = function () {
		    return {
		        findNestedDependencies: true,
		        mainConfigFile: dir.dev_js + '/app.js',
		        baseUrl: dir.dev_js,
		        name : 'app',
		        out : dir.dist_js + '/app.js',
		        optimize : 'none'
		    };
		};

		module.compassOptions = function (opt) {
				var outPutStyle = opt === 'dev' ? 'expanded' : 'compressed';
				return {
						sassDir: dir.dev_sass,
						cssDir: dir.dist_css,
						outputStyle: outPutStyle
				};
		};

		return module;
};