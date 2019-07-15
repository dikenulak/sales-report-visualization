import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {pie,scaleOrdinal,arc,select,schemeCategory10,csv} from 'd3';

class DonutChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProp,prevState) {
    // Seed data to populate the donut pie chart
    let {dseDetail,getDseState,callsData} = this.props;
    if(prevProp.dseDetail.inactive !== dseDetail.inactive){
      console.log(callsData)
      var seedData = [{
        "label": 'Active',
        "value": dseDetail.active.length
      }, {
        "label": "Inactive",
        "value": dseDetail.inactive.length
      }];
      
      // Define size & radius of donut pie chart
      var width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;
      
      // Define arc colours
      var colour = scaleOrdinal(schemeCategory10);
      
      // Define arc ranges
      var arcText = scaleOrdinal()
      .range([0, width]);
      // Determine size of arcs
      let arcs = arc().innerRadius(radius - 100)
      .outerRadius(radius - 10).cornerRadius(5).padAngle(0.015);
      
      // Create the donut pie chart layout
      let pies = pie()
      .value(function (d) { return d["value"]; })
      .sort(null);
      
      // Append SVG attributes and append g to the SVG
      var svg = select("#donut-chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");
      
      // Define inner circle
      svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 100)
      .attr("fill", "#fff") ;
      
      let _self = this;
      // Calculate SVG paths and fill in the colours
      var g = svg.selectAll(".arc")
      .data(pies(seedData))
      .enter().append("g")
      .attr("class", "arc")
      .on("click", function(d, i) {
        getDseState(d.data.label);
      })
        // Make each arc clickable 
      .on('mouseover',function(d,i){
        document.getElementsByClassName('inner-circle-count')[0].innerHTML = d.value;
        document.getElementsByClassName('inner-circle-detail')[0].innerHTML = `${d.data.label} DSE`;
      })
      .on('mouseout',function(d,i){
        const total = seedData[0].value+seedData[1].value;
        document.getElementsByClassName('inner-circle-count')[0].innerHTML = total;
        document.getElementsByClassName('inner-circle-detail')[0].innerHTML = 'Total DSE';
      })
      // Append the path to each g
      g.append("path")
      .attr("d", arcs)
      .attr("fill", function(d, i) {
        return colour(i);
      });
      
      // Append text labels to each arc
      g.append("text")
      .attr("transform", function(d) {
        return "translate(" + arcs.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .text(function(d,i) { return seedData[i].label; })
      
      g.selectAll(".arc text").call(wrap, arcText.range([0, width]));
      // Append text to the inner circle
      
      svg.append("text")
      .datum(dseDetail)
      .style("text-anchor", "middle")
      .attr("class", "inner-circle inner-circle-count")
      .attr("fill", "#36454f")
      .text(function(d) { return dseDetail.active.length + dseDetail.inactive.length})
      
      svg.append("text")
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle inner-circle-detail")
      .attr("fill", "#36454f")
      .text(function(d) { return 'Total DSE'; });
      
      // Wrap function to handle labels with longer text
      function wrap(text, width) {
        text.each(function() {
          var text = select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          console.log("tspan: " + tspan);
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > 90) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
     }
  }
  render() {
    return (
      <div>
      <svg id="donut-chart"></svg>
      </div>
    );
  }
}
DonutChart.propTypes = {
  dseDetail: PropTypes.object.isRequired,
  getDseState: PropTypes.func.isRequired
}
export default DonutChart;