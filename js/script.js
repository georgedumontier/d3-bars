var margin = {top: 20, right: 20, bottom: 30, left: 40}, //creates an object names margin, with values for the keys: top, left, bottom, and right
    width = 960 - margin.left - margin.right, //width is set equal to 960 - 40 - 20
    height = 500 - margin.top - margin.bottom; //height is set equal to 500 - 20 - 30. 960 by 500 is the size of our svg
    // why are width and height not variables on their own? 


var x = d3.scale.ordinal() //sets x to an ordinal scale. I don't really understand the scale method, but i think it helps automatically size your charts based on the data.
    .rangeRoundBands([0, width], .1); // I googled range bound bands, but i have no idea what it does

var y = d3.scale.linear() //sets y to a linear scale. what's the difference between an ordianl scale and a linear scale?
    .range([height, 0]); // I can't figure out what the range method nor do i have any idea why we gave it height, 0

var xAxis = d3.svg.axis()//creates a new axis which is a scale?
    .scale(x)//scales it automatically to your data
    .orient("bottom");//changes where the axis is. changing it to top didn't work though

var yAxis = d3.svg.axis() //makes a new axis
    .scale(y)//scales the y axis according to your data?
    .orient("left")//moves the y axis. moving it "right" doesn't work for some reason
    .ticks(5); //number of ticks of the y axis, but i don't understand it. 3 and 4 ticks only show 2 ticks. But 5 ticks shows 5. 

var svg = d3.select(".chart").append("svg") //makes a variable svg, selects our chart div and appends svg to it.
    .attr("width", width + margin.left + margin.right) //sets the width as an html attribute including the margins defined above
    .attr("height", height + margin.top + margin.bottom) // sets the height including margins
  .append("g")//what's g?
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");//moves the svg based on the margins?

d3.json("js/dumontier_brettgardner.json", function(error, data) { //grabs my data
	console.log(data);//better put it in the console because i keep forgetting how i formatted it
  x.domain(data.stats.map(function(d) { return d.year; }));//I think domain is the range of possible inputs this is for the x axis, it outpus the year
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);// and this one is for the y axis, it outputs the number of hits



  svg.append("g")//append a group to the svg?
      .attr("class", "x axis")//no idea but what we do the same thing for the y axis
      .attr("transform", "translate(0," + height + ")")//moves the group according to its height
      .call(xAxis);//no idea at all what this does. if you take it out everything breaks

  svg.append("g")// append a different group
      .attr("class", "y axis")//this one is for the y axis
      .call(yAxis)// call? 
    .append("text")// appends the word hits. i think
      .attr("transform", "rotate(-90)") //rotates something with css. messing with it doesn't seem to affect anything
      .attr("y", 6)// changes where the text is. idk why it's 6
      .attr("dy", ".71em") // also changes where the word hits is. but exactly how I'm not sure
      .style("text-anchor", "end")//aligns the text somehow i think. text-anchor is an svg style attribute
      .text("hits");//changes the y axis label

  svg.selectAll(".bar")//select class bar
      .data(data.stats)//tell it which data we want to work with
    .enter().append("rect")//enter and exit confuse the hell out of me. I think it appends a rectangle which is an svg thing
      .attr("class", "bar")//gives it a class called bar?
      .attr("x", function(d) { return x(d.year); })//grabs the year for this bar
      .attr("width", x.rangeBand())//what the hell is a range band?
      .attr("y", function(d) { return y(d.H); })//same for the y axis
      .attr("height", function(d) { return height - y(d.H); });//sets height of the bar by subtracting our number from height?

});

//Sorry if it seems like I don't know what anything of this does. I promise I did a lot of googling, but I have lots and lots of questions.

