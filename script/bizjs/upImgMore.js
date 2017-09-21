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
          // 将图片真实地址转换为base64,放进数组，传给后台
          for(var i=0; i<ret.list.length; i++){
            var jsonArray = {}
            var image = new Image();
            image.crossOrigin = '';
            image.src = ret.list[i].thumbPath;
            //  $("#imgUpload").append(image);

            //  当资源加载完成并成功解析后触发
            image.onload = function(){
              alert("111");
              alert(image.complete);
              if(image.complete){
                  var base64 = getBase64Image(image);
                  jsonArray = {
                   base64Data: base64
                  }
                  multipleGraphsList.push(jsonArray);

              }
             }

             alert(ret.list.length + "-------" + i);
             if(ret.list.length === i + 1){
                  var hi_jsonStr = JSON.stringify(multipleGraphsList);
                  $("#multipleGraphsList").val(hi_jsonStr);
                  alert($("#multipleGraphsList").val());
             }

               $("#imgUpload").append(image);

          }
          alert($("#imgUpload").html());
      }
  }
  );
}

// 将图片转换为base64编码
function getBase64Image(img) {
    alert(img.toString() + "------" + img.width + "-----" + img.height + "-----" + img.src);
    var canvas = document.createElement("canvas");
    canvas.width = img.width === 0 ? 200 : img.width;
    canvas.height = img.height === 0 ? 200 : img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height );
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}
