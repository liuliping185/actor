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
        console.log(index + "----index" + "-----tds.length------" + tds.length);
        for(var i=0;i<tds.length;i++){
            if(tds[i]===this)
            {
                console.log(i + "----i");
                index=i;
            }
        }
        //选中的设置成红色 没选中的设置成黑色
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

    console.log($("#evalevel").val() + "---" + $("#infoid").val() + "----" + $("#ownerid").val() + "-----" + $("#type").val())

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
