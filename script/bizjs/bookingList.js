$(function(){
    $('body').height($('body')[0].clientHeight);

    console.log(localStorage.token);
    // 待预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";

    $.post(actionURL,{
        token:localStorage.token,
        prestatus: "W"
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            var flag = 0;
            var typeImg = "";
            data.myList.forEach(function(i){
                content += "<li class='aui-list-item'>";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-label'>";
                content += "<input type='checkbox' class='aui-checkbox' value='" + i.prenumber + "' name='preid'>";
                content += "</div>";
                content += "<div class='aui-list-item-media'>";
                content += "<img src='../../image/test-image/demo1.png'>";
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";
                content += "<div class='aui-list-item-title'>" + i.id + "</div>";
                content += "</div>";
                content += "<div class='aui-list-item-text'>";
                content += "                                                     ";
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

                flag ++;
            })

            if(0 !== flag){
                content += "<div class='aui-card-list-footer aui-border-t' style='margin 0 auto; margin-left: 20%; margin-right: 20%;'>";
                content += "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='confirm()'>提交</div>"
                content += "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='cancel()'>取消</div>";
                content += "</div>";
            }

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

// 提交
function confirm(){
    var ids = "";
    var flag = 0;
    $("input[name='preid']:checked").each(function(index,obj){
      ids += $(this).val() + ",";
      flag ++;
    });

    if(0 === flag){
        dialog.alert({
            title:"请选择后再提交！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.reload();
        })
    }

    console.log(ids);
    var actionURL = path + "/ActorInterface/preorder/confirmPreorder.action";

    $.post(actionURL,{
        token:localStorage.token,
        ids: ids
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            dialog.alert({
                title:data.message,
                msg:'',
                buttons:['确定']
            },function(ret){
              var flag = 0;
              $("input[name='preid']").each(function(index,obj){
                flag ++;
              });
              if(0 === flag){
                  $("#preContent").html("");
              }
              window.location.reload();
            })

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
}

// 取消
function cancel(){
    var flag = 0;
    $("input[name='preid']:checked").each(function(index,obj){
      flag ++;
    });
    if(1 < flag){
        dialog.alert({
            title:"取消时只能选择一条信息！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.reload();
        })
    }

    var preid = $("input[name='preid']:checked").val();
    var actionURL = path + "/ActorInterface/preorder/cancelPreorder.action";

    $.post(actionURL,{
        token:localStorage.token,
        preId: preid
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            dialog.alert({
                title:data.message,
                msg:'',
                buttons:['确定']
            },function(ret){
                var flag = 0;
                $("input[name='preid']").each(function(index,obj){
                  flag ++;
                });
                if(0 === flag){
                    $("#preContent").html("");
                }
                window.location.reload();
            })

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
}
