var id = GetQueryString("id");
var role = GetQueryString("role");
var imgArr;

$(function(){
  var actionUrl = ""

  switch(role){
      case "actor":
          actionUrl = path + "/ActorInterface/actor/getAcotrById.action?actId=" + id;  // 演员
      break;
      case "scene":
          actionUrl = path + "/ActorInterface/scene/getSceneById.action?sceneId=" + id;  // 场景
      break;
      case "subject":
          actionUrl = path + "/ActorInterface/subject/getSubjectById.action?subjectId=" + id;  // 道具
      break;
      case "screenwriter":
          actionUrl = path + "/ActorInterface/screenwriter/getScreenwriterById.action?screenwriterId=" + id;  // 编剧
      break;
      case "director":
          actionUrl = path + "/ActorInterface/director/getDirectorById.action?directorId=" + id;  // 导演
      break;
      case "producer":
          actionUrl = path + "/ActorInterface/producer/getProducerById.action?producerId=" + id;  // 制片
      break;
      case "clothing":
          actionUrl = path + "/ActorInterface/clothing/getClothingById.action?clothingId=" + id;  // 服装
      break;
      case "equipment":
          actionUrl = path + "/ActorInterface/equipment/getEquipmentById.action?equipmentId=" + id;  // 设备
      break;
      case "camerateam":
          actionUrl = path + "/ActorInterface/camerateam/getCamerateamById.action?camerateamId=" + id;  // 摄影组
      break;
      case "cameraTeam":
          actionUrl = path + "/ActorInterface/camerateam/getCamerateamById.action?camerateamId=" + id;  // 摄影组
      break;
      case "investment":
          actionUrl = path + "/ActorInterface/investment/getInvestmentById.action?investmentId=" + id;  // 投资
      break;
  }

  $.post(actionUrl,{
      token:localStorage.token
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {

          var infos = "";
          var workingRange = "";
          var synopsis = "";
          var keywords = "";
          var reserveTime = "";

          switch(role){
              case "actor":
                  getActorDetail(data);  // 演员
              break;
              case "scene":
                  getSceneDetail(data);  // 场景
              break;
              case "subject":
                  getSubjectDetail(data);  // 道具
              break;
              case "screenwriter":
                  getScreenwriter(data);  // 编剧
              break;
              case "director":
                  getDirector(data);  // 导演
              break;
              case "producer":
                  getProducer(data);  // 制片
              break;
              case "clothing":
                  getClothing(data);  // 服装
              break;
              case "equipment":
                  getEquipment(data);  //  设备
              break;
              case "camerateam":
                  getCameraTeam(data);  // 摄影组
              break;
              case "cameraTeam":
                  getCameraTeam(data);  // 摄影组
              break;
              case "investment":
                  getInvestment(data);  // 投资
              break;
          }
      }else{
          $("#content").html("");
          dialog.alert({
                title:"获取信息失败！",
                msg:'',
                buttons:['确定']
            },function(ret){
                $("#content").html("");
            })
            return false;
      }
  });
});

// 关注和取消关注
function isfollow(infoid, type){
    if(!localStorage.token){
        dialog.alert({
            title:"请重新登录！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.href="../login.html";
        })
        return false;
    }

    $.post(path + "/ActorInterface/member/getSessionMember.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
          infoid = $("#infoid").val();
          type = $("#type").val();

          var checkedVal = $("#isfollow").prop("checked");
          var actionUrl = "";
          if(true === checkedVal){
              actionUrl = path + "/ActorInterface/attention/removeAttention.action";
          }else{
              actionUrl = path + "/ActorInterface/attention/addAttention.action";
          }

          var toast = new auiToast();
          toast.loading({
            title:"正在提交",
            duration:2000
          },function(ret){
            setTimeout(function(){
              $.post(actionUrl,{
                  token:localStorage.token,
                  infoid: infoid,
                  type: type
                }, function(data) {
                  var data = JSON.parse(data);
                  console.log(data)
                  if (data.success) {
                      if("关注成功！" === data.message){
                          $("#followImg").attr("src", "../image/roleDetails/takeOff.png");
                          $("#isfollow").prop("checked", true);
                          $("#attentionFlag").val("true");
                      }

                      if("关注已取消！" === data.message){
                          $("#followImg").attr("src", "../image/roleDetails/attention.png");
                          $("input[id='isfollow']").removeAttr("checked");
                          $("#attentionFlag").val("false");
                      }

                      toast.hide();

                      toast.success({
                       title:"提交成功",
                       duration:2000
                      });
                  }else{
                      toast.hide();

                      toast.fail({
                        title:"提交失败",
                        duration:2000
                      });
                  }
              });
            }, 3000)
          });
        }else{
          dialog.alert({
              title:"请登录!",
              msg:'',
              buttons:['确定']
              },function(ret){
             window.location.href="../login.html";
          })
          return false;
        }
    });


}

// 点赞
function isStart(infoid, type){
    if(!localStorage.token){
        dialog.alert({
            title:"请重新登录！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.href="../login.html";
        })
        return false;
    }

    infoid = $("#infoid").val();
    type = $("#type").val();

    var checkedVal = $("#isStart").prop("checked");
    var actionUrl = path + "/ActorInterface/attention/addGood.action";

    var toast = new auiToast();
    toast.loading({
      title:"正在提交",
      duration:2000
    },function(ret){
      setTimeout(function(){

        $.post(actionUrl,{
            token:localStorage.token,
            infoid: infoid,
            type: type
          }, function(data) {
            var data = JSON.parse(data);
            if (data.success) {
                if("点赞成功！" === data.message){
                    $("#startImg").attr("src", "../image/laud.png");
                    $("#isStart").prop("checked", true);
                    $("#goodFlag").val("true");
                }

                toast.hide();

                toast.success({
                 title:"点赞成功",
                 duration:2000
                });
            }else{
                toast.hide();

                toast.fail({
                  title:"点赞失败",
                  duration:2000
                });
            }
        });
      }, 3000)
    });
}

