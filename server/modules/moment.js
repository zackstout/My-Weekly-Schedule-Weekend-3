
var moment = require('moment');
// console.log(moment().add(0, 'days').format('L'));

function nextWeek(){
  var week = [];
  week.push(moment().add(0, 'days').format('L'));
  week.push(moment().add(1, 'days').format('L'));
  week.push(moment().add(2, 'days').format('L'));
  week.push(moment().add(3, 'days').format('L'));
  week.push(moment().add(4, 'days').format('L'));
  week.push(moment().add(5, 'days').format('L'));
  week.push(moment().add(6, 'days').format('L'));
  return week;
}

module.exports = nextWeek;
