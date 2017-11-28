var flag = 0;
$(function(){
    $('body').height($('body')[0].clientHeight);
    var actionURL = path + "/ActorInterface/actor/queryAllMyInfos.action?token=" + localStorage.token;

    $.post(actionURL,{
    }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if(data.success){
            $("#content").html("");
            var content= "";
            if(0 === data.infoList.length){
               $("#role").html("暂无");

			   $("#content").append("<h1 align='center'><font color='#1bbc9b'>暂无相关信息，赶紧去添加哦！</font></h1>");
			   $("#content").append("<br/><br/>");
			   $("#content").append("<div style='margin-left:40%' class='aui-btn aui-btn-success' onclick='goAdd()'> <span id='p'>添加角色</span> </div>");
			   return;

            }

            var role = "actor";

            $("#rolename").val(role);

            data.infoList.forEach(function(i){
              flag ++;
              var status = "";
              switch(i.checkstatus){
                  case "Y": status = "<font color='green'><strong>审核通过</strong></font>";
                      break;
                  case "N": status = "<font color='red'><strong>审核拒绝</strong></font>";
                      break;
                  case "W": status = "<font color='red'><strong>待审核</strong></font>";
                      break;
                  case "P": status = "<font color='green'><strong>已发布</strong></font>";
                      break;
                  case "C": status = "<font color='green'><strong>已下架</strong></font>";
                      break;
              }


              content += "<div class='aui-card-list-header aui-card-list-user aui-border-b'>";
              content += "<div class='aui-card-list-user-avatar'>";
              if(i.type == 'actor'){
      						 content += "<img src='../../image/mine/actor.png' class='aui-img-round'/>";
      			  }else if(i.type == 'scene'){
      						 content += "<img src='../../image/mine/scene.png' class='aui-img-round'/>";
      			  }else if(i.type == 'subject'){
      						 content += "<img src='../../image/mine/subject.png' class='aui-img-round'/>";
      			  }else if(i.type == 'screenwriter'){
      						 content += "<img src='../../image/mine/screenwriter.png' class='aui-img-round'/>";
      			  }else if(i.type == 'director'){
      						 content += "<img src='../../image/mine/director.png' class='aui-img-round'/>";
      			  }else if(i.type == 'producer'){
      						 content += "<img src='../../image/mine/producer.png' class='aui-img-round'/>";
      			  }else if(i.type == 'clothing'){
      						 content += "<img src='../../image/mine/clothing.png' class='aui-img-round'/>";
      			  }else if(i.type == 'equipment'){
      						 content += "<img src='../../image/mine/equipment.png' class='aui-img-round'/>";
      			  }else if(i.type == 'camerateam'){
      						 content += "<img src='../../image/mine/camerateam.png' class='aui-img-round'/>";
      			  }else if(i.type == 'investment'){
      						 content += "<img src='../../image/mine/investment.png' class='aui-img-round'/>";
      			  }
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-name'>";

			  if(i.type == 'actor'){
				    content +=  "<small>名称：" + i.nickname + "</small>";
			  }else if(i.type == 'scene'){
				    content +=  "<small>名称：" + i.scenename + "</small>";
			  }else if(i.type == 'subject'){
				    content +=  "<small>名称：" + i.subjectname + "</small>";
			  }else if(i.type == 'screenwriter'){
          content +=  "<small>名称：" + i.screenwritername + "</small>";
        }else if(i.type == 'director'){
          content +=  "<small>名称：" + i.directorname + "</small>";
        }else if(i.type == 'producer'){
          content +=  "<small>名称：" + i.producername + "</small>";
        }else if(i.type == 'clothing'){
          content +=  "<small>名称：" + i.clothingname + "</small>";
        }else if(i.type == 'equipment'){
          content +=  "<small>名称：" + i.equipmentname + "</small>";
        }else if(i.type == 'camerateam'){
          content +=  "<small>名称：" + i.camerateamname + "</small>";
        }else if(i.type == 'investment'){
          content +=  "<small>名称：" + i.investmentname + "</small>";
        }



              content +=  "<small>创建时间：" + i.createtime + "</small>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-user-info'>当前状态：" + status +  "</div>";
              content +=  "</div>";



              content +=  "<div style='width:100%;margin 0 auto'>";
              content +=  "<img style='left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);position:relative;text-align:center;width:100%;' onclick=roleDetails('"+i.type+"','"+i.id+"') src='" + i.firstimg + "'/>";
              content +=  "</div>";
              content +=  "<div class='aui-card-list-footer aui-border-t'>";
              content +=  "<div><i class='aui-iconfont aui-icon-note'></i><span>" +  i.evaSum + "</span></div>";
              content +=  "<div><i class='aui-iconfont aui-icon-laud'></i><span>" +  i.goodSum + "</span></div>";
              content +=  "<div><i class='aui-iconfont aui-icon-star'></i><span>" + i.attentionSum + "</span></div>";
              content +=  "</div>";

              content +=  "<div class='aui-card-list-footer aui-border-t'>";
              content += "<div style='width:60%;margin-left:42%;' align='right'>"


              if("W" != i.checkstatus ){
                  content +=  "<div style='background-color:#20e0b9' class='aui-btn aui-btn-success aui-margin-r-5' onclick=edit('"+i.type+"','" + i.id + "')>编辑</div>";
                  if("Y" === i.checkstatus){
                      content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=publish('"+i.type+"','" + i.id + "')>发布</div></span>";
                  }
              }

              if("P" === i.checkstatus){
                  content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=down('"+i.type+"','" + i.id + "')>下架</div></span>";
              }

              if("C" === i.checkstatus){
                  content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=publish('"+i.type+"','" + i.id + "')>发布</div></span>";
              }

              content +=  "<div class='aui-btn aui-btn-danger aui-margin-r-5' onclick=cancel('"+i.type+"','" + i.id + "')>删除</div>";
              content +=  "</div>";
              content +=  "</div>";

			  //分割线
			  content +=  "	<div style='margin-top: 10px;'>";
	 		  content +=  "<img src='../../image/fg.jpg' width='100%' height='5px' />";
			  content +=  "</div>";

              $("#flag").val(flag);
            });
              $("#content").html(content);
        }else{
        }
    });
});

