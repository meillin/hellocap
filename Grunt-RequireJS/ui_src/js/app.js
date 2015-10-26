requirejs.config({
    baseUrl: 'ui_dist/js',
    paths: {
        'jquery': 'vendor/jquery',
        'bootstrap': 'vendor/bootstrap'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

require(['../ui_dist/js/pagetypes/' + pageType + '.js']);
