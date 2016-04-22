var data = d3.json("KNMI.json", function(error, data) {
  if (error) return console.warn(error);
  console.log(data)
});

