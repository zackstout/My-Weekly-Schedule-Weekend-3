
$(document).ready(f1);

console.log('js');

function f1() {
  console.log('jq');
  $('.tab-link').on('click', changeTabs);
  $('#addTypes').on('click', openAddType);
  $('.container').on('click', '#update', addType);
  $('#submit').on('click', addTask);
  getTasks();
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
  var newOptions = {"1": $('#blue').val(),
  "2": $('#green').val(),
  "3": $('#red').val(),
  "4": $('#yellow').val()
};
console.log(newOptions);

var $el = $("#typeSelect");
$el.empty();
$.each(newOptions, function(key,value) {
  $el.append($("<option></option>")
  .attr("value", value).text(value));
});

}

function addTask(task) {
  var objectSent = {
    name: $('#task').val(),
    type: $('#typeSelect option:selected').text(),
    description: $('#desc').val(),
    due: $('#due').val(),
    complete: 'false'
  };
  postTask(objectSent);

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
    //added an 's'
    var task = tasks[i];
    var $trow = $('#viewTasks').append('<tr></tr>');
    $($trow).append('<td>' + task.name + '</td> <td>' + task.type + '</td> <td>' + task.description + '</td> <td>' + task.due + '</td>  <td> '+ task.complete +'  </td>');
  }
}
//
// function deleteTask() {
//   var koalaId = $(this).data("id");
//   console.log("deleted Koala :(",  $(this).data("id"));
//   $.ajax ({
//     type: 'DELETE',
//     url: '/koalas/' + koalaId,
//   }).done(function(response){
//     console.log(response);
//     $(this).parent().parent().remove();
//     getKoalas();
//   }).fail(function(error){
//     console.log('Sad Koalas :(');
//   });
// }
//
// function completeTask() {
//   var koalaId = $(this).data("id");
// console.log('super ready koalas!');
//   $(this).remove();
// $.ajax ({
//   type: "PUT",
//   url: '/koalas/'+ koalaId,
// }).done(function(response){
//   console.log(response);
//   getKoalas();
// });
// }

function editTask() {

}
