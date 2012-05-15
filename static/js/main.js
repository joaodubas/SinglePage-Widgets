require(
    ['jquery', 'widget/menu_highlighter', 'widget/scroller_control'],
    function main($, MenuHighlighter, ScrollerControl) {
        var options = {
                nav: $('nav'),
                anchors: $('nav a'),
                contents: $('.box'),
                limit: 100,
                base_href: '#!/',
                active_class: 'active',
                easing: 'linear',
                duration: 1500
            },
            menuController = new MenuHighlighter,
            windowScroller = new ScrollerControl;

        menuController.init(options);
        windowScroller.init(options);
    }
);