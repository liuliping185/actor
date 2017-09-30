$(function(){
    $('body').height($('body')[0].clientHeight);

    var id = GetQueryString("id");

    console.log(id);
    var actionURL = path + "/ActorInterface/ann/queryAnnOne.action";

    $.post(actionURL,{
        token:localStorage.token,
        id: id
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            // var content = "";
                // content += "<li class='aui-list-item'>";
                // content += "<h2>";
                // content += data.infos.anntitle;
                // content += "</h2>";
                // content += "</li>";
                // content += "<li>";
                // content += "<div style='margin-top: 10px;'>";
                // content += data.infos.anninfos;
                // content += "</div>";
                // content += "</li>";
            $("#title").html(data.infos.anntitle);
            $("#content").html(data.infos.anninfos);
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
