
//var path = "http://192.168.0.129:8080";
var path = "http://47.93.224.28:8089";
var dialog = new auiDialog();

apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    api.removeLaunchView({
        animation: {
            type: 'none',
            duration: 0
        }
    });
    // api.clearCache(function(ret, err) {
    //         api.toast({
    //                 msg : '清除成功',
    //                 location : 'middle'
    //         });
    // });

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
var imgId = 0;

// 多图上传图片开始
function showAction(){
    var UIMediaScanner = api.require('UIMediaScanner');
    UIMediaScanner.open({
      type: 'picture',
      column: 4,
      classify: true,
      max: 4,
      sort: {
        key: 'time',
        order: 'desc'
      },
      texts: {
        stateText: '已选择*项',
        cancelText: '取消',
        finishText: '完成'
      },
      styles: {
        bg: '#fff',
        mark: {
          icon: '',
          position: 'bottom_left',
          size: 20
        },
        nav: {
          bg: '#eee',
          stateColor: '#000',
          stateSize: 18,
          cancelBg: 'rgba(0,0,0,0)',
          cancelColor: '#000',
          cancelSize: 18,
          finishBg: 'rgba(0,0,0,0)',
          finishColor: '#000',
          finishSize: 18
        }
      },
      scrollToBottom: {
        intervalTime: 3,
        anim: true
      },
      exchange: true,
      rotation: true
    },

    function(ret) {
        if (ret) {
            var multipleGraphsList = [];


            ret.list.forEach(function(i){
                imgId++ ;
                var jsonArray = {}
                var image = new Image();
                image.crossOrigin = '';
                image.src = i.thumbPath;
                image.id = imgId;
                image.style = "width: 100%; height: 100%;";

                image.onload = function(){
                    if(image.complete){
                        var base64 = getBase64Image(image);
                        jsonArray = {
                         base64Data: base64
                        }
                        multipleGraphsList.push(jsonArray);
                        var num = ret.list.length - 1;
                        if(ret.list[num].time === i.time){
                            var hi_jsonStr = JSON.stringify(multipleGraphsList);
                            $("#multipleGraphsList").val(hi_jsonStr);
                        }
                     }
                 }
                 $("#imgUpload").append(image);
                 $("#imgUpload").append("<span name=" + imgId +"><div class='info' align='right'><button type='button' class='btn btn-danger' onclick=delpic('" + imgId + "')>删除</button></div></span>");

            });
          }
       }
    );
}

//删除图片
function delpic(imgId){
  $("#" + imgId).remove();
  $("span[name=" + imgId + "]").html("");
	deleteData(imgId);
}

// 将图片转换为base64编码
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width === 0 ? 200 : img.width;
    canvas.height = img.height === 0 ? 200 : img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height );
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

// 多图上传图片结束

// 返回上一页
function back(){
    window.history.go(-1);
}
