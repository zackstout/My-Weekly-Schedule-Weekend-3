
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
  getTime();
  getTypes();
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
  // console.log(objectSent);
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

  $('#posted').show().delay(300).fadeOut(1800);
  getWeek();
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

function appendTasks(tasks) {
  $('#viewTasks').empty();

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var x = task.typecolor;
    var completion = '<button id="completion" data-id=" ' + task.id + '"> Done? </button>';

    if(task.complete){
      completion = '';
    }

    $('#viewTasks').append('<tr id=' + i + '><td>' + task.name + '</td> <td>' + task.type + '</td> <td>' + task.description + '</td> <td>' + task.due + '</td>  <td> '+ completion +'  </td> <td> <button id="edit" data-id=" ' + task.id + '"> Edit </button> </td> <td> <button id="del" data-id=" ' + task.id + '"> Delete </button> </td></tr>');

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


/*
--presumably want new types to be stored and remembered
--want animation upon completion of task, prob append an image?
--form validation
--animation upon submitting a task
--highlight overdue tasks in red
--add a clear history button
*/
