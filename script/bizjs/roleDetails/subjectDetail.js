var infos = "";
var workingRange = "";
var synopsis = "";
var keywords = "";
var reserveTime = "";

function getSubjectDetail(data){
    var width = data.subjectinfo.width;
    var height = data.subjectinfo.height;
    $("#membername").html("发布人: " + data.membername);
    if(data.subjectinfo.saleprice){
        $("#price").html("￥" +  data.subjectinfo.saleprice + "/" + data.subjectinfo.saleunit);
    }else{
        $("#price").html("￥" +  data.subjectinfo.rentprice + "/" + data.subjectinfo.rentunit);
    }

    $("#role").html("找道具");

    infos += "<h4 style='margin-top:3%; margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>道具信息</span></h4>";
    infos += "<span style='margin-top: 2%; margin 0 auto; margin-left:10%; font-size:12px;color:#9D9D9D;padding-bottom:10px;'>";
    if(data.subjectinfo.provience && data.subjectinfo.city && data.subjectinfo.district){
      infos += "<span style='margin-top: 2%; margin 0 auto; font-size:13px;color:#8E8E8E;'>" + data.subjectinfo.provience + data.subjectinfo.city + data.subjectinfo.district + data.subjectinfo.address + "</span>";
    }
    if(!data.subjectinfo.subjectinfos){
        infos += "<span style='margin-top: 2%;font-size:14px;color:#9D9D9D;width:100%;padding-right:5%;padding-right:5px;'>" + "暂无" + "</span>";
    }else{
        infos += "<span style='margin-top: 2%;font-size:14px;color:#9D9D9D;width:100%;padding-right:5%;padding-right:5px;'>" + data.subjectinfo.subjectinfos + "</span>";
    }

    infos += "</span>";

    keywords += "<div style='background-color:#ffffff;padding-bottom:5px;margin-top:2%;'>";
    keywords += "<h4 style='margin-left: 5%; color:#7B7B7B;'><span style='margin-top:3%;'>关键字</span></h4>";
    keywords += "<span style='margin-top: 2%; margin-left:10%; font-size:12px; color:#20e0b9; display:inline-block;border:1px solid #20e0b9; border-radius:5px;'>";
    keywords += "<span style='font-size:12px;padding-left:5px;padding-right:5px;'>" + data.subjectinfo.keywords + "</span>";
    keywords += "</span>";
    keywords += "<div>";

    synopsis += "<div style='margin-top:2%;'>";
    synopsis += "<h4 style='margin-left:5%;  color:#7B7B7B;'><span style='margin-top:3%;'>预约</span>";
    synopsis += "</h4>";
    synopsis += "</div>";
    synopsis += "<div style='padding-bottom:10px;'>";
    synopsis += "<div class='aui-btn aui-btn-success' onclick=reserve('" + data.preFlag + "') style='background-color:#20e0b9;width:50px; height:20px; font-size:14px; line-height:20px; margin-left:10%; margin-top:2%;'>预约</div>";
    synopsis += "<div class='aui-btn aui-btn-success' onclick=booking('" + data.preFlag + "') style='background-color:#20e0b9;width:60x; height:20px; font-size:14px; line-height:20px; margin-left: 20px; margin-top:2%;'>待预约</div>";
    synopsis += "</div>";
    synopsis += "</div>";

    $("#infoid").val(data.subjectinfo.id);
    $("#type").val("subject");
    $("#ownerid").val(data.subjectinfo.memberid);

    $("#nickname").html(data.subjectinfo.subjectname);
    var d = new Date(data.subjectinfo.createtime);
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
        if(Number(width) > Number(height)){
            imgone += "<span style='margin-left:3%; width:100%; height:100%;'><img style='float:left; width:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
        }else{
            imgone += "<span style='margin-left:3%; width:100%; height:100%;'><img style='float:left; height:100%;' id='imgBig' src='" + data.imgs[0].imgpath + "' onclick='album()'/><span>";
        }

        $("#imgBig").html(imgone);
    }

    data.imgs.forEach(function(i){
        imgArr.push(i.imgpath);

        imgflag ++;

        width = i.width;
        height = i.height;

        if(width > height){
            imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:45%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:45%; height:45%;margin-top:3%;'><img style='width:100%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
            imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:80%;margin-top:3%;'><img style='width:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
        }else{
            imgsix += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center;margin-left:3%; width:30%; height:45%;margin-top:3%;'><img style='height:100%;' src='" + i.imgpath + "' onclick='album()'/></div>";
            imgfour += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center; width:45%; height:45%;margin-top:3%;'><img style='height:100%;left:50%;'  src='" + i.imgpath + "' onclick='album()'/></div>";
            imgssecond += "<div style='border:#E0E0E0 1px solid;float:left;display: flex;justify-content: center;align-items: center; width:30%; height:80%;margin-top:3%;'><img style='height:100%;left:50%;' src='" + i.imgpath + "' onclick='album()'/></div>";
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

    if(0 < data.fiveOrder.length){
        $("#reserveTime").html(reserveTime);
    }

    $('#img').attr('src', data.memberimg);
    $('#imgBig').attr('src', data.subjectinfo.firstimg);

    $("#infos").html(infos);
    $("#workingRange").html(workingRange);
    $("#synopsis").html(synopsis);
    $("#keywords").html(keywords);

    $("#attentionFlag").val(data.attentionFlag);
    $("#goodFlag").val(data.goodFlag);

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
