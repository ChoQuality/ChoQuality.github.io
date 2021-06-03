
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
    this.id = false;
    this.min=0
    this.max=0;
    parseMap(map,this.min);
    fix();

    function parseMap(map,min){
        for (const [key, value] of map) {
            switch (key) {
                case "id":
                    this.id = document.getElementById(value);
                    break;
                case "min":
                    min = value;
                    break;
                case "max":
                    this.max = value;
                    break;
            }
        }

        if(this.id){
            let trs = this.id.querySelectorAll('tbody tr');
            if( this.max == 0  || this.max > trs.length){
                this.max = trs.length;
            }
            if(this.min > this.max){
                this.min=this.max;
            }
            min =10;
        }
    }
    function fix(){
         if(this.id){
             this.id = this.id.querySelectorAll('tbody tr');
             this.id.forEach(function (e,i) {
                 if( i < parseInt(this.min) ||  i > parseInt(this.max)){
                     e.remove();
                 }
             })
         }
    }
}

