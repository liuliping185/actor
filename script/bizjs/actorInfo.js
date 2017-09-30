
var multipleGraphsList = [];
$("#imgUpload").html("");
var role = GetQueryString("role");

$(function(){
    // console.log(localStorage.token)
    $('body').height($('body')[0].clientHeight);
    // 获取session
    $.post(path + "/ActorInterface/member/getSessionMember.action",{
        token:localStorage.token,
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
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
    var provience = $("#provience").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var age = $("#age").val();
    var height = $("#height").val();
    var weight = $("#weight").val();

    if("" != age && !/^[1-9]\d{0,2}$/.test(age)){
      dialog.alert({
          title:"年龄格式不正确！",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }

    if("" != height && !/^[1-9]\d{0,2}$/.test(height)){
      dialog.alert({
          title:"身高格式不正确！",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }

    if("" != weight && !/^[1-9]\d{0,2}$/.test(weight)){
      dialog.alert({
          title:"体重格式不正确！",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }

    if("" === provience){
      dialog.alert({
          title:"请选择所在省",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
  		return false;
    }

    if("" === city){
      dialog.alert({
          title:"请选择所在市",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
  		return false;
    }

    if("" === provience){
      dialog.alert({
          title:"请选择所在省",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }

    if("" === area){
      dialog.alert({
          title:"请选择所在市",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }

    if(!$("#multipleGraphsList").val() && !infoid){
        dialog.alert({
            title:"请上传图片",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
        return false;
    }

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
            var data = JSON.parse(data);
  					if(data.success){
                window.location.href = "../personalRoleManage/editRoleInfo.html?role=" + role;
  					}else{
  					}
				}
    });
    //window.location.href = "../personalRoleManage/editRoleInfo.html?role=" + role;
}
