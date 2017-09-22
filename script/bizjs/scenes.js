$(function(){
    $('body').height($('body')[0].clientHeight);
    thirdInitialization();
});

// 详情
function detail(){
  window.location.href = "actorDetails.html?actId=45";
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
