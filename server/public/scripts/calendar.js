
//counter to ensure we only append heading once:
var count = 0;

//how i did it at first, should probably be replaced by moment logic --- aaaaand replaced:
function getTime() {
    getWeek();
  }

//lets us pull down moment functionality from the server:
  function getWeek() {
    $.ajax({
      url: '/tasks/calendar',
      type: 'GET'
    }).done(function(response) {
      updateWeek(response);
      $('#today').text(response[0]);
    }).fail(function(msg){
      console.log(msg);
    });
  }

//add headings and call function to update tasks in calendar:
function updateWeek(arr) {
  var row = $('<tr><td>' + arr[0].slice(0, -5) + '</td><td>' + arr[1].slice(0, -5) + '</td><td>' + arr[2].slice(0, -5) + '</td><td>' + arr[3].slice(0, -5) + '</td><td>' + arr[4].slice(0, -5) + '</td><td>' + arr[5].slice(0, -5) + '</td><td>' + arr[6].slice(0, -5) + '</td> </tr>');

  if (count === 0) {
  $('#weekhead').append(row);
}
  updateTasks(arr);
  count++;
}

//grab our tasks for the week from the DB:
function updateTasks(week) {
  // console.log(week);
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

//and finally, update the calendar:
function updateCalendar(response, week) {
for (var i = 0; i < response.length; i++) {
  for (var j = 0; j < week.length; j++) {
    if (response[i].due == week[j]) {
      // console.log(response[i]);
      var color = response[i].typecolor;
      var k = j+1;
      $('#day' + k).append('<li id="cal'+color+i+'">' + response[i].name + '</li>');

      // console.log(color);

//rather clumsy way of setting background colors of tasks in calendar:
      if (color == 'blue'){
        $('#cal'+color+i).css('background-color', 'rgba(0, 0, 255, 0.5)');
      } else if (color == 'green'){
        $('#cal'+color+i).css('background-color', 'rgba(51, 153, 51, 0.5)');
      } else if (color == 'red'){
        $('#cal'+color+i).css('background-color', 'rgba(255, 0, 0, 0.5)');
      } else if (color == 'yellow'){
        $('#cal'+color+i).css('background-color', 'rgba(255, 255, 102, 0.5)');
      }
    }
  }
}}
