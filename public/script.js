;(function(w, d3, undefined){
    "use strict";
 
    var width, height;
    function getSize(){
        width = w.innerWidth,
        height = w.innerHeight;
 
        if(width === 0 || height === 0){
            setTimeout(function(){
                getSize();
            }, 100);
        }
        else {
            init();
        }
    }
 
    function init(){
 
        //Setup path for outerspace
        
 
        //Setup path for globe
        var projection = d3.geo.azimuthal()
            .mode("orthographic")
            .translate([width / 2, height / 2]);
 
        var scale0 = projection.scale();
 
        var path = d3.geo.path()
            .projection(projection)
            .pointRadius(2);
 
        //Setup zoom behavior
        var zoom = d3.behavior.zoom(true)
            .translate(projection.origin())
            .scale(projection.scale())
            .scaleExtent([100, 800])
            .on("zoom", move);
 
        var circle = d3.geo.greatCircle();
 
        var svg = d3.select("body")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                    .call(zoom)
                    .on("dblclick.zoom", null);
 
        //Create a list of random stars and add them to outerspace
        var starList = createStars(300);
                
        var stars = svg.append("g")
            .selectAll("g")
            .data(starList)
            .enter()
            .append("path")
                .attr("class", "star")
                .attr("d", function(d){
                    path.pointRadius(d.properties.radius);
                    return path(circle.clip(d));
                });
 
 

 
        //Create the base globe
      
       
            
 
        var g = svg.append("g"),
            features;
 
        //Add all of the countries to the globe
        d3.json("world-countries.json", function(collection) {
            features = g.selectAll(".feature").data(collection.features);
 
            features.enter().append("path")
                .attr("class", "feature")
                .attr("d", function(d){ return path(circle.clip(d)); });
        });
 
        //Redraw all items with new projections
        function redraw(){
            features.attr("d", function(d){
                return path(circle.clip(d));
            });
 
            stars.attr("d", function(d){
                path.pointRadius(d.properties.radius);
                return path(d);
            });
        }
 
 
        function move() {
            if(d3.event){
                var scale = d3.event.scale;
                var origin = [d3.event.translate[0] * -1, d3.event.translate[1]];
                
                projection.scale(scale);
                path.pointRadius(2 * scale / scale0);
 
                projection.origin(origin);
                circle.origin(origin);
                
                //globe and stars spin in the opposite direction because of the projection mode
               
                redraw();
            }
        }
 
 
        function createStars(number){
            var data = [];
            for(var i = 0; i < number; i++){
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: randomLonLat()
                    },
                    type: 'Feature',
                    properties: {
                        radius: Math.random() * 1.5
                    }
                });
            }
            return data;
        }
 
        function randomLonLat(){
            return [Math.random() * 360 - 180, Math.random() * 180 - 90];
        }
    }
 
    getSize();
 
}(window, d3));
		