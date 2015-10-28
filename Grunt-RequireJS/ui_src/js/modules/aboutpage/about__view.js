define([
    'jquery',
	'modules/aboutpage/about__collection',
    'modules/aboutpage/about__controller',
    'modules/aboutpage/about__model'
], function ($) {
    $('intro').append('jquery is loaded and used');
    console.log('about page view loaded');
});
