var margin = {top: 20, right: 30, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();    

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var line1 = d3.svg.line()
	//.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.value); });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([120,40])
    .html(function (d) {
        return "<strong> Opening Price: </strong>"+ d.value + "<br>" +
        "  Date : " + d.date + "<br>"
    });	

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

queue()
	.defer(d3.json, 'Microsoft.json')
	.defer(d3.json, 'oracle.json')
	.await(analyze); // function that uses the files

function analyze (error, Microsoft, oracle) {
	if (error) { console.log(error); }

	color.domain(d3.keys(oracle[0]).filter(function(key) {
		return key !== "date";
	}));

	oracle.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	Microsoft.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	var stocks = color.domain().map(function(name) {
		return {
			name: name,
			values: oracle.map(function (d) {
				return { date: d.date, value: +d[name]};
			})
		};
	});
	console.log(oracle)
	x.domain(d3.extent(oracle, function(d) { return d.date;}));
	y.domain([
		d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
		d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
		]);

	svg.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
  		.selectAll("text")
  		.attr("transform", "rotate(-90)")
  		.attr("dy", ".71em")
  		.attr("y", -4)
  		.attr("x", -33)
  		.style("text-anchlor", "end");	

  	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("x", -90)
		.attr("dy", ".71em")
		.style("text-anchlor", "start")
		.text("Value in Dollars ($)"); 	

	var stock = svg.selectAll(".stock")
		.data(stocks)
	  .enter().append("g")
	  	.attr("class", "city");

	stock.append("path")
		.attr("class", "line")
		.attr("d", function(d) { return line1(d.values); })
		.style("stroke", function(d) { return color(d.name); });  			

	stock.append("text")
		.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
		.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")";})	
		.attr("x", 3)
		.attr("dy", ".35em")
		.text(function(d) { return d.name; });	

    stock.selectAll(".dot")
        .data(oracle)
        .enter().append("circle")
        .attr('class', 'datapoint')
        .attr('cx', function(d) { return x(d.date); })
        .attr('cy', function(d) { return y(d.value); })
        .attr('r',6)
        .attr('fill', 'white')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '3')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);     	
};


