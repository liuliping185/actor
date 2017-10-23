var role = GetQueryString("role");


var flag = 0;

$(function(){
    $('body').height($('body')[0].clientHeight);

    // 筛选分类开始
    $(".flip").mouseover(function() {
			$(this).next("div").slideDown(500);
      $("#thirdArea").hide();
		});

		$(".content").mouseleave(function() {
			$(this).children("div").slideUp(500);
      $("#thirdArea").show();
		});
    // 筛选分类结束

    // 获取列表信息
    getList('');

    // 获取全部类型
    getType();

});

// 详情
function detail(role, id){
  console.log(role);
  window.location.href = "actorDetails.html?id=" + id + "&role=" + role;
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

var imgInfos = "";
function doSomething(infoList, imgList){
  console.log(infoList);
  var flag = 0;

  if(infoList.length == 0){

	   $("#sample").html("<h1 align='center'><font color='green'>暂无相关信息！</h1>");

	   return false;
  }

  $("#sample").html("");

  if(2 < infoList.length){
      infoList.forEach(function(i){
          flag ++;

          var unit = "";
          if(i.unit){
              unit = "/" + i.unit;
          }

          if(2 >= flag){

              switch(i.type){
                  case "actor":

                  imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
                  imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
                  imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
                  imgInfos += "</div>";

                  imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                  imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.nickname + "</span>";
                  // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                  imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
                  imgInfos += "</div>";
                  imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
                  imgInfos += " <img src='../image/index/actor.png'/>";
                  imgInfos += "</div>";

                  var d = new Date(i.createtime);
                  var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

                  // if(0 != flag%2){
                  //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
                  // }else{
                  imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
                  // }
                  // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
                  // imgInfos += "<span style='margin-left:15px;'>";
                  imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
                  // imgInfos += "</span>";
                  // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
                  // imgInfos += "</div>";

                  // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
                  // imgInfos += createtime;
                  // imgInfos += "</span>";
                  // imgInfos += "</span>";
                  imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:100%;'>";
                  imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

                  imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

                  imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
                  imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
                  imgInfos += "</span></span>"

                  imgInfos += "</div>";

                  imgInfos += "</div>";


                  imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
                  imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
                  imgInfos +=  "</div>";




                      // // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                      // // imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                      // // imgInfos +=  "</div>";
                      // imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.nickname + "<span style='margin-left:75%;'>" + "￥100" + "</span>";
                      // imgInfos += "</p>"
                      // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                      //
                      // var d = new Date(i.createtime);
                      // var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                      //
                      // imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                      // imgInfos += "<span style='margin-left: 22%;'>";
                      // imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                      // imgInfos += "<span style='margin-left: 5px;'>0</span>";
                      // imgInfos += "</span>"
                      // imgInfos += "<span style='margin-left: 5%;'>";
                      // imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                      // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                      // imgInfos += "</span>"
                      // imgInfos += "<span style='margin-left: 5%;'>";
                      // imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                      // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                      // imgInfos += "</span>"
                      // imgInfos += "</p>"
                      // imgInfos += "</div>";
                      // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                      // imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                      // imgInfos +=  "</div>";
                      // //分割线

                  break;
                  case "scene":

                  imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
                  imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
                  imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
                  imgInfos += "</div>";


                      imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                      imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.scenename + "</span>";
                      // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                      imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
                      imgInfos += "</div>";
                      imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
                      imgInfos += " <img src='../image/index/scene.png'/>";
                      imgInfos += "</div>";


                  var d = new Date(i.createtime);
                  var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





                  // if(0 != flag%2){
                  //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
                  // }else{
                  imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
                  // }
                  // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
                  // imgInfos += "<span style='margin-left:15px;'>";
                  imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
                  // imgInfos += "</span>";
                  // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
                  // imgInfos += "</div>";

                  // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
                  // imgInfos += createtime;
                  // imgInfos += "</span>";
                  // imgInfos += "</span>";
                  imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:100%;'>";
                  imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

                  imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

                  imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
                  imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
                  imgInfos += "</span></span>"

                  imgInfos += "</div>";

                  imgInfos += "</div>";


                  imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
                  imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  imgInfos +=  "</div>";


                  // // if(1 === flag){
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }else{
                  // //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  // //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  // //     imgInfos +=  "</div>";
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }
                  //     imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.scenename +  "<span style='margin-left:75%;'>" + "￥100" + "</span>";
                  //     imgInfos += "</p>"
                  //     imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                  //
                  //     var d = new Date(i.createtime);
                  //     var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  //
                  //     imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                  //     imgInfos += "<span style='margin-left: 22%;'>";
                  //     imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>0</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "<span style='margin-left: 5%;'>";
                  //     imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "<span style='margin-left: 5%;'>";
                  //     imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "</p>"
                  //     imgInfos += "</div>";
                  //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  //     imgInfos +=  "</div>";
                  break;
                  case "subject":

                  var price = "";
                  var unit = "";
                  if(i.saleprice){
                    price = i.saleprice;
                    unit = "/" + i.saleunit
                  }else{
                    if(i.rentprice){
                      price = i.rentprice;
                      unit = "/" + i.rentunit
                    }
                  }

                  // i.saleprice ? price = i.saleprice :
                  //     i.rentprice ? price = i.rentprice : price = "";
                  imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
                  imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
                  imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
                  imgInfos += "</div>";

                  imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                  imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.subjectname + "</span>";
                  // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                  imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + price + "元" + unit + "</div>";
                  imgInfos += "</div>";
                  imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
                  imgInfos += " <img src='../image/index/subject.png'/>";
                  imgInfos += "</div>"

                  var d = new Date(i.createtime);
                  var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





                  // if(0 != flag%2){
                  //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
                  // }else{
                  imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
                  // }
                  // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
                  // imgInfos += "<span style='margin-left:15px;'>";
                  imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
                  // imgInfos += "</span>";
                  // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
                  // imgInfos += "</div>";

                  // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
                  // imgInfos += createtime;
                  // imgInfos += "</span>";
                  // imgInfos += "</span>";
                  imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
                  imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

                  imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

                  imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
                  imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
                  imgInfos += "</span>"
                  imgInfos += "<span style='margin-left: 8%;'>";
                  imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                  imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
                  imgInfos += "</span></span>"

                  imgInfos += "</div>";

                  imgInfos += "</div>";


                  imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
                  imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
                  imgInfos +=  "</div>";


                  // // if(1 === flag){
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }else{
                  // //     imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }
                  //     imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.subjectname+  "<span style='margin-left:75%;'>" + "￥100" + "</span>";
                  //     imgInfos += "</p>"
                  //     imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                  //
                  //     var d = new Date(i.createtime);
                  //     var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  //
                  //     imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                  //     imgInfos += "<span style='margin-left: 22%;'>";
                  //     imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>0</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "<span style='margin-left: 5%;'>";
                  //     imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "<span style='margin-left: 5%;'>";
                  //     imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  //     imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                  //     imgInfos += "</span>"
                  //     imgInfos += "</p>"
                  //     imgInfos += "</div>";
                  //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  //     imgInfos +=  "</div>";
                  break;
              }
              if(2 === flag){
                  $('#sample').html(imgInfos);
                  infoList.splice(0,2);
                  imgList.splice(0,2);
                  checkScroll(infoList, imgList);//继续循环
              }
          }
      })
  }else{
    var unit = "";

      infoList.forEach(function(i){
        if(i.unit){
            unit = "/" + i.unit;
        }
          flag ++;
          switch(i.type){
              case "actor":


              imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
              imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
              imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
              imgInfos += "</div>";

              imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
              imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.nickname + "</span>";
              // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
              imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
              imgInfos += "</div>";
              imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
              imgInfos += " <img src='../image/index/actor.png'/>";
              imgInfos += "</div>";

              var d = new Date(i.createtime);
              var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

              // if(0 != flag%2){
              //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
              // }else{
              imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
              // }
              // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
              // imgInfos += "<span style='margin-left:15px;'>";
              imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
              // imgInfos += "</span>";
              // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
              // imgInfos += "</div>";

              // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
              // imgInfos += createtime;
              // imgInfos += "</span>";
              // imgInfos += "</span>";
              imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
              imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

              imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

              imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
              imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
              imgInfos += "</span></span>"

              imgInfos += "</div>";

              imgInfos += "</div>";


              imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
              imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
              imgInfos +=  "</div>";




                  // // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  // // imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  // // imgInfos +=  "</div>";
                  // imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.nickname + "<span style='margin-left:75%;'>" + "￥100" + "</span>";
                  // imgInfos += "</p>"
                  // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                  //
                  // var d = new Date(i.createtime);
                  // var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  //
                  // imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                  // imgInfos += "<span style='margin-left: 22%;'>";
                  // imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>0</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "<span style='margin-left: 5%;'>";
                  // imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "<span style='margin-left: 5%;'>";
                  // imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "</p>"
                  // imgInfos += "</div>";
                  // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  // imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  // imgInfos +=  "</div>";
                  // //分割线



                  // // if(1 === flag){
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }else{
                  // //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  // //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  // //     imgInfos +=  "</div>";
                  // //     // imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>";
                  // //     imgInfos += "<div style='width:100%; height:100%;'>";
                  // // }
                  // imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.nickname + "<span style='margin-left:60%;'>" + "￥" + i.price + "/" + i.unit +"</span>";
                  // imgInfos += "</p>"
                  // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                  //
                  // var d = new Date(i.createtime);
                  // var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  //
                  // imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                  // imgInfos += "<span style='margin-left: 22%;'>";
                  // imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>0</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "<span style='margin-left: 5%;'>";
                  // imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "<span style='margin-left: 5%;'>";
                  // imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                  // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                  // imgInfos += "</span>"
                  // imgInfos += "</p>"
                  // imgInfos += "</div>";
                  // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                  // imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                  // imgInfos +=  "</div>";
              break;
              case "scene":

                                imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
                                imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
                                imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
                                imgInfos += "</div>";


                                    imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                                    imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.scenename + "</span>";
                                    // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                                    imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
                                    imgInfos += "</div>";
                                    imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
                                    imgInfos += " <img src='../image/index/scene.png'/>";
                                    imgInfos += "</div>";


                                var d = new Date(i.createtime);
                                var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





                                // if(0 != flag%2){
                                //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
                                // }else{
                                imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
                                // }
                                // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
                                // imgInfos += "<span style='margin-left:15px;'>";
                                imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
                                // imgInfos += "</span>";
                                // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
                                // imgInfos += "</div>";

                                // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
                                // imgInfos += createtime;
                                // imgInfos += "</span>";
                                // imgInfos += "</span>";
                                imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
                                imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

                                imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

                                imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
                                imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                                imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
                                imgInfos += "</span>"
                                imgInfos += "<span style='margin-left: 8%;'>";
                                imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                                imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
                                imgInfos += "</span>"
                                imgInfos += "<span style='margin-left: 8%;'>";
                                imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                                imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
                                imgInfos += "</span></span>"

                                imgInfos += "</div>";

                                imgInfos += "</div>";


                                imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
                                imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                                imgInfos +=  "</div>";


                                // // if(1 === flag){
                                // //     imgInfos += "<div style='width:100%; height:100%;'>";
                                // // }else{
                                // //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                                // //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                                // //     imgInfos +=  "</div>";
                                // //     imgInfos += "<div style='width:100%; height:100%;'>";
                                // // }
                                //     imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.scenename +  "<span style='margin-left:75%;'>" + "￥100" + "</span>";
                                //     imgInfos += "</p>"
                                //     imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
                                //
                                //     var d = new Date(i.createtime);
                                //     var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                                //
                                //     imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                                //     imgInfos += "<span style='margin-left: 22%;'>";
                                //     imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                                //     imgInfos += "<span style='margin-left: 5px;'>0</span>";
                                //     imgInfos += "</span>"
                                //     imgInfos += "<span style='margin-left: 5%;'>";
                                //     imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                                //     imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                                //     imgInfos += "</span>"
                                //     imgInfos += "<span style='margin-left: 5%;'>";
                                //     imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
                                //     imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                                //     imgInfos += "</span>"
                                //     imgInfos += "</p>"
                                //     imgInfos += "</div>";
                                //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
                                //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                                //     imgInfos +=  "</div>";
              break;
              case "subject":
              var price = "";
              var unit = "";
              if(i.saleprice){
                price = i.saleprice;
                unit = "/" + i.saleunit
              }else{
                if(i.rentprice){
                  price = i.rentprice;
                  unit = "/" + i.rentunit
                }
              }

              // i.saleprice ? price = i.saleprice :
              //     i.rentprice ? price = i.rentprice : price = "";
              imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
              imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
              imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
              imgInfos += "</div>";

              imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
              imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.subjectname + "</span>";
              // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
              imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + price + "元" + unit + "</div>";
              imgInfos += "</div>";
              imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
              imgInfos += " <img src='../image/index/subject.png'/>";
              imgInfos += "</div>"

              var d = new Date(i.createtime);
              var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





              // if(0 != flag%2){
              //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
              // }else{
              imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
              // }
              // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
              // imgInfos += "<span style='margin-left:15px;'>";
              imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
              // imgInfos += "</span>";
              // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
              // imgInfos += "</div>";

              // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
              // imgInfos += createtime;
              // imgInfos += "</span>";
              // imgInfos += "</span>";
              imgInfos += "<img src='../image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
              imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

              imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

              imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
              imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
              imgInfos += "</span></span>"

              imgInfos += "</div>";

              imgInfos += "</div>";


              imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
              imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
              imgInfos +=  "</div>";


              // // if(1 === flag){
              // //     imgInfos += "<div style='width:100%; height:100%;'>";
              // // }else{
              // //     imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
              // //     imgInfos += "<div style='width:100%; height:100%;'>";
              // // }
              //     imgInfos += "<p style='height:10%; line-height:35px; margin-left:5%;'>" + i.subjectname+  "<span style='margin-left:75%;'>" + "￥100" + "</span>";
              //     imgInfos += "</p>"
              //     imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:80%; background-image: url(" + imgList[flag-1] + "); background-size:100%;'></span>";
              //
              //     var d = new Date(i.createtime);
              //     var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
              //
              //     imgInfos += "<p style='height:10%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
              //     imgInfos += "<span style='margin-left: 22%;'>";
              //     imgInfos += "<img src='../image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
              //     imgInfos += "<span style='margin-left: 5px;'>0</span>";
              //     imgInfos += "</span>"
              //     imgInfos += "<span style='margin-left: 5%;'>";
              //     imgInfos += "<img src='../image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
              //     imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
              //     imgInfos += "</span>"
              //     imgInfos += "<span style='margin-left: 5%;'>";
              //     imgInfos += "<img src='../image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
              //     imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
              //     imgInfos += "</span>"
              //     imgInfos += "</p>"
              //     imgInfos += "</div>";
              //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
              //     imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
              //     imgInfos +=  "</div>";
              break;
          }
          $('#sample').html(imgInfos);
      })
  }
}

