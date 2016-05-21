var margin = 50,
    width = 450 - margin,
    height = 500 - margin;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.scale.scale()
	.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();    

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(5);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("bottom")
	.ticks(5);	

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

