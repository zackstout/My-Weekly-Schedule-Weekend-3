
$(document).ready(f1);

console.log('js');

function f1() {
  console.log('jq');
  $('#due').datepicker();
  $('.tab-link').on('click', changeTabs);
  $('#addTypes').on('click', openAddType);
  $('.container').on('click', '#update', addType);
  $('#submit').on('click', addTask);
  $('#viewTasks').on('click', '#del', deleteTask);
  $('#viewTasks').on('click', '#completion', completeTask);
  $('#filterSend').on('click', filterTasks);

  getTasks();


  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

  $('#today').text(today);

  $.ajax({
    url: '/tasks/calendar',
    type: 'GET'
  }).done(function(response) {
    console.log(response);
  }).fail(function(msg){
    console.log(msg);
  });


}

//from codepen
function changeTabs() {
  var tab_id = $(this).data().tab;
  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $('#' + tab_id).addClass('current');
}


function addTask(task) {
  var objectSent = {
    name: $('#task').val(),
    type: $('#typeSelect option:selected').text(),
    description: $('#desc').val(),
    due: $('#due').val(),
    complete: 'false',
    typecolor: $('#typeSelect option:selected').data().id
  };
  postTask(objectSent);
  console.log(objectSent);
}

function postTask(task) {

  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: task
  }).done(function(response) {
    getTasks();
  }).fail(function(msg){
    console.log(msg);
  });
}

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

function filterTasks() {
  var filter = $('#filterSelect option:selected');
  console.log(filter.text(), 'hi', filter.data().id);

  $.ajax({
    url: '/tasks/' + filter.data().id,
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
    // var completion = '<input type=checkbox id="box'+i+'" data-id=" '+ task.id + '"/>';

    if(task.complete){
      completion = '';
    }

    $('#viewTasks').append('<tr id=' + i + '><td>' + task.name + '</td> <td>' + task.type + '</td> <td>' + task.description + '</td> <td>' + task.due + '</td>  <td> '+ completion +'  </td> <td> <button id="edit" data-id=" ' + task.id + '"> Edit </button> </td> <td> <button id="del" data-id=" ' + task.id + '"> Delete </button> </td><td>' + x + '</td></tr>');
    //
    // if (task.complete) {
    //   console.log('hi', '#box'+i);
    //   $('#box'+i).prop("checked", true);
    //
    // }

    changeBackgroundColor(x, i);
  }
}

function changeBackgroundColor(x, i) {
  if (x === 'blue') {
    $('#' + i).css('background-color', 'blue');
  } else if (x === 'green') {
    $('#' + i).css('background-color', 'green');
  } else if (x === 'red') {
    $('#' + i).css('background-color', 'red');
  } else if (x === 'yellow') {
    $('#' + i).css('background-color', 'yellow');
  }
}

function deleteTask() {
  var taskId = $(this).data("id");
  console.log("deleted task ...",  $(this).data("id"));
  if (confirm("Are you sure???")) {
    $.ajax ({
      type: 'DELETE',
      url: '/tasks/' + taskId,
    }).done(function(response){
      console.log(response);
      $(this).parent().parent().remove();
      getTasks();
    }).fail(function(error){
      console.log('Sad tasks :(');
    });
  }
  return false;
}

function completeTask() {
  var taskId = $(this).data("id");
  console.log('completing task..', taskId);
  // $(this).remove();
  $.ajax ({
    type: "PUT",
    url: '/tasks/'+ taskId,
  }).done(function(response){
    console.log(response);
    getTasks();
  });
}

function editTask() {

}
