var flag = 0;
$(function(){
    $('body').height($('body')[0].clientHeight);
    var actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;
    $.post(actionURL,{
    }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if(data.success){
            $("#content").html("");
            var content= "";
            if(0 === data.infoList.length){
               $("#role").html("暂无");
            }

            var role = "actor";

            data.infoList.forEach(function(i){
              flag ++;
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
              content += "<img src='../../image/mine/actor.jpg' class='aui-img-round'/>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-name'>";
              content +=  "<div>" + i.nickname + "</div>";
              content +=  "<small>" + i.createtime + "</small>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-info'>" + status +  "</div>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-content-padded'>";
              content +=  "<img src='" + data.imgList[0] + "'/>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-footer aui-border-t'>";
              content +=  "<div><i class='aui-iconfont aui-icon-note'></i><span>" +  0 + "</span></div>";
              content +=  "<div><i class='aui-iconfont aui-icon-laud'></i><span>" +  i.goodSum + "</span></div>";
              content +=  "<div><i class='aui-iconfont aui-icon-star'></i><span>" + i.attentionSum + "</span></div>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-footer aui-border-t'>";
              content +=  "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='edit(" + i.id + ")'>编辑</div>";

              if("W" != i.checkstatus ){
                  if("Y" === i.checkstatus){
                      content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick='publish(" + i.id + ")'>发布</div></span>";
                  }
              }

              content +=  "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='cancel(" + i.id + ")'>删除</div>";
              content +=  "</div>";

              $("#flag").val(flag);
            });
              $("#content").html(content);
        }
    });
});

// 根据角色获取信息列表
var actionURL = "";
$("#roleChange").change(function(){
    var roleChange = $("#roleChange").val();
    var imgHeading = "";
    switch(roleChange){
        case "1": actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;
                  imgHeading = "../../image/mine/actor.jpg";
          break;
        case "2": actionURL = path + "/ActorInterface/scene/mySceneList.action?token=" + localStorage.token;
                  imgHeading = "../../image/mine/sence.png";
          break;
        case "3": actionURL = path + "/ActorInterface/subject/mySubjectList.action?token=" + localStorage.token;
                  imgHeading = "../../image/mine/subject.jpg";
          break;
        default: actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;
          break;
    }

    $.ajax({
				cache : true,
				type  : "POST",
				url   : actionURL,
				async : true,
				error : function(request) {
				    alert("error");
				},
				success : function(data) {
          $("#content").html("");
          var content = "";
            var data = JSON.parse(data);
            console.log(data);
  					if(data.success){
                if(0 === data.infoList.length){
                  $("#content").html("");
                }

                data.infoList.forEach(function(i){
                  console.log(data.imgList[0]);
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
                  content +=  "<div>" + i.nickname + "</div>";
                  content +=  "<small>" + i.createtime + "</small>";
                  content +=  "</div>";
                  content +=  "<div class='aui-card-list-user-info'>" + status +  "</div>";
                  content +=  "</div>";
                  content +=  "<div class='aui-card-list-content-padded'>";
                  content +=  "<img src='" + data.imgList[0] + "'/>";
                  content +=  "</div>";
                  content +=  "<div class='aui-card-list-footer aui-border-t'>";
                  content +=  "<div><i class='aui-iconfont aui-icon-note'></i><span>" +  0 + "</span></div>";
                  content +=  "<div><i class='aui-iconfont aui-icon-laud'></i><span>" +  i.goodSum + "</span></div>";
                  content +=  "<div><i class='aui-iconfont aui-icon-star'></i><span>" + i.attentionSum + "</span></div>";
                  content +=  "</div>";
                });
                  $("#content").html(content);
  					}
				}
    });
})

// 发布
function publish( id){
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
