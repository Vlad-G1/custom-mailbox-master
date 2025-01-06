const allCount = document.querySelector('.js-letters-statistic-all'),
    unreadCount = document.querySelector('.js-letters-statistic-unread');

async function getMessagesCount() {
    try {
        const response = await fetch('http://localhost:3001/gmailApiRequest/getMessageCounts');
        const data = await response.json();

        allCount.innerHTML = data.totalMessagesCount;
        unreadCount.innerHTML = data.unreadMessagesCount;
    } catch (error) {
        console.error('Error fetching message counts:', error);
    }
}

export default getMessagesCount;