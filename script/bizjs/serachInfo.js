var keywords = GetQueryString("keywords");
var role = GetQueryString("role");

$(function(){
    console.log(localStorage.token);
    getinfos("new");
});

// 找场景
function scenes( thisHtml, role){
    console.log(role);
    window.location.href = "./scenes/scenes.html?role=" + role;
}

// 公告
function announce(){
    window.location.href = "mine/announcements/announceManage.html";
}

var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
  console.log(ret);
  getinfos(ret.index);
});

function getinfos(index){
    var sortwords = "";
    switch(index){
      case 1: sortwords = "new"; break;
      case 2: sortwords = "price"; break;
      case 3: sortwords = "attention"; break;
    }

    // console.log(keywords + "----" + sortwords + "----" + role);
    $.post(path + "/ActorInterface/index/queryAll.action",{
        token: localStorage.token,
        sortwords: sortwords,
        keywords: keywords,
        type: role
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
          var imgInfos = "";
          data.infoList.forEach(function(i){
              imgInfos += "<div style='background-size:100%;padding-bottom:26px;'>";

              var d = new Date(i.publictime);
              var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
              imgInfos += "<div style='width:93%;margin-top:10px;float:left;'>";
              imgInfos += "<img onclick=roleDetails('" + i.infotype + "','" + i.infoid + "') src='" + i.infoimg + "' style='left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);position:relative;text-align:center;border-radius:7px;margin-left:12px;border:1px solid #E0E0E0;'/>";
              imgInfos += "<img src='./image/index/transparent.png' style='position:relative;border-radius:7px;margin-left:3.5%;margin-top:-25%;width:100%;'>";
              imgInfos += "<div style='position:relative;width:100%;margin-top:-27px;text-align:center;'>"
              imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.7rem;'> " + createtime + "</span>";
              imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
              imgInfos += "<img src='image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.7rem;'>" + i.evaSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.7rem;'>" + i.goodSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "<span style='margin-left: 8%;'>";
              imgInfos += "<img src='image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
              imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.7rem;'>" + i.attentionSum + "</span>";
              imgInfos += "</span></span>"
              imgInfos += "</div>";

              var rolename = "";
              var nickname = "";
              var sex = "";
              var age = "";
              var roleimg = ""
              var unit = "";
              if(i.unit){
                  unit = "/" + i.unit;
              }

              imgInfos += "<div style='float:left;width:15%; margin-top:3%;padding-left:12px;'>";
              switch(i.infotype){
                  case "actor":
                      imgInfos += " <img src='image/index/actor.png'/>";
                      break;
                  case "scene":
                      imgInfos += " <img src='image/index/scene.png'/>";
                      break;
                  case "subject":
                      imgInfos += " <img src='image/index/subject.png'/>";
                      break;
              }
              imgInfos += "</div>";
              imgInfos += "<div style='float:left;width:40%;margin-top:2.7%;'>";
              imgInfos += "<span style='padding-left:15px;width:100%;height:23px;font-family: 苹方;font-size:0.7rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;''>" + i.infoname + "</span>";

              imgInfos += "</div>";

              imgInfos += "<div style='text-align:right;float:left;width:45%;margin-top:2%;'>";
              if(i.price ){
                    imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.7rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
              }
              imgInfos += "</div>";

              imgInfos += "</div>";
              imgInfos +=  "<br/><div style='margin-top: 5px; height:3%;'>";
              imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
              imgInfos +=  "</div>";
          })

            $("#imgInfos").html(imgInfos);
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
}

// 角色详情
function roleDetails(role,id){
    window.location.href = "scenes/roleDetails.html?id=" + id + "&role=" + role;
}
