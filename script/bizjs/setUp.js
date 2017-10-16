$(function(){
    $('body').height($('body')[0].clientHeight);
});

// 退出登录
function logout(){


	 dialog.alert({
          title:"提示",
          msg:'确定要退出账号？',
          buttons:['取消','确定']
     },function(ret){
            if(ret){

				 if(ret.buttonIndex == 1){

				 }else{

					    $.post(path + "/ActorInterface/member/loginOut.action",{
						token: localStorage.token
						}, function(data) {
						  var data = JSON.parse(data);
						  console.log(data);
						  if (data.success) {
                localStorage.token = "";
							  window.location.href="../login.html";
						  }else{
							  dialog.alert({
								  title:data.message,
								  msg:'',
								  buttons:['确定']
							  },function(ret){
								  window.location.href="../login.html";
							  });
						  }
					  });

				 }

          }
     });




}
