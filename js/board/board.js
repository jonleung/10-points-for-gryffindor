$(document).ready(function() {

  var rootRef = new Firebase("https://10-points.firebaseio.com/");
  var regexHouseMapping = {
    "gryffindor": "g",
    "hufflepuff": "h",
    "slytherin": "s",
    "ravenclaw": "r"
  }

  var pointsRef = rootRef.child("points");
  pointsRef.once("value", function(snapshot) {
    var pointsObject = snapshot.val();
    if (pointsObject === null) {
      pointsRef.set({g: 0, s: 0, r: 0, h: 0});
    }
    else {
      $.each(regexHouseMapping, function(house, houseKey) {
        $("#"+houseKey).html(pointsObject[houseKey]);
      });
    }
  });

  var ding = new Howl({urls: ['sounds/Ding.wav'] });

  pointsRef.on("value", function(snapshot) {
    var pointsObject = snapshot.val();

    $.each(pointsObject, function(houseKey, newPointValue) {
      $("#"+houseKey).html(newPointValue);
    });
  });

  dweetio.listen_for("10-points-for-gryffindor", function(dweet){
    setTimeout(function() {
      ding.play();

      var command = $("#transcription").val().toLowerCase();
      var additionalPoints = parseInt(command.match( /(\d+)/gm)[0]);

      $.each(regexHouseMapping, function(house, houseKey) {
        if (command.indexOf(house) > -1) {
          $("#"+houseKey+"-logo").effect("bounce", { times: 3}, "slow");

          var houseRef = pointsRef.child(houseKey);
          houseRef.transaction(function(curPoints){
            curPoints = curPoints || 0;
            var newTotalPoints = curPoints + additionalPoints;
            console.log(house + " now has " + curPoints + " + " + additionalPoints + " = " + newTotalPoints + " points ");
            $("#"+houseKey).html(newTotalPoints);
            return newTotalPoints;
          });


        }
      });




    }, 500);
  });

});