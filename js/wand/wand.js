
$(document).ready(function() {

  var soundFilenames = [
    "Expeliarmus 1.mp3",
    "Stupefix + Contre 1.mp3",
    "Expeliarmus 2.mp3",
    "Transplanage Arrive.mp3",
    "Stupefix + Contre 2.mp3"
  ];

  var sounds = [];

  $(soundFilenames).each(function(i, filename) {
    sounds[i] = new Howl({urls: ['sounds/' + filename] });
  });

  $("body").on("click touchmove", function() {

    sounds.forEach(function(sound) {
      sound.play();
    });



  });

  var THRESHOLD_MAGNITUDE = 30;

  var canTrigger = true;

  var deviceMotionHandler = function(motion) {
    // Grab the acceleration from the results

    var acceleration = motion.acceleration;

    var magnitude = Math.sqrt(
      Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)
    )

    console.log(magnitude)

    if (magnitude > THRESHOLD_MAGNITUDE && canTrigger == true) {
      canTrigger = false;
      setTimeout(function() {canTrigger = true;}, 500);

      var randomSoundFileIndex = Math.floor((Math.random() * sounds.length - 1) + 1);
      var sound = sounds[randomSoundFileIndex];
      console.log(sound);

      sound.play();

      dweetio.dweet_for("10-points-for-gryffindor", {time: new Date(), type: "trigger"}, function(err, dweet){
        // console.log(dweet.thing); // The generated name
        // console.log(dweet.content); // The content of the dweet
        // console.log(dweet.created); // The create date of the dweet
      });

    }
  }

  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } 
  else {
    alert("Your device cannot cast spells on this wand. Try an iOS or Android wand...")
  }

})

