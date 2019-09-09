!function(n){
    var e = n.document;
    var t = e.documentElement;
    var maxWidth = 720;
    var d = maxWidth/32;
    var o = "orientationchange" in n?"orientationchange":"resize";
    a = function(){
        var n = t.clientWidth || 320;
            n > 720&&(n=720);
            var font = Math.ceil(n/d)<13?13:Math.ceil(n/d);
            t.style.fontSize = font+'px';
    };
    e.addEventListener&&(n.addEventListener(o,a,false),e.addEventListener("DOMContentLoaded",a,false))
 }(window)