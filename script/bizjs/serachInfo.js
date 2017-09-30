$(document).ready(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
    var keywords = GetQueryString("keywords");

    $.post(path + "/ActorInterface/index/queryAll.action",{
        token: localStorage.token,
        keywords: keywords
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var imgInfos = "";
            var flag = 0;

            data.infoList.forEach(function(i){
                flag ++;
                if(1 === flag){
                    imgInfos += "<div style='width:100%; height:100%;'>";
                }else{
                    imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
                    imgInfos += "<div style='width:100%; height:100%;'>";
                }

                switch(i.type){
                    case "actor":
                        imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.nickname;
                    break;
                    case "scene":
                        imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.scenename;
                    break;
                    case "subject":
                        imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.subjectname;
                    break;
                }
                imgInfos += "</p>"
                imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%; background-image: url(" + i.imgpath + "); background-size:100%;'></span>";
                imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + i.createtime;
                imgInfos += "<span class='aui-iconfont aui-icon-note' style='margin-left: 22%;'>";
                imgInfos += "<span style='margin-left: 5px;'>0</span>";
                imgInfos += "</span>"
                imgInfos += "<span class='aui-iconfont aui-icon-laud' style='margin-left: 5%;'>";
                imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                imgInfos += "</span>"
                imgInfos += "<span class='aui-iconfont aui-icon-star' style='margin-left: 5%;'>";
                imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                imgInfos += "</span>"
                imgInfos += "</p>"
                imgInfos += "</div>";

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
});

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
  console.log(sortwords)
  $.post(path + "/ActorInterface/index/queryAll.action",{
      token: localStorage.token,
      keywords: keywords,
      sortwords: sortwords
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          var imgInfos = "";
          var flag = 0;

          data.infoList.forEach(function(i){
              flag ++;
              if(1 === flag){
                  imgInfos += "<div style='width:100%; height:100%;'>";
              }else{
                  imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
                  imgInfos += "<div style='width:100%; height:100%;'>";
              }

              switch(i.type){
                  case "actor":
                      imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.nickname;
                  break;
                  case "scene":
                      imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.scenename;
                  break;
                  case "subject":
                      imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.subjectname;
                  break;
              }
              imgInfos += "</p>"
              imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%; background-image: url(" + i.imgpath + "); background-size:100%;'></span>";
              imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + "发布时间: " + i.createtime;
              imgInfos += "<span class='aui-iconfont aui-icon-note' style='margin-left: 22%;'>";
              imgInfos += "<span style='margin-left: 5px;'>0</span>";
              imgInfos += "</span>"
              imgInfos += "<span class='aui-iconfont aui-icon-laud' style='margin-left: 5%;'>";
              imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "<span class='aui-iconfont aui-icon-star' style='margin-left: 5%;'>";
              imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
              imgInfos += "</span>"
              imgInfos += "</p>"
              imgInfos += "</div>";

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
});
