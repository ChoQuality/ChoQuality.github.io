
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
    this.id = false;
    this.min=0;
    this.max=0;
    parseMap(map,this.id,this.min,this.max);
    fix(this.id,this.min,this.max);

    function parseMap(map,id,min,max){
        for (const [key, value] of map) {
            switch (key) {
                case "id":
                    id = document.getElementById(value);
                    break;
                case "min":
                    min = value;
                    break;
                case "max":
                    max = value;
                    break;
            }
        }

        if(id){
            let trs = id.querySelectorAll('tbody tr');
            if( max == 0  || max > trs.length){
                max = trs.length;
            }
            if(min > max){
                min = max;
            }
        }
    }
    function fix(id,min,max){
         if(id){
             id = id.querySelectorAll('tbody tr');
             id.forEach(function (e,i) {
                 if( i < parseInt(min) ||  i > parseInt(max)){
                     e.remove();
                 }
             })
         }
    }
}

