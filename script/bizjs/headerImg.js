var dialog = new auiDialog();

$(function(){
    $('body').height($('body')[0].clientHeight);

    // 获取session
    $.post(path + "/ActorInterface/member/getSessionMember.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if (data.success) {
          $(".addPic").hide();
            // $("#loginname").val(data.memberinfo.loginname);
            // $("#birthday").val(data.memberinfo.birthday);
            // $("#realname").val(data.memberinfo.realname);
            // $("#phone").val(data.memberinfo.phone);
            // $("#address").val(data.memberinfo.address);
            // $("#alipay").val(data.memberinfo.alipay);
            // $("#wechat").val(data.memberinfo.wechat);
            // $("#banknumber").val(data.memberinfo.banknumber);
            // $("#email").val(data.memberinfo.email);
            $('#headerImg').attr('src', data.memberinfo.headerimg);
            $("#headerImg_").val(data.memberinfo.headerimg);
            // $('#idcardFront').attr('src', data.memberinfo.idcardFront);
            // $('#idcardBack').attr('src', data.memberinfo.idcardBack);
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

// 完善个人信息开始

function perfectPersonalInfo(){
    if(!$("#headerImg_").val()){
        dialog.alert({
            title:"请上传图片",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
        return false;
    }

    var actionURL = path + "/ActorInterface/member/uploadHeadImg.action?token=" + localStorage.token;
    $.ajax({
				cache : true,
				type  : "POST",
				url   : actionURL,
				data  :$('#postForm').serialize(),
				async : true,
				error : function(request) {
				    alert("error");
				},
				success : function(data) {
          var data = JSON.parse(data);
  					if(data.success){
                dialog.alert({
                    title: data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){

                    if(ret){
                      // $("#headerimg").attr("")

                    }
                });
  					}else{
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){
                    console.log(ret)
                })
  					}
				}
    });
}

// 完善个人信息结束

// 上传图片开始
// 单张图片上传，可拍照
function showAction(){
    api.actionSheet({
        title: '上传图片',
        cancelTitle: '取消',
        buttons: ['拍照','从手机相册选择']
    }, function(ret, err) {
        if (ret) {
            getPicture(ret.buttonIndex);
        }
    });
}

function getPicture(sourceType) {
    if(sourceType==1){ // 拍照
        api.getPicture({
            sourceType: 'camera',
            encodingType: 'jpg',
            mediaValue: 'pic',
            allowEdit: false,
            destinationType: 'base64',
            quality: 90,
            saveToPhotoAlbum: true
        }, function(ret, err) {
          if (ret) {

            $(".addPic").hide();
            $.post(path + "/ActorInterface/index/uploadImgs.action",{
                imgpath:ret.base64Data
              }, function(data) {
                var data = JSON.parse(data);

                if (data.success) {

                    $("#headerImg_").val(data.imgpath);
                    $("#headerImg").attr("src",data.imgpath);
                }
            });
          } else {
              alert(JSON.stringify(err));
          }
        });
    }
    else if(sourceType==2){ // 从相机中选择
        api.getPicture({
                sourceType: 'library',
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'base64',
                quality: 50,
                targetWidth: 750,
                targetHeight: 750

            }, function(ret, err) {
                if (ret) {


                  $(".addPic").hide();
                  $.post(path + "/ActorInterface/index/uploadImgs.action",{
                      imgpath:ret.base64Data
                    }, function(data) {
                      var data = JSON.parse(data);
                      console.log(data);

                      if (data.success) {
                          $(".addPic").hide();
                          openImageClipFrameHeaderImg(ret.data,'headerimg');
                          // $("#headerImg_").val(data.imgpath);
                          // $("#headerImg").attr("src",data.imgpath)
                      }
                  });
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}

// 上传图片结束

// 截图功能
function openImageClipFrameHeaderImg(img_src,type){
  api.openFrame({
    name : 'main',
    scrollToTop : true,
    allowEdit : true,
    url : '../photoCut.html',
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
