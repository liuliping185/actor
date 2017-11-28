var commentflag = GetQueryString("commentflag");
$(function(){
    $('body').height($('body')[0].clientHeight);

    getRes('');

});

function getChange(type){

	getRes(type);
}

function getRes(type){

	// 预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";

    $.post(actionURL,{
        token:localStorage.token,
        prestatus: "P",
		    pretype:type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
          var content = "";

          data.myList.forEach(function(i){
              content += "<li class='aui-list-item' >";
              content += "<div class='aui-media-list-item-inner'>";
              content += "<div class='aui-list-item-media'>";
              content += "<img style='width:100px;height:50px' onclick=roleDetails('"+i.pretype+"','"+i.infoid+"') src='"+i.infosimg+"'>";

              content += "</div>";
              content += "<div class='aui-list-item-inner'>";
              content += "<div class='aui-list-item-text'>";



              content += "<div class='aui-list-item-title'>" + i.infosname+ "</div>";
              var infosprice = "";
              var infosunit = "";
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

            //  content += "<div class='aui-list-item-text'>";

              // content +=  i.infosdetail.substring(0,10)+"....";
              // content +=  i.infosdetail;

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

              if("BP" === i.prestatus){
                  content += "<span style='margin-top:4px;background-color:#ff9900;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;'> 取消预约中</span>"
              }else{
                  content += "<span style='margin-top:4px;background-color:#ff3300;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick='cancel(" + i.id + ")'> 取消预约</span>"
              }

              // content += "<div class='aui-info-item'>" + i.createtime + "</div>";
              // content += "</div>";
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
            var comment = "";
            data.myList.forEach(function(i){
                if(prestatus === "D"){
                    if(null == commentflag && "" == commentflag && commentflag){
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
                    }else{
                        comment += "<div class='aui-btn-success' style='width:60%; height:20px; line-height:20px;text-align:center;' >";
                        comment += "<div onclick=comment(" + i.infoid + "," + i.ownerid + ",'" + i.pretype +  "')>";
                        comment += "<span style='font-size:14px;font-family:苹方；font-size:0.7rem;padding-left:2px;padding-right:2px;' id='p'>评论</span>";
                        comment += "</div>"
                    }

                    comment += "</div>";
                }

                content += "<li class='aui-list-item' >";
                content += "<div class='aui-media-list-item-inner'>";
                content += "<div class='aui-list-item-media'>";
                content += "<img style='width:100px;height:50px' onclick=roleDetails('"+i.pretype+"','"+i.infoid+"') src='"+i.infosimg+"'>";

                content += "</div>";
                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";



                content += "<div class='aui-list-item-title'>" + i.infosname+ "</div>";
                var infosprice = "";
                var infosunit = "";
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

              //  content += "<div class='aui-list-item-text'>";

                // content +=  i.infosdetail.substring(0,10)+"....";
                // content +=  i.infosdetail;

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

                if("BP" === i.prestatus){
                    content += "<span style='margin-top:4px;background-color:#ff9900;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;'> 取消预约中</span>"
                }else{
                    content += "<span style='margin-top:4px;background-color:#ff3300;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick='cancel(" + i.id + ")'> 取消预约</span>"
                }

                // content += "<div class='aui-info-item'>" + i.createtime + "</div>";
                // content += "</div>";
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
});



function roleDetails(role,id){
    window.location.href = "../../scenes/roleDetails.html?id=" + id + "&role=" + role;
}

// 评论
function comment(infoid, ownerid, type){
  window.location.href="comment.html?infoid=" + infoid + "&ownerid=" + ownerid + "&type=" + type;
}

// 取消预约
function cancel(orderid){
  window.location.href="cancelPreoeder.html?orderid=" + orderid;
}
