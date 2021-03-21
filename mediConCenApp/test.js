// internal testing, debugging use only

function getMonthDuration(time){
  var date = new Date(time);
  var start = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  var end = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime();
  return [start, end]
}
function getDayDuration(time){
  var date = new Date(time);
  var start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime();
  return [start, start+ 1000*60*60*24]
}
function getWeekDuration(time){
  var date = new Date(time);
  date.setDate(date.getDate() - (date.getDay() + 6) % 7);
  var start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime();
  return [start, start + 1000*60*60*24*7]
}

console.log(getMonthDuration(1609473601000))
console.log(getDayDuration(1609473601000))
console.log(getWeekDuration(Date.now()))