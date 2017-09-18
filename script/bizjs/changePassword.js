$(function(){
    console.log(localStorage.token);
});

var dialog = new auiDialog();

function changePassword(){
  var password = $("#password").val();
  var re_password = $("#re_password").val();

  if(!password){
			dialog.alert({
					title:"请输入密码",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return  false;
	}
	if(!re_password){
			dialog.alert({
					title:"请确认密码",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}
	if(re_password != password){
			dialog.alert({
					title:"两次密码输入不一致！",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}

  $.post("http://192.168.0.129:8080/ActorInterface/member/changePassword.action",{
      token:localStorage.token,
			password:password
		}, function(data) {
			var data = JSON.parse(data);
			if (data.success) {
          console.log("11")
					//自定义alert
					dialog.alert({
              title: data.message,
              msg:'',
              buttons:['确定']
          },function(ret){

              if(ret){
                  window.location.href="../login.html";
              }
          });
			}else{
        console.log("ad")
  				dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
          })
			}
	});
}
