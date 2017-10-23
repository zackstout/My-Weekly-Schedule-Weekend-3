
console.log('js');

$(document).ready(f1);


var editingId = 0;
var editing = false;


//click handlers:
function f1() {
  console.log('jq');
  $('#due').datepicker();
  $('.tab-link').on('click', changeTabs);

  $('#addTypes').on('click', openAddType);
  $('.container').on('click', '#update', addType);

  $('#submit').on('click', subClicked);
  $('#viewTasks').on('click', '#del', deleteTask);
  $('#viewTasks').on('click', '#completion', completeTask);
  $('#viewTasks').on('click', '#edit', editTask);
  $('#filterSend').on('click', filterTasks);
  getTasks();
  getTime();
  getTypes();
  updateFilter(types);
  $('#task').focus();
}

//from codepen, but streamlined:
function changeTabs() {
  var tab_id = $(this).data().tab;
  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $('#' + tab_id).addClass('current');
}

//call when submit btn is clicked:
function subClicked() {
  var objectSent = {
    name: $('#task').val(),
    type: $('#typeSelect option:selected').text(),
    description: $('#desc').val(),
    due: $('#due').val(),
    complete: 'false',
    typecolor: $('#typeSelect option:selected').data().id
  };

  //form validation:
  if (objectSent.name == '') {
    alert('enter a task goofball!');
    $('#task').focus();
    return;
  }
  if (objectSent.due == '') {
    alert('enter a date goofball!');
    $('#due').focus();
    return;
  }

  //check whether editing or adding:
  if (editing) {
    console.log('now editing!');
      editing = false;
      $('#sub').text('New task:');
      updateTask(objectSent);
    } else {
      console.log('now adding!');
      postTask(objectSent);
    }
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
  $('.formIn').val('');
  $('#task').focus();
  getWeek();
}


//called when edit button is clicked:
function editTask() {
  editing = true;
  editingId = $(this).data().id;

  console.log('in editTask...editing no.', editingId);
  $('#sub').text('Edit task:');
  var name = $(this).closest('tr').data().name; // data we set when appending
  var desc = $(this).closest('tr').data().description;
  var date = $(this).closest('tr').data().due;
  console.log(name, desc, date);

//set input values:
  $('#task').val(name);
  $('#desc').val(desc);
  $('#due').val(date);

//change to first tab:
  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');
  $('#tab-01').addClass('current');
  $('#tab-1').addClass('current');
}

//called when submit is clicked in editing mode:
function updateTask(task) {
  $.ajax({
    type: 'PUT',
    url: '/tasks/' + editingId,
    data: task
  }).done(function(response) {
    console.log(response);
    getTasks();
  }).fail(function(msg) {
    console.log(msg);
  });
  $('#posted').show().delay(300).fadeOut(1800);

}




/*
--want animation upon completion of task, prob append an image?
--highlight overdue tasks in red
--add a clear history button
--def fix the legend in "My week"
--fix edit button
*/

//all of this is extra files to test:
