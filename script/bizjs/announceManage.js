$(function(){
    $('body').height($('body')[0].clientHeight);

    console.log(localStorage.token);
    var actionURL = path + "/ActorInterface/ann/queryAll.action";

    $.post(actionURL,{
        token:localStorage.token
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            data.infoList.forEach(function(i){
                content += "<li class='aui-list-item aui-list-item-arrow' onclick=detail(" + i.id + ")>";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-info-item' style='width:40%;'>";
                var d = new Date(i.createtime);
                var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                content += "<div class='aui-info-item-text'>" + createtime + "</div>";
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";
                content += "<span>" + i.anninfos + "</span>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";
            })
            $("#content").html(content);
        }else{
          dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
              console.log(ret)
          })
        }
    });
});

// 详情
function detail(id){
    window.location.href = "announceDetail.html?id=" + id;
}
