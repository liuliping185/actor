$(function(){
  var footer = "";
  footer += "<ul class='flex-wrap' >";
  footer += "<li tapmode='hover' onclick=randomSwitchBtn( this, '../../index.html' ); class='flex-con' >协拍中国</li>";
  footer += "<li tapmode='hover' onclick=randomSwitchBtn( this, '../../find.html' ); class='flex-con' >发现</li>";
  footer += "<li tapmode='hover' onclick=randomSwitchBtn( this, '../../serach.html' ); class='flex-con' >搜索</li>";
  footer += "<li tapmode='hover' onclick=randomSwitchBtn( this, '../../mine/info.html' ); class='flex-con active' >我的</li>";
  footer += "</ul>";
  $("#footer").html(footer);
})
