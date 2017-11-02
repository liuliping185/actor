var infoid = GetQueryString("infoid");
var ownerid = GetQueryString("ownerid");
var type = GetQueryString("type");

$(function(){
    tds=document.getElementsByTagName("td");
    console.log(tds);
    for(var i=0;i<tds.length;i++){
        console.log(i)
        tds[i].onmouseover=test;
    }

    // tds.forEach(function(i){
    //     i.onmouseover=test;
    // })
    // 点亮星星
    function  test(){
        var index = 0;
        for(var i=0;i<tds.length;i++){
            if(tds[i]===this)
            {
                index=i;
            }
        }
        //选中的设置成黄色 没选中的设置成灰色
        var flag = 0;
        for(var i=0;i<=index;i++) {
            flag ++;
            tds[i].innerHTML = "<img src='../../image/start.png' width='70%;' height='70%;'/>";
        }

        $("#evalevel").val(flag);

        for(var i=index+1;i<tds.length;i++){
            tds[i].innerHTML = "<img src='../../image/startDim.png' width='70%;' height='70%;'/>";
        }
    }

})



// 评论
function comment(){
    if(!localStorage.token){
        dialog.alert({
            title:"请登录！",
            msg:'',
            buttons:['确定']
        },function(ret){
        })

        return false;
    }
    var actionURL = path + "/ActorInterface/eva/addEva.action?toekn=" + localStorage.token;

    $("#infoid").val(infoid);
    $("#ownerid").val(ownerid);
    $("#type").val(type);

    console.log($("#evalevel").val() + "，infoid---" + $("#infoid").val() + "ownerid----" + $("#ownerid").val() + "ownerid-----" + $("#type").val())
    var commentflag = "评论";
    $.ajax({
        cache : true,
        type  : "POST",
        url   : actionURL,
        data  :$('#postForm').serialize(),
        async : true,
        error : function(request) {
            alert("error");
        },
        success : function(data) {
          var data = JSON.parse(data);
            if(data.success){
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){
                  commentflag = "已评论";
                  window.location.href="reservation.html?commentflag=" + commentflag;
                    // console.log(ret)
                })
            }else{
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){
                    // console.log(ret)
                })
            }
        }
    });
}
