
$(document).ready(f1);

console.log('js');

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
      editing = false;
      $('#sub').text('Add a new task!');
      updateTask(objectSent);
    } else {
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




/*
--want animation upon completion of task, prob append an image?
--highlight overdue tasks in red
--add a clear history button
--def fix the legend in "My week"
--fix edit button
*/

//all of this is extra files to test:
