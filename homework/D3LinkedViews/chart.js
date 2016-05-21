var margin = {top: 30, right: 30, bottom: 70, left: 40},
    width = 500 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scale.linear()
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(5);		

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(5);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//include data

queue()
	.defer(d3.json, 'alcohol.json')
	.defer(d3.json, 'GDP.json')
	.defer(d3.json, 'lifedata.json')
	.await(analyze);	

function analyze(error, alcohol, GDP, lifedata) {
	if (error) {console.log(error); }

	var dataset = {};
	var fillColors = {defaultFill: "#F5F5F5"};
	var minValue = d3.min(lifedata, function(d){return d.indicator} );
	var maxValue = d3.max(lifedata, function(d){return d.indicator} );
	var palet = d3.scale.linear()
		.domain([minValue, maxValue])
		.range(["#e5f5f9", "#2ca25f"]); // paars via Color Brewer

	lifedata.forEach (function(d) {
		d.country = d.country;
		d.indicator = +d.indicator;

		for (var i = 0; i < country_codes.length; i++) {
			if (d.country == country_codes[i][2]) {
				d.code = country_codes[i][1];
			}
		}
		dataset[d.code] = { numberOfThings: d.indicator, fillKey: d.code};
		fillColors[d.code] = palet(d.indicator);
	});	

	var map = new Datamap({ 
		element: document.getElementById('container'),
		done: function(map) {map.svg.selectAll ('path.datamaps-subunit').on("click", function(country) {var country_c = country.properties.name;store(country_c); })},
		fills: fillColors,
		setProjection: function(element) {
        	var projection = d3.geo.mercator()
            	.center([20, 0])
            	.scale(100)
            	.translate([width, height])
            var path = d3.geo.path()
            	.projection(projection);
           	return {path: path, projection: projection}; 
        },    
		data: dataset,
		geographyConfig: {
			borderColor: '#DEDEDE',
			highlightBorderWidth : 2,
			highlightFillColor: function(geo){
				return geo['fillKey'] || '#F5F5F5';
			},
			// only change border
			highlightBorderColor: '#B7B7B7',
			popupTemplate: function(geo, data) {
				if (!data) {
					return ;
				}
				return ['<div class = "hoverinfo">',
					'<strong>', geo.properties.name, '</strong>',
					'<br> <strong> Life Satisfaction: </strong><strong>', data.numberOfThings, '</strong>',
						'</div>'].join('');		
			}
		}
	});

	function store(country){
		for (var i = 0; i < GDP.length; i++) {
			if (country == GDP[i].country) {
				var GDP_value = GDP[i].GDP; 	
		    }
		};  
		for (var i = 0; i < lifedata.length; i++) {
			if (country == lifedata[i].country) {
				var indicator = lifedata[i].indicator;
			}		
		};
		for (var i = 0; i < alcohol.length; i++) {
			if (country == alcohol[i].country) {
				var liters = alcohol[i].Liters_per_head;
			}		
		}; 
		
		x.domain([d3.min(GDP, function(d) { return d.GDP;}),
        d3.max(GDP, function(d) { return d.GDP;})
        ]);

		y.domain([d3.max(alcohol, function(d) { return d.Liters_per_head;}),
        d3.min(alcohol, function(d) { return d.Liters_per_head;})
        ]);

	var cValue = function (d) {return indicator};
	var color = d3.scale.category20(); 

	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", ".71em")
        .attr("y", -4)
        .attr("x", -33)
        .style("text-anchlor", "start")
      .append("text")
     	.attr("class", "label")
     	.attr("x", width)
     	.attr("y",-6)
     	.style("text-anchlor", "end")
     	.text("GDP per Head");  
     	  
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", -150)
        .attr("dy", ".71em")
        .style("text-anchlor", "end")
        .text("Alcohol Consumption per head"); 	

    // make the size of circle variable     
    var listings_extent = d3.extent(lifedata, function(d) {return indicator} );
    var radius = d3.scale.pow().exponent(0.5)
    				.domain(indicator)
    				.range([3, 20]);    
   
    svg.selectAll(".dot")
    	.data(lifedata)
    	.data(alcohol)
    	.data(GDP)
      .enter().append("circle")
      	.attr("class", "cirle")
	  	.attr("cx", GDP_value)
	  	.attr("cy", liters)
	  	.attr("r", indicator)
	  	.style("fill", function(d) { return color(cValue(d));})
	};
};	