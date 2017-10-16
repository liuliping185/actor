var role = GetQueryString("role");
var id = GetQueryString("id");

$(function(){



    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
    console.log(role + "------" + id);
    var actionUrl = ""; 
    switch(role){
        case "actor": actionUrl = path + "/ActorInterface/actor/getAcotrById.action?actId=" + id;
        break;
        case "scene": actionUrl = path + "/ActorInterface/scene/getSceneById.action?sceneId=" + id;
        break;
        case "subject": actionUrl = path + "/ActorInterface/subject/getSubjectById.action?subjectId=" + id;
    }
    $.post(actionUrl,{
        token: localStorage.token
      }, function(data) {
        var data = JSON.parse(data);
        console.log(data)
        if (data.success) {
            var img = "";
            $("#album-samples-list").html("");

            $("#album-photo").attr('src', data.imgs[0].imgpath);
            // img += "<span><a href='#'><img ÷src='../image/left.png' style='width:20%;' alt=''></a></span>";
            data.imgs.forEach(function(i){


					img += "<div class='post-slide'>";
						img += "<div class='post-img'>";
							img += "<a href='#'><img src='"+i.imgpath+"' style='width:100%;' alt='' onclick=getImgpath('" + i.imgpath + "')></a>";
						img += "</div>";
					img += "</div>";



            });

           $("#news-slider").html(img);


		   $("#news-slider").owlCarousel({
				items:3,
				itemsDesktop:[1199,2],
				itemsDesktopSmall:[980,2],
				itemsMobile:[600,1],
				pagination:false,
				navigationText:false,
				autoPlay:true
		  });


        }else{
            dialog.alert({
                  title:"获取信息失败！",
                  msg:'',
                  buttons:['确定']
              },function(ret){
                  $("#content").html("");
              })
              return false;
        }
    });

    $("#detail-photos").album();
	  SyntaxHighlighter.all();

    var _gaq = _gaq || [];
  	_gaq.push(['_setAccount', 'UA-4473199-1']);
  	_gaq.push(['_trackPageview']);

		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
});

function getImgpath(path){
    console.log(path);
    $("#album-photo").attr('src', path);
}
