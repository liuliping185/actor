$(function(){
  var header = ""
  header += "<span id='headerBack' onclick='back()'>&nbsp</span>";
  header += "<ul style='width:75%; margin-left:10%;'>";
  header += "<li class='border-b active' >";
  header += "<span>我的</span>";
  header += "</li>";
  header += "<li class='border-b' >发现</li>";
  header += "<li class='border-b' >搜索</li>";
  header += "<li class='border-b' >我的</li>";
  header += "</ul>";

  $("#header").html(header);
})
