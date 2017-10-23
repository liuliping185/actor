$(function(){
    $('body').height($('body')[0].clientHeight);

        console.log(localStorage.token);

        if(!localStorage.token){
          dialog.alert({
              title:"请登录!",
              msg:'',
              buttons:['确定']
              },function(ret){
             window.location.href="../login.html";
          })
          return false;
        }

        $.post(path + "/ActorInterface/member/getSessionMember.action",{
            token:localStorage.token,
          }, function(data) {
            var data = JSON.parse(data);
            console.log(data)
            if (data.success) {
                $("#loginname").html(data.memberinfo.loginname);
                var phone = data.memberinfo.phone;
                var mphone =phone.substr(3,4);
                var lphone = phone.replace(mphone,"****");
                $("#phone").html(lphone);
                if(!data.memberinfo.headerimg && "" === data.memberinfo.headerimg){
                    $('#img').attr('src', "../image/mine/headingImg.png");
                }else{
                    $('#img').attr('src', data.memberinfo.headerimg);
                }
                $("#birthday").val(data.memberinfo.birthday);
            }else{
              dialog.alert({
                  title:"请登录!",
                  msg:'',
                  buttons:['确定']
                  },function(ret){
                 window.location.href="../login.html";
              })
              return false;
            }
        });
});

// 详情
function detail(url){
  window.location.href=url;
}
