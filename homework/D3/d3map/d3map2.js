var series = [
				["QAT", "132099"],
				["LUX", "98987"],
				["SGP", "85253"],
				["KWT", "70166"],
				["NOR", "68434"],
				["ARE", "67617"],
				["SMR", "63104"],
				["CHE", "58551"],
				["HKG", "56701"],
				["USA", "55805"],
				["IRL", "55533"],
				["SAU", "53624"],
				["BHR", "50095"],
				["NLD", "49166"],
				["SWE", "47922"],
				["AUS", "47389"],
				["AUT", "47255"],
				["DEU", "46893"],
				["ISL", "46097"],
				["DNK", "45709"],
				["CAN", "45553"],
				["OMN", "44628"],
				["BEL", "43585"],
				["FRA", "41181"],
				["GBR", "41159"],
				["FIN", "41124"],
				["JPN", "38054"],
				["NZL", "36172"],
				["MLT", "35826"],
				["ITA", "35708"],
				["ESP", "34819"],
				["ISR", "33656"],
				["CYP", "32785"],
				["TTO", "32635"],
				["GNQ", "31758"],
				["CZE", "31549"],
				["SVN", "31007"],
				["SVK", "29721"],
				["EST", "28592"],
				["LTU", "28359"],
				["PRT", "27835"],
				["POL", "26455"],
				["GRC", "26449"],
				["MYS", "26315"],
				["SYC", "26277"],
				["HUN", "26222"],
				["KNA", "24808"],
				["KAZ", "24268"],
				["ATG", "23476"],
				["CHL", "23466"],
				["ARG", "22554"],
				["PAN", "21765"],
				["HRV", "21581"],
				["URY", "21507"],
				["ROU", "20787"],
				["TUR", "20438"],
				["MUS", "19509"],
				["BGR", "19097"],
				["GAB", "18639"],
				["LBN", "18243"],
				["AZE", "17993"],
				["BLR", "17654"],
				["MEX", "17534"],
				["BRB", "16575"],
				["TKM", "16445"],
				["BWA", "16368"],
				["SUR", "16292"],
				["MNE", "16123"],
				["THA", "16097"],
				["BRA", "15615"],
				["CRI", "15482"],
				["IRQ", "15474"],
				["PLW", "15182"],
				["DOM", "14984"],
				["MDV", "14923"],
				["LBY", "14654"],
				["DZA", "14504"],
				["CHN", "14107"],
				["COL", "13847"],
				["SRB", "13671"],
				["ZAF", "13165"],
				["GRD", "13128"],
				["PER", "12195"],
				["MNG", "12147"],
				["JOR", "12123"],
				["EGY", "11185"],
				["LCA", "11739"],
				["TUN", "11428"],
				["NAM", "11408"],
				["ALB", "11301"],
				["ECU", "11264"],
				["IDN", "11126"],
				["VCT", "10956"],
				["DMA", "10788"],
				["LKA", "10566"],
				["BIH", "10492"],
				["GEO", "9063"],
				["FJI", "9044"],
				["JAM", "8759"],
				["PRY", "8708"],
				["ARM", "8468"],
				["SWZ", "8453"],
				["BLZ", "8373"],
				["SLV", "8303"],
				["BTN", "8201"],
				["MAR", "8164"],
				["GTM", "7738"],
				["UKR", "7519"],
				["GUY", "7509"],
				["AGO", "7344"],
				["PHL", "7254"],
				["CPV", "6522"],
				["IND", "6162"],
				["NGA", "6108"],
				["UZB", "6068"],
				["TLS", "5628"],
				["MMR", "5469"],
				["WSM", "5174"],
				["TON", "5045"],
				["NIC", "4997"],
				["HND", "4869"],
				["MRT", "4395"],
				["SDN", "4344"],
				["GHA", "4266"],
				["ZMB", "3868"],
				["BGD", "3607"],
				["KHM", "3487"],
				["TUV", "3393"],
				["KGZ", "3363"],
				["MHL", "3211"],
				["KEN", "3208"],
				["DJI", "3204"],
				["CMR", "3144"],
				["LSO", "2987"],
				["TJK", "2749"],
				["YEM", "2671"],
				["PNG", "2652"],
				["TCD", "2634"],
				["VUT", "2255"],
				["NPL", "2465"],
				["SEN", "2451"],
				["MLI", "2199"],
				["BEN", "2113"],
				["ZWE", "2096"],
				["UGA", "2003"],
				["SSD", "1992"],
				["SLB", "1995"],
				["AFG", "1947"],
				["RWA", "1807"],
				["ETH", "1801"],
				["KIR", "1787"],
				["HTI", "1755"],
				["BFA", "1724"],
				["GMB", "1646"],
				["SLE", "1577"],
				["COM", "1519"],
				["GNB", "1508"],
				["TGO", "1483"],
				["MDG", "1462"],
				["ERI", "1297"],
				["GIN", "1214"],
				["MOZ", "1186"],
				["MWI", "1124"],
				["NER", "108"],
				["LBR", "873"],
				["BDI", "818"],
				["CAF", "630"]
];	
console.log(series[1])		
var dataset = {};
var fillColors = {defaultFill: "#F5F5F5"};
var onlyValues = series.map(function(obj) { return obj [1];});
var minValue = Math.min.apply(null, onlyValues), 
	maxValue = Math.max.apply(null, onlyValues);
// maak palleten functie
var palet = d3.scale.linear()
	.domain([minValue, maxValue])
	.range(["#ECE7F2", "#0000CD"]); // paars via Color Brewer

series.forEach(function(duo){
	var code = duo[0],
		GDP = duo[1];
	dataset[code] = { numberOfThings: GDP, fillKey: code};
	fillColors[code] = palet(GDP);
	//Object {numberOfThings: "630", fillColor: "#efecf5"}
});	
console.log(dataset);
console.log(fillColors);
// render map
new Datamap({ 
	element: document.getElementById('container'),
	// projection: 'mercator',
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
				'<br> <strong> GDP: </strong><strong>', data.numberOfThings, '</strong>',
				'</div>'].join('');
		}

	}

});

			