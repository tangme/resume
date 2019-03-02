let tmp = '';
var projectApp = new Vue({
    el:'#tmpApp',
    created:function(){
        console.log('i am here.');
        $.getJSON("./js/datas.json", function(json){
            console.log('====');
            projectApp.projectDatas = json;
            console.log(json);
            tmp = json;
        });
    },
    data:{
        projectDatas:[]
    }
});

$(document).ready(function() {
    /*$(".panel-tab-ul li[data-tab]").click(function(){
    	$(".tabContent").css("display","none");
    	$("."+$(this).data("tab")).fadeIn("slow");
    });*/

    Tools.$imgsArray = $(".my-hobby-ul>li>img");
    if (!Tools.isOldIE) {
         /*页面初次显示动画*/
        new WOW().init();
        /*加载兴趣爱好图片*/
        Tools.loadingImgs(".svg");
    } else { 
        /*IE8 加载兴趣爱好图片*/
        Tools.loadingImgs(".png");
    }
});