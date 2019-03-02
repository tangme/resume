(function(window) {
    function PageObj() {
        this.$selfinfoTab;
        this.$selfinfoMainDiv;
        this.$projectTab;
        this.$projectMainDiv;
    }
    PageObj.prototype = {
        constructor: PageObj
    };
    window.PageObj = new PageObj();
})(window);

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

$(document).ready(function() {
    PageObj.$selfinfoTab = $("#selfinfo-tab");
    PageObj.$selfinfoMainDiv = $("#selfinfoMainDiv");
    PageObj.$projectTab = $("#project-tab");
    PageObj.$projectMainDiv = $("#projectMainDiv");

    /*项目信息 选项卡点击事件初始化*/
    PageObj.$projectTab.click(function() {
        if (!$(this).hasClass("selectedTab")) {
            $(this).addClass("selectedTab");
            PageObj.$selfinfoTab.removeClass("selectedTab");
            PageObj.$selfinfoMainDiv.stop(true, true);
            PageObj.$projectMainDiv.stop(true, true);
            PageObj.$selfinfoMainDiv.animateCss("fadeOutRight", function() {
                PageObj.$selfinfoMainDiv.css("display", "none");
                PageObj.$projectMainDiv.fadeIn("fast");
            });
        }

    });
    /*个人信息 选项卡点击事件初始化*/
    PageObj.$selfinfoTab.click(function() {
        if (!$(this).hasClass("selectedTab")) {
            $(this).addClass("selectedTab");
            PageObj.$projectTab.removeClass("selectedTab");
            PageObj.$selfinfoMainDiv.stop(true, true);
            PageObj.$projectMainDiv.stop(true, true);
            PageObj.$projectMainDiv.animateCss("fadeOutLeft", function() {
                PageObj.$projectMainDiv.css("display", "none");
                PageObj.$selfinfoMainDiv.fadeIn("fast");
            });
        }

    });
    /*固定页面元素初始化*/
    $("#guideTab").sticky({
        topSpacing: 0,
        zIndex: 9
    });
    /*页面动画效果初始化*/
    new WOW().init();
});