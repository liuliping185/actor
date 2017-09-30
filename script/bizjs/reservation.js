$(function(){
    $('body').height($('body')[0].clientHeight);

    // 预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";

    $.post(actionURL,{
        token:localStorage.token,
        prestatus: "P"
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            var typeImg = "";
            data.myList.forEach(function(i){
                content += "<li class='aui-list-item'>";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-media'>";
                content += "<img src=''>";
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";
                content += "<div class='aui-list-item-title'>" + i.prenumber+ "</div>";
                content += "</div>";
                content += "<div class='aui-list-item-text'>";
                content += "                                                         ";
                content += "</div>";
                content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
                content += "<div class='aui-info-item'>";
                switch(i.pretype){
                    case "actor": typeImg = "../../image/mine/actor.jpg";
                    break;
                    case "scene": typeImg = "../../image/mine/scene.jpg";
                    break;
                    case "subject": typeImg = "../../image/mine/subject.jpg";
                    break;
                }
                content += "<img src='" + typeImg + "' style='width:1rem' class='aui-img-round' />";
                content += "<span class='aui-margin-l-5'></span>";
                content += "</div>";
                content += "<div class='aui-info-item'>" + i.createtime + "</div>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";
            })

            $("#preContent").html(content);

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

var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
    // 被预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";
    var prestatus = "";
    switch(ret.index){
        case 1:
            prestatus = "P";
        break;
        case 2: prestatus = "D";
        break;
        case 3: prestatus = "R";
        break;
    }


    $.post(actionURL,{
        token: localStorage.token,
        prestatus: prestatus
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            data.myList.forEach(function(i){
              content += "<li class='aui-list-item'>";
              content += "<div class='aui-media-list-item-inner'>";
              content += "<div class='aui-list-item-media'>";
              content += "<img src='../../image/test-image/demo1.png'>";
              content += "</div>";
              content += "<div class='aui-list-item-inner'>";
              content += "<div class='aui-list-item-text'>";
              content += "<div class='aui-list-item-title'>" + i.id + "</div>";
              content += "<div class='aui-list-item-right'>" + i.createtime + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>";
              content += "这里是内容区域，新版中的列表布局可以很轻松的帮助开发者完成常见列表样式。";
              content += "</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<img src='../../image/test-image/liulangnan.png' style='width:1rem' class='aui-img-round' />";
              content += "<span class='aui-margin-l-5'></span>";
              content += "</div>";
              content += "<div class='aui-info-item'>" + i.createtime + "</div>";
              content += "</div>";
              content += "</div>";
              content += "</div>";
              content += "</li>";
            })

            $("#preContent").html(content);

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