function checkScroll(infoList, imgList){
    if(!lowEnough()) return pollScroll(infoList, imgList);

    $('#spinner').show();
    doSomething(infoList, imgList);

}
function pollScroll(infoList, imgList){
    checkScroll(infoList, imgList);
}
/** 无限分页结束 **/

// 搜索框开始
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");

if(searchBar){
    searchBarInput.onclick = function(){
        searchBarBtn.style.marginRight = 0;
    }
    // searchBarInput.oninput = function(){
    //     if(this.value.length){
    //         searchBarClearBtn.style.display = 'block';
    //         searchBarBtn.classList.add("aui-text-info");
    //         searchBarBtn.textContent = "搜索";
    //     }else{
    //         searchBarClearBtn.style.display = 'none';
    //         searchBarBtn.classList.remove("aui-text-info");
    //         searchBarBtn.textContent = "取消";
    //     }
    // }
}

if(searchBarBtn){
    searchBarClearBtn.onclick = function(){
        this.style.display = 'none';
        searchBarInput.value = '';
        searchBarBtn.classList.remove("aui-text-info");
        searchBarBtn.textContent = "取消";
    }
    searchBarBtn.onclick = function(){
        var keywords = searchBarInput.value;
        if(keywords.length){
            searchBarInput.blur();
            document.getElementById("search-input").textContent = keywords;
            console.log(keywords);
            // $(".content").hide();
            $(".content").children("div").slideUp(500);
            $(".sample").show();
            $("#thirdArea").show();
            getList(keywords);
        }else{
            this.style.marginRight = "-"+this.offsetWidth+"px";
            searchBarInput.value = '';
            searchBarInput.blur();
        }
    }
}
// 搜索框结束

