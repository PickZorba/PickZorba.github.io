//初始化按钮及时间
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const clock = document.querySelector('.clock');

let stopClock;

stopBtn.disabled = true;
resetBtn.disabled = true;
clock.textContent = '00:00:00.000';

// 获取点击时间
function time() {
    let date = new Date();
    let time = date.getTime();

    return time;
}

// 定义秒表显示
function displayClock(startTime) {
    let dateClock = new Date();
    let clockTime = dateClock.getTime();
    let dtime = new Date(clockTime - startTime);

    hours = dtime.getHours() - 8;
    mins = dtime.getMinutes();
    s = dtime.getSeconds();
    ms = dtime.getMilliseconds();

    clockHours = (hours<10) ? '0'+hours : hours;
    clockMins = (mins<10) ? '0'+mins : mins;
    clockS = (s<10) ? '0'+s : s;
    clockMs = (ms<10) ? '0'+ms : ms;

    clock.textContent = clockHours + ':' + clockMins + ':' + clockS + '.' + clockMs;
}

// 开始
startBtn.addEventListener('click', () => {
    stopClock = setInterval(displayClock, 0, time());

    stopBtn.disabled = false;
    resetBtn.disabled = false;
    startBtn.disabled = true;
});

// 停止
stopBtn.addEventListener('click', () => {
    clearInterval(stopClock);

    startBtn.disabled = false;
});

// 复位
resetBtn.addEventListener('click', () => {
    clearInterval(stopClock);

    stopBtn.disabled = true;
    resetBtn.disabled = true;
    startBtn.disabled = false;

    clock.textContent = '00:00:00.000';
});