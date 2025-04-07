document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const displayEl = document.getElementById('display');
    
    // Timer variables
    let totalSeconds = 0;
    let intervalId = null;
    let isPaused = false;
    
    // Format time as HH:MM:SS
    function formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }
    
    // Update display
    function updateDisplay() {
        displayEl.textContent = formatTime(totalSeconds);
    }
    
    // Start timer
    function startTimer() {
        if (intervalId !== null) return;
        
        // Get time from inputs if timer is not running
        if (!isPaused) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            
            totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            if (totalSeconds <= 0) {
                alert("Please enter a time greater than zero.");
                return;
            }
        }
        
        isPaused = false;
        updateDisplay();
        
        intervalId = setInterval(() => {
            totalSeconds--;
            updateDisplay();
            
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                alert("Time's up!");
            }
        }, 1000);
    }
    
    // Pause timer
    function pauseTimer() {
        if (intervalId === null) return;
        
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
    }
    
    // Reset timer
    function resetTimer() {
        clearInterval(intervalId);
        intervalId = null;
        isPaused = false;
        
        hoursInput.value = 0;
        minutesInput.value = 0;
        secondsInput.value = 0;
        totalSeconds = 0;
        
        updateDisplay();
    }
    
    // Event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Initialize display
    updateDisplay();
});