
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



//

//from codepen
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
  if (objectSent.name == '') {
    alert('enter a task goofball!');
    $('#task').focus();
  }
  if (editing) {
      // Switch back to add new product mode
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
  getWeek();
}




/*
--want animation upon completion of task, prob append an image?
--form validation
--highlight overdue tasks in red
--add a clear history button
--interesting bug: when you click a button in filtered stage it will return to unfiltered
--colors: 94 in client,
*/

//all of this is extra files to test:
