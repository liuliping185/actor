$(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);

    $.post(path + "/ActorInterface/index/queryAll.action",{
        token:localStorage.token,
        sortwords:"new"
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
  var flag = 0;
  $("#sample").html("");

  if(2 < infoList.length){
    infoList.forEach(function(i){
        flag ++;
        if(2 >= flag){
            // if(1 === flag){
            //     imgInfos += "<div style='width:100%; height:100%;'>";
            // }else{
            //     imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
            //     imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
            //     imgInfos +=  "</div>";
            //     // imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
            //     // imgInfos += "<div style='width:100%; height:100%;'>";
            // }
            switch(i.type){
                case "actor":
                    imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'><font style='font-size:18px'>" + i.nickname + "</font>";
                break;
                case "scene":
                    imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'><font style='font-size:18px'>" + i.scenename + "</font>";
                break;
                case "subject":
                    imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'><font style='font-size:18px'>" +  + i.subjectname + "</font>";
                break;
            }
            imgInfos += "</p>"
            imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%;'>";
            imgInfos += "<img src='" + i.imgpath + "' style='width:100%;height:100%;'/>"
            imgInfos +="</span>";

            var d = new Date(i.createtime);
            var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

            imgInfos += "<p style='height:20px; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
            imgInfos += "<span style='margin-left: 22%;'>";
            imgInfos += "<img src='image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
            imgInfos += "<span style='margin-left: 5px;'>0</span>";
            imgInfos += "</span>"
            imgInfos += "<span style='margin-left: 5%;'>";
            imgInfos += "<img src='image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
            imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
            imgInfos += "</span>"
            imgInfos += "<span style='margin-left: 5%;'>";
            imgInfos += "<img src='image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
            imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
            imgInfos += "</span>"
            imgInfos += "</p>"
            imgInfos += "</div>";
            imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
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
        if(1 === flag){
            imgInfos += "<div style='width:100%; height:100%;'>";
        }else{
            imgInfos +=  "<div style='margin-top: 10px; height:3%;'>";
            imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
            imgInfos +=  "</div>";
            // imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
            imgInfos += "<div style='width:100%; height:100%;'>";
        }

        switch(i.type){
            case "actor":
                imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'>" + "<font style='font-size:18px'>" + i.nickname + "</font>";
            break;
            case "scene":
                imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'>" + i.scenename;
            break;
            case "subject":
                imgInfos += "<p style='height:40px; line-height:45px; margin-left:5%;'>" + i.subjectname;
            break;
        }
        imgInfos += "</p>"

        imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%;'>";
        imgInfos += "<img src='" + i.imgpath + "' style='width:100%;height:100%;'/>"
        imgInfos +="</span>";

        var d = new Date(i.createtime);
        var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

        imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
        imgInfos += "<span style='margin-left: 22%;'>";
        imgInfos += "<img src='image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>0</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 5%;'>";
        imgInfos += "<img src='image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 5%;'>";
        imgInfos += "<img src='image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
        imgInfos += "</span>"
        imgInfos += "</p>"
        imgInfos += "</div>";

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
    imgInfos = "";
    switch(ret.index){
      case 1: sortwords = "new"; break;
      case 2: sortwords = "price"; break;
      case 3: sortwords = "attention"; break;
    }
    console.log(sortwords)
    $.post(path + "/ActorInterface/index/queryAll.action",{
        token:localStorage.token,
        sortwords: sortwords
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
