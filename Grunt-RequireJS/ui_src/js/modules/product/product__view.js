define([
    'jquery',
    'knockout',
	'modules/product/product__collection'
], function ($, ko) {
    $('intro').append('jquery is loaded and used');
    console.log('Product view loaded');

    function Item(name, price, img) {
        var self = this;
        self.name = name;
        self.price = ko.observable(price);
        self.img = img;
    }

    // Overall viewmodel for this screen, along with initial state
    function ProductViewModel() {
        var self = this;
        // Editable data
        self.items = ko.observableArray([
            new Item("iPhone 6S", '1000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=iPhone6S&w=250&h=250'),
            new Item("Samsung Edge", '2000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=Samsung Edge&w=250&h=250'),
            new Item("Nokia Lumia", '3000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=Nokia&w=250&h=250'),
            new Item("Blackberry", '4000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=Blackberry&w=250&h=250'),
            new Item("Nokia Lumia", '3000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=Nokia&w=250&h=250'),
            new Item("iPhone 6S", '1000', 'https://placeholdit.imgix.net/~text?txtsize=30&bg=000000&txtclr=ffffff&txt=iPhone6S&w=250&h=250'),
        ]);
    }

    ko.applyBindings(new ProductViewModel());
});
