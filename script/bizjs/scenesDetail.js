$(document).ready(function(){
  $('body').height($('body')[0].clientHeight);
  thirdInitialization();
});
apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    // funIniGroup();
    thirdInitialization();

    // 界面文字
    var header = $api.byId('header');
    var year = $api.byId('year');
    year.innerHTML = new Date().getFullYear();
}

// 随意切换按钮
function randomSwitchBtn( tag ) {
    if( tag == $api.dom('#footer li.active') )return;
    var eFootLis = $api.domAll('#footer li'),
        eHeaderLis = $api.domAll('header li'),
        index = 0;
    for (var i = 0,len = eFootLis.length; i < len; i++) {
        if( tag == eFootLis[i] ){
            index = i;
        }else{
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls( eFootLis[index], 'active');
    $api.addCls( eHeaderLis[index], 'active');
    api.setFrameGroupIndex({
        name: 'group',
        index: index
    });
}
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
function lowEnough(){
    //真实内容的高度
    var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
    //视窗的高度
    var viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
    //隐藏的高度
    var scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
    // console.log(pageHeight);
    // console.log(viewportHeight);
    // console.log(scrollHeight);
    return pageHeight - viewportHeight - scrollHeight < 20;
}
var flag = 0;
function doSomething(){
    var htmlStr = "";
    if(6 > flag){
      for(var i=0; i<3; i++){
          htmlStr += "<div onclick='detail()' style='width:100%; height:32%; margin-top:2%; background-color:#00ffff; background-image: url(../image/index/timg.jpg); background-size:100%;'></div>";
          flag ++;
      }
    }
    $('#sample').append(htmlStr);
    pollScroll();//继续循环
    $('#spinner').hide();
}
function checkScroll(){
    if(!lowEnough()) return pollScroll();
    $('#spinner').show();
    setTimeout(doSomething,900);
}
function pollScroll(){
    setTimeout(checkScroll,1000);
}
checkScroll();
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
