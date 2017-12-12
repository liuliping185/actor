var role = GetQueryString("role");
var flag = 0;

$(function(){
    $('body').height($('body')[0].clientHeight);
    // 筛选分类开始
    $(".flip").mouseover(function() {
			$(this).next("div").slideDown(500);
      $("#thirdArea").hide();
		});

		$(".content").mouseleave(function() {
			$(this).children("div").slideUp(500);
      $("#thirdArea").show();
		});
    // 筛选分类结束

    // 获取列表信息
    getList('');

    // 获取全部类型
    getType();
});

// 搜索框开始
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");

if(searchBar){
    searchBarInput.onclick = function(){
        searchBarBtn.style.marginRight = 0;
    }
    // searchBarInput.oninput = function(){
    //     if(this.value.length){
    //         searchBarClearBtn.style.display = 'block';
    //         searchBarBtn.classList.add("aui-text-info");
    //         searchBarBtn.textContent = "搜索";
    //     }else{
    //         searchBarClearBtn.style.display = 'none';
    //         searchBarBtn.classList.remove("aui-text-info");
    //         searchBarBtn.textContent = "取消";
    //     }
    // }
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
            // $(".content").hide();
            $(".content").children("div").slideUp(500);
            $(".sample").show();
            $("#thirdArea").show();
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
    // $("#thirdArea").show();
    var provience = $("#provience").val();
    var searchInput = $("#search-input").val();

    var actionUrl = "";
    switch(role){
        case "actor": actionUrl = path + "/ActorInterface/actor/queryActors.action";  // 演员
        break;
        case "scene": actionUrl = path + "/ActorInterface/scene/queryScenes.action";  // 场景
        break;
        case "subject": actionUrl = path + "/ActorInterface/subject/querySubjects.action";  // 道具
        break;
        case "screenwriter": actionUrl = path + "/ActorInterface/screenwriter/queryScreenwriters.action";  // 编剧
        break;
        case "director": actionUrl = path + "/ActorInterface/director/queryDirectors.action";  // 导演
        break;
        case "producer": actionUrl = path + "/ActorInterface/producer/queryProducers.action";  // 制片
        break;
        case "clothing": actionUrl = path + "/ActorInterface/clothing/queryClothings.action";  // 服装
        break;
        case "equipment": actionUrl = path + "/ActorInterface/equipment/queryEquipments.action";  // 设备
        break;
        case "camerateam": actionUrl = path + "/ActorInterface/camerateam/queryCamerateams.action";  // 摄影组
        break;
        case "investment": actionUrl = path + "/ActorInterface/investment/queryInvestments.action"; // 投资
        break;
    }
	var smallid = "";

	$('input[name="smallCheck"]:checked').each(function(){
		smallid += $(this).val() + ",";
	});

	var bigid = "";

	$('input[name="bigCheck"]:checked').each(function(){
		bigid += $(this).val() + ",";
	});

    $.post(actionUrl,{
        token: localStorage.token,
        keywords: keywords,
        smallid: smallid,
		    bigid:bigid,
        provience:provience
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var imgInfos = "";
            $(".content").children("div").slideUp(500);
            $("#thirdArea").show();

            data.infoList.forEach(function(i){

                imgInfos += "<div style='background-size:100%;padding-bottom:13px;'>";

                var d = new Date(i.publictime);
                var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

                imgInfos += "<div style='width:93%;margin-top:10px;float:left;'>";
                imgInfos += "<img onclick=roleDetails('" + i.type + "','" + i.id + "') src='" + i.firstimg + "' style='left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);position:relative;text-align:center;border-radius:7px;margin-left:3.5%;border:1px solid #E0E0E0;'/>";
                imgInfos += "<img src='../image/index/transparent.png' style='left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);position:relative;text-align:center;border-radius:7px;margin-left:3.5%;margin-top:-25%;width:100%;'>";
                imgInfos += "<div style='position:relative;width:100%;margin-top:-27px;text-align:center;'>"
                imgInfos += "<span style='width:38%;color:#ffffff;font-size:0.7rem;'> " + createtime + "</span>";
                imgInfos += "<span style='width:57%;text-align:right;'><span style=''>";
                imgInfos += "<img src='../image/noteT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.7rem;'>" + i.evaSum + "</span>";
                imgInfos += "</span>"
                imgInfos += "<span style='margin-left: 8%;'>";
                imgInfos += "<img src='../image/laudW.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
                imgInfos += "<span style='margin-left: 5px;color:#ffffff;font-size:0.7rem;'>" + i.goodSum + "</span>";
                imgInfos += "</span>"
                imgInfos += "<span style='margin-left: 8%;'>";
                imgInfos += "<img src='../image/startT.png' style='margin-top:5px;float:left;' width='13px' height='13px'/>"
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
                switch(i.type){
                    case "actor":
                        imgInfos += " <img src='../image/index/actor.png'/>";
                        nickname = i.nickname;
                        break;
                    case "scene":
                        imgInfos += " <img src='../image/index/scene.png'/>";
                        nickname = i.scenename;
                        break;
                    case "subject":
                        imgInfos += " <img src='../image/index/subject.png'/>";
                        nickname = i.subjectname;
                        break;
                    case "screenwriter":
                        imgInfos += " <img src='../image/index/screenwriter.png'/>";
                        nickname = i.screenwritername;
                        break;
                    case "director":
                        imgInfos += " <img src='../image/index/director.png'/>";
                        nickname = i.directorname;
                        break;
                    case "producer":
                        imgInfos += " <img src='../image/index/producer.png'/>";
                        nickname = i.producername;
                        break;
                    case "clothing":
                        imgInfos += " <img src='../image/index/clothing.png'/>";
                        nickname = i.clothingname;
                        break;
                    case "equipment":
                        imgInfos += " <img src='../image/index/equipment.png'/>";
                        nickname = i.equipmentname;
                        break;
                    case "camerateam":
                        imgInfos += " <img src='../image/index/camerateam.png'/>";
                        nickname = i.camerateamname;
                        break;
                    case "investment":
                        imgInfos += " <img src='../image/index/investment.png'/>";
                        nickname = i.investmentname;
                        break;
                }
                imgInfos += "</div>";
                imgInfos += "<div style='float:left;width:40%;margin-top:2.7%;'>";
                imgInfos += "<span style='padding-left:15px;width:100%;height:23px;font-family: 苹方;font-size:0.7rem;color:#505050;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;''>" + nickname + "</span>";

                imgInfos += "</div>";

                imgInfos += "<div style='text-align:right;float:left;width:45%;margin-top:2%;'>";
                if(i.price ){
                      imgInfos += "<div style='padding:0;width:100%;font-family: 苹方;font-size:0.7rem;color:#9d9d9d'>￥" + i.price + "元" + unit + "</div>";
                }
                imgInfos += "</div>";

                imgInfos += "</div>";
                imgInfos +=  "<br/><div style='margin-top: 5px; height:3%;'>";
                imgInfos +=  "<img src='../image/fg.jpg' width='100%' height='5px' />";
                imgInfos +=  "</div>";
            })

              $("#imgInfos").html(imgInfos);

              if(0 === data.infoList.length){
                  $("#imgInfos").html("<span style='width:100%;margin-top:10px;text-align:center;padding-bottom:10px;text-align:center;font-size:18px;color:#009100'>暂无信息!</span>");
              }
        }else{
            dialog.alert({
                  title:"暂无符合该条件信息",
                  msg:'',
                  buttons:['确定']
              },function(ret){
                  $("#imgInfos").html("");
              })
              return false;
        }
    });
}

//下拉列表出现
function appear(){
    $(".appear").children().show();
}

// 获取大类
function getType(){
    console.log(role)
    $.post(path + "/ActorInterface/index/findBigType.action",{
      typeinfo: role
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        var screen = "";
        if (data.success) {
            screen += "<ul>";

            data.infoList.forEach(function(i){
                screen += "<li style='margin-top:5%;'>";
                screen += "<div style='float:left;width:14%;'><input type='checkbox' class='aui-checkbox' style='margin-top:5px;margin-left:0px;vertical-align:middle;width:0.7rem;height:0.7rem;' name='bigCheck' value='"+i.id+"' onclick='smallType(" + i.id + ")' id='big_"+i.id+"'/></div>";
                screen += "<div style='float:left;width:86%;margin-top:4px;'><label for='big_"+i.id+"'>" + "<span style='padding-left:5px;padding-right:5px;color:#9d9d9d;width:85px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.typename + "</span></label></div>";
                screen += "</li>";

                $("#bigid").val(i.id);
            })

            screen += "</ul>";

            $(".screen").html(screen);
        }
    });
}

// 获取小类
var flag = 0;
function smallType(id){

  if($("#big_"+id).prop("checked")){

	   $.post(path + "/ActorInterface/index/findSmallType.action",{
        bigid: id
        }, function(data) {
          var data = JSON.parse(data);
          console.log(data);
          if (data.success) {
              var bigid = $("#bigid").val();
              var smallname = "";
              smallname += "<ul>";

              data.infoList.forEach(function(i){
                  smallname += "<li class='small_"+id+"'>";
                  smallname += "<div style='float:left;width:14%;'><input type='checkbox' class='aui-checkbox' style='margin-top:5px;margin-left:0px;vertical-align:middle;width:0.7rem;height:0.7rem;' name='smallCheck' value='"+i.id+"' id='small__"+i.id+"'/></div>";
                  smallname += "<div style='float:left;width:86%;'><label for='small__"+i.id+"'>" + "<span style='margin-top:4px;padding-left:5px;padding-right:5px;color:#9d9d9d;width:85px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>" + i.typename + "</span></label></div>";
                  smallname += "</li>";
              });

              smallname += "</ul>";

              $(".smallType").append(smallname);
          }
      });
  }else {
	   $("li.small_"+id).remove();
  }

}

// 角色详情
function roleDetails(role, id){
    console.log(role);
    window.location.href = "roleDetails.html?id=" + id + "&role=" + role;
}
