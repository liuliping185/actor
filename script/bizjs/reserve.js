var preid = GetQueryString("preid");
var ownerid = GetQueryString("ownerid");
var pretype = GetQueryString("pretype");
var id = GetQueryString("id");

$(function(){
    $("#reserveTime").hide();
    $('body').height($('body')[0].clientHeight);

    $(".flip").mouseover(function() {
      // $("#sjimg").style.transform = "rotate(180deg))";
      $("#reserveTime").show();
    });

    $(".content").mouseleave(function() {
      // $("#sjimg").style.transform = "rotate(180deg))";
      $("#reserveTime").hide();
    });

    var actionUrl = ""
    var nickname = "";
    var rolename = "";
    var price = "";
    var infos = "";
    var area = "";

    switch(pretype){
        case "actor":
            actionUrl = path + "/ActorInterface/actor/getAcotrById.action?actId=" + preid;
        break;
        case "scene":
            actionUrl = path + "/ActorInterface/scene/getSceneById.action?sceneId=" + preid;
        break;
        case "subject":
            actionUrl = path + "/ActorInterface/subject/getSubjectById.action?subjectId=" + preid;
        break;
        case "screenwriter":
            actionUrl = path + "/ActorInterface/screenwriter/getScreenwriterById.action?screenwriterId=" + preid;  // 编剧
        break;
        case "director":
            actionUrl = path + "/ActorInterface/director/getDirectorById.action?directorId=" + preid;  // 导演
        break;
        case "producer":
            actionUrl = path + "/ActorInterface/producer/getProducerById.action?producerId=" + preid;  // 制片
        break;
        case "clothing":
            actionUrl = path + "/ActorInterface/clothing/getClothingById.action?clothingId=" + preid;  // 服装
        break;
        case "equipment":
            actionUrl = path + "/ActorInterface/equipment/getEquipmentById.action?equipmentId=" + preid;  // 设备
        break;
        case "camerateam":
            actionUrl = path + "/ActorInterface/camerateam/getCamerateamById.action?camerateamId=" + preid;  // 摄影组
        break;
        case "investment":
            actionUrl = path + "/ActorInterface/investment/getInvestmentById.action?investmentId=" + preid;  // 投资
        break;
    }

    $.post(actionUrl,{
        token:localStorage.token
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data);

        if (data.success) {

          var loginname = "";
          var reserveTime = "";
          data.fiveOrder.forEach(function(i){
                reserveTime += "<div style='margin-top:10px;'>";
                loginname = i.loginname.substring(0,2) + "*";
                reserveTime += "<span style='color:#9D9D9D;font-size:12px;'>";
                reserveTime += i.prestart + " - " + i.preend;
                reserveTime += "</span>";
                reserveTime += "<span style='color:#9D9D9D;font-size:12px;margin-left:10%;'>" + loginname+ "</span>"

                reserveTime += "</div>";
          });

          if("" != reserveTime){
                $("#reserveTime").html(reserveTime);
          }

          switch(pretype){
              case "actor":
                  nickname = data.actinfo.nickname;
                  rolename = "演员";
                  price = data.actinfo.price + "/" + data.actinfo.unit;
                  infos = data.actinfo.infos;
                  $("#imgpath").attr("src", data.actinfo.firstimg);
                  area = data.actinfo.provience + data.actinfo.city + data.actinfo.district;

              break;
              case "scene":
                  nickname = data.sceneinfo.scenename;
                  rolename = "场景";
                  price = data.sceneinfo.price + "/" + data.sceneinfo.unit;
                  infos = data.sceneinfo.sceneinfos;
                  $("#imgpath").attr("src", data.sceneinfo.firstimg);
                  area = data.sceneinfo.provience + data.sceneinfo.city + data.sceneinfo.district;
              break;
              case "subject":
                  nickname = data.subjectinfo.subjectname;
                  rolename = "道具";
                  if(data.subjectinfo.saleprice){
                      price = data.subjectinfo.saleprice + "/元";
                  }else{
                      price = data.subjectinfo.rentprice + "/" + data.subjectinfo.rentunit;
                  }

                  infos = data.subjectinfo.subjectinfos;
                  $("#imgpath").attr("src", data.subjectinfo.firstimg);
                  area = data.subjectinfo.provience + data.subjectinfo.city + data.subjectinfo.district;
              break;
              case "screenwriter":
                  nickname = data.screenwriterinfo.screenwritername;
                  rolename = "编辑";
                  price = data.screenwriterinfo.price + "/" + data.screenwriterinfo.unit;
                  infos = data.screenwriterinfo.screenwriterinfos;
                  $("#imgpath").attr("src", data.screenwriterinfo.firstimg);
                  area = data.screenwriterinfo.provience + data.screenwriterinfo.city + data.screenwriterinfo.district;
              break;
              case "director":
                  nickname = data.directorinfo.directorname;
                  rolename = "导演";
                  price = data.directorinfo.price + "/" + data.directorinfo.unit;
                  infos = data.directorinfo.directorinfos;
                  $("#imgpath").attr("src", data.directorinfo.firstimg);
                  area = data.directorinfo.provience + data.directorinfo.city + data.directorinfo.district;
              break;
              case "producer":
                  nickname = data.producerinfo.producername;
                  rolename = "制片";
                  price = data.producerinfo.price + "/" + data.producerinfo.unit;
                  infos = data.producerinfo.producerinfos;
                  $("#imgpath").attr("src", data.producerinfo.firstimg);
                  area = data.producerinfo.provience + data.producerinfo.city + data.producerinfo.district;
              break;
              case "clothing":
                  nickname = data.clothinginfo.clothingname;
                  rolename = "服装";
                  if(data.clothinginfo.saleprice){
                      price = data.clothinginfo.saleprice + "/元";
                  }else{
                      price = data.clothinginfo.rentprice + "/" + data.clothinginfo.rentunit;
                  }
                  infos = data.clothinginfo.clothinginfos;
                  $("#imgpath").attr("src", data.clothinginfo.firstimg);
                  area = data.clothinginfo.provience + data.clothinginfo.city + data.clothinginfo.district;
              break;
              case "equipment":
                  nickname = data.equipmentinfo.equipmentname;
                  rolename = "设备";
                  if(data.equipmentinfo.saleprice){
                      price = data.equipmentinfo.saleprice + "/元";
                  }else{
                      price = data.equipmentinfo.rentprice + "/" + data.equipmentinfo.rentunit;
                  }
                  infos = data.equipmentinfo.equipmentinfos;
                  $("#imgpath").attr("src", data.equipmentinfo.firstimg);
                  area = data.equipmentinfo.provience + data.equipmentinfo.city + data.equipmentinfo.district;
              break;
              case "camerateam":
                  nickname = data.camerateaminfo.camerateamname;
                  rolename = "摄影组";
                  price = data.camerateaminfo.price + "/" + data.camerateaminfo.unit;
                  infos = data.camerateaminfo.camerateaminfos;
                  $("#imgpath").attr("src", data.camerateaminfo.firstimg);
                  area = data.camerateaminfo.provience + data.camerateaminfo.city + data.camerateaminfo.district;
              break;
              case "investment":
                  nickname = data.investmentinfo.investmentname;
                  rolename = "投资";
                  if(data.investmentinfo.investmentprice){
                      price = data.investmentinfo.investmentprice + "/元";
                  }
                  infos = data.investmentinfo.investmentinfos;
                  $("#imgpath").attr("src", data.investmentinfo.firstimg);
                  area = data.investmentinfo.provience + data.investmentinfo.city + data.investmentinfo.district;
              break;
          }

          $("#area").val(area);
          $("#nickname").val(nickname);
          $("#rolename").val(rolename);
          $("#price").val(price);
          $("#infos").val(infos);
          // $("#area").val("天津市南开区");
        }
      });

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
    $("#preid").val(preid);
    $("#pretype").val(pretype);
    $("#ownerid").val(ownerid);

    var prestart = $("#prestart").val();
    var preend = $("#preend").val();
    var prephone = $("#prephone").val();

    if(!prestart){
        dialog.alert({
            title:"请输入开始时间！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return false;
  	}

    if(!preend){
        dialog.alert({
            title:"请输入结束时间！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return false;
  	}

    if("" != prephone && !/^1[3,5,7,8,9]\d{9}$/.test(prephone) ){
        dialog.alert({
            title:"手机号格式不正确！",
            msg:'',
            buttons:['确定']
        },function(ret){

        })
    		return false;
  	}

    var actionURL = "";

    if(id && ""!= id){
      actionURL = path + "/ActorInterface/preorder/confirmPreorder.action?token=" + localStorage.token;
      $("#hi_id").val(id);
    }else{
        actionURL = path + "/ActorInterface/preorder/addPreorder.action?token=" + localStorage.token;
    }

    $("#prestatus").val("P");

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
                alert("预约成功!");
                window.location.href = "roleDetails.html?role=" + pretype + "&id=" + preid;
  					}else{
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){

                })
  					}
				}
    });
}

function reserveTime (){
    var display =$('#reserveTime').css('display');
    if(display == 'none'){
      $('#reserveTime').show();
    }else{
      $('#reserveTime').hide();
    }
}