// 根据角色获取信息列表
var actionURL = "";
$("#roleChange").change(function(){
    var roleChange = $("#roleChange").val();

    var imgHeading = "";
    switch(roleChange){
		 case "0": actionURL = path + "/ActorInterface/actor/queryAllMyInfos.action?token=" + localStorage.token;

         break;

        case "1": actionURL = path + "/ActorInterface/actor/myActorList.action?token=" + localStorage.token;

          break;

        case "2": actionURL = path + "/ActorInterface/scene/mySceneList.action?token=" + localStorage.token;

          break;

        case "3": actionURL = path + "/ActorInterface/subject/mySubjectList.action?token=" + localStorage.token;

          break;

        default: actionURL = path + "/ActorInterface/actor/queryAllMyInfos.action?token=" + localStorage.token;
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

							$("#content").append("<h1 align='center'><font color='#1bbc9b'>暂无相关信息，赶紧去添加哦！</font></h1>");
							$("#content").append("<br/><br/>");
							$("#content").append("<div style='margin-left:40%' class='aui-btn aui-btn-success' onclick='goAdd()'> <span id='p'>添加角色</span> </div>");

							return;
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
                              case "C": status = "已下架";
                                  break;
													  }
													  content += "<div class='aui-card-list-header aui-card-list-user aui-border-b'>";
													  content += "<div class='aui-card-list-user-avatar'>";

													   if(i.type == 'actor'){
																	 content += "<img src='../../image/mine/actor.jpg' class='aui-img-round'/>";
														  }else if(i.type == 'scene'){
																	 content += "<img src='../../image/mine/scene.jpg' class='aui-img-round'/>";
														  }else if(i.type == 'subject'){
																	 content += "<img src='../../image/mine/subject.jpg' class='aui-img-round'/>";
														  }else if(i.type == 'screenwriter'){
                      						 content += "<img src='../../image/mine/screenwriter.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'director'){
                      						 content += "<img src='../../image/mine/director.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'producer'){
                      						 content += "<img src='../../image/mine/producer.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'clothing'){
                      						 content += "<img src='../../image/mine/clothing.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'equipment'){
                      						 content += "<img src='../../image/mine/equipment.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'camerateam'){
                      						 content += "<img src='../../image/mine/camerateam.png' class='aui-img-round'/>";
                      			  }else if(i.type == 'investment'){
                      						 content += "<img src='../../image/mine/investment.png' class='aui-img-round'/>";
                      			  }

													  content +=  "</div>";
													  content +=  "<div class='aui-card-list-user-name'>";

													  if(i.type == 'actor'){
															content +=  "<small>名称：" + i.nickname + "</small>";
													  }else if(i.type == 'scene'){
															content +=  "<small>名称：" + i.scenename + "</small>";
													  }else if(i.type == 'subject'){
															content +=  "<small>名称：" + i.subjectname + "</small>";
													  }else if(i.type == 'screenwriter'){
															content +=  "<small>名称：" + i.screenwritername + "</small>";
													  }else if(i.type == 'director'){
															content +=  "<small>名称：" + i.directorname + "</small>";
													  }else if(i.type == 'producer'){
															content +=  "<small>名称：" + i.producername + "</small>";
													  }else if(i.type == 'clothing'){
															content +=  "<small>名称：" + i.clothingname + "</small>";
													  }else if(i.type == 'equipment'){
															content +=  "<small>名称：" + i.equipmentname + "</small>";
													  }else if(i.type == 'camerateam'){
															content +=  "<small>名称：" + i.camerateamname + "</small>";
													  }else if(i.type == 'investment'){
															content +=  "<small>名称：" + i.investmentname + "</small>";
													  }


													  content +=  "<small>" + i.createtime + "</small>";
													  content +=  "</div>";
													  content +=  "<div class='aui-card-list-user-info'>" + status +  "</div>";
													  content +=  "</div>";
													  // content +=  "<div class='aui-card-list-content-padded'>";
													  // content +=  "<img src='" + i.firstimg + "'/>";
													  // content +=  "</div>";
													  content +=  "<div class='aui-card-list-footer aui-border-t'>";
													  content +=  "<div><i class='aui-iconfont aui-icon-note'></i><span>" +  i.evaSum + "</span></div>";
													  content +=  "<div><i class='aui-iconfont aui-icon-laud'></i><span>" +  i.goodSum + "</span></div>";
													  content +=  "<div><i class='aui-iconfont aui-icon-star'></i><span>" + i.attentionSum + "</span></div>";
													  content +=  "</div>";

													  content +=  "<div class='aui-card-list-footer aui-border-t'>";
                            content += "<div style='width:60%;margin-left:42%;' align='right'>"


													  if("W" != i.checkstatus ){
                              content +=  "<div style='background-color:#20e0b9' class='aui-btn aui-btn-success aui-margin-r-5' onclick=edit('"+i.type+"','" + i.id + "')>编辑</div>";
														  if("Y" === i.checkstatus){
															  content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=publish('"+i.type+"','" + i.id + "')>发布</div></span>";
														  }
													  }

                            if("P" === i.checkstatus){
                              content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=down('"+i.type+"','" + i.id + "')>下架</div></span>";
                            }

                            if("C" === i.checkstatus){
                                content +=  "<span id=" + flag + "><div class='aui-btn aui-btn-warning aui-margin-r-5' onclick=publish('"+i.type+"','" + i.id + "')>发布</div></span>";
                            }

													  content +=  "<div class='aui-btn aui-btn-danger aui-margin-r-5' onclick=cancel('"+i.type+"','" + i.id + "')>删除</div>";
													  content +=  "</div>";
                            content +=  "</div>";

													  //分割线
													  content +=  "	<div style='margin-top: 10px;'>";
													  content +=  "<img src='../../image/fg.jpg' width='100%' height='5px' />";
													  content +=  "</div>";


									});
							  $("#rolename").val("actor");
							  $("#content").html(content);
  					}
				}
    });
})

