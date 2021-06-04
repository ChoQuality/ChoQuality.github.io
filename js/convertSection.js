
let mapData  = scriptParsing();
window.addEventListener('DOMContentLoaded', function(){
    convertSectionName(mapData);
});
function scriptParsing(){
    var script = document.getElementsByTagName('script');
    script = script[script.length-1].src
        .replace(/[^\?]+\?/,'')
        .split('&') ;
    var map = new Map();
    var query;
    while(script.length){
        query = script.shift().split('=');
        map.set(query[0],query[1]);
    }
    return map;
}
function convertSectionName(mapData) {
    this.mapObj = {section:false}
    parseMap(mapData,this.mapObj);

    function parseMap(mapData,mapObj){
        for (const [key, value] of mapData) {
            switch (value) {
                case "about":
                    mapObj.section = "생각?";
                    break;
                case "posts":
                    mapObj.section = "정리?";
                    break;
                case "sites":
                    mapObj.section = "참고?";
                    break;
                case "undefined":
                    mapObj.section = "미정?";
                    break;
            }
        }

        if(mapObj.section){
            var h1 =document.createElement("h1");
            h1.innerText = mapObj.section;
            document.querySelector('main ul').append(h1);
        }
    }

}

