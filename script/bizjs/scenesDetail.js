$(function(){
  $('body').height($('body')[0].clientHeight);
  var actId = GetQueryString("actId");
  $.post(path + "/ActorInterface/actor/getAcotrById.action",{
      token:localStorage.token,
      actId: 45
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          $("#nickname").html(data.actinfo.nickname);
          $("#area").html(data.actinfo.provience + data.actinfo.city);
          $("#height").html(data.actinfo.height);
          $("#weight").html(data.actinfo.weight/2);
          $('#img').attr('src', data.imgs[0].imgpath);
          $('#imgBig').attr('src', data.imgs[0].imgpath);
          $("#experience").html(data.actinfo.experience);
          $("#infos").html(data.actinfo.infos);

          $("#attentionFlag").val(data.attentionFlag);

          if("true" === $("#attentionFlag").val()){
            console.log("aa")
              $("#follow").html("-取消关注");
              $("#isfollow").prop("checked", true);
          }else{
              $("#follow").html("+关注");
              $("input[id='isfollow']").removeAttr("checked");
          }
      }else{
          // $("#content").html("");
          // dialog.alert({
          //       title:"获取演员信息失败！",
          //       msg:'',
          //       buttons:['确定']
          //   },function(ret){
          //       $("#content").html("");
          //   })
          //   return false;


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

    infoid = 45;
    type = "actor";

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
    infoid = 45;
    type = "actor";
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
