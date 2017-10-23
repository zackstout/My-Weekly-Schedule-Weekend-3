
console.log('js');

$(document).ready(f1);


var editingId = 0;
var editing = false;
var history = 0;


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
  $('#clearHistory').on('click', clearHistory);
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
  //
  // function updateText() {
  //   $('#sub').text('New task:');
  // }
  //
  // function updateText2() {
  //   $('#sub').text('Please submit again!!!!');
  // }

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

// abandoned edit button for the time being:
// called when edit button is clicked:
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
    // postTask(response);
    getTasks();
  }).fail(function(msg) {
    console.log(msg);
  });
  $('#posted').show().delay(300).fadeOut(1800);

}


// abandoned clear history button for the time being:
function clearHistory() {
  // var x = $('#viewTasks > tr:last').children();
  // var btn = x[5];
  // var z = $(btn).children();
  // var data = $(z).data().id;
  // console.log('welcome to clear...', data);

  var al = $('#viewTasks').children();
  // console.log(al[4]);
  var max = 0;
  var maxUnit = '';

  for (var i = 0; i < al.length; i += 1) {
    var y = al[i];
    var z = $(y).data().id;
    var x = Number(z);
    // console.log(y, z, x);
    if (x > max) {
      max = x;
      maxUnit = y;
    }
  }
  console.log( maxUnit);
  history = max;


}




/*
--want animation upon completion of task, prob append an image?
-I should learn spinning animations, also making something appear over where existing things are on the DOM
--highlight overdue tasks in red, or some indication
--add a clear history button:
-kind of hard to select the highest id value in the table...just go all the way to DB? (Ok solved)
-the thing is, i don't want the user to be able to delete the DB,
-only to affect what's displayed on the DOM
--fix edit button: it's pretty messed up
*/

//all of this is extra files to test:
