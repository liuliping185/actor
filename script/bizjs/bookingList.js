var UIListView = "";
var path = "http://192.168.0.170:8082";
// var path = "http://192.168.0.129:8080";
// var path = "http://47.93.224.28:8089";
$(function(){
    $('body').height($('body')[0].clientHeight);

    console.log(localStorage.token);
    getBeBookList('');
});

apiready = function () {
    UIListView = api.require('UIListView');
    $api.fixStatusBar( $api.dom('header') );
}

// 随意切换按钮
function randomSwitchBt( tag, mineUrl ) {
    UIListView.close();
    if(mineUrl){
        window.location.href = mineUrl;
    }
}

//生成随机数的方法
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

function getType(type){

	getBeBookList(type);

}

function getBeBookList(type){
	   // 待预定列表
    var actionURL = path + "/ActorInterface/preorder/myPreList.action";

    $.post(actionURL,{
        token:localStorage.token,
        prestatus: "W",
		    pretype:type
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var content = "";

            var flag = 0;
            var typeImg = "";
            var arr = [];

            data.myList.forEach(function(i){
                flag ++;
                var obj = {};
                var rolename = ""

                switch(i.pretype){
                    case "actor": typeImg = "../../image/index/actor.png";
                    rolename = "演员";
                    break;
                    case "scene": typeImg = "../../image/index/scene.png";
                    rolename = "场景";
                    break;
                    case "subject": typeImg = "../../image/index/subject.png";
                    rolename = "道具";
                    break;
                    case "screenwriter": typeImg = "../../image/index/screenwriter.png";
                    rolename = "编剧";
                    break;
                    case "director": typeImg = "../../image/index/director.png";
                    rolename = "导演";
                    break;
                    case "producer": typeImg = "../../image/index/producer.png";
                    rolename = "制片";
                    break;
                    case "clothing": typeImg = "../../image/index/clothing.png";
                    rolename = "服装";
                    break;
                    case "equipment": typeImg = "../../image/index/equipment.png";
                    rolename = "设备";
                    break;
                    case "camerateam": typeImg = "../../image/index/camerateam.png";
                    rolename = "摄影组";
                    break;
                    case "investment": typeImg = "../../image/index/investment.png";
                    rolename = "投资";
                    break;
                }

                var uid = generateMixed(6);
                var title = "";
                if(i.infosprice){
                    if(i.infosunit){
                        title = i.infosprice + "元/"+i.infosunit
                    }else{
                        title = i.infosprice + "元"
                    }
                }
                obj = {
                  uid: i.id,
                  imgPath: i.infosimg,
                  title: i.infosname,
                  subTitle: title,    // "发布人: " + i.membername,
                  remark: {
                    rolename: rolename,
                    preid: i.infoid,
                    id: i.id,
                    pretype: i.pretype,
                    prestatus: i.prestatus,
                    ownerid: i.ownerid
                  },
                  icon: ""
                }

                arr.push(obj);

            });

            if(0 === data.myList.length){
              UIListView.close();
              $("#content").html("暂无待预定清单!");
            }else{
              uiListView(arr);
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


}


// 提交
function submitReserve(pretype, preid, prestatus, ownerid, id){
        // alert(pretype + "-----" +  preid + "------" + prestatus + "------" + ownerid);
        UIListView.close();

        if("W" != prestatus){
            dialog.alert({
                title:"预约提示",
                msg:'该信息已在预约状态！',
                buttons:['确定']
            },function(ret){

            });
            flag = true;
    		return false;
        }

        window.location.href="../../scenes/reserve.html?pretype=" + pretype + "&preid=" + preid + "&ownerid=" + ownerid + "&id=" + id;
}

function confirm(id){
  var actionURL = path + "/ActorInterface/preorder/confirmPreorder.action";
  $.post(actionURL,{
      token:localStorage.token,
      ids: id
    }, function(data) {
      var data = JSON.parse(data);
      if (data.success) {
          dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
            var flag = 0;
            $("input[name='preid']").each(function(index,obj){
              flag ++;
            });
            if(0 === flag){
                $("#preContent").html("");
            }
            window.location.reload();
          })

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
}

// 取消
function cancel(){
    var flag = 0;
    $("input[name='preid']:checked").each(function(index,obj){
      flag ++;
    });
    if(1 < flag){
        dialog.alert({
            title:"取消时只能选择一条信息！",
            msg:'',
            buttons:['确定']
        },function(ret){
            window.location.reload();
        })
    }

    var preid = $("input[name='preid']:checked").val();
    var actionURL = path + "/ActorInterface/preorder/cancelPreorder.action";

    $.post(actionURL,{
        token:localStorage.token,
        preId: preid
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            dialog.alert({
                title:data.message,
                msg:'',
                buttons:['确定']
            },function(ret){
                var flag = 0;
                $("input[name='preid']").each(function(index,obj){
                  flag ++;
                });
                if(0 === flag){
                    $("#preContent").html("");
                }
                window.location.reload();
            })

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
}

function goDetail(type,id){

	var url = "";
	if(type == "actor"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "scene"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}else if(type == "subject"){
		url  = "../../scenes/actorDetails.html?id="+id+"&role="+type;
	}
	window.location.href=url;
}

// 提交预约信息
function reserve(){
    //console.log(preid+ "------" + pretype + "------" + ownerid);
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
            console.log(data);
  					if(data.success){
                alert("预约成功");
                window.location.href = "actorDetails.html?role=" + pretype + "&id=" + preid;
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

function uiListView(arr){
    // alert(JSON.stringify(arr));

     UIListView.open({
       rect: {
           x: 0,
           y: 70,
           w: api.winWidth,
           h: api.frameHeight - 130
       },
       data: arr,
       rightBtns: [{
           bgColor: '#f47920',
           activeBgColor: '#faa755',
           width: 70,
           title: '预约',
           titleSize: 14,
           titleColor: '#fff',
           icon: '',
           iconWidth: 20
       },
       {
           bgColor: '#ef4136',
           activeBgColor: '#f15b6c',
           width: 70,
           title: '删除',
           titleSize: 14,
           titleColor: '#fff',
           icon: '',
           iconWidth: 20
       }
     ],
       styles: {
           borderColor: '#F0F0F0',
           item: {
               bgColor: '#fff',
               activeBgColor: '#F5F5F5',
               height: 70.0,
               imgWidth: 78,
               imgHeight: 49,
               imgCorner: 0,
               placeholderImg: '',
               titleSize: 14.0,
               titleColor: '#ff3333',
               subTitleSize: 13.0,
               subTitleColor: '#708090',
               remarkColor: '#000',
               remarkSize: 0,
               remarkIconWidth: 30
           }
       }
     }, function(ret, err) {
       if (ret) {
         if(0 === ret.btnIndex){
           UIListView.getDataByIndex({
              index: ret.index
           }, function(ret, err) {
              if (ret) {
                  var preid = ret.data.remark.preid;
                  var pretype = ret.data.remark.pretype;
                  var prestatus = ret.data.remark.prestatus;
                  var ownerid = ret.data.remark.ownerid;
                  var id = ret.data.remark.id;
                  submitReserve(pretype, preid, prestatus, ownerid, id);
              } else {
                  alert(JSON.stringify(err));
              }
           });

         }
         if(1 === ret.btnIndex){
             UIListView.getDataByIndex({
                index: ret.index
             }, function(ret, err) {
                if (ret) {
                  deleteOrder(ret.data.remark.id, function(_flag){
                    if(true === _flag){
                        // UIListView.deleteItem({
                        //    index: ret.index
                        // }, function(ret, err) {
                        //   UIListView.reloadData({
                        // }, function(ret) {
                        //     if (ret) {
                              window.location.reload();
                                alert("删除成功！");
                            // } else {
                            //     alert("删除失败！");
                            // }
                        // });
                        // });
                    }
                  });
                } else {
                    alert(JSON.stringify(err));
                }
             });
         }
       }else {
       }
     });
}

// 根据id删除数据
function deleteOrder(orderid, callback){
   var orderid = orderid;
   var flag = true;
   $.post(path + "/ActorInterface/preorder/delPreOrder.action",{
       orderid: orderid
     }, function(data) {
       var data = JSON.parse(data);
       if (data.success) {

        //  dialog.alert({
        //      title:"删除成功!",
        //      msg:'',
        //      buttons:['确定']
        //      },function(ret){
        //  })
       }else{
           flag = false;
          //  alert("")
       }
   });

   callback(flag);
}
