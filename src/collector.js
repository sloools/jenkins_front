import fetch from 'isomorphic-unfetch'

const data = {
  samplingDuration : 2,
  requestPerSecond : 10,
  responseMap : {},
  returnHistory:[],

  requestTimerId: null,
  samplingTimerId: null,

  callback : null
}

function setCallback(fn) {
  data.callback = fn
}

function pushResponse(value) {
  data.responseMap[value] = (data.responseMap[value] || 0) + 1
}
function clearResponseMap() {
  data.responseMap = {}
}
function returnResponse() {
  const result = {...data.responseMap}
  returnHistory.push({
    timestamp: new Date(),
    data: data.responseMap
  })
  clearResponseMap()
  return result
}
function start() {
  //1. 요청 발생기를 가동(requestPerSecond)
  data.requestTimerId = setInterval(()=>{
    fetch('/api/color')
    .then(r=>r.text())
    .then(value=>{
      pushResponse(value)
    })
    .catch(e=>console.error(e))
  }, Math.floor(1000/data.requestPerSecond))
  //2. 요청 수집기를 가동(samplingDuration)
  data.samplingTimerId = setInterval(()=>{
    const res = returnResponse()
    if(typeof data.callback === 'function') {
      data.callback(res)
    }
  }, Math.floor(data.samplingDuration * 1000))
}
function stop() {
  clearInterval(data.requestTimerId)
  clearInterval(data.samplingTimerId)
}

export default {
  start,
  stop,
  // pull: returnResponse,
  set onPush(fn){
    setCallback(fn || null)
  },
  get history() {
    return [].concat(returnHistory)
  }
}