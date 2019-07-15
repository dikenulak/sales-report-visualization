import React, { Component,Fragment } from 'react';
import * as d3 from "d3";

class BubbleChart extends Component {
    state = {  }
    componentDidUpdate(){
        let {bubbleChartData,id}= this.props;
        if(bubbleChartData.length !== 0){
        let data = {
            children: bubbleChartData
        };
        // set the dimensions and margins of the graph
        // var margin = {top: 60, right: 20, bottom: 100, left: 40},
        // width = 960 - margin.left - margin.right,
        // height = 500 - margin.top - margin.bottom;
        
        // // set the ranges
        // var x = d3.scaleBand()
        // .range([0, width])
        // .padding(0.1);
        // var y = d3.scaleLinear()
        // .range([height, 0]);
        
        // // append the svg object to the body of the page
        // // append a 'group' element to 'svg'
        // // moves the 'group' element to the top left margin
        // var svg = d3.select(`#${id}`)
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform", 
        // "translate(" + margin.left + "," + margin.top + ")");
        
        // // Scale the range of the data in the domains
        // x.domain(data.map(function(d) { return d.name; }));
        // y.domain([0, d3.max(data, function(d) { return d.count; })]);
        
        // // append the rectangles for the bar chart
        // svg.selectAll(".bar")
        // .data(data)
        // .enter().append("rect")
        // .attr("class", "bar")
        // .attr("x", function(d) { return x(d.name); })
        // .attr("width", x.bandwidth())
        // .attr("y", function(d) { return y(d.count); })
        // .attr("height", function(d) { return height - y(d.count); });
        
        // // add the x Axis
        // svg.append("g")
        // .attr("transform", "translate(0," + height + ")")
        // .call(d3.axisBottom(x))
        // .selectAll('text')
        // .attr('x','-10')
        // .attr('dy','0')
        // .attr('transform', `rotate(-75)`)
        // .style('text-anchor','end');
        
        // // add the y Axis
        // svg.append("g")
        // .call(d3.axisLeft(y));
        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var bubble = d3.pack(data)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(`#${id}`)
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.count; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            }).on('mouseover',function (d) {
                this.setAttribute('stroke','black');
                this.setAttribute('stroke-width','0.5px');
            }).on('mouseout',function (d) {
                this.removeAttribute('stroke','black');
            });

        node.append("title")
            .text(function(d) {
                return d.data.name + ": " + d.data.count.toLocaleString();
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            }) .on('click',(d)=>{
                this.props.getReasonFromChart(d.data.name)
            });

        node.append("text")
            .attr("dy", "1.4em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white")
            .on('click',(d)=>{
                this.props.getReasonFromChart(d.data.name)                
            });

        node.append("text")
            .attr("dy", "0.2em")
            .style("text-anchor", "middle")
            .text((d)=> {
                return ((d.data.count/this.props.totalUnSuccessfullCall)*100).toFixed(1)+'%';
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/2;
            })
            .attr("fill", "white")
            .on('click',(d)=>{
                this.props.getReasonFromChart(d.data.name)                
            });
        }
    }
    render() {
        const {id,reason} = this.props;
        return (
            <div>
            {reason && <h2>Reason: {reason}</h2>}
            <svg id={id}></svg>
            </div>
            
        );
    }
}

export default BubbleChart;