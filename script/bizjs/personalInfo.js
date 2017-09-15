$(function(){
    var a = $("#nowLogin").val();
    console.log(nowLogin);
    // $.post("http://192.168.0.129:8080/ActorInterface/member/finishInfomation.action",{
    //   }, function(data) {
    //     var data = JSON.parse(data);
    //     console.log(data);
    //     if (data.success) {
    //         //自定义alert
    //         dialog.alert({
    //             title: data.message,
    //             msg:'',
    //             buttons:['确定']
    //         },function(ret){
    //
    //             if(ret){
    //
    //             }
    //         });
    //     }else{
    //       dialog.alert({
    //           title:data.message,
    //           msg:'',
    //           buttons:['确定']
    //       },function(ret){
    //           console.log(ret)
    //       })
    //     }
    // });
});

// 上传图片开始
// 单张图片上传，可拍照
// function showAction(){
//   var UIMediaScanner = api.require('UIMediaScanner');
//   UIMediaScanner.open({
//     type: 'picture',
//     column: 4,
//     classify: true,
//     max: 4,
//     sort: {
//       key: 'time',
//       order: 'desc'
//     },
//     texts: {
//       stateText: '已选择*项',
//       cancelText: '取消',
//       finishText: '完成'
//     },
//     styles: {
//       bg: '#fff',
//       mark: {
//         icon: '',
//         position: 'bottom_left',
//         size: 20
//       },
//       nav: {
//         bg: '#eee',
//         stateColor: '#000',
//         stateSize: 18,
//         cancelBg: 'rgba(0,0,0,0)',
//         cancelColor: '#000',
//         cancelSize: 18,
//         finishBg: 'rgba(0,0,0,0)',
//         finishColor: '#000',
//         finishSize: 18
//       }
//     },
//     scrollToBottom: {
//       intervalTime: 3,
//       anim: true
//     },
//     exchange: true,
//     rotation: true
//   }, function(ret) {
//     if (ret) {
//       $("#imgUpload").html("");
//       for(var i=0; i<ret.list.length; i++){
//         alert(ret.list[i].path);
//         $("#imgUpload").append("<img style='width:100%;height:100%;' src='ret.list[i].path'/>");
//       }
//       // $('#imgUp').attr('src', ret.list[0].path);
//       // for(var i=0; i<ret.list.length; i++){
//       //   alert(ret.list[i]);
//       // }
//       alert(JSON.stringify(ret));
//     }
//   });
    // api.actionSheet({
    //     title: '上传图片',
    //     cancelTitle: '取消',
    //     buttons: ['拍照','从手机相册选择']
    // }, function(ret, err) {
    //     if (ret) {
    //         getPicture(ret.buttonIndex);
    //     }
    // });
// }

function getPicture(sourceType) {
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
               $('#imgUp').attr('src', ret.base64Data);
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
                  alert(JSON.stringify(ret));
                  // $('#imgUp').attr('src', ret.base64Data);
                    var aa=ret.base64Data;
                    api.ajax({
                        type:"post",
                        url:"http://192.168.0.129:8080/ActorInterface/Upload/singleUpload.action",
                        data:{base64:aa},
                        dataType:'json',
                        async:true,
                    },function(ret,err){
                        if(ret){
                            $('#imgUp').attr('src',aa)
                        }else{
                            api.alert(err);
                        }
                    })
                } else {
                    alert(JSON.stringify(err));
                }
        });
    }
}
// 上传图片结束
