var role = GetQueryString("role");

$(function(){
    $('body').height($('body')[0].clientHeight);
    console.log(localStorage.token);
    getList('');
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
//checkScroll();
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
    var actionUrl = "";
    switch(role){
        case "actor": actionUrl = path + "/ActorInterface/actor/queryActors.action";
        break;
        case "scene": actionUrl = path + "/ActorInterface/scene/queryScenes.action";
        break;
        case "subject": actionUrl = path + "/ActorInterface/subject/querySubjects.action";
        break;
    }
    $.post(actionUrl,{
        token: localStorage.token,
        keywords: keywords
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var imgInfos = "";
            $("#sample").html("");

            var flag = -1;
            data.infoList.forEach(function(i){
                flag ++;


                switch(i.type){
                    case "actor":
                    // <div style='float:left; display: block; width:47.5%; height:100%;'>
                    //   <p style="height:15%; margin-left:5%;">112121</p>
                    //    <span style="width:100%; height:80%; background-image: url(./image/index/left.jpeg); background-size:100%;"></span>
                    //        <p style="height:15%; margin-left:5%;">112121</p>
                    // </div>
                    // <div style='float:left; display: block; width:47.5%; height:100%;'>
                    //   <p style="height:15%; margin-left:5%;">112121</p>
                    //    <span style="width:100%; height:80%; background-image: url(./image/index/right.jpeg); background-size:100%;"></span>
                    //        <p style="height:15%; margin-left:5%;">112121</p>
                    // </div>

                    imgInfos += "<p style='height:15%; margin-left:5%;'>" + i.nickname +  "<span style='margin-left:27%;'>" + "演员" + "</span>" + "</p>";
                    if(0 === flag%2){
                        imgInfos += "<div style='float:left; display: block; width:48%; height:100%;'>";
                    }else{
                        imgInfos += "<div style='margin-left:4%; float:left; display: block; width:47.5%; height:100%;'>";
                    }

                    imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:75%; background-image: url(" + data.imgList[flag] + "); background-size:100%;'></span>";
                    imgInfos += "<p style='height:15%; margin-left:5%;'>";

                    imgInfos += "<span class='aui-iconfont aui-icon-note' style='margin-left: 22%;'>";
                    imgInfos += "<span style='margin-left: 5px;'>0</span>";
                    imgInfos += "</span>"
                    imgInfos += "<span class='aui-iconfont aui-icon-laud' style='margin-left: 5%;'>";
                    imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                    imgInfos += "</span>"
                    imgInfos += "<span class='aui-iconfont aui-icon-star' style='margin-left: 5%;'>";
                    imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                    imgInfos += "</span>"
                    imgInfos += "</p>";
                    imgInfos += "</div>";

                        // imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.nickname;
                        // imgInfos += "</p>"
                        // imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%; background-image: url(" + data.imgList[flag] + "); background-size:100%;'></span>";
                        //
                        // var d = new Date(i.createtime);
                        // var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                        //
                        // imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
                        // imgInfos += "<span class='aui-iconfont aui-icon-note' style='margin-left: 22%;'>";
                        // imgInfos += "<span style='margin-left: 5px;'>0</span>";
                        // imgInfos += "</span>"
                        // imgInfos += "<span class='aui-iconfont aui-icon-laud' style='margin-left: 5%;'>";
                        // imgInfos += "<span style='margin-left: 5px;'>" + i.goodSum + "</span>";
                        // imgInfos += "</span>"
                        // imgInfos += "<span class='aui-iconfont aui-icon-star' style='margin-left: 5%;'>";
                        // imgInfos += "<span style='margin-left: 5px;'>" + i.attentionSum + "</span>";
                        // imgInfos += "</span>"
                        // imgInfos += "</p>"
                        // imgInfos += "</div>";
                    break;
                    case "scene":
                    if(0 === flag){
                        imgInfos += "<div style='width:100%; height:100%;'>";
                    }else{
                        imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>";
                        imgInfos += "<div style='width:100%; height:100%;'>";
                    }
                        imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.scenename +  "<span style='margin-left:75%;'>" + "场景" + "</span>";
                        imgInfos += "</p>"
                        imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%; background-image: url(" + data.imgList[flag] + "); background-size:100%;'></span>";

                        var d = new Date(i.createtime);
                        var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

                        imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
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
                    break;
                    case "subject":
                    if(0 === flag){
                        imgInfos += "<div style='width:100%; height:100%;'>";
                    }else{
                        imgInfos += "<div style='height:3%; background-color:#F0F0F0'></div>"
                        imgInfos += "<div style='width:100%; height:100%;'>";
                    }
                        imgInfos += "<p style='height:15%; line-height:35px; margin-left:5%;'>" + i.subjectname+  "<span style='margin-left:75%;'>" + "道具" + "</span>";
                        imgInfos += "</p>"
                        imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:70%; background-image: url(" + data.imgList[flag] + "); background-size:100%;'></span>";

                        var d = new Date(i.createtime);
                        var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

                        imgInfos += "<p style='height:15%; line-height:25px; margin-left:5%;'>" + "发布时间: " + createtime;
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
                    break;
                }


            })

            // $("#imgInfos").html(imgInfos);
            //     htmlStr += "<img onclick=detail('" + role + "','" + data.infoList[flag].id + "') style='width:100%; height:32%; margin-top:2%;' src='" + i + "'/>";
            // })
            $('#sample').html(imgInfos);
          //  console.log($('#sample').html(imgInfos))
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
