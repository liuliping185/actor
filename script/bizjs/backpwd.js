$(function(){
	$("#getBtu_3").hide();
	$("#getBtu_2").hide();

});
//验证用户
function checkMember(){
	var loginName = $("#loginName").val();
	var checkCode = $("#checkCode").val();
	if(loginName == ""){
		swal("请输入用户名！", "", "error");
		return false;
	}
	if(checkCode == ""){
		swal("请输入验证码！", "", "error");
		return  false;
	}

	$.post( path+"/member/checkMember.action",{
			loginName:loginName,
			checkCode:checkCode
		}, function(data) {
			if (data.success) {
						//自定义alert
				swal({
 					 	 title: data.message,
 						 text: "",
  						 type: "success",
  						 showCancelButton: false,
 						 confirmButtonColor: "limegreen",
  						 confirmButtonText: "确定",
                         closeOnConfirm: false
	                 },
				function(){
 						window.location.href=path+"/member/goCheckPhone.action?loginName="+loginName;
					 });

			}else{
					swal(data.message, "", "error");
					reloadVerifyCode(document.getElementById('codeimg'));
			}
	});
}
//获取验证码
function getCheckCode(){
	var phone = $("#hi_phone").val();
	$.post( path+"/member/getCheckCode.action",{
			phone:phone
		}, function(data) {
			if (data.success) {
					swal(data.message, "", "success");
					$("#hi_checkCode").val(data.checkCode);
					resetCode();
			}else{
					swal(data.message, "", "error");
			}
	});
}

//倒计时
function resetCode(){
	$('#getBtu_1').hide();
	$('#getBtu_3').hide();
	$('#J_second').html('60');
	$('#getBtu_2').show();
	var second = 60;
	var timer = null;
	timer = setInterval(function(){
		second -= 1;
		if(second >0 ){
			$('#J_second').html(second);
		}else{
			clearInterval(timer);
			$('#getBtu_3').show();
			$('#getBtu_2').hide();
		}
	},1000);
}


//下一步
function goNext(){
	var chechCode = $("#hi_checkCode").val();
	var inCheckCode = $("#inCheckCode").val();
	var hi_loginName = $("#hi_loginName").val();
	if(inCheckCode == ""){
		swal("请输入验证码！", "", "error");
		return false;
	}
	if(inCheckCode != chechCode){
		swal("验证码不正确！", "", "error");
		return false;
	}
	window.location.href=path+"/member/goSetNewPass.action?loginName="+hi_loginName;
}
//确认修改密码
function changePass(){
	var newPass = $("#newPass").val();
	var rePass = $("#rePass").val();
	var hi_loginName = $("#hi_loginName").val();
	if(newPass == ""){
		swal("请输入新密码！", "", "error");
		return false;
	}
	if(rePass == ""){
		swal("请确认密码！", "", "error");
		return false;
	}
	if(newPass != rePass){
		swal("两次密码输入不一致!", "", "error");
		return false;
	}
	$.post( path+"/member/findChangePass.action",{
			loginName:hi_loginName,
			newPass:newPass
		}, function(data) {
			if (data.success) {
							//自定义alert
//				swal({
// 					 	 title: data.message,
// 						 text: "",
//  						 type: "success",
//  						 showCancelButton: false,
// 						 confirmButtonColor: "limegreen",
//  						 confirmButtonText: "确定",
//                         closeOnConfirm: false
//	                 },
//				function(){
 						window.location.href=path+"/member/member_return_three.action";


//					 });

			}else{
					swal(data.message, "", "error");
			}
	});

}

//立即登录
function loginNow(){
	window.location.href=path+"/member/toLogin.action";
}
