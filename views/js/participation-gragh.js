function setTotal(data){
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1); 

var y = d3.scale.linear() 
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888","#374962"]);

var xAxis = d3.svg.axis() 
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis() 
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"));

var tip = d3.tip()
.attr('class', 'd3-tip')
.offset([-10, 0])
.html(function(d) {
  return "<strong>참여도:</strong> <span style='color:red'>" + (d.y1-d.y0) + "</span>";
})

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right+500)
    .attr("height", height + margin.top + margin.bottom+90)
  .append("g")
    .attr("transform", "translate(" + (margin.left+350) + "," + (margin.top+90) + ")");

svg.call(tip);

color.domain(d3.keys(data[0]).filter(function(key) { return key !== "name"&& key!=="userId"&& key!=="total"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.per = color.domain().map(function(comparename) { return {comparename: comparename,y0: y0, y1: y0 += +d[comparename].percent/data.length}; });  
    d.total1 = d.per[d.per.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total1 - a.total1; });
 
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.total1; })]);

  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("참여도");
  


  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  var rect=state.selectAll("rect")
      .data(function(d) { return d.per; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", height)
      .attr("height",0)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .style("fill", function(d) { return color(d.comparename); });

  rect.transition()
  .delay(function(d, i) { return i * 1000; })
  .attr("y",  function(d) { return y(d.y1); })
  .attr("height", function(d) { return y(d.y0) - y(d.y1); });
  

  
 state.append("text")
  .attr("x", x.rangeBand()/data.length)
  .attr("y", function(d) { return y((d.commit.percent+d.participate.percent+d.significant.percent)/data.length)-12; })
  .attr("dy", ".50em")
  .text(function(d) { return (d.commit.percent+d.participate.percent+d.significant.percent)/data.length; });

  
  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(100," + i * 20 + ")"; }); 
      
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
 

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
 
 
	  
}



function setGraph(data, title){
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var formatPercent = d3.format("");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x) 
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

if(title=="commit"){
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	    return "<strong>총 참여도:</strong> <span style='color:red'>" + d.commit.count + "</span>";  
	  })
}else if(title=="participate"){
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	    return "<strong>총 참여도:</strong> <span style='color:red'>" + d.participate.count + "</span>";  
	  })
}else if(title=="significant"){
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	    return "<strong>총 참여도:</strong> <span style='color:red'>" + d.significant.count + "</span>";  
	  })
}

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right+500)
    .attr("height", height + margin.top + margin.bottom+70)
  .append("g")
    .attr("transform", "translate(" + (margin.left+350) + "," + (margin.top+70) + ")");


    
svg.call(tip);


	x.domain(data.map(function(d) { return d.name; }));
	if(title=="commit"){
		y.domain([0, d3.max(data, function(d) { return d.commit.count })]);	  
	}else if(title=="participate"){
		y.domain([0, d3.max(data, function(d) { return d.participate.count })]);	
	}else if(title=="significant"){
		y.domain([0, d3.max(data, function(d) { return d.significant.count })]);	
	}

  
 

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis); 

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(title);

  if(title=="commit"){
	  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.commit.count); })
      .attr("height", function(d) { return height - y(d.commit.count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }else if(title=="participate"){
	  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.participate.count); })
      .attr("height", function(d) { return height - y(d.participate.count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }else if(title=="significant"){
	  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.significant.count); })
      .attr("height", function(d) { return height - y(d.significant.count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }  
  

}