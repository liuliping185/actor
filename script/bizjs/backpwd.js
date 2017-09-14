$(function(){
	$("#getBtu_3").hide();
	$("#getBtu_2").hide();
});

var dialog = new auiDialog();

//验证用户
function checkMember(){
	var loginname = $("#loginName").val();
	var checkCode = $("#checkCode").val();
	var hi_checkCode = $("#hi_checkCode").val();

	if(!loginname){
			dialog.alert({
					title:"请输入用户名！",
					msg:'',
					buttons:['确定']
			},function(ret){

			})
			return false;
	}

	if(!checkCode){
			dialog.alert({
					title:"请输入验证码！",
					msg:'',
					buttons:['确定']
			},function(ret){

			})
			return  false;
	}

	if(checkCode != hi_checkCode){
			dialog.alert({
					title:"验证码输入有误！",
					msg:'',
					buttons:['确定']
			},function(ret){

			})
			return false;
	}

	dialog.alert({
			title:"验证码验证成功！",
			msg:'',
			buttons:['确定']
	},function(ret){
			window.location.href = "mine/updatePassword.html?loginname=" + loginname;
	})
}
//获取验证码
function getCheckCode(){
	var loginname = $("#loginName").val();
	$.post("http://192.168.0.129:8080/ActorInterface/member/findPassWordBack.action",{
				loginname:loginname
		}, function(data) {
				var data = JSON.parse(data);
				if (data.success) {
					//自定义alert
					dialog.alert({
							title:data.message,
							msg:'',
							buttons:['确定']
					},function(ret){
							console.log(data.checkCode);
							$("#hi_checkCode").val(data.checkCode);
					})
				}else{
						dialog.alert({
								title:data.message,
								msg:'',
								buttons:['确定']
						},function(ret){
						})
						reloadVerifyCode(document.getElementById('codeimg'));
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
		alert("请输入验证码！", "", "error");
		return false;
	}
	if(inCheckCode != chechCode){
		alert("验证码不正确！", "", "error");
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
		alert("请输入新密码！", "", "error");
		return false;
	}
	if(rePass == ""){
		alert("请确认密码！", "", "error");
		return false;
	}
	if(newPass != rePass){
		alert("两次密码输入不一致!", "", "error");
		return false;
	}
	$.post( path+"/member/findChangePass.action",{
			loginName:hi_loginName,
			newPass:newPass
		}, function(data) {
			if (data.success) {
							//自定义alert
//				alert({
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
					alert(data.message, "", "error");
			}
	});

}

//立即登录
function loginNow(){
	window.location.href=path+"/member/toLogin.action";
}
