
var multipleGraphsList = [];
var role = GetQueryString("role");
var id = GetQueryString("id");
var infoid = "";
var smallid = "";
var multipleGraphsList2 = [];

$(function(){
   $.post(path + "/ActorInterface/index/findBigType.action",{
        typeinfo: 'clothing'
      }, function(data) {
        var data = JSON.parse(data);
        if (data.success) {
    			 data.infoList.forEach(function(i){
    				$("#bigtype").append("<option value="+i.id+">"+i.typename+"</option>");
    			 });
		    }
	  });

		if(id!=null){
			  var actionUrl = path + "/ActorInterface/clothing/getClothingById.action?clothingId=" + id;
			  $.post(actionUrl,{
				  token:localStorage.token
				}, function(data) {
				  var data = JSON.parse(data);
          console.log(data);
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

            var provience = data.clothinginfo.provience;
            var city = data.clothinginfo.city;
            var district = data.clothinginfo.district;

            $("#distpicker3").distpicker({
                province: provience,
                city: city,
                district: district
            });

            $("#imgUpload").html(imgs);

					  $("#clothingname").val(data.clothinginfo.clothingname);
            $("#clothinginfos").val(data.clothinginfo.clothinginfos);
					  $("#price").val(data.clothinginfo.price);
            $("#saleprice").val(data.clothinginfo.saleprice);
						$("#rentprice").val(data.clothinginfo.rentprice);
            $("#rentunit").val(data.clothinginfo.rentunit);

            if(data.clothinginfo.issale == '是'){
							$("#issale").prop("checked",true);
						}
						if(data.clothinginfo.isrent == '是'){
							$("#isrent").prop("checked",true);
						}
					  $("#keywords").val(data.clothinginfo.keywords);
					  $("#address").val(data.clothinginfo.address);

            $("#firstimg").attr("src",data.clothinginfo.firstimg);
            $("#firstimg_").val(data.clothinginfo.firstimg);

					  $("#bigtype").val(data.clothinginfo.bigid);
					  smallid = data.clothinginfo.smallid;
					  getSmallType(data.clothinginfo.bigid);

					  //隐藏域字段
					  $("#hi_evaSum").val(data.clothinginfo.evaSum);
					  $("#hi_goodSum").val(data.clothinginfo.goodSum);
					  $("#hi_professionalScore").val(data.clothinginfo.professionalScore);
					  $("#hi_serviceScore").val(data.clothinginfo.serviceScore);
					  $("#hi_attentionSum").val(data.clothinginfo.attentionSum);
					  $("#firstimg_").val(data.clothinginfo.firstimg);
					  $("#hi_scenestatus").val(data.clothinginfo.scenestatus);
					  $("#hi_memberid").val(data.clothinginfo.memberid);
					  $("#hi_createtime").val(data.clothinginfo.createtime);

            if(data.clothinginfo.unit){
                $("#unitsImg").hide();
                $("#unit").val(data.clothinginfo.unit);
            }
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
  var rentprice = $("#rentprice").val();
	var saleprice = $("#saleprice").val();
  var bigtype = $("#bigtype").val();
  var smalltype = $("#smalltype").val();
  var clothingname = $("#clothingname").val();
  var unit = $("#unit").val();
  var keywords = $("#keywords").val();
  var provience = $("#provience").val();
  var city = $("#city").val();
  var area = $("#area").val();

  if(!clothingname){
      dialog.alert({
          title:"请输入服装名称！",
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

  if(!keywords){
      dialog.alert({
          title:"请输入关键字！",
          msg:'',
          buttons:['确定']
      },function(ret){
      })
      return false;
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
        actionURL = path + "/ActorInterface/clothing/clothingUpdate.action?token=" + localStorage.token + "&role=" + role;
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
          actionURL = path + "/ActorInterface/clothing/clothingApply.action?token=" + localStorage.token + "&role=" + role;
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
                title:"error",
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
                      actionURL = path + "/ActorInterface/clothing/clothingUpdate.action?token=" + localStorage.token + "&role=" + role;
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
                            actionURL = path + "/ActorInterface/clothing/clothingApply.action?token=" + localStorage.token + "&role=" + role;
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
                                  title:"error",
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
        }
    }
}

function getSmallType(bigid){

	 $.post(path + "/ActorInterface/index/findSmallType.action",{

        bigid: bigid
      }, function(data) {
        var data = JSON.parse(data);

        if (data.success) {

			 data.infoList.forEach(function(i){

				$("#smalltype").append("<option label='" + i.typename + "' value="+i.id+">"+i.typename+"</option>");

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
            quality: 30,
            saveToPhotoAlbum: true
        }, function(ret, err) {
          // alert(JSON.stringify(ret));
            if (ret) {
              if("2" === num){
                  $(".addPicFirstimg").hide();
                  openImageClipFrame(ret.data,'firstimg', '../../photoCut.html');
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
                  if("2" === num){
											openImageClipFrame(ret.data,'firstimg', '../../photoCut.html');
									}
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}

// 上传图片结束0
