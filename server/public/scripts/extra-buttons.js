
//filter, delete and complete buttons:

//called when filter button is clicked:
function filterTasks() {
  var filter = $('#filterSelect option:selected');
  // console.log(filter.text(), 'hi', filter.data().id);
  $.ajax({
    url: '/tasks/' + filter.data().id,
    type: 'GET'
  }).done(function(response) {
    appendTasks(response);
    filterAll = filter.data().id;
  }).fail(function(msg) {
    console.log(msg);
  });
}

//called when delete button is clicked:
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

//called when complete button is clicked:
function completeTask() {
  var taskId = $(this).data("id");
  // console.log('completing task..', taskId);
  $.ajax ({
    type: "PUT",
    url: '/tasks/'+ taskId,
  }).done(function(response){
    console.log(response);
    getTasks();
  });
  getWeek();
}
