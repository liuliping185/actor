
var path = "http://192.168.0.129:8080";
var dialog = new auiDialog();

apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    api.parseTapmode();
    //funIniGroup();
}

// 获取地址栏参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
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
            document.getElementById("search-keywords").textContent = keywords;
        }else{
            this.style.marginRight = "-"+this.offsetWidth+"px";
            searchBarInput.value = '';
            searchBarInput.blur();
        }
    }
}
// 搜索框结束

function funIniGroup(){
    var eHeaderLis = $api.domAll('header li'),
        frames = [];
    for (var i = 0,len = eHeaderLis.length; i < len; i++) {
            frames.push( {
                name: 'frame'+i,
                url: './html/frame'+i+'.html',
                bgColor : 'rgba(0,0,0,.2)',
                bounces:true
            } )
    }
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight,
            w: api.winWidth//,
            // h: $api.dom('#main').offsetHeight
        },
        index: 0,
        frames: frames
    }, function (ret, err) {

    });
}

// 随意切换按钮
function randomSwitchBtn( tag, mineUrl ) {
  console.log(mineUrl)
    // if( tag == $api.dom('#footer li.active') )return;
    // var eFootLis = $api.domAll('#footer li'),
    //     eHeaderLis = $api.domAll('header li'),
    //     index = 0;
    // for (var i = 0,len = eFootLis.length; i < len; i++) {
    //     if( tag == eFootLis[i] ){
    //         index = i;
    //     }else{
    //         $api.removeCls(eFootLis[i], 'active');
    //         $api.removeCls(eHeaderLis[i], 'active');
    //     }
    // }
    // $api.addCls( eFootLis[index], 'active');
    // $api.addCls( eHeaderLis[index], 'active');
    //
    // // window.location.href = "./mine/info.html";
    //
    // api.setFrameGroupIndex({
    //     name: 'group',
    //     index: index
    // });

    // api.openWin({
    // 	name : "myInfo",
    // 	url : "./mine/info.html"
    // });

    window.location.href = mineUrl;
}
