const ingredientsBtn = document.getElementById('toggleIngredients');
const stepsBtn = document.getElementById('toggleSteps');
const ingredientsList = document.getElementById('ingredients');
const stepsList = document.getElementById('steps');
const startCookingBtn = document.getElementById('startCooking');
const nextStepBtn = document.getElementById('nextStep');
const progressBar = document.querySelector('.progress');
const timerDisplay = document.getElementById('timer');
const timeLeftSpan = document.getElementById('timeLeft');
const printBtn = document.getElementById('printRecipe');
let currentStep = 0;
let countdown;

// Toggle with animation
function toggleSection(section, button, name) {
    if (section.style.maxHeight) {
        section.style.maxHeight = null;
        button.textContent = `Show ${name}`;
    } else {
        section.style.maxHeight = section.scrollHeight + "px";
        button.textContent = `Hide ${name}`;
    }
}

ingredientsBtn.addEventListener('click', () => {
    toggleSection(ingredientsList, ingredientsBtn, 'Ingredients');
});

stepsBtn.addEventListener('click', () => {
    toggleSection(stepsList, stepsBtn, 'Steps');
});

// Start Cooking
startCookingBtn.addEventListener('click', () => {
    currentStep = 0;
    highlightStep();
    nextStepBtn.disabled = false;
    updateProgress();
    startTimer();
});

// Next Step
nextStepBtn.addEventListener('click', () => {
    currentStep++;
    highlightStep();
    updateProgress();
    if (currentStep >= stepsList.children.length) {
        nextStepBtn.disabled = true;
        stopTimer();
    }
});

// Highlight Step
function highlightStep() {
    Array.from(stepsList.children).forEach((li, index) => {
        li.classList.toggle('active-step', index === currentStep);
    });
}

// Update Progress
function updateProgress() {
    let percentage = ((currentStep + 1) / stepsList.children.length) * 100;
    progressBar.style.width = percentage + '%';
}

// Timer
function startTimer() {
    clearInterval(countdown);
    let timeLeft = parseInt(document.getElementById('prepTime').textContent);
    timeLeftSpan.textContent = timeLeft;
    timerDisplay.classList.remove('hidden');

    countdown = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! Your recipe should be ready.");
        }
    }, 60000); // 1 minute interval
}

function stopTimer() {
    clearInterval(countdown);
}

// Print
printBtn.addEventListener('click', () => {
    window.print();
});
