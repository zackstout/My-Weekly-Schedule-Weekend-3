
$(document).ready(f1);

console.log('js');

function f1() {
  console.log('jq');
  $('.tab-link').on('click', changeTabs);
  $('#addTypes').on('click', openAddType);
  $('.container').on('click', '#update', addType);
  $('#submit').on('click', addTask);
  $('#viewTasks').on('click', '#del', deleteTask);
  $('#viewTasks').on('click', '#completion', completeTask);
  getTasks();


  var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

$('#today').text(today);

}

//from codepen
function changeTabs() {
  var tab_id = $(this).data().tab;
  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $('#' + tab_id).addClass('current');
}

function openAddType() {
  $('#typeDiv').show();
}


function addType() {

  var newOptions = {blue: $('#blue').val(),
  green: $('#green').val(),
  red: $('#red').val(),
  yellow: $('#yellow').val()
};
console.log(newOptions);

var $el = $("#typeSelect");

$el.empty();
$.each(newOptions, function(key,value) {
  console.log("value", value, "key", key);
  if (value != '') {
  $el.append($("<option></option>")
  .data("id", key)
  .attr("value", value).text(value));
} else {
  $el.append($("<option></option>")
  .attr("value", value).text(value));
}
});

$('#typeDiv').hide();

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

function appendTasks(tasks) {
  $('#viewTasks').empty();

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var x = task.typecolor;
    // var $trow = $('#viewTasks').append('<tr class=color' + x + ' id=' + i + '></tr>');
    var completion = '<button id="completion" data-id=" ' + task.id + '"> Done? </button>';
    if (task.complete) {
      completion = '';
    }
    $('#viewTasks').append('<tr id=' + i + '><td>' + task.name + '</td> <td>' + task.type + '</td> <td>' + task.description + '</td> <td>' + task.due + '</td>  <td> '+ completion +'  </td> <td> <button id="edit" data-id=" ' + task.id + '"> Edit </button> </td> <td> <button id="del" data-id=" ' + task.id + '"> Delete </button> </td><td>' + x + '</td></tr>');

    console.log($('#' + i));
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

function completeTask() {
  var taskId = $(this).data("id");
console.log('completing task..', taskId);
  $(this).remove();
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
