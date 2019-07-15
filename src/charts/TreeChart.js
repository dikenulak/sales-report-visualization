import React, { Component } from 'react';
import * as d3 from "d3"; 

class TreeChart extends Component {
  state = {  }
  componentDidUpdate(){
    document.getElementById(this.props.id).innerHTML = '';
    let {dseUniqueData} = this.props;
    let resp = dseUniqueData;
    let treeData = dseUniqueData;;
    if(Object.keys(dseUniqueData).length !==0 && dseUniqueData.children.length !==0){
      // var treeData;
      
      // // Set the dimensions and margins of the diagram
      // var margin = {top: 20, right: 90, bottom: 30, left: 90},
      // width = 960 - margin.left - margin.right,
      // height = 1000 - margin.top - margin.bottom;
      // var i = 0,
      // duration = 750,
      // rectH=30,
      // rectW=60,
      // root;
      
      
      // var svg = d3.select("#tree").append("svg")
      // .attr("width",'100%')
      // .attr("height", height)
      // .call(d3.zoom()
      // .scaleExtent([1 / 2, 8])
      // .on("zoom", zoomed))
      // .append("g")
      // .attr("transform", "translate("
      // + (margin.right) + "," + margin.top + ")");
      // function zoomed() {
      //   svg.attr("transform", d3.event.transform);
      // }
      
      
      // function collapse(d) {
      //   if(d.children) {
      //     d._children = d.children
      //     d._children.forEach(collapse)
      //     d.children = null
      //   }
      // }
      
      
      // // declares a tree layout and assigns the size
      // var treemap = d3.tree().nodeSize([170, 170]);
      // treeData = resp;
      // // Assigns parent, children, height, depth
      // root = d3.hierarchy(treeData, function(d) { return d.children; });
      
      // //form x and y axis
      // root.x0 = 0;
      // root.y0 = height/2;
      
      
      // // Collapse after the second level
      // root.children.forEach(collapse);
      
      // update(root);
      
      // // Collapse the node and all it's children
      
      
      // function getText(node) {
      //   var textsize = 16;
      //   var maxChar = (rectW / textsize);
      
      //   var text = node.name;
      
      //   if (node.node_id == "dummy_node") {
      //     return "";
      //   } else {
      //     return text;
      //   }
      
      
      
      // }
      // function wrap(text, width) {
      //   text.each(function () {
      //     var text = d3.select(this),
      //     words = text.text().split(/\s+/).reverse(),
      //     word,
      //     line = [],
      //     lineNumber = 0,
      //     lineHeight = 1.1, // ems
      //     x = text.attr("x"),
      //     y = text.attr("y"),
      //     dy = 0, //parseFloat(text.attr("dy")),
      //     tspan = text.text(null)
      //     .append("tspan")
      //     .attr("x", x)
      //     .attr("y", y)
      //     .attr("dy", dy + "em");
      //     while (word = words.pop()) {
      //       line.push(word);
      //       tspan.text(line.join(" "));
      //       if (tspan.node().getComputedTextLength() > width) {
      //         line.pop();
      //         tspan.text(line.join(" "));
      //         line = [word];
      //         tspan = text.append("tspan")
      //         .attr("x", x)
      //         .attr("y", y)
      //         .attr("dy", ++lineNumber * lineHeight + dy + "em")
      //         .text(word);
      //       }
      //     }
      //   });
      // }
      
      
      // function update(source) {
      
      //   // Assigns the x and y position for the nodes
      //   var treeData = treemap(root);
      
      //   // Compute the new tree layout.
      //   var rootNode = treeData.descendants()[0];
      //   var nodes = treeData.descendants().slice(1),
      //   links = treeData.descendants().slice(rootNode.children.length+1);
      
      //   // Normalize for fixed-depth.
      //   nodes.forEach(function(d){ 
      //     console.log(d);
      //     //if(d.depth == 1){
      //     d.y = d.depth * 180;  
      //     //}else{
      //     //  d.y = d.depth * 40;
      //     //}
      
      //   });
      
      //   // ****************** Nodes section ***************************
      
      //   // Update the nodes...
      //   var node = svg.selectAll('g.node')
      //   .data(nodes, function(d) {console.log(d);return d.id || (d.id = ++i); });
      
      //   // Enter any new modes at the parent's previous position.
      //   var nodeEnter = node.enter().append('g')
      //   .attr('class', 'node')
      //   .attr("transform", function(d) {
      //     return "translate(" + source.x + "," + source.y + ")";
      //   })
      //   .on('click', click);
      
      //   // Add Rectangle for the nodes
      //   nodeEnter.append("rect")
      //   .attr('x',-70)
      //   .attr('y',-120)
      //   .attr("width", 50)
      //   .attr("height", 50)
      //   .attr("stroke", "black")
      //   .attr("stroke-width", 1)
      //   .style("fill", function(d) {
      //     return d._children ? "lightsteelblue" : "#fff";
      //   });
      
      //   // Add labels for the nodes
      
      //   nodeEnter.append("text").attr("x", 0).attr("y", -40).attr("width",150 + 20)
      //   .attr("dy", ".35em").attr("text-anchor", "middle").text(function(d) { return d.data.name; }).call(wrap, 80);
      //   /*nodeEnter.append('text')
      //   .attr("dy", ".35em")
      //   .attr("x", function(d) {
      //     return d.children || d._children ? -13 : 13;
      //   })
      //   .attr("text-anchor", function(d) {
      //     return d.children || d._children ? "end" : "start";
      //   })
      //   .text(function(d) { return d.data.name; });
      //   */
      //   // UPDATE
      //   var nodeUpdate = nodeEnter.merge(node);
      
      //   // Transition to the proper position for the node
      //   nodeUpdate.transition()
      //   .duration(duration)
      //   .attr("transform", function(d) { 
      //     return "translate(" + d.x + "," + d.y + ")";
      //   });
      
      //   // Update the node attributes and style
      //   nodeUpdate.select("rect").attr("width", 150).attr("height", 150)
      //   .attr("stroke", "black")
      //   .attr("stroke-width",1)
      //   .style("fill", function(d) {
      //     return d._children ? "lightsteelblue" : "#fff";
      //   })
      //   .attr('cursor', 'pointer');
      
      //   nodeUpdate.select("text").style("fill-opacity", 1);
      
      
      //   // Remove any exiting nodes
      //   var nodeExit = node.exit().transition()
      //   .duration(duration)
      //   .attr("transform", function(d) {
      //     return "translate(" + source.x + "," + source.y + ")";
      //   })
      //   .remove();
      
      //   // On exit reduce the node circles size to 0
      
      //   nodeExit.select("rect")
      //   .attr('x',-70)
      //   .attr('y',-70)
      //   .attr("width", 150).attr("height", 150)
      //   .attr("stroke", "black")
      //   .attr("stroke-width", 1);
      
      
      //   // On exit reduce the opacity of text labels
      //   nodeExit.select('text')
      //   .style('fill-opacity', 1e-6);
      
      //   // ****************** links section ***************************
      
      //   // Update the links...
      //   var link = svg.selectAll('path.link')
      //   .data(links, function(d) { return d.id; });
      
      //   // Enter any new links at the parent's previous position.
      //   var linkEnter = link.enter().insert('path', "g")
      //   .attr("class", "link")
      //   .attr('d', function(d){
      //     var o = {x: source.x, y: source.y}
      //     return diagonal(o, o)
      //   });
      
      //   // UPDATE
      //   var linkUpdate = linkEnter.merge(link);
      
      //   // Transition back to the parent element position
      //   linkUpdate.transition()
      //   .duration(duration)
      //   .attr('d', function(d){ return diagonal(d, d.parent) });
      
      //   // Remove any exiting links
      //   var linkExit = link.exit().transition()
      //   .duration(duration)
      //   .attr('d', function(d) {
      //     var o = {x: source.x, y: source.y}
      //     return diagonal(o, o)
      //   })
      //   .remove();
      
      //   // Store the old positions for transition.
      //   nodes.forEach(function(d){
      //     d.x0 = d.x * 2;
      //     d.y0 = d.y * 2;
      //   });
      // }
      
      // // Creates a curved (diagonal) path from parent to the child nodes
      // function diagonal(s, d) {
      
      //   let path = `M ${s.x} ${s.y}
      //   C ${(s.x + d.x)/2} ${s.y},
      //   ${(s.x + d.x) / 2} ${d.y},
      //   ${d.x} ${d.y}`
      
      //   return path
      // }
      
      // // Toggle children on click.
      // function click(d) {
      //   if (d.children) {
      //     d._children = d.children;
      //     d.children = null;
      //   } else {
      //     d.children = d._children;
      //     d._children = null;
      //   }
      //   update(d);
      // }
      var margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
      
      var colorScale = d3.scaleLinear()
      .domain([0, 1])
      .range(['red', 'green']);
      var widthScale = d3.scaleLinear()
      .domain([1,80])
      .range([1, 10]);
      
      // append the svg object to the tree of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select(`#${this.props.id}`).append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .call(d3.zoom()
      .scaleExtent([1 / 2, 8])
      .on("zoom", zoomed))
      .append("g")
      .attr("transform", "translate("
      + margin.left + "," + margin.top + ")");

      function zoomed() {
        svg.attr("transform", d3.event.transform);
      }
      
      var i = 0,
      duration = 750,
      root;
      
      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([height, width]);
      
      // Assigns parent, children, height, depth
      root = d3.hierarchy(treeData, function(d) { return d.children; });
      root.x0 = (height / 2);
      root.y0 = 0;
      // Collapse after the second level
      root.children.forEach(collapse);
      
      update(root);
      
      // Collapse the node and all it's children
      function collapse(d) {
        if(d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }
      
      function update(source) {
        
        // Assigns the x and y position for the nodes
        var treeData = treemap(root);
        
        // Compute the new tree layout.
        var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);
        
        // Normalize for fixed-depth.
        nodes.forEach(function(d){ d.y = d.depth * 180});
        
        // ****************** Nodes section ***************************
        
        // Update the nodes...
        var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });
        
        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);
        
        // Add Circle for the nodes
        nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .style("stroke", function(d){return colorScale(d.data.female/(d.data.female + d.data.male))});
        
        // Add labels for the nodes
        nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
          return `${d.data.name}${typeof d.data.children !== 'undefined' ? `(${d.data.count.toLocaleString()})` : ''}`; 
        })

        
        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);
        
        // Transition to the proper position for the node
        nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
          return "translate(" + (d.y + 30) + "," + d.x + ")";
        });
        
        // Update the node attributes and style
        nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');
        
        
        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();
        
        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
        .attr('r', 1e-6);
        
        // On exit reduce the opacity of text labels
        nodeExit.select('text')
        .style('fill-opacity', 1e-6);
        
        // ****************** links section ***************************
        
        // Update the links...
        var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; })
        .style('stroke-width', function(d){
          return widthScale(d.data.value)
        });
        
        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        })
        .style('stroke-width', function(d){
          return widthScale(d.data.value)
        });
        
        // UPDATE
        var linkUpdate = linkEnter.merge(link);
        
        // Transition back to the parent element position
        linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });
        
        // Remove any exiting links
        var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .style('stroke-width', function(d){
          return widthScale(d.data.value)
        })
        .remove();
        
        // Store the old positions for transition.
        nodes.forEach(function(d){
          d.x0 = d.x;
          d.y0 = d.y;
        });
        
        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
          
          let path = `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`
          
          return path
        }
        
        // Toggle children on click.
        function click(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        }
      }
    }
  }
  render() {
    return (
      <div id={this.props.id}></div>
    );
  }
}

export default TreeChart;