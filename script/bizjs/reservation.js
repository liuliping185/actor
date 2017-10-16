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
              content += "<li class='aui-list-item' onclick=goDetail('"+i.pretype+"','"+i.preid+"')>";
              content += "<div class='aui-media-list-item-inner'>";
              content += "<div class='aui-list-item-media'>";
              content += "<img src='"+i.infosimg+"'>";
              content += "</div>";
              content += "<div class='aui-list-item-inner'>";
              content += "<div class='aui-list-item-text'>";
              content += "<div class='aui-list-item-title'>" + i.infosname+ "</div>";
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

                comment += "<div class='aui-btn-success' style='width:60%; height:20px; line-height:20px;margin-left:10%;text-align:center;' >";
                comment += "<span style='font-size:14px;' id='p'>评论</span>";
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
                content += "<img onclick=goDetail('"+i.pretype+"','"+i.preid+"') src='"+i.infosimg+"'/>";
                content += "</div>";
                content += "<div style='width:100%;height:50%;margin-top:30%;'>";


                content += "<div onclick=comment(" + i.preid + "," + i.ownerid + ",'" + i.pretype +  "')>" + comment + "</div>" ;



                content += "</div>";
                content += "</div>";

                // content += comment;
                content += "</div>";
                content += "<div class='aui-list-item-inner'>";

                content += "<div class='aui-list-item-text'>";
                content += "<div class='aui-list-item-title'>" + i.infosname+ "</div>";
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

// 评论
function comment(infoid, ownerid, type){
  window.location.href="comment.html?infoid=" + infoid + "&ownerid=" + ownerid + "&type=" + type;
}
