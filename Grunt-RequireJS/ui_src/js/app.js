
requirejs.config({
    baseUrl: 'ui_src/js',
    paths: {
        'jquery': 'vendor/jquery',
        'bootstrap': 'vendor/bootstrap'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

require(['../ui_dist/js/pagetypes/' + pageType + '.js']);

/*
require([
    '/pagetypes/front-page.js',
    '/pagetypes/about-page.js',
    '/pagetypes/contact-page.js'
]);
*/
