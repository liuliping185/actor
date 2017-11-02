// var path = "http://192.168.0.129:8080";
var path = "http://47.93.224.28:8089";
var dialog = new auiDialog();
var UIListView = "";
var UIMediaScanner = "";

apiready = function () {
    UIMediaScanner = api.require('UIMediaScanner');
    UIListView = api.require('UIListView');
    $api.fixStatusBar( $api.dom('header') );
    api.removeLaunchView({
        animation: {
            type: 'none',
            duration: 0
        }
    });

    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    api.parseTapmode();

    api.addEventListener({
        name:'clip_success'
    }, function(ret, err){
      var imgSrc = ret.value.new_img_url;
      var type = ret.value.type;

        if( ret ){
             var jsonstr= JSON.stringify(ret);

              if(!imgSrc || !type){
                return false;
              }

              if("firstimg" === type){
                $('#firstimg').attr('src', imgSrc);
                $("#fmimg").val(imgSrc);
              }else if("idcardFront" === type){
                $('#idcardFront').attr('src', imgSrc);
              }else if("idcardBack" === type){
                $('#idcardBack').attr('src', imgSrc);
              }else{
                $('#headerImg').attr('src', imgSrc);
              }

        }else{
            alert( JSON.stringify( err ) );
        }
    });
}



// 获取地址栏参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURIComponent(r[2]); return null;
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
  // console.log(mineUrl + "----" + tag)
  //   if( tag === $api.dom('#footer li.active') ){
  //     console.log("1111");
  //     return;
  //   }else{
  //     console.log("2222");
  //     var eFootLis = $api.domAll('#footer li'),
  //         eHeaderLis = $api.domAll('header li'),
  //         index = 0;
  //     for (var i = 0,len = eFootLis.length; i < len; i++) {
  //         if( tag == eFootLis[i] ){
  //             index = i;
  //         }else{
  //             $api.removeCls(eFootLis[i], 'active');
  //             $api.removeCls(eHeaderLis[i], 'active');
  //         }
  //     }
  //     $api.addCls( eFootLis[index], 'active');
  //     $api.addCls( eHeaderLis[index], 'active');
  //   }

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

    if(mineUrl){
        window.location.href = mineUrl;
    }
}
var imgId = 0;
var sizeinfos = 0;

// 多图上传图片开始
function showActionMore(){
    UIMediaScanner.open({
      type: 'picture',
      column: 4,
      classify: true,
      max: 8,
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
        intervalTime: -1,
        anim: false
      },
      exchange: true,
      rotation: true
    },

    function(ret) {
        if (ret) {
            $("#addPic").hide();
            var multipleGraphsList = [];

            ret.list.forEach(function(i){

                imgId++ ;
                var jsonArray = {}
                var image = new Image();
                image.crossOrigin = '';
                image.src = i.path;
                image.id = imgId;
                image.style = "width: 100%; height: 100%;";

                image.onload = function(){

                  sizeinfos ++;

                    if(image.complete){
                        var base64 = getBase64Image(image);

                        // var toast = new auiToast();
                      	// toast.loading({
                        //   title:"正在提交",
                        //   duration:2000
                      	// },function(ret){
                              $.post(path + "/ActorInterface/index/uploadImgs.action",{
                                  imgpath:base64
                                }, function(data) {
                                  var data = JSON.parse(data);

                                  if (data.success) {



                                      jsonArray = {
                                       base64Data: data.imgpath
                                      }

                                      multipleGraphsList.push(jsonArray);

                                      var imagesId = generateMixed(8);

                                      var imgs = "";

                                      imgs += "<span name=" + imagesId +">";
                                      imgs += "<span style='width30%;padding-left:5px;padding-right:10px;'>";
                                      // imgs += "<div style='background-color:#00ffff;width:100%;' align='right'>a</div>"

                                      imgs += "<div name=" + imagesId +" style='' align='right'><div class='info'  style='margin-top:10px;' onclick=delpic('" + imagesId + "')><img src='../../image/delete.png' style='width:13px;'/></div></div>";
                                      imgs += "<img id='" + imagesId + "'style='width:93px;height:93px;float:left;margin-top:-13px;' src='" + i.path + "'/>";
                                      imgs += "</span>";
                                      imgs += "</span>";



                                      $("#imgUpload").append(imgs);
                                      if(ret.list.length === sizeinfos){

                                          var hi_jsonStr = JSON.stringify(multipleGraphsList);

                                          if($("#multipleGraphsList").val() != ""){
                                              var newArr = JSON.parse($("#multipleGraphsList").val());
                                              newArr.push(jsonArray);
                                              $("#multipleGraphsList").val(JSON.stringify(newArr));

                                              var newArr = JSON.parse($("#multipleGraphsList").val());

                                              // var butImg = "";
                                              // alert(newArr.length + "---" + imgsize);
                                              // if(newArr.length === imgsize){
                                              //     butImg += "<span onclick='showActionMore()' id='addPicId' style='width:30%;margin-left:3%;'>";
                                              //     butImg += "<img style='width:93px;height:93px' src='../../image/addPicZ.png'/>";
                                              //     butImg += "</span>";
                                              // }
                                              //
                                              //
                                              //  $("#imgUpload").append(butImg);
                                              //  $("#imgsize").val(imgsize);


                                          }else{
                                              $("#multipleGraphsList").val(hi_jsonStr);
                                          }

                                          // alert($("#multipleGraphsList").val());
                                      }
                                  }
                              });

                      	// });


                     }
                 }



                //  $("#imgUpload").append("<span name=" + imgId +"><div class='info' align='right'><button type='button' class='btn btn-danger' onclick=delpic('" + imgId + "')>删除</button></div></span>");

            });

          }
       }
    );
}

