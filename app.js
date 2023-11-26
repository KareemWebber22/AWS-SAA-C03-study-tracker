document.addEventListener('DOMContentLoaded', function () {
    const modulesContainer = document.getElementById('modulesContainer');
    const guidedLabsContainer = document.getElementById('guidedLabsContainer');
    const challengeLabsContainer = document.getElementById('challengeLabsContainer');
    const overallContainer = document.getElementById('overallContainer');

    const totalModules = 14;
    const totalGuidedLabs = 10;
    const totalChallengeLabs = 7;

    createSection(modulesContainer, 'Module', totalModules);
    createSection(guidedLabsContainer, 'Guided Lab', totalGuidedLabs);
    createSection(challengeLabsContainer, 'Challenge Lab', totalChallengeLabs);

    // Overall progress
    const overallProgressBar = overallContainer.querySelector('.progress-bar');
    const overallProgressText = overallContainer.querySelector('#overallProgressText');
    const resetOverallButton = overallContainer.querySelector('#resetOverall');

    const allItems = document.querySelectorAll('.item');

    resetOverallButton.addEventListener('click', resetOverallProgress);
    updateOverallProgress();

    function createSection(container, itemName, itemCount) {
        // const sectionTitle = document.createElement('h2');
        // sectionTitle.innerText = itemName;
        // container.appendChild(sectionTitle);

        for (let i = 1; i <= itemCount; i++) {
            createItem(container, `${itemName} ${i}`);
        }
    }

    function createItem(container, itemName) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerText = itemName;
        itemElement.dataset.completed = 'false';

        itemElement.addEventListener('click', function () {
            toggleCompleted(itemElement);
            updateOverallProgress();
        });

        container.appendChild(itemElement);
    }

    function toggleCompleted(itemElement) {
        itemElement.classList.toggle('completed');
        itemElement.dataset.completed = (itemElement.dataset.completed === 'false') ? 'true' : 'false';
    }

    function updateOverallProgress() {
        const completedItems = document.querySelectorAll('.item.completed').length;
        const totalItems = allItems.length;
        const progress = (completedItems / totalItems) * 100;

        overallProgressBar.style.width = `${progress}%`;
        overallProgressText.innerText = `Progress: ${progress.toFixed(0)}%`;
    }

    function resetOverallProgress() {
        allItems.forEach(item => {
            item.classList.remove('completed');
            item.dataset.completed = 'false';
        });

        updateOverallProgress();
    }
});
