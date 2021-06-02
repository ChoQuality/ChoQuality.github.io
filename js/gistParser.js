var scripts = document.getElementsByTagName('script');
var myScript = scripts[ scripts.length - 1 ];
var queryString = myScript.src.replace(/^[^\?]+\??/,'');

window.onload = function () {
    var t = this;
    const userInfo = JSON.parse(document.getElementById("data").text);
    console.log("User information: %o", userInfo);
};