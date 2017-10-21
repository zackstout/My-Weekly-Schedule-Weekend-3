
$(document).ready(f1);

console.log('js');

function f1() {
  console.log('jq');
  $('.tab-link').on('click', changeTabs);
  $('#addType').on('click', addType);
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

function addType() {
  // var blue = $('#type1').val();
  // var green = $('#type2').val();
  // var red = $('#type3').val();
  // var yellow = $('#type4').val();
  var newTypes = {};

  for (var i = 1; i <=4; i++) {
    if ($('#type' + i) !== '') {
      newTypes.i = $('#type' + i).val();
    }
  }
  console.log(newTypes);

}

function addTask(task) {
  var objectSent = {
    name: $('#task').val(),
    type: $('#type').val(),
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
