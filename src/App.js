import React from 'react';
import './App.css';
import  CanvasJSReact from './canvasjs.react'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const data = [
  { x: 1, y: 64 },
  { x: 2, y: 61 },
  { x: 3, y: 64 },
  { x: 4, y: 62 },
  { x: 5, y: 64 },
  { x: 6, y: 60 },
  { x: 7, y: 58 },
  { x: 8, y: 59 },
  { x: 9, y: 53 },
  { x: 10, y: 54 },
  { x: 11, y: 61 },
  { x: 12, y: 60 },
  { x: 13, y: 55 },
  { x: 14, y: 60 },
  { x: 15, y: 56 },
  { x: 16, y: 60 },
  { x: 17, y: 59.5 },
  { x: 18, y: 63 },
  { x: 19, y: 58 },
  { x: 20, y: 54 },
  { x: 21, y: 59 },
  { x: 22, y: 64 },
  { x: 23, y: 59 }
]
const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2", // "light1", "dark1", "dark2"
  title:{
    text: "Routing Split"
  },
  axisY: {
    title: "Rate",
    includeZero: false,
    suffix: "%"
  },
  axisX: {
    title: "X",
    prefix: "",
    interval: 2
  },
  data: [{
    type: "line",
    toolTipContent: "Week {x}: {y}%",
    dataPoints: data
  }]
}

let tick = 0

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataGreen: [],
      dataBlue: []
    }
  }

  componentDidMount() {
    // this.startTick()
  }

  componentWillUnmount() {
    this.stopTick()
  }

  startTick() {
    this.timerID = setInterval( ()=>this.tick(), 1000)
  }
  stopTick() {
    clearInterval(this.timerID)
  }

  tick() {
    const val = Math.floor(Math.random() * 100)
    const val2 = Math.floor(Math.random() * 100)
    this.setState({
      tick: tick++, //XXX data의 수정을 state에, 그것도 setState에 위임하면 안됨. async이므로.
      dataGreen: this.state.dataGreen.concat(val).slice(-50),
      dataBlue: this.state.dataBlue.concat(val2).slice(-50)
    })
  }

  render(){
    const data = []
    data.push({
      type: 'line',
      dataPoints: this.state.dataGreen.map((y, idx)=>({y, x:this.state.tick + idx}))
    })
    data.push({
      type: 'line',
      dataPoints: this.state.dataBlue.map((y, idx)=>({y, x:this.state.tick + idx}))
    })
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.tick.bind(this)}>tick</button>
          <button onClick={this.startTick.bind(this)}>startTick</button>
          <button onClick={this.stopTick.bind(this)}>stopTick</button>
          <CanvasJSChart options={{...options, data}}/>
        </header>
      </div>
    );
  }
}

export default App;
