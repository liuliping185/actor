var id = GetQueryString("id");
var imgArr;

$(function(){
  var actionUrl = path + "/ActorInterface/scene/getSceneById.action?sceneId=" + id;

  $.post(actionUrl,{
      token:localStorage.token
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
        $("#membername").html("发布人: " + data.membername);
        if(data.sceneinfo.price && data.sceneinfo.unit){
            $("#price").html("￥" +  data.sceneinfo.price + "/" + data.sceneinfo.unit);
        }

        $("#role").html("找场景");

        infos += "<h4 style='margin-top:3%; margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>场地信息</span></h4>";
        infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:12px;color:#9D9D9D;padding-bottom:5px;'>";
        if(data.sceneinfo.provience && data.sceneinfo.city && data.sceneinfo.district){
            infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:13px;color:#8E8E8E;'>" + data.sceneinfo.provience + data.sceneinfo.city + data.sceneinfo.district + data.sceneinfo.address + "</span>";
        }
        infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:12px;color:#9D9D9D;padding-bottom:5px;'>" + data.sceneinfo.sceneinfos + "</span>";
        infos += "</span>";

        keywords += "<div style='background-color:#ffffff;padding-bottom:5px;margin-top:2%;padding-bottom:10px;'>";
        keywords += "<h4 style='margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>关键字</span></h4>";
        keywords += "<span style='margin-top: 2%; margin-left:10%; font-size:12px; color:#20e0b9; display:inline-block;border:1px solid #20e0b9; border-radius:5px;'>";
        keywords += "<span style='font-size:12px;padding-left:5px;padding-right:5px;'>" + data.sceneinfo.keywords + "</span>";
        keywords += "</span>";
        keywords += "<div>";

        synopsis += "<div style='margin-top:2%;'>";
        synopsis += "<h4 style='margin-left:5%;  color:#7B7B7B;'><span style='margin-top:3%;'>预约</span>";
        synopsis += "</h4>";
        synopsis += "</div>";
        synopsis += "<div style='padding-bottom:10px;'>";
        synopsis += "<div class='aui-btn aui-btn-success' onclick=reserve('" + data.preFlag + "') style='background-color:#20e0b9;width:50px; height:20px; font-size:14px; line-height:20px; margin-left:10%; margin-top:2%;'>预约</div>";
        synopsis += "<div class='aui-btn aui-btn-success' onclick=booking('" + data.preFlag + "') style='background-color:#20e0b9;width:60x; height:20px; font-size:14px; line-height:20px; margin-left: 20px; margin-top:2%;'>待预约</div>";
        synopsis += "</div>";
        synopsis += "</div>";

        $("#infoid").val(data.sceneinfo.id);
        $("#type").val("scene");
        $("#ownerid").val(data.sceneinfo.memberid);

        $("#nickname").html(data.sceneinfo.scenename);
        var d = new Date(data.sceneinfo.createtime);
        var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        $("#area").html(createtime);
        imgArr = [];
        var imgflag = 0;
        var imgone = "";
        var imgfour = "";
        var imgsix = "";
        var imgssecond = "";

        var width = data.imgs[0].width;
        var height = data.imgs[0].height;
        if(1 ===  data.imgs.length){
            $("#photo").html("<img id='aaa' style='width:100%;float:left;margin-top:3%;' src='" + i.imgpath + "'/>");
            if(Number(width) > Number(height)){
                imgone += "<span style='margin-left:3%; width:100%; height:100%;'><img style='float:left; width:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
            }else{
                imgone += "<span style='margin-left:3%; width:100%; height:100%;'><img style='float:left; height:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
            }

            $("#imgBig").html(imgone);
        }

        data.imgs.forEach(function(i){
            imgArr.push(i.imgpath);

            imgflag ++;

            width = i.width;
            height = i.height;

            if(width > height){
                imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:45%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
                imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:45%; height:45%;margin-top:3%;'><img style='width:100%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
                imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:80%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            }else{
                imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:45%;margin-top:3%;'><img style='height:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
                imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center; width:45%; height:45%;margin-top:3%;'><img style='height:100%;left:50%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
                imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center; width:30%; height:80%;margin-top:3%;'><img style='height:100%;left:50%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            }

            if(imgflag >= 5){
                $("#photoDiv").height("50%");
                if(imgflag === 6 || imgflag === 5){
                  $("#imgBig").html(imgsix);
                }
            }else{
                if(imgflag >= 4){
                  if(4 === imgflag){
                    $("#photoDiv").height("50%");
                    $("#imgBig").html(imgfour);
                  }
                }else if(imgflag === 2){
                    $("#photoDiv").height("25%");

                    $("#imgBig").html(imgssecond);
                }else if(imgflag === 3){
                    $("#photoDiv").height("25%");

                    $("#imgBig").html(imgssecond);

                }
            }
        });

        reserveTime = "";
        data.fiveOrder.forEach(function(i){
            reserveTime += "<div style='margin-top:10px;'>";
            loginname = i.loginname.substring(0,2) + "*";
            reserveTime += "<span style='color:#9D9D9D;font-size:12px;'>";
            reserveTime += i.prestart + " - " + i.preend;
            reserveTime += "</span>";
            reserveTime += "<span style='color:#9D9D9D;font-size:12px;margin-left:10%;'>" + loginname+ "</span>"

            reserveTime += "</div>";
        });

        if("" != reserveTime){
            $("#reserveTime").html(reserveTime);
        }

        $('#img').attr('src', data.memberimg);

        $("#attentionFlag").val(data.attentionFlag);
        $("#goodFlag").val(data.goodFlag);

        $("#infos").html(infos);
        $("#workingRange").html(workingRange);
        $("#synopsis").html(synopsis);
        $("#keywords").html(keywords);

        if("true" === $("#attentionFlag").val()){
            $("#followImg").attr("src", "../image/roleDetails/takeOff.png");
            $("#isfollow").prop("checked", true);
        }else{
            $("#followImg").attr("src", "../image/roleDetails/attention.png");
            $("input[id='isfollow']").removeAttr("checked");
        }

        if("true" === $("#goodFlag").val()){
            $("#startImg").attr("src", "../image/laud.png");
            // $("#follow").html("-取消关注");
            $("#isStart").prop("checked", true);
        }else{
            $("#startImg").attr("src", "../image/laudT.png");
            // $("#follow").html("+关注");
            $("input[id='isStart']").removeAttr("checked");
        }

        switch(data.service){
            case 1: $('#service').attr('src', '../image/roleDetails/1p.png');
            break;
            case 2: $('#service').attr('src', '../image/roleDetails/2p.png');
            break;
            case 3: $('#service').attr('src', '../image/roleDetails/3p.png');
            break;
            case 4: $('#service').attr('src', '../image/roleDetails/4p.png');
            break;
            case 5: $('#service').attr('src', '../image/roleDetails/5p.png');
            break;
        }

        switch(data.professional){
            case 1: $('#professional').attr('src', '../image/roleDetails/1p.png');
            break;
            case 2: $('#professional').attr('src', '../image/roleDetails/2p.png');
            break;
            case 3: $('#professional').attr('src', '../image/roleDetails/3p.png');
            break;
            case 4: $('#professional').attr('src', '../image/roleDetails/4p.png');
            break;
            case 5: $('#professional').attr('src', '../image/roleDetails/5p.png');
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

  if("false" === preFlag){
      dialog.alert({
          title:"该信息已在预约状态！",
          msg:'',
          buttons:['确定']
      },function(ret){

      });
  return false;
  }

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
            title:"该信息已在预约状态！",
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

function reserveTime (){
    var display =$('#reserveTime').css('display');
    if(display == 'none'){
      $('#reserveTime').show();
    }else{
      $('#reserveTime').hide();
    }
}
