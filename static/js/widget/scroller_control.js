define(['jquery', 'polyfill/function'], function scrollerControl($) {
    var wdw = this,
        UNDEF = undefined;
    function ScrollerControl() {}
    ScrollerControl.prototype = {
        constructor: ScrollerControl,

        wdw: $(wdw),
        scroll: null,
        nav: null,
        nav_height: null,
        anchors: null,
        contents: null,
        cached_contents: {},
        duration: null,
        base_href: null,
        easing: null,

        addHash: function addHash(hash) {
            /**
             * Add a hash to location bar
             * @param {String} hash: hash to be added
             */
            wdw.location.hash = this.base_href + hash;
            return this;
        },
        getScrollTarget: function getScrollTarget(node_id) {
            /**
             * Get the node to be scrolled to based on it`s id.
             * @param {String} node_id: id of the required node
             */
            var node;
            if (this.cached_contents[node_id])
                return this.cached_contents[node_id];
            node = $('#' + node_id);
            this.cached_contents[node_id] = {
                node: node,
                offset: node.offset()
            };
            return this.cached_contents[node_id];
        },
        scrollToNode: function scrollToNode(node_id) {
            /**
             * Scroll the screen to a given node.
             * @param {String} node_id: id of the required node
             */
            var node = this.getScrollTarget(node_id);
            this.scroll.animate({
                scrollTop: node.offset.top - this.nav_height
            }, {
                duration: this.duration,
                easing: this.easing,
                complete: this.addHash.bind(this, node_id)
            });
            return this;
        },
        scrollFromLink: function scrollFromLink(e) {
            /**
             * Scroll the screen to a given node, based on the href attribute
             * of a link.
             * @param {Object} e: event being triggered.
             */
            e.preventDefault();
            var node_id = e.target.href,
                id_pos = node_id.search(this.base_href);
            node_id = node_id.substr(id_pos);
            this.scrollToNode(node_id.replace(this.base_href, ''));
            return this;
        },
        scrollFromHash: function scrollFromHash(e) {
            /**
             * Scroll the screen to a given node, based on the window location.
             * @param {Object} e: event being triggered.
             */
            this.scrollToNode(wdw.location.hash.replace(this.base_href, ''));
            return this;
        },
        addEvents: function addEvents() {
            /**
             * Add listeners to the menu anchors and the window hashchange.
             */
            this.anchors.on('click', this.scrollFromLink.bind(this));
            this.wdw.on('hashchange', this.scrollFromHash.bind(this));
            return this;
        },
        calculateDimensions: function calculateDimensions() {
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
            this.scroll = $('html,body');
            return this;
        },
        init: function init(options) {
            /**
             * Initializes the scroll controller.
             * @param {Object} options: hash of options to be used
             */
            this
                .prepareNodes(options)
                .calculateDimensions()
                .addEvents();
            return this;
        }
    }
    // var ScrollerControl = {
    //     wdw: $(wdw),
    //     scroll: null,
    //     nav: null,
    //     nav_height: null,
    //     anchors: null,
    //     contents: null,
    //     cached_contents: {},
    //     base_href: null,
    //     duration: null,
    //     easing: null,
    //     addHash: function addHash(hash) {
    //         /**
    //          * Add a hash to location bar
    //          * @param {String} hash: hash to be added
    //          */
    //         wdw.location.hash = this.base_href + hash;
    //         return this;
    //     },
    //     getScrollTarget: function getScrollTarget(node_id) {
    //         /**
    //          * Get the node to be scrolled to based on it`s id.
    //          * @param {String} node_id: id of the required node
    //          */
    //         var node;
    //         if (this.cached_contents[node_id])
    //             return this.cached_contents[node_id];
    //         node = $('#' + node_id);
    //         this.cached_contents[node_id] = {
    //             node: node,
    //             offset: node.offset()
    //         };
    //         return this.cached_contents[node_id];
    //     },
    //     scrollToNode: function scrollToNode(node_id) {
    //         /**
    //          * Scroll the screen to a given node.
    //          * @param {String} node_id: id of the required node
    //          */
    //         var node = this.getScrollTarget(node_id);
    //         this.scroll.animate({
    //             scrollTop: node.offset.top - this.nav_height
    //         }, {
    //             duration: this.duration,
    //             easing: this.easing,
    //             complete: this.addHash.bind(this, node_id)
    //         });
    //         return this;
    //     },
    //     scrollFromLink: function scrollFromLink(e) {
    //         /**
    //          * Scroll the screen to a given node, based on the href attribute
    //          * of a link.
    //          * @param {Object} e: event being triggered.
    //          */
    //         e.preventDefault();
    //         var node_id = e.target.href,
    //             id_pos = node_id.search(this.base_href);
    //         node_id = node_id.substr(id_pos);
    //         this.scrollToNode(node_id.replace(this.base_href, ''));
    //         return this;
    //     },
    //     scrollFromHash: function scrollFromHash(e) {
    //         /**
    //          * Scroll the screen to a given node, based on the window location.
    //          * @param {Object} e: event being triggered.
    //          */
    //         this.scrollToNode(wdw.location.hash.replace(this.base_href, ''));
    //         return this;
    //     },
    //     addEvents: function addEvents() {
    //         /**
    //          * Add listeners to the menu anchors and the window hashchange.
    //          */
    //         this.anchors.on('click', this.scrollFromLink.bind(this));
    //         this.wdw.on('hashchange', this.scrollFromHash.bind(this));
    //         return this;
    //     },
    //     calculateDimensions: function calculateDimensions() {
    //         /**
    //          * Define the dimensions of fixed navigation, so it can be used
    //          * on the offset calculation to activate a link.
    //          */
    //         this.nav_height = this.nav.height();
    //         return this;
    //     },
    //     prepareNodes: function prepareNodes(options) {
    //         /**
    //          * Copy all properties passed on options to the object.
    //          * @param {Object} options: hash of options to be passed
    //          */
    //         var k;
    //         for (k in options) {
    //             if (this.hasOwnProperty(k)) this[k] = options[k];
    //         }
    //         this.scroll = $('html,body');
    //         return this;
    //     },
    //     init: function init(options) {
    //         /**
    //          * Initializes the scroll controller.
    //          * @param {Object} options: hash of options to be used
    //          */
    //         this
    //             .prepareNodes(options)
    //             .calculateDimensions()
    //             .addEvents();
    //         return this;
    //     }
    // };
    return ScrollerControl;
});