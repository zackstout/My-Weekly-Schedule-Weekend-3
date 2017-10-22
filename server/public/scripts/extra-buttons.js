
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
    getWeek();
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
  getWeek();
}

function editTask() {

}
