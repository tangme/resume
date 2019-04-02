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
    /*固定页面元素初始化*/
    $("#guideTab").sticky({
        topSpacing: 0,
        zIndex: 9
    });
    /*页面动画效果初始化*/
    new WOW().init();
});