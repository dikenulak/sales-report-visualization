import React, { Component } from 'react';
import * as d3 from "d3";

class ScatterPlot extends Component {
    state = {  
        colors:[{
            color:'#f44336',
            text:'0 - 30'
        },
        {
            color:'#ffeb3b',
            text:'30 - 60'
        },
        {
            color:'#4caf50',
            text:'60 - 100'
        }]
    }
    color = (color)=>{
        if(color <= 30){
            return '#f44336';
        }
        if(color >30 && color < 61){
            return '#ffeb3b';
        }
        if(color > 60){
            return '#4caf50';
        }
    }
    componentDidUpdate(prevProps,prevState){
        // red-#f44336 green-#4caf50 yellow-#ffeb3b
        let {callDetailData,id,xAxisText,yAxisText }= this.props;
        if(prevProps.callDetailData !== this.props.callDetailData){
        let data = callDetailData;
            let margin = {top: 60,right: 20,bottom: 120,left: 60},
            width = 700,
            height = 400;
            
            let tooltip = d3.select('body').append('div')
            .attr('id', 'tooltip');
            
            let x = d3.scaleLinear()
            .range([0,width]);
            
            let y = d3.scaleLinear()
            .range([height, 0]);
            
            let chart = d3.select(`#${id}`)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

                let newData = [...new Set(callDetailData.map(d=> parseInt(d.total_schedule_call)))]
                x.domain([0,d3.max(newData,d => d)]);
                y.domain([0,d3.max(data,d => parseInt(d.successfull_call))]);
                
                chart.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr('x','-10')
                .attr('dy','0')
                .attr('transform', `rotate(-75)`)
                .style('text-anchor','end')
                
                
                chart.append('text')             
                .attr('transform', `translate(${width/2},${height + margin.top})`)
                .attr('id', 'x-label')
                .text(xAxisText);
                
                chart.append('g')
                .call(d3.axisLeft(y));

                let legend =  d3.select(`#${id}`).append('g').attr('transform','translate(100,0)').attr('text-anchor','start')
                .selectAll('.rec').data(this.state.colors).enter().append('g')
                .attr('transform',(d,i) => `translate(${80*i},0)`)

                legend.append('rect')
                .attr('height','15px')
                .attr('width','15px')
                .style('fill',(d)=>{
                    return d.color
                });
                legend.append('text')
                .attr('x','1.5em')
                .attr('y','1em')
                .style('font-size','12px')
                .text((d)=> `${d.text}%`)

                chart.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('dx', '-13em')
                .attr('dy', '-2.5em')
                .text(yAxisText);

                let color = d3.scaleOrdinal(d3.schemeBlues[9]);
                
                chart.selectAll('.circle')
                .data(data)
                .enter().append('circle')
                .attr('class','circle')
                .attr('cx', (d) => x(d.total_schedule_call))
                .attr('cy', (d) => y(d.successfull_call))
                .attr('fill',(d) => this.color(parseInt(d.productivity)))
                .attr('r', 8)
                .style('cursor','pointer')
                .on('mouseover', function(d) {
                    this.setAttribute('stroke','black')
                    this.setAttribute('stroke-width','2px')
                    tooltip.transition()
                    .duration(100)		
                    .style('opacity', .9);
                    tooltip.html(`<div>${d.name}</div>
                    <div>Productivity: <b>${d.productivity}%</b></div>
                    <div>Schedule call: <b>${d.total_schedule_call}</b></div>
                    <div>Successfull Call: <b>${d.successfull_call}</b></div>
                    `)
                    .style('left', `${d3.event.pageX + 2}px`)	
                    .style('top', `${d3.event.pageY - 18}px`);
                })
                .on('mouseout', function() {		
                    this.removeAttribute('stroke')
                    tooltip.transition()		
                    .duration(400)		
                    .style('opacity', 0);	
                });
            }
    }
    render() {
        const {callDetailData,id,text} = this.props;
        const count = [...new Set(callDetailData.map(d=> d.total_schedule_call))]
        return (
            <div>
                <div><h1>{callDetailData.length} {text}</h1></div>
             <svg id={id}></svg>
            </div>
            
        );
    }
}

export default ScatterPlot;