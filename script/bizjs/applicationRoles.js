$(function(){
    $('body').height($('body')[0].clientHeight);
});

// 申请角色
function applicationRoles(role){
    console.log(role)
    if("actor" === role){
        window.location.href = "actorInfo.html?role=" + role;  // 演员
    }else if("scene" === role){
        window.location.href = "sceneInfo.html?role=" + role;  // 场景
    }else if("subject" === role){
        window.location.href = "subjectInfo.html?role=" + role;  // 道具
    }else if("screenwriter" === role){
        window.location.href = "screenwriter.html?role=" + role;  // 编剧
    }else if("director" === role){ 
        window.location.href = "director.html?role=" + role;  // 导演
    }else if("producer" === role){
        window.location.href = "producer.html?role=" + role;  // 制片
    }else if("clothing" === role){
        window.location.href = "clothing.html?role=" + role;  // 服装
    }else if("equipment" === role){
        window.location.href = "equipment.html?role=" + role;  // 设备
    }else if("camerateam" === role){
        window.location.href = "camerateam.html?role=" + role;  // 摄影组
    }else if("investment" === role){
        window.location.href = "investment.html?role=" + role;  // 投资
    }else{
        dialog.alert({
            title:"请选择角色！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
        return  false;
    }
}
