$(function(){
    var url = location.href;
    $(".weui-tabbar a").each(function () {
        if((url + '/').indexOf($(this).attr('href'))!=-1){
          $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on');
        }else{
          $(this).removeClass('weui-bar__item_on');
        }
    });
    //$('.weui-tabbar__item').on('click', function () {
    //	$(this).find(".weui-badge").remove();
    //});
});
//登录方法
function login(){
	var username = $("#username").val();
	var password = $("#password").val();
	if(username == ""){
		swal("请输入用户名！", "", "error");
		return false;
	}
	if(password == ""){
		swal("请输入密码！", "", "error");
		return  false;
	}
	$.post( path+"/member/memberLogin.action",{
			username:username,
			password:password
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
	                	var hi_url = $("#hi_url").val();
	                	if(hi_url!=""){
	                		if(hi_url == "/member/goMemberIndex.action")
	                			{
	                				hi_url = "/nanyutang/member/goMemberIndex.action";
	                			}
	                		window.location.href= hi_url;
	                	}else{
	                		window.location.href= path+"/member/goMemberIndex.action";
	                	}

					 });

			}else{
					swal(data.message, "", "error");
			}
	});
}
