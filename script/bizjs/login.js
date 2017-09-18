$(function(){
    // var url = location.href;
    // $(".weui-tabbar a").each(function () {
    //     if((url + '/').indexOf($(this).attr('href'))!=-1){
    //       $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on');
    //     }else{
    //       $(this).removeClass('weui-bar__item_on');
    //     }
    // });
    //$('.weui-tabbar__item').on('click', function () {
    //	$(this).find(".weui-badge").remove();
    //});
});

var token = "";
var dialog = new auiDialog();

//登录方法
function login(){
	var username = $("#username").val();
	var password = $("#password").val();
	if(username == ""){
      dialog.alert({
          title:"请输入用户名",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
  		return false;
	}
	if(password == ""){
      dialog.alert({
          title:"请输入密码！",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
  		return  false;
	}
	$.post( "http://192.168.0.129:8080/ActorInterface/member/memberLogin.action",{
			loginname:username,
			password:password
		}, function(data) {
      var data = JSON.parse(data);

			if (data.success) {
				//自定义alert
        dialog.alert({
            title: '登录成功！',
            msg:'',
            buttons:['确定']
        },function(ret){
          console.log(localStorage.token);
          localStorage.token = data.token;
            if(ret){
                // var hi_url = $("#hi_url").val();
                // if(hi_url!=""){
                //   if(hi_url == "/member/goMemberIndex.action")
                //     {
                //       hi_url = "/nanyutang/member/goMemberIndex.action";
                //     }
                //   window.location.href= hi_url;
                // }else{
                  window.location.href= "index.html";
                // }
            }
        });
				// alert({
 			// 		 	 title: data.message,
 			// 			 text: "",
  			// 			 type: "success",
  			// 			 showCancelButton: false,
 			// 			 confirmButtonColor: "limegreen",
  			// 			 confirmButtonText: "确定",
        //                  closeOnConfirm: false
	      //            },
				// function(){
	      //           	var hi_url = $("#hi_url").val();
	      //           	if(hi_url!=""){
	      //           		if(hi_url == "/member/goMemberIndex.action")
	      //           			{
	      //           				hi_url = "/nanyutang/member/goMemberIndex.action";
	      //           			}
	      //           		window.location.href= hi_url;
	      //           	}else{
	      //           		window.location.href= path+"/member/goMemberIndex.action";
	      //           	}
        //
				// 	 });

			}else{
          dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){

          })
			}
	});
}
