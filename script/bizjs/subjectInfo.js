
var multipleGraphsList = [];
var role = GetQueryString("role");
var id = GetQueryString("id");
var infoid = "";
var smallid = "";

var multipleGraphsList2 = [];

$(function(){

	 $.post(path + "/ActorInterface/index/findBigType.action",{

        typeinfo: 'subject'
      }, function(data) {
        var data = JSON.parse(data);

        if (data.success) {

			 data.infoList.forEach(function(i){


				$("#bigtype").append("<option value="+i.id+">"+i.typename+"</option>");

			 });

		}

	  });


	if(id!=null){

				$('body').height($('body')[0].clientHeight);
				var actionUrl =  path + "/ActorInterface/subject/getSubjectById.action?subjectId=" + id;


				console.log(actionUrl);
				$.post(actionUrl,{
					token:localStorage.token
				  }, function(data) {
					var data = JSON.parse(data);
					console.log(data)
					if (data.success) {

						var imgs = "";
						var flag = 0;
						$("#imgUpload").html("");
						data.imgs.forEach(function(i){

							flag ++;

							imgs += "<span style='width30%;margin-left:3%;'>";

							imgs += "<div name=" + i.id +" style='' align='right'><div class='info'  style='margin-top:10px;' onclick=delpic_edit('" + i.id + "')><img src='../../image/delete.png' style='width:13px;'/></div></div>";
							imgs += "<img id='" + i.id + "'style='width:93px;height:93px;float:left;margin-top:-13px;' src='" + i.imgpath + "'/>";
							imgs += "</span>";

							var jsonArray = {base64Data:i.imgpath,fileId:i.id};
							multipleGraphsList2.push(jsonArray);
					})

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

					var provience = data.subjectinfo.provience;
					var city = data.subjectinfo.city;
					var district = data.subjectinfo.district;

					$("#distpicker3").distpicker({
							province: provience,
							city: city,
							district: district
					});

					$("#imgUpload").html(imgs);

						$("#subjectname").val(data.subjectinfo.subjectname);
						$("#saleprice").val(data.subjectinfo.saleprice);
						$("#rentprice").val(data.subjectinfo.rentprice);
						$("#address").val(data.subjectinfo.address);
						$("#keywords").val(data.subjectinfo.keywords);
						$("#subjectinfos").val(data.subjectinfo.subjectinfos);

						$("#firstimg").attr("src",data.subjectinfo.firstimg);
            $("#lunboimg").attr("src",data.subjectinfo.lunboimg);
						$("#firstimg_").val(data.subjectinfo.firstimg);
						$("#lunboimg_").val(data.subjectinfo.lunboimg);

						$("#bigtype").val(data.subjectinfo.bigid);
					    smallid = data.subjectinfo.smallid;
					    getSmallType(data.subjectinfo.bigid);


						if(data.subjectinfo.issale == '是'){
							$("#issale").prop("checked",true);
						}
						if(data.subjectinfo.isrent == '是'){
							$("#isrent").prop("checked",true);
						}


						  //隐藏域字段
						  $("#hi_evaSum").val(data.subjectinfo.evaSum);
						  $("#hi_goodSum").val(data.subjectinfo.goodSum);
						  $("#hi_professionalScore").val(data.subjectinfo.professionalScore);
						  $("#hi_serviceScore").val(data.subjectinfo.serviceScore);
						  $("#hi_attentionSum").val(data.subjectinfo.attentionSum);
						  $("#hi_firstimg").val(data.subjectinfo.firstimg);
						  $("#hi_subjectstatus").val(data.subjectinfo.subjectstatus);
						  $("#hi_memberid").val(data.subjectinfo.memberid);
						  $("#hi_createtime").val(data.subjectinfo.createtime);


						  $("#saleunit").val(data.subjectinfo.saleunit);
						  $("#rentunit").val(data.subjectinfo.rentunit);


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
						// 	var jsonArray = {base64Data:i.imgpath,fileId:i.id};
						// 	multipleGraphsList2.push(jsonArray);
						//
						// });
					}
				});

	}

});

//删除图片
function delpic_edit(imgId){
  $("#" + imgId).remove();
  $("div[name=" + imgId + "]").html("");
  deleteData_edit(imgId);
}

//删除方法
function deleteData_edit(fileId) {

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
	var subjectname = $("#subjectname").val();
	var rentprice = $("#rentprice").val();
	var saleprice = $("#saleprice").val();
	var bigtype = $("#bigtype").val();
	var smalltype = $("#smalltype").val();
	var provience = $("#provience").val();
	var city = $("#city").val();
	var area = $("#area").val();

	if(!subjectname){
			dialog.alert({
					title:"请输入道具名称！",
					msg:'',
					buttons:['确定']
			},function(ret){
			})
			return false;
	}

	if (!$('#issale').prop('checked') && !$('#isrent').prop('checked')) {
			dialog.alert({
					title:"请选择租售方式！",
					msg:'',
					buttons:['确定']
			},function(ret){
			})
			return false;
	}

	if ($('#issale').prop('checked')) {
			if(!/\d$/.test(saleprice)){
					dialog.alert({
							title:"出售价格格式不正确！",
							msg:'',
							buttons:['确定']
					},function(ret){
					})
					return false;
			}

			// if('单位' === $('#saleunit').val()){
			// 		dialog.alert({
			// 				title:"请选择出售单位！",
			// 				msg:'',
			// 				buttons:['确定']
			// 		},function(ret){
			// 		})
			// 		return false;
			// }
	}

	if ($('#isrent').prop('checked')) {
			if(!/\d$/.test(rentprice)){
					dialog.alert({
							title:"出租价格格式不正确！",
							msg:'',
							buttons:['确定']
					},function(ret){
					})
					return false;
			}
			if('单位' === $('#rentunit').val()){
					dialog.alert({
							title:"请选择出租单位！",
							msg:'',
							buttons:['确定']
					},function(ret){
					})
					return false;
			}
	}


		if(!bigtype){
				dialog.alert({
						title:"请输入大类！",
						msg:'',
						buttons:['确定']
				},function(ret){
				})
				return false;
		}

		if(!smalltype){
				dialog.alert({
						title:"请输入小类！",
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

		if(!$("#imgUpload").html()){
				dialog.alert({
						title:"请上传图集",
						msg:'',
						buttons:['确定']
				},function(ret){
				})
				return false;
		}

		if("" === $("#fmimg").val()){
			var toast = new auiToast();
			toast.loading({
				 title:"正在提交",
				 duration:2000
			},function(ret){
				setTimeout(function(){
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
actionURL = path + "/ActorInterface/subject/subjectUpdate.action?token=" + localStorage.token + "&role=" + role;
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
actionURL = path + "/ActorInterface/subject/subjectApply.action?token=" + localStorage.token + "&role=" + role;
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

setTimeout(function(){window.location.href = "../personalRoleManage/personalRoleManage.html?role=" + role;}, 2000);


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
}, 3000)
});


		}else{

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
			actionURL = path + "/ActorInterface/subject/subjectUpdate.action?token=" + localStorage.token + "&role=" + role;
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
					 actionURL = path + "/ActorInterface/subject/subjectApply.action?token=" + localStorage.token + "&role=" + role;
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

								setTimeout(function(){window.location.href = "../personalRoleManage/personalRoleManage.html?role=" + role;}, 2000);


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
