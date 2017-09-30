$(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);

    getAnn();

    $.post(path + "/ActorInterface/index/queryAll.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var imgInfos = "";
            var flag =0 ;

            data.infoList.forEach(function(i){
                flag ++;
                if(0 != flag%2){
                    imgInfos += "<div style='float:left; display: block; width:48%; height:100%;'>";
                }else{
                    imgInfos += "<div style='margin-left:4%; float:left; display: block; width:47.5%; height:100%;'>";
                }

                imgInfos += "<span onclick=detail('" + i.type + "','" + i.id + "') style='width:100%; height:75%; background-image: url(" + i.imgpath + "); background-size:100%;'></span>";
                switch(i.type){
                    case "actor":
                        imgInfos += "<p style='height:15%; margin-left:5%;'>" + i.nickname + "</p>";
                    break;
                    case "scene":
                        imgInfos += "<p style='height:15%; margin-left:5%;'>" + i.scenename + "</p>";
                    break;
                    case "subject":
                        imgInfos += "<p style='height:15%; margin-left:5%;'>" + i.subjectname + "</p>";
                    break;
                }
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
          $("#ann").html(data.infoList[0].anninfos);
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
