
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
  console.log(newOptions);

  updateFilter(newOptions);
  updateOptions(newOptions);
  $('#typeDiv').hide();
}

function updateOptions(object) {
  delete object.alpha;
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
