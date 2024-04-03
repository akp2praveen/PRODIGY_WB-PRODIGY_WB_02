let timer; // Holds the interval timer
let startTime; // Holds the time the stopwatch started
let elapsedTime = 0; // Holds the elapsed time since starting

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    toggleButtons(true);
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(time % 100);

    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
    document.getElementById('milliseconds').innerText = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function pauseStopwatch() {
    clearInterval(timer);
    toggleButtons(false);
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    displayTime(elapsedTime);
    toggleButtons(false);
    document.getElementById('lapTimes').innerHTML = '';
}

function recordLap() {
    const lapTimesList = document.getElementById('lapTimes');
    const lapTimeItem = document.createElement('li');
    const currentTime = Date.now();
    const lapElapsed = currentTime - startTime;
    const lapHours = Math.floor(lapElapsed / (1000 * 60 * 60));
    const lapMinutes = Math.floor((lapElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const lapSeconds = Math.floor((lapElapsed % (1000 * 60)) / 1000);
    const lapMilliseconds = Math.floor((lapElapsed % 1000) / 10);

    lapTimeItem.textContent = `${formatTime(lapHours)}:${formatTime(lapMinutes)}:${formatTime(lapSeconds)}.${formatTime(lapMilliseconds)}`;
    lapTimesList.appendChild(lapTimeItem);
}

function toggleButtons(running) {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const lapBtn = document.getElementById('lapBtn');

    if (running) {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}
