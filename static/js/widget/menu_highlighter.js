define(['jquery', 'polyfill/function'], function menuHighlighter($) {
    var wdw = this,
        UNDEF = undefined;

    function MenuHighlighter() {}

    MenuHighlighter.prototype = {
        wdw: $(wdw),
        body: $('body'),
        nav: null,
        nav_height: null,
        anchors: null,
        contents: null,
        limit: null,
        base_href: null,
        active_class: null,
        active: null,
        cache_anchor: {},

        getAnchor: function getAnchor() {
            /**
             * Get the reference anchor (based on this.active) or
             * cache the anchor.
             * @return {Node} the link node based on active index
             */
            var node;
            if (this.cache_anchor[this.active])
                return this.cache_anchor[this.active];

            node = $(this.mountSelector(this.active));
            this.cache_anchor[this.active] = node;
            return node;
        },
        mountSelector: function mountSelector(node_id) {
            /**
             * Create the css selector for the passed id.
             * @param {String} node_id: id attribute of a node
             */
            return 'a[href="' + this.base_href + node_id + '"]';
        },
        activateAnchor: function activateAnchor(node_id) {
            /**
             * Activate a given link, based on node_id
             * @param {String} node_id: id attribute of a node
             */
            var node;
            this.active = node_id;
            this.anchors.removeClass('active');

            node = this.getAnchor();

            if (node)
                node.addClass(this.active_class);

            return this;
        },
        nearNavigation: function nearNavigation(idx, node) {
            /**
             * Verify if a node is inside a given window scroll and activate
             * it, if necessary.
             * @param {Number} idx: array index of the passed node
             * @param {Node} node: element passed
             */
            var limit = this.nav_height + this.limit,
                $node = $(node),
                scroll_top = $node.offset().top - limit,
                scroll_height = $node.height() + scroll_top,
                scroll_max = this.wdw.scrollTop(),
                inside_target = scroll_top < scroll_max && scroll_height > scroll_max;

            if (inside_target && node.id !== this.active)
                this.activateAnchor(node.id);

            return this;
        },
        windowScroll: function windowScroll(e) {
            /**
             * Process the scroll window and verify if any of the contents
             * node are inside the scroll.
             * @param {Object} e: event being triggered.
             */
            this.contents.each(this.nearNavigation.bind(this));
            return this;
        },
        addEvents: function addEvents() {
            /**
             * Add a listener to the scroll event, responsible for
             * activate/deactivate the links based on the scroll property
             * and the contents node.
             */
            $(wdw).on('scroll', this.windowScroll.bind(this));
            return this;
        },
        calculateDimensions: function calculate() {
            /**
             * Define the dimensions of fixed navigation, so it can be used
             * on the offset calculation to activate a link.
             */
            this.nav_height = this.nav.height();
            return this;
        },
        prepareNodes: function prepareNodes(options) {
            /**
             * Copy all properties passed on options to the object.
             * @param {Object} options: hash of options to be passed
             */
            var k;
            for (k in options) {
                if (this[k] !== UNDEF) this[k] = options[k];
            }
            return this;
        },
        init: function init(options) {
            /**
             * Initializes the menu highlighter control.
             * @param {Object} options: hash of options to be used
             */
            this
                .prepareNodes(options)
                .calculateDimensions()
                .addEvents();
            return this;
        }
    };

    return MenuHighlighter;
});
