$(function(){
    $('body').height($('body')[0].clientHeight);

    console.log(localStorage.token);

	getBeBookList('');

});


function getType(type){

	getBeBookList(type);

}

function getBeBookList(type){


	   // 待预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";

    $.post(actionURL,{
        token:localStorage.token,
        prestatus: "W",
		pretype:type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            var flag = 0;
            var typeImg = "";
            data.myList.forEach(function(i){
              // onclick=goDetail('"+i.pretype+"','"+i.preid+"')
                content += "<li class='aui-list-item' >";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-label'>";
                content += "<input type='checkbox' class='aui-checkbox' value='" + i.id + "' name='preid'>";
                content += "</div>";
                content += "<div class='aui-list-item-media'>";
                content += "<img src='"+i.infosimg+"'>";
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";

				if(type == 'actor'){
					content += "<div class='aui-list-item-title'>" + i.infosname + "</div>";
				}else if(type == 'scene'){
					content += "<div class='aui-list-item-title'>" + i.infosname + "</div>";
				}else if(type == 'subject'){
					content += "<div class='aui-list-item-title'>" + i.infosname + "</div>";
				}


                content += "</div>";
                content += "<div class='aui-list-item-text'>";
                content += "                                                     ";
                content += "</div>";

				content += "<br/>"

                content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
                content += "<div class='aui-info-item'>";
                switch(i.pretype){
                    case "actor": typeImg = "../../image/roleDetails/actor.png";
                    break;
                    case "scene": typeImg = "../../image/roleDetails/scene.png";
                    break;
                    case "subject": typeImg = "../../image/roleDetails/subject.png";
                    break;
                }
                content += "<img src='" + typeImg + "' style='width:40px;height:20px;' />";
                content += "<span class='aui-margin-l-5'></span>";
                content += "</div>";
                content += "<div class='aui-info-item'>价格：" + i.infosprice + "元/"+i.infosunit+"</div>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";

                flag ++;
            })

            if(0 !== flag){
                content += "<div class='aui-card-list-footer aui-border-t' style='margin 0 auto; margin-left: 20%;  margin-right: 20%;'>";
                content += "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='confirm()'>提交预约</div>"
                content += "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='cancel()'>删除</div>";
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


}


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

        });
		return false;
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

function goDetail(type,id){

	var url = "";
	if(type == "actor"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "scene"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "subject"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}
	window.location.href=url;
}
