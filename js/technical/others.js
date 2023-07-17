document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        loadingFade();
    }
}

function loadingFade(){
    var opacity=1;
    var loadingBackground=document.getElementById('loading_bg');
    var time=setInterval(function (){
        if(opacity<=0){
            clearInterval(time);
            $('#loading').remove();
        }
        loadingBackground.style.opacity=opacity;
        opacity-=0.4;
    },100)
}