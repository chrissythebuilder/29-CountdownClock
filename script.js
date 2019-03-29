let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // when to stop it
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000)
}

// to include the number inputted instead of waiting for a second to start counting down
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({minutes, remainderSeconds});
}

// display the time the timer will end
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjHour = hour > 12 ? hour - 12: hour;
    const minutes = end.getMinutes();
    const adjMinutes = minutes < 10 ? '0' : '';
    endTime.textContent = `Be back at ${adjHour}:${adjMinutes}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener("click", startTimer));
