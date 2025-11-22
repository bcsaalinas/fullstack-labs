function myListener(typeOfEvent, callback) {
  const eventWeGet = {
    type: "something",
    number: 2,
    key: "p",
  };

  if (eventWeGet.type === typeOfEvent) {
    callback(eventWeGet);
  } else {
    console.log("not the event we want ");
  }
}

myListener("something", function (e) {
  console.log(e);
});

myListener("otherSomething", function (e) {
  console.log("this isnt going to be printed");
});
