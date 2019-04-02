var projectApp = new Vue({
    el: '#projectApp',
    created: function() {
        let $this = this;
        $.getJSON("./js/datas.json", function(json) {
            $this.projectDatas = json;
        });
    },
    data: {
        projectDatas: []
    }
});

Vue.component("left-panel", {
    props: {
        title: {
            type: String,
            default: '标题'
        },
        show_default_slot: {
            type: Boolean,
            default: true
        }
    },
    template: `  <div class="left-card-info pull-left zoomIn wow">
                    <h4 class="left-card-info-header">{{title}}</h4>
                    <div class="left-card-info-body" v-if="show_default_slot">
                        <slot></slot>
                    </div>
                    <slot name="sectionone"></slot>
                    <slot name="sectiontwo"></slot>
                </div>`
});

Vue.component("Collapse",{
    data:function(){
        return {
            contentShow:false
        }
    },
    template:`
        <div>
            <div @click="contentShow = !contentShow" class="collapse-head" :class="{rotate180:contentShow}">
                <slot></slot>
            </div>
            <transition :duration="500" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
                <div v-show="contentShow" class="collapse-content">
                    <slot name="content"></slot>
                </div>
            </transition>
        </div>
    `
});

var leftPanelApp = new Vue({
    el: '#left-panel-container',
    data: function() {
        return {
            selfInfo: null,
            skillInfo: null,
            workInfo: null,
            hobbyInfo: null,
            studyInfo: null,
            projectsInfo: null
        }
    },
    created: function() {
        let $this = this;
        $.getJSON("./js/leftPanelDatas.json", function(json) {
            let leftPanelData = json;
            $this.selfInfo = leftPanelData.selfInfo;
            $this.skillInfo = leftPanelData.skillInfo;
            $this.workInfo = leftPanelData.workInfo;
            $this.hobbyInfo = leftPanelData.hobbyInfo;
            $this.studyInfo = leftPanelData.studyInfo;
            $this.projectsInfo = leftPanelData.projectsInfo;
            document.querySelector('.my-briefinfo').innerHTML = leftPanelData.introduce;
        });
    }
});

$(document).ready(function() {
    if (!Tools.isOldIE) {
        /*页面初次显示动画*/
        new WOW().init();
    }
});