// 发布
function publish( role, id){
  console.log(id)
  console.log(role)
    var actionURL = path + "/ActorInterface/actor/actorPublic.action";
    switch(role){
        case 'actor': actionURL = path + "/ActorInterface/actor/actorPublic.action";
        break;
        case 'scene': actionURL = path + "/ActorInterface/scene/scenePublic.action";
        break;
        case 'subject': actionURL = path + "/ActorInterface/subject/subjectPublic.action";
        break;
        case 'screenwriter': actionURL = path + "/ActorInterface/screenwriter/screenwriterPublic.action";
        break;
        case 'director': actionURL = path + "/ActorInterface/director/directorPublic.action";
        break;
        case 'producer': actionURL = path + "/ActorInterface/producer/producerPublic.action";
        break;
        case 'clothing': actionURL = path + "/ActorInterface/clothing/clothingPublic.action";
        break;
        case 'equipment': actionURL = path + "/ActorInterface/equipment/equipmentPublic.action";
        break;
        case 'camerateam': actionURL = path + "/ActorInterface/camerateam/camerateamPublic.action";
        break;
        case 'investment': actionURL = path + "/ActorInterface/investment/investmentPublic.action";
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

// 下架
function down( role, id){
  dialog.alert({
         title:"下架提示",
         msg:'确定要下架该条信息？',
         buttons:['取消','确定']
    },function(ret){
           if(ret){

        if(ret.buttonIndex == 1){

        }else{
          var actionURL = path + "/ActorInterface/actor/actorCancel.action";
          switch(role){
              case 'actor': actionURL = path + "/ActorInterface/actor/actorCancel.action";
              break;
              case 'scene': actionURL = path + "/ActorInterface/scene/sceneCancel.action";
              break;
              case 'subject': actionURL = path + "/ActorInterface/subject/subjectCancel.action";
              break;
              case 'screenwriter': actionURL = path + "/ActorInterface/screenwriter/screenwriterCancel.action";
              break;
              case 'director': actionURL = path + "/ActorInterface/director/directorCancel.action";
              break;
              case 'producer': actionURL = path + "/ActorInterface/producer/producerCancel.action";
              break;
              case 'clothing': actionURL = path + "/ActorInterface/clothing/clothingCancel.action";
              break;
              case 'equipment': actionURL = path + "/ActorInterface/equipment/equipmentCancel.action";
              break;
              case 'camerateam': actionURL = path + "/ActorInterface/camerateam/camerateamCancel.action";
              break;
              case 'investment': actionURL = path + "/ActorInterface/investment/investmentCancel.action";
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
                  alert("已下架");
                  window.location.reload();

              }
          });


        }

         }
    });



}


