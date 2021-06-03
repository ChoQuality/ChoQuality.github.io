
let map  = scriptParsing();
window.onload = function () {
    new gistFix(map);
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
    this.map = {id:false,min:{},max:{}}
    this.id = false;
    this.min=0;
    this.max=0;
    parseMap(map,this.map);
    fix(this.map);

    function parseMap(map,map){
        for (const [key, value] of map) {
            switch (key) {
                case "id":
                    map.id = document.getElementById(value);
                    break;
                case "min":
                    map.min = value;
                    break;
                case "max":
                    map.max = value;
                    break;
            }
        }

        if(map.id){
            let trs = map.id.querySelectorAll('tbody tr');
            if( map.max == 0  || map.max > trs.length){
                map.max = trs.length;
            }
            if(map.min > map.max){
                map.min =map.max;
            }
        }
    }
    function fix(map){
         if(map.id){
             map.id = map.id.querySelectorAll('tbody tr');
             map.id.forEach(function (e,i) {
                 if( i < parseInt(map.min) ||  i > parseInt(map.max)){
                     e.remove();
                 }
             })
         }
    }
}

