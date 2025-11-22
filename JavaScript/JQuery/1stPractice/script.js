let title = $("h1");

$(document).keypress(function (event) {
  console.log(event.key);
  title.text(event.key);
});
