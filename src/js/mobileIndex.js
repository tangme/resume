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

/*var projectApp = new Vue({
    el:'#projectApp',
    created:function(){
        $.getJSON("./js/datas.json", function(json){
            projectApp.projectDatas = json;
        });
    },
    data:{
        projectDatas:[]
    }
});*/

Vue.component('selfinfoitem-panel',{
    props:{
        title:{
            type:String,
            default:'标题'
        },
        show_default_slot:{
            type:Boolean,
            default:true
        }
    },
    template:`  <div class="panel panel-primary zoomInUp wow">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{title}}</h3>
                    </div>
                    <div class="panel-body" v-if="show_default_slot">
                        <slot></slot>
                    </div>
                    <slot name="sectionone"></slot>
                    <slot name="sectiontwo"></slot>
                </div>`
});

var selfInfoApp = new Vue({
    el:'#mobileApp',
    data:function(){
        return{
            activeTab:0,
            firstPage:true,
            selfInfo:null,
            skillInfo:null,
            workInfo:null,
            hobbyInfo:null,
            studyInfo:null,
            projectsInfo:null,
            projectDatas:[]
        }
    },
    computed:{
        animateClass(){
            return this.activeTab==0?'slideRight-fade':'slideLeft-fade';
        }
    },
    methods:{
        handleClickTab(type){
            this.activeTab = type;
            console.log('type:',this.activeTab);
        }
    },
    created:function(){
        var $this = this;
        $.getJSON("./js/datas.json", function(json){
            $this.projectDatas = json;
        });
        $.getJSON("./js/leftPanelDatas.json", function(json){
            $this.selfInfo = json.selfInfo;
            $this.skillInfo = json.skillInfo;
            $this.workInfo = json.workInfo;
            $this.hobbyInfo = json.hobbyInfo;
            $this.studyInfo = json.studyInfo;
            $this.projectsInfo = json.projectsInfo;
            document.querySelector('.briefinfo-div').innerHTML = json.introduce;
        });
    }
});

$(document).ready(function() {
    /*PageObj.$selfinfoTab = $("#selfinfo-tab");
    PageObj.$selfinfoMainDiv = $("#selfinfoMainDiv");
    PageObj.$projectTab = $("#project-tab");
    PageObj.$projectMainDiv = $("#projectMainDiv");

    // 项目信息 选项卡点击事件初始化
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
    // 个人信息 选项卡点击事件初始化
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

    });*/
    
    /*固定页面元素初始化*/
    $("#guideTab").sticky({
        topSpacing: 0,
        zIndex: 9
    });
    /*页面动画效果初始化*/
    new WOW().init();
});