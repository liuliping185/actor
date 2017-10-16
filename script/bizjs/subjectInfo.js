
var multipleGraphsList = [];
$("#imgUpload").html("");
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


				$("#bigtype").append("<option value="+i.id+">"+i.bigname+"</option>");

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
					// alert(JSON.stringify(data));
					if (data.success) {


						$("#subjectname").val(data.subjectinfo.subjectname);
						$("#saleprice").val(data.subjectinfo.saleprice);
						$("#rentprice").val(data.subjectinfo.rentprice);
						$("#address").val(data.subjectinfo.address);
						$("#keywords").val(data.subjectinfo.keywords);
						$("#subjectinfos").val(data.subjectinfo.subjectinfos);

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


						data.imgs.forEach(function(i){
							var image = new Image();
							image.crossOrigin = '';
							image.id = i.id;
							image.src = i.imgpath;
							image.style = "width: 100%; height: 100%;";

							$("#imgUpload").append(image);
							$("#imgUpload").append("<span name=" + i.id +"><div class='info' align='right'><button type='button' class='btn btn-danger' onclick=delpic_edit('" + i.id + "')>删除</button></div></span>");

							var jsonArray = {base64Data:i.imgpath,fileId:i.id};
							multipleGraphsList2.push(jsonArray);

						});
					}
				});

	}

});


//删除图片
function delpic_edit(imgId){
  $("#" + imgId).remove();
  $("span[name=" + imgId + "]").html("");
  deleteData_edit(imgId);
}

//删除方法
function deleteData_edit(fileId) {
		alert(fileId);

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
	// var scenename = $("#scenename").val();

	if(!subjectname){
			dialog.alert({
					title:"请输入道具名称！",
					msg:'',
					buttons:['确定']
			},function(ret){
			})
			return false;
	}

	console.log($('#issale').prop('checked'))
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

			// console.log($('#saleunit').val())
			if('请选择' === $('#saleunit').val()){
					dialog.alert({
							title:"请选择出售单位！",
							msg:'',
							buttons:['确定']
					},function(ret){
					})
					return false;
			}
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
			if('请选择' === $('#rentunit').val()){
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

   if(!$("#multipleGraphsList").val() && !infoid){
       dialog.alert({
           title:"请上传图片",
           msg:'',
           buttons:['确定']
       },function(ret){

       })
       return false;
   }


	$("#tjBtu").remove();
	$("#tjDiv").html("<div class='aui-btn  aui-margin-r-5' id='dis_tjBtu'>提交</div>");

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

   	var toast = new auiToast();
	toast.loading({
    title:"正在提交",
    duration:2000
	},function(ret){
		setTimeout(function(){
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

							 $("#dis_tjBtu").remove();
							 $("#tjDiv").html("<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='personalRoleManage()' id='tjBtu'>提交</div>");
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

							$("#dis_tjBtu").remove();
							$("#tjDiv").html("<div class='aui-btn aui-btn-success aui-margin-r-5' onclick='personalRoleManage()' id='tjBtu'>提交</div>");

						}

				}
			});

		}, 3000)
	});




}

function getSmallType(bigid){

	 $.post(path + "/ActorInterface/index/findSmallType.action",{

        bigid: bigid
      }, function(data) {
        var data = JSON.parse(data);

        if (data.success) {

			 data.infoList.forEach(function(i){


				$("#smalltype").append("<option value="+i.id+">"+i.smallname+"</option>");

			 });

			 if(smallid!=""){
				   $("#smalltype").val(smallid);
			 }

		}

	  });


}
