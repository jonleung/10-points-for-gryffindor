var theFunctionToCallWhenTheDocumentIsReady = function() {

  //============================================
  // Shared Variables

  var DWEET_CHANNEL = "jonathan-leung-channel"
  var THRESHOLD_MAGNITUDE = 30;
  var canTrigger = true;
  var sounds = [];

  //============================================
  // Shared Variables

  var dweet = function(channel) {
    dweetio.dweet_for(DWEET_CHANNEL, {time: new Date(), type: "trigger"});
  }

  //============================================
  // Trigger The Wand

  var waveWandHandler = function() {
    canTrigger = false;
    var resetCanTrigger = function() {
      canTrigger = true;
    }
    setTimeout(resetCanTrigger, 500);

    playRandomSound();

    dweet();
  }

  //============================================
  // Handle All The Device Motion

  var deviceMotionHandler = function(motion) {
    var acceleration = motion.acceleration;

    var magnitude = Math.sqrt(
      Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)
    )

    console.log("Magnitude: " + magnitude);

    if (magnitude > THRESHOLD_MAGNITUDE && canTrigger == true) {
      waveWandHandler();
    }
  }

  //============================================
  // Load All Sounds

  var loadAllSounds = function() {
    var soundFilenames = [
      "Expeliarmus 1.mp3",
      "Stupefix + Contre 1.mp3",
      "Expeliarmus 2.mp3",
      "Transplanage Arrive.mp3",
      "Stupefix + Contre 2.mp3"
    ];

    $(soundFilenames).each(function(i, filename) {
      sounds[i] = new Howl({urls: ['sounds/' + filename] });
    });
  }

  //============================================
  // Play All Sounds

  var playAllSounds = function() {
    sounds.forEach(function(sound) {
      sound.play();
    });
  }

  //============================================
  // Play All Sounds

  var playRandomSound = function() {
    var randomSoundFileIndex = Math.floor((Math.random() * sounds.length));
    var sound = sounds[randomSoundFileIndex];
    sound.play();
  }

  var initialize = function() {
    loadAllSounds();

    $("button").on("click touchstart", function(touchEvent) {
      $("button").hide();
      $("#volume").hide();
      
      $("#wave").show();

      playAllSounds();
    });

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false);
    } 
    else {
      alert("You cannot cast spells on this wand. Try another iOS or Android wand...")
    }
  }

  initialize();

}

$(document).ready(theFunctionToCallWhenTheDocumentIsReady);

