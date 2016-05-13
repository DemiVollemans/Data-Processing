// Demi Vollemans, Data-Processing

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
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.open); });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([120,40])
    .html(function (d) {
        return "<strong> Opening Price: </strong>"+ (d.open) + "<br>" +
        "  Date : " + d.date + "<br>"
    });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);    

d3.json("Microsoft.json", function(error, microsoft) {
    if (error) return console.warn(error);

    microsoft.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    var values = []
    for (var i= 0; i < 24; i++) {
        values.push(microsoft[i].open)
    };
    console.log(microsoft)

    x.domain(d3.extent(microsoft, function(d) { return d.date;}));
    y.domain([d3.min(microsoft, function(d) { return d.open;}),
        d3.max(microsoft, function(d) { return d.open;})
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

    svg.append("path")
        .datum(microsoft)
        .attr("class", "line")
        .attr("d", line1)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

    svg.selectAll(".dot")
        .data(microsoft)
        .enter().append("circle")
        .attr('class', 'datapoint')
        .attr('cx', function(d) { return x(d.date); })
        .attr('cy', function(d) { return y(d.open); })
        .attr('r',6)
        .attr('fill', 'white')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '3')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);    
 });          
