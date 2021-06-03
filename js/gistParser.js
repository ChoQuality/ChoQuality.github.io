
let map  = scriptParsing();
window.onload = function () {
    gistFix(map);
};
function scriptParsing(){
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
function gistFix(map) {
    this.mapObj = {id:false,min:{},max:{}}
    this.id = false;
    this.min=0;
    this.max=0;
    parseMap(map,this.mapObj);
    fix(this.mapObj);

    function parseMap(map,mapObj){
        for (const [key, value] of map) {
            switch (key) {
                case "id":
                    mapObj.id = document.getElementById(value);
                    break;
                case "min":
                    mapObj.min = value;
                    break;
                case "max":
                    mapObj.max = value;
                    break;
            }
        }

        if(mapObj.id){
            let trs = map.id.querySelectorAll('tbody tr');
            if( mapObj.max == 0  || mapObj.max > trs.length){
                mapObj.max = trs.length;
            }
            if(mapObj.min > mapObj.max){
                mapObj.min =mapObj.max;
            }
        }
    }
    function fix(mapObj){
         if(mapObj.id){
             mapObj.id = mapObj.id.querySelectorAll('tbody tr');
             mapObj.id.forEach(function (e,i) {
                 if( i < parseInt(mapObj.min) ||  i > parseInt(mapObj.max)){
                     e.remove();
                 }
             })
         }
    }
}

