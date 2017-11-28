var infos = "";
var workingRange = "";
var synopsis = "";
var keywords = "";
var reserveTime = "";

function getDirector(data){
    $("#membername").html("发布人: " + data.membername);
    if(data.directorinfo.price && data.directorinfo.unit){
        $("#price").html("￥" +  data.directorinfo.price + "/" + data.directorinfo.unit);
    }

    $("#role").html("找导演");

    infos += "<h4 style='margin-top:3%; margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>导演信息</span></h4>";
    infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:12px;color:#9D9D9D;padding-bottom:5px;'>";
    if(data.directorinfo.provience && data.directorinfo.city && data.directorinfo.district){
        infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:13px;color:#8E8E8E;'>" + data.directorinfo.provience + data.directorinfo.city + data.directorinfo.district + data.directorinfo.address + "</span>";
    }
    infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:5%; font-size:12px;color:#9D9D9D;padding-bottom:5px;'>" + data.directorinfo.directorinfos + "</span>";
    infos += "</span>";

    infos += "</div>";

    keywords += "<div style='background-color:#ffffff;padding-bottom:5px;margin-top:2%;padding-bottom:10px;'>";
    keywords += "<h4 style='margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>关键字</span></h4>";
    keywords += "<span style='margin-top: 2%; margin-left:10%; font-size:12px; color:#20e0b9; display:inline-block;border:1px solid #20e0b9; border-radius:5px;'>";
    keywords += "<span style='font-size:12px;padding-left:5px;padding-right:5px;'>" + data.directorinfo.keywords + "</span>";
    keywords += "</span>";
    keywords += "<div>";

    workingRange += "<div style='margin-top:2%;background-color:#ffffff;padding-bottom:5px;padding-top:5px;'>";

    // workingRange += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>个人简介</h4>";
    // workingRange += "<div>";
    // workingRange += "<span style='margin-left:10%;font-size:14px;color:#9D9D9D'>" + data.directorinfo.directorinfos + "</span>";
    // workingRange += "</div>";

    workingRange += "<h4 style='margin-left:5%; margin-top:0%; color:#7B7B7B;'><span style='margin-top:3%;'>工作范围</span><h4>";
    workingRange += "<div>";
    if(data.directorinfo.workarea){
        workingRange += "<span style='margin-left:10%;font-size:14px;color:#9D9D9D'>" + data.directorinfo.workarea + "</span>";
    }else{
        workingRange += "<span style='margin-left:10%;font-size:14px;color:#9D9D9D'>暂无</span>";
    }


    workingRange += "<h4 style='margin-left:5%; margin-top:2%; color:#7B7B7B;'>工作经历</h4>";
    workingRange += "<div>";
    if(data.directorinfo.experience){
        workingRange += "<span style='margin-left:10%;font-size:14px;color:#9D9D9D'>" + data.directorinfo.experience + "</span>";
    }else{
        workingRange += "<span style='margin-left:10%;font-size:14px;color:#9D9D9D'>暂无</span>";
    }

    workingRange += "</div>";
    workingRange += "</div>";
    workingRange += "</div>";

    synopsis += "<div style='margin-top:2%;'>";
    synopsis += "<h4 style='margin-left:5%;  color:#7B7B7B;'><span style='margin-top:3%;'>预约</span>";
    synopsis += "</h4>";
    synopsis += "</div>";
    synopsis += "<div style='padding-bottom:10px;'>";
    synopsis += "<div class='aui-btn aui-btn-success' onclick=reserve('" + data.preFlag + "') style='background-color:#20e0b9;width:50px; height:20px; font-size:14px; line-height:20px; margin-left:10%; margin-top:2%;'>预约</div>";
    synopsis += "<div class='aui-btn aui-btn-success' onclick=booking('" + data.preFlag + "') style='background-color:#20e0b9;width:60x; height:20px; font-size:14px; line-height:20px; margin-left: 20px; margin-top:2%;'>待预约</div>";
    synopsis += "</div>";

    var loginname = "";
    reserveTime = "";
    data.fiveOrder.forEach(function(i){
          reserveTime += "<div style='margin-top:10px;'>";
          loginname = i.loginname.substring(0,2) + "*";
          reserveTime += "<span style='color:#9D9D9D;font-size:12px;'>";
          reserveTime += i.prestart + " - " + i.preend;
          reserveTime += "</span>";
          reserveTime += "<span style='color:#9D9D9D;font-size:12px;margin-left:10%;'>" + loginname+ "</span>"

          reserveTime += "</div>";
    });

    $("#infoid").val(data.directorinfo.id);
    $("#type").val("director");
    $("#ownerid").val(data.directorinfo.memberid);
    $("#nickname").html(data.directorinfo.nickname);
    if(0 < data.fiveOrder.length){
        $("#reserveTime").html(reserveTime);
    }

    var d = new Date(data.directorinfo.createtime);
    var createtime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    $("#area").html(createtime);

    imgArr = [];
    var imgflag = 0;
    var imgone = "";
    var imgfour = "";
    var imgsix = "";
    var imgssecond = "";

    var width = data.imgs[0].width;
    var height = data.imgs[0].height;

    if(1 ===  data.imgs.length){
      imgArr.push(i.imgpath);

      if(Number(width) > Number(height)){
          imgone += "<span style='margin-left:3%; width:100%; height:100%;border:#E0E0E0 1px solid;'><img style='float:left; width:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
      }else{
          imgone += "<span style='margin-left:3%; width:100%; height:100%;border:#E0E0E0 1px solid;'><img style='float:left; height:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
      }

      $("#imgBig").html(imgone);
    }

    data.imgs.forEach(function(i){
        width = i.width;
        height = i.height;
        imgArr.push(i.imgpath);

        imgflag ++;

        if(width > height){
            imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:2.5%; width:30%; height:45%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3.5%; width:45%; height:45%;margin-top:3%;'><img style='width:100%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
            imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:2.5%; width:30%; height:80%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
        }else{
            imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:2.5%; width:30%; height:45%;margin-top:3%;'><img style='height:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3.5%; width:45%; height:45%;margin-top:3%;'><img style='height:100%;left:50%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
            imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:2.5%; width:30%; height:80%;margin-top:3%;'><img style='height:100%;left:50%;' src='" + i.imgpath + "' onclick='album()'/></div>";
        }

        if(imgflag >= 5){
            $("#photoDiv").height("50%");
            if(imgflag === 6 || imgflag === 5){
              $("#imgBig").html(imgsix);
            }
        }else{
            if(imgflag >= 4){
              if(4 === imgflag){
                $("#photoDiv").height("50%");
                $("#imgBig").html(imgfour);
              }
            }else if(imgflag === 2){
                $("#photoDiv").height("25%");

                $("#imgBig").html(imgssecond);
            }else if(imgflag === 3){
                $("#photoDiv").height("25%");

                $("#imgBig").html(imgssecond);

            }
        }
    });

    $('#img').attr('src', data.memberimg);
    $('#imgBig').attr('src', data.directorinfo.firstimg);

    $("#attentionFlag").val(data.attentionFlag);
    $("#goodFlag").val(data.goodFlag);

    $("#infos").html(infos);
    $("#workingRange").html(workingRange);
    $("#synopsis").html(synopsis);
    $("#keywords").html(keywords);

    if("true" === $("#attentionFlag").val()){
        $("#followImg").attr("src", "../image/roleDetails/takeOff.png");
        $("#isfollow").prop("checked", true);
    }else{
        $("#followImg").attr("src", "../image/roleDetails/attention.png");
        $("input[id='isfollow']").removeAttr("checked");
    }

    if("true" === $("#goodFlag").val()){
        $("#startImg").attr("src", "../image/laud.png");
        $("#isStart").prop("checked", true);
    }else{
        $("#startImg").attr("src", "../image/laudT.png");
        $("input[id='isStart']").removeAttr("checked");
    }

    switch(data.service){
        case 1: $('#service').attr('src', '../image/roleDetails/1p.png');
        break;
        case 2: $('#service').attr('src', '../image/roleDetails/2p.png');
        break;
        case 3: $('#service').attr('src', '../image/roleDetails/3p.png');
        break;
        case 4: $('#service').attr('src', '../image/roleDetails/4p.png');
        break;
        case 5: $('#service').attr('src', '../image/roleDetails/5p.png');
        break;
    }

    switch(data.professional){
        case 1: $('#professional').attr('src', '../image/roleDetails/1p.png');
        break;
        case 2: $('#professional').attr('src', '../image/roleDetails/2p.png');
        break;
        case 3: $('#professional').attr('src', '../image/roleDetails/3p.png');
        break;
        case 4: $('#professional').attr('src', '../image/roleDetails/4p.png');
        break;
        case 5: $('#professional').attr('src', '../image/roleDetails/5p.png');
        break;
    }
}
