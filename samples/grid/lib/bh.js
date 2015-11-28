+(function(){
    if(typeof (Waves) !== "undefined"){
        Waves.attach('.bh-btn:not(.bh-disabled):not([disabled])');
        Waves.init();
    }
})();

/* ========================================================================
 * 侧边栏导航
 * ======================================================================== */
+(function($){
    'use strict';

    $(document).on("click",".bh-nav > li > a",function(){
        var $li = $(this).closest("li");
        if(!($li.hasClass("bh-disabled"))){
            var $ulParent = $li.closest(".bh-nav");
            var $topNav = getTopNavObj($ulParent);
            if(!$topNav.hasClass("bh-nav-tile")){
                $topNav.find("li").removeClass("bh-active");
                $li.addClass("bh-active");
                if($li.hasClass("bh-nav-dropdown")){
                    $li.children(".bh-nav").stop().animate().slideToggle(500, function(){
                        $li.toggleClass("bh-open");
                    });
                }
            }else{
                if(!$li.hasClass("bh-nav-dropdown")){
                    $topNav.find("li").removeClass("bh-active");
                    $li.addClass("bh-active");
                }
            }
        }
    });

    function getTopNavObj($item){
        var $nav = $item.closest(".bh-nav");
        var $parentNav = $nav.parent().closest(".bh-nav");
        if($parentNav.length === 0){
            return $nav;
        }else{
            return getTopNavObj($parentNav);
        }
    }

})(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        this.element = $(element)
    };

    Tab.VERSION = '3.3.4';

    Tab.TRANSITION_DURATION = 150;

    Tab.prototype.show = function () {
        var $this    = this.element;
        var $ul      = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        if ($this.parent('li').hasClass('bh-active')){return;}

        var $previous = $ul.find('.bh-active:last a');
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        });
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        });

        $previous.trigger(hideEvent);
        $this.trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {return;}

        var $target = $(selector);

        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            });
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    };

    Tab.prototype.activate = function (element, container, callback) {
        var $active    = container.find('> .bh-active');
        var transition = callback
            && $.support.transition
            && (($active.length && $active.hasClass('bh-fade')) || !!container.find('> .bh-fade').length);

        function next() {
            $active
                .removeClass('bh-active')
                .find('> .dropdown-menu > .bh-active')
                .removeClass('bh-active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false);

            element
                .addClass('bh-active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true);

            if (transition) {
                element[0].offsetWidth; // reflow for transition
                element.addClass('bh-in');
            } else {
                element.removeClass('bh-fade');
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('bh-active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next();

        $active.removeClass('in')
    };


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('bs.tab');

            if (!data) $this.data('bs.tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.tab;

    $.fn.tab             = Plugin;
    $.fn.tab.Constructor = Tab;


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    };


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault();
        Plugin.call($(this), 'show')
    };

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);

}(jQuery);


+function ($) {
    'use strict';

    $(document).on("click", ".bh-table-cross-highlight thead th", function(e){
        if (e.target.nodeName == "INPUT") {return;}
        var _self = $(this);
        var table = _self.closest("table.bh-table");
        var tbody = table.children("tbody");

        if (_self.hasClass("bh-ch-active")) {
            _self.removeClass("bh-ch-active");
            ampTableGetColTds(_self, 0, "bh-ch-active");
        }else {
            table.find("td.bh-ch-active, th.bh-ch-active").removeClass("bh-ch-active");
            _self.addClass("bh-ch-active");
            ampTableGetColTds(_self, 1, "bh-ch-active");
        }
    }).on("mouseover", "td", function(){
        var _self = $(this);
        _self.parent("tr").addClass("bh-ch-hover");
        ampTableGetColTds(_self, 1, "bh-ch-hover");

    }).on("mouseout", "td", function(){
        var _self = $(this);
        _self.parent("tr").removeClass("bh-ch-hover");
        ampTableGetColTds(_self, 0, "bh-ch-hover");
    });

    function ampTableGetColTds ($ele, type, className) {
        var table = $ele.closest("table.bh-table");
        var index = $ele.index();
        table.find("tr").each(function(){
            var td = $(this).children("td:eq(" + index + ")");
            if (type) {
                td.addClass(className);
            }else {
                td.removeClass(className);
            }
        });
    }

}(jQuery);