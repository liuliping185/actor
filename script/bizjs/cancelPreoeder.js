var orderid = GetQueryString("orderid");
$(function(){
  $("#orderid").val(orderid);

});

function cancelPreoeder(){

    var actionURL = path + "/ActorInterface/preorder/orderBack.action";
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
            if(data.success){
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){
                  // commentflag = "已评论";
                  window.location.href="reservation.html" ;
                    // console.log(ret)
                })
            }else{
                dialog.alert({
                    title:data.message,
                    msg:'',
                    buttons:['确定']
                },function(ret){
                    // console.log(ret)
                })
            }
        }
    });

}
