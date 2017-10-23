var imgInfos = "";

var scroll = new auiScroll({
 listen:true, //是否监听滚动高度，开启后将实时返回滚动高度
 distance:200 //判断到达底部的距离，isToBottom为true
},function(ret){
console.log(ret)
});
$(function(){
  document.onkeydown=keyDownSearch;

  function keyDownSearch(e) {
      // 兼容FF和IE和Opera
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13) {
          window.location.href = "serachInfo.html?keywords=" + $("#keywords").val();
          return false;
      }
      return true;
  }

    lunbo();

    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);

    getAnn();

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



        imgInfos += "<div style=' height:60px;background-size:100%;'>";
        imgInfos += "<div style='float:left;width:60px; height:60px; margin-left:15px; margin-top:10px;'>";
        imgInfos += "<img src='" + i.firstimg + "' style='width:100%; height:100%; border-radius:50%' id='img'/>";
        imgInfos += "</div>";
        //
        // var rolename = "";
        // var nickname = "";
        // var sex = "";
        // var age = "";
        // var roleimg = ""
        var unit = "";
        if(i.unit){
            unit = "/" + i.unit;
        }

        switch(i.type){
            case "actor":
            imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
            imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.nickname + "</span>";
            // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";


            imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
            imgInfos += "</div>";
            imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
            imgInfos += " <img src='image/index/actor.png'/>";
            imgInfos += "</div>";
            break;
            case "scene":
            imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
            imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.scenename + "</span>";
            // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
            imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
            imgInfos += "</div>";
            imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
            imgInfos += " <img src='image/index/scene.png'/>";
            imgInfos += "</div>";
            break;
            case "subject":
                var price = "";
                var unit = "";
                if(i.saleprice){
                  price = i.saleprice;
                  unit =  "/" + i.saleunit
                }else{
                  if(i.rentprice){
                    price =  i.rentprice;
                    unit =  "/" + i.rentunit
                  }
                }
                // i.saleprice ? price = i.saleprice unit = i.saleunit :
                //     i.rentprice ? price = i.rentprice, unit = i.rentunit : "";
                imgInfos += "<div style='float:left;width:60%;margin-left:15px;margin-top:15px;'>";
                imgInfos += "<span style='width:60%;height:23px;font-family: 苹方;font-size:0.8rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;'>" + i.subjectname + "</span>";
                // imgInfos += "<span style='height:10%;font-family: 苹方;font-size:12px;color:#9d9d9d'>" + i.sex + "</span>";
                imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.875rem;color:#9d9d9d'>￥" + price + "元" + unit + "</div>";
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:40px;  margin-top:8%;'>";
                imgInfos += " <img src='image/index/subject.png'/>";
                imgInfos += "</div>"






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
        imgInfos += "<div style='width:95%;margin-top:10px;float:left; display: block;padding-bottom:10px;'>";
        // }
        // imgInfos += "<span  style='width:100%; height:100%;background-img:url('" + i.firstimg + "');background-size:100%;'>";
        // imgInfos += "<span style='margin-left:15px;'>";
        imgInfos += "<img onclick=detail('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='margin-left:10px;float:left;border:1px solid #E0E0E0;width:100%;'/>";
        // imgInfos += "</span>";
        // imgInfos += "<div style='margin-top:-0px;width:100%; height:80px;background-color:rgba(0,0,0,0.2);background-size:100%;'>";
        // imgInfos += "</div>";

        // imgInfos += "<span style='float:left; z-index:2; left:10px; margin-top:0px'>";
        // imgInfos += createtime;
        // imgInfos += "</span>";
        // imgInfos += "</span>";
        imgInfos += "<img src='./image/index/transparent.png' style='float:left;margin-left:10px;margin-top:-25%;width:100%;'>";
        imgInfos += "<div style='width:100%;margin-top:-27px;float:left;text-align:center;'>"

        imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.875rem;'> " + createtime + "</span>";

        imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
        imgInfos += "<img src='image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>0</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 8%;'>";
        imgInfos += "<img src='image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.goodSum + "</span>";
        imgInfos += "</span>"
        imgInfos += "<span style='margin-left: 8%;'>";
        imgInfos += "<img src='image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
        imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.875rem;'>" + i.attentionSum + "</span>";
        imgInfos += "</span></span>"

        imgInfos += "</div>";

        imgInfos += "</div>";


        imgInfos +=  "<br/><div style='margin-top: 10px; height:3%;'>";
        imgInfos +=  "<img src='image/fg.jpg' width='100%' height='5px' />";
        imgInfos +=  "</div>";

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
            $("#keywords").val(keywords);

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

          lunboimg += "<img onclick=detail('" + i.type + "','" + i.infoid + "')  src='" + i.imgpath + "' style='height:200px; width:100%;' alt='图片不存在'>";
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
