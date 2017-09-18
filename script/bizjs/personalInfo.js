var dialog = new auiDialog();

$(function(){
    // 获取session
    $.post("http://192.168.0.129:8080/ActorInterface/member/getSessionMember.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        if (data.success) {
            //自定义alert
            dialog.alert({
                title: data.message,
                msg:'',
                buttons:['确定']
            },function(ret){

                if(ret){
                  $("#loginname").val(data.memberinfo.loginname);
                  $("#phone").val(data.memberinfo.phone);

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
    });
});

// 完善个人信息开始

function perfectPersonalInfo(){
    var loginname = $("#loginname").val(); // 用户名
    var gender = $("input:radio[name='gender']:checked").val(); // 性别
    var birthday = $("#birthday").val(); // 生日
    var email = $("#email").val(); // 邮箱
    var address = $("#address").val(); // 地址
    var phone = $("#phone").val(); // 手机号
    var realname = $("#realname").val(); // 真是姓名
    var headerimg = $("#headerimg_").val(); // 头像上传图片的地址（base64）
    var idcard_front = $("#idcard_front_").val(); // 身份证正面上传图片的地址
    var idcard_back = $("#idcard_back_").val(); // 身份证反面上传图片的地址
    var banknumber = $("#banknumber").val(); // 银行卡号
    var alipay = "支付宝";// 支付宝
    var wechat = "wechat";// 微信

    if("" != phone && !/^1[3,5,7,8,9]\d{9}$/.test(phone) ){
        dialog.alert({
            title:"手机号格式不正确！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return false;
  	}

  	if("" != email && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
        dialog.alert({
            title:"邮箱格式不正确！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return  false;
  	}

    if("" != banknumber && !/^([1-9]{1})(\d{11}|\d{18})$/.test(banknumber)){
        dialog.alert({
            title:"银行卡号格式不正确！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return  false;
  	}

    $.post("http://192.168.0.129:8080/ActorInterface/member/finishInfomation.action",{
        token: localStorage.token,
        loginname: loginname,
        gender: gender,
        birthday: birthday,
        email: email,
        address: address,
        phone: phone,
        realname: realname,
        headerimg: headerimg,
        idcard_front: idcard_front,
        idcard_back: idcard_back,
        banknumber: banknumber,
        alipay: alipay,
        wechat: wechat
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if (data.success) {
            //自定义alert
            dialog.alert({
                title: data.message,
                msg:'',
                buttons:['确定']
            },function(ret){

                if(ret){


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
    });
}

// 完善个人信息结束

// 上传图片开始
// 单张图片上传，可拍照
function showAction(){
//   var UIMediaScanner = api.require('UIMediaScanner');
//   UIMediaScanner.open({
//     type: 'picture',
//     column: 4,
//     classify: true,
//     max: 4,
//     sort: {
//       key: 'time',
//       order: 'desc'
//     },
//     texts: {
//       stateText: '已选择*项',
//       cancelText: '取消',
//       finishText: '完成'
//     },
//     styles: {
//       bg: '#fff',
//       mark: {
//         icon: '',
//         position: 'bottom_left',
//         size: 20
//       },
//       nav: {
//         bg: '#eee',
//         stateColor: '#000',
//         stateSize: 18,
//         cancelBg: 'rgba(0,0,0,0)',
//         cancelColor: '#000',
//         cancelSize: 18,
//         finishBg: 'rgba(0,0,0,0)',
//         finishColor: '#000',
//         finishSize: 18
//       }
//     },
//     scrollToBottom: {
//       intervalTime: 3,
//       anim: true
//     },
//     exchange: true,
//     rotation: true
//   }, function(ret) {
//     if (ret) {
//       $("#headerimgload").html("");
//       for(var i=0; i<ret.list.length; i++){
//         alert(ret.list[i].path);
//         $("#headerimgload").append("<img style='width:100%;height:100%;' src='ret.list[i].path'/>");
//       }
//       // $('#headerimg').attr('src', ret.list[0].path);
//       // for(var i=0; i<ret.list.length; i++){
//       //   alert(ret.list[i]);
//       // }
//       alert(JSON.stringify(ret));
//     }
//   });
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
                $("#imgBase64").val(ret.base64Data);
                $('#headerimg').attr('src', ret.base64Data);
            }else {
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
                  // alert(JSON.stringify(ret));
                    $("#headerimg_").val(ret.base64Data);
                    $("#idcard_front_").val(ret.base64Data);
                    $("#idcard_back_").val(ret.base64Data);
                    $('#headerimg').attr('src', ret.base64Data);
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}

// 上传图片结束
