module.exports = function () {
    var module = {};
   
    module.requireJsOptions = function (opt) {
        var optimize = opt === 'dev' ? 'none' : 'uglify';
        return {
            appDir: 'ui_src/js',
            baseUrl: './',
            optimize: optimize,
            mainConfigFile: 'ui_src/js/app.js',
            dir: 'ui_dist/js',
            modules: [
                {
                    name: 'pagetypes/about-page'
                },
                {
                    name: 'pagetypes/contact-page'
                }
            ]
        };
    };

    module.compassOptions = function (opt) {
        var outPutStyle = opt === 'dev' ? 'expanded' : 'compressed';
        return {
            sassDir: 'ui_src/sass',
            cssDir: 'ui_dist/css',
            outputStyle: outPutStyle
        };
    };

    return module;
};