
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
  updateTasks();

}

function updateTasks() {
  var a = [], b = [], c = [], d = [], e = [], f = [], g = [];
  getMyWeek();

  $('#day1').append('<li>' + '</li>');
}

function getMyWeek() {
  $.ajax({
    url: '/tasks/week',
    type: 'GET'
  }).done(function(response) {
    console.log(response);


  }).fail(function(msg) {
    console.log(msg);
  });
}
