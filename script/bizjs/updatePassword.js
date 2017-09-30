$(function(){
    var loginname = GetQueryString("loginname");
    $("#loginname").val(loginname);
});

var dialog = new auiDialog();

// get请求，获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function updatePassword(){


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

  $.post(path + "/ActorInterface/member/updatePassword.action",{
      loginname:$("#loginname").val(),
			password:password
		}, function(data) {
			var data = JSON.parse(data);
			if (data.success) {
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
  				dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
          })
			}
	});
}
