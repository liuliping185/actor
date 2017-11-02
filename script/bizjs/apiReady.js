apiready = function () {
  // $("#lunboimg_").val();
  // $('#lunboimg').attr('src', '');
  // $("#firstimg_").val();
  // $('#firstimg').attr('src', '');
  // $("#headerImg_").val();
  // $('#headerImg').attr('src', '');
  //
  // $(".addPicLunboimg").show();
  // $(".addPicFirstimg").show();
  // $(".addPic").show();
    $api.fixStatusBar( $api.dom('header') );
    api.removeLaunchView({
        animation: {
            type: 'none',
            duration: 0
        }
    });

    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    api.parseTapmode();

    api.addEventListener({
        name:'clip_success'
    }, function(ret, err){
      var imgSrc = ret.value.new_img_url;
      var type = ret.value.type;

        if( ret ){
             var jsonstr= JSON.stringify(ret);

              if(!imgSrc || !type){
                if("lunboimg" === type){
                  $(".addPicLunboimg").show();
                }else if("firstimg" === type){
                  $(".addPicFirstimg").show();
                }else if("idcardFront" === type){
                  // $(".addPicFirstimg").show();
                }else if("idcardBack" === type){
                  // $(".addPicFirstimg").show();
                }else{
                  $(".addPic").show();
                }
                return false;
              }

              if("lunboimg" === type){
                $(".addPicLunboimg").hide();
                $("#lunboimg_").val(imgSrc);
                $('#lunboimg').attr('src', imgSrc);
              }else if("firstimg" === type){
                $(".addPicFirstimg").hide();
                $("#firstimg_").val(imgSrc);
                $('#firstimg').attr('src', imgSrc);
              }else if("idcardFront" === type){
                // $(".addPicFirstimg").hide();
                $("#idcardFront_").val(imgSrc);
                $('#idcardFront').attr('src', imgSrc);
              }else if("idcardBack" === type){
                // $(".addPicFirstimg").hide();
                $("#idcardBack_").val(imgSrc);
                $('#idcardBack').attr('src', imgSrc);
              }else{
                // $(".addPic").hide();
                $("#headerImg_").val(imgSrc);
                $('#headerImg').attr('src', imgSrc);
              }

                        // var img1=new Image();
                        // img1.crossOrigin = '';
                        // img1.src = imgSrc;
                        // img1.style = "width: 100%; height: 100%;";
                        //
                        // img1.onload = function() {
                        //   if(img1.complete){
                        //
                        //         database = getBase64Image(img1);
                        //
                        //         if(database && null != database){
                        //            geturl(database);
                        //         }
                        //
                        //         $.post(path + "/ActorInterface/index/uploadImgs.action",{
                        //                 imgpath:database
                        //               }, function(data) {
                        //                 var data = JSON.parse(data);
                        //                //  alert(data);
                        //
                        //                 if (data.success) {
                        //                  //  alert(type);
                        //                  //  alert(JSON.stringify(data));
                        //                     if("lunboimg" === type){
                        //                       $(".addPicLunboimg").hide();
                        //                       $("#lunboimg_").val(data.imgpath);
                        //                       $('#lunboimg').attr('src', data.imgpath);
                        //                     }else if("firstimg" === type){
                        //                       $(".addPicFirstimg").hide();
                        //                       $("#firstimg_").val(data.imgpath);
                        //                       $('#firstimg').attr('src', data.imgpath);
                        //                     }else{
                        //                       $(".addPic").hide();
                        //                       $("#headerImg_").val(data.imgpath);
                        //                       $('#headerImg').attr('src', data.imgpath);
                        //                     }
                        //                 }else{
                        //                     if("lunboimg" === type){
                        //                       $(".addPicLunboimg").show();
                        //                     }else if("firstimg" === type){
                        //                       $(".addPicFirstimg").show();
                        //                     }else{
                        //                       $(".addPic").show();
                        //                     }
                        //                 }
                        //             });
                        //   }
                        // };
        }else{
            if("lunboimg" === type){
              $(".addPicLunboimg").show();
            }else if("firstimg" === type){
              $(".addPicFirstimg").show();
            }else{
              $(".addPic").show();
            }
            alert( JSON.stringify( err ) );
        }
    });
}
