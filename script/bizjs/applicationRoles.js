$(function(){
    $('body').height($('body')[0].clientHeight);
});

// 申请角色
function applicationRoles(){
    var role = $("#role").val();
    console.log(role)
    if("1" === role){
        window.location.href = "actorInfo.html?role=" + role;
    }else if("2" === role){
        window.location.href = "sceneInfo.html?role=" + role;
    }else if("3" === role){
        window.location.href = "subjectInfo.html?role=" + role;
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
