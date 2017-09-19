$(function(){
    $('body').height($('body')[0].clientHeight);
});

var dialog = new auiDialog();

apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    api.parseTapmode();
    //funIniGroup();
}

function funIniGroup(){
    var eHeaderLis = $api.domAll('header li'),
        frames = [];
    for (var i = 0,len = eHeaderLis.length; i < len; i++) {
            frames.push( {
                name: 'frame'+i,
                url: './html/frame'+i+'.html',
                bgColor : 'rgba(0,0,0,.2)',
                bounces:true
            } )
    }
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight,
            w: api.winWidth//,
            // h: $api.dom('#main').offsetHeight
        },
        index: 0,
        frames: frames
    }, function (ret, err) {

    });
}

// 随意切换按钮
function randomSwitchBtn( tag ) {
    if( tag == $api.dom('#footer li.active') )return;
    var eFootLis = $api.domAll('#footer li'),
        eHeaderLis = $api.domAll('header li'),
        index = 0;
    for (var i = 0,len = eFootLis.length; i < len; i++) {
        if( tag == eFootLis[i] ){
            index = i;
        }else{
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls( eFootLis[index], 'active');
    $api.addCls( eHeaderLis[index], 'active');
}

// 重置密码
function changePassword(){
  var password = $("#password").val();
  var re_password = $("#re_password").val();

  if(!password){
			dialog.alert({
					title:"请输入密码",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return  false;
	}
	if(!re_password){
			dialog.alert({
					title:"请确认密码",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}
	if(re_password != password){
			dialog.alert({
					title:"两次密码输入不一致！",
					msg:'',
					buttons:['取消','确定']
			},function(ret){

			})
			return false;
	}

  $.post("http://192.168.0.129:8080/ActorInterface/member/changePassword.action",{
      token:localStorage.token,
			password:password
		}, function(data) {
			var data = JSON.parse(data);
			if (data.success) {
          console.log("11")
					//自定义alert
					dialog.alert({
              title: data.message,
              msg:'',
              buttons:['确定']
          },function(ret){

              if(ret){
                  window.location.href="../login.html";
              }
          });
			}else{
        console.log("ad")
  				dialog.alert({
              title:data.message,
              msg:'',
              buttons:['确定']
          },function(ret){
          })
			}
	});
}
