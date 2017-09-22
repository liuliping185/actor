
var multipleGraphsList = [];
$("#imgUpload").html("");
var role = GetQueryString("role");

$(function(){
    // console.log(localStorage.token)
    $('body').height($('body')[0].clientHeight);
    // 获取session
    $.post("http://192.168.0.129:8080/ActorInterface/member/getSessionMember.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            //自定义alert
            dialog.alert({
                title: data.message,
                msg:'',
                buttons:['确定']
            },function(ret){
                if(ret){
                    $("#realname").val(data.memberinfo.realname);
                    // $("#nickname").val(data.memberinfo.nickname);
                    // $(".sex:checked").val(data.memberinfo.sex);
                    // $("#age").val(data.memberinfo.age);
                    // $("#infos").val(data.memberinfo.infos);
                    // $("#height").val(data.memberinfo.height);
                    // $("#weight").val(data.memberinfo.weight);
                    // $("#experience").val(data.memberinfo.experience);
                    $("#birthday").val(data.memberinfo.birthday);
                    // $("#provience").val(data.memberinfo.provience);
                    // $("#city").val(data.memberinfo.city);
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

/** 编辑角色信息 **/
function editRoleInfo(){
    var infoid = GetQueryString("infoid");
    // var provience = $("#provience").val();
    // var city = $("#city").val();
    // var area = $("#area").val();
    //
    // if("" === provience){
    //   dialog.alert({
    //       title:"请选择所在省",
    //       msg:'',
    //       buttons:['确定']
    //   },function(ret){
    //
    //   })
  	// 	return false;
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
  	// 	return false;
    // }
    //
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
    // if("" === area){
    //   dialog.alert({
    //       title:"请选择所在市",
    //       msg:'',
    //       buttons:['确定']
    //   },function(ret){
    //
    //   })
    //   return false;
    // }

    var actionURL = "";

    if(infoid){
        actionURL = path + "/ActorInterface/actor/actorUpdate.action?token=" + localStorage.token + "&role=" + role;
    }else{
        actionURL = path + "/ActorInterface/actor/actorApply.action?token=" + localStorage.token + "&role=" + role;
    }
    
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
  					if(data.success){
                window.location.href = "../personalRoleManage/editRoleInfo.html?role=" + role;
  					}else{
  					}
				}
    });
    //window.location.href = "../personalRoleManage/editRoleInfo.html?role=" + role;
}

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

            var imgId = 0;
            ret.list.forEach(function(i){
                imgId++ ;
                var jsonArray = {}
                var image = new Image();
                image.crossOrigin = '';
                image.src = i.thumbPath;
                image.id = imgId;
                image.style = "width: 100%; height: 100%;";

                image.onload = function(){
                    alert("--------" + image.complete);
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
                            // alert($("#multipleGraphsList").val());
                            window.location.href= "../personalRoleManage/ditRoleInfo.html";
                        }
                     }
                 }
                 $("#imgUpload").append(image);
                 $("#imgUpload").append("<div class='info' align='right'><button type='button' class='btn btn-danger' onclick=delpic(' + imgId + ')>删除</button></div>");

            });
          }
       }
    );
}

//删除图片
function delpic(imgId){
  alert(imgId);
	$('#imgUpload').find("#"+imgId).remove();
	deleteData(imgId);
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

// 多图上传图片结束
