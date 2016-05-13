var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = d3.json("KNMI.json", function(error, data) {
  if (error) return console.warn(error);
  var dates = [];
  for(var i = 0; i < 31; i++) {
  	dates.push(new Date(data[i].date));
  }
  console.log(dates);
  // console.log(data[1].date);

x.domain(data.map(function(d) { return d.date;}));
y.domain([0, 200]);
	// style text anchlor werkt niet. 
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
  		.selectAll("text")
  		.attr("transform", "rotate(-90)")
  		.attr("dy", ".71em")
  		.attr("y", -4)
  		.attr("x", -33)
  		.style("text-anchlor", "start");
  	
    
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
  .append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchlor", "middle")
	.text("mm"); 
	
svg.selectAll(".bar")
	.data(data)
  .enter().append("rect")
  	.attr("class", "bar")
  	.attr("x", function(d) { return x(d.date); })	
  	.attr("width", x.rangeBand())
  	.attr("y", function(d) { return y(d.rain); })
  	.attr("height", function(d) { return height - y(d.rain); });
svg.selectAll(".text")
	.data(data)
  .enter().append("text")
  	.attr("class", "text")
	.attr("x", function(d) { return x(d.date) + 4.5; })
    .attr("y", function(d) { return y(d.rain) + 10 ; })
    .attr("dy", ".35em")
    .text(function(d) { return d.rain; });
});		 	
    
function type(d) {
	d.rain = +d.rain;
	return d;
}    

