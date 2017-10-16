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
          startYear:currYear - 200, //开始年份
          endYear:currYear + 10 //结束年份
    };

    $("#birthday").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
      var optDateTime = $.extend(opt['datetime'], opt['default']);
      var optTime = $.extend(opt['time'], opt['default']);
      $("#birthdayTime").mobiscroll(optDateTime).datetime(optDateTime);
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

apiready = function() {
api.addEventListener({
    name:'clip_success'
}, function(ret, err){
    if( ret ){
         var jsonstr= JSON.stringify(ret);
		//  alert(jsonstr);
        // var urlObj = ret.value;

					var imgSrc = ret.value.new_img_url;
          // alert(imgSrc);

                    var img1=new Image();
                    img1.crossOrigin = '';
                    img1.src = imgSrc;
                    img1.style = "width: 100%; height: 100%;";

                    img1.onload = function() {
                      if(img1.complete){
                        //  alert(img1.complete);
                         database = getBase64Image(img1);

                         $("#idcardFront_").val(database);
                         $('#idcardFront').attr('src', database);
                      }
                    };
    }else{
         alert( JSON.stringify( err ) );
    }
});
}

// 完善个人信息开始

function perfectPersonalInfo(){
    var phone = $("#phone").val();
    var email = $("#email").val();
    var banknumber = $("#banknumber").val();
    console.log(phone);

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

    var actionURL = path + "/ActorInterface/member/finishInfomation.action?token=" + localStorage.token;
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
                        window.location.href="info.html";
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
function showAction(num){
    console.log(num)
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
                      // $("#idcardFront_").val(ret.base64Data);
                      // $('#idcardFront').attr('src', ret.base64Data);

                      openImageClipFrame(ret.data);

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

function openImageClipFrame(img_src){
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
    },
    vScrollBarEnabled : false,
    hScrollBarEnabled : false,
    //页面是否弹动 为了下拉刷新使用
    bounces : false
  });
}
