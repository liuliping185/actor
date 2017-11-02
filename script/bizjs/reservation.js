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
              content += "<div class='aui-list-item-right'>￥" + i.infosprice + "元/"+i.infosunit+"</div>";
              content += "</div>";

             content += "<div class='aui-list-item-text'>";

              // content +=  i.infosdetail.substring(0,10)+"....";
              content +=  i.infosdetail;

              content += "</div>";

              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
             switch(i.pretype){
                  case "actor": typeImg = "../../image/index/actor.png";
                  break;
                  case "scene": typeImg = "../../image/index/scene.png";
                  break;
                  case "subject": typeImg = "../../image/index/subject.png";
                  break;
              }
              content += "<div><img src='" + typeImg + "' style='height:1rem'/></div>";
              content += "<span class='aui-margin-l-5'></span>";
              content += "</div>";
              if("BP" === i.prestatus){
                  content += "<span style='background-color:#ff9900;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;'> 取消预约中</span>"
              }else{
                  content += "<span style='background-color:#ff3300;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick='cancel(" + i.id + ")'> 取消预约</span>"
              }
              // content += "<div class='aui-info-item'>" + i.createtime + "</div>";
              // content += "</div>";
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

}


var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
    // 被预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";
    var prestatus = "";
    var comment = "";
    switch(ret.index){
        case 1:
            prestatus = "P";
        break;
        case 2: prestatus = "D";


                if("已评论" === commentflag){
                    comment += "<div class='aui-btn-success' style='width:60%; height:20px; line-height:20px;text-align:center;' >";
                    comment += "<div onclick=comment(" + i.preid + "," + i.ownerid + ",'" + i.pretype +  "')>";
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
                content += "<div style='width:100%;height:100%;'>";
                content += "<div style='width:100%;height:50%;'>";
                content += "<img style='width:100px;height:50px;' onclick=roleDetails('"+i.pretype+"','"+i.preid+"') src='"+i.infosimg+"'/>";
                content += "</div>";
                content += "<div align='center' style='width:100%;height:50%;margin-top:30%;'>";


                content += comment;



                content += "</div>";
                content += "</div>";

                // content += comment;
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";

                content += "<div class='aui-list-item-text'>";
                content += "<div class='aui-list-item-title'>" + i.infosname+ "</div>";
		            content += "<div class='aui-list-item-right'>￥" + i.infosprice + "元/"+i.infosunit+"</div>";
                content += "</div>";

               content += "<div class='aui-list-item-text'>";

                // content +=  i.infosdetail.substring(0,10)+"....";
                content +=  i.infosdetail;

                content += "</div>";

                content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
                content += "<div class='aui-info-item'>";
               switch(i.pretype){
                    case "actor": typeImg = "../../image/index/actor.png";
                    break;
                    case "scene": typeImg = "../../image/index/scene.png";
                    break;
                    case "subject": typeImg = "../../image/index/subject.png";
                    break;
                }


                content += "<div><img src='" + typeImg + "' style='height:1rem'/></div>";
                content += "<span class='aui-margin-l-5'></span>";
                content += "</div>";
                if("BP" === i.prestatus){
                    content += "<span style='color:#ff0000'> 取消预约中</span>"
                }else{
                    content += "<span style='color:#ff0000' onclick='cancel(" + i.id + ")'> 取消预约</span>"
                }

                // if("P" === i.prestatus){
                //
                // }else{
                //     content += "<span onclick='cancel(" + i.id + ")'> 取消预约</span>"
                // }
                // content += "<div class='aui-info-item'>" + i.createtime + "</div>";
                // content += "</div>";
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
