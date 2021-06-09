window.addEventListener('DOMContentLoaded',gistFix);

gistFix = function (mapData) {
    this.mapObj = {id:false,min:{},max:{}}
    parseMap(typeof (mapData) == 'function'? mapData():mapData,this.mapObj);
    fix(this.mapObj);

    function parseMap(mapData,mapObj){
        for (const [key, value] of mapData) {
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
            let trs = mapObj.id.querySelectorAll('tbody tr');
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
}(function scriptParsing(){
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
});

