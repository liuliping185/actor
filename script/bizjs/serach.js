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

            data.infoList.forEach(function(i){
                hotWords += "<div style='float:left; display: block; height:30%; background-color:#F0F0F0; margin-left:13%; margin-top: 1%;'>";
                hotWords += "<h4 onclick=getkeyWords('" + i.keywords + "')>" + i.keywords + "<h4>";
                hotWords += "</div>";
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
    var keywords = $("#search-input").val();
    window.location.href = "serachInfo.html?keywords=" + keywords;
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
