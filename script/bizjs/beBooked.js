var commentflag = GetQueryString("commentflag");
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
                // content += "<div class='aui-list-item-label'>";
                //
                // content += "<input type='radio' class='aui-radio' value='" + i.id + "' name='preid'>" ;
                // content += "</div>";


                content += "<div class='aui-list-item-media' onclick=roleDetails('"+i.pretype+"','"+i.infoid+"')>";
                content += "<img src='"+i.infosimg+"'>";
                content += "</div>";


                content += "<div class='aui-list-item-inner'>";

                content += "<div class='aui-list-item-text'>";



                content += "<div class='aui-list-item-title' style='width:60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosname+ "</div>";
                if(i.infosprice){
                    infosprice = i.infosprice;
                    if(i.infosunit){
                        infosunit = i.infosunit;
                    }else{
                        if(i.infosrentunit){
                            infosunit = i.infosrentunit;
                        }
                    }
                }
                content += "<div class='aui-list-item-right'>￥" + infosprice + "元/"+infosunit+"</div>";
                content += "</div>";

        				// content += "<div class='aui-list-item-text'>";

                // content += "<span style='width:80%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosdetail + "</span>";
                // content +=  i.infosdetail.substring(0,20)+"....";

                // content += "</div>";


                content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
                content += "<div class='aui-info-item'>";
                switch(i.pretype){
                    case "actor": typeImg = "../../image/index/actor.png";
                    break;
                    case "scene": typeImg = "../../image/index/scene.png";
                    break;
                    case "subject": typeImg = "../../image/index/subject.png";
                    break;
                    case "screenwriter": typeImg = "../../image/index/screenwriter.png";
                    break;
                    case "director": typeImg = "../../image/index/director.png";
                    break;
                    case "producer": typeImg = "../../image/index/producer.png";
                    break;
                    case "clothing": typeImg = "../../image/index/clothing.png";
                    break;
                    case "equipment": typeImg = "../../image/index/equipment.png";
                    break;
                    case "camerateam": typeImg = "../../image/index/camerateam.png";
                    break;
                    case "investment": typeImg = "../../image/index/investment.png";
                    break;
                }
                content += "<div style='margin-top:4px;'><img src='" + typeImg + "' style='height:0.85rem'/></div>";
                content += "<span class='aui-margin-l-5'></span>";
                content += "</div>";
                content += "<div class='aui-info-item'>";
                if("BP" === i.prestatus){
                    content += "<span style='margin-top:4px;color:#ff0000;font-size:11px;padding-right:5px;'>(取消申请)</span>"
                }
                content += "<span style='margin-top:4px;background-color:#ff6600;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick=orderDetail('" + i.id+ "','" + i.prestatus+ "')>订单详情</span>"
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</div>";
                content += "</li>";
            })

            if(0 === data.myList.length){
                $("#preContent").html("<span style='margin-top:10px;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
            }else{
                $("#preContent").html(content);
            }

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
    var comment = "";
    switch(ret.index){
        case 1:
              prestatus = "P";
        break;
        case 2: prestatus = "D";
        if("已评论" === commentflag){
            comment += "<div class='aui-btn-success' style='width:60%; height:20px; line-height:20px;text-align:center;' >";
            comment += "<div onclick=comment(" + i.infoid + "," + i.ownerid + ",'" + i.pretype +  "')>";
            comment += "<span style='font-size:14px;font-family:苹方；font-size:0.7rem;padding-left:2px;padding-right:2px;' id='p'>评论</span>";
            comment += "</div>"
        }else{
            comment += "<div class='aui-btn-warning' style='height:20px; width:80%;line-height:20px;text-align:center;' >";
            comment += "<div>";
            comment += "<span style='font-size:14px;font-family:苹方；font-size:0.7rem;padding-left:2px;padding-right:2px;' id='p'>已评论</span>";
            comment += "</div>"
        }
        comment += "</div>";
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

            data.myList.forEach(function(i){
              content += "<li class='aui-list-item' >";
              content += "<div class='aui-media-list-item-inner'>";
              // content += "<div class='aui-list-item-label'>";
              //
              // content += "<input type='radio' class='aui-radio' value='" + i.id + "' name='preid'>" ;
              // content += "</div>";


              content += "<div class='aui-list-item-media' onclick=roleDetails('"+i.pretype+"','"+i.infoid+"')>";
              content += "<img src='"+i.infosimg+"'>";
              content += "</div>";


              content += "<div class='aui-list-item-inner'>";

              content += "<div class='aui-list-item-text'>";



              content += "<div class='aui-list-item-title' style='width:60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosname+ "</div>";
              if(i.infosprice){
                  infosprice = i.infosprice;
                  if(i.infosunit){
                      infosunit = i.infosunit;
                  }else{
                      if(i.infosrentunit){
                          infosunit = i.infosrentunit;
                      }
                  }
              }
              content += "<div class='aui-list-item-right'>￥" + infosprice + "元/"+infosunit+"</div>";
              content += "</div>";

              // content += "<div class='aui-list-item-text'>";

              // content += "<span style='width:80%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosdetail + "</span>";
              // content +=  i.infosdetail.substring(0,20)+"....";

              // content += "</div>";


              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              switch(i.pretype){
                  case "actor": typeImg = "../../image/index/actor.png";
                  break;
                  case "scene": typeImg = "../../image/index/scene.png";
                  break;
                  case "subject": typeImg = "../../image/index/subject.png";
                  break;
                  case "screenwriter": typeImg = "../../image/index/screenwriter.png";
                  break;
                  case "director": typeImg = "../../image/index/director.png";
                  break;
                  case "producer": typeImg = "../../image/index/producer.png";
                  break;
                  case "clothing": typeImg = "../../image/index/clothing.png";
                  break;
                  case "equipment": typeImg = "../../image/index/equipment.png";
                  break;
                  case "camerateam": typeImg = "../../image/index/camerateam.png";
                  break;
                  case "investment": typeImg = "../../image/index/investment.png";
                  break;
              }
              content += "<div style='margin-top:4px;'><img src='" + typeImg + "' style='height:0.85rem'/></div>";
              content += "<span class='aui-margin-l-5'></span>";
              content += "</div>";
              content += "<div class='aui-info-item'>";
              if("BP" === i.prestatus){
                  content += "<span style='margin-top:4px;color:#ff0000;font-size:11px;padding-right:5px;'>(取消申请)</span>"
              }
              content += "<span style='margin-top:4px;background-color:#ff6600;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick=orderDetail('" + i.id+ "','" + i.prestatus+ "')>订单详情</span>"
              content += "</div>";
              content += "</div>";
              content += "</div>";
              content += "</div>";
              content += "</li>";

            })

            content += butContent;

            if(0 === data.myList.length){
                $("#preContent").html("<span style='margin-top:10px;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
            }else{
                $("#preContent").html(content);
            }

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
  var preid = $("input[name='infoid']:checked").val();
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

// 角色详情
function roleDetails(role,id){
    window.location.href = "../../scenes/roleDetails.html?id=" + id + "&role=" + role;
}

// 订单详情
function orderDetail(orderid, prestatus){
  window.location.href="orderDetail.html?orderid=" + orderid + "&prestatus=" + prestatus;
}
