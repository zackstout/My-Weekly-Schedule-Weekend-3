
var moment = require('moment');
console.log(moment().add(1, 'days').format('L'));

var week = [];

function nextWeek(){
  week.push(moment().add(1, 'days').format('L'));
  week.push(moment().add(2, 'days').format('L'));
  week.push(moment().add(3, 'days').format('L'));
  week.push(moment().add(4, 'days').format('L'));
  week.push(moment().add(5, 'days').format('L'));
  week.push(moment().add(6, 'days').format('L'));
  week.push(moment().add(7, 'days').format('L'));
  return week;
}

module.exports = nextWeek;