// 获取列表信息
function getList(keywords){
    $("#thirdArea").show();
    var provience = $("#provience").val();
    var searchInput = $("#search-input").val();
    if(!searchInput){
        searchInput = provience;
    }

    var actionUrl = "";
    switch(role){
        case "actor": actionUrl = path + "/ActorInterface/actor/queryActors.action";
        break;
        case "scene": actionUrl = path + "/ActorInterface/scene/queryScenes.action";
        break;
        case "subject": actionUrl = path + "/ActorInterface/subject/querySubjects.action";
        break;
    }
	var smallid = "";

	$('input[name="smallCheck"]:checked').each(function(){
		smallid += $(this).val() + ",";
	});

	var bigid = "";

	$('input[name="bigCheck"]:checked').each(function(){
		bigid += $(this).val() + ",";
	});

    $.post(actionUrl,{
        token: localStorage.token,
        keywords: searchInput,
        smallid: smallid,
		    bigid:bigid
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            imgInfos = "";
            $(".content").children("div").slideUp(500);
            pollScroll(data.infoList, data.imgList);

            // $("#imgInfos").html(imgInfos);
            //     htmlStr += "<img onclick=detail('" + role + "','" + data.infoList[flag].id + "') style='width:100%; height:32%; margin-top:2%;' src='" + i + "'/>";
            // })
            // $('#sample').html(imgInfos);
        }else{
            dialog.alert({
                  title:"获取演员信息失败！",
                  msg:'',
                  buttons:['确定']
              },function(ret){
                  $("#content").html("");
              })
              return false;
        }
    });
}

