
var our = scriptQuery(); // 스크립트 주소에서 쿼리를 받아 저장
alert(our.key); // 테스트

window.onload = function () {
    var t = this;
    const userInfo = JSON.parse(document.getElementById("data").text);
    console.log("User information: %o", userInfo);
};
function scriptQuery(){
    var script = document.getElementsByTagName('script');
    script = script[script.length-1].src
        .replace(/[^\?]+\?/,'')
        .split('&') ;
    var map = new Map();
    var query;
    while(script.length){
        query = script.shift().split('='); // =로 나눠
        map.set(query[0],query[1]);
    }
    return map;
}
