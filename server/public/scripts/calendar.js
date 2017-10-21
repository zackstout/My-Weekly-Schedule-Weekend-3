
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

function updateWeek(arr) {
  var row = $('<tr><td>' + arr[0] + '</td><td>' + arr[1] + '</td><td>' + arr[2] + '</td><td>' + arr[3] + '</td><td>' + arr[4] + '</td><td>' + arr[5] + '</td><td>' + arr[6] + '</td> </tr>');
  // console.log(arr);
  // for (var i = 0; i < arr.length; i++) {
  //   row.append('<td>' + arr[i] + '</td>');
  // }
  // console.log(row);
  $('#week').prepend(row);
  updateTasks(arr);

}

function updateTasks(week) {
  console.log(week);

  $.ajax({
    url: '/tasks/week',
    type: 'GET'
  }).done(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      for (var j = 0; j < week.length; j++) {
        if (response[i].due == week[j]) {
          console.log(response[i]);
          var k = j+1;
          $('#day' + k).append('<li>' + response[i].name + '</li>');
        }
      }
    }
  }).fail(function(msg) {
    console.log(msg);
  });
}
