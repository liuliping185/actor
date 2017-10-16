var imgInfos = "";
$(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
    console.log(document.body.offsetWidth);

    getAnn();

    // checkScroll();

    $.post(path + "/ActorInterface/index/queryAll.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            // var imgInfos = "";
            getInfoList(data.infoList);

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

// 分4张加载底部图片
function getInfoList(infoList){
    // console.log(infoList);
    var flag = 0;
    infoList.forEach(function(i){
        flag ++;

        imgInfos += "<div style='width:100%; height:50px;background-size:100%;'>";
        imgInfos += "<div style='float:left;width:50px; height:50px; margin-left:18px; margin-top:10px;'>";
        imgInfos += "<img src='" + i.firstimg + "' onclick=javascript:window.location.href='../mine/headerImg.html' style='width:100%; height:100%; border-radius:50%' id='img'/>";
        imgInfos += "</div>";
        //
        // var rolename = "";
        // var nickname = "";
        // var sex = "";
        // var age = "";
        // var roleimg = ""

        switch(i.type){
            case "actor":
                imgInfos += "<div style='float:left;width:59%;margin-left:15px;margin-top:15px;'>";
                imgInfos += "<span style='height:20px;font-family: 苹方;font-size:15px;color:#505050'>" + i.nickname + "</span>";
                imgInfos += "<span style='margin-left:10px;height:20px;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.age + "岁</div>";
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:50px; margin-left:18px; margin-top:30px;'>";
                imgInfos += " <img src='image/index/actor.png'/>";
                imgInfos += "</div>";
                imgInfos += "</div>";
            break;
            case "scene":
                imgInfos += "<div style='float:left;width:59%;margin-left:15px;margin-top:15px;'>";
                imgInfos += "<span style='height:20px;font-family: 苹方;font-size:15px;color:#505050'>" + i.scenename + "</span>";
                // imgInfos += "<span style='margin-left:10px;height:20px;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:12px;color:#9d9d9d'>￥" + i.price + "</div>";
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:50px; margin-left:18px; margin-top:30px;'>";
                imgInfos += " <img src='image/index/scene.png'/>";
                imgInfos += "</div>";
                imgInfos += "</div>";
                // rolename = "场景";
                // nickname = i.scenename;
                // roleimg = "image/index/scene.png";
            break;
            case "subject":
                imgInfos += "<div style='float:left;width:59%;margin-left:15px;margin-top:15px;'>";
                imgInfos += "<span style='height:20px;font-family: 苹方;font-size:15px;color:#505050'>" + i.subjectname + "</span>";
                // imgInfos += "<span style='margin-left:10px;height:20px;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:12px;color:#9d9d9d'>￥" + i.slaeprice + "</div>";
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:50px; margin-left:18px; margin-top:30px;'>";
                imgInfos += " <img src='image/index/subject.png'/>";
                imgInfos += "</div>";
                imgInfos += "</div>";
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
        imgInfos += "<div style='margin-left:0px;margin-top:10px;float:left; display: block;'>";
        // }
        imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
        imgInfos += "<img src='" + i.firstimg + "' style='z-index:-1;border:1px solid #E0E0E0''/>";
        imgInfos += "<h6 style='height:8%;margin-left:5%;'>" + "<span style='font-size:13px;color:#9d9d9d;'>发布时间&nbsp:&nbsp&nbsp" + createtime + "</span>";
        imgInfos += "</h6>"
        // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
        // imgInfos += "</div>";

        // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
        // imgInfos += createtime;
        // imgInfos += "</span>";
        imgInfos += "</span>";



        // imgInfos += "<h4 style='height:7%; margin-left:5%;'>" + "<span s÷tyle='width:70%;'>" + nickname + "</span>" + "<span style='width:18%;font-size:13px;color:#9d9d9d;'>" + rolename + "</span>" + "</h4>";

        // imgInfos += "<h6 style='height:8%; margin-top:3%; margin-left:5%;'>" + "<span style='font-size:13px;color:#9d9d9d;'>发布时间&nbsp:&nbsp&nbsp" + createtime + "</span>";
        // imgInfos += "</h6>"
        imgInfos += "<div style='margin-left:0%;'><span style='margin-left: 5%;'>";
        imgInfos += "<img src='image/note.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>0</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 13%;'>";
        imgInfos += "<img src='image/laud.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 13%;'>";
        imgInfos += "<img src='image/start.png' style='margin-top:5px;float:left;' width='15px' height='15px'/>"
        imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
        imgInfos += "</span></div>"

        imgInfos += "</div>";

        if(4 < infoList.length){
            if(4 === flag ){
                // console.log("21111")
                  flag = 0;
                  $("#imgInfos").html(imgInfos);
                  // console.log(flag + "-----" + length + "-------" + i.id);
                  infoList.splice(0,4);
                  getInfoList(infoList);
            }
        }
        else{
            $("#imgInfos").html(imgInfos);
        }
    })
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
    $('#sample').html(htmlStr);
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

/** 无限分页结束 **/

// 找场景
function scenes( thisHtml, role ){
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

// 公告详情
function annDetail(){
    window.location.href = "mine/announcements/announceDetail.html?id=" + $("#annid").val();
}

// 搜索框开始
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");

if(searchBar){
    searchBarInput.onclick = function(){
        searchBarBtn.style.marginRight = 0;
    }
    searchBarInput.oninput = function(){
        if(this.value.length){
            searchBarClearBtn.style.display = 'block';
            searchBarBtn.classList.add("aui-text-info");
            searchBarBtn.textContent = "搜索";
        }else{
            searchBarClearBtn.style.display = 'none';
            searchBarBtn.classList.remove("aui-text-info");
            searchBarBtn.textContent = "取消";
        }
    }
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
            window.location.href = "serachInfo.html?keywords=" + keywords;
        }else{
            this.style.marginRight = "-"+this.offsetWidth+"px";
            searchBarInput.value = '';
            searchBarInput.blur();
        }
    }
}
// 搜索框结束

function getAnn(){
  $.post(path + "/ActorInterface/ann/queryAll.action",{
      token:localStorage.token
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
          $("#ann").html(data.infoList[0].anntitle);
          $("#annid").val(data.infoList[0].id);
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
