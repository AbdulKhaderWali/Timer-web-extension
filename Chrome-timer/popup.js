let timerInterval;
let remainingTime;
let isPaused = false;
let enableTicking;
let tickSound;

document.getElementById('startButton').addEventListener('click', function() {
  let timeInput = document.getElementById('timeInput').value;
  let timeInSeconds = parseTimeInput(timeInput);
  enableTicking = document.getElementById('tickCheckbox').checked;

  if (timeInSeconds > 0) {
    startTimer(timeInSeconds);
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('resetButton').style.display = 'block';
  } else {
    alert('Please enter a valid time.');
  }
});

document.getElementById('pauseButton').addEventListener('click', function() {
  if (isPaused) {
    resumeTimer();
  } else {
    pauseTimer();
  }
});

document.getElementById('resetButton').addEventListener('click', function() {
  resetTimer();
});

function parseTimeInput(input) {
  let time = parseInt(input);
  if (isNaN(time)) {
    return 0;
  }

  if (input.endsWith('m')) {
    return time * 60;
  } else if (input.endsWith('s')) {
    return time;
  } else if (input.endsWith('h')) {
    return time * 3600;
  } else {
    return time;
  }
}

function startTimer(seconds) {
  remainingTime = seconds;
  let alarmSound = document.getElementById('alarmSound');
  tickSound = document.getElementById('tickSound');
  let remainingTimeDisplay = document.getElementById('remainingTime');
  let timeUpMessage = document.getElementById('timeUpMessage');

  remainingTimeDisplay.textContent = formatTime(remainingTime);
  timeUpMessage.style.display = 'none';
  isPaused = false;

  if (enableTicking) {
    tickSound.play();
  }

  timerInterval = setInterval(function() {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alarmSound.play();
      remainingTimeDisplay.textContent = '';
      timeUpMessage.style.display = 'block';
      document.getElementById('pauseButton').style.display = 'none';
    } else {
      if (!isPaused) {
        remainingTime--;
        remainingTimeDisplay.textContent = formatTime(remainingTime);

        if (enableTicking) {
          tickSound.pause();
          tickSound.currentTime = 0;
          tickSound.play();
        }
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  document.getElementById('pauseButton').textContent = 'Resume Timer';
  if (enableTicking) {
    tickSound.pause();
  }
}

function resumeTimer() {
  isPaused = false;
  document.getElementById('pauseButton').textContent = 'Pause Timer';
  if (enableTicking) {
    tickSound.play();
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('remainingTime').textContent = '';
  document.getElementById('timeUpMessage').style.display = 'none';
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('pauseButton').textContent = 'Pause Timer';
  if (enableTicking) {
    tickSound.pause();
    tickSound.currentTime = 0;
  }
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
