// Test browser support
window.SpeechRecognition = window.SpeechRecognition       ||
window.webkitSpeechRecognition ||
null;

if (window.SpeechRecognition === null) {
  document.getElementById('ws-unsupported').classList.remove('hidden');
  document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
  document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} 
else {
  var recognizer = new window.SpeechRecognition();
  var transcription = document.getElementById('transcription');
  var log = document.getElementById('log');

  // Recogniser doesn't stop listening even if the user pauses
  recognizer.continuous = true;

  // Start recognising
  recognizer.onresult = function(event) {
    transcription.textContent = '';

    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcription.textContent = event.results[i][0].transcript + ' (Confidence: ' + event.results[i][0].confidence + ')';
      } else {
        transcription.textContent += event.results[i][0].transcript;
      }
    }
  };

  // Listen for errors
  recognizer.onerror = function(event) {
    log.innerHTML = 'Recognition error: ' + event.message + '<br />' + log.innerHTML;
  };

  recognizer.interimResults = true;
  recognizer.start();
}