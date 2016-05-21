d3.json("lifedata.json", function(error, data) { 
	if (error) return console.warn(error); 
	var dataset = {};
	var fillColors = {defaultFill: "#F5F5F5"};
	var minValue = d3.min(data, function(d){return d.indicator} );
	var maxValue = d3.max(data, function(d){return d.indicator} );
	var palet = d3.scale.linear()
		.domain([minValue, maxValue])
		.range(["#ECE7F2", "#0000CD"]); // paars via Color Brewer

	data.forEach (function(d) {
		d.country = d.country;
		d.indicator = +d.indicator;

		for (var i = 0; i <country_codes.length; i++) {
			if (d.country == country_codes[i][2]) {
				d.code = country_codes[i][1];
			}
		}
		dataset[d.code] = { numberOfThings: d.indicator, fillKey: d.code};
		fillColors[d.code] = palet(d.indicator);
	});	
	console.log(dataset)
	new Datamap({ 
		element: document.getElementById('container'),
		fills: fillColors,
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
});
		