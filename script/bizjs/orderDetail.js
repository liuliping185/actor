var orderid = GetQueryString("orderid");
var prestatus = GetQueryString("prestatus");

console.log(orderid + "------" + prestatus)
$(function(){
  var btn = "";
  if("P" === prestatus){
    btn += "<div style='padding: 3px 20px 1px;padding-bottom:10px;'>";
    btn += "<div style='background-color:#20e0b9;margin-top: 50px;' class='aui-btn aui-btn-success aui-btn-block aui-btn-sm' onclick='agree()'>";
    btn += "<span id='p'>同&nbsp;&nbsp;意</span>";
    btn += "</div>";
    btn += "</div>";

    btn += "<div style='background-color:#ffffff;padding-bottom:50px;padding-left:20px;padding-right:20px;'>";
    btn += "<div id='tjBtu' style='background-color:#ff0000;' class='aui-btn aui-btn-danger aui-btn-block aui-btn-sm'>";
    btn += "<div onclick='disagree()' id='tjBtu'>拒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绝</div>";
    btn += "</div>";
    btn += "</div>";
  }

  $("#btn").html(btn);

  $.post(path + "/ActorInterface/preorder/orderDetail.action",{
      orderid: orderid,
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          $("#imgpath").attr("src", data.order.infosimg);
          var name = "";
          switch (data.order.pretype) {
            case "actor":
                name = "演员";
              break;
            case "scene":
                name = "场景";
              break;
            case "subject":
                name = "道具";
              break;
              case "screenwriter":
                  name = "编剧";
                break;
              case "director":
                  name = "导演";
                break;
              case "producer":
                  name = "制片";
                break;
              case "clothing":
                  name = "服装";
                break;
              case "equipment":
                  name = "设备";
                break;
              case "camerateam":
                  name = "摄影组";
                break;
              case "investment":
                  name = "投资";
                break;
          }
          $("#rolename").val(name);
          $("#prephone").val(data.order.prephone);
          $("#nickname").val(data.order.infosname);
          $("#price").val(data.order.infosprice + "/" + data.order.infosunit);
          $("#preinfos").val(data.order.preinfos);
          $("#backreason").val(data.order.backreason);
      }else{
      }
  });
  if("BP" === prestatus){

    var reason = "";

    reason += "<div style='padding-bottom:10px;padding-left:20px;padding-right:20px;margin-top:2px;background-color:#ffffff;'>";
    reason += "<ul>";
    reason += "<li>";
    reason += "<div style='float:left;width:25%;margin-top:15px;'>";
    reason += "<span style='margin-top:-5%;font-size:0.75rem;color:#6c6c6c;'>取消原因&nbsp&nbsp:</span>";
    reason += "</div>";
    reason += "<span style='width:70%;margin-top:18px;'>";
    reason += "<textarea readonly='true' id='backreason' name='backreason' style='padding-left:5px;padding-right:2px;overflow:auto;height:50px;width:100%;font-size:0.75rem;color:#6c6c6c;' rows='10' cols='20' ></textarea>";
    reason += "</span>";
    reason += "</li>";
    reason += "<li>";
    reason += "<div style='float:left;width:25%;margin-top:15px;'>";
    reason += "<span style='margin-top:-5%;font-size:0.75rem;color:#6c6c6c;'>拒绝原因&nbsp&nbsp:</span>";
    reason += "</div>";
    reason += "<span style='width:70%;margin-top:18px;'>";
    reason += "<textarea id='refusereason' name='refusereason' style='padding-left:5px;padding-right:2px;overflow:auto;height:100px;width:100%;font-size:0.75rem;color:#6c6c6c;border:#E0E0E0 1px solid;border-radius:10px' rows='10' cols='20' placeholder='  如果拒绝，请填写拒绝原因'></textarea>";
    reason += "</span>";
    reason += "</li>";
    reason += "</ul>";
    reason += "</div>";

    $("#reason").html(reason);
  }

});

// 同意
function agree(){
  var actionURL = "";
      actionURL = path + "/ActorInterface/preorder/agreePreorder.action";

  $.post(actionURL,{
      token:localStorage.token,
      orderid: orderid
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
              window.location.href = "../../mine/roleReservation/beBooked.html";
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
function disagree(){
  if("" === $("#refusereason").val()){
      dialog.alert({
          title:"请填写拒绝原因",
          msg:'',
          buttons:['确定']
      },function(ret){
      })
      return false;
  }
  var actionURL = path + "/ActorInterface/preorder/refusePreorder.action";

  $.post(actionURL,{
      token:localStorage.token,
      orderid: orderid
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
              window.location.href = "../../mine/roleReservation/beBooked.html";
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
