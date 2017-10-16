$(function(){
    $('body').height($('body')[0].clientHeight);
    // 被预定列表
    getBeBookList('');
});


function getBeBook(type){
	getBeBookList(type);
}


function getBeBookList(type){

	 var actionURL = path + "/ActorInterface/preorder/myBePreList.action";

    $.post(actionURL,{
        token: localStorage.token,
        prestatus: "P",
		pretype:type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";
            var typeImg = "";
            data.myList.forEach(function(i){
                content += "<li class='aui-list-item' >";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-label'>";
                content += "<input type='radio' class='aui-radio' value='" + i.id + "' name='preid'>" ;
                content += "</div>";
                content += "<div class='aui-list-item-media' onclick=goDetail('"+i.pretype+"','"+i.preid+"')>";
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

				content += "<div class='aui-list-item-right'>价格：" + i.infosprice + "元/"+i.infosunit+"</div>";

				content += "<br/><div class='aui-list-item-text'>";

                content +=  i.infosdetail.substring(0,10)+"....";

                content += "</div><br/>";


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
                content += "<div class='aui-info-item'>" + i.createtime + "</div>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";
            })

            if(0 < data.myList.length){
                content += "<div class='aui-card-list-footer aui-border-t' style='margin 0 auto; margin-left: 20%; margin-right: 20%;'>";
                content += "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='agree()'>同意</div>"
                content += "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='refuse()'>拒绝</div>";
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


var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
    // 被预定列表
    var actionURL = path + "/ActorInterface/preorder/myBePreList.action";
    var prestatus = "";
    var butContent = "";
    switch(ret.index){
        case 1:
              prestatus = "P";
        break;
        case 2: prestatus = "D";
        break;
        case 3: prestatus = "R";
        break;
    }

	var type = $("#selType").val();


    $.post(actionURL,{
        token: localStorage.token,
        prestatus: prestatus,
		pretype:type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";

			if(data.myList.length>0 && prestatus == "P"){

				butContent += "<div class='aui-card-list-footer aui-border-t' style='margin 0 auto; margin-left: 20%; margin-right: 20%;'>";
				butContent += "<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='agree()'>同意</div>"
				butContent += "<div class='aui-btn aui-btn-danger aui-margin-l-5' onclick='refuse()'>拒绝</div>";
				butContent += "</div>";

			}

            data.myList.forEach(function(i){
                content += "<li class='aui-list-item'>";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-label'>";
                content += "<input type='radio' class='aui-radio' value='" + i.id + "' name='preid'>" ;
                content += "</div>";
                content += "<div class='aui-list-item-media'  onclick=goDetail('"+i.pretype+"','"+i.preid+"')>";
                content += "<img src='"+i.infosimg+"'>";
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";
                content += "<div class='aui-list-item-title'>" + i.infosname + "</div>";
                content += "<div class='aui-list-item-right'>价格：" + i.infosprice + "元/"+i.infosunit+"</div>";
                content += "</div>";
                content += "<br/><div class='aui-list-item-text'>";

                content +=  i.infosdetail.substring(0,10)+"....";

                content += "</div><br/>";
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
                content += "<div class='aui-info-item'>" + i.createtime + "</div>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";


            })

            content += butContent;

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

// 同意
function agree(){
    var preid = $("input[name='preid']:checked").val();
    console.log(preid);
    var actionURL = path + "/ActorInterface/preorder/agreePreorder.action";

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

// 拒绝
function refuse(){
  var preid = $("input[name='preid']:checked").val();
  console.log(preid);
  var actionURL = path + "/ActorInterface/preorder/refusePreorder.action";

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
