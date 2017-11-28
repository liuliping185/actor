var city = GetQueryString("city");
var imgInfos = "";

var scroll = new auiScroll({
 listen:true, //是否监听滚动高度，开启后将实时返回滚动高度
 distance:200 //判断到达底部的距离，isToBottom为true
},function(ret){
console.log(ret)
var searchHeader = document.getElementById('searchHeader');
var searchInput = document.getElementById('search-input');
var city = document.getElementById('city');

if(100 < ret.scrollTop){
    searchHeader.style.background = 'rgba(255,255,255,1)';
    searchInput.style.color = '#009ad6';
    city.style.color = '#009ad6';
}else{
    searchHeader.style.backgroundColor ='rgba(255,255,255,0)';
    searchInput.style.color ='rgba(255,255,255,1)';
    city.style.color = 'rgba(255,255,255,1)';
}
});
$(function(){
  if(city){
      $("#city").html(city);
  }

  console.log(localStorage.token);
  $('body').height($('body')[0].clientHeight);
  document.onkeydown=keyDownSearch;

        lunbo();
        getAnn();

    $.post(path + "/ActorInterface/index/queryAll.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            getInfoList(data.infoList);
        }else{
        }
    });
});

function keyDownSearch(e) {
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        window.location.href = "serachInfo.html?keywords=" + $("#search-input").val() + "&city=" + city;
        return false;
    }
    return true;
}

// 分4张加载底部图片
function getInfoList(infoList){
    infoList.forEach(function(i){
        imgInfos += "<div style='background-size:100%;'>";

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
            case "screenwriter":
                imgInfos += " <img src='image/index/screenwriter.png'/>";
                break;
            case "director":
                imgInfos += " <img src='image/index/director.png'/>";
                break;
            case "producer":
                imgInfos += " <img src='image/index/producer.png'/>";
                break;
            case "clothing":
                imgInfos += " <img src='image/index/clothing.png'/>";
                break;
            case "equipment":
                imgInfos += " <img src='image/index/equipment.png'/>";
                break;
            case "camerateam":
                imgInfos += " <img src='image/index/camerateam.png'/>";
                break;
            case "investment":
                imgInfos += " <img src='image/index/investment.png'/>";
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

      if(0 === infoList.length){
          $("#imgInfos").html("<span style='width:100%;margin-top:10px;text-align:center;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
      }else{
          $("#imgInfos").html(imgInfos);
      }
}

// 角色列表
function roleList( thisHtml, role ){
    window.location.href = "./scenes/scenes.html?role=" + role;
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
            $("#keywords").val(keywords);

            window.location.href = "serachInfo.html?keywords=" + keywords + "&city=" + city;
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

// 动态获取轮播图
function lunbo(){
  $.post(path + "/ActorInterface/index/findLunboList.action",{
      token:localStorage.token
    }, function(data) {
      var data = JSON.parse(data);
      console.log(data)
      if (data.success) {
        if(0 < data.lunboList.length){
            $("#lunboOl").html();
            $("#lunboimg").html();
        }
        var lunboimg = "";
        var lunboOl = "";
        var flag = 0;
        data.lunboList.forEach(function(i){
          if(flag === 0){
            lunboimg += "<div class='item active' >"
            lunboOl += "<li data-target='#carousel-example-generic' data-slide-to='" + flag + "' class='active'></li>";
          }else{
            lunboimg += "<div class='item'>"
            lunboOl += "<li data-target='#carousel-example-generic' data-slide-to='" + flag + "'></li>";
          }
// onclick=detail('" + i.infotype + "','" + i.infoid + "')
          lunboimg += "<img src='" + i.imgpath + "' style='height:200px; width:100%;' alt='图片不存在'>";
          lunboimg += "</div>";
          flag ++;
        })

        if(0 < data.lunboList.length){
            $("#lunboOl").html(lunboOl);
            $("#lunboimg").html(lunboimg);
        }
          //
          // $("#ann").html(data.infoList[0].anntitle);
          // $("#annid").val(data.infoList[0].id);
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
