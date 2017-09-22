
$(function(){
    $('body').height($('body')[0].clientHeight);
    var actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;
    $.post(actionURL,{
    }, function(data) {
        var data = JSON.parse(data);
        if(data.success){
            $("#content").html("");
            var content= "";
            data.infoList.forEach(function(i){
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
  					if(data.success){
                if(0 === data.infoList.length){
                  $("#content").html("");
                }

                data.infoList.forEach(function(i){
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
