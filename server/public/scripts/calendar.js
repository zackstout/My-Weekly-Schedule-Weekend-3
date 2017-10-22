
function getTime() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#today').text(today);
    getWeek();
  }

  function getWeek() {
    $.ajax({
      url: '/tasks/calendar',
      type: 'GET'
    }).done(function(response) {
      updateWeek(response);
    }).fail(function(msg){
      console.log(msg);
    });
  }

var count = 0;

function updateWeek(arr) {
  var row = $('<tr><td>' + arr[0] + '</td><td>' + arr[1] + '</td><td>' + arr[2] + '</td><td>' + arr[3] + '</td><td>' + arr[4] + '</td><td>' + arr[5] + '</td><td>' + arr[6] + '</td> </tr>');
  // console.log(arr);
  // for (var i = 0; i < arr.length; i++) {
  //   row.append('<td>' + arr[i] + '</td>');
  // }
  // console.log(row);
  if (count === 0) {
  $('#week').prepend(row);
}
  updateTasks(arr);
  count++;

}

function updateTasks(week) {
  console.log(week);
  $('.day').empty();

  $.ajax({
    url: '/tasks/week',
    type: 'GET'
  }).done(function(response) {
    // console.log(response);
    updateCalendar(response, week);

  }).fail(function(msg) {
    console.log(msg);
  });
}

function updateCalendar(response, week) {
for (var i = 0; i < response.length; i++) {
  for (var j = 0; j < week.length; j++) {
    if (response[i].due == week[j]) {
      // console.log(response[i]);
      var color = response[i].typecolor;
      var k = j+1;
      $('#day' + k).append('<li id="cal'+color+'">' + response[i].name + '</li>');

      if (color == 'blue'){
        $('#cal'+color).css('background-color', 'blue');
      } else if (color == 'green'){
        $('#cal'+color).css('background-color', 'green');
      } else if (color == 'red'){
        $('#cal'+color).css('background-color', 'red');
      } else if (color == 'yellow'){
        $('#cal'+color).css('background-color', 'yellow');
      }
    }
  }
}}
