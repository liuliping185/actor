$(document).ready(function(){
    console.log(localStorage.token);
    $('body').height($('body')[0].clientHeight);
});

// 找场景
function scenes(){
  window.location.href = "./scenes/scenes.html";
}
