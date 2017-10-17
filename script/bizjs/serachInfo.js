var keywords = GetQueryString("keywords");
var role = GetQueryString("role");

$(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
    console.log(keywords)
    $.post(path + "/ActorInterface/index/queryAll.action",{
        token: localStorage.token,
        sortwords: "new",
        keywords: keywords,
        type: role
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            pollScroll(data.infoList);
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
});


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
function doSomething(infoList){
  // console.log(infoList);
  var flag = 0;
  $("#sample").html("");


  if(infoList.length == 0){
	      imgInfos += "<h1 align='center' style='margin-top:10px;'><font color='green'>暂无相关数据！</font></h1>"
				$("#imgInfos").html(imgInfos);
				return;
  }

  if(2 < infoList.length){
    infoList.forEach(function(i){
        flag ++;
        if(2 >= flag){
          // if(1 === flag){
          //     imgInfos += "<div style='width:100%; height:100%;'>";
          // }else{
          //     imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
          //     imgInfos += "<div style='width:100%; height:100%;'>";
          // }

          // switch(i.type){
          //     case "actor":
          //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'><font style='font-size:18px'>" + i.nickname +"</font>";
          //     break;
          //     case "scene":
          //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'>" + i.scenename;
          //     break;
          //     case "subject":
          //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'>" + i.subjectname;
          //     break;
          // }
          // imgInfos += "</p>"
          // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%;'>";
          // imgInfos += "<img src='" + i.imgpath + "' style='width:100%;height:100%;'/>";
          // imgInfos += "</span>";
          // imgInfos += "<p style='height:30px; line-height:30px; margin-left:5%;'>" + i.createtime;
          // imgInfos += "<span style='margin-left: 22%;'>";
          // imgInfos += "<img src='image/note.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
          // imgInfos += "<span style='margin-left: 5px;'>0</span>";
          // imgInfos += "</span>"
          // imgInfos += "<span style='margin-left: 5%;'>";
          // imgInfos += "<img src='image/laud.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
          // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
          // imgInfos += "</span>"
          // imgInfos += "<span style='margin-left: 5%;'>";
          // imgInfos += "<img src='image/start.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
          // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
          // imgInfos += "</span>"
          // imgInfos += "</p>"
          // imgInfos += "</div>";
          // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
          // imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
          // imgInfos +=  "</div>";



          imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
          imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
          imgInfos += "<img src='" + i.imgpath + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
          imgInfos += "</div>";

          switch(i.type){
              case "actor":
              imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
              imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.nickname + "</span>";
              // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
              imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "</div>";
              imgInfos += "</div>";
              imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
              imgInfos += " <img src='image/index/actor.png'/>";
              imgInfos += "</div>";
              break;
              case "scene":
              imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
              imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.scenename + "</span>";
              // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
              imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "</div>";
              imgInfos += "</div>";
              imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
              imgInfos += " <img src='image/index/scene.png'/>";
              imgInfos += "</div>";
              break;
              case "subject":
                  var price = "";
                  i.saleprice ? price = i.saleprice :
                      i.rentprice ? price = i.rentprice : "";
                  imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                  imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.subjectname + "</span>";
                  // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                  imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + price + "</div>";
                  imgInfos += "</div>";
                  imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
                  imgInfos += " <img src='image/index/subject.png'/>";
                  imgInfos += "</div>"






                  // rolename = "道具";
                  // nickname = i.subjectname;
                  // roleimg = "image/index/subject.png";
              break;
          }

          var d = new Date(i.createtime);
          var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





          // if(0 != flag%2){
          //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
          // }else{
          imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
          // }
          // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
          // imgInfos += "<span style='margin-left:15px;'>";
          imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0''/>";
          // imgInfos += "</span>";
          // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
          // imgInfos += "</div>";

          // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
          // imgInfos += createtime;
          // imgInfos += "</span>";
          // imgInfos += "</span>";
          imgInfos += "<img src='./image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
          imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

          imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

          imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
          imgInfos += "<img src='image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
          imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
          imgInfos += "</span>"
          imgInfos += "<span style='margin-left: 8%;'>";
          imgInfos += "<img src='image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
          imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
          imgInfos += "</span>"
          imgInfos += "<span style='margin-left: 8%;'>";
          imgInfos += "<img src='image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
          imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
          imgInfos += "</span></span>"

          imgInfos += "</div>";

          imgInfos += "</div>";


          imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
          imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
          imgInfos +=  "</div>";


        }

        if(2 === flag){
            $("#imgInfos").html(imgInfos);
            infoList.splice(0,2);
            checkScroll(infoList);//继续循环
        }
    })

  }else{
    infoList.forEach(function(i){
        flag ++;
        // if(1 === flag){
        //     imgInfos += "<div style='width:100%; height:100%;'>";
        // }else{
        //     imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
        //     imgInfos += "<div style='width:100%; height:100%;'>";
        // }

        // switch(i.type){
        //     case "actor":
        //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'><font style='font-size:18px'>" + i.nickname + "</font>";
        //     break;
        //     case "scene":
        //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'>" + i.scenename;
        //     break;
        //     case "subject":
        //         imgInfos += "<p style='height:45px; line-height:45px; margin-left:5%;'>" + i.subjectname;
        //     break;
        // }
        // imgInfos += "</p>"
        //
        // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%;'>";
        // imgInfos += "<img src='" + i.imgpath + "' style='width:100%;height:100%;'/>";
        // imgInfos += "</span>";
        //
        // imgInfos += "<p style='height:30px; line-height:30px; margin-left:5%;'>" + i.createtime;
        // imgInfos += "<span style='margin-left: 22%;'>";
        // imgInfos += "<img src='image/note.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
        // imgInfos += "<span style='margin-left: 5px;'>0</span>";
        // imgInfos += "</span>"
        // imgInfos += "<span style='margin-left: 5%;'>";
        // imgInfos += "<img src='image/laud.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
        // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
        // imgInfos += "</span>"
        // imgInfos += "<span style='margin-left: 5%;'>";
        // imgInfos += "<img src='image/start.png' style='margin-top:8px;float:left;' width='15px' height='15px'/>"
        // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
        // imgInfos += "</span>"
        // imgInfos += "</p>"
        // imgInfos += "</div>";
        // imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
        // imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
        // imgInfos +=  "</div>";




        imgInfos += "<div style='width:100%; height:60px;background-size:100%;''>";
        imgInfos += "<div style='float:left;width:60px;height:60px; margin-left:18px; margin-top:10px;'>";
        imgInfos += "<img src='" + i.imgpath + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
        imgInfos += "</div>";

        switch(i.type){
            case "actor":
            imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
            imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.nickname + "</span>";
            // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
            imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "</div>";
            imgInfos += "</div>";
            imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
            imgInfos += " <img src='image/index/actor.png'/>";
            imgInfos += "</div>";
            break;
            case "scene":
            imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
            imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.scenename + "</span>";
            // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
            imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "</div>";
            imgInfos += "</div>";
            imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
            imgInfos += " <img src='image/index/scene.png'/>";
            imgInfos += "</div>";
            break;
            case "subject":
                var price = "";
                i.saleprice ? price = i.saleprice :
                    i.rentprice ? price = i.rentprice : "";
                imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:1rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.subjectname + "</span>";
                // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>" + price + "</div>";
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:50px;  margin-top:8%;'>";
                imgInfos += " <img src='image/index/subject.png'/>";
                imgInfos += "</div>"






                // rolename = "道具";
                // nickname = i.subjectname;
                // roleimg = "image/index/subject.png";
            break;
        }

        var d = new Date(i.createtime);
        var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();





        // if(0 != flag%2){
        //     imgInfos += "<div style='margin-left:15px;margin-top:5px;float:left; display: block; width:92%; height:100%; border:1px solid #E0E0E0'>";
        // }else{
        imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
        // }
        // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
        // imgInfos += "<span style='margin-left:15px;'>";
        imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0''/>";
        // imgInfos += "</span>";
        // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
        // imgInfos += "</div>";

        // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
        // imgInfos += createtime;
        // imgInfos += "</span>";
        // imgInfos += "</span>";
        imgInfos += "<img src='./image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:99%;'>";
        imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

        imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

        imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
        imgInfos += "<img src='image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 8%;'>";
        imgInfos += "<img src='image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 8%;'>";
        imgInfos += "<img src='image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
        imgInfos += "</span></span>"

        imgInfos += "</div>";

        imgInfos += "</div>";


        imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
        imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
        imgInfos +=  "</div>";


    })

    $("#imgInfos").html(imgInfos);
  }
}

function checkScroll(infoList){
    if(!lowEnough()) return pollScroll(infoList);

    $('#spinner').show();
    doSomething(infoList);

}
function pollScroll(infoList){
    checkScroll(infoList);
}
/** 无限分页结束 **/

// 找场景
function scenes( thisHtml, role){
    console.log(role);
    window.location.href = "./scenes/scenes.html?role=" + role;
}

// 详情
function detail(role, id){
    console.log(role);
    window.location.href = "scenes/actorDetails.html?id=" + id + "&role=" + role;
}

// 公告
function announce(){
    window.location.href = "mine/announcements/announceManage.html";
}

var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
  console.log(ret);
  var sortwords = "";
  switch(ret.index){
    case 1: sortwords = "new"; break;
    case 2: sortwords = "price"; break;
    case 3: sortwords = "attention"; break;
  }
  // console.log(keywords + "----" + sortwords)
  $.post(path + "/ActorInterface/index/queryAll.action",{
      token: localStorage.token,
      sortwords: sortwords,
      keywords: keywords,
      type: role
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          imgInfos = "";
          pollScroll(data.infoList);
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
});
