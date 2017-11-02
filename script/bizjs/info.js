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

        // var toast = new auiToast();
        // toast.loading({
        //   title:"正在加载",
        //   duration:2000
        // },function(ret){
        //   setTimeout(function(){

        $.post(path + "/ActorInterface/member/getSessionMember.action",{
            token:localStorage.token,
          }, function(data) {
            var data = JSON.parse(data);
            console.log(data)
            if (data.success) {
              // toast.hide();
                if(!data.memberinfo.headerimg && "" === data.memberinfo.headerimg){

                    $('#headerimg').attr('src', data.memberinfo.headerimg);
                }else{

                    // $("#headerbg").attr('src', data.memberinfo.headerimg);
                    $('#headerimg').attr('src', data.memberinfo.headerimg);
                }

                $("#loginname").html(data.memberinfo.loginname);
                var phone = data.memberinfo.phone;
                var mphone =phone.substr(3,4);
                var lphone = phone.replace(mphone,"****");
                $("#phone").html(lphone);

            }else{
              // toast.hide();
              //
              // toast.fail({
              //  title:"加载失败",
              //  duration:2000
              // });
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
    //
    //   }, 3000)
    // });
});

// 详情
function detail(url){
  window.location.href=url;
}
