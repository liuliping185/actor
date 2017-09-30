var id = GetQueryString("id");
var role = GetQueryString("role");

$(function(){
  $('body').height($('body')[0].clientHeight);
  var actionUrl = ""
  console.log(id + "----" + role );
  switch(role){
      case "actor":
          actionUrl = path + "/ActorInterface/actor/getAcotrById.action?actId=" + id;
      break;
      case "scene":
          actionUrl = path + "/ActorInterface/scene/getSceneById.action?sceneId=" + id;
      break;
      case "subject":
          actionUrl = path + "/ActorInterface/subject/getSubjectById.action?subjectId=" + id;
      break;
  }

  console.log(actionUrl);
  $.post(actionUrl,{
      token:localStorage.token
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          var infos = "";
          var workingRange = "";
          var synopsis = "";
          switch(role){
              case "actor":
                  $("#role").html("找演员");

                  infos += "<h4 style='margin-top:5%; margin-left: 5%; color:#7B7B7B;'>艺人信息</h4>";
                  infos += "<div style='margin-top: 2%; margin 0 auto;'>";
                  infos += "<span style='margin-left:5%; font-size:14px;'>身高:";
                  infos += "<sapn style='font-size:14px;'>" + data.actinfo.height + "</span>cm";
                  infos += "</span>";
                  infos += "<span style='margin-left:10%; font-size:14px;'>体重:";
                  infos += "<span style='font-size:14px;'>" + data.actinfo.weight/2 + "</span>kg";
                  infos += "</span>";
                  infos += "<span style='margin-left:10%; font-size:14px;'>鞋码:";
                  infos += "<span style='font-size:14px;'>" + "保密"+ "</span>";
                  infos += "</span>";
                  infos += "</div>";

                  workingRange += "<h4 style='color:#7B7B7B;'>工作范围";
                  workingRange += "<span style='color: #7B7B7B; margin-left:65%;'>更多></span>";
                  workingRange += "<h4>";

                  synopsis += "<h4 style='margin-left:5%;'>模特</h4>";
                  synopsis += "<div>";
                  synopsis += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>可预约时段";
                  synopsis += "</h4>";
                  synopsis += "</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='reserve()' style='width:50px; height:30px; margin-left:5%; margin-top:2%;'>预约</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='booking()' style='width:65px; height:30px; margin-left: 20px; margin-top:2%;'>待预约</div>";
                  synopsis += "<h4 style='margin-left:5%; margin-top:5%; color:#7B7B7B;'>工作经历</h4>";
                  synopsis += "<div>";
                  synopsis += "<span style='margin-left:5%;'>" + data.actinfo.experience + "</span>";
                  synopsis += "</div>";
                  synopsis += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>个人简介</h4>";
                  synopsis += "<div>";
                  synopsis += "<span style='margin-left:5%;'>" + data.actinfo.infos + "</span>";
                  synopsis += "</div>";

                  $("#infoid").val(data.actinfo.id);
                  $("#type").val("actor");
                  $("#ownerid").val(data.actinfo.memberid);
                  $("#nickname").html(data.actinfo.nickname);
                  if(data.actinfo.provience){
                      $("#area").html(data.actinfo.provience + data.actinfo.city);
                  }else{
                      $("#area").html("&nbsp");
                  }

                  $('#img').attr('src', data.imgs[0].imgpath);
                  $('#imgBig').attr('src', data.imgs[0].imgpath);

                  $("#attentionFlag").val(data.attentionFlag);

                  $("#infos").html(infos);
                  $("#workingRange").html(workingRange);
                  $("#synopsis").html(synopsis);

                  if("true" === $("#attentionFlag").val()){
                    console.log("aa")
                      $("#follow").html("-取消关注");
                      $("#isfollow").prop("checked", true);
                  }else{
                      $("#follow").html("+关注");
                      $("input[id='isfollow']").removeAttr("checked");
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
              break;
              case "scene":
                  $("#role").html("找场景");

                  infos += "<h4 style='margin-top:5%; margin-left: 5%; color:#7B7B7B;'>场地信息</h4>";
                  infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%;'>";
                  infos += data.sceneinfo.sceneinfos;
                  infos += "</span>";

                  workingRange += "<h4 style='color:#7B7B7B;'>工作范围";
                  workingRange += "<span style='color:#7B7B7B; margin-left:65%;'>更多></span>";
                  workingRange += "<h4>";

                  synopsis += "<h4 style='margin-left: 5%; color:#7B7B7B;'>" + data.sceneinfo.scenename + "</h4>";
                  synopsis += "<div>";
                  synopsis += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>可预约时段";
                  synopsis += "</h4>";
                  synopsis += "</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='reserve()' style='width:50px; height:30px; margin-left:5%; margin-top:2%;'>预约</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='booking()' style='width:65px; height:30px; margin-left: 20px; margin-top:2%;'>待预约</div>";

                  $("#infoid").val(data.sceneinfo.id);
                  $("#type").val("scene");
                  $("#ownerid").val(data.sceneinfo.memberid);

                  $("#nickname").html(data.sceneinfo.scenename);
                  var d = new Date(data.sceneinfo.createtime);
                  var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  $("#area").html(createtime);

                  $('#img').attr('src', data.imgs[0].imgpath);
                  $('#imgBig').attr('src', data.imgs[0].imgpath);

                  $("#attentionFlag").val(data.attentionFlag);

                  $("#infos").html(infos);
                  $("#workingRange").html(workingRange);
                  $("#synopsis").html(synopsis);

                  console.log($("#attentionFlag").val())
                  if("true" === $("#attentionFlag").val()){
                    console.log("aa")
                      $("#follow").html("-取消关注");
                      $("#isfollow").prop("checked", true);
                  }else{
                      $("#follow").html("+关注");
                      $("input[id='isfollow']").removeAttr("checked");
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
              break;
              case "subject":
                  $("#role").html("找道具");

                  infos += "<h4 style='margin-top:5%; margin-left: 5%; color:#7B7B7B;'>道具信息</h4>";
                  infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%;'>" + data.subjectinfo.address + "</span>";

                  workingRange += "<h4 style='color:#7B7B7B;'>工作范围";
                  workingRange += "<span style='color: #color:#7B7B7B; margin-left:65%;'>更多></span>";
                  workingRange += "<h4>";

                  synopsis += "<h4 style='margin-left:5%;'>" + data.subjectinfo.subjectname + "</h4>";
                  synopsis += "<div>";
                  synopsis += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>可预约时段";
                  synopsis += "</h4>";
                  synopsis += "</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='reserve()' style='width:50px; height:30px; margin-left:5%; margin-top:2%;'>预约</div>";
                  synopsis += "<div class='aui-btn aui-btn-info' onclick='booking()' style='width:65px; height:30px; margin-left: 20px; margin-top:2%;'>待预约</div>";

                  $("#infoid").val(data.subjectinfo.id);
                  $("#type").val("subject");
                  $("#ownerid").val(data.subjectinfo.memberid);

                  $("#nickname").html(data.subjectinfo.subjectname);
                  var d = new Date(data.subjectinfo.createtime);
                  var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  $("#area").html(createtime);

                  $('#img').attr('src', data.imgs[0].imgpath);
                  $('#imgBig').attr('src', data.imgs[0].imgpath);

                  $("#infos").html(infos);
                  $("#workingRange").html(workingRange);
                  $("#synopsis").html(synopsis);

                  $("#attentionFlag").val(data.attentionFlag);

                  if("true" === $("#attentionFlag").val()){
                    console.log("aa")
                      $("#follow").html("-取消关注");
                      $("#isfollow").prop("checked", true);
                  }else{
                      $("#follow").html("+关注");
                      $("input[id='isfollow']").removeAttr("checked");
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
  thirdInitialization();
});

// 详情
function detail(){

}
// 第三栏区的内容初始化加载
function thirdInitialization(){
  var htmlStr = "";
  $("#sample").html("");
  for(var i=0; i<3; i++){
    if(i > 0){
      htmlStr += "<div onclick='detail()' style='width:100%; height:32%; margin-top:2%; background-color:#00ffff; background-image: url(../image/index/timg.jpg); background-size:100%;'></div>";
    }else{
      htmlStr += "<div onclick='detail()' style='width:100%; height:32%; margin_top: 0px; background-color:#00ffff; background-image: url(../image/index/timg.jpg); background-size:100%;'></div>";
    }
  }
  $('#sample').append(htmlStr);
}
/** 无限分页开始 **/
// function lowEnough(){
//     //真实内容的高度
//     var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
//     //视窗的高度
//     var viewportHeight = window.innerHeight ||
//         document.documentElement.clientHeight ||
//         document.body.clientHeight || 0;
//     //隐藏的高度
//     var scrollHeight = window.pageYOffset ||
//         document.documentElement.scrollTop ||
//         document.body.scrollTop || 0;
//     // console.log(pageHeight);
//     // console.log(viewportHeight);
//     // console.log(scrollHeight);
//     return pageHeight - viewportHeight - scrollHeight < 20;
// }
// var flag = 0;
// function doSomething(){
//     var htmlStr = "";
//     if(6 > flag){
//       for(var i=0; i<3; i++){
//           htmlStr += "<div onclick='detail()' style='width:100%; height:32%; margin-top:2%; background-color:#00ffff; background-image: url(../image/index/timg.jpg); background-size:100%;'></div>";
//           flag ++;
//       }
//     }
//     $('#sample').append(htmlStr);
//     pollScroll();//继续循环
//     $('#spinner').hide();
// }
// function checkScroll(){
//     if(!lowEnough()) return pollScroll();
//     $('#spinner').show();
//     setTimeout(doSomething,900);
// }
// function pollScroll(){
//     setTimeout(checkScroll,1000);
// }
// checkScroll();
/** 无限分页结束 **/

// 上传图片开始
// 上传图片
function showAction(){
  var UIMediaScanner = api.require('UIMediaScanner');
  UIMediaScanner.open({
    type: 'picture',
    column: 4,
    classify: true,
    max: 4,
    sort: {
      key: 'time',
      order: 'desc'
    },
    texts: {
      stateText: '已选择*项',
      cancelText: '取消',
      finishText: '完成'
    },
    styles: {
      bg: '#fff',
      mark: {
        icon: '',
        position: 'bottom_left',
        size: 20
      },
      nav: {
        bg: '#eee',
        stateColor: '#000',
        stateSize: 18,
        cancelBg: 'rgba(0,0,0,0)',
        cancelColor: '#000',
        cancelSize: 18,
        finishBg: 'rgba(0,0,0,0)',
        finishColor: '#000',
        finishSize: 18
      }
    },
    scrollToBottom: {
      intervalTime: 3,
      anim: true
    },
    exchange: true,
    rotation: true
  }, function(ret) {
    if (ret) {
      $("#imgUpload").html("");
      for(var i=0; i<ret.list.length; i++){
        alert(ret.list[i].path);
        $("#imgUpload").append("<img style='width:100%;height:100%;' src='ret.list[i].path'/>");
      }
      // $('#imgUp').attr('src', ret.list[0].path);
      // for(var i=0; i<ret.list.length; i++){
      //   alert(ret.list[i]);
      // }
      alert(JSON.stringify(ret));
    }
  });
    // api.actionSheet({
    //     title: '上传图片',
    //     cancelTitle: '取消',
    //     buttons: ['拍照','从手机相册选择']
    // }, function(ret, err) {
    //     if (ret) {
    //         getPicture(ret.buttonIndex);
    //     }
    // });
}

// function getPicture(sourceType) {
//     if(sourceType==1){ // 拍照
//         api.getPicture({
//             sourceType: 'camera',
//             encodingType: 'jpg',
//             mediaValue: 'pic',
//             allowEdit: false,
//             destinationType: 'base64',
//             quality: 90,
//             saveToPhotoAlbum: true
//         }, function(ret, err) {
//             if (ret) {
//                $('#imgUp').attr('src', ret.base64Data);
//             }else {
//                 alert(JSON.stringify(err));
//             }
//         });
//     }
//     else if(sourceType==2){ // 从相机中选择
//         api.getPicture({
//                 sourceType: 'library',
//                 encodingType: 'jpg',
//                 mediaValue: 'pic',
//                 destinationType: 'base64',
//                 quality: 50,
//                 targetWidth: 750,
//                 targetHeight: 750
//             }, function(ret, err) {
//                 if (ret) {
//                   alert(JSON.stringify(ret));
//                   $('#imgUp').attr('src', ret.base64Data);
//                     // var aa=ret.base64Data;
//                     // api.ajax({
//                     //     type:"post",
//                     //     url:"",
//                     //     data:{base64:aa},
//                     //     dataType:'json',
//                     //     async:true,
//                     // },function(ret,err){
//                     //     if(ret){
//                     //         $('#imgUp').attr('src',aa)
//                     //     }else{
//                     //         api.alert(err);
//                     //     }
//                     // })
//                 } else {
//                     alert(JSON.stringify(err));
//                 }
//         });
//     }
// }
// 上传图片结束

// 关注和取消关注
function isfollow(infoid, type){
    if(!localStorage.token){
        dialog.alert({
            title:"请重新登录！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
        return false;
    }

    infoid = $("#infoid").val();
    type = $("#type").val();

    console.log(infoid + "-----" + type)

    var checkedVal = $("#isfollow").prop("checked");
    console.log(checkedVal);
    var actionUrl = "";
    if(true === checkedVal){
        actionUrl = path + "/ActorInterface/attention/removeAttention.action";
    }else{
        actionUrl = path + "/ActorInterface/attention/addAttention.action";
    }

    $.post(actionUrl,{
        token:localStorage.token,
        infoid: infoid,
        type: type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            if("关注成功！" === data.message){
                $("#follow").html("-取消关注");
                $("#isfollow").prop("checked", true);
                $("#attentionFlag").val("true");
            }

            if("关注已取消！" === data.message){
                $("#follow").html("+关注");
                $("input[id='isfollow']").removeAttr("checked");
                $("#attentionFlag").val("false");
            }
        }
    });

}

// 关注
function follow(infoid, type){
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

    $.post( path + "/ActorInterface/attention/addAttention.action" ,{
        token:localStorage.token,
        infoid: infoid,
        type: type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            if("关注成功！" === data.message){
                $("#follow").html("-取消关注");
                $("#isfollow").prop("checked", true);
                $("#attentionFlag").val("true");
            }
        }
    });

}

// 预约
function reserve(){
  console.log($("#infoid").val() + "------" + $("#type").val() + "------" + $("#ownerid").val());
   window.location.href = "reserve.html?preid=" + $("#infoid").val() + "&ownerid=" + $("#ownerid").val() + "&pretype=" + $("#type").val();
}

// 有待预约
function booking(){
  console.log($("#infoid").val() + "------" + $("#type").val() + "------" + $("#ownerid").val());
    // $("#preid").val(18);
    // $("#pretype").val("actor");
    // $("#ownerid").val(23);
    var actionURL = path + "/ActorInterface/preorder/addPreorder.action?token=" + localStorage.token + "&preid=" + $("#infoid").val() + "&ownerid=" + $("#ownerid").val() + "&pretype=" + $("#type").val();

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
                alert("待预约成功！");
                //window.location.href = "../mine/personalRoleManage/editRoleInfo.html?role=" + role;
    				}else{
    				}
    		}
    });

    // $.post(actionURL,{
    //     token:localStorage.token,
    //     preid: id,
    //     pretype: role,
    //     ownerid: 23,
    //     prestatus: "W"
    //   }, function(data) {
    //     var data = JSON.parse(data);
    //     console.log(data)
    //     if (data.success) {
    //       dialog.alert({
    //           title:"待预定成功！",
    //           msg:'',
    //           buttons:['确定']
    //       },function(ret){
    //           console.log(ret)
    //       })
    //     }else{
    //       dialog.alert({
    //           title:data.message,
    //           msg:'',
    //           buttons:['确定']
    //       },function(ret){
    //           console.log(ret)
    //       })
    //     }
    // });
}

// 相册
function album(){
    window.location.href="album.html?role=" + role;
}
