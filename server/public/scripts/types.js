
var types = {
  alpha: 'Show all'
};

function openAddType() {
  $('#typeDiv').slideDown(800);
  $('#blue').focus();
}

//core function called on clicking submit button in types form:
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
  updateKeys(newOptions);
  $('#typeDiv').slideUp('fast');
}

//a pair of functions that store and retrieve user's types preferences from DB:
function storeTypes(object) {
  // console.log(object);
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
    updateKeys(x);
    types.blue = x.blue;
    types.green = x.green;
    types.red = x.red;
    types.yellow = x.yellow;

    console.log(types);
    updateFilter(types);

    console.log('we got', response, y);
    updateOptions(y);

  }).fail(function(msg){
    console.log(msg);
  });
}

function updateKeys(x) {
  $('#blue').val(x.blue);
  $('#green').val(x.green);
  $('#red').val(x.red);
  $('#yellow').val(x.yellow);

  $('#bluetype').text(x.blue);
  $('#greentype').text(x.green);
  $('#redtype').text(x.red);
  $('#yellowtype').text(x.yellow);

  $('#bluetype2').text(x.blue);
  $('#greentype2').text(x.green);
  $('#redtype2').text(x.red);
  $('#yellowtype2').text(x.yellow);
}

//updates the drop-down selector to reflect chosen types:
function updateOptions(object) {
  delete object.alpha;
  // console.log(object);

  var $el = $("#typeSelect");

  $el.empty();
  $.each(object, function(key,value) {
    // console.log("value", value, "key", key);
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

//updates drop-down selector in All Tasks tab:
function updateFilter(object) {
  var $el2 = $("#filterSelect");
  $el2.empty();
  //is $ equivalent to $(object)??
  //what is the attr part doing? could we remove it?
  $.each(object, function(key,value) {
    // console.log(key, value);
    $el2.append($("<option></option>")
    .data("id", key)
    .attr("value", value).text(value));
  });
}
