$(function(){
    $('body').height($('body')[0].clientHeight);
    console.log(localStorage.token);
    getList("");
});

//搜索框开始
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
    $.post(path + "/ActorInterface/attention/myBeAttentionList.action",{
        token: localStorage.token,
        keywords: keywords
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
          $("#num").html(data.resultList.length + "人");
          var content = "";
          var status = "";

          data.resultList.forEach(function(i){

            switch(i.infos.checkstatus){
                case "Y": status = "审核通过";
                    break;
                case "N": status = "审核拒绝";
                    break;
                case "W": status = "待审核";
                    break;
                case "P": status = "已发布";
                    break;
            }
            content += "<li class='aui-list-item aui-list-item-arrow'>";
            content += "<div class='aui-media-list-item-inner'>";
            content += "<div class='aui-list-item-media'>";
            content += "<img src='" + i.img + "'>";
            content += "</div>";
            content += "<div class='aui-list-item-inner'>";
            content += "<div class='aui-list-item-text'>";
            if("actor" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.nickname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.infos + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>" + status+ "</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<img src='../../image/mine/actor.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
            }

            if("scene" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.scenename + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.sceneinfos + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>" + status + "</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<img src='../../image/mine/scene.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
            }

            if("subject" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.subjectname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.bigtypeid  + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>" + status+ "</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<img src='../../image/mine/subject.jpg' style='width:1rem' class='aui-img-round'/><span class='aui-margin-l-5'></span>";
            }
            content += "</div>";
            content += "<div class='aui-info-item'>" + i.infos.createtime + "</div>";
            content += "</div>";
            content += "</div>";
            content += "</div>";
            content += "</li>";
          });

          $("#content").html(content);
        }
    });
}
