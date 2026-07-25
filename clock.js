const clock = document.getElementById("clock");

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let period = "AM";

    if (hours >= 12) {
        period = "PM";
    }

    if (hours > 12) {
        hours = hours - 12;
    }

    if (hours === 0) {
        hours = 12;
    }

    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    clock.textContent =
        hours + ":" + minutes + ":" + seconds + " " + period;
}

updateClock();

setInterval(updateClock, 1000);