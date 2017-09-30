var preid = GetQueryString("preid");
var ownerid = GetQueryString("ownerid");
var pretype = GetQueryString("pretype");
console.log(preid + "------" + ownerid + "------" + pretype);

$(function(){
    $('body').height($('body')[0].clientHeight);
    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.beginDate = {preset : 'datetime' , minDate: new Date()};
    opt.endDate = {preset : 'datetime' , minDate: new Date()};
    //opt.datetime = { preset : 'datetime', minDate: new Date(), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
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

    $("#prestart").val('').scroller('destroy').scroller($.extend(opt['beginDate'], opt['default']));
    $("#preend").val('').scroller('destroy').scroller($.extend(opt['endDate'], opt['default']));
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

// 提交预约信息
function reserve(){
    //console.log(preid+ "------" + pretype + "------" + ownerid);
    $("#preid").val(preid);
    $("#pretype").val(pretype);
    $("#ownerid").val(ownerid);

    var prephone = $("#prephone").val();
    if("" != prephone && !/^1[3,5,7,8,9]\d{9}$/.test(prephone) ){
        dialog.alert({
            title:"手机号格式不正确！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return false;
  	}

    var actionURL = path + "/ActorInterface/preorder/addPreorder.action?token=" + localStorage.token;

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
                alert("预约成功");
                window.location.href = "actorDetails.html?role=" + pretype + "&id=" + preid;
  					}else{
  					}
				}
    });
}
