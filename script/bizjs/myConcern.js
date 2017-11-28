$(function(){
    $('body').height($('body')[0].clientHeight);
    console.log(localStorage.token);
    $("#content").html("<span style='margin-top:10px;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
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
            content += "<li class='aui-list-item' >";
            content += "<div class='aui-media-list-item-inner'>";
            content += "<div class='aui-list-item-media'>";
            content += "<img onclick=roleDetails('"+i.type+"','"+i.infos.id+"') style='width:100px;height:50px' src='" + i.infos.firstimg + "'>";
            content += "</div>";
            content += "<div class='aui-list-item-inner'>";
            content += "<div class='aui-list-item-text'>";

            if("actor" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.nickname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.infos + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
			  content += "<font color='green' style='font-family: STKaiti'><img src='../../image/index/actor.png' style='width:40px;height:20px;'></font>";

            }

            if("scene" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.scenename + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.sceneinfos + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='blue' style='font-family: STKaiti'><img src='../../image/index/scene.png' style='width:40px;height:20px;'></font>";
            }

            if("subject" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.subjectname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.subjectinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/subject.png' style='width:40px;height:20px;'></font>";
            }

            if("screenwriter" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.screenwritername + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.screenwriterinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/screenwriter.png' style='width:40px;height:20px;'></font>";
            }

            if("director" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.directorname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.directorinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/director.png' style='width:40px;height:20px;'></font>";
            }

            if("producer" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.producername + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.producerinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/producer.png' style='width:40px;height:20px;'></font>";
            }

            if("clothing" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.clothingname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.clothinginfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/clothing.png' style='width:40px;height:20px;'></font>";
            }

            if("equipment" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.equipmentname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.equipmentinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/equipment.png' style='width:40px;height:20px;'></font>";
            }

            if("camerateam" === i.type || "cameraTeam" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.camerateamname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.camerateaminfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/camerateam.png' style='width:40px;height:20px;'></font>";
            }

            if("investment" === i.type){
              content += "<div class='aui-list-item-title'>" + i.infos.investmentname + "</div>";
              content += "<div class='aui-list-item-right'>" + i.infos.investmentinfos  + "</div>";
              content += "</div>";
              // content += "<div class='aui-list-item-text'>&nbsp;</div>";
              content += "<div class='aui-info aui-margin-t-5' style='padding:0'>";
              content += "<div class='aui-info-item' style='margin-top:4px;'>";
              content += "<font color='yellow' style='font-family: STKaiti'><img src='../../image/index/investment.png' style='width:40px;height:20px;'></font>";
            }

            var d = new Date(i.infos.createtime);
            var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

            content += "</div>";
            content += "<div class='aui-info-item' style='margin-top:4px;'>发布于：" + createtime + "</div>";
            content += "</div>";
            content += "</div>";
            content += "</div>";
            content += "</li>";

			  content +=  "	<div style='margin-top: 0px;margin-bottom:10px;'>";
	 		  content +=  "<img src='../../image/fg.jpg' width='100%' height='5px' />";
			  content +=  "</div>";

          });

          if(0 === data.resultList.length){
              $("#content").html("");
              $("#noinfos").html("<span style='margin-top:10px;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
          }else{
              $("#content").html(content);
          }
        }
    });
}

// 角色详情
function roleDetails(role,id){
    window.location.href = "../../scenes/roleDetails.html?id=" + id + "&role=" + role;
}
