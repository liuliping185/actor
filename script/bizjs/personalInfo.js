var dialog = new auiDialog();

$(function(){
    $('body').height($('body')[0].clientHeight);

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
                    $("#birthday").val(data.memberinfo.birthday);
                    $("#realname").val(data.memberinfo.realname);
                    $("#phone").val(data.memberinfo.phone);
                    $("#address").val(data.memberinfo.address);
                    $("#alipay").val(data.memberinfo.alipay);
                    $("#wechat").val(data.memberinfo.wechat);
                    $("#banknumber").val(data.memberinfo.banknumber);
                    $("#email").val(data.memberinfo.email);
                    $('#headerimg').attr('src', data.memberinfo.headerimg);
                    $('#idcardFront').attr('src', data.memberinfo.idcardFront);
                    $('#idcardBack').attr('src', data.memberinfo.idcardBack);
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

    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
      theme: 'android-ics light', //皮肤样式
          display: 'modal', //显示方式
          mode: 'scroller', //日期选择模式
      lang:'zh',
          startYear:currYear - 10, //开始年份
          endYear:currYear + 10 //结束年份
    };

    $("#appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
      var optDateTime = $.extend(opt['datetime'], opt['default']);
      var optTime = $.extend(opt['time'], opt['default']);
      $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
      $("#appTime").mobiscroll(optTime).time(optTime);

    //下面注释部分是上面的参数可以替换改变它的样式
    //希望一起研究插件的朋友加我个人QQ也可以，本人也建个群 291464597 欢迎进群交流。哈哈。这个不能算广告。
    // 直接写参数方法
    //$("#scroller").mobiscroll(opt).date();
    // Shorthand for: $("#scroller").mobiscroll({ preset: 'date' });
    //具体参数定义如下
      //{
      //preset: 'date', //日期类型--datatime --time,
      //theme: 'ios', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】
                  //【wp light】【wp】
      //mode: "scroller",//操作方式【scroller】【clickpick】【mixed】
      //display: 'bubble', //显示方【modal】【inline】【bubble】【top】【bottom】
      //dateFormat: 'yyyy-mm-dd', // 日期格式
      //setText: '确定', //确认按钮名称
      //cancelText: '清空',//取消按钮名籍我
      //dateOrder: 'yymmdd', //面板中日期排列格
      //dayText: '日',
      //monthText: '月',
      //yearText: '年', //面板中年月日文字
      //startYear: (new Date()).getFullYear(), //开始年份
      //endYear: (new Date()).getFullYear() + 9, //结束年份
      //showNow: true,
      //nowText: "明天",  //
      //showOnFocus: false,
      //height: 45,
      //width: 90,
      //rows: 3}


});

apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    api.parseTapmode();
    //funIniGroup();
}

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
function randomSwitchBtn( tag ) {
    if( tag == $api.dom('#footer li.active') )return;
    var eFootLis = $api.domAll('#footer li'),
        eHeaderLis = $api.domAll('header li'),
        index = 0;
    for (var i = 0,len = eFootLis.length; i < len; i++) {
        if( tag == eFootLis[i] ){
            index = i;
        }else{
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls( eFootLis[index], 'active');
    $api.addCls( eHeaderLis[index], 'active');
}

// 完善个人信息开始

function perfectPersonalInfo(){
    var loginname = $("#loginname").val(); // 用户名
    var birthday = $("#birthday").val(); // 生日
    var email = $("#email").val(); // 邮箱
    var address = $("#address").val(); // 地址
    var phone = $("#phone").val(); // 手机号
    var realname = $("#realname").val(); // 真是姓名
    var headerimg = $("#headerimg_").val(); // 头像上传图片的地址（base64）
    var idcardFront = $("#idcardFront_").val(); // 身份证正面上传图片的地址
    var idcardBack = $("#idcardBack_").val(); // 身份证反面上传图片的地址
    var banknumber = $("#banknumber").val(); // 银行卡号
    var alipay = $("#alipay").val(); // 支付宝
    var wechat = $("#wechat").val(); // 微信

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
        birthday: birthday,
        email: email,
        address: address,
        phone: phone,
        realname: realname,
        headerimg: headerimg,
        idcardFront: idcardFront,
        idcardBack: idcardBack,
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
function showAction(num){
  console.log(num)
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
            getPicture(ret.buttonIndex, num);
        }
    });
}

function getPicture(sourceType, num) {
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
                  if("1" === num){
                      $("#idcardFront_").val(ret.base64Data);
                      $('#idcardFront').attr('src', ret.base64Data);
                  }else if("2" === num){
                      $("#idcardBack_").val(ret.base64Data);
                      $('#idcardBack').attr('src', ret.base64Data);
                  }else if("3" === num){
                      $("#headerimg_").val(ret.base64Data);
                      $('#headerimg').attr('src', ret.base64Data);
                  }
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}

// 上传图片结束
