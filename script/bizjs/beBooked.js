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
                content += "<div class='aui-list-item-right'>￥" + i.infosprice + "元/"+i.infosunit+"</div>";
                content += "</div>";

        				content += "<div class='aui-list-item-text'>";

                content += "<span style='width:80%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosdetail + "</span>";
                // content +=  i.infosdetail.substring(0,20)+"....";

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
                content += "<div class='aui-info-item'>";
                if("BP" === i.prestatus){
                    content += "<span style='color:#ff0000;font-size:11px;padding-right:5px;'>(取消申请)</span>"
                }
                content += "<span style='background-color:#ff6600;border-radius:5px;padding-left:5px;padding-right:5px;color:#fff;font-size:12px;' onclick=orderDetail('" + i.id+ "','" + i.prestatus+ "')>订单详情</span>"
                content += "</div>";
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
                // content += "<input type='radio' class='aui-radio' value='" + i.id + "' name='preid'>" ;
                // content += "</div>";


                content += "<div class='aui-list-item-media' onclick=roleDetails('"+i.pretype+"','"+i.infoid+"')>";
                content += "<img src='"+i.infosimg+"'>";
                content += "</div>";

                // content += comment;
                //
                //
                //
                // content += "</div>";
                // content += "</div>";
                //
                // content += "</div>";


                content += "<div class='aui-list-item-inner'>";
                content += "<div class='aui-list-item-text'>";

                if(type == 'actor'){
        					content += "<div class='aui-list-item-title' style='width:60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosname + "</div>";
        				}else if(type == 'scene'){
        					content += "<div class='aui-list-item-title' style='width:60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosname + "</div>";
        				}else if(type == 'subject'){
        					content += "<div class='aui-list-item-title' style='width:60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.infosname + "</div>";
        				}

                content += "</div>";

        				content += "<div class='aui-list-item-right'>￥" + i.infosprice + "元/"+i.infosunit+"</div>";

        				content += "<div class='aui-list-item-text'>";

                content += i.infosdetail;
                // content +=  i.infosdetail.substring(0,10)+"....";

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

                content += "<div class='aui-info-item'>";
                if("BP" === i.prestatus){
                    content += "<span style='color:#ff0000;font-size:11px;'>(取消申请)</span>"
                }
                content += "<span onclick=orderDetail('" + i.id+ "','" + i.prestatus+ "')>订单详情</span>"
                content += "</div>";
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
