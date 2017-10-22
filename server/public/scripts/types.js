
function openAddType() {
  $('#typeDiv').show();
}

function addType() {
  var newOptions = {
    alpha: 'Show all',
    blue: $('#blue').val(),
    green: $('#green').val(),
    red: $('#red').val(),
    yellow: $('#yellow').val()
  };

  updateFilter(newOptions);
  updateOptions(newOptions);
  storeTypes(newOptions);
  $('#typeDiv').hide();
}

function storeTypes(object) {
  console.log(object);
  $.ajax({
    url: '/tasks/types',
    type: 'POST',
    data: object
  }).done(function(response) {
    console.log('we done');

  }).fail(function(msg){
    console.log(msg);
  });
}

function getTypes() {
  $.ajax({
    url: '/tasks/types',
    type: 'GET',
  }).done(function(response) {
    var x = response[0];
    var y = {
      blue: x.blue,
      green: x.green,
      red: x.red,
      yellow: x.yellow
    };
    console.log('we got', response, y);
    updateOptions(y);

  }).fail(function(msg){
    console.log(msg);
  });
}

function updateOptions(object) {
  delete object.alpha;
  console.log(object);

  var $el = $("#typeSelect");

  $el.empty();
  $.each(object, function(key,value) {
    console.log("value", value, "key", key);
    if (value != '') {
      $el.append($("<option></option>")
      .data("id", key)
      .attr("value", value).text(value));
    } else {
      $el.append($("<option></option>")
      .data("id", key)
      .attr("value", value).text(value));
    }
  });
}

function updateFilter(object) {
  var $el2 = $("#filterSelect");
  $el2.empty();
  $.each(object, function(key,value) {
    console.log(key, value);
    $el2.append($("<option></option>")
    .data("id", key)
    .attr("value", value).text(value));
  });
}
