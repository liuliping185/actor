$(function(){
// 		  $("input[name='agreeMent']").iCheck({
//             checkboxClass: 'icheckbox_square-blue',  // 注意square和blue的对应关系
//			 radioClass: 'iradio_square-blue',
//			 increaseArea: '20%' // optional
//          });

 		  //createCheckCode();


	$("#getBtu_3").hide();
	$("#getBtu_2").hide();

});

var dialog = new auiDialog();

function createCheckCode(){

	 var codeLength = 4;//验证码的长度
     var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
     'S','T','U','V','W','X','Y','Z');//随机数
     for(var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
    }
	$("#create_checkcode").val(code);
}


//登录方法
function regist(){
	var username = $("#username").val();
	var password = $("#password").val();
	var re_password = $("#re_password").val();
	var phone = $("#phone").val();
	var checkcode = $("#checkcode").val();
	var hi_openId = $("#hi_openId").val();
	if(username == ""){
			dialog.alert({
					title:"请输入用户名",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}
	if(password == ""){
			dialog.alert({
					title:"请输入密码",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return  false;
	}
	if(re_password == ""){
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
	if(phone == ""){
			dialog.alert({
					title:"请输入联系电话！",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return  false;
	}
	if(phone.length != 11){
			dialog.alert({
					title:"请输入正确的手机号！",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}
	var reg = /(1[3-9]\d{9}$)/;
    if (!reg.test(phone)){
				dialog.alert({
						title:"请输入正确的手机号！",
						msg:'',
						buttons:['取消','确定']
				},function(ret){

				})
        return false;
    }

	var hi_checkCode =  $("#hi_checkCode").val();

	if(checkcode == ""){
			dialog.alert({
					title:"请输入验证码!",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}

	if(checkcode != hi_checkCode){
			dialog.alert({
					title:"验证码错误!",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
	}

    if(!$("input[name='agreeMent']").is(':checked')){
				dialog.alert({
						title:"请接受用户注册协议",
						msg:'',
						buttons:['取消','确定']
				},function(ret){

				})
	    	return false;
    }

	$.post("http://192.168.0.129:8080/ActorInterface/member/memberRegist.action",{
			username:username,
			password:password,
			phone:phone,
			checkcode:checkcode,
			openId:hi_openId
		}, function(data) {
			var data = JSON.parse(data);
			if (data.success) {
					//自定义alert
					dialog.alert({
              title: data.message,
              msg:'',
              buttons:['取消','确定']
          },function(ret){

              if(ret){
								window.location.href="login.html";
              }
          });
			}else{
				dialog.alert({
            title:data.message,
            msg:'',
            buttons:['取消','确定']
        },function(ret){
            console.log(ret)
        })
					// alert(data.message, "", "error");
					reloadVerifyCode(document.getElementById('codeimg'));
			}
	});
}


//获取验证码
function getCheckCode(){
	var phone = $("#phone").val();
	$.post("http://192.168.0.129:8080/ActorInterface/member/getCheckCode.action",{
			phone:phone
		}, function(data) {
			var data = JSON.parse(data);
			if (data.success) {
					dialog.alert({
							title:data.message,
							msg:'',
							buttons:['取消','确定']
					},function(ret){

					})
					$("#hi_checkCode").val(data.checkCode);
					console.log(data.checkCode);
					resetCode();
			}else{
					dialog.alert({
							title:data.message,
							msg:'',
							buttons:['取消','确定']
					},function(ret){

					})
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
