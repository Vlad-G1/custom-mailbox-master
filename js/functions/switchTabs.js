const tabs = document.querySelectorAll('.js-tab'),
    emptyMessage = document.querySelector('.js-letter-content-empty'),
    openedMessage = document.querySelector('.js-opened-message-content'),
    openedMessageContent = openedMessage.querySelector('.opened-message'),
    incomingLettersList = document.querySelector('.js-incoming-letters-list'),
    sentLettersList = document.querySelector('.js-sent-letters-list'),
    deleteButton = document.querySelector('.js-delete-button'),
    incomingLettersStatistic = document.querySelector('.js-incoming-letters-list-statistic'),
    sentLettersStatistic = document.querySelector('.js-sent-letters-list-statistic'),
    lettersListTitle = document.querySelector('.js-letters-list-title');

function switchTabs() {
    for (let tab of tabs) {
        tab.addEventListener('click', () => {
            tabs.forEach(otherTab => {
                if (otherTab !== tab) {
                    otherTab.classList.remove('active');
                }
            });
            const activeMessage = document.querySelector('.js-letter-item.active');
            if (activeMessage) {
                activeMessage.classList.remove('active');
            }
            tab.classList.add('active');
            emptyMessage.classList.remove('disable');
            openedMessage.classList.add('disable');
            openedMessageContent.innerHTML = '';
            if (tab.classList.contains('js-tab-sent')) {
                if (!incomingLettersList.classList.contains('disable') && sentLettersList.classList.contains('disable')) {
                    incomingLettersList.classList.add('disable');
                    sentLettersList.classList.remove('disable');
                    deleteButton.classList.add('disable');
                    incomingLettersStatistic.classList.add('disable');
                    sentLettersStatistic.classList.remove('disable');
                    lettersListTitle.innerHTML = 'Отправленные'
                }
            } else {
                if (incomingLettersList.classList.contains('disable') && !sentLettersList.classList.contains('disable')) {
                    incomingLettersList.classList.remove('disable');
                    sentLettersList.classList.add('disable');
                    deleteButton.classList.remove('disable');
                    incomingLettersStatistic.classList.remove('disable');
                    sentLettersStatistic.classList.add('disable');
                    lettersListTitle.innerHTML = 'Входящие';
                }
            }
        })
    }
}

export default switchTabs;