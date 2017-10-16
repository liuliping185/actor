$(function(){
    $('body').height($('body')[0].clientHeight);
    console.log(localStorage.token);
    getList('');
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

// 获取列表
function getList(keywords){
    $.post(path + "/ActorInterface/attention/myAttentionList.action",{
        token: localStorage.token,
        keywords: keywords
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
          $("#num").html("<font style='font-family: STKaiti'><font color='green'>"+data.resultList.length + "</font>人</font>");
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
            content += "<li class='aui-list-item aui-list-item-arrow' onclick=goDetail('"+i.type+"','"+i.infos.id+"')>";
            content += "<div class='aui-media-list-item-inner'>";
            content += "<div class='aui-list-item-media'>";
            content += "<img src='" + i.infos.firstimg + "'>";
            content += "</div>";
            content += "<div class='aui-list-item-inner'>";
            content += "<div class='aui-list-item-text'>";

            if("actor" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.nickname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.infos + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
			  content += "<font color='green' style='font-family: STKaiti'><img src='../../image/roleDetails/actor.png' style='width:40px;height:20px;'></font>";

            }

            if("scene" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.scenename + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.sceneinfos + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<font color='blue' style='font-family: STKaiti'><img src='../../image/roleDetails/scene.png' style='width:40px;height:20px;'></font>";
            }

            if("subject" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.subjectname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.bigtypeid  + "</div>";
              content += "</div>";
              content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/roleDetails/subject.png' style='width:40px;height:20px;'></font>";
            }

            content += "</div>";
            content += "<div class='aui-info-item'>发布于：" + i.infos.createtime.substring(0,10) + "</div>";
            content += "</div>";
            content += "</div>";
            content += "</div>";
            content += "</li>";

			  content +=  "	<div style='margin-top: 0px;margin-bottom:10px;'>";
	 		  content +=  "<img src='../../image/fg.jpg' width='100%' height='5px' />";
			  content +=  "</div>";

          });

          $("#content").html(content);
        }
    });
}

function goDetail(type,id){

	var url = "";
	if(type == "actor"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "scene"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "subject"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}
	window.location.href=url;
}
