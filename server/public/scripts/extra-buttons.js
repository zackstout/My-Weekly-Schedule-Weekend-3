
var editingId = 0;
var editing = false;

function filterTasks() {
  var filter = $('#filterSelect option:selected');
  // console.log(filter.text(), 'hi', filter.data().id);

  $.ajax({
    url: '/tasks/' + filter.data().id,
    type: 'GET'
  }).done(function(response) {
    appendTasks(response);

  }).fail(function(msg) {
    console.log(msg);
  });
}

function deleteTask() {
  var taskId = $(this).data("id");
  // console.log("deleted task ...",  $(this).data("id"));
  if (confirm("Are you sure???")) {
    $.ajax ({
      type: 'DELETE',
      url: '/tasks/' + taskId,
    }).done(function(response){
      // console.log(response);
      $(this).parent().parent().remove();
      getTasks();
    }).fail(function(error){
      console.log('Sad tasks :(');
    });
    getWeek();
  }
  return false;
}

function completeTask() {
  var taskId = $(this).data("id");
  // console.log('completing task..', taskId);

  $.ajax ({
    type: "PUT",
    url: '/tasks/'+ taskId,
  }).done(function(response){
    // console.log(response);
    getTasks();
  });
  getWeek();
}

//these two functions deal with editing:
function editTask() {
  editing = true;
  editingId = $(this).data('id');
  console.log(editingId);
  $('#sub').text('Editing task!');
  var name = $(this).closest('tr').data().name; // data we set when appending
  var desc = $(this).closest('tr').data().desc;
  $('#name').val(name);
  $('#desc').val(desc);

  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');
  $('#tab-01').addClass('current');
  $('#tab-1').addClass('current');
}

function updateTask(task) {
  $.ajax({
    type: 'PUT',
    url: 'tasks/' + editingId,
    data: task
  }).done(function(response) {
    getTasks();
  }).fail(function(msg) {
    console.log(msg);
  });
}
