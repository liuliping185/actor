$(document).ready(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);

    $.post(path + "/ActorInterface/index/findKeyWords.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var hotWords = "";
            var flag = 0;
            data.infoList.forEach(function(i){
              flag ++;

              // 20e0b9
              if(0 === flag%3){
                  // hotWords += "<div style='margin-bottom:14px;width:100%;'>";
                  // hotWords += "<span style='width:30%;color:#27ddb8;font-size:12px;'>" + i.keywords + "</span>";
              // }else{
                  hotWords += "<span style='width:30%;color:#27ddb8;font-size:14px;padding-bottom:14px;' onclick=getkeyworks('" + i.keywords + "')>" + i.keywords + "</span>";
              }else{
                  hotWords += "<span style='width:30%;color:#27ddb8;font-size:14px;' onclick=getkeyworks('" + i.keywords + "')>" + i.keywords + "</span>";
              }

              if(0 != flag%3){
                  hotWords += "<span style='color:#ddd;'>|</span>";
              }

              var num = flag%3;
              var number = 3-num;

              if(0 != num){

                  if(flag === data.infoList.length){
                    for(var i=0; i<number; i++){
                        hotWords += "<span style='width:30%;color:#27ddb8;font-size:12px;'></span>";
                    }
                  }
              }




              // if(0 === flag%3 && flag != 0){
              //     hotWords += "</div>";
              // }






              //     <span style="width:30%;color:#27ddb8;font-size:12px;">文字一</span>
              //     <span style="color:#ddd;">|</span>
              //     <span style="width:30%;color:#27ddb8;font-size:12px;">文字一</span>
              // </div>
              //   hotWords += "<div style='float:left; display: block; height:30%; color:#20e0b9; display:inline-block;border:1px solid #20e0b9; border-radius:5px; margin-left:13%; margin-top: 3%;'>";
              //
        			//  	hotWords += "<div style='padding-left:5px;padding-right:5px'><span  onclick=getkeyWords('" + i.keywords + "')><h4>"+ i.keywords +"</h4></span></div>";
              //   hotWords += "</div>";
            })
              $("#hotWords").html(hotWords);
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

// 获取热搜字
function getkeyWords( keywords ){
    console.log(keywords);
    $("#search-input").val(keywords);
}

// 搜索
function serach(){
    var role = $("#role").val();
    var keywords = $("#search-input").val();
    window.location.href = "serachInfo.html?keywords=" + keywords + "&role=" + role;
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

function getkeyworks(keywords){
  console.log(keywords);
  document.getElementById('search-input').value = keywords;
    // $("search-input").val(keywords);
}