// 关注
function follow(infoid, type){
  if(!localStorage.token){
      dialog.alert({
          title:"请重新登录！",
          msg:'',
          buttons:['确定']
      },function(ret){
        window.location.href="../login.html";

      })
      return false;
  }

  $.post(path + "/ActorInterface/member/getSessionMember.action",{
      token:localStorage.token,
    }, function(data) {
      var data = JSON.parse(data);
      if (data.success) {
        infoid = $("#infoid").val();
        type = $("#type").val();
        console.log($("#attentionFlag").val());
        if("true" === $("#attentionFlag").val()){
            dialog.alert({
                title:"该信息已关注！",
                msg:'',
                buttons:['确定']
            },function(ret){

            })
            return false;
        }

        var toast = new auiToast();
        toast.loading({
          title:"正在提交",
          duration:2000
        },function(ret){
          setTimeout(function(){
            $.post( path + "/ActorInterface/attention/addAttention.action" ,{
                token:localStorage.token,
                infoid: infoid,
                type: type
              }, function(data) {
                var data = JSON.parse(data);
                if (data.success) {

                  if("关注成功！" === data.message){
                    $("#followImg").attr("src", "../image/roleDetails/takeOff.png");
                    $("#isfollow").prop("checked", true);
                    $("#attentionFlag").val("true");
                  }

                  toast.hide();

                  toast.success({
                   title:"提交成功",
                   duration:2000
                  });
                }else{
                    toast.hide();

                    toast.fail({
                      title:"提交失败",
                      duration:2000
                    });
                }
            });
          }, 3000)
        });
      }else{
        dialog.alert({
            title:"请登录!",
            msg:'',
            buttons:['确定']
            },function(ret){
           window.location.href="../login.html";
        })
        return false;
      }
  });
}

// 预约
function reserve(preFlag){
  if(!localStorage.token){
      dialog.alert({
          title:"请重新登录！",
          msg:'',
          buttons:['确定']
      },function(ret){
          window.location.href="../login.html";
      })
      return false;
  }

  // if("false" === preFlag){
  //     dialog.alert({
  //         title:"该信息已在预约状态！",
  //         msg:'',
  //         buttons:['确定']
  //     },function(ret){
  //
  //     });
  // return false;
  // }

    if(confirm("是否确定预约该信息?")){
        $.post(path + "/ActorInterface/member/getSessionMember.action",{
            token:localStorage.token,
          }, function(data) {
            var data = JSON.parse(data);
            console.log(data)
            if (data.success) {
               window.location.href = "reserve.html?preid=" + $("#infoid").val() + "&ownerid=" + $("#ownerid").val() + "&pretype=" + $("#type").val();
            }else{
              dialog.alert({
                  title:"请登录!",
                  msg:'',
                  buttons:['确定']
                  },function(ret){
                 window.location.href="../login.html";
              })
              return false;
            }
        });
    }
}

// 取消约定
function cancel(preFlag){
  if(confirm("是否确认约定?")){
      window.location.href="../mine/roleReservation/reservation.html"
  }
}

// 有待预约
function booking(preFlag){
    if(!localStorage.token){
        dialog.alert({
            title:"请重新登录！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.href="../login.html";
        })
        return false;
    }

    if("false" === preFlag){
        dialog.alert({
            title:"该信息已在待预定列表中！",
            msg:'',
            buttons:['确定']
        },function(ret){

        });
    return false;
    }

    if(confirm("是否确定将该条信息添加至待预约列表?")){
            $.post(path + "/ActorInterface/member/getSessionMember.action",{
                token:localStorage.token,
              }, function(data) {
                var data = JSON.parse(data);
                console.log(data)
                if (data.success) {


                  $("#prestatus").val("W");
                  var actionURL = path + "/ActorInterface/preorder/addPreorder.action?token=" + localStorage.token + "&infoid=" + $("#infoid").val() + "&ownerid=" + $("#ownerid").val() + "&pretype=" + $("#type").val() + "&prestatus=W" ;

                  var toast = new auiToast();
                  toast.loading({
                    title:"正在提交",
                    duration:2000
                  },function(ret){
                    setTimeout(function(){
                      $.ajax({
                          cache : true,
                          type  : "POST",
                          url   : actionURL,
                          data  :$('#postForm').serialize(),
                          async : true,
                          error : function(request) {
                              alert("error");
                          },
                          success : function(data) {
                              var data = JSON.parse(data);
                              if(data.success){
                                  toast.hide();
                                  toast.success({
                                    title:"成功加入待预定信息列表",
                                    duration:2000
                                  });

                                  window.location.reload();
                              }else{
                                  toast.hide();

                                  toast.fail({
                                    title:"提交失败",
                                    duration:2000
                                  });
                              }
                          }
                      });
                    }, 3000)
                  });

                }else{
                  dialog.alert({
                      title:"请登录!",
                      msg:'',
                      buttons:['确定']
                      },function(ret){
                     window.location.href="../login.html";
                  })
                  return false;
                }
            });
          }

}

// 相册
function album(){
    var imageBrowser = api.require('imageBrowser');
  	imageBrowser.openImages({
  		imageUrls: imgArr,
  		showList:true,
  		bg:'#000'

  	});
}

// 默认显示5条预约时间段
function reservations (){
    var display =$('#reserveTime').css('display');
    if(display == 'none'){
      $('#reserveTime').show();
    }else{
      $('#reserveTime').hide();
    }
}
