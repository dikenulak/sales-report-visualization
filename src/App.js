import React, { PureComponent,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import http from './helpers/http';
import DonutChart from './charts/DonutChart.js';
import TreeChart from "./charts/TreeChart.js";
import ScatterPlot from './charts/ScatterPlotChart';
import BubbleChart from './charts/BubbleChart';
import * as d3 from 'd3';


class App extends PureComponent {
  constructor(){
    super();
    this.state ={
      callDetailData :[],
      callCountData: [],
      dseState:'',
      dseDetail:{
        active:[],
        inactive:[]
      },
      dseUniqueData:[],
      callNewData:[],
      peopleWhosCallNotPerformed:[],
      totalScheduleCall: 0,
      successfullCalls:0,
      unSuccessfullCalls:0,
      callDetailDataFrmCSV: [],
      noOrder: [],
      show:false,
      unSuccessfulReasonData:[],
      reason: '',
      newUniqueDseProductivityData: []
    }
    const date = new Date();
    this.dateOfToday = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`
  }
  getDseState = (state)=>{
    this.getUniqueData(state.toLowerCase());
    this.setState({
      dseState: state.toLowerCase()
    })
  }
  getUniqueData = (state)=> {
    const {dseDetail} = this.state;
    let uniqueDistributorDSE = [...new Set(dseDetail[state].map(data => data.townName))];
    let uniqueDistributorData = [...new Set(dseDetail[state].map(data => data.distributorName))];
    uniqueDistributorDSE = uniqueDistributorDSE.map(townName => {
      let newData = dseDetail[state].filter((data)=>(
        townName === data.townName
      )).map((distrib)=>{
        return distrib.distributorName;
      })
      return {
        'name': newData[0],
        children: dseDetail[state].filter(data=>data.distributorName === newData[0]).map(data => (
          {
            'name': data.dseName,
            dseId: data.dseId
          }
        ))
      }
    }).sort(function(a, b){return b.children.length-a.children.length});
    this.setState({
      dseUniqueData: {
        'name': 'Distibutors',
        children: uniqueDistributorDSE
      }
    })
  }
  callCountCsv =()=>{
    d3.csv('/data/callscount.csv',function(params,index,array) {
      return params;
    }).then((data)=>{
      const scheduleCalls = data.map((a,b)=> parseInt(a.schedule_call)).reduceRight((a,b)=> a + b)
      
      const callsNotPerformed = data.map((a,b)=> parseInt(a.call_not_performed)).reduceRight((a,b)=> a + b)
      const peopleWhosCallNotPerformed = data.filter((d,i)=>d.call_not_performed !== '0')
      
      var peopleWhosCallNotPerformedIndividual = [];
      
      peopleWhosCallNotPerformed.forEach(function(value) {
        var existing = peopleWhosCallNotPerformedIndividual.filter(function(v, i) {
          return v.dse_id === value.dse_id;
        });
        if (existing.length) {
          var existingIndex = peopleWhosCallNotPerformedIndividual.indexOf(existing[0]);
          peopleWhosCallNotPerformedIndividual[existingIndex].call_not_performed = parseInt(peopleWhosCallNotPerformedIndividual[existingIndex].call_not_performed)  +parseInt(value.call_not_performed);
        } else {
          if (typeof value.dse_id === 'string')
          value.dse_id = value.dse_id;
          peopleWhosCallNotPerformedIndividual.push(value);
        }
      });
      const uniqueDSE = [...new Set(data.map(data=>data.dse))]
      console.log(data)
      const newUniqueDseProductivityData = uniqueDSE.map(d=> {
        let dataFilterSum = (type)=> (data.filter(dat=> dat.dse == d).map(d=> parseInt(d[type])).reduce((a,b)=>(a+b)))
        return{
          name: d, 
          total_schedule_call: dataFilterSum('schedule_call'),
          successfull_call:dataFilterSum('successfull_call'),
          productivity: parseFloat(((dataFilterSum('successfull_call')/dataFilterSum('schedule_call'))*100).toFixed(1))
        }
      })
      console.log('====================================');
      console.log(newUniqueDseProductivityData);
      console.log('====================================');
      this.setState({
        callNewData:data,
        peopleWhosCallNotPerformed:peopleWhosCallNotPerformedIndividual,
        totalScheduleCall: scheduleCalls,
        newUniqueDseProductivityData
      })
    })
  }
  callDetailCsv = ()=>{
    d3.csv('/data/callsinfo.csv',function(params,index,array) {
      return params;
    }).then((data)=>{
      const callDetailData = data.filter(d=>d.offroute_call === '0');
      const noOrderRemark = [...new Set(callDetailData.map(data=>data.no_order_remark))]
      const uniqueDSE = [...new Set(callDetailData.map(data=>data.dse_name))]
      const successfullCalls = callDetailData.filter(d=>d.order_value !== '0.00');
      const unSuccessfullCalls = callDetailData.filter(d=>d.order_value === '0.00');
      const noOrder = noOrderRemark.filter(d=>(d !== '-')).map((data)=>{
        // console.log( unSuccessfullCalls.filter((d)=>( data === d.no_order_remark))))
        return {
          name: data,
          count : unSuccessfullCalls.filter((d)=>(data === d.no_order_remark)).length
        }
      })
      this.setState({
        successfullCalls,
        unSuccessfullCalls,
        callDetailDataFrmCSV:callDetailData,
        noOrder
      })
    })
  }
  componentDidMount(){
    let _self = this;
    (async ()=>{
      const dseDetail = await http.getDseData('detail');
      const responseCallDetail = await http.get('detail','scheduled','outlet','2010-01-01',this.dateOfToday);
      // const responseCallCount = await http.get('count','scheduled','outlet','2010-01-01',this.dateOfToday);
      this.setState({
        callDetailData : responseCallDetail.data.data.calls,
        // callCountData : responseCallCount.data.data.calls,
        dseDetail: dseDetail.data.data.dse
      })
    })()
    this.callCountCsv();
    this.callDetailCsv();
  }
  callDetail = (detatilData)=>(
    detatilData.map((data,index)=>(
      <div key={index}>
      <h5>{data.retailOutletName}</h5>
      <span>{data.routeName}</span>
      <span>&nbsp;{data.zone}</span>
      </div>
    ))
  )
  callCount = (countData) => (
    countData.map((data,index) => (
      <div key={index}>
      <div><h1>{data.scheduleCalls}</h1>scheduled calls</div>
      <div><h1>{data.callsMade}</h1>calls Made</div>
      <div><h1>{data.callsNotPerformed}</h1>callsNotPerformed</div>
      <div><h1>{data.successfulCalls}</h1>successfulCalls</div>
      <div><h1>{data.unSuccessfulCalls}</h1>unSuccessfulCalls</div>
      <div><h1>{data.productivity}</h1>Productivity</div>
      </div>
    ))
  )
  showChart(type){
    this.setState({
      show: type
    })
  }
  dseUnsuccessfullCount(unSuccessfulReasonData,dseName){
    return unSuccessfulReasonData.filter((data)=>(
      dseName === data.dse_name
    )).length
  }
  getReasonFromChartAndFilter = (reason)=>{
    const {unSuccessfullCalls} = this.state;
    let unSuccessfulReasonData = unSuccessfullCalls.filter((d)=> d.no_order_remark === reason)
    let uniqueDistributorDSE = [...new Set(unSuccessfulReasonData.map(data => data.dse_id))];
    let uniqueDistributorData = [...new Set(unSuccessfulReasonData.map(data => data.subd_name))];
    
    uniqueDistributorData = uniqueDistributorData.map(distributorName => {
      let newData = unSuccessfulReasonData.filter((data)=>(
        distributorName === data.subd_name
      )).map((distrib)=>{
        return distrib.subd_name;
      })
      const dseOfDistributors = [...new Set(unSuccessfulReasonData.filter(data=>data.subd_name === newData[0])
      .map(data => data.dse_name))].map(d=> ({name: d,children: unSuccessfulReasonData.filter(data=>data.dse_name === d).map(d=>({name:d.retail_outlet})), count: this.dseUnsuccessfullCount(unSuccessfulReasonData,d)})).sort((a,b)=>(b.count - a.count));
      
      return {
        'name': newData[0],
        children: dseOfDistributors,
        count: unSuccessfulReasonData.filter(data=>data.subd_name === newData[0]).length
      }
    }).sort(function(a, b){return b.children.length-a.children.length});
    this.setState({
      dseUniqueData: {
        'name': 'Distibutors',
        children: uniqueDistributorData,
        count: unSuccessfulReasonData.length
      },
      reason
    })
  }
  render() {
    const {callDetailData,callCountData,dseDetail,dseUniqueData,dseState,peopleWhosCallNotPerformed,totalScheduleCall,successfullCalls,unSuccessfullCalls,callDetailDataFrmCSV,unSuccessfulReasonData,newUniqueDseProductivityData} = this.state;
    const dseCount = dseState !=='' && `-${dseDetail[dseState].length}`;
    console.log(this.state.show === 'unsuccessfull');
    return (
      <div className='main'>
        {/* <h1>DSE STATS</h1>
          <div className='App'>
          
          <div className='call-detail'> { this.callDetail(callDetailData) }</div>
          <div className='call-count'>{ this.callCount(callCountData) }</div>
          {Object.keys(dseDetail).length !==0 && <DonutChart dseDetail={dseDetail} getDseState={this.getDseState} callsData={this.state.callNewData}/>}
          <h2>{dseState.toUpperCase()}{dseCount}</h2>
          <TreeChart dseUniqueData={dseUniqueData} id="dse-stats"/>
        </div> */}
        <h1>18-25 May</h1>
        <div className='App'>
          <div>
          <h1>{totalScheduleCall.toLocaleString()}</h1>
          <span>Total ScheduleCalls</span>
          </div>
          <div>
          <h1>{successfullCalls && successfullCalls.length.toLocaleString()}</h1>
          <span>Total successful calls</span>
          </div>
          <div onClick={()=>{this.showChart('unsuccessfull')}} className={`unsuccessfull ${this.state.show === 'unsuccessfull' ? 'background': ''}` }> 
          <h1>{unSuccessfullCalls && unSuccessfullCalls.length.toLocaleString()}</h1>
          <span>Total unsuccessful calls</span>
          </div>
          <div>
          <h1>{totalScheduleCall - callDetailDataFrmCSV.length}</h1>
          <span>Calls not performed</span>
          </div>
          <div onClick={()=>{this.showChart('productivity')}} className={`unsuccessfull ${this.state.show === 'productivity' ? 'background': ''}`}>
            <h1>{((successfullCalls && successfullCalls.length / totalScheduleCall)*100).toFixed(3)}%</h1>
            <span>Productivity</span>
          </div>
        </div>
        {/* <ScatterPlot callDetailData={callDetailData} id="scatterCall" text="Scheduled Calls for Outlets Count" xAxisText="Route Name" yAxisText="Sales"/>       */}
        {/* {unSuccessfullCalls && unSuccessfullCalls.map((d,i)=>(
          <div key={i}>{d.no_order_remark} </div> 
        ))} */}
        {/* {this.state.noOrder && this.state.noOrder.map((d,i)=>{
          return <div key={i}>{d.name}-{d.count}</div>
        })} */}
        <div className='App' style={{display: this.state.show === 'unsuccessfull' ? 'flex' : 'none'}}>
          <BubbleChart id='bar-chart' bubbleChartData={this.state.noOrder} getReasonFromChart={this.getReasonFromChartAndFilter} totalUnSuccessfullCall={this.state.unSuccessfullCalls.length} reason={this.state.reason}/>
          <div>
            <TreeChart dseUniqueData={dseUniqueData} id="calls-stats"/>    
          </div>
          {/* <ScatterPlot callDetailData={peopleWhosCallNotPerformed} id="scatterUnsuccessfull" text="DSE who's call not performed" xAxisText="DSE's Name" yAxisText="Calls"/>       */}
        </div> 
        <div className='productivity' style={{display: this.state.show === 'productivity' ? 'flex' : 'none'}}>
        <ScatterPlot callDetailData={newUniqueDseProductivityData} id="scatterProductivity" text="DSE's Productivity Status" xAxisText="Schedule Calls" yAxisText="Successfull Calls"/>  
        </div>
      </div>
    );
  }
}

export default App;