//删除图片
function delpic(imgId){
  if(confirm("是否确认删除?")){
      $("#" + imgId).remove();
      $("span[name=" + imgId + "]").html("");
      // deleteData(imgId);
  }
}

// 将图片转换为base64编码
function getBase64Image(img, callback) {
			var quality =  50;
			var canvas = document.createElement("canvas");
			//naturalWidth真实图片的宽度
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
			var ctx = canvas.getContext("2d").drawImage(img, 0, 0);
			var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
			var dataURL = canvas.toDataURL("image/"+ext,1);

			return dataURL;
}

// 将图片转换为base64编码
function getBase64ImageOnce(img, callback) {
			var quality =  50;
			var canvas = document.createElement("canvas");
			//naturalWidth真实图片的宽度
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
			var ctx = canvas.getContext("2d").drawImage(img, 0, 0);
			var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
			var dataURL = canvas.toDataURL("image/"+ext,1);

      callback(dataURL);
}



// function getBase64Image(img) {
// 			var canvas = document.createElement("canvas");
// //			canvas.width = img.width === 0 ? 200 : img.width;
// //			canvas.height = img.height === 0 ? 200 : img.height;
// 			var ctx = canvas.getContext("2d");
//
// 			var square = 300;
// 			canvas.width = square;
//             canvas.height = square;
// 	        ctx.clearRect(0, 0, square, square);
//             var imageWidth;
//             var imageHeight;
//             var offsetX = 0;
//             var offsetY = 0;
//             if (img.width > img.height) {
//               imageWidth = Math.round(square * img.width / img.height);
//               imageHeight = square;
//               offsetX = - Math.round((imageWidth - square) / 2);
//             } else {
//               imageHeight = Math.round(square * img.height / img.width);
//               imageWidth = square;
//               offsetY = - Math.round((imageHeight - square) / 2);
//             }
//             ctx.drawImage(img, offsetX, offsetY, imageWidth, imageHeight);
//
// 	//   ctx.drawImage(img, 0, 0, canvas.width, canvas.height );
//     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
//     var dataURL = canvas.toDataURL("image/"+ext);
//     return dataURL;
// }

// 多图上传图片结束

// 返回上一页
function back(){
    UIListView.close();
    window.history.go(-1);
}

// 截图功能
function openImageClipFrame(img_src,type,url){
  api.openFrame({
    name : 'main',
    scrollToTop : true,
    allowEdit : true,
    url : url,
    rect : {
      x : 0,
      y : 0,
      w : api.winWidth,
      h : api.winHeight,
    },
    animation : {
      type : "reveal", //动画类型（详见动画类型常量）
      subType : "from_right", //动画子类型（详见动画子类型常量）
      duration : 300
    },
    pageParam : {
      img_src : img_src,
      type:type
    },
    vScrollBarEnabled : false,
    hScrollBarEnabled : false,
    //页面是否弹动 为了下拉刷新使用
    bounces : false
  });
}

//生成随机数的方法
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
