$(function(){
    $('body').height($('body')[0].clientHeight);
    console.log(localStorage.token);

    // 获取我的关注列表数据
    $.post(path + "/ActorInterface/attention/myAttentionList.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            $("#num").html(data.resultList.length + "人");
            var content = "";

            data.resultList.forEach(function(i){
              content += "<li class='aui-list-item aui-list-item-arrow'>";
              content += "<div class='aui-media-list-item-inner'>";
              content += "<div class='aui-list-item-media'>";
              content += "<img src='" + i.img + "'>";
              content += "</div>";
              content += "<div class='aui-list-item-inner'>";
              content += "<div class='aui-list-item-text'>";
              content += "<div class='aui-list-item-title'>" + i.infos.nickname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.birthday + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>" + i.infos.infos + "</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              if("actor" === i.type){
                content += "<img src='../../image/mine/actor.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
              }

              if("scene" === i.type){
                content += "<img src='../../image/mine/scene.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
              }

              if("subject" === i.type){
                content += "<img src='../../image/mine/subject.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
              }
              content += "</div>";
              content += "<div class='aui-info-item'>" + i.infos.createtime + "</div>";
              content += "</div>";
              content += "</div>";
              content += "</div>";
              content += "</li>";
            });

            $("#content").html(content);
        }
    });
});
