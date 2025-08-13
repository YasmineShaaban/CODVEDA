let count = 0;
let resetCount = 0;

const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
  counterDisplay.textContent = count;
}

incrementBtn.addEventListener('click', () => {
  count++;
  resetCount = 0; // Reset reset-click tracker
  updateDisplay();
});

decrementBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    updateDisplay();
  } else {
    alert("Counter is already at zero!");
  }
});

resetBtn.addEventListener('click', () => {
  if (count === 0) {
    resetCount++;
    if (resetCount > 1) {
      alert("Counter is already at zero. Nothing to reset.");
    }
  } else {
    count = 0;
    resetCount = 1; // Track the first reset
    updateDisplay();
  }
});
