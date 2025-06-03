let votes = {
    javascript: 0,
    python: 0,
    java: 0,
    csharp: 0
};

let hasVoted = false;
let totalVotes = 0;

const options = document.querySelectorAll('.poll-option');
const totalElement = document.getElementById('total');
const totalVotesDiv = document.querySelector('.total-votes');
const resetBtn = document.querySelector('.reset-btn');

options.forEach(option => {
option.addEventListener('click', () => {
    if (hasVoted) return;

const optionName = option.dataset.option;
votes[optionName]++;
totalVotes++;
hasVoted = true;

// Mark as voted
option.querySelector('.option-button').classList.add('voted');

// Update all results
updateResults();

// Show total votes and reset button
setTimeout(() => {
    totalVotesDiv.classList.add('show');
    resetBtn.classList.add('show');
    }, 500);
    });
});

resetBtn.addEventListener('click', () => {
// Reset votes
votes = { javascript: 0, python: 0, java: 0, csharp: 0 };
totalVotes = 0;
hasVoted = false;

// Reset UI
options.forEach(option => {
    const button = option.querySelector('.option-button');
    const bar = option.querySelector('.result-bar');
    const count = option.querySelector('.vote-count');
    
    button.classList.remove('voted');
    bar.style.width = '0%';
    count.textContent = '0';
    count.classList.remove('show');
});

totalElement.textContent = '0';
totalVotesDiv.classList.remove('show');
resetBtn.classList.remove('show');
});

function updateResults() {
const maxVotes = Math.max(...Object.values(votes));

options.forEach(option => {
    const optionName = option.dataset.option;
    const voteCount = votes[optionName];
    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
    
    const bar = option.querySelector('.result-bar');
    const count = option.querySelector('.vote-count');
    
    // Animate bar
    setTimeout(() => {
        bar.style.width = percentage + '%';
    }, 100);
    
    // Update count
    count.textContent = voteCount;
    count.classList.add('show');
});

totalElement.textContent = totalVotes;
}