// 删除
function cancel(role, id){
  dialog.alert({
         title:"删除提示",
         msg:'确定要删除该条信息？',
         buttons:['取消','确定']
    },function(ret){
           if(ret){

        if(ret.buttonIndex == 1){

        }else{
             var actionURL = path + "/ActorInterface/actor/actorDelete.action";
           switch(role){
             case 'actor': actionURL = path + "/ActorInterface/actor/actorDelete.action";
             break;
             case 'scene': actionURL = path + "/ActorInterface/scene/sceneDelete.action";
             break;
             case 'subject': actionURL = path + "/ActorInterface/subject/subjectDelete.action";
             break;
             case 'screenwriter': actionURL = path + "/ActorInterface/screenwriter/screenwriterDelete.action";
             break;
             case 'director': actionURL = path + "/ActorInterface/director/directorDelete.action";
             break;
             case 'producer': actionURL = path + "/ActorInterface/producer/producerDelete.action";
             break;
             case 'clothing': actionURL = path + "/ActorInterface/clothing/clothingDelete.action";
             break;
             case 'equipment': actionURL = path + "/ActorInterface/equipment/equipmentDelete.action";
             break;
             case 'camerateam': actionURL = path + "/ActorInterface/camerateam/camerateamDelete.action";
             break;
             case 'investment': actionURL = path + "/ActorInterface/investment/investmentDelete.action";
             break;
           }

           $.post(actionURL,{
             token:localStorage.token,
             infoid: id
           }, function(data) {
             var data = JSON.parse(data);
             console.log(data);
             if(data.success){

               window.location.reload();

             }
           });

        }

         }
    });
}

// 编辑
function edit(role,infoid){
  // alert($("#rolename").val() + "-------" + infoid);

    var url ="";
     switch(role){
         case "actor": url =  "../applicationRoles/actorInfo.html?id=" + infoid + "&role=" + role;
         break;
         case "scene": url =  "../applicationRoles/sceneInfo.html?id=" + infoid + "&role=" + role;
         break;
         case "subject": url =  "../applicationRoles/subjectInfo.html?id=" + infoid + "&role=" + role;
         break;
         case "screenwriter": url =  "../applicationRoles/screenwriter.html?id=" + infoid + "&role=" + role;
         break;
         case "director": url =  "../applicationRoles/director.html?id=" + infoid + "&role=" + role;
         break;
         case "producer": url =  "../applicationRoles/producer.html?id=" + infoid + "&role=" + role;
         break;
         case "clothing": url =  "../applicationRoles/clothing.html?id=" + infoid + "&role=" + role;
         break;
         case "equipment": url =  "../applicationRoles/equipment.html?id=" + infoid + "&role=" + role;
         break;
         case "camerateam": url =  "../applicationRoles/camerateam.html?id=" + infoid + "&role=" + role;
         break;
         case "investment": url =  "../applicationRoles/investment.html?id=" + infoid + "&role=" + role;
         break;
     }
    window.location.href = url;
}


function goAdd(){
	window.location.href='../applicationRoles/applicationRoles.html';

}


function roleDetails(role,id){
    window.location.href = "../../scenes/roleDetails.html?id=" + id + "&role=" + role;
}
