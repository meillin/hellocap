define([
    'jquery',
	'modules/frontpage/frontpage__collection',
    'modules/frontpage/frontpage__model',
    'modules/frontpage/frontpage__controller',
    'modules/contactpage/contact__view'
], function ($) {
    $('.jumbotron').html('jquery is included');

    console.log('frontpage view loaded');
});
