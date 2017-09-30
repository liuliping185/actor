var role = GetQueryString("role");

$(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
    console.log(role)
    var actionUrl = "";
    switch(role){
        case "actor": actionUrl = path + "/ActorInterface/actor/queryActors.action";
        break;
        case "scene": actionUrl = path + "/ActorInterface/scene/queryScenes.action";
        break;
        case "subject": actionUrl = path + "/ActorInterface/subject/querySubjects.action";
        break;
    }
    $.post(actionUrl,{
        token: localStorage.token
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var img = "";
            $("#sample").html("");

            var flag = -1;
            data.imgList.forEach(function(i){
                flag ++;
                img += "<img onclick=detail('" + role + "','" + data.infoList[flag].id + "') style='width:100%; height:32%; margin-top:2%;' src='" + i + "'/>";
            })
            $('#img').html(img);
            // console.log($('#img').html(img))
        }else{
            dialog.alert({
                  title:"获取演员信息失败！",
                  msg:'',
                  buttons:['确定']
              },function(ret){
                  $("#content").html("");
              })
              return false;
        }
    });
});
