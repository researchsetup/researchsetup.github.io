function plot(id, vs, opts) {
  console.log(id)
  var el = d3.select(id);
  var svg = el.append("svg")
    .attr("width", 500)
    .attr("height", 100);
  opts = opts || {};
  opts.highlight = opts.highlight || [];

  function magnify(v) {
    v = (1 - (v/100));
    return 100*(1 - (v*v));
  }

  var vals = {
    impact: 0,
    hypo: 100,
    evid: 100,
    assum: 40,
    outcome: 50
  }
  vals.hypo = vs[0];
  vals.evid = vs[1];
  vals.assum = vs[2];
  vals.outcome = vs[3];
  vals.impact = vs[4];
  if (vals.impact === undefined) {
    vals.impact = (magnify(vals.hypo) * 
          magnify(vals.evid) * 
          magnify(vals.assum) * 
          magnify(vals.outcome)
    );
    vals.impact /= (100 * 100 * 100);
  }
  //_.each(vals, function(v, k) { vals[k] = Math.max(0, Math.min(100, v)); });

  var x = {
    impact: 50,
    hypo: 140,
    evid: 230,
    assum: 320,
    outcome: 410
  }
  var xvals = _.values(x);
  var charxs = [];
  _.each(xvals, function(v, i) { if (i>0) { charxs.push((v+xvals[i-1])/2); } })
  var texty = 65;
  var recty = 40;
  var circley = 30;
  var rectw = 10;
  var color = d3.scale.category10().domain(_.keys(x));
  var size = d3.scale.linear().domain([-100, 100]).range([-20, 20]);
  var conditionalColor = function(d) {
    if (opts.highlight && opts.highlight.length) {
      if (!_.contains(opts.highlight, d)) 
        return "#dadada";
    }
    return color(d);
  }

  svg.selectAll("text")
    .data(_.keys(x))
    .enter().append("text")
    .attr("x", function(d) { return x[d]; })
    .attr("y", texty)
    .attr("text-anchor", "middle")
    .attr("fill", conditionalColor)
    .attr("font-size", 15)
    .text(function(d) { return d; });

  svg.selectAll("text.eq")
    .data(charxs)
    .enter()
    .append("text")
    .classed("eq", true)
    .attr("x", function(d){return d;})
    .attr("y", texty)
    .attr("text-anchor", "middle")
    .attr("fill", "grey")
    .text(function(d, i) { return (i==0)? "=": "x"; });

  //svg.selectAll("text").attr("fill", "grey");

  svg.append("line")
    .attr("x1", 120)
    .attr("x2", 450)
    .attr("y1", recty)
    .attr("y2", recty)
    .attr("stroke", "#eee")
    .attr("stroke-width", 2)

  svg.selectAll("rect")
    .data(_.keys(x))
    .enter().append("rect")
    .attr("x", function(d) { return x[d] - rectw; })
    .attr("width", rectw*2)
    .attr("height", function(d) { return size(Math.abs(vals[d]))})
    .attr("y", function(d) { if (vals[d] <= 0) return recty; return recty-size(vals[d]);})
    .attr("fill", conditionalColor)
    .attr("opacity", 0.5)
    .attr("stroke-width", 0);

  svg.selectAll("rect.outline")
    .data(_.keys(x))
    .enter().append("rect")
    .classed("outline", "true")
    .attr("x", function(d) { return x[d] - rectw; })
    .attr("width", rectw*2)
    .attr("height", function(d) {return size(100)})
    .attr("y", function(d) {return recty-size(100)})
    .attr("fill", "none")
    .attr("stroke", conditionalColor)
    .attr("stroke-width", 2);


  /*
  svg.selectAll("circle")
    .data(_.keys(x))
    .enter().append("circle")
    .attr("cx", function(d) { return x[d]; })
    .attr("cy", circley)
    .attr("r", function(d) {return size(vals[d])})
    .attr("fill", conditionalColor)
    .attr("opacity", 0.5)
    .attr("stroke-width", 0);

  svg.selectAll("circle.outline")
    .data(_.keys(x))
    .enter().append("circle")
    .classed("outline", true)
    .attr("cx", function(d) { return x[d]; })
    .attr("cy", circley)
    .attr("r", function(d) { return size(100)})
    .attr("fill", "none")
    .attr("stroke", conditionalColor)
    .attr("stroke-width", 2)
    .attr("opacity", 1);
    */

};

