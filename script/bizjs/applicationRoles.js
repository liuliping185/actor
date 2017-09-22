$(function(){
    $('body').height($('body')[0].clientHeight);
});

// 申请角色
function applicationRoles(){
    var role = $("#role").val();
    console.log(role)
    if("0" === role){
      console.log("dddd")
        dialog.alert({
            title:"请选择角色！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return  false;
    }
    window.location.href = "roleInfo.html?role=" + role;
}
