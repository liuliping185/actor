var dialog = new auiDialog();

$(function(){
  console.log(localStorage.token)
    $('body').height($('body')[0].clientHeight);
    var role = GetQueryString("role");
    console.log(role)
    var actionURL = "";
    var imgHeading = ""

    switch(role){
        case "1":
            actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;
            imgHeading = "../../image/mine/actor.jpg";
        break;
        case "2":
            actionURL = path + "/ActorInterface/scene/mySceneList.action?token=" + localStorage.token;
            imgHeading = "../../image/mine/scene.png";
        break;
        case "3":
            actionURL = path + "/ActorInterface/subject/mySubjectList.action?token=" + localStorage.token;
            imgHeading = "../../image/mine/subject.jpg";
        break;
        default: actionURL = path + "/ActorInterface/subject/mySubjectList.action?token=" + localStorage.token;
        imgHeading = "../../image/mine/subject.jpg";
        break;
    }

    $.post(actionURL,{
    }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if(data.success){
          console.log(data.infoList)
            $("#content").html("");
            var content= "";
            var flag = 0;
            data.infoList.forEach(function(i){
              flag ++ ;
              var status = "";
              switch(i.checkstatus){
                  case "Y": status = "审核通过";
                      break;
                  case "N": status = "审核拒绝";
                      break;
                  case "W": status = "待审核";
                      break;
                  case "P": status = "已发布";
                      break;
              }
              content += "<div class='aui-card-list-header aui-card-list-user aui-border-b'>";
              content += "<div class='aui-card-list-user-avatar'>";
              content += "<img src='" + imgHeading + "' class='aui-img-round'/>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-name'>";
              switch(role){
                  case "1": content +=  "<div>" + i.nickname + "</div>";
                  break;
                  case "2": content +=  "<div>" + i.scenename + "</div>";
                  break;
                  case "3": content +=  "<div>" + i.subjectname + "</div>";
                  break;
              }

              content +=  "<small>" + i.createtime + "</small>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-info'>" + status +  "</div>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-content-padded'>";
              content +=  "<img src='" + data.imgList[0] + "'/>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-footer aui-border-t'>";
              content +=  "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='edit(" + role + "," + i.id + ")'>编辑</div>";

              if("W" != i.checkstatus ){
                  if("Y" === i.checkstatus){
                      content +=  "<div class='aui-btn aui-btn-warning aui-margin-r-5' onclick='publish(" + role + "," + i.id + ")'>发布</div>";
                  }
              }

              content +=  "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='cancel(" + role + "," + i.id + ")'>删除</div>";
              content +=  "</div>";
            });
              $("#content").html(content);
        }
    });


});

// 发布
function publish(role, id, flag){
  console.log(id)
  console.log(flag)
    var actionURL = path + "/ActorInterface/actor/actorPublic.action";
    switch(role){
        case 1: actionURL = path + "/ActorInterface/actor/actorPublic.action";
        break;
        case 2: actionURL = path + "/ActorInterface/scene/scenePublic.action";
        break;
        case 3: actionURL = path + "/ActorInterface/subject/subjectPublic.action";
        break;
    }

    console.log(actionURL)
    $.post(actionURL,{
        token:localStorage.token,
        infoid: id
    }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if(data.success){
            alert("发布成功");
            // $("#flag").html("");
            window.location.reload();
        }
    });

}

// 删除
function cancel(role, id){
    console.log(id)
    var actionURL = path + "/ActorInterface/actor/actorDelete.action";
    switch(role){
        case 1: actionURL = path + "/ActorInterface/actor/actorDelete.action";
        break;
        case 2: actionURL = path + "/ActorInterface/scene/sceneDelete.action";
        break;
        case 3: actionURL = path + "/ActorInterface/subject/subjectDelete.action";
        break;
    }

    console.log(actionURL)
    $.post(actionURL,{
        token:localStorage.token,
        infoid: id
    }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if(data.success){
            alert("取消成功");
            window.location.reload();
        }
    });
}

// 编辑
function edit(role, infoid){
    var url ="";
    switch(role){
        case 1: url =  "../applicationRoles/actorInfo.html?infoid=" + infoid;
        break;
        case 2: url =  "../applicationRoles/sceneInfo.html?infoid=" + infoid;
        break;
        case 3: url =  "../applicationRoles/subjectInfo.html?infoid=" + infoid;
        break;
    }
    window.location.href = url;
}