//下拉列表出现
function appear(){
    $(".appear").children().show();
}

// 获取大类
function getType(){
    console.log(role)
    $.post(path + "/ActorInterface/index/findBigType.action",{
      typeinfo: role
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        var screen = "";
        if (data.success) {
            screen += "<ul>";

            data.infoList.forEach(function(i){
                screen += "<li>";
                screen += "<div><input type='checkbox' name='bigCheck' value='"+i.id+"' onclick='smallType(" + i.id + ")' id='big_"+i.id+"'/>"
                screen += "<label for='big_"+i.id+"'>" + i.bigname + "</label></div>";
                screen += "</li>";

                $("#bigid").val(i.id);
            })

            screen += "</ul>";

            $(".screen").html(screen);
        }
    });
}

// 获取小类
var flag = 0;
function smallType(id){

  var smallname = "";

  if($("#big_"+id).prop("checked")){

	   $.post(path + "/ActorInterface/index/findSmallType.action",{
        bigid: id
        }, function(data) {
          var data = JSON.parse(data);
          console.log(data);
          if (data.success) {
              var bigid = $("#bigid").val();

              data.infoList.forEach(function(i){
                  smallname += "<li class='small_"+id+"'>";
                  smallname += "<div><input type='checkbox' name='smallCheck' value='"+i.id+"' id='small__"+i.id+"'/>";
                  smallname += "<label for='small__"+i.id+"'>" + i.smallname + "</label></div>";
                  smallname += "</li>";

              });

              $(".smallType").append(smallname);
          }
      });


  }else {


	 $("li.small_"+id).remove();

  }



  // }
}
