
var multipleGraphsList = [];
var role = GetQueryString("role");
console.log(role)
var id = GetQueryString("id");
var infoid = "";
var smallid = "";

var multipleGraphsList2 = [];

$(function(){


	 $.post(path + "/ActorInterface/index/findBigType.action",{

        typeinfo: 'actor'
      }, function(data) {
        var data = JSON.parse(data);

        if (data.success) {

					 data.infoList.forEach(function(i){

						$("#bigtype").append("<option value="+i.id+">"+i.typename+"</option>");

					});

		}

	  });


    $('body').height($('body')[0].clientHeight);

	if(id!=null){

			var actionUrl = path + "/ActorInterface/actor/getAcotrById.action?actId=" + id;

			console.log(actionUrl);
			$.post(actionUrl,{
				token:localStorage.token
			  }, function(data) {
				var data = JSON.parse(data);
				console.log(data)
				// alert(JSON.stringify(data));
				if (data.success) {
					$(".addPicFirstimg").hide();
					$(".addPicLunboimg").hide();

					var imgs = "";
					var flag = 0;
					$("#imgUpload").html("");
					data.imgs.forEach(function(i){

						flag ++;

						imgs += "<span style='width30%;margin-left:3%;'>";
						// imgs += "<div style='background-color:#00ffff;width:100%;' align='right'>a</div>"

						imgs += "<div name=" + i.id +" style='' align='right'><div class='info'  style='margin-top:10px;' onclick=delpic_edit('" + i.id + "')><img src='../../image/delete.png' style='width:13px;'/></div></div>";
						imgs += "<img id='" + i.id + "'style='width:93px;height:93px;float:left;margin-top:-13px;' src='" + i.imgpath + "'/>";
						imgs += "</span>";

						var jsonArray = {base64Data:i.imgpath,fileId:i.id};
						multipleGraphsList2.push(jsonArray);
				})

				$("#imgUpload").html(imgs);

							$("#realname").val(data.actinfo.realname);
							$("#nickname").val(data.actinfo.nickname);

							var sex = data.actinfo.sex;
							if(sex == '女'){
								$("#women").prop("checked",true);
							}else{
								$("#man").prop("checked",true);
							}

							var selDiv = "";

							selDiv+="<div  id='distpicker3' >";

							selDiv+="<table>";
							selDiv+="<tr>";
							selDiv+="<td>";
							selDiv+="      <select  id='provience' name='provience'></select>";
							selDiv+=" </td>";
							selDiv+="<td>";
							selDiv+="	&nbsp;";
							selDiv+="</td>";
							selDiv+="<td>";
							selDiv+="	<img src='../../image/sj.png' style='width:10px;height:10px;'>";
							selDiv+="</td>";
							selDiv+="</tr>";
							selDiv+="</table>";
							selDiv+="";
							selDiv+="<table>";
							selDiv+="<tr>";
							selDiv+="<td>";
							selDiv+="      <select id='city' name='city'></select>";
							selDiv+=" </td>";
							selDiv+="<td>";
							selDiv+="	&nbsp;";
							selDiv+="</td>";
							selDiv+="<td>";
							selDiv+="	<img src='../../image/sj.png' style='width:10px;height:10px;'>";
							selDiv+="</td>";
							selDiv+="</tr>";
							selDiv+="</table>";
							selDiv+="";
							selDiv+="<table>";
							selDiv+="<tr>";
							selDiv+="<td>";
							selDiv+="      <select  id='district' name='district'></select>";
							selDiv+=" </td>";
							selDiv+="<td>";
							selDiv+="	&nbsp;";
							selDiv+="</td>";
							selDiv+="<td>";
							selDiv+="	<img src='../../image/sj.png' style='width:10px;height:10px;'>";
							selDiv+="</td>";
							selDiv+="</tr>";
							selDiv+="</table>";
							selDiv+=" </div>";

							$("#disDiv").html(selDiv);


							var provience = data.actinfo.provience;
							var city = data.actinfo.city;
							var district = data.actinfo.district;

							$("#distpicker3").distpicker({
								  province: provience,
								  city: city,
								  district: district
							});


							$("#age").val(data.actinfo.age);
							$("#height").val(data.actinfo.height);
							$("#weight").val(data.actinfo.weight);
							$("#birthday").val(data.actinfo.birthday);
							$("#experience").val("    " +data.actinfo.experience);
							$("#infos").val("    " +data.actinfo.infos);
							$("#price").val(data.actinfo.price);
							$("#keywords").val("    " + data.actinfo.keywords);
							if(data.actinfo.workarea){
								$("#workarea").val("    " + data.actinfo.workarea);
							}
							$("#firstimg").attr("src",data.actinfo.firstimg);
	            $("#lunboimg").attr("src",data.actinfo.lunboimg);
							$("#firstimg_").val(data.actinfo.firstimg);
							$("#lunboimg_").val(data.actinfo.lunboimg);


							$("#hi_evaSum").val(data.actinfo.evaSum);
							$("#hi_goodSum").val(data.actinfo.goodSum);
							$("#hi_professionalScore").val(data.actinfo.professionalScore);
							$("#hi_serviceScore").val(data.actinfo.serviceScore);
							$("#hi_attentionSum").val(data.actinfo.attentionSum);
							$("#hi_firstimg").val(data.actinfo.firstimg);
							$("#hi_actorstatus").val(data.actinfo.actorstatus);
							$("#hi_memberid").val(data.actinfo.memberid);
							$("#hi_createtime").val(data.actinfo.createtime);

							if(data.actinfo.unit){
									$("#unitsImg").hide();
									$("#unit").val(data.actinfo.unit);
							}

							$("#bigtype").val(data.actinfo.bigid);
							smallid = data.actinfo.smallid;
							getSmallType(data.actinfo.bigid);


							// $("#isfollow").prop("checked", true);



							// $("#imgUploa").html(imgs);
							//
							// data.imgs.forEach(function(i){
							// 	var image = new Image();
							// 	image.crossOrigin = '';
							// 	image.id = i.id;
							// 	image.src = i.imgpath;
							// 	image.style = "width: 100%; height: 100%;";
							//
							// 	$("#imgUpload").append(image);
							// 	$("#imgUpload").append("<span name=" + i.id +"><div class='info' align='right'><button type='button' class='btn btn-danger' onclick=delpic_edit('" + i.id + "')>删除</button></div></span>");
							//
							//
							// 	var jsonArray = {base64Data:i.imgpath,fileId:i.id};
							// 	multipleGraphsList2.push(jsonArray);
							//
							//
							// });

				}
			});


	}


    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date', maxDate: new Date()};
    //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
    opt.datetime = {preset : 'datetime', maxDate: new Date(currYear)};
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

//删除图片
function delpic_edit(imgId){
  $("#" + imgId).remove();
  $("div[name=" + imgId + "]").html("");
  deleteData_edit(imgId);
}

//删除方法
function deleteData_edit(fileId) {
		// alert(fileId);

        var files = multipleGraphsList2;
        for (var i = 0; i < files.length; i++) {
            var cur_file = files[i];
            if (cur_file.fileId == fileId) {
                multipleGraphsList2.splice(i, 1);
            }
        }

}


/** 编辑角色信息 **/
function personalRoleManage(){
    var provience = $("#provience").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var age = $("#age").val();
    var height = $("#height").val();
    var weight = $("#weight").val();
		var unit = $("#unit").val();
		var firstimg = $("#firstimg_").val();
	  var lunboimg = $("#lunboimg_").val();
		var workarea = $("#workarea").val();
		var price = $("#price").val();

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

		if(!price && "" === price){
				dialog.alert({
						title:"请选择参演费用！",
						msg:'',
						buttons:['确定']
				},function(ret){
				})
				return false;
		}

		if("单位" === unit){
				dialog.alert({
						title:"请选择计费单位！",
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

    if("" === area){
      dialog.alert({
          title:"请选择所在区",
          msg:'',
          buttons:['确定']
      },function(ret){

      })
      return false;
    }



		// if(!lunboimg){
    //     dialog.alert({
    //         title:"请选择轮播图",
    //         msg:'',
    //         buttons:['确定']
    //     },function(ret){
    //     })
    //     return false;
    // }

		if(!$("#imgUpload").html()){
				dialog.alert({
						title:"请上传图集",
						msg:'',
						buttons:['确定']
				},function(ret){
				})
				return false;
		}

		var img1=new Image();
		img1.crossOrigin = '';
		img1.src = $("#fmimg").val();
		img1.style = "width: 100%; height: 100%;";

		img1.onload = function() {
			if(img1.complete){
					var toast = new auiToast();
					toast.loading({
						 title:"正在提交",
						 duration:2000
					},function(ret){
						setTimeout(function(){

						getBase64ImageOnce(img1,function(dataURL){

							$.post(path + "/ActorInterface/index/uploadImgs.action",{
								imgpath:dataURL
							}, function(data) {
								var data = JSON.parse(data);

								if (data.success) {
										$("#firstimg_").val(data.imgpath);
										var firstimg = $("#firstimg_").val();
										if(!firstimg){
												dialog.alert({
														title:"请选择封面图",
														msg:'',
														buttons:['确定']
												},function(ret){
												})
												return false;
										}

		$("#tjBtu").html("");

    var actionURL = "";

    if(id!=null){
        actionURL = path + "/ActorInterface/actor/actorUpdate.action?token=" + localStorage.token + "&role=" + role;
				$("#hi_id").val(id);


				//重新组装方法
				var newmultipleGraphsList = [];
				multipleGraphsList2.forEach(function(i){

					var newObj = {base64Data:i.base64Data}
					newmultipleGraphsList.push(newObj);
				});
				if($("#multipleGraphsList").val() != ""){
					var newList = JSON.parse($("#multipleGraphsList").val());

					newList.forEach(function(j){
						var newObj2 = {base64Data:j.base64Data}
						newmultipleGraphsList.push(newObj2);
					});

				}

				var hi_jsonStr = JSON.stringify(newmultipleGraphsList);
        $("#multipleGraphsList").val(hi_jsonStr);


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
							 toast.hide();

							 toast.fail({
								title:"提交失败",
								duration:2000
							 });

							 var tjBtu = "";
               tjBtu += "<div style='background-color:#20e0b9;' class='aui-btn aui-btn-success aui-btn-block aui-btn-sm'>";
               tjBtu += "<div onclick='personalRoleManage()'>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>";
               tjBtu += "</div>";
               $("#tjBtu").html(tjBtu);
				},
				success : function(data) {

						var data = JSON.parse(data);
						if(data.success){

							 toast.hide();

							 toast.success({
								title:"提交成功",
								duration:2000
							 });

							setTimeout(function(){window.location.href = "../personalRoleManage/personalRoleManage.html";}, 2000);


						}else{

							 toast.hide();

							 toast.fail({
								title:"提交失败",
								duration:2000
							 });

							 var tjBtu = "";
               tjBtu += "<div style='background-color:#20e0b9;' class='aui-btn aui-btn-success aui-btn-block aui-btn-sm'>";
               tjBtu += "<div onclick='personalRoleManage()'>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>";
               tjBtu += "</div>";
               $("#tjBtu").html(tjBtu);
						 }
 				}
 			});

 }else{
 		alert("error")
 }
 });

 }, 3000)
 });

 });


 }
 };
 }


function getSmallType(bigid){

	 $.post(path + "/ActorInterface/index/findSmallType.action",{
         bigid: bigid
      }, function(data) {
        var data = JSON.parse(data);
        if (data.success) {
			 data.infoList.forEach(function(i){

				$("#smalltype").append("<option value="+i.id+">"+i.typename+"</option>");

			 });

			  if(smallid!=""){
				   $("#smalltype").val(smallid);
			  }
		  }
	  });
}

//$(function(){
  //var docHeight = $(document).height(); //获取窗口高度
  // $('body').append('<div id="overlay"></div>');
  // $('#overlay')
  //   .height(docHeight)
  //   .css({
  //     'opacity': .9, //透明度
  //     'position': 'absolute',
  //     'top': 0,
  //     'left': 0,
  //     'background-color': 'grey',
  //     'width': '100%',
  //      'z-index': 5000 //保证这个悬浮层位于其它内容之上
  //   });
  //  setTimeout(function(){$('#overlay').fadeOut('slow')}, 3000); //设置3秒后覆盖层自动淡出
//});

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
								$(".addPicLunboimg").hide();
									openImageClipFrame(ret.data,'lunboimg', '../../photoCut.html');
									// $("#lunboimg_").val(ret.base64Data);

							}else if("2" === num){
								$(".addPicFirstimg").hide();
									openImageClipFrame(ret.data,'firstimg', '../../photoCut.html');
									// $("#firstimg_").val(ret.base64Data);
							}
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
									if("1" === num){
										$(".addPicLunboimg").hide();
											openImageClipFrame(ret.data,'lunboimg', '../../photoCut.html');
											// $("#lunboimg_").val(ret.base64Data);

									}else if("2" === num){
										$(".addPicFirstimg").hide();
											openImageClipFrame(ret.data,'firstimg', '../../photoCut.html');
											// $("#firstimg_").val(ret.base64Data);
									}
								} else {
										alert(JSON.stringify(err));
								}
        });
    }
}

// 上传图片结束

// 根据生日计算年龄
$("#birthday").change(function(i){
	var birthday = $("#birthday").val();
	var date=new Date;
	var newyear=date.getFullYear();
	var oldyear = new Date(birthday).getFullYear();
	var age = parseInt(newyear) - parseInt(oldyear);
	$("#age").val(age);
})
