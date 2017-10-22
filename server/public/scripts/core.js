
var editing = false;
var editingId = 0;
//

function getTasks() {

  $.ajax({
    url: '/tasks',
    type: 'GET'
  }).done(function(response) {
    appendTasks(response);

  }).fail(function(msg) {
    console.log(msg);
  });

}

function appendTasks(tasks) {
  $('#viewTasks').empty();

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var x = task.typecolor;
    var completion = '<button id="completion" data-id=" ' + task.id + '"> Done? </button>';

    if(task.complete){
      completion = '';
    }

//somehow adding data to tr screwed up color representation
    $('#viewTasks').append('<tr id="' + i + '" data-task="' +task+'"><td>' + task.name + '</td> <td>' + task.type + '</td> <td>' + task.description + '</td> <td>' + task.due + '</td>  <td> '+ completion +'  </td> <td> <button id="edit" data-id=" ' + task.id + '"> Edit </button> </td> <td> <button id="del" data-id=" ' + task.id + '"> Delete </button> </td></tr>');

    changeBackgroundColor(x, i);
  }
}

function changeBackgroundColor(x, i) {
  if (x === 'blue') {
    $('#' + i).css('background-color', 'rgba(0, 0, 255, 0.5)');
  } else if (x === 'green') {
    $('#' + i).css('background-color', 'rgba(0, 255, 0, 0.5)');
  } else if (x === 'red') {
    $('#' + i).css('background-color', 'rgba(255, 0, 0, 0.5)');
  } else if (x === 'yellow') {
    $('#' + i).css('background-color', 'rgba(255, 255, 102, 0.5)');
  }
}