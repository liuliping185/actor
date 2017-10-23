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
		document.onkeydown=keyDownSearch;

    function keyDownSearch(e) {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            login();
            return false;
        }
        return true;
    }

});

$("#username").focus();
$("#username").keydown(function(event) {
alert(JSON.stringify(event));
if (event.which == 13) {//keyCode=13是回车键
	// queryuserinfo($("#username").val());
	$("#username").val("");
$("#username").focus();
return false;
}else{
// <%--    	$("#username").val($("#username").val()+event.key);--%>
}
});

//登录方法
function login(){

var toast = new auiToast();
toast.loading({
	title:"正在登录",
	duration:2000
},function(ret){
	setTimeout(function(){
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
		$.post(path + "/ActorInterface/member/memberLogin.action",{
				loginname:username,
				password:password
			}, function(data) {
	      var data = JSON.parse(data);
				console.log(data);
				if (data.success) {

						localStorage.token = data.token;

						toast.hide();

						toast.success({
						 title:"登录成功",
						 duration:2000
						});

					 setTimeout(function(){window.location.href = "index.html";}, 2000);

						// //自定义alert
						// dialog.alert({
						// 	title: '登录成功！',
						// 	msg:'',
						// 	buttons:['确定']
						// },function(ret){
						// 	console.log(localStorage.token);
						//
						//
						// 	if(ret){
						//
						// 		window.location.href= "index.html";
						//
						// 	}else{
						//
						//
						// 	}
						// });


				}else{
					toast.hide();

					toast.fail({
					 title:"登录失败",
					 duration:2000
					});
				}
		});

	}, 3000)
});

}
//
// function login(){
// 		var username = $("#username").val();
// 		var password = $("#password").val();
// 		if(username == ""){
// 	      dialog.alert({
// 	          title:"请输入用户名",
// 	          msg:'',
// 	          buttons:['确定']
// 	      },function(ret){
//
// 	      })
// 	  		return false;
// 		}
// 		if(password == ""){
// 	      dialog.alert({
// 	          title:"请输入密码！",
// 	          msg:'',
// 	          buttons:['确定']
// 	      },function(ret){
//
// 	      })
// 	  		return  false;
// 		}
// 		$.post(path + "/ActorInterface/member/memberLogin.action",{
// 				loginname:username,
// 				password:password
// 			}, function(data) {
// 	      var data = JSON.parse(data);
// 				console.log(data);
// 				if (data.success) {
//
// 						localStorage.token = data.token;
//
// 						//自定义alert
// 						dialog.alert({
// 							title: '登录成功！',
// 							msg:'',
// 							buttons:['确定']
// 						},function(ret){
// 							console.log(localStorage.token);
//
//
// 							if(ret){
//
// 								window.location.href= "index.html";
//
// 							}else{
//
//
// 							}
// 						});
//
// 						setTimeout(function(){dialog.close();window.location.href= "index.html";}, 3000)
//
//
//
//
// 				}else{
// 						  dialog.alert({
// 							  title:data.message,
// 							  msg:'',
// 							  buttons:['确定']
// 						  },function(ret){
//
// 						  });
// 				}
// 		});
// }

function display(){
	var password = $("#password").val();
	$("#passwordText").html("<input type='text' value='" + password + "' style='font-family:苹方;font-size:0.7rem;' id='password' placeholder='请输入密码' onfocus=this.placeholder='' onblur=if(this.placeholder==''){this.placeholder='请输入密码'}>");
}
