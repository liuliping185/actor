var dialog = new auiDialog();

$(function(){
    $('body').height($('body')[0].clientHeight);

    // 获取session
    $.post(path + "/ActorInterface/member/getMemberDetail.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);
        if (data.success) {
            $("#loginname").val(data.memberinfo.loginname);
            $("#nickname").val(data.memberinfo.nickname);
            $("#birthday").val(data.memberinfo.birthday);
            $("#realname").val(data.memberinfo.realname);
            $("#phone").val(data.memberinfo.phone);
            $("#address").val(data.memberinfo.address);
            $("#alipay").val(data.memberinfo.alipay);
            $("#wechat").val(data.memberinfo.wechat);
            $("#banknumber").val(data.memberinfo.banknumber);
            $("#email").val(data.memberinfo.email);

            var provience = data.memberinfo.provience;
            var city = data.memberinfo.city;
            var district = data.memberinfo.district;

            $("#distpicker3").distpicker({
                province: provience,
                city: city,
                district: district
            });

            $('#headerimg').attr('src', data.memberinfo.headerimg);
            if(data.memberinfo.idcardFront && "" != data.memberinfo.idcardFront){
                $('#idcardFront').attr('src', data.memberinfo.idcardFront);
            }

            if(data.memberinfo.idcardBack && "" != data.memberinfo.idcardBack){
                $('#idcardBack').attr('src', data.memberinfo.idcardBack);
            }

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
});

// 完善个人信息开始
function perfectPersonalInfo(){
    var phone = $("#phone").val();
    var email = $("#email").val();
    var banknumber = $("#banknumber").val();
    var provience = $("#provience").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var idcardFront = $("#idcardFront_").val();
    var idcardBack = $("#idcardBack_").val();
    var nickname = $("#nickname").val();

    if("" === nickname){
        dialog.alert({
            title:"昵称不能为空！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
        return  false;
    }

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

    // if("" === provience){
    //   dialog.alert({
    //       title:"请选择所在省",
    //       msg:'',
    //       buttons:['确定']
    //   },function(ret){
    //
    //   })
    //   return false;
    // }
    //
    // if("" === city){
    //   dialog.alert({
    //       title:"请选择所在市",
    //       msg:'',
    //       buttons:['确定']
    //   },function(ret){
    //
    //   })
    //   return false;
    // }
    //
    // if("" === area){
    //   dialog.alert({
    //       title:"请选择所在区",
    //       msg:'',
    //       buttons:['确定']
    //   },function(ret){
    //
    //   })
    //   return false;
    // }

    // if(!idcardFront){
    //     dialog.alert({
    //         title:"请选择身份证正面图片",
    //         msg:'',
    //         buttons:['确定']
    //     },function(ret){
    //     })
    //     return false;
    // }
    //
    // if(!idcardBack){
    //     dialog.alert({
    //         title:"请选择身份证反面图片",
    //         msg:'',
    //         buttons:['确定']
    //     },function(ret){
    //     })
    //     return false;
    // }

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
              if("1" === num){
                  openImageClipFrame(ret.data, 'idcardFront', '../photoCut.html');
                  // $("#idcardFront_").val(ret.base64Data);


              }else if("2" === num){
                  openImageClipFrame(ret.data, 'idcardBack', '../photoCut.html');
                  // $("#idcardBack_").val(ret.base64Data);
              }
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
                      openImageClipFrame(ret.data, 'idcardFront', '../photoCut.html');
                      // $("#idcardFront_").val(ret.base64Data);


                  }else if("2" === num){
                      openImageClipFrame(ret.data, 'idcardBack', '../photoCut.html');
                      // $("#idcardBack_").val(ret.base64Data);
                  }
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}

// 上传图片结